import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Commande",
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Panier", path: "/cart" }, { name: "Commande", path: "/checkout" }]} />
      <section className="container" style={{ paddingTop: 16 }}>
        <h1>Finaliser la commande</h1>
        <CheckoutForm />
      </section>
    </>
  );
}
