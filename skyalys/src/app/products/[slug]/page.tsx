import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BuyBox } from "@/components/BuyBox";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { VialArt } from "@/components/VialArt";
import { posts } from "@/lib/blog";
import { batchFor, getCategory, getProduct, products } from "@/lib/catalog";
import { productLd } from "@/lib/jsonld";
import { clampMeta, researchDisclaimer } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const title = `${p.name}${p.synonyms[0] ? ` (${p.synonyms[0]})` : ""} | Grade recherche, COA par lot`;
  const description = clampMeta(`${p.summary} Lot tracé, COA par lot (HPLC et MS), FDS.`);
  return {
    title,
    description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { type: "website", title, description, url: `/products/${p.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const category = getCategory(p.category)!;
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const guides = posts.filter((g) => g.related.includes(p.slug));
  const isReagent = p.format !== "consommable";

  const identity: [string, string | null][] = [
    ["Synonymes", p.synonyms.length ? p.synonyms.join(" · ") : null],
    ["Numéro CAS", p.cas],
    ["Formule brute", p.formula],
    ["Masse molaire", p.molarMass ? `${p.molarMass.toLocaleString("fr-FR")} g/mol` : null],
    ["Identifiant PubChem", p.pubchem],
    ["Spécification", p.purity],
    ["Aspect", p.appearance],
    ["Conditionnements", p.variants.map((v) => v.label).join(" · ")],
    ["Conservation", p.storage],
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: category.name, path: `/categories/${category.slug}` },
          { name: p.name, path: `/products/${p.slug}` },
        ]}
      />
      <div className="container pdp">
        <div className="pdp-media-wrap">
          <div className="pdp-media">
            {p.isNew ? <span className="tag tag-new">Nouveau</span> : null}
            <VialArt product={p} label={p.variants[0].label} size={280} />
          </div>
          <div className="pdp-badges">
            <div>
              <Icon name="file" size={18} /> COA par lot
            </div>
            <div>
              <Icon name="flask" size={18} /> HPLC et MS
            </div>
            <div>
              <Icon name="shield" size={18} /> FDS fournie
            </div>
            <div>
              <Icon name="snow" size={18} /> Option froid
            </div>
          </div>
        </div>

        <div>
          <Link href={`/categories/${category.slug}`} className="tag tag-accent">
            {category.name}
          </Link>
          <h1 style={{ marginTop: 12 }}>{p.name}</h1>
          {isReagent ? (
            <p style={{ marginTop: -6, color: "var(--muted)", fontWeight: 600 }}>Peptide de grade recherche</p>
          ) : null}
          <p className="lead">{p.summary}</p>
          <div className="notice" role="note">
            <Icon name="info" size={18} />
            <span>Usage exclusif en recherche in vitro et en analyse. Ne pas administrer à l’homme ni à l’animal.</span>
          </div>
          {p.regulated ? (
            <div className="notice" role="note" style={{ marginTop: 10 }}>
              <Icon name="shield" size={18} />
              <span>
                Référence réglementée. {p.quoteOnly ? "Non vendue en ligne : disponible uniquement sur devis à des structures de recherche autorisées, après vérification." : "Vente soumise à vérification renforcée de l’établissement et de l’usage déclaré."} Sa cession peut être strictement encadrée selon votre pays.
              </span>
            </div>
          ) : null}
          {p.quoteOnly ? (
            <div style={{ marginTop: 20 }}>
              <Link href={`/quote?produit=${p.slug}`} className="btn btn-primary">
                Demander un devis
              </Link>
              <p className="small muted" style={{ marginTop: 10 }}>
                Cette référence est fournie à titre documentaire. Notre équipe évalue chaque demande avant toute proposition commerciale.
              </p>
            </div>
          ) : (
            <>
              <p className="small" style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center", color: "var(--mint-ink)", fontWeight: 600 }}>
                <Icon name="check" size={16} /> En stock, expédition sous 24 à 48 h ouvrées
              </p>
              <BuyBox product={p} />
            </>
          )}
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 56 }}>
        <nav className="tabs" aria-label="Sections de la fiche">
          <a href="#description">Description</a>
          <a href="#identite">Identité chimique</a>
          <a href="#analyses">Analyses</a>
          {p.references.length ? <a href="#references">Références</a> : null}
          {p.faqs.length ? <a href="#faq">FAQ</a> : null}
        </nav>

        <div className="grid grid-2" style={{ gap: 48, alignItems: "start" }}>
          <div className="prose">
            <section id="description">
              <h2>Description</h2>
              <h3>Mécanisme étudié</h3>
              <p>{p.mechanism}</p>
              <p className="small">
                <Link href={`/recherche/${p.slug}`}>Lire la fiche de recherche complète du {p.name}</Link> : mécanisme détaillé, axes
                d’étude, identité chimique et références.
              </p>
              <h3>Domaines de recherche</h3>
              <ul>
                {p.researchAreas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              {isReagent ? (
                <>
                  <h3>Bonnes pratiques de préparation</h3>
                  <p>
                    Laisser le flacon revenir à température ambiante avant ouverture, reconstituer avec un solvant adapté puis aliquoter la
                    solution mère. Consigner le numéro de lot avec les données brutes de l’expérience.{" "}
                    <Link href="/blog/reconstitution-aliquotage-conservation-peptides">Voir le protocole détaillé</Link>.
                  </p>
                </>
              ) : null}
              <p className="small muted">{researchDisclaimer}</p>
            </section>
          </div>
          <div>
            <section id="identite">
              <h2>Identité chimique</h2>
              <div className="table-wrap">
                <table className="spec-table">
                  <tbody>
                    {identity
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <tr key={k}>
                          <th scope="row">{k}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section id="analyses" style={{ marginTop: 32 }}>
              <h2>Analyses par lot</h2>
              <div className="table-wrap">
                <table className="data-table" style={{ minWidth: 0 }}>
                  <thead>
                    <tr>
                      <th>Conditionnement</th>
                      <th>Lot</th>
                      <th>Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.variants.map((v) => {
                      const b = batchFor(v.sku);
                      return (
                        <tr key={v.sku}>
                          <td>{v.label}</td>
                          <td>{b?.lot ?? "À venir"}</td>
                          <td>
                            {b?.coaUrl ? (
                              <a href={b.coaUrl}>COA</a>
                            ) : (
                              <span className="small muted">COA joint à l’expédition</span>
                            )}
                            {b?.sdsUrl ? (
                              <>
                                {" · "}
                                <a href={b.sdsUrl}>FDS</a>
                              </>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="small muted" style={{ marginTop: 8 }}>
                Tous les certificats sont regroupés sur la page <Link href="/lab-tests">Analyses et COA</Link>.
              </p>
            </section>
          </div>
        </div>

        {p.references.length ? (
          <section id="references" style={{ marginTop: 48 }}>
            <h2>Références scientifiques</h2>
            <ul style={{ paddingLeft: 18 }}>
              {p.references.map((r) => (
                <li key={r.url} style={{ marginBottom: 8 }}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    {r.title}
                  </a>
                  <div className="small muted">{r.source}</div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {p.faqs.length ? (
          <section id="faq" style={{ marginTop: 48, maxWidth: 820 }}>
            <h2>Questions de recherche</h2>
            <Faq items={p.faqs} />
          </section>
        ) : null}

        {guides.length ? (
          <section style={{ marginTop: 48 }}>
            <h2>Guides associés</h2>
            <div className="grid grid-3">
              {guides.map((g) => (
                <Link key={g.slug} href={`/blog/${g.slug}`} className="card card-link">
                  <h3>{g.title}</h3>
                  <p className="small muted" style={{ marginBottom: 0 }}>
                    {g.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {related.length ? (
          <section style={{ marginTop: 48 }}>
            <h2>Références associées</h2>
            <div className="grid grid-4">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <JsonLd data={productLd(p)} />
    </>
  );
}
