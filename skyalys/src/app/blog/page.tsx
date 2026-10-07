import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogCategories, posts } from "@/lib/blog";
import { PostList } from "./PostList";

export const metadata: Metadata = {
  title: "Ressources et guides méthodologiques",
  description:
    "Guides pour les laboratoires : lecture des certificats d’analyse, reconstitution et conservation des peptides, comparaison des agonistes, choix d’un fournisseur.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Breadcrumbs items={[{ name: "Ressources", path: "/blog" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <h1>Ressources et guides</h1>
        <p className="lead">Méthodes analytiques, bonnes pratiques de laboratoire et synthèses de la littérature, rédigées par notre équipe scientifique.</p>
        <div className="chips" style={{ margin: "20px 0 28px" }}>
          {blogCategories.map((c) => (
            <Link key={c.slug} href={`/blog/category/${c.slug}`} className="tag">
              {c.name}
            </Link>
          ))}
          <a href="/blog/rss.xml" className="tag">
            Flux RSS
          </a>
        </div>
        <PostList items={sorted} />
      </section>
    </>
  );
}
