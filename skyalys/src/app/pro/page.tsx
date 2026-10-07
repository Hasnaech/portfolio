import type { Metadata } from "next";
import { ApiForm, Field, SelectField, organisationTypes } from "@/components/ApiForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Ouvrir un compte professionnel",
  description:
    "Compte pro Skyalys pour laboratoires, CRO et centres de recherche : bons de commande, paiement à 30 jours, tarifs dégressifs et accès aux COA.",
  alternates: { canonical: "/pro" },
};

export default function ProPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Compte pro", path: "/pro" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <div className="grid grid-2" style={{ gap: 48, alignItems: "start" }}>
          <div>
            <span className="eyebrow">Espace professionnel</span>
            <h1>Ouvrir un compte pro</h1>
            <p className="lead">Un compte vérifié simplifie vos achats et sécurise la chaîne d’approvisionnement de votre laboratoire.</p>
            <ul className="feature-list">
              <li>Commande sur bon de commande, paiement à 30 jours</li>
              <li>Tarifs dégressifs automatiques et devis pour les volumes</li>
              <li>Historique des lots et téléchargement des COA et FDS</li>
              <li>Plusieurs utilisateurs et adresses de livraison</li>
              <li>Interlocuteur dédié pour les synthèses sur mesure</li>
            </ul>
            <div className="card" style={{ marginTop: 24 }}>
              <h2 style={{ fontSize: "1.1rem" }}>Comment se passe la vérification ?</h2>
              <ol className="small muted" style={{ paddingLeft: 18, marginBottom: 0 }}>
                <li>Vous remplissez le formulaire avec les informations de votre établissement.</li>
                <li>Nous vérifions le numéro de TVA ou SIREN et l’adresse professionnelle.</li>
                <li>Vous recevez vos accès sous un jour ouvré.</li>
              </ol>
            </div>
          </div>
          <div className="card">
            <ApiForm endpoint="/api/pro-account" submitLabel="Demander l’ouverture du compte" successMessage="Demande reçue. Nous revenons vers vous sous un jour ouvré.">
              <div className="form-row">
                <Field label="Nom et prénom" name="name" required autoComplete="name" />
                <Field label="Fonction" name="role" required placeholder="Chercheur, ingénieur, acheteur…" />
              </div>
              <div className="form-row">
                <Field label="Email professionnel" name="email" type="email" required autoComplete="email" hint="Une adresse générique (gmail, outlook…) allonge la vérification." />
                <Field label="Téléphone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <Field label="Établissement" name="organisation" required autoComplete="organization" />
              <SelectField label="Type de structure" name="organisationType" required options={organisationTypes} />
              <div className="form-row">
                <Field label="N° TVA intracommunautaire ou SIREN" name="vat" required />
                <Field label="Pays" name="country" required defaultValue="France" autoComplete="country-name" />
              </div>
              <Field label="Adresse de livraison professionnelle" name="address" type="textarea" required />
              <Field label="Domaine de recherche et usage prévu" name="usage" type="textarea" required placeholder="Ex. pharmacologie des RCPG, essais in vitro sur lignées HEK293" />
              <label className="check">
                <input type="checkbox" name="attestation" value="oui" required />
                <span>
                  J’atteste que les produits sont destinés exclusivement à la recherche in vitro ou analytique et qu’ils ne seront pas administrés à
                  l’homme ou à l’animal.
                </span>
              </label>
            </ApiForm>
          </div>
        </div>
      </section>
    </>
  );
}
