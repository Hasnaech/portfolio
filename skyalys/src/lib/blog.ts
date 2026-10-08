export type BlogCategory = { slug: string; name: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingMinutes: number;
  related: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

export const blogCategories: BlogCategory[] = [
  { slug: "methodes-analytiques", name: "Méthodes analytiques" },
  { slug: "guides-recherche", name: "Guides de recherche" },
  { slug: "bonnes-pratiques", name: "Bonnes pratiques de laboratoire" },
];

export const posts: Post[] = [
  {
    slug: "lire-un-certificat-analyse-peptide-hplc-ms",
    title: "Lire un certificat d’analyse de peptide : HPLC, spectrométrie de masse et teneur nette",
    excerpt:
      "Pureté chromatographique, identité moléculaire et quantité réelle de peptide sont trois informations différentes. Voici comment les lire sans les confondre.",
    category: "methodes-analytiques",
    date: "2026-09-15",
    readingMinutes: 7,
    related: ["retatrutide", "bpc-157", "ghk-cu"],
    sections: [
      {
        heading: "Trois questions, trois méthodes",
        paragraphs: [
          "Un certificat d’analyse répond à trois questions distinctes. Le produit est-il bien le bon composé ? Quelle proportion d’impuretés contient-il ? Quelle quantité de peptide se trouve réellement dans le flacon ? Aucune méthode ne répond seule aux trois.",
          "La spectrométrie de masse (MS) confirme l’identité : la masse mesurée doit correspondre à la masse théorique du peptide. La chromatographie liquide haute performance (HPLC) estime la pureté relative. La teneur nette en peptide, enfin, demande une quantification spécifique, par exemple une analyse d’acides aminés ou une analyse élémentaire de l’azote.",
        ],
      },
      {
        heading: "Ce que dit vraiment un pourcentage HPLC",
        paragraphs: [
          "Un résultat « 99 % HPLC » signifie que le pic principal représente 99 % de l’aire des pics détectés, dans les conditions de la méthode : colonne, gradient, longueur d’onde. Une impureté qui coélue avec le pic principal ou qui n’absorbe pas à la longueur d’onde choisie reste invisible.",
          "Ce chiffre ne dit rien de l’eau résiduelle ni des contre-ions (souvent l’acétate ou le trifluoroacétate). Un peptide pur à 99 % en HPLC peut ne contenir que 70 à 85 % de peptide en masse.",
        ],
      },
      {
        heading: "Points de contrôle avant de valider un lot",
        paragraphs: [
          "Vérifiez que le numéro de lot du certificat correspond à celui du flacon reçu. Contrôlez que le chromatogramme et le spectre de masse sont joints, pas seulement un tableau de résultats. Notez la date d’analyse et le laboratoire qui l’a réalisée.",
          "Pour les expériences quantitatives, consignez la référence du lot avec vos données brutes. En cas de résultat inattendu, c’est la première information que l’on vous demandera.",
        ],
      },
    ],
  },
  {
    slug: "reconstitution-aliquotage-conservation-peptides",
    title: "Reconstitution, aliquotage et conservation des peptides lyophilisés",
    excerpt:
      "La majorité des pertes d’activité vient de la manipulation, pas de la synthèse. Protocole type pour préparer et conserver vos solutions mères.",
    category: "bonnes-pratiques",
    date: "2026-09-02",
    readingMinutes: 6,
    related: ["bac-water", "acetic-acid", "syringes-1ml"],
    sections: [
      {
        heading: "Avant d’ouvrir le flacon",
        paragraphs: [
          "Laissez le flacon revenir à température ambiante avant ouverture pour éviter la condensation. Centrifugez brièvement pour rassembler la poudre au fond.",
        ],
      },
      {
        heading: "Choisir le solvant",
        paragraphs: [
          "Commencez par de l’eau stérile. Un peptide basique se dissout souvent mieux en milieu légèrement acide (acide acétique dilué), un peptide acide en milieu légèrement basique. Les peptides très hydrophobes peuvent nécessiter une petite fraction de DMSO, à valider avec votre modèle cellulaire.",
          "Ajoutez le solvant le long de la paroi, puis mélangez par retournements doux. Évitez le vortex prolongé, qui favorise l’agrégation et l’oxydation.",
        ],
      },
      {
        heading: "Aliquoter dès la première reconstitution",
        paragraphs: [
          "Répartissez la solution mère en volumes à usage unique. Chaque cycle de congélation et décongélation dégrade une partie du peptide. Étiquetez chaque aliquot avec le nom, la concentration, le lot et la date.",
          "Conservez les aliquots à −20 °C, ou à −80 °C pour un stockage long. Les peptides contenant de la cystéine, de la méthionine ou du tryptophane sont plus sensibles à l’oxydation : limitez leur exposition à l’air.",
        ],
      },
    ],
  },
  {
    slug: "agonistes-incretines-simples-doubles-triples",
    title: "Agonistes incrétines simples, doubles et triples : comparer les récepteurs, pas les slogans",
    excerpt:
      "Sémaglutide, tirzepatide, retatrutide : trois profils de récepteurs différents. Comment construire une comparaison expérimentale qui ait du sens.",
    category: "guides-recherche",
    date: "2026-08-20",
    readingMinutes: 8,
    related: ["semaglutide", "tirzepatide", "retatrutide"],
    sections: [
      {
        heading: "Trois profils de récepteurs",
        paragraphs: [
          "Le sémaglutide est un agoniste sélectif du récepteur GLP-1. La tirzepatide agit sur les récepteurs GIP et GLP-1. La retatrutide ajoute le récepteur du glucagon. Ces trois molécules ne diffèrent donc pas par leur « puissance » mais par la combinaison de récepteurs qu’elles activent.",
        ],
      },
      {
        heading: "Construire une comparaison valable",
        paragraphs: [
          "Une comparaison rigoureuse utilise des lignées exprimant chaque récepteur séparément, puis des systèmes co-exprimant plusieurs récepteurs. Mesurez au moins deux sorties : la production d’AMPc et le recrutement de la β-arrestine, pour mettre en évidence d’éventuels biais de signalisation.",
          "Rapportez les courbes concentration-réponse complètes (EC50 et Emax) plutôt qu’une concentration unique, et incluez un agoniste endogène comme référence pour chaque récepteur.",
        ],
      },
      {
        heading: "Ne pas extrapoler les essais cliniques",
        paragraphs: [
          "Les essais cliniques publiés évaluent des candidats médicaments dans un protocole médical encadré. Leurs résultats ne décrivent pas le comportement d’un réactif de recherche dans un modèle cellulaire, et inversement.",
        ],
      },
    ],
  },
  {
    slug: "choisir-fournisseur-peptides-recherche-checklist",
    title: "Choisir un fournisseur de peptides de recherche : la checklist des laboratoires",
    excerpt:
      "Traçabilité, documents, chaîne du froid, conformité : les dix points à vérifier avant de référencer un fournisseur.",
    category: "bonnes-pratiques",
    date: "2026-08-05",
    readingMinutes: 5,
    related: ["retatrutide", "mots-c"],
    sections: [
      {
        heading: "Documents",
        paragraphs: [
          "Exigez un certificat d’analyse par lot, avec chromatogramme et spectre de masse joints. Demandez la fiche de données de sécurité (FDS) au format européen, indispensable pour votre registre des produits chimiques.",
        ],
      },
      {
        heading: "Traçabilité et logistique",
        paragraphs: [
          "Le numéro de lot doit figurer sur le flacon, le certificat et la facture. Pour les peptides sensibles, vérifiez la possibilité d’une expédition sous froid et la durée maximale de transport.",
        ],
      },
      {
        heading: "Conformité et achats",
        paragraphs: [
          "Un fournisseur sérieux identifie clairement son entité juridique européenne, accepte les bons de commande et la facturation à 30 jours, et vérifie que l’acheteur est un professionnel de la recherche.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const postsByCategory = (slug: string) => posts.filter((p) => p.category === slug);
export const categoryName = (slug: string) => blogCategories.find((c) => c.slug === slug)?.name ?? slug;

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
