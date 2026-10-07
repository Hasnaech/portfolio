import type { Metadata } from "next";
import { ApiForm, Field, SelectField, organisationTypes } from "@/components/ApiForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Demande de devis institutionnel",
  description: "Devis pour volumes, marchés publics, conditionnements spécifiques et synthèses de peptides sur mesure.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ produit?: string }> }) {
  const { produit } = await searchParams;
  const preset = products.find((p) => p.slug === produit)?.name;
  return (
    <>
      <Breadcrumbs items={[{ name: "Demande de devis", path: "/quote" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <div className="grid grid-2" style={{ gap: 48, alignItems: "start" }}>
          <div>
            <span className="eyebrow">Achats institutionnels</span>
            <h1>Demander un devis</h1>
            <p className="lead">Pour les volumes, les marchés publics, les conditionnements spécifiques ou une synthèse sur mesure.</p>
            <ul className="feature-list">
              <li>Réponse chiffrée sous 24 h ouvrées</li>
              <li>Devis au format PDF, compatible avec votre système d’achat</li>
              <li>Synthèse sur mesure : séquence, modifications, pureté, quantité</li>
              <li>Réservation de lot pour les études longues</li>
            </ul>
          </div>
          <div className="card">
            <ApiForm endpoint="/api/quote" submitLabel="Envoyer la demande" successMessage="Demande de devis reçue.">
              <div className="form-row">
                <Field label="Nom et prénom" name="name" required autoComplete="name" />
                <Field label="Email professionnel" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="form-row">
                <Field label="Établissement" name="organisation" required autoComplete="organization" />
                <SelectField label="Type de structure" name="organisationType" required options={organisationTypes} />
              </div>
              <Field
                label="Produits et quantités"
                name="items"
                type="textarea"
                required
                defaultValue={preset ? `${preset} : quantité et conditionnement souhaités` : undefined}
                placeholder="Ex. Retatrutide 10 mg × 40, Tirzepatide 10 mg × 20"
              />
              <div className="form-row">
                <Field label="Date de livraison souhaitée" name="deadline" type="date" />
                <Field label="Référence d’appel d’offres ou de BC" name="reference" />
              </div>
              <Field label="Spécifications particulières" name="specs" type="textarea" placeholder="Pureté minimale, teneur nette, endotoxines, conditionnement, séquence pour une synthèse…" />
            </ApiForm>
          </div>
        </div>
      </section>
    </>
  );
}
