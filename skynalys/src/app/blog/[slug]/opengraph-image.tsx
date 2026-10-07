import { categoryName, getPost, posts } from "@/lib/blog";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Guide Skynalys";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  return ogImage({ eyebrow: p ? categoryName(p.category) : "Ressources", title: p?.title ?? "Skynalys" });
}
