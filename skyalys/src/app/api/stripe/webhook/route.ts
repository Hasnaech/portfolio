import { notify } from "@/lib/server";
import { formatPrice } from "@/lib/site";
import { verifyWebhook } from "@/lib/stripe";

// Webhook Stripe : confirme les paiements reussis (evenement checkout.session.completed).
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("Webhook non configuré", { status: 501 });
  const payload = await req.text();
  if (!verifyWebhook(payload, req.headers.get("stripe-signature"), secret)) return new Response("Signature invalide", { status: 400 });

  const event = JSON.parse(payload) as {
    type: string;
    data: { object: { client_reference_id?: string; amount_total?: number; payment_status?: string; customer_details?: { email?: string } } };
  };
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const s = event.data.object;
    if (s.payment_status === "paid") {
      await notify(`Paiement reçu : commande ${s.client_reference_id ?? "?"}`, {
        Référence: s.client_reference_id ?? "",
        Montant: formatPrice((s.amount_total ?? 0) / 100),
        Email: s.customer_details?.email ?? "",
        Statut: "Payée, à vérifier puis expédier",
      });
    }
  }
  return Response.json({ received: true });
}
