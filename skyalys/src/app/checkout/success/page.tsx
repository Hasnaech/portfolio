import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClearCart } from "./ClearCart";

export const metadata: Metadata = {
  title: "Paiement confirmé",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  const reference = ref && /^CMD-[A-Z0-9-]{4,20}$/.test(ref) ? ref : null;
  return (
    <>
      <Breadcrumbs items={[{ name: "Commande", path: "/checkout" }, { name: "Paiement confirmé", path: "/checkout/success" }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <div className="card" style={{ maxWidth: 680 }}>
          <span className="eyebrow">Paiement confirmé</span>
          <h1 style={{ fontSize: "2rem" }}>Merci, votre paiement est bien reçu</h1>
          {reference ? (
            <p>
              Référence de commande : <strong>{reference}</strong>
            </p>
          ) : null}
          <p className="muted">
            Vous recevez un reçu par email. Pour une première commande, notre équipe vérifie votre établissement avant expédition, en général sous
            un jour ouvré. Si la vérification n’aboutit pas, la commande est intégralement remboursée.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="btn btn-primary">
              Retour au catalogue
            </Link>
            <Link href="/lab-tests" className="btn btn-ghost">
              Consulter les analyses
            </Link>
          </div>
        </div>
      </section>
      <ClearCart />
    </>
  );
}
