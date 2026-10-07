import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Skyalys, peptides de grade recherche pour laboratoires";

export default function Image() {
  return ogImage({
    eyebrow: "Fournisseur européen pour la recherche",
    title: "Des peptides de recherche dont chaque lot est documenté",
  });
}
