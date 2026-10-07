// Catalogue Skynalys. Toutes les donnees produit sont centralisees ici.
// Les champs chimiques (CAS, formule, masse molaire, PubChem) doivent etre
// verifies contre le certificat d'analyse du fournisseur avant publication.
// Un champ laisse a null n'est pas affiche sur le site.

export type CategorySlug =
  | "metabolique"
  | "regeneration-tissulaire"
  | "neurosciences"
  | "longevite"
  | "dermo-cosmetique"
  | "consommables";

export type Format = "lyophilise" | "solution" | "consommable";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
};

export type Variant = {
  label: string;
  sku: string;
  price: number;
};

export type Reference = { title: string; source: string; url: string };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  format: Format;
  summary: string;
  synonyms: string[];
  cas: string | null;
  formula: string | null;
  molarMass: number | null;
  pubchem: string | null;
  purity: string;
  appearance: string;
  storage: string;
  variants: Variant[];
  mechanism: string;
  researchAreas: string[];
  faqs: { q: string; a: string }[];
  references: Reference[];
  isNew?: boolean;
  featured?: boolean;
};

export const categories: Category[] = [
  {
    slug: "metabolique",
    name: "Métabolique",
    short: "Incrétines, amyline, AMPK",
    description:
      "Agonistes des récepteurs incrétines et analogues de l’amyline pour l’étude de la signalisation métabolique, de la pharmacologie des RCPG et de l’homéostasie énergétique in vitro.",
  },
  {
    slug: "regeneration-tissulaire",
    name: "Régénération tissulaire",
    short: "Réparation, angiogenèse, inflammation",
    description:
      "Peptides étudiés dans les modèles de migration cellulaire, d’angiogenèse, de cicatrisation et de modulation de l’inflammation.",
  },
  {
    slug: "neurosciences",
    name: "Neurosciences",
    short: "Neuropeptides, plasticité",
    description:
      "Analogues de neuropeptides utilisés dans l’étude de la neuroprotection, des facteurs neurotrophiques et de la régulation du stress dans des modèles précliniques.",
  },
  {
    slug: "longevite",
    name: "Longévité",
    short: "Mitochondries, NAD+, sénescence",
    description:
      "Composés étudiés dans la biologie du vieillissement : fonction mitochondriale, métabolisme du NAD+, télomères et sénescence cellulaire.",
  },
  {
    slug: "dermo-cosmetique",
    name: "Dermo-cosmétique",
    short: "Matrice, collagène, pigmentation",
    description:
      "Peptides de recherche pour les modèles cutanés : synthèse de matrice extracellulaire, fibroblastes, kératinocytes et formulation cosmétique.",
  },
  {
    slug: "consommables",
    name: "Consommables",
    short: "Solvants, flacons, stockage",
    description:
      "Solvants de reconstitution, flacons et matériel de stockage pour la préparation et la conservation des peptides au laboratoire.",
  },
];

export const formats: { slug: Format; name: string }[] = [
  { slug: "lyophilise", name: "Lyophilisé" },
  { slug: "solution", name: "Solution" },
  { slug: "consommable", name: "Consommable" },
];

const lyoStorage =
  "Poudre lyophilisée : −20 °C, à l’abri de la lumière et de l’humidité. Après reconstitution : 2 à 8 °C, aliquoter pour éviter les cycles de congélation et décongélation.";

const standardFaqs = (name: string) => [
  {
    q: `Comment le lot de ${name} est-il contrôlé ?`,
    a: "Chaque lot est contrôlé par HPLC (pureté relative) et par spectrométrie de masse (identité moléculaire). Le certificat d’analyse correspondant au lot expédié est disponible dans l’espace Analyses et joint à la commande.",
  },
  {
    q: "Le pourcentage HPLC garantit-il la quantité contenue dans le flacon ?",
    a: "Non. La HPLC mesure la proportion du pic principal dans les conditions de la méthode. La quantité nette de peptide dépend aussi de la teneur en eau et en contre-ions. Pour un dosage précis, nous recommandons une quantification complémentaire dans votre laboratoire.",
  },
  {
    q: "Ce produit peut-il être utilisé chez l’homme ou l’animal ?",
    a: "Non. Il est vendu exclusivement pour la recherche in vitro et les usages analytiques. Toute commande implique l’acceptation de cette restriction.",
  },
];

const pubchemSearch = (term: string): Reference => ({
  title: `Fiche composé : ${term}`,
  source: "PubChem, National Library of Medicine",
  url: `https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(term)}`,
});

const pubmedSearch = (term: string): Reference => ({
  title: `Publications indexées : ${term}`,
  source: "PubMed, National Library of Medicine",
  url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(term)}`,
});

export const products: Product[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide",
    category: "metabolique",
    format: "lyophilise",
    summary:
      "Triple agoniste des récepteurs GIP, GLP-1 et glucagon, destiné à la pharmacologie comparative des incrétines in vitro.",
    synonyms: ["LY3437943"],
    cas: "2381089-83-2",
    formula: "C221H342N46O68",
    molarMass: 4731.33,
    pubchem: "171390338",
    purity: "≥ 98 % (HPLC), identité confirmée par MS",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "5 mg", sku: "SKY-RETA-05", price: 59 },
      { label: "10 mg", sku: "SKY-RETA-10", price: 99 },
      { label: "20 mg", sku: "SKY-RETA-20", price: 169 },
    ],
    mechanism:
      "La retatrutide active trois récepteurs couplés aux protéines G : GIPR, GLP-1R et GCGR. L’intérêt expérimental porte sur l’équilibre relatif entre ces trois signaux, leur cinétique et leur dépendance au système cellulaire utilisé (expression des récepteurs, voie de l’AMPc, internalisation).",
    researchAreas: [
      "Pharmacologie comparative des agonistes simples, doubles et triples",
      "Mesure de l’activation récepteur par récepteur (AMPc, β-arrestine)",
      "Internalisation et désensibilisation des RCPG",
      "Modèles cellulaires de l’homéostasie énergétique",
    ],
    faqs: [
      {
        q: "Que désigne le code LY3437943 ?",
        a: "C’est le code de développement de la retatrutide. Il permet de retrouver l’ensemble des publications consacrées au même composé.",
      },
      ...standardFaqs("retatrutide"),
    ],
    references: [
      {
        title: "Triple-Hormone-Receptor Agonist Retatrutide for Obesity: A Phase 2 Trial",
        source: "Jastreboff et al., New England Journal of Medicine, 2023. DOI : 10.1056/NEJMoa2301972",
        url: "https://doi.org/10.1056/NEJMoa2301972",
      },
      pubchemSearch("retatrutide"),
    ],
    featured: true,
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    category: "metabolique",
    format: "lyophilise",
    summary:
      "Double agoniste des récepteurs GIP et GLP-1, référence pour comparer les agonistes incrétines simples, doubles et triples.",
    synonyms: ["LY3298176"],
    cas: "2023788-19-2",
    formula: "C225H348N48O68",
    molarMass: 4813.45,
    pubchem: null,
    purity: "≥ 98 % (HPLC), identité confirmée par MS",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "5 mg", sku: "SKY-TIRZ-05", price: 54 },
      { label: "10 mg", sku: "SKY-TIRZ-10", price: 89 },
      { label: "20 mg", sku: "SKY-TIRZ-20", price: 149 },
    ],
    mechanism:
      "La tirzepatide combine une activité agoniste sur GIPR et GLP-1R au sein d’un même peptide acylé. Elle sert de comparateur naturel dans les études qui cherchent à isoler la contribution de chaque récepteur à la signalisation observée.",
    researchAreas: [
      "Biais de signalisation GIPR / GLP-1R",
      "Comparaison avec les agonistes sélectifs du GLP-1R",
      "Études de liaison et de déplacement de ligand",
    ],
    faqs: standardFaqs("tirzepatide"),
    references: [
      {
        title: "Tirzepatide Once Weekly for the Treatment of Obesity",
        source: "Jastreboff et al., New England Journal of Medicine, 2022. DOI : 10.1056/NEJMoa2206038",
        url: "https://doi.org/10.1056/NEJMoa2206038",
      },
      pubchemSearch("tirzepatide"),
    ],
    featured: true,
  },
  {
    slug: "semaglutide",
    name: "Sémaglutide",
    category: "metabolique",
    format: "lyophilise",
    summary:
      "Agoniste sélectif du récepteur GLP-1, contrôle positif de référence pour les essais de signalisation incrétine.",
    synonyms: ["NN9535"],
    cas: "910463-68-2",
    formula: "C187H291N45O59",
    molarMass: 4113.58,
    pubchem: null,
    purity: "≥ 98 % (HPLC), identité confirmée par MS",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "5 mg", sku: "SKY-SEMA-05", price: 49 },
      { label: "10 mg", sku: "SKY-SEMA-10", price: 79 },
    ],
    mechanism:
      "Analogue acylé du GLP-1 conçu pour résister à la dégradation par la DPP-4 et se lier à l’albumine. En recherche, il sert de contrôle positif pour l’activation sélective du GLP-1R.",
    researchAreas: [
      "Contrôle positif des essais GLP-1R",
      "Stabilité peptidique et acylation",
      "Liaison à l’albumine et pharmacocinétique préclinique",
    ],
    faqs: standardFaqs("sémaglutide"),
    references: [
      {
        title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        source: "Wilding et al., New England Journal of Medicine, 2021. DOI : 10.1056/NEJMoa2032183",
        url: "https://doi.org/10.1056/NEJMoa2032183",
      },
      pubchemSearch("semaglutide"),
    ],
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    category: "metabolique",
    format: "lyophilise",
    summary:
      "Analogue acylé de l’amyline à longue durée d’action, pour l’étude du second axe de la signalisation métabolique.",
    synonyms: ["NN9838"],
    cas: null,
    formula: null,
    molarMass: null,
    pubchem: null,
    purity: "≥ 98 % (HPLC), identité confirmée par MS",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "5 mg", sku: "SKY-CAGRI-05", price: 79 },
      { label: "10 mg", sku: "SKY-CAGRI-10", price: 135 },
    ],
    mechanism:
      "La cagrilintide agit sur les récepteurs de l’amyline et de la calcitonine (complexes CTR / RAMP). Elle permet d’étudier une voie distincte des incrétines et ses interactions avec la signalisation GLP-1.",
    researchAreas: [
      "Pharmacologie des récepteurs AMY1 à AMY3",
      "Associations amyline et GLP-1 en modèle cellulaire",
      "Sélectivité CTR / RAMP",
    ],
    faqs: standardFaqs("cagrilintide"),
    references: [pubmedSearch("cagrilintide"), pubchemSearch("cagrilintide")],
    isNew: true,
  },
  {
    slug: "aicar",
    name: "AICAR",
    category: "metabolique",
    format: "lyophilise",
    summary:
      "Activateur de l’AMPK perméable aux cellules, outil classique pour moduler le métabolisme énergétique in vitro.",
    synonyms: ["Acadésine", "5-aminoimidazole-4-carboxamide ribonucléoside"],
    cas: "2627-69-2",
    formula: "C9H14N4O5",
    molarMass: 258.23,
    pubchem: null,
    purity: "≥ 98 % (HPLC)",
    appearance: "Poudre blanche",
    storage: "Poudre : −20 °C, au sec. Solution : aliquoter et conserver à −20 °C.",
    variants: [
      { label: "50 mg", sku: "SKY-AICAR-50", price: 59 },
      { label: "100 mg", sku: "SKY-AICAR-100", price: 99 },
    ],
    mechanism:
      "Une fois phosphorylé dans la cellule en ZMP, l’AICAR mime l’AMP et active l’AMPK. Il est utilisé comme outil pharmacologique pour étudier la régulation du métabolisme glucidique et lipidique.",
    researchAreas: [
      "Activation de l’AMPK en culture cellulaire",
      "Captation du glucose et oxydation des acides gras",
      "Biogenèse mitochondriale",
    ],
    faqs: standardFaqs("AICAR"),
    references: [pubmedSearch("AICAR AMPK"), pubchemSearch("acadesine")],
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    category: "regeneration-tissulaire",
    format: "lyophilise",
    summary:
      "Pentadécapeptide dérivé d’une protéine gastrique, étudié dans les modèles précliniques de réparation tissulaire.",
    synonyms: ["Body Protection Compound 157", "PL 14736"],
    cas: "137525-51-0",
    formula: "C62H98N16O22",
    molarMass: 1419.53,
    pubchem: null,
    purity: "≥ 98 % (HPLC), identité confirmée par MS",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "5 mg", sku: "SKY-BPC-05", price: 39 },
      { label: "10 mg", sku: "SKY-BPC-10", price: 65 },
    ],
    mechanism:
      "Le BPC-157 est étudié pour ses effets sur la migration des fibroblastes, l’angiogenèse et la voie du monoxyde d’azote. Les données disponibles sont essentiellement précliniques : elles doivent être rattachées au modèle et au protocole d’origine.",
    researchAreas: [
      "Migration cellulaire et cicatrisation in vitro",
      "Angiogenèse (VEGFR2, voie NO)",
      "Modèles précliniques de lésion tendineuse et digestive",
    ],
    faqs: standardFaqs("BPC-157"),
    references: [pubmedSearch("BPC 157"), pubchemSearch("BPC 157")],
    featured: true,
  },
  {
    slug: "thymosine-beta-4",
    name: "Thymosine bêta-4",
    category: "regeneration-tissulaire",
    format: "lyophilise",
    summary:
      "Peptide de 43 acides aminés liant l’actine-G, étudié dans la migration cellulaire et la réparation tissulaire.",
    synonyms: ["Tβ4"],
    cas: "77591-33-4",
    formula: null,
    molarMass: null,
    pubchem: null,
    purity: "≥ 98 % (HPLC), identité confirmée par MS",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "5 mg", sku: "SKY-TB4-05", price: 59 },
      { label: "10 mg", sku: "SKY-TB4-10", price: 99 },
    ],
    mechanism:
      "La thymosine β4 séquestre l’actine monomérique et régule la dynamique du cytosquelette. Elle est étudiée dans les modèles de migration cellulaire, d’angiogenèse et de réparation cardiaque et cornéenne.",
    researchAreas: [
      "Dynamique de l’actine et motilité cellulaire",
      "Modèles de cicatrisation cornéenne et cutanée",
      "Réparation myocardique préclinique",
    ],
    faqs: standardFaqs("thymosine β4"),
    references: [pubmedSearch("thymosin beta 4"), pubchemSearch("thymosin beta 4")],
  },
  {
    slug: "kpv",
    name: "KPV",
    category: "regeneration-tissulaire",
    format: "lyophilise",
    summary:
      "Tripeptide C-terminal de l’α-MSH (Lys-Pro-Val), étudié pour la modulation de l’inflammation in vitro.",
    synonyms: ["Lys-Pro-Val", "α-MSH (11-13)"],
    cas: "67727-97-3",
    formula: "C16H30N4O4",
    molarMass: 342.43,
    pubchem: null,
    purity: "≥ 98 % (HPLC)",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "10 mg", sku: "SKY-KPV-10", price: 45 },
      { label: "25 mg", sku: "SKY-KPV-25", price: 89 },
    ],
    mechanism:
      "Le KPV est étudié pour son action sur la voie NF-κB et la production de cytokines pro-inflammatoires dans des modèles épithéliaux et immunitaires.",
    researchAreas: [
      "Signalisation NF-κB",
      "Modèles d’inflammation épithéliale intestinale",
      "Production de cytokines in vitro",
    ],
    faqs: standardFaqs("KPV"),
    references: [pubmedSearch("KPV tripeptide inflammation")],
    isNew: true,
  },
  {
    slug: "semax",
    name: "Semax",
    category: "neurosciences",
    format: "lyophilise",
    summary:
      "Analogue synthétique du fragment ACTH (4-10), étudié dans les modèles de neuroprotection et d’expression des neurotrophines.",
    synonyms: ["ACTH (4-7) Pro-Gly-Pro"],
    cas: "80714-61-0",
    formula: "C37H51N9O10S",
    molarMass: 813.93,
    pubchem: null,
    purity: "≥ 98 % (HPLC)",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "10 mg", sku: "SKY-SEMAX-10", price: 49 },
      { label: "30 mg", sku: "SKY-SEMAX-30", price: 119 },
    ],
    mechanism:
      "Semax associe le fragment ACTH (4-7) à un motif Pro-Gly-Pro qui ralentit sa dégradation. Il est étudié pour son influence sur l’expression du BDNF et dans des modèles d’ischémie cérébrale.",
    researchAreas: [
      "Expression du BDNF et de ses récepteurs",
      "Modèles précliniques d’ischémie",
      "Stabilité des peptides par motif PGP",
    ],
    faqs: standardFaqs("Semax"),
    references: [pubmedSearch("Semax peptide"), pubchemSearch("Semax")],
  },
  {
    slug: "selank",
    name: "Selank",
    category: "neurosciences",
    format: "lyophilise",
    summary:
      "Analogue synthétique de la tuftsine, étudié dans les modèles de régulation du stress et de l’immunomodulation.",
    synonyms: ["TP-7"],
    cas: "129954-34-3",
    formula: "C33H57N11O9",
    molarMass: 751.87,
    pubchem: null,
    purity: "≥ 98 % (HPLC)",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "10 mg", sku: "SKY-SELANK-10", price: 49 },
      { label: "30 mg", sku: "SKY-SELANK-30", price: 119 },
    ],
    mechanism:
      "Selank prolonge la séquence de la tuftsine par un motif Pro-Gly-Pro. Il est étudié pour ses effets sur l’expression de gènes liés au système GABAergique et sur certaines cytokines.",
    researchAreas: [
      "Modulation de l’expression génique (système GABAergique)",
      "Immunomodulation et cytokines",
      "Modèles précliniques de stress",
    ],
    faqs: standardFaqs("Selank"),
    references: [pubmedSearch("Selank"), pubchemSearch("Selank")],
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    category: "longevite",
    format: "lyophilise",
    summary:
      "Peptide d’origine mitochondriale de 16 acides aminés, étudié dans la régulation du métabolisme et la réponse au stress.",
    synonyms: ["Mitochondrial ORF of the 12S rRNA type-c"],
    cas: null,
    formula: null,
    molarMass: null,
    pubchem: null,
    purity: "≥ 98 % (HPLC), identité confirmée par MS",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "10 mg", sku: "SKY-MOTSC-10", price: 69 },
      { label: "40 mg", sku: "SKY-MOTSC-40", price: 199 },
    ],
    mechanism:
      "MOTS-c est codé par le génome mitochondrial. Il est étudié pour son action sur l’AMPK, le métabolisme du folate et la translocation nucléaire en situation de stress métabolique.",
    researchAreas: [
      "Communication mitochondrie-noyau",
      "Activation de l’AMPK",
      "Modèles de stress métabolique et de vieillissement",
    ],
    faqs: standardFaqs("MOTS-c"),
    references: [pubmedSearch("MOTS-c mitochondrial peptide")],
    featured: true,
  },
  {
    slug: "epitalon",
    name: "Épitalon",
    category: "longevite",
    format: "lyophilise",
    summary:
      "Tétrapeptide synthétique (Ala-Glu-Asp-Gly) étudié dans les modèles de télomérase et de vieillissement cellulaire.",
    synonyms: ["Epithalon", "AEDG"],
    cas: "307297-39-8",
    formula: "C14H22N4O9",
    molarMass: 390.35,
    pubchem: null,
    purity: "≥ 98 % (HPLC)",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "10 mg", sku: "SKY-EPI-10", price: 39 },
      { label: "50 mg", sku: "SKY-EPI-50", price: 129 },
    ],
    mechanism:
      "L’épitalon est étudié pour son influence sur l’activité de la télomérase et l’expression génique dans des cultures cellulaires. Le niveau de preuve reste limité et principalement issu de quelques équipes.",
    researchAreas: [
      "Activité de la télomérase",
      "Sénescence réplicative en culture",
      "Rythmes circadiens en modèle animal",
    ],
    faqs: standardFaqs("épitalon"),
    references: [pubmedSearch("epitalon telomerase"), pubchemSearch("epitalon")],
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    category: "longevite",
    format: "lyophilise",
    summary:
      "Coenzyme central du métabolisme redox, substrat des sirtuines et des PARP, pour les études de bioénergétique cellulaire.",
    synonyms: ["β-Nicotinamide adénine dinucléotide"],
    cas: "53-84-9",
    formula: "C21H27N7O14P2",
    molarMass: 663.43,
    pubchem: null,
    purity: "≥ 98 % (HPLC)",
    appearance: "Poudre blanche",
    storage: "Poudre : −20 °C, au sec et à l’abri de la lumière. Les solutions sont instables : préparer extemporanément.",
    variants: [
      { label: "100 mg", sku: "SKY-NAD-100", price: 39 },
      { label: "500 mg", sku: "SKY-NAD-500", price: 119 },
    ],
    mechanism:
      "Le NAD+ est l’accepteur d’électrons de nombreuses déshydrogénases et le substrat consommé par les sirtuines, les PARP et CD38. Il est utilisé pour étudier le lien entre état énergétique et signalisation cellulaire.",
    researchAreas: [
      "Activité des sirtuines et des PARP",
      "Bioénergétique mitochondriale",
      "Métabolisme du NAD+ et vieillissement",
    ],
    faqs: standardFaqs("NAD+"),
    references: [pubmedSearch("NAD+ sirtuins aging"), pubchemSearch("NAD+")],
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    category: "dermo-cosmetique",
    format: "lyophilise",
    summary:
      "Complexe cuivre du tripeptide Gly-His-Lys, étudié dans la synthèse de matrice extracellulaire et les modèles cutanés.",
    synonyms: ["Copper tripeptide-1", "Glycyl-L-histidyl-L-lysine cuivre"],
    cas: null,
    formula: null,
    molarMass: null,
    pubchem: null,
    purity: "≥ 98 % (HPLC)",
    appearance: "Poudre lyophilisée bleue",
    storage: lyoStorage,
    variants: [
      { label: "50 mg", sku: "SKY-GHK-50", price: 39 },
      { label: "100 mg", sku: "SKY-GHK-100", price: 65 },
    ],
    mechanism:
      "Le GHK présente une forte affinité pour le cuivre(II). Le complexe est étudié pour son influence sur l’expression de gènes de la matrice (collagène, décorine) et le remodelage tissulaire dans des modèles de fibroblastes.",
    researchAreas: [
      "Synthèse de collagène par les fibroblastes",
      "Remodelage de la matrice extracellulaire",
      "Formulation cosmétique et stabilité",
    ],
    faqs: standardFaqs("GHK-Cu"),
    references: [pubmedSearch("GHK-Cu copper peptide"), pubchemSearch("GHK-Cu")],
    featured: true,
  },
  {
    slug: "acetyl-octapeptide-3",
    name: "Acétyl octapeptide-3",
    category: "dermo-cosmetique",
    format: "lyophilise",
    summary:
      "Peptide cosmétique mimétique de la SNAP-25, étudié dans les modèles de libération de neurotransmetteurs.",
    synonyms: ["SNAP-8"],
    cas: null,
    formula: null,
    molarMass: null,
    pubchem: null,
    purity: "≥ 98 % (HPLC)",
    appearance: "Poudre lyophilisée blanche",
    storage: lyoStorage,
    variants: [
      { label: "10 mg", sku: "SKY-SNAP8-10", price: 35 },
      { label: "50 mg", sku: "SKY-SNAP8-50", price: 119 },
    ],
    mechanism:
      "Ce peptide reproduit une séquence N-terminale de la SNAP-25 et entre en compétition dans la formation du complexe SNARE. Il est étudié dans des modèles d’exocytose et en formulation cosmétique.",
    researchAreas: ["Complexe SNARE et exocytose", "Formulation dermo-cosmétique", "Tests de stabilité en émulsion"],
    faqs: standardFaqs("acétyl octapeptide-3"),
    references: [pubmedSearch("acetyl octapeptide-3")],
    isNew: true,
  },
  {
    slug: "eau-bacteriostatique",
    name: "Eau bactériostatique",
    category: "consommables",
    format: "consommable",
    summary: "Eau stérile à 0,9 % d’alcool benzylique, pour la reconstitution des peptides lyophilisés au laboratoire.",
    synonyms: ["Bacteriostatic water"],
    cas: null,
    formula: null,
    molarMass: null,
    pubchem: null,
    purity: "Stérile, 0,9 % d’alcool benzylique",
    appearance: "Liquide limpide",
    storage: "Température ambiante, à l’abri de la lumière. Après ouverture : 2 à 8 °C.",
    variants: [
      { label: "10 ml", sku: "SKY-BW-10", price: 7.9 },
      { label: "30 ml", sku: "SKY-BW-30", price: 14.9 },
    ],
    mechanism:
      "L’alcool benzylique limite la croissance bactérienne lors des prélèvements successifs dans un même flacon. Vérifier la compatibilité avec votre protocole : certains peptides et lignées cellulaires y sont sensibles.",
    researchAreas: ["Reconstitution de peptides lyophilisés", "Préparation de solutions mères"],
    faqs: [],
    references: [],
  },
  {
    slug: "acide-acetique-06",
    name: "Acide acétique 0,6 %",
    category: "consommables",
    format: "consommable",
    summary: "Solvant stérile pour la reconstitution des peptides peu solubles dans l’eau.",
    synonyms: [],
    cas: null,
    formula: null,
    molarMass: null,
    pubchem: null,
    purity: "Stérile, filtré 0,22 µm",
    appearance: "Liquide limpide",
    storage: "Température ambiante.",
    variants: [{ label: "10 ml", sku: "SKY-AA-10", price: 8.9 }],
    mechanism:
      "Une solution acide diluée améliore la solubilité des peptides basiques ou hydrophobes. Ajuster ensuite le pH selon les besoins de l’essai.",
    researchAreas: ["Reconstitution de peptides basiques", "Solutions mères"],
    faqs: [],
    references: [],
  },
  {
    slug: "cryoboites",
    name: "Cryoboîtes 81 places",
    category: "consommables",
    format: "consommable",
    summary: "Boîtes de stockage pour aliquots à −80 °C, avec grille numérotée.",
    synonyms: [],
    cas: null,
    formula: null,
    molarMass: null,
    pubchem: null,
    purity: "Polycarbonate, de −196 °C à 121 °C",
    appearance: "Boîte 9 × 9",
    storage: "Température ambiante.",
    variants: [{ label: "Lot de 5", sku: "SKY-CRYO-5", price: 24.9 }],
    mechanism:
      "Aliquoter les solutions mères en volumes à usage unique évite les cycles de congélation et décongélation, première cause de dégradation des peptides en solution.",
    researchAreas: ["Stockage des aliquots", "Traçabilité des échantillons"],
    faqs: [],
    references: [],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const minPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price));

// Supplements proposes sur les fiches peptides (vente additionnelle).
export const addOnSlugs = ["eau-bacteriostatique", "acide-acetique-06", "cryoboites"];

// Lot courant par SKU. Ajouter ici les numeros de lot reels et le lien du COA.
// Tant qu'un lot n'a pas de COA publie, le site affiche "COA joint a l'expedition".
export type Batch = {
  sku: string;
  lot: string;
  date: string;
  purity: string | null;
  coaUrl: string | null;
  sdsUrl: string | null;
};

export const batches: Batch[] = products.flatMap((p) =>
  p.variants.map((v) => ({
    sku: v.sku,
    lot: `${v.sku.replace("SKY-", "")}-A01`,
    date: "",
    purity: null,
    coaUrl: null,
    sdsUrl: null,
  })),
);

export const batchFor = (sku: string) => batches.find((b) => b.sku === sku);
