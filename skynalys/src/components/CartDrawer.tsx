"use client";

import Link from "next/link";
import { useEffect } from "react";
import { getProduct } from "@/lib/catalog";
import { discountFor } from "@/lib/pricing";
import { formatPrice, site } from "@/lib/site";
import { useCart } from "./CartProvider";
import { Icon } from "./Icon";
import { VialArt } from "./VialArt";

export function FreeShippingMeter({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);
  const pct = Math.min(100, (subtotal / site.freeShippingThreshold) * 100);
  return (
    <div className="small">
      {remaining > 0 ? (
        <span>
          Plus que <strong>{formatPrice(remaining)} HT</strong> pour la livraison offerte
        </span>
      ) : (
        <span>
          <strong>Livraison offerte</strong> sur cette commande
        </span>
      )}
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQty, remove } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={close} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Votre panier">
        <div className="drawer-head">
          <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Votre panier</h2>
          <button className="icon-btn" onClick={close} aria-label="Fermer le panier">
            <Icon name="close" />
          </button>
        </div>
        <div className="drawer-body">
          <FreeShippingMeter subtotal={subtotal} />
          {lines.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <p className="muted">Votre panier est vide.</p>
              <Link href="/shop" className="btn btn-primary" onClick={close}>
                Voir le catalogue
              </Link>
            </div>
          ) : (
            lines.map((l) => {
              const p = getProduct(l.slug)!;
              const d = discountFor(l.qty);
              return (
                <div className="cart-line" key={l.sku}>
                  <div className="cart-thumb">
                    <VialArt product={p} size={44} />
                  </div>
                  <div>
                    <Link href={`/products/${l.slug}`} onClick={close} style={{ fontWeight: 600, color: "var(--brand-900)" }}>
                      {l.name}
                    </Link>
                    <div className="small muted">
                      {l.label} · {formatPrice(l.unit)} HT / unité{d ? ` (−${Math.round(d * 100)} %)` : ""}
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                      <div className="qty" style={{ transform: "scale(0.85)", transformOrigin: "left" }}>
                        <button onClick={() => setQty(l.sku, l.qty - 1)} aria-label="Diminuer la quantité">
                          −
                        </button>
                        <input value={l.qty} readOnly aria-label="Quantité" />
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
            })
          )}
        </div>
        {lines.length > 0 ? (
          <div className="drawer-foot">
            <div className="summary-row">
              <span>Sous-total HT</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className="small muted" style={{ margin: 0 }}>
              Remises incluses. TVA et livraison calculées à l’étape suivante.
            </p>
            <Link href="/checkout" className="btn btn-accent btn-block" onClick={close}>
              Passer commande <Icon name="arrow" size={18} />
            </Link>
            <Link href="/cart" className="btn btn-ghost btn-block" onClick={close}>
              Voir le panier ou demander un devis
            </Link>
          </div>
        ) : null}
      </aside>
    </>
  );
}
