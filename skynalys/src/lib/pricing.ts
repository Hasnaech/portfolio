import { site } from "./site";

// Remises par quantite d'un meme conditionnement (prix HT).
export const tiers = [
  { qty: 1, discount: 0 },
  { qty: 3, discount: 0.1 },
  { qty: 5, discount: 0.15 },
  { qty: 10, discount: 0.25, badge: "Meilleur prix" },
  { qty: 25, discount: 0.35, badge: "Institutionnel" },
] as const;

export function discountFor(qty: number) {
  let d = 0;
  for (const t of tiers) if (qty >= t.qty) d = t.discount;
  return d;
}

export function unitPrice(base: number, qty: number) {
  return round(base * (1 - discountFor(qty)));
}

export function lineTotal(base: number, qty: number) {
  return round(unitPrice(base, qty) * qty);
}

export function shippingFor(subtotal: number, coldChain: boolean) {
  const base = subtotal >= site.freeShippingThreshold || subtotal === 0 ? 0 : site.shippingFlat;
  return round(base + (coldChain && subtotal > 0 ? site.coldChainFee : 0));
}

export function round(n: number) {
  return Math.round(n * 100) / 100;
}
