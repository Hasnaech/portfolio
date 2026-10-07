import { createHmac, timingSafeEqual } from "node:crypto";

// Integration Stripe Checkout sans dependance : appels REST directs.
// Le paiement est active des que STRIPE_SECRET_KEY est defini sur Vercel.

const API_BASE = process.env.STRIPE_API_BASE || "https://api.stripe.com";

export const isCardPaymentEnabled = () => Boolean(process.env.STRIPE_SECRET_KEY);

export type CheckoutLine = { name: string; description?: string; unitAmount: number; quantity: number };

// Stripe attend un corps application/x-www-form-urlencoded avec des cles imbriquees.
function encode(obj: unknown, prefix = "", out: string[] = []): string[] {
  if (obj === undefined || obj === null) return out;
  if (Array.isArray(obj)) obj.forEach((v, i) => encode(v, `${prefix}[${i}]`, out));
  else if (typeof obj === "object")
    Object.entries(obj as Record<string, unknown>).forEach(([k, v]) => encode(v, prefix ? `${prefix}[${k}]` : k, out));
  else out.push(`${encodeURIComponent(prefix)}=${encodeURIComponent(String(obj))}`);
  return out;
}

export async function createCheckoutSession(input: {
  reference: string;
  email: string;
  lines: CheckoutLine[];
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
}): Promise<{ id: string; url: string }> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Paiement par carte non configuré");

  const body = encode({
    mode: "payment",
    locale: "fr",
    customer_email: input.email,
    client_reference_id: input.reference,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    billing_address_collection: "required",
    tax_id_collection: { enabled: true },
    invoice_creation: { enabled: true, invoice_data: { metadata: input.metadata } },
    payment_intent_data: { description: `Commande ${input.reference}`, metadata: input.metadata },
    metadata: input.metadata,
    line_items: input.lines.map((l) => ({
      quantity: l.quantity,
      price_data: {
        currency: "eur",
        unit_amount: l.unitAmount,
        product_data: { name: l.name, ...(l.description ? { description: l.description } : {}) },
      },
    })),
  }).join("&");

  const res = await fetch(`${API_BASE}/v1/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Idempotency-Key": input.reference,
    },
    body,
  });
  const json = (await res.json().catch(() => ({}))) as { id?: string; url?: string; error?: { message?: string } };
  if (!res.ok || !json.url || !json.id) {
    console.error("[stripe] creation de session refusee", res.status, json.error?.message);
    throw new Error("Le paiement par carte est momentanément indisponible.");
  }
  return { id: json.id, url: json.url };
}

// Verification de la signature d'un webhook (en-tete Stripe-Signature, tolerance 5 minutes).
export function verifyWebhook(payload: string, header: string | null, secret: string, toleranceSec = 300) {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((kv) => {
      const [k, ...v] = kv.split("=");
      return [k.trim(), v.join("=")];
    }),
  );
  const timestamp = Number(parts.t);
  const signatures = header
    .split(",")
    .filter((kv) => kv.trim().startsWith("v1="))
    .map((kv) => kv.trim().slice(3));
  if (!timestamp || !signatures.length) return false;
  if (Math.abs(Date.now() / 1000 - timestamp) > toleranceSec) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return signatures.some((sig) => {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  });
}
