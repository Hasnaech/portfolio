"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, getCategory, minPrice, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/site";
import { Icon } from "./Icon";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const n = normalize(q.trim());
    if (!n) return products.filter((p) => p.featured);
    return products.filter((p) =>
      normalize([p.name, ...p.synonyms, p.cas ?? "", getCategory(p.category)?.name ?? "", ...p.variants.map((v) => v.label)].join(" ")).includes(n),
    );
  }, [q]);

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true" aria-label="Rechercher un produit" style={{ top: "12%", transform: "translateX(-50%)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Icon name="search" />
          <input
            ref={inputRef}
            className="input"
            placeholder="Nom, synonyme, numéro CAS ou conditionnement"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Rechercher"
          />
          <button className="icon-btn" onClick={onClose} aria-label="Fermer la recherche">
            <Icon name="close" />
          </button>
        </div>
        <p className="small muted" style={{ margin: "12px 0 6px" }}>
          {q ? `${results.length} résultat${results.length > 1 ? "s" : ""}` : "Références les plus consultées"}
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {results.slice(0, 8).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                onClick={onClose}
                style={{ display: "flex", justifyContent: "space-between", padding: "10px 4px", borderBottom: "1px solid var(--line)", color: "var(--ink)" }}
              >
                <span>
                  <strong>{p.name}</strong>
                  <span className="small muted"> · {getCategory(p.category)?.name}</span>
                </span>
                <span className="small">dès {formatPrice(minPrice(p))} HT</span>
              </Link>
            </li>
          ))}
        </ul>
        {q && results.length === 0 ? (
          <p className="small">
            Aucun résultat. Vous cherchez une référence hors catalogue ?{" "}
            <Link href="/contact?sujet=synthese" onClick={onClose}>
              Demandez une synthèse sur mesure
            </Link>
            .
          </p>
        ) : null}
        <div className="chips" style={{ marginTop: 14 }}>
          {categories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="tag" onClick={onClose}>
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
