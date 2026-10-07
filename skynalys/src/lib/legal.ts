import { site } from "./site";

// Modeles de pages legales. A faire relire par un juriste avant la mise en ligne.
// Les elements entre crochets proviennent de src/lib/site.ts.

export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const company = `${site.legalName}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}. SIREN : ${site.registration.siren}. TVA : ${site.registration.vat}.`;

export const legalPages: LegalPage[] = [
  {
    slug: "notice",
    title: "Mentions légales",
    description: "Éditeur, hébergeur et informations légales du site Skynalys.",
    sections: [
      { heading: "Éditeur du site", paragraphs: [company, `Contact : ${site.email}, ${site.phone}.`, "Directeur de la publication : [Nom et fonction]."] },
      {
        heading: "Hébergement",
        paragraphs: ["Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. Site : vercel.com."],
      },
      {
        heading: "Propriété intellectuelle",
        paragraphs: [
          "L’ensemble des contenus de ce site (textes, illustrations, logos, structure) est la propriété de Skynalys, sauf mention contraire. Toute reproduction sans autorisation écrite est interdite.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Conditions générales de vente",
    description: "Conditions applicables aux commandes passées par les professionnels de la recherche.",
    sections: [
      {
        heading: "1. Champ d’application",
        paragraphs: [
          "Les présentes conditions s’appliquent aux ventes conclues entre Skynalys et des clients professionnels : laboratoires, universités, organismes de recherche, CRO, entreprises et centres de recherche clinique. Skynalys ne vend pas aux consommateurs.",
        ],
      },
      {
        heading: "2. Usage des produits",
        paragraphs: [
          "Les produits sont destinés exclusivement à la recherche in vitro et aux usages analytiques. Le client s’engage à ne pas les administrer à l’homme ou à l’animal, à ne pas les revendre à des particuliers et à les manipuler selon les fiches de données de sécurité. Skynalys peut refuser ou annuler toute commande en cas de doute sur l’usage prévu.",
        ],
      },
      {
        heading: "3. Vérification du client",
        paragraphs: [
          "Toute première commande donne lieu à une vérification de l’établissement (dénomination, numéro de TVA ou SIREN, adresse de livraison professionnelle) et à une attestation d’usage. Cette vérification conditionne l’expédition.",
        ],
      },
      {
        heading: "4. Prix et paiement",
        paragraphs: [
          "Les prix sont indiqués en euros hors taxes. La TVA applicable est ajoutée lors de la commande, sauf autoliquidation intracommunautaire sur présentation d’un numéro de TVA valide. Paiement par carte, virement ou bon de commande avec paiement à 30 jours pour les comptes validés.",
        ],
      },
      {
        heading: "5. Livraison",
        paragraphs: [
          `Les délais et frais de livraison sont précisés sur la page Expédition. La livraison est offerte à partir de ${site.freeShippingThreshold} € HT.`,
        ],
      },
      {
        heading: "6. Responsabilité",
        paragraphs: [
          "Skynalys garantit la conformité des produits au certificat d’analyse du lot livré. Sa responsabilité ne saurait être engagée en cas d’usage non conforme à la destination des produits.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Avertissement recherche",
    description: "Destination des produits et limites d’usage.",
    sections: [
      {
        heading: "Usage exclusif en recherche",
        paragraphs: [
          "Les produits Skynalys sont des réactifs de laboratoire. Ils ne sont pas des médicaments, des compléments alimentaires ni des produits cosmétiques finis. Ils n’ont fait l’objet d’aucune autorisation de mise sur le marché pour un usage humain ou vétérinaire.",
        ],
      },
      {
        heading: "Contenus scientifiques",
        paragraphs: [
          "Les informations publiées sur ce site résument la littérature scientifique à titre documentaire. Elles ne constituent ni un conseil médical, ni une indication thérapeutique, ni une posologie.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Politique de confidentialité",
    description: "Données collectées, finalités et droits des utilisateurs (RGPD).",
    sections: [
      {
        heading: "Responsable du traitement",
        paragraphs: [company],
      },
      {
        heading: "Données collectées",
        paragraphs: [
          "Données d’identification professionnelle (nom, fonction, établissement, email, téléphone), données de commande et de facturation, données de navigation strictement nécessaires.",
        ],
      },
      {
        heading: "Finalités et bases légales",
        paragraphs: [
          "Gestion des commandes et des comptes (exécution du contrat), vérification des clients (obligation légale et intérêt légitime), lettre d’information (consentement), mesure d’audience anonymisée (intérêt légitime).",
        ],
      },
      {
        heading: "Durées de conservation et droits",
        paragraphs: [
          `Les données de facturation sont conservées 10 ans. Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de portabilité : ${site.email}. Vous pouvez saisir la CNIL.`,
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Retours et réclamations",
    description: "Procédure en cas de produit non conforme ou endommagé.",
    sections: [
      {
        heading: "Produit non conforme ou endommagé",
        paragraphs: [
          "Signalez toute anomalie dans les 7 jours suivant la réception, avec le numéro de commande, le numéro de lot et des photos. Après analyse, Skynalys remplace le produit ou le rembourse.",
        ],
      },
      {
        heading: "Retours",
        paragraphs: [
          "Pour des raisons de traçabilité et de sécurité, les produits ouverts ou ayant quitté la chaîne du froid ne peuvent pas être repris. Le droit de rétractation des consommateurs ne s’applique pas aux ventes entre professionnels.",
        ],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Expédition et livraison",
    description: "Délais, tarifs, chaîne du froid et zones desservies.",
    sections: [
      {
        heading: "Délais",
        paragraphs: [
          "Les commandes validées avant 13 h sont expédiées le jour ouvré même, sous réserve de la vérification du compte pour une première commande. Livraison en 24 à 72 h en Union européenne.",
        ],
      },
      {
        heading: "Tarifs",
        paragraphs: [
          `Forfait de ${site.shippingFlat.toFixed(2).replace(".", ",")} € HT, offert dès ${site.freeShippingThreshold} € HT. Option chaîne du froid (emballage isotherme et pains de glace) : ${site.coldChainFee
            .toFixed(2)
            .replace(".", ",")} € HT.`,
        ],
      },
      {
        heading: "Zones desservies",
        paragraphs: ["Union européenne, Suisse et Royaume-Uni. Livraison uniquement à une adresse professionnelle."],
      },
    ],
  },
];

export const getLegal = (slug: string) => legalPages.find((l) => l.slug === slug);
