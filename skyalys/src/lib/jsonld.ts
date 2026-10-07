import type { Product } from "./catalog";
import { getCategory } from "./catalog";
import { absoluteUrl, site } from "./site";

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  logo: absoluteUrl("/icon.svg"),
  description: site.description,
  areaServed: "European Union",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  vatID: site.registration.vat,
  sameAs: [site.social.linkedin],
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: site.url,
  name: site.name,
  inLanguage: "fr-FR",
  publisher: { "@id": absoluteUrl("/#organization") },
  potentialAction: {
    "@type": "SearchAction",
    target: `${absoluteUrl("/shop")}?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const productLd = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  "@id": absoluteUrl(`/products/${p.slug}#product`),
  name: p.name,
  description: p.summary,
  url: absoluteUrl(`/products/${p.slug}`),
  productGroupID: p.slug,
  brand: { "@type": "Brand", name: site.name },
  category: getCategory(p.category)?.name,
  image: absoluteUrl(`/products/${p.slug}/opengraph-image`),
  variesBy: ["https://schema.org/size"],
  hasVariant: p.variants.map((v) => ({
    "@type": "Product",
    "@id": absoluteUrl(`/products/${p.slug}#${v.sku}`),
    name: `${p.name} ${v.label}`,
    sku: v.sku,
    size: v.label,
    image: absoluteUrl(`/products/${p.slug}/opengraph-image`),
    offers: {
      "@type": "Offer",
      price: v.price.toFixed(2),
      priceCurrency: site.currency,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: absoluteUrl(`/products/${p.slug}?variant=${v.sku}`),
      seller: { "@id": absoluteUrl("/#organization") },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: v.price.toFixed(2),
        priceCurrency: site.currency,
        valueAddedTaxIncluded: false,
      },
    },
  })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const articleLd = (a: { slug: string; title: string; excerpt: string; date: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.excerpt,
  datePublished: a.date,
  dateModified: a.date,
  inLanguage: "fr-FR",
  mainEntityOfPage: absoluteUrl(`/blog/${a.slug}`),
  image: absoluteUrl(`/blog/${a.slug}/opengraph-image`),
  author: { "@type": "Organization", name: `Équipe scientifique ${site.name}` },
  publisher: { "@id": absoluteUrl("/#organization") },
});
