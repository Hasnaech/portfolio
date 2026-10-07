import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos de Skynalys",
  description: "Skynalys fournit aux laboratoires européens des peptides de grade recherche documentés lot par lot.",
  alternates: { canonical: "/about" },
};

const commitments = [
  { title: "Une entité européenne identifiée", text: "Société immatriculée dans l’Union européenne, interlocuteur unique pour la facturation, la TVA et le service après-vente." },
  { title: "Des documents vérifiables", text: "Certificat d’analyse par lot avec données brutes, fiche de données de sécurité et facture mentionnant le lot." },
  { title: "Des clients vérifiés", text: "Ventes réservées aux professionnels de la recherche, avec vérification de l’établissement et attestation d’usage." },
  { title: "Un contenu scientifique sourcé", text: "Fiches et guides rédigés à partir de publications identifiées, avec niveau de preuve explicite." },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "À propos", path: "/about" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <span className="eyebrow">Notre mission</span>
        <h1>Rendre la qualité des réactifs vérifiable</h1>
        <p className="lead">
          {site.name} est né d’un constat simple : sur le marché des peptides de recherche, la qualité est souvent affirmée et rarement démontrée.
          Nous avons fait de la traçabilité notre premier produit.
        </p>
        <div className="grid grid-2" style={{ marginTop: 32 }}>
          {commitments.map((c) => (
            <div className="card" key={c.title}>
              <h2 style={{ fontSize: "1.2rem" }}>{c.title}</h2>
              <p className="muted" style={{ marginBottom: 0 }}>
                {c.text}
              </p>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: "1.2rem" }}>Identité de la société</h2>
          <p className="muted" style={{ marginBottom: 0 }}>
            {site.legalName} · {site.address.street}, {site.address.postalCode} {site.address.city} · SIREN {site.registration.siren} · TVA{" "}
            {site.registration.vat}
          </p>
        </div>
        <div className="hero-actions">
          <Link href="/shop" className="btn btn-primary">
            Voir le catalogue
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
