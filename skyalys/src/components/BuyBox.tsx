"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { addOnSlugs, batchFor, getProduct, type Product } from "@/lib/catalog";
import { lineTotal, tiers, unitPrice } from "@/lib/pricing";
import { formatPrice } from "@/lib/site";
import { useCart } from "./CartProvider";
import { Icon } from "./Icon";

export function BuyBox({ product }: { product: Product }) {
  const { add, open } = useCart();
  const [sku, setSku] = useState(product.variants[0].sku);

  // Preselection de la variante depuis l'URL (?variant=SKU), utilisee par les donnees structurees.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("variant");
    if (fromUrl && product.variants.some((v) => v.sku === fromUrl)) setSku(fromUrl);
  }, [product.variants]);
  const [qty, setQty] = useState(1);
  const [addOns, setAddOns] = useState<string[]>([]);
  const variant = product.variants.find((v) => v.sku === sku)!;
  const batch = batchFor(sku);
  const showAddOns = product.format !== "consommable";
  const addOnProducts = addOnSlugs.map((s) => getProduct(s)!).filter(Boolean);

  function addToCart() {
    add({ slug: product.slug, sku, qty });
    addOns.forEach((a) => {
      const p = getProduct(a);
      if (p) add({ slug: p.slug, sku: p.variants[0].sku, qty: 1 });
    });
    setAddOns([]);
    open();
  }

  return (
    <div>
      <div className="option-group" role="radiogroup" aria-label="Conditionnement">
        <div className="option-label">
          <span>Conditionnement</span>
          <span className="muted small">Lot {batch?.lot ?? "en cours"}</span>
        </div>
        <div className="chips">
          {product.variants.map((v) => (
            <button key={v.sku} type="button" role="radio" aria-checked={v.sku === sku} className="chip" onClick={() => setSku(v.sku)}>
              {v.label}
              <small>{formatPrice(v.price)} HT</small>
            </button>
          ))}
        </div>
      </div>

      <div className="option-group" role="radiogroup" aria-label="Quantité et remise">
        <div className="option-label">
          <span>Tarif dégressif</span>
          <span className="muted small">Prix unitaire HT</span>
        </div>
        <div className="tiers">
          {tiers.map((t) => {
            const checked = qty === t.qty;
            return (
              <button key={t.qty} type="button" role="radio" aria-checked={checked} className="tier" onClick={() => setQty(t.qty)}>
                <span className="radio" />
                <span>
                  <strong>
                    {t.qty} flacon{t.qty > 1 ? "s" : ""}
                  </strong>{" "}
                  {t.discount ? <span className="tag tag-accent">−{Math.round(t.discount * 100)} %</span> : null}{" "}
                  {"badge" in t && t.badge ? <span className="tag">{t.badge}</span> : null}
                </span>
                <span className="tier-price">
                  {formatPrice(lineTotal(variant.price, t.qty))}
                  <small>{formatPrice(unitPrice(variant.price, t.qty))} / u.</small>
                </span>
              </button>
            );
          })}
        </div>
        <p className="small muted" style={{ marginTop: 8 }}>
          Au-delà de 25 unités ou pour un conditionnement sur mesure,{" "}
          <Link href={`/quote?produit=${product.slug}`}>demandez un devis institutionnel</Link>.
        </p>
      </div>

      {showAddOns ? (
        <div className="option-group">
          <div className="option-label">
            <span>Compléter la commande</span>
            <span className="muted small">Optionnel</span>
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            {addOnProducts.map((p) => (
              <label className="addon" key={p.slug}>
                <input
                  type="checkbox"
                  checked={addOns.includes(p.slug)}
                  onChange={(e) => setAddOns((prev) => (e.target.checked ? [...prev, p.slug] : prev.filter((x) => x !== p.slug)))}
                />
                <span className="grow">
                  <strong>{p.name}</strong> <span className="small muted">{p.variants[0].label}</span>
                </span>
                <span className="small">+ {formatPrice(p.variants[0].price)}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}

      <div className="buy-row">
        <div className="qty">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuer la quantité">
            −
          </button>
          <input
            type="number"
            min={1}
            max={999}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(999, Number(e.target.value) || 1)))}
            aria-label="Quantité"
          />
          <button type="button" onClick={() => setQty((q) => Math.min(999, q + 1))} aria-label="Augmenter la quantité">
            +
          </button>
        </div>
        <button type="button" className="btn btn-accent" style={{ flex: 1 }} onClick={addToCart}>
          Ajouter au panier · {formatPrice(lineTotal(variant.price, qty))} HT
        </button>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }} className="small muted">
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <Icon name="lock" size={16} /> Carte, virement ou bon de commande
        </span>
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <Icon name="file" size={16} /> Facture avec numéro de lot
        </span>
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <Icon name="truck" size={16} /> Expédition sous 24 à 48 h ouvrées
        </span>
      </div>
    </div>
  );
}
