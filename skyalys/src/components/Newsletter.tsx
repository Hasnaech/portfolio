"use client";

import { useState } from "react";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  return (
    <form
      className="newsletter"
      onSubmit={async (e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email");
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }).catch(() => null);
        setState(res?.ok ? "ok" : "err");
      }}
    >
      <label htmlFor="nl-email" className="visually-hidden">
        Adresse email professionnelle
      </label>
      <input id="nl-email" name="email" type="email" required placeholder="email@laboratoire.fr" className="input" />
      <button className="btn btn-accent" type="submit">
        S’inscrire
      </button>
      {state !== "idle" ? (
        <p className="small" role="status" style={{ width: "100%", margin: 0 }}>
          {state === "ok" ? "Merci. Confirmez votre inscription dans l’email que nous venons d’envoyer." : "Inscription impossible pour le moment."}
        </p>
      ) : null}
    </form>
  );
}
