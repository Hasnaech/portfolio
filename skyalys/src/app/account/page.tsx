import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mon compte",
  robots: { index: false, follow: true },
  alternates: { canonical: "/account" },
};

// L'authentification sera branchee a la mise en production (voir README).
export default function AccountPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Mon compte", path: "/account" }]} />
      <section className="section container" style={{ paddingTop: 24, maxWidth: 560 }}>
        <h1>Mon compte</h1>
        <div className="card form">
          <div className="field">
            <label htmlFor="login-email">Email professionnel</label>
            <input id="login-email" type="email" className="input" autoComplete="email" />
          </div>
          <div className="notice notice-info">
            <span>
              La connexion se fait par lien sécurisé envoyé par email. L’espace client (historique des commandes, COA, factures) est en cours
              d’ouverture : en attendant, écrivez-nous pour obtenir vos documents.
            </span>
          </div>
          <button className="btn btn-primary" disabled>
            Recevoir mon lien de connexion
          </button>
          <p className="small muted" style={{ margin: 0 }}>
            Pas encore de compte ? <Link href="/pro">Ouvrir un compte pro</Link>
          </p>
        </div>
      </section>
    </>
  );
}
