// Configuration centrale du site. Les valeurs entre crochets sont a completer
// avant la mise en ligne (voir README, section "Avant la mise en ligne").

export const site = {
  name: "Skyalys",
  legalName: "[Raison sociale Skyalys]",
  tagline: "Peptides et réactifs de grade recherche pour laboratoires et centres de recherche clinique",
  description:
    "Fournisseur européen de peptides de grade recherche pour laboratoires, CRO et centres de recherche clinique. Lots tracés, certificats d’analyse par lot, fiches de données de sécurité et devis institutionnels.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://skyalys.eu").replace(/\/$/, ""),
  locale: "fr_FR",
  email: "contact@skyalys.eu",
  ordersEmail: "commandes@skyalys.eu",
  phone: "[+33 0 00 00 00 00]",
  address: {
    street: "[Adresse]",
    postalCode: "[Code postal]",
    city: "[Ville]",
    country: "FR",
  },
  registration: {
    siren: "[SIREN]",
    vat: "[TVA intracommunautaire]",
  },
  currency: "EUR",
  freeShippingThreshold: 300,
  shippingFlat: 14.9,
  coldChainFee: 19.9,
  vatRate: 0.2,
  social: {
    linkedin: "https://www.linkedin.com/company/skyalys",
  },
} as const;

export const trustPoints = [
  "Lots tracés et certificat d’analyse par lot",
  "Contrôle HPLC et spectrométrie de masse",
  "Fiches de données de sécurité (FDS) téléchargeables",
  "Devis et bons de commande institutionnels",
  `Livraison offerte dès ${site.freeShippingThreshold} € HT`,
  "Expédition sous froid sur demande",
];

export const researchDisclaimer =
  "Les produits Skyalys sont destinés exclusivement à la recherche in vitro et aux usages analytiques en laboratoire. Ils ne sont pas destinés à l’administration humaine ou animale, ni au diagnostic, à la prévention ou au traitement d’une maladie.";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
