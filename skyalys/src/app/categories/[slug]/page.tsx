import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { posts } from "@/lib/blog";
import { categories, getCategory, productsByCategory } from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} : peptides de recherche`,
    description: c.description,
    alternates: { canonical: `/categories/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  const list = productsByCategory(c.slug);
  const slugs = new Set(list.map((p) => p.slug));
  const guides = posts.filter((p) => p.related.some((r) => slugs.has(r)));
  return (
    <>
      <Breadcrumbs items={[{ name: "Catégories", path: "/categories" }, { name: c.name, path: `/categories/${c.slug}` }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <span className="eyebrow">{c.short}</span>
        <h1>{c.name}</h1>
        <p className="lead">{c.description}</p>
        <div className="grid grid-4" style={{ marginTop: 28 }}>
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {guides.length ? (
          <div style={{ marginTop: 48 }}>
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
          </div>
        ) : null}
      </section>
    </>
  );
}
