import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { categoryName, formatDate, getPost, posts } from "@/lib/blog";
import { getProduct } from "@/lib/catalog";
import { articleLd } from "@/lib/jsonld";
import { researchDisclaimer, site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date, url: `/blog/${p.slug}` },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const related = p.related.map((s) => getProduct(s)).filter((x): x is NonNullable<typeof x> => !!x);
  const others = posts.filter((x) => x.slug !== p.slug).slice(0, 2);
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Ressources", path: "/blog" },
          { name: categoryName(p.category), path: `/blog/category/${p.category}` },
          { name: p.title, path: `/blog/${p.slug}` },
        ]}
      />
      <article className="section container" style={{ paddingTop: 24 }}>
        <div className="prose" style={{ margin: "0 auto" }}>
          <Link href={`/blog/category/${p.category}`} className="tag tag-accent">
            {categoryName(p.category)}
          </Link>
          <h1 style={{ marginTop: 12 }}>{p.title}</h1>
          <p className="lead">{p.excerpt}</p>
          <p className="small muted">
            Équipe scientifique {site.name} · {formatDate(p.date)} · {p.readingMinutes} min de lecture
          </p>
          <nav className="card" aria-label="Sommaire" style={{ margin: "24px 0" }}>
            <strong>Sommaire</strong>
            <ol style={{ margin: "8px 0 0", paddingLeft: 20 }}>
              {p.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#s${i + 1}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
          {p.sections.map((s, i) => (
            <section key={s.heading} id={`s${i + 1}`}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </section>
          ))}
          <p className="small muted" style={{ borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: 32 }}>
            {researchDisclaimer}
          </p>
        </div>
        {related.length ? (
          <section style={{ marginTop: 48 }}>
            <h2>Références citées dans ce guide</h2>
            <div className="grid grid-4">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </div>
          </section>
        ) : null}
        <section style={{ marginTop: 48 }}>
          <h2>À lire aussi</h2>
          <div className="grid grid-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}`} className="card card-link">
                <h3>{o.title}</h3>
                <p className="small muted" style={{ marginBottom: 0 }}>
                  {o.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
      <JsonLd data={articleLd(p)} />
    </>
  );
}
