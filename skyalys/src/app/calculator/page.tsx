import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "Calculateur de molarité et de dilution pour peptides",
  description:
    "Calculez la molarité d’une solution mère de peptide et le volume à prélever pour atteindre une concentration finale en nM dans votre essai.",
  alternates: { canonical: "/calculator" },
};

const faqs = [
  {
    q: "Comment calcule-t-on la molarité d’une solution de peptide ?",
    a: "Molarité (mol/L) = concentration massique (g/L) ÷ masse molaire (g/mol). Avec 10 mg dans 2 ml d’un peptide de 4 731 g/mol, on obtient 5 g/L ÷ 4 731 g/mol, soit environ 1,06 mM.",
  },
  {
    q: "Faut-il tenir compte des contre-ions ?",
    a: "Oui pour un calcul exact. La poudre contient aussi de l’eau et des contre-ions (acétate, TFA). Multipliez la masse pesée par la teneur nette en peptide indiquée sur le certificat.",
  },
];

export default function CalculatorPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Calculateur", path: "/calculator" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <span className="eyebrow">Outil de laboratoire</span>
        <h1>Calculateur de molarité et de dilution</h1>
        <p className="lead">Préparez votre solution mère et calculez le volume à ajouter à votre milieu pour atteindre la concentration de l’essai.</p>
        <div style={{ marginTop: 28 }}>
          <Calculator />
        </div>
        <div style={{ marginTop: 48, maxWidth: 820 }}>
          <h2>Méthode de calcul</h2>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
