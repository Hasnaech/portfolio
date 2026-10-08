import Link from "next/link";
import { categories } from "@/lib/catalog";
import { researchDisclaimer, site } from "@/lib/site";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>{site.name}</h3>
            <p>{site.description}</p>
            <h3 style={{ marginTop: 20 }}>Veille scientifique</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Nouvelles références, lots disponibles et guides méthodologiques. Un email par mois, désinscription en un clic.
            </p>
            <Newsletter />
          </div>
          <div>
            <h3>Catalogue</h3>
            <ul>
              <li>
                <Link href="/shop">Toutes les références</Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Laboratoires</h3>
            <ul>
              <li>
                <Link href="/pro">Ouvrir un compte pro</Link>
              </li>
              <li>
                <Link href="/quote">Demande de devis</Link>
              </li>
              <li>
                <Link href="/recherche">Encyclopédie de recherche</Link>
              </li>
              <li>
                <Link href="/lab-tests">Analyses, COA et FDS</Link>
              </li>
              <li>
                <Link href="/calculator">Calculateur de molarité</Link>
              </li>
              <li>
                <Link href="/blog">Ressources et guides</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Société</h3>
            <ul>
              <li>
                <Link href="/about">À propos</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/legal/shipping">Expédition et livraison</Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="small" style={{ marginTop: 32, color: "#8a90ab" }}>
          <strong style={{ color: "#e2e4ef" }}>Avertissement : </strong>
          {researchDisclaimer}
        </p>
        <div className="footer-legal">
          <span>
            © {new Date().getFullYear()} {site.name}. {site.legalName}. Tous droits réservés.
          </span>
          <nav aria-label="Informations légales">
            <Link href="/legal/notice">Mentions légales</Link>
            <Link href="/legal/terms">CGV</Link>
            <Link href="/legal/disclaimer">Avertissement recherche</Link>
            <Link href="/legal/privacy">Confidentialité</Link>
            <Link href="/legal/returns">Retours</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
