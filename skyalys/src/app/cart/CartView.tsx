"use client";

import Link from "next/link";
import { FreeShippingMeter } from "@/components/CartDrawer";
import { useCart } from "@/components/CartProvider";
import { VialArt } from "@/components/VialArt";
import { getProduct } from "@/lib/catalog";
import { discountFor } from "@/lib/pricing";
import { formatPrice } from "@/lib/site";

export function CartView() {
  const { lines, subtotal, setQty, remove } = useCart();

  if (!lines.length) {
    return (
      <div className="card" style={{ textAlign: "center", padding: 48, marginBottom: 56 }}>
        <p className="muted">Votre panier est vide.</p>
        <Link href="/shop" className="btn btn-primary">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-layout" style={{ paddingTop: 0 }}>
      <div className="card">
        {lines.map((l) => {
          const p = getProduct(l.slug)!;
          const d = discountFor(l.qty);
          return (
            <div className="cart-line" key={l.sku}>
              <div className="cart-thumb">
                <VialArt product={p} size={44} />
              </div>
              <div>
                <Link href={`/products/${l.slug}`} style={{ fontWeight: 600, color: "var(--brand-900)" }}>
                  {l.name} {l.label}
                </Link>
                <div className="small muted">
                  {l.sku} · {formatPrice(l.unit)} HT / unité{d ? ` (−${Math.round(d * 100)} %)` : ""}
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
                  <div className="qty">
                    <button onClick={() => setQty(l.sku, l.qty - 1)} aria-label="Diminuer la quantité">
                      −
                    </button>
                    <input
                      type="number"
                      value={l.qty}
                      min={1}
                      onChange={(e) => setQty(l.sku, Math.max(1, Number(e.target.value) || 1))}
                      aria-label="Quantité"
                    />
                    <button onClick={() => setQty(l.sku, l.qty + 1)} aria-label="Augmenter la quantité">
                      +
                    </button>
                  </div>
                  <button className="small" style={{ background: "none", border: 0, color: "var(--muted)", cursor: "pointer", textDecoration: "underline" }} onClick={() => remove(l.sku)}>
                    Retirer
                  </button>
                </div>
              </div>
              <div className="price">{formatPrice(l.total)}</div>
            </div>
          );
        })}
      </div>
      <aside className="card">
        <FreeShippingMeter subtotal={subtotal} />
        <div className="summary-row summary-total">
          <span>Sous-total HT</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="small muted">TVA, livraison et option chaîne du froid calculées à l’étape suivante.</p>
        <div style={{ display: "grid", gap: 10 }}>
          <Link href="/checkout" className="btn btn-accent btn-block">
            Passer commande
          </Link>
          <Link
            href={`/quote?produit=${lines[0].slug}`}
            className="btn btn-ghost btn-block"
          >
            Transformer en demande de devis
          </Link>
        </div>
      </aside>
    </div>
  );
}
