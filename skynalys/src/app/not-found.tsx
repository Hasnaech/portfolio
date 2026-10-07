import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section container" style={{ textAlign: "center" }}>
      <p className="eyebrow">Erreur 404</p>
      <h1>Cette page est introuvable</h1>
      <p className="lead" style={{ margin: "0 auto 24px" }}>
        La référence a peut-être été renommée ou retirée du catalogue.
      </p>
      <div className="hero-actions" style={{ justifyContent: "center" }}>
        <Link href="/shop" className="btn btn-primary">
          Voir le catalogue
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Nous contacter
        </Link>
      </div>
    </section>
  );
}
