import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { BatchTable } from "./BatchTable";

export const metadata: Metadata = {
  title: "Analyses, certificats d’analyse (COA) et FDS par lot",
  description:
    "Retrouvez le certificat d’analyse de chaque lot Skyalys : pureté HPLC, identité par spectrométrie de masse et fiche de données de sécurité.",
  alternates: { canonical: "/lab-tests" },
};

const faqs = [
  {
    q: "Quelles analyses sont réalisées sur chaque lot ?",
    a: "Une HPLC en phase inverse pour la pureté relative et une spectrométrie de masse pour l’identité moléculaire. Sur demande, nous pouvons fournir une teneur nette en peptide, un dosage des endotoxines ou une analyse de stérilité.",
  },
  {
    q: "Qui réalise les analyses ?",
    a: "Un laboratoire tiers indépendant, dont le nom figure sur chaque certificat. Les chromatogrammes et spectres bruts sont joints.",
  },
  {
    q: "Puis-je obtenir le COA avant de commander ?",
    a: "Oui. Les comptes pro accèdent aux certificats des lots en stock et peuvent demander l’analyse d’un lot spécifique avant achat.",
  },
];

export default function LabTestsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Analyses et COA", path: "/lab-tests" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <span className="eyebrow">Transparence analytique</span>
        <h1>Analyses et certificats par lot</h1>
        <p className="lead">
          Chaque conditionnement est lié à son propre lot. Le certificat publié est celui du lot réellement expédié, jamais celui d’un autre
          conditionnement.
        </p>
        <div className="grid grid-3" style={{ margin: "28px 0 36px" }}>
          <div className="card">
            <h3>HPLC</h3>
            <p className="small muted" style={{ marginBottom: 0 }}>
              Pureté relative du pic principal, chromatogramme et conditions de méthode joints.
            </p>
          </div>
          <div className="card">
            <h3>Spectrométrie de masse</h3>
            <p className="small muted" style={{ marginBottom: 0 }}>
              Confirmation de l’identité par comparaison de la masse mesurée à la masse théorique.
            </p>
          </div>
          <div className="card">
            <h3>Fiche de données de sécurité</h3>
            <p className="small muted" style={{ marginBottom: 0 }}>
              Format européen (règlement REACH, annexe II) pour votre registre des produits chimiques.
            </p>
          </div>
        </div>
        <BatchTable />
        <div className="grid grid-2" style={{ marginTop: 48, gap: 40 }}>
          <div>
            <h2>Questions sur les analyses</h2>
            <p className="muted">
              Pour bien interpréter un certificat, lisez notre guide{" "}
              <Link href="/blog/lire-un-certificat-analyse-peptide-hplc-ms">HPLC, MS et teneur nette</Link>.
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
