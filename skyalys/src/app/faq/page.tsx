import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { faqLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Commandes, comptes professionnels, paiement, livraison, analyses et usage des produits Skyalys.",
  alternates: { canonical: "/faq" },
};

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Comptes et commandes",
    items: [
      { q: "Les particuliers peuvent-ils commander ?", a: "Non. Skyalys vend exclusivement aux professionnels de la recherche. Toute commande est vérifiée avant expédition." },
      { q: "Combien de temps prend la validation d’un compte pro ?", a: "En général moins d’un jour ouvré. Une première commande peut être passée pendant la validation : elle sera expédiée dès l’approbation." },
      { q: "Puis-je commander pour plusieurs équipes ?", a: "Oui. Un compte d’établissement peut regrouper plusieurs utilisateurs et adresses de livraison, avec des bons de commande distincts." },
    ],
  },
  {
    title: "Paiement et facturation",
    items: [
      { q: "Quels moyens de paiement acceptez-vous ?", a: "Carte bancaire, virement et bon de commande avec paiement à 30 jours pour les comptes validés." },
      { q: "Les prix sont-ils HT ?", a: "Oui. La TVA est ajoutée à la commande, ou autoliquidée pour les clients de l’Union européenne disposant d’un numéro de TVA valide." },
    ],
  },
  {
    title: "Livraison",
    items: [
      { q: "Quels sont les délais ?", a: "Expédition sous 24 à 48 h ouvrées après validation, livraison en 24 à 72 h dans l’Union européenne." },
      { q: "Proposez-vous la chaîne du froid ?", a: `Oui, en option à ${site.coldChainFee.toFixed(2).replace(".", ",")} € HT : emballage isotherme et pains de glace.` },
    ],
  },
  {
    title: "Qualité et usage",
    items: [
      { q: "Où trouver le certificat d’analyse ?", a: "Sur la page Analyses et COA, sur chaque fiche produit et dans le colis." },
      { q: "Les produits peuvent-ils être utilisés chez l’homme ?", a: "Non. Les produits sont destinés exclusivement à la recherche in vitro et aux usages analytiques." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
      <section className="section container" style={{ paddingTop: 24, maxWidth: 900 }}>
        <h1>Questions fréquentes</h1>
        {groups.map((g) => (
          <div key={g.title} style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: "1.3rem" }}>{g.title}</h2>
            <Faq items={g.items} withSchema={false} />
          </div>
        ))}
      </section>
      <JsonLd data={faqLd(groups.flatMap((g) => g.items))} />
    </>
  );
}
