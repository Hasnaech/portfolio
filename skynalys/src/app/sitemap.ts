import type { MetadataRoute } from "next";
import { posts, blogCategories } from "@/lib/blog";
import { categories, products } from "@/lib/catalog";
import { legalPages } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/shop", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/categories", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/lab-tests", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/calculator", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/pro", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/quote", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
  ];
  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...categories.map((c) => ({ url: absoluteUrl(`/categories/${c.slug}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: absoluteUrl(`/products/${p.slug}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...blogCategories.map((c) => ({ url: absoluteUrl(`/blog/category/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...legalPages.map((l) => ({ url: absoluteUrl(`/legal/${l.slug}`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
