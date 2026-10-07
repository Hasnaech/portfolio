import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogCategories, postsByCategory } from "@/lib/blog";
import { PostList } from "../../PostList";

type Params = { slug: string };

export function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = blogCategories.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: `${c.name} : guides`, alternates: { canonical: `/blog/category/${c.slug}` } };
}

export default async function BlogCategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = blogCategories.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Ressources", path: "/blog" },
          { name: c.name, path: `/blog/category/${c.slug}` },
        ]}
      />
      <section className="section container" style={{ paddingTop: 24 }}>
        <h1>{c.name}</h1>
        <PostList items={postsByCategory(c.slug)} />
      </section>
    </>
  );
}
