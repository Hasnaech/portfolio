import { blogCategories, posts } from "@/lib/blog";
import { categories, productsByCategory } from "@/lib/catalog";
import { monographProducts } from "@/lib/monograph";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

// /llms.txt : plan du site lisible par les moteurs de recherche IA (GEO / AEO).
export function GET() {
  const lines: string[] = [];
  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.metaDescription}`);
  lines.push("");
  lines.push(
    "Site B2B réservé aux professionnels de la recherche. Produits destinés exclusivement à la recherche in vitro et aux usages analytiques ; non destinés à l’usage humain ou animal. Contenu scientifique, sans conseil médical.",
  );
  lines.push("");
  lines.push("## Catégories de recherche");
  for (const c of categories) {
    lines.push(`- [${c.name}](${absoluteUrl(`/categories/${c.slug}`)}) : ${c.description} (${productsByCategory(c.slug).length} références)`);
  }
  lines.push("");
  lines.push("## Encyclopédie des peptides de recherche");
  lines.push(`Fiches scientifiques (mécanisme, axes de recherche, identité chimique, références) :`);
  for (const p of monographProducts) {
    lines.push(`- [${p.name}](${absoluteUrl(`/recherche/${p.slug}`)}) : ${p.summary}`);
  }
  lines.push("");
  lines.push("## Guides et articles");
  for (const bc of blogCategories) lines.push(`- Catégorie : [${bc.name}](${absoluteUrl(`/blog/category/${bc.slug}`)})`);
  for (const a of [...posts].sort((x, y) => y.date.localeCompare(x.date))) {
    lines.push(`- [${a.title}](${absoluteUrl(`/blog/${a.slug}`)}) : ${a.excerpt}`);
  }
  lines.push("");
  lines.push("## Pages clés");
  lines.push(`- [Catalogue](${absoluteUrl("/shop")})`);
  lines.push(`- [Analyses et certificats (COA)](${absoluteUrl("/lab-tests")})`);
  lines.push(`- [Calculateur de molarité](${absoluteUrl("/calculator")})`);
  lines.push(`- [Compte professionnel](${absoluteUrl("/pro")})`);
  lines.push(`- [Contact](${absoluteUrl("/contact")})`);
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
