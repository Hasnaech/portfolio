import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { categories } from "@/lib/catalog";
import { monographProducts, readingMinutes } from "@/lib/monograph";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Encyclopédie des peptides de recherche",
  description:
    "Fiches scientifiques de référence sur les peptides de recherche : mécanisme, axes d’étude, identité chimique et sources. Plus de 70 molécules documentées pour les laboratoires.",
  alternates: { canonical: "/recherche" },
};

export default function RecherchePage() {
  const byCat = categories
    .map((c) => ({ c, items: monographProducts.filter((p) => p.category === c.slug) }))
    .filter((g) => g.items.length);

  return (
    <>
      <Breadcrumbs items={[{ name: "Encyclopédie", path: "/recherche" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <span className="eyebrow">Base de connaissances</span>
        <h1>Encyclopédie des peptides de recherche</h1>
        <p className="lead">
          {monographProducts.length} fiches scientifiques pour les laboratoires et les équipes de recherche. Chaque fiche détaille le mécanisme
          étudié, les axes de recherche, l’identité chimique et les références, sans conseil médical ni usage humain.
        </p>
        {byCat.map(({ c, items }) => (
          <div key={c.slug} style={{ marginTop: 40 }}>
            <div className="section-head" style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: "1.4rem", margin: 0 }}>{c.name}</h2>
              <Link href={`/categories/${c.slug}`} className="small">
                Voir les produits →
              </Link>
            </div>
            <p className="muted small" style={{ marginTop: 0 }}>
              {c.description}
            </p>
            <div className="grid grid-3">
              {items.map((p) => (
                <Link key={p.slug} href={`/recherche/${p.slug}`} className="card card-link">
                  <h3 style={{ fontSize: "1.05rem" }}>{p.name}</h3>
                  <p className="small muted" style={{ marginBottom: 6 }}>
                    {p.summary}
                  </p>
                  <span className="small muted">{readingMinutes(p)} min de lecture</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Encyclopédie des peptides de recherche",
          url: absoluteUrl("/recherche"),
          isPartOf: { "@id": absoluteUrl("/#website") },
          about: monographProducts.map((p) => ({ "@type": "Thing", name: p.name, url: absoluteUrl(`/recherche/${p.slug}`) })),
          publisher: { "@id": absoluteUrl("/#organization") },
          inLanguage: "fr-FR",
          description: site.description,
        }}
      />
    </>
  );
}
