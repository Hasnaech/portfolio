import { getProduct } from "@/lib/catalog";
import { lineTotal, round, shippingFor } from "@/lib/pricing";
import { fail, isEmail, isSpam, missing, notify, ok, readJson, reference, str } from "@/lib/server";
import { formatPrice, site } from "@/lib/site";

export async function POST(req: Request) {
  const data = await readJson(req);
  if (!data) return fail("Requête invalide.");
  if (isSpam(data)) return ok({ reference: reference("CMD") });

  const required = ["organisation", "organisationType", "vat", "name", "role", "email", "phone", "address", "usage"];
  const miss = missing(data, required);
  if (miss.length) return fail("Merci de compléter tous les champs obligatoires.");
  if (!isEmail(str(data.email))) return fail("Adresse email invalide.");
  if (data.attestation !== "oui" || data.cgv !== "oui") return fail("L’attestation d’usage et l’acceptation des CGV sont obligatoires.");
  const payment = str(data.payment);
  if (!["virement", "bon-de-commande", "carte"].includes(payment)) return fail("Mode de paiement invalide.");
  if (payment === "bon-de-commande" && !str(data.poNumber)) return fail("Le numéro de bon de commande est obligatoire pour le paiement à 30 jours.");

  // Les prix sont recalcules cote serveur : le navigateur n'envoie que les SKU et les quantites.
  const rawItems = Array.isArray(data.items) ? data.items.slice(0, 100) : [];
  const lines: string[] = [];
  let subtotal = 0;
  for (const it of rawItems) {
    const slug = str((it as Record<string, unknown>)?.slug, 100);
    const sku = str((it as Record<string, unknown>)?.sku, 100);
    const qty = Math.floor(Number((it as Record<string, unknown>)?.qty));
    const p = getProduct(slug);
    const v = p?.variants.find((x) => x.sku === sku);
    if (!p || !v || !Number.isFinite(qty) || qty < 1 || qty > 999) return fail("Un article du panier est invalide.");
    const total = lineTotal(v.price, qty);
    subtotal += total;
    lines.push(`${qty} × ${p.name} ${v.label} (${v.sku}) : ${formatPrice(total)} HT`);
  }
  if (!lines.length) return fail("Le panier est vide.");

  subtotal = round(subtotal);
  const coldChain = data.coldChain === true;
  const shipping = shippingFor(subtotal, coldChain);
  const vat = data.vatExempt === true ? 0 : round((subtotal + shipping) * site.vatRate);
  const total = round(subtotal + shipping + vat);
  const ref = reference("CMD");

  await notify(
    `Nouvelle commande ${ref} : ${str(data.organisation)}`,
    {
      Référence: ref,
      Établissement: `${str(data.organisation)} (${str(data.organisationType)})`,
      "TVA / SIREN": str(data.vat),
      Contact: `${str(data.name)}, ${str(data.role)}`,
      Email: str(data.email),
      Téléphone: str(data.phone),
      Livraison: str(data.address),
      Facturation: str(data.billingAddress) || "Identique",
      Paiement: payment,
      "Bon de commande": str(data.poNumber) || "–",
      "Usage déclaré": str(data.usage),
      Articles: lines.join("\n"),
      "Sous-total HT": formatPrice(subtotal),
      "Livraison HT": formatPrice(shipping),
      TVA: data.vatExempt === true ? "Autoliquidation" : formatPrice(vat),
      "Total TTC": formatPrice(total),
    },
    str(data.email),
  );

  return ok({ reference: ref, total });
}
