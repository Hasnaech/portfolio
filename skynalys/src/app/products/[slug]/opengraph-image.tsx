import { getCategory, getProduct, products } from "@/lib/catalog";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Fiche produit Skynalys";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  return ogImage({
    eyebrow: p ? getCategory(p.category)?.name ?? "Catalogue" : "Catalogue",
    title: p?.name ?? "Skynalys",
    subtitle: p ? p.variants.map((v) => v.label).join(" · ") : undefined,
  });
}
