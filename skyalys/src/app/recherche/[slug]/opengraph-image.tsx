import { getCategory, getProduct } from "@/lib/catalog";
import { monographProducts } from "@/lib/monograph";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Fiche de recherche Skyalys";

export function generateStaticParams() {
  return monographProducts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  return ogImage({
    eyebrow: p ? `Fiche de recherche · ${getCategory(p.category)?.name}` : "Encyclopédie",
    title: p?.name ?? "Skyalys",
    subtitle: "Mécanisme · recherche · données",
  });
}
