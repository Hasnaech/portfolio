"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { batches, products } from "@/lib/catalog";

const rows = batches.map((b) => {
  const p = products.find((x) => x.variants.some((v) => v.sku === b.sku))!;
  const v = p.variants.find((x) => x.sku === b.sku)!;
  return { ...b, product: p, variant: v };
});

export function BatchTable() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const n = q.toLowerCase().trim();
    if (!n) return rows;
    return rows.filter((r) => [r.product.name, r.lot, r.sku, r.product.cas ?? ""].join(" ").toLowerCase().includes(n));
  }, [q]);

  return (
    <>
      <label htmlFor="lot-search" className="field" style={{ display: "block", maxWidth: 420, marginBottom: 16 }}>
        <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>Rechercher un lot, un produit ou un CAS</span>
        <input id="lot-search" className="input" style={{ marginTop: 6 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex. RETA-10-A01" />
      </label>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Conditionnement</th>
              <th>Lot</th>
              <th>Pureté HPLC</th>
              <th>Date d’analyse</th>
              <th>Documents</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.sku}>
                <td>
                  <Link href={`/products/${r.product.slug}`}>{r.product.name}</Link>
                </td>
                <td>{r.variant.label}</td>
                <td>
                  <code>{r.lot}</code>
                </td>
                <td>{r.purity ?? <span className="muted">Publication en cours</span>}</td>
                <td>{r.date || <span className="muted">–</span>}</td>
                <td>
                  {r.coaUrl ? <a href={r.coaUrl}>COA</a> : <span className="muted small">Joint à l’expédition</span>}
                  {r.sdsUrl ? (
                    <>
                      {" · "}
                      <a href={r.sdsUrl}>FDS</a>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small muted" style={{ marginTop: 8 }}>
        {list.length} lot{list.length > 1 ? "s" : ""} affiché{list.length > 1 ? "s" : ""}.
      </p>
    </>
  );
}
