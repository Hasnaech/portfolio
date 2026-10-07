import { posts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${absoluteUrl(`/blog/${p.slug}`)}</link><guid>${absoluteUrl(`/blog/${p.slug}`)}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)} : ressources</title><link>${absoluteUrl("/blog")}</link><description>${esc(site.description)}</description><language>fr-FR</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
