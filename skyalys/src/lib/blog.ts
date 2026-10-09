export type BlogCategory = { slug: string; name: string };

export type SectionLink = { label: string; href: string; note?: string };
export type PostSection = { heading: string; paragraphs: string[]; links?: SectionLink[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingMinutes: number;
  related: string[];
  sections: PostSection[];
};

export const blogCategories: BlogCategory[] = [
  { slug: "methodes-analytiques", name: "Méthodes analytiques" },
  { slug: "guides-recherche", name: "Guides de recherche" },
  { slug: "bonnes-pratiques", name: "Bonnes pratiques de laboratoire" },
];

export const posts: Post[] = [
  {
    slug: "peptides-de-recherche-les-plus-etudies-panorama-2026",
    title: "Les peptides de recherche les plus étudiés : panorama 2026",
    excerpt:
      "Rétatrutide, BPC-157, GHK-Cu, MOTS-c, tésamoréline : quels peptides de recherche concentrent le plus de travaux en laboratoire, et comment les comparer sans extrapoler les données.",
    category: "guides-recherche",
    date: "2026-10-09",
    readingMinutes: 11,
    related: ["retatrutide", "bpc-157", "ghk-cu", "mots-c", "tesamorelin", "nad-plus"],
    sections: [
      {
        heading: "Comment lire ce panorama des peptides de recherche",
        paragraphs: [
          "Chaque année, un petit nombre de peptides de recherche concentre l’essentiel des publications et des demandes des laboratoires. Ce panorama les regroupe par axe de recherche pour aider les équipes à se repérer : signalisation métabolique, réparation tissulaire, axe GH / IGF-1, longévité mitochondriale et biologie cutanée.",
          "Un rappel de méthode avant d’entrer dans le détail : les peptides présentés ici sont des réactifs destinés exclusivement à la recherche in vitro et aux usages analytiques. Les informations ci-dessous décrivent des mécanismes et des axes d’étude ; elles ne constituent ni un conseil médical, ni une posologie, ni une indication thérapeutique. Chaque donnée doit être rattachée à son modèle expérimental et à son protocole d’origine.",
        ],
      },
      {
        heading: "Axe métabolique : incrétines et amyline",
        paragraphs: [
          "C’est l’axe le plus actif de la recherche métabolique récente. Les agonistes des récepteurs des incrétines se comparent par le nombre de récepteurs qu’ils activent : un seul (GLP-1), deux (GIP et GLP-1) ou trois (en ajoutant le glucagon). L’enjeu expérimental n’est pas la « puissance » mais l’équilibre et la cinétique des signaux.",
          "Pour construire une comparaison valable, on mesure au moins deux sorties (production d’AMPc et recrutement de la β-arrestine) sur des lignées exprimant chaque récepteur, et l’on rapporte les courbes concentration-réponse complètes plutôt qu’une concentration unique.",
        ],
        links: [
          { label: "Rétatrutide (LY3437943)", href: "/recherche/retatrutide", note: "triple agoniste GIP / GLP-1 / glucagon" },
          { label: "Tirzépatide (LY3298176)", href: "/recherche/tirzepatide", note: "double agoniste GIP / GLP-1" },
          { label: "Sémaglutide", href: "/recherche/semaglutide", note: "agoniste sélectif du GLP-1, contrôle positif" },
          { label: "Cagrilintide", href: "/recherche/cagrilintide", note: "analogue de l’amyline, second axe métabolique" },
        ],
      },
      {
        heading: "Réparation et récupération tissulaire",
        paragraphs: [
          "Les peptides de réparation sont étudiés dans des modèles de migration cellulaire, d’angiogenèse et de modulation de l’inflammation. Les données disponibles sont majoritairement précliniques : elles renseignent un mécanisme, pas une pratique.",
          "Le BPC-157 et la fraction active de la thymosine β4 (TB-500) reviennent le plus souvent, souvent comparés côte à côte pour distinguer leurs voies d’action (angiogenèse pour l’un, dynamique de l’actine pour l’autre).",
        ],
        links: [
          { label: "BPC-157", href: "/recherche/bpc-157", note: "migration des fibroblastes, voie du monoxyde d’azote" },
          { label: "TB-500", href: "/recherche/tb-500", note: "séquestration de l’actine-G, migration cellulaire" },
          { label: "GHK-Cu", href: "/recherche/ghk-cu", note: "synthèse de matrice extracellulaire" },
          { label: "KPV", href: "/recherche/kpv", note: "modulation de la voie NF-κB" },
        ],
      },
      {
        heading: "Axe GH / IGF-1 et sécrétagogues",
        paragraphs: [
          "Cet axe regroupe les analogues du GHRH et les agonistes du récepteur de la ghréline, souvent étudiés en association pour leur synergie sur la sécrétion de l’hormone de croissance, ainsi que les facteurs de croissance de type IGF.",
          "La sélectivité est le critère déterminant : un sécrétagogue « propre » agit sur sa cible sans perturber cortisol et prolactine, ce qui en fait un meilleur outil pour isoler la voie étudiée.",
        ],
        links: [
          { label: "Ipamoréline", href: "/recherche/ipamorelin", note: "agoniste sélectif du récepteur de la ghréline" },
          { label: "CJC-1295 + Ipamoréline", href: "/recherche/cjc-1295-ipamorelin", note: "synergie GHRH / ghréline" },
          { label: "Tésamoréline", href: "/recherche/tesamorelin", note: "analogue stabilisé du GHRH" },
          { label: "IGF-1 LR3", href: "/recherche/igf-1-lr3", note: "analogue à longue durée d’action de l’IGF-1" },
        ],
      },
      {
        heading: "Longévité : mitochondries, NAD+ et sénescence",
        paragraphs: [
          "La biologie du vieillissement s’intéresse à l’état énergétique de la cellule et à la communication entre mitochondrie et noyau. Le NAD+ y est central comme substrat des sirtuines et des PARP ; les peptides mitochondriaux comme MOTS-c et le SS-31 complètent le tableau.",
          "L’épithalon, très recherché, illustre une règle du domaine : un fort intérêt ne vaut pas un niveau de preuve élevé. Il faut distinguer ce qui est établi, préliminaire ou simplement populaire.",
        ],
        links: [
          { label: "NAD+", href: "/recherche/nad-plus", note: "substrat des sirtuines et des PARP" },
          { label: "MOTS-c", href: "/recherche/mots-c", note: "peptide mitochondrial, activation de l’AMPK" },
          { label: "SS-31 (élamiprétide)", href: "/recherche/ss-31", note: "ciblage de la cardiolipine" },
          { label: "Épithalon", href: "/recherche/epithalon", note: "télomérase et sénescence réplicative" },
        ],
      },
      {
        heading: "Peau, matrice et pigmentation",
        paragraphs: [
          "En biologie cutanée, les peptides signal stimulent l’expression du collagène et de la matrice extracellulaire par les fibroblastes, tandis que les analogues de la mélanocortine servent de modèles de pigmentation.",
          "Ces molécules intéressent autant la recherche dermatologique que la formulation cosmétique, où la stabilité en émulsion devient un paramètre d’étude à part entière.",
        ],
        links: [
          { label: "GHK-Cu", href: "/recherche/ghk-cu", note: "expression du collagène et de la décorine" },
          { label: "Matrixyl", href: "/recherche/matrixyl", note: "peptide signal pro-collagène" },
          { label: "SNAP-8", href: "/recherche/snap-8", note: "mimétique de la SNAP-25, complexe SNARE" },
          { label: "Melanotan II", href: "/recherche/melanotan-2", note: "analyse de la mélanogenèse" },
        ],
      },
      {
        heading: "Comparer et choisir sans se tromper",
        paragraphs: [
          "Trois réflexes évitent les erreurs les plus fréquentes. D’abord, comparer les récepteurs cibles et non les slogans. Ensuite, exiger un certificat d’analyse par lot et savoir le lire : la pureté HPLC ne dit rien à elle seule de la teneur nette en peptide. Enfin, rattacher chaque chiffre à son modèle expérimental.",
          "Pour approfondir une molécule, chaque entrée de ce panorama renvoie à sa fiche de recherche détaillée. L’encyclopédie complète couvre l’ensemble des références disponibles, classées par axe.",
        ],
        links: [
          { label: "Lire un certificat d’analyse (HPLC et MS)", href: "/blog/lire-un-certificat-analyse-peptide-hplc-ms" },
          { label: "Agonistes simples, doubles et triples", href: "/blog/agonistes-incretines-simples-doubles-triples" },
          { label: "Encyclopédie des peptides de recherche", href: "/recherche", note: "toutes les molécules, classées par axe" },
        ],
      },
    ],
  },
  {
    slug: "retatrutide-tirzepatide-semaglutide-comparaison-recepteurs",
    title: "Rétatrutide, tirzépatide, sémaglutide : comparer les récepteurs, pas les slogans",
    excerpt:
      "Un, deux ou trois récepteurs : comment distinguer sémaglutide, tirzépatide et rétatrutide dans un protocole in vitro, et quelles sorties mesurer pour une comparaison valable.",
    category: "guides-recherche",
    date: "2026-10-08",
    readingMinutes: 9,
    related: ["semaglutide", "tirzepatide", "retatrutide", "cagrilintide"],
    sections: [
      {
        heading: "Trois profils de récepteurs, pas trois niveaux de puissance",
        paragraphs: [
          "La confusion la plus répandue consiste à ranger ces trois molécules sur une échelle de puissance. Ce n’est pas la bonne lecture. Elles se distinguent par la combinaison de récepteurs qu’elles activent, pas par une intensité croissante.",
          "Le sémaglutide est un agoniste sélectif du récepteur GLP-1. Le tirzépatide agit sur deux récepteurs, GIP et GLP-1. Le rétatrutide en ajoute un troisième, celui du glucagon. Chaque ajout change la distribution tissulaire des effets et la nature des questions que l’on peut poser.",
        ],
        links: [
          { label: "Sémaglutide", href: "/recherche/semaglutide", note: "agoniste sélectif GLP-1" },
          { label: "Tirzépatide (LY3298176)", href: "/recherche/tirzepatide", note: "double agoniste GIP / GLP-1" },
          { label: "Rétatrutide (LY3437943)", href: "/recherche/retatrutide", note: "triple agoniste GIP / GLP-1 / glucagon" },
        ],
      },
      {
        heading: "Quelles sorties mesurer",
        paragraphs: [
          "Une comparaison rigoureuse ne repose jamais sur une concentration unique. On construit des courbes concentration-réponse complètes et l’on rapporte au minimum l’EC50 et l’Emax pour chaque récepteur.",
          "Mesurer deux voies en parallèle révèle d’éventuels biais de signalisation : la production d’AMPc d’un côté, le recrutement de la β-arrestine de l’autre. Deux agonistes de même EC50 sur l’AMPc peuvent différer nettement sur l’internalisation du récepteur.",
        ],
      },
      {
        heading: "Isoler la contribution de chaque récepteur",
        paragraphs: [
          "Pour attribuer un effet à un récepteur précis, on utilise des lignées exprimant chaque récepteur séparément, puis des systèmes les co-exprimant. Des antagonistes sélectifs servent de contrôles pour éteindre une voie à la fois.",
          "Le sémaglutide joue ici un rôle utile de contrôle positif du GLP-1R, et la cagrilintide, qui agit sur une voie distincte (l’amyline), aide à délimiter ce qui relève des incrétines.",
        ],
        links: [{ label: "Cagrilintide", href: "/recherche/cagrilintide", note: "second axe, récepteurs de l’amyline" }],
      },
      {
        heading: "Ne pas transférer les essais cliniques au réactif",
        paragraphs: [
          "Les essais cliniques publiés évaluent des candidats médicaments dans un protocole médical encadré. Leurs résultats décrivent une population, pas le comportement d’un réactif dans une boîte de culture, et inversement.",
          "Ce qui se transfère réellement d’une publication à votre paillasse, c’est l’identité du composé, sa concentration préparée et les méthodes de confirmation de pureté et d’identité. Le reste dépend de votre modèle.",
        ],
        links: [
          { label: "Agonistes simples, doubles et triples", href: "/blog/agonistes-incretines-simples-doubles-triples" },
          { label: "Lire un certificat d’analyse", href: "/blog/lire-un-certificat-analyse-peptide-hplc-ms" },
        ],
      },
    ],
  },
  {
    slug: "bpc-157-tb-500-deux-voies-de-reparation",
    title: "BPC-157 et TB-500 : deux voies de réparation à ne pas confondre",
    excerpt:
      "Souvent cités ensemble, le BPC-157 et le TB-500 agissent par des mécanismes différents. Ce que dit la recherche préclinique, et comment les étudier proprement.",
    category: "guides-recherche",
    date: "2026-10-07",
    readingMinutes: 8,
    related: ["bpc-157", "tb-500", "ghk-cu", "kpv"],
    sections: [
      {
        heading: "Deux peptides, deux mécanismes",
        paragraphs: [
          "Le BPC-157 et le TB-500 reviennent presque toujours ensemble dans les discussions sur la réparation tissulaire, ce qui laisse croire à une action identique. En réalité, ils empruntent des voies distinctes.",
          "Le BPC-157 est étudié pour son influence sur l’angiogenèse et la voie du monoxyde d’azote, ainsi que sur la migration des fibroblastes. Le TB-500, fraction active de la thymosine β4, agit surtout sur la dynamique de l’actine du cytosquelette.",
        ],
        links: [
          { label: "BPC-157", href: "/recherche/bpc-157", note: "angiogenèse, voie NO, fibroblastes" },
          { label: "TB-500", href: "/recherche/tb-500", note: "séquestration de l’actine-G" },
        ],
      },
      {
        heading: "Un niveau de preuve surtout préclinique",
        paragraphs: [
          "Les données disponibles proviennent majoritairement de modèles animaux et cellulaires. Elles décrivent des mécanismes plausibles et des effets observés dans des conditions précises, pas une pratique transposable.",
          "Rigueur minimale pour une expérience exploitable : préciser la lignée cellulaire ou le modèle, la concentration, la durée d’exposition, le véhicule et les contrôles positifs et négatifs.",
        ],
      },
      {
        heading: "Étudier l’association",
        paragraphs: [
          "Combiner deux peptides agissant sur des voies différentes est une question de recherche légitime, à condition de garder des bras séparés : chaque peptide seul, puis l’association, avec les mêmes contrôles.",
          "D’autres peptides de matrice, comme le GHK-Cu, ou anti-inflammatoires, comme le KPV, sont parfois ajoutés dans les modèles combinés de réparation.",
        ],
        links: [
          { label: "GHK-Cu", href: "/recherche/ghk-cu", note: "synthèse de matrice extracellulaire" },
          { label: "KPV", href: "/recherche/kpv", note: "modulation de la voie NF-κB" },
        ],
      },
    ],
  },
  {
    slug: "nad-mots-c-ss-31-recherche-mitochondriale",
    title: "NAD+, MOTS-c et SS-31 : trois angles de la recherche mitochondriale",
    excerpt:
      "Métabolisme du NAD+, peptides d’origine mitochondriale, ciblage de la cardiolipine : trois approches complémentaires de la bioénergétique cellulaire et du vieillissement.",
    category: "guides-recherche",
    date: "2026-10-06",
    readingMinutes: 8,
    related: ["nad-plus", "mots-c", "ss-31", "epithalon"],
    sections: [
      {
        heading: "Le NAD+, carrefour du métabolisme énergétique",
        paragraphs: [
          "Le NAD+ est l’accepteur d’électrons de nombreuses déshydrogénases et le substrat consommé par les sirtuines, les PARP et CD38. Il relie directement l’état énergétique de la cellule à sa signalisation.",
          "En recherche, il sert à étudier l’activité des sirtuines, la réparation de l’ADN et la bioénergétique. Ses solutions sont instables : elles se préparent de façon extemporanée.",
        ],
        links: [{ label: "NAD+", href: "/recherche/nad-plus", note: "substrat des sirtuines et des PARP" }],
      },
      {
        heading: "Les peptides codés par la mitochondrie",
        paragraphs: [
          "MOTS-c est codé par le génome mitochondrial lui-même. Il est étudié pour son action sur l’AMPK, le métabolisme du folate et sa translocation vers le noyau en situation de stress métabolique : un modèle de communication entre mitochondrie et noyau.",
          "Cette communication bidirectionnelle est l’un des terrains les plus actifs de la biologie du vieillissement.",
        ],
        links: [{ label: "MOTS-c", href: "/recherche/mots-c", note: "activation de l’AMPK, dialogue mitochondrie-noyau" }],
      },
      {
        heading: "Cibler la membrane : la cardiolipine",
        paragraphs: [
          "Le SS-31 (élamiprétide) se lie à la cardiolipine de la membrane mitochondriale interne, un lipide essentiel à l’organisation de la chaîne respiratoire. Il est étudié pour son influence sur l’efficacité de cette chaîne et sur le stress oxydatif.",
          "Ces trois angles — cofacteur, peptide signal, lipide de membrane — se complètent plus qu’ils ne se concurrencent dans l’étude de la fonction mitochondriale.",
        ],
        links: [
          { label: "SS-31 (élamiprétide)", href: "/recherche/ss-31", note: "ciblage de la cardiolipine" },
          { label: "Épithalon", href: "/recherche/epithalon", note: "télomérase et sénescence, à relier au contexte longévité" },
          { label: "Encyclopédie — axe Longévité", href: "/categories/longevite" },
        ],
      },
    ],
  },
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
