"use client";

import Link from "next/link";
import { useState } from "react";
import { Field, SelectField, organisationTypes } from "@/components/ApiForm";
import { FreeShippingMeter } from "@/components/CartDrawer";
import { useCart } from "@/components/CartProvider";
import { round, shippingFor } from "@/lib/pricing";
import { formatPrice, researchDisclaimer, site } from "@/lib/site";

const payments = [
  { id: "virement", label: "Virement bancaire", text: "Expédition à réception du paiement. RIB envoyé avec la confirmation." },
  { id: "bon-de-commande", label: "Bon de commande, paiement à 30 jours", text: "Réservé aux comptes pro validés. Joindre le numéro de BC." },
  { id: "carte", label: "Carte bancaire", text: "Lien de paiement sécurisé envoyé après vérification de la commande." },
];

export function CheckoutForm() {
  const { lines, subtotal, clear } = useCart();
  const [cold, setCold] = useState(false);
  const [vatExempt, setVatExempt] = useState(false);
  const [payment, setPayment] = useState("virement");
  const [status, setStatus] = useState<"idle" | "sending" | "err">("idle");
  const [error, setError] = useState("");
  const [done, setDone] = useState<string | null>(null);

  const shipping = shippingFor(subtotal, cold);
  const vat = vatExempt ? 0 : round((subtotal + shipping) * site.vatRate);
  const total = round(subtotal + shipping + vat);

  if (done) {
    return (
      <div className="card" style={{ maxWidth: 640, margin: "0 0 56px" }}>
        <span className="eyebrow">Commande enregistrée</span>
        <h2>Merci, votre commande {done} est enregistrée</h2>
        <p>
          Vous allez recevoir un email de confirmation. Pour une première commande, notre équipe vérifie votre établissement avant expédition,
          en général sous un jour ouvré.
        </p>
        <Link href="/shop" className="btn btn-primary">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="card" style={{ marginBottom: 56 }}>
        <p>Votre panier est vide.</p>
        <Link href="/shop" className="btn btn-primary">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data: Record<string, unknown> = {};
    new FormData(e.currentTarget).forEach((v, k) => (data[k] = typeof v === "string" ? v.trim() : ""));
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          payment,
          coldChain: cold,
          vatExempt,
          items: lines.map((l) => ({ slug: l.slug, sku: l.sku, qty: l.qty })),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "La commande n’a pas pu être enregistrée.");
      clear();
      setDone(json.reference);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Erreur");
    }
  }

  return (
    <form className="checkout-layout" onSubmit={submit}>
      <div style={{ display: "grid", gap: 20 }}>
        <div className="steps" aria-label="Étapes">
          <span>1. Panier</span>
          <span aria-current="step">2. Établissement et livraison</span>
          <span>3. Vérification et expédition</span>
        </div>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
        <fieldset className="card form" style={{ border: "1px solid var(--line)" }}>
          <legend className="eyebrow" style={{ padding: "0 6px" }}>
            Établissement
          </legend>
          <div className="form-row">
            <Field label="Établissement" name="organisation" required autoComplete="organization" />
            <SelectField label="Type de structure" name="organisationType" required options={organisationTypes} />
          </div>
          <div className="form-row">
            <Field label="N° TVA intracommunautaire ou SIREN" name="vat" required />
            <Field label="N° de bon de commande" name="poNumber" hint="Obligatoire pour le paiement à 30 jours" />
          </div>
        </fieldset>
        <fieldset className="card form" style={{ border: "1px solid var(--line)" }}>
          <legend className="eyebrow" style={{ padding: "0 6px" }}>
            Contact et livraison
          </legend>
          <div className="form-row">
            <Field label="Nom et prénom" name="name" required autoComplete="name" />
            <Field label="Fonction" name="role" required />
          </div>
          <div className="form-row">
            <Field label="Email professionnel" name="email" type="email" required autoComplete="email" />
            <Field label="Téléphone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <Field label="Adresse de livraison professionnelle" name="address" type="textarea" required hint="Bâtiment, laboratoire, étage : précisez pour faciliter la réception." />
          <Field label="Adresse de facturation (si différente)" name="billingAddress" type="textarea" />
          <label className="check">
            <input type="checkbox" checked={cold} onChange={(e) => setCold(e.target.checked)} />
            <span>
              Expédition sous chaîne du froid (+ {formatPrice(site.coldChainFee)} HT)
            </span>
          </label>
          <label className="check">
            <input type="checkbox" checked={vatExempt} onChange={(e) => setVatExempt(e.target.checked)} />
            <span>Établissement de l’UE hors France avec numéro de TVA valide (autoliquidation)</span>
          </label>
        </fieldset>
        <fieldset className="card form" style={{ border: "1px solid var(--line)" }} role="radiogroup" aria-label="Mode de paiement">
          <legend className="eyebrow" style={{ padding: "0 6px" }}>
            Paiement
          </legend>
          {payments.map((p) => (
            <label key={p.id} className="addon">
              <input type="radio" name="paymentChoice" value={p.id} checked={payment === p.id} onChange={() => setPayment(p.id)} />
              <span className="grow">
                <strong>{p.label}</strong>
                <span className="small muted" style={{ display: "block" }}>
                  {p.text}
                </span>
              </span>
            </label>
          ))}
        </fieldset>
        <fieldset className="card form" style={{ border: "1px solid var(--line)" }}>
          <legend className="eyebrow" style={{ padding: "0 6px" }}>
            Attestation d’usage
          </legend>
          <Field label="Projet ou usage prévu" name="usage" type="textarea" required placeholder="Ex. essais de signalisation sur lignées cellulaires" />
          <label className="check">
            <input type="checkbox" name="attestation" value="oui" required />
            <span>{researchDisclaimer} J’atteste que les produits commandés seront utilisés dans ce seul cadre.</span>
          </label>
          <label className="check">
            <input type="checkbox" name="cgv" value="oui" required />
            <span>
              J’accepte les <Link href="/legal/terms">conditions générales de vente</Link>.
            </span>
          </label>
        </fieldset>
      </div>

      <aside className="card">
        <h2 style={{ fontSize: "1.2rem" }}>Récapitulatif</h2>
        {lines.map((l) => (
          <div key={l.sku} className="summary-row small">
            <span>
              {l.qty} × {l.name} {l.label}
            </span>
            <span>{formatPrice(l.total)}</span>
          </div>
        ))}
        <div style={{ margin: "12px 0" }}>
          <FreeShippingMeter subtotal={subtotal} />
        </div>
        <div className="summary-row">
          <span>Sous-total HT</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Livraison{cold ? " et froid" : ""}</span>
          <span>{shipping ? formatPrice(shipping) : "Offerte"}</span>
        </div>
        <div className="summary-row">
          <span>TVA {vatExempt ? "(autoliquidation)" : `${Math.round(site.vatRate * 100)} %`}</span>
          <span>{formatPrice(vat)}</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total TTC</span>
          <span>{formatPrice(total)}</span>
        </div>
        {status === "err" ? (
          <div className="form-status err" role="alert" style={{ marginTop: 12 }}>
            {error}
          </div>
        ) : null}
        <button className="btn btn-accent btn-block" style={{ marginTop: 16 }} type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enregistrement…" : "Valider la commande"}
        </button>
        <p className="small muted" style={{ marginBottom: 0, marginTop: 10 }}>
          Aucun débit à cette étape. Les prix sont recalculés et vérifiés par nos services.
        </p>
      </aside>
    </form>
  );
}
