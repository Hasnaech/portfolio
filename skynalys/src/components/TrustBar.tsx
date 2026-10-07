import { site } from "@/lib/site";
import { Icon } from "./Icon";

const items = [
  { icon: "file" as const, title: "COA par lot", text: "HPLC et spectrométrie de masse" },
  { icon: "shield" as const, title: "Comptes vérifiés", text: "Ventes réservées aux professionnels" },
  { icon: "building" as const, title: "Achats institutionnels", text: "Devis, bon de commande, paiement à 30 jours" },
  { icon: "snow" as const, title: "Chaîne du froid", text: `Livraison offerte dès ${site.freeShippingThreshold} € HT` },
];

export function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Nos garanties">
      <div className="container trust-grid">
        {items.map((it) => (
          <div className="trust-item" key={it.title}>
            <span className="trust-icon">
              <Icon name={it.icon} />
            </span>
            <span>
              <strong>{it.title}</strong>
              <span>{it.text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
