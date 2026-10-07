import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { categories, productsByCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catégories de recherche",
  description: "Peptides de recherche classés par axe : métabolique, régénération tissulaire, neurosciences, longévité, dermo-cosmétique et consommables.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Catégories", path: "/categories" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <h1>Catégories de recherche</h1>
        <p className="lead">Choisissez un axe de recherche pour accéder aux références, aux guides associés et aux données de chaque lot.</p>
        <div className="grid grid-3" style={{ marginTop: 24 }}>
          {categories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="card card-link">
              <span className="tag tag-accent">{productsByCategory(c.slug).length} références</span>
              <h2 style={{ fontSize: "1.3rem", marginTop: 12 }}>{c.name}</h2>
              <p className="muted small" style={{ marginBottom: 0 }}>
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
