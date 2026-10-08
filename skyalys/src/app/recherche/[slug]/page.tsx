import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { getCategory, getProduct, isPurchasable } from "@/lib/catalog";
import { articleLd } from "@/lib/jsonld";
import {
  monographDescription,
  monographProducts,
  monographSections,
  monographTitle,
  readingMinutes,
  relatedMonographs,
} from "@/lib/monograph";
import { absoluteUrl, formatPrice, researchDisclaimer, site } from "@/lib/site";
import { minPrice } from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return monographProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: monographTitle(p),
    description: monographDescription(p),
    alternates: { canonical: `/recherche/${p.slug}` },
    openGraph: { type: "article", title: monographTitle(p), description: monographDescription(p), url: `/recherche/${p.slug}` },
  };
}

export default async function MonographPage({ params }: { params: Promise<Params> }) {
  const p = getProduct((await params).slug);
  if (!p || p.format === "consommable") notFound();
  const category = getCategory(p.category)!;
  const sections = monographSections(p);
  const related = relatedMonographs(p);
  const buyable = isPurchasable(p);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Encyclopédie", path: "/recherche" },
          { name: category.name, path: `/categories/${category.slug}` },
          { name: p.name, path: `/recherche/${p.slug}` },
        ]}
      />
      <article className="section container" style={{ paddingTop: 24 }}>
        <div className="prose" style={{ margin: "0 auto" }}>
          <Link href={`/categories/${category.slug}`} className="tag tag-accent">
            {category.name}
          </Link>
          <h1 style={{ marginTop: 12 }}>{monographTitle(p)}</h1>
          <p className="small muted">
            Équipe scientifique {site.name} · {readingMinutes(p)} min de lecture · recherche in vitro
          </p>

          <div className="card" style={{ background: "var(--bg)", margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div>
                <strong style={{ color: "var(--brand-900)" }}>{p.name}</strong>
                <div className="small muted">
                  {buyable ? `Disponible dès ${formatPrice(minPrice(p))} HT` : "Référence sur devis"} · {p.variants.map((v) => v.label).join(" · ")}
                </div>
              </div>
              <Link href={buyable ? `/products/${p.slug}` : `/quote?produit=${p.slug}`} className="btn btn-accent" style={{ minHeight: 40 }}>
                {buyable ? "Voir la fiche produit" : "Demander un devis"} <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>

          <nav className="card" aria-label="Sommaire" style={{ margin: "20px 0" }}>
            <strong>Sommaire</strong>
            <ol style={{ margin: "8px 0 0", paddingLeft: 20 }}>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.heading}</a>
                </li>
              ))}
              {p.faqs.length ? (
                <li>
                  <a href="#faq">Questions fréquentes</a>
                </li>
              ) : null}
            </ol>
          </nav>

          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2>{s.heading}</h2>
              {s.paragraphs?.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {s.list ? (
                <ul>
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {p.faqs.length ? (
            <section id="faq">
              <h2>Questions fréquentes sur le {p.name}</h2>
              <Faq items={p.faqs} />
            </section>
          ) : null}

          {p.references.length ? (
            <section id="references">
              <h2>Références scientifiques</h2>
              <ul>
                {p.references.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer">
                      {r.title}
                    </a>
                    <div className="small muted">{r.source}</div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="small muted" style={{ borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: 32 }}>
            {researchDisclaimer}
          </p>
        </div>

        {related.length ? (
          <section style={{ marginTop: 48 }}>
            <h2>Molécules associées</h2>
            <div className="grid grid-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/recherche/${r.slug}`} className="card card-link">
                  <h3 style={{ fontSize: "1rem" }}>{r.name}</h3>
                  <p className="small muted" style={{ marginBottom: 0 }}>
                    {r.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <JsonLd
        data={[
          articleLd({ slug: p.slug, title: monographTitle(p), excerpt: monographDescription(p), date: "2026-10-01" }),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Encyclopédie", item: absoluteUrl("/recherche") },
              { "@type": "ListItem", position: 2, name: category.name, item: absoluteUrl(`/categories/${category.slug}`) },
              { "@type": "ListItem", position: 3, name: p.name, item: absoluteUrl(`/recherche/${p.slug}`) },
            ],
          },
        ]}
      />
    </>
  );
}
