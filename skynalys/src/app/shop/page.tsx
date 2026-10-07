import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { categories, formats, minPrice, products, type CategorySlug, type Format } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catalogue des peptides de recherche",
  description:
    "Toutes les références Skynalys : peptides lyophilisés de grade recherche, solvants et consommables de laboratoire. Lots tracés et COA par lot.",
  alternates: { canonical: "/shop" },
};

type Search = { categorie?: string; format?: string; q?: string; tri?: string };

const sorts = [
  { slug: "pertinence", name: "Pertinence" },
  { slug: "nom", name: "Nom (A à Z)" },
  { slug: "prix", name: "Prix croissant" },
  { slug: "nouveautes", name: "Nouveautés" },
];

function href(current: Search, patch: Partial<Search>) {
  const next = { ...current, ...patch };
  const qs = new URLSearchParams(Object.entries(next).filter(([, v]) => v) as [string, string][]).toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").toLowerCase().trim();
  let list = products.filter(
    (p) =>
      (!sp.categorie || p.category === (sp.categorie as CategorySlug)) &&
      (!sp.format || p.format === (sp.format as Format)) &&
      (!q || [p.name, ...p.synonyms, p.cas ?? ""].join(" ").toLowerCase().includes(q)),
  );
  if (sp.tri === "nom") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "fr"));
  if (sp.tri === "prix") list = [...list].sort((a, b) => minPrice(a) - minPrice(b));
  if (sp.tri === "nouveautes") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));

  return (
    <>
      <Breadcrumbs items={[{ name: "Catalogue", path: "/shop" }]} />
      <div className="container">
        <h1 style={{ marginTop: 16 }}>Catalogue</h1>
        <p className="lead">
          {products.length} références de grade recherche. Prix hors taxes, remises dégressives appliquées automatiquement au panier.
        </p>
      </div>
      <div className="container shop-layout">
        <aside className="filters" aria-label="Filtres">
          <form action="/shop" role="search">
            <label htmlFor="shop-q" className="visually-hidden">
              Rechercher
            </label>
            <input id="shop-q" name="q" defaultValue={sp.q} className="input" placeholder="Nom, synonyme ou CAS" />
          </form>
          <h3>Catégorie</h3>
          <Link href={href(sp, { categorie: undefined })} aria-current={!sp.categorie}>
            Toutes
          </Link>
          {categories.map((c) => (
            <Link key={c.slug} href={href(sp, { categorie: c.slug })} aria-current={sp.categorie === c.slug}>
              {c.name}
            </Link>
          ))}
          <h3>Format</h3>
          <Link href={href(sp, { format: undefined })} aria-current={!sp.format}>
            Tous
          </Link>
          {formats.map((f) => (
            <Link key={f.slug} href={href(sp, { format: f.slug })} aria-current={sp.format === f.slug}>
              {f.name}
            </Link>
          ))}
          <h3>Trier par</h3>
          {sorts.map((s) => (
            <Link key={s.slug} href={href(sp, { tri: s.slug === "pertinence" ? undefined : s.slug })} aria-current={(sp.tri ?? "pertinence") === s.slug}>
              {s.name}
            </Link>
          ))}
        </aside>
        <div>
          <p className="small muted" style={{ marginTop: 0 }}>
            {list.length} résultat{list.length > 1 ? "s" : ""}
          </p>
          {list.length ? (
            <div className="grid grid-3">
              {list.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="card">
              <p>Aucune référence ne correspond à ces critères.</p>
              <Link href="/quote" className="btn btn-primary">
                Demander une synthèse sur mesure
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
