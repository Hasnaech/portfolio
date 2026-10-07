import Link from "next/link";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { VialArt } from "@/components/VialArt";
import { posts, categoryName, formatDate } from "@/lib/blog";
import { categories, getProduct, products, productsByCategory } from "@/lib/catalog";

const homeFaqs = [
  {
    q: "Qui peut commander chez Skynalys ?",
    a: "Uniquement les professionnels : laboratoires académiques, organismes de recherche, CRO, entreprises pharmaceutiques, biotech ou cosmétiques, et centres de recherche clinique. Chaque nouveau compte est vérifié.",
  },
  {
    q: "Quels documents accompagnent chaque produit ?",
    a: "Un certificat d’analyse propre au lot (HPLC et spectrométrie de masse), la fiche de données de sécurité et une facture mentionnant le numéro de lot.",
  },
  {
    q: "Acceptez-vous les bons de commande ?",
    a: "Oui. Les comptes validés peuvent commander sur bon de commande avec paiement par virement à 30 jours. Nous établissons aussi des devis pour les marchés et les achats groupés.",
  },
  {
    q: "Proposez-vous des synthèses sur mesure ?",
    a: "Oui, pour les séquences hors catalogue, les modifications (acétylation, amidation, marquage) et les quantités au-delà du gramme. Envoyez votre cahier des charges via le formulaire de devis.",
  },
];

export default function HomePage() {
  const featured = products.filter((p) => p.featured);
  const hero = getProduct("retatrutide")!;
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Fournisseur européen pour la recherche</span>
            <h1>
              Des peptides de recherche dont <span className="iris-text">chaque lot est documenté</span>
            </h1>
            <p className="lead">
              Réactifs de grade recherche pour laboratoires, CRO et centres de recherche clinique. Certificat d’analyse par lot, fiches de
              sécurité et achats institutionnels simplifiés.
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-accent">
                Voir le catalogue <Icon name="arrow" size={18} />
              </Link>
              <Link href="/pro" className="btn btn-light">
                Ouvrir un compte pro
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>HPLC + MS</strong>
                <span>sur chaque lot</span>
              </div>
              <div>
                <strong>24 à 48 h</strong>
                <span>expédition UE</span>
              </div>
              <div>
                <strong>30 jours</strong>
                <span>paiement sur BC</span>
              </div>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <VialArt product={getProduct("bpc-157")!} label="10 mg" size={150} />
              <VialArt product={hero} label="10 mg" size={190} />
              <VialArt product={getProduct("mots-c")!} label="10 mg" size={150} />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Domaines de recherche</span>
            <h2>Explorer par axe de recherche</h2>
          </div>
          <Link href="/categories">Toutes les catégories →</Link>
        </div>
        <div className="grid grid-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="card card-link">
              <span className="tag tag-accent">{productsByCategory(c.slug).length} références</span>
              <h3 style={{ marginTop: 12 }}>{c.name}</h3>
              <p className="muted small" style={{ marginBottom: 0 }}>
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <span className="eyebrow">Références</span>
            <h2>Les plus demandées par les laboratoires</h2>
          </div>
          <Link href="/shop">Voir tout le catalogue →</Link>
        </div>
        <div className="grid grid-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container grid grid-2" style={{ alignItems: "center", gap: 40 }}>
          <div>
            <span className="eyebrow">Contrôle qualité</span>
            <h2>La traçabilité n’est pas une option</h2>
            <p className="lead">
              Chaque flacon porte un numéro de lot. Ce numéro renvoie à un certificat d’analyse publié, à la fiche de données de sécurité et à
              votre facture.
            </p>
            <ul className="feature-list">
              <li>Pureté relative mesurée par HPLC, chromatogramme joint</li>
              <li>Identité moléculaire confirmée par spectrométrie de masse</li>
              <li>Fiche de données de sécurité au format européen (REACH / CLP)</li>
              <li>Certificat lié à la variante exacte, jamais à un autre conditionnement</li>
            </ul>
            <div className="hero-actions">
              <Link href="/lab-tests" className="btn btn-primary">
                Consulter les analyses
              </Link>
              <Link href="/blog/lire-un-certificat-analyse-peptide-hplc-ms" className="btn btn-ghost">
                Lire un COA en 5 minutes
              </Link>
            </div>
          </div>
          <div className="card" style={{ background: "var(--bg)" }}>
            <p className="small muted" style={{ marginBottom: 8 }}>
              Exemple de traçabilité
            </p>
            <table className="spec-table">
              <tbody>
                <tr>
                  <th>Référence</th>
                  <td>Retatrutide 10 mg</td>
                </tr>
                <tr>
                  <th>SKU</th>
                  <td>SKY-RETA-10</td>
                </tr>
                <tr>
                  <th>Lot</th>
                  <td>RETA-10-A01</td>
                </tr>
                <tr>
                  <th>Méthodes</th>
                  <td>HPLC-UV, ESI-MS</td>
                </tr>
                <tr>
                  <th>Documents</th>
                  <td>COA, FDS, facture</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="cta-band">
          <div>
            <span className="eyebrow">Achats institutionnels</span>
            <h2>Un compte pro pour commander comme votre service achats l’attend</h2>
            <ul className="feature-list" style={{ color: "#d9dcea" }}>
              <li>Bons de commande et paiement à 30 jours</li>
              <li>Tarifs dégressifs jusqu’à −35 % et devis pour les volumes</li>
              <li>Historique des lots et téléchargement des COA en un clic</li>
              <li>Synthèse sur mesure et conditionnements spécifiques</li>
            </ul>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <Link href="/pro" className="btn btn-accent">
              Ouvrir un compte pro
            </Link>
            <Link href="/quote" className="btn btn-light">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <span className="eyebrow">Ressources</span>
            <h2>Guides méthodologiques</h2>
          </div>
          <Link href="/blog">Toutes les ressources →</Link>
        </div>
        <div className="grid grid-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-link">
              <span className="tag">{categoryName(p.category)}</span>
              <h3 style={{ marginTop: 12 }}>{p.title}</h3>
              <p className="muted small">{p.excerpt}</p>
              <span className="small muted">
                {formatDate(p.date)} · {p.readingMinutes} min
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="grid grid-2" style={{ gap: 40 }}>
          <div>
            <span className="eyebrow">Questions fréquentes</span>
            <h2>Avant votre première commande</h2>
            <p className="muted">
              Une autre question ? <Link href="/faq">Consultez la FAQ complète</Link> ou <Link href="/contact">écrivez-nous</Link>.
            </p>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
