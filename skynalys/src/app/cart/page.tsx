import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "Panier",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Panier", path: "/cart" }]} />
      <section className="container" style={{ paddingTop: 16 }}>
        <h1>Panier</h1>
        <CartView />
      </section>
    </>
  );
}
