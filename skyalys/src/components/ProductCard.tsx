"use client";

import Link from "next/link";
import { getCategory, isPurchasable, minPrice, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/site";
import { useCart } from "./CartProvider";
import { VialArt } from "./VialArt";

export function ProductCard({ product }: { product: Product }) {
  const { add, open } = useCart();
  const first = product.variants[0];
  const buyable = isPurchasable(product);
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-card-media" aria-label={product.name}>
        {product.isNew ? <span className="tag tag-new">Nouveau</span> : null}
        {product.quoteOnly ? <span className="tag tag-new" style={{ background: "var(--warn)" }}>Sur devis</span> : null}
        <VialArt product={product} label={first.label} size={150} />
      </Link>
      <div className="product-card-body">
        <span className="small muted">{getCategory(product.category)?.name}</span>
        <h3>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <span className="small muted">
          {product.variants.map((v) => v.label).join(" · ")}
          {product.cas ? ` · CAS ${product.cas}` : ""}
        </span>
        <div className="product-card-foot">
          {buyable ? (
            <>
              <span className="price">
                <small>dès </small>
                {formatPrice(minPrice(product))}
                <small> HT</small>
              </span>
              <button
                className="btn btn-ghost"
                style={{ minHeight: 36, padding: "0 14px", fontSize: "0.85rem" }}
                onClick={() => {
                  add({ slug: product.slug, sku: first.sku, qty: 1 });
                  open();
                }}
                aria-label={`Ajouter ${product.name} ${first.label} au panier`}
              >
                Ajouter
              </button>
            </>
          ) : (
            <>
              <span className="price small muted">Prix sur devis</span>
              <Link
                href={`/quote?produit=${product.slug}`}
                className="btn btn-ghost"
                style={{ minHeight: 36, padding: "0 14px", fontSize: "0.85rem" }}
              >
                Demander un devis
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
