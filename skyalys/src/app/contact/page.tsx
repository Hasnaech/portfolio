import type { Metadata } from "next";
import { ApiForm, Field, SelectField } from "@/components/ApiForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l’équipe Skyalys : question technique, commande, devis ou synthèse sur mesure.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <div className="grid grid-2" style={{ gap: 48 }}>
          <div>
            <h1>Nous contacter</h1>
            <p className="lead">Une question technique, un suivi de commande ou une demande spécifique ? Réponse sous un jour ouvré.</p>
            <ul className="feature-list">
              <li>Email : <a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>Commandes : <a href={`mailto:${site.ordersEmail}`}>{site.ordersEmail}</a></li>
              <li>Téléphone : {site.phone}</li>
              <li>
                {site.address.street}, {site.address.postalCode} {site.address.city}
              </li>
            </ul>
          </div>
          <div className="card">
            <ApiForm endpoint="/api/contact" submitLabel="Envoyer le message" successMessage="Merci, votre message a bien été envoyé.">
              <div className="form-row">
                <Field label="Nom et prénom" name="name" required autoComplete="name" />
                <Field label="Email professionnel" name="email" type="email" required autoComplete="email" />
              </div>
              <Field label="Établissement" name="organisation" required autoComplete="organization" />
              <SelectField
                label="Sujet"
                name="subject"
                required
                options={["Question technique", "Suivi de commande", "Devis", "Synthèse sur mesure", "Compte pro", "Autre"]}
              />
              <Field label="Message" name="message" type="textarea" required />
            </ApiForm>
          </div>
        </div>
      </section>
    </>
  );
}
