"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { researchDisclaimer } from "@/lib/site";
import { LogoMark } from "./Logo";

const KEY = "skynalys-pro-ack-v1";

// Filtre d'entree : declaration de statut professionnel (remplace le simple filtre d'age).
export function ProGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <>
      <div className="overlay" style={{ background: "rgba(20,25,43,0.88)" }} />
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="gate-title">
        <LogoMark size={44} id="orb-gate" />
        <p className="eyebrow" style={{ marginTop: 16 }}>
          Accès réservé aux professionnels
        </p>
        <h2 id="gate-title">Ce site s’adresse aux laboratoires et centres de recherche</h2>
        <p className="muted">{researchDisclaimer}</p>
        <ul className="feature-list small" style={{ margin: "16px 0 20px" }}>
          <li>J’agis pour le compte d’un laboratoire, d’une université, d’une CRO, d’une entreprise ou d’un centre de recherche clinique.</li>
          <li>J’ai plus de 18 ans et j’accepte les conditions générales de vente.</li>
          <li>Les produits commandés ne seront pas administrés à l’homme ni à l’animal.</li>
        </ul>
        <div style={{ display: "grid", gap: 10 }}>
          <button className="btn btn-primary btn-block" onClick={accept}>
            Je confirme et j’accède au catalogue
          </button>
          <a className="btn btn-ghost btn-block" href="https://www.google.com">
            Quitter
          </a>
        </div>
        <p className="small muted" style={{ marginTop: 14, marginBottom: 0 }}>
          Les commandes sont vérifiées : identité de l’établissement, numéro de TVA et attestation d’usage. Voir{" "}
          <Link href="/legal/terms" onClick={accept}>
            CGV
          </Link>{" "}
          et{" "}
          <Link href="/legal/disclaimer" onClick={accept}>
            avertissement recherche
          </Link>
          .
        </p>
      </div>
    </>
  );
}
