import { getCategory, products, type Product } from "./catalog";
import { site } from "./site";

// L'encyclopedie de recherche : une fiche-article unique par molecule, construite
// a partir des donnees propres du produit (mecanisme, axes, identite, references).
// Chaque page est informationnelle (non commerciale) et renvoie vers la fiche produit.

export const monographProducts = products.filter((p) => p.format !== "consommable");

export const hasMonograph = (slug: string) => monographProducts.some((p) => p.slug === slug);

export function monographTitle(p: Product) {
  const syn = p.synonyms[0] ? ` (${p.synonyms[0]})` : "";
  return `${p.name}${syn} : mécanisme, recherche et données`;
}

export function monographDescription(p: Product) {
  const cas = p.cas ? ` CAS ${p.cas}.` : "";
  return `${p.name} : ${p.summary} Mécanisme, axes de recherche, identité chimique et références scientifiques.${cas}`.slice(0, 300);
}

export function readingMinutes(p: Product) {
  const words = (p.mechanism + p.researchAreas.join(" ") + p.faqs.map((f) => f.q + f.a).join(" ")).split(/\s+/).length;
  return Math.max(4, Math.round(words / 180) + 3);
}

export type Section = { id: string; heading: string; paragraphs?: string[]; list?: string[] };

export function monographSections(p: Product): Section[] {
  const category = getCategory(p.category);
  const syn = p.synonyms.length ? ` (aussi appelé ${p.synonyms.join(", ")})` : "";
  const intro = `${p.name}${syn} est un composé de grade recherche étudié dans le domaine « ${category?.name} » : ${
    category?.short.toLowerCase() ?? ""
  }. ${p.summary} Cette fiche réunit, pour les laboratoires et les équipes de recherche, le mécanisme étudié, les principaux axes de travail, l’identité chimique et les références scientifiques utiles.`;

  const sections: Section[] = [
    { id: "presentation", heading: `Qu’est-ce que le ${p.name} ?`, paragraphs: [intro] },
    { id: "mecanisme", heading: `Mécanisme du ${p.name} étudié en recherche`, paragraphs: [p.mechanism] },
    { id: "axes", heading: "Principaux axes de recherche", list: p.researchAreas },
  ];

  const identity: string[] = [];
  if (p.synonyms.length) identity.push(`Synonymes : ${p.synonyms.join(", ")}.`);
  if (p.cas) identity.push(`Numéro CAS : ${p.cas}.`);
  if (p.formula) identity.push(`Formule brute : ${p.formula}.`);
  if (p.molarMass) identity.push(`Masse molaire : ${p.molarMass.toLocaleString("fr-FR")} g/mol.`);
  identity.push(`Conditionnements étudiés : ${p.variants.map((v) => v.label).join(", ")}.`);
  sections.push({
    id: "identite",
    heading: `Identité chimique du ${p.name}`,
    paragraphs: [`Les données suivantes servent à identifier sans ambiguïté le composé et à retrouver la littérature associée.`],
    list: identity,
  });

  if (p.format === "lyophilise") {
    sections.push({
      id: "manipulation",
      heading: "Manipulation et conservation au laboratoire",
      paragraphs: [
        `Le ${p.name} est fourni sous forme lyophilisée. Laisser le flacon revenir à température ambiante avant ouverture, reconstituer avec un solvant adapté (eau stérile ou eau bactériostatique), puis aliquoter la solution mère pour éviter les cycles de congélation et décongélation.`,
        p.storage,
      ],
    });
  }

  sections.push({
    id: "coa",
    heading: "Lire le certificat d’analyse",
    paragraphs: [
      `Chaque lot de ${p.name} est contrôlé par HPLC pour la pureté relative et par spectrométrie de masse pour l’identité moléculaire. La pureté HPLC ne renseigne pas à elle seule la teneur nette en peptide, qui dépend aussi de l’eau et des contre-ions. Conservez la référence du lot avec vos données brutes.`,
    ],
  });

  if (p.regulated) {
    sections.push({
      id: "cadre",
      heading: "Cadre réglementaire",
      paragraphs: [
        `Le ${p.name} est une référence réglementée. ${
          p.quoteOnly
            ? "Elle n’est pas vendue en ligne : cette fiche est fournie à titre documentaire et toute mise à disposition passe par une évaluation de l’établissement demandeur."
            : "Sa cession est soumise à une vérification renforcée de l’établissement et de l’usage déclaré."
        } Les règles applicables varient selon les pays : vérifiez la réglementation locale avant tout projet de recherche.`,
      ],
    });
  }

  return sections;
}

export function relatedMonographs(p: Product, n = 4) {
  return monographProducts.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, n);
}

export function monographUrl(slug: string) {
  return `${site.url}/recherche/${slug}`;
}
