"use client";

import { useState } from "react";

// Formulaire generique : envoie les champs en JSON vers une route API.
export function ApiForm({
  endpoint,
  children,
  submitLabel,
  successMessage,
  className = "form",
  extra,
  onSuccess,
}: {
  endpoint: string;
  children: React.ReactNode;
  submitLabel: string;
  successMessage: string;
  className?: string;
  extra?: Record<string, unknown>;
  onSuccess?: (data: { reference?: string }) => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = { ...extra };
    form.forEach((v, k) => {
      payload[k] = typeof v === "string" ? v.trim() : v.name;
    });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Envoi impossible");
      setStatus("ok");
      setMessage(data.reference ? `${successMessage} Référence : ${data.reference}.` : successMessage);
      (e.target as HTMLFormElement).reset();
      onSuccess?.(data);
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Envoi impossible");
    }
  }

  return (
    <form className={className} onSubmit={submit} noValidate={false}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
      {children}
      {status === "ok" || status === "err" ? (
        <div className={`form-status ${status === "ok" ? "ok" : "err"}`} role="status">
          {message}
        </div>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours…" : submitLabel}
      </button>
    </form>
  );
}

export function Field({
  label,
  name,
  type = "text",
  required,
  hint,
  placeholder,
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  const id = `f-${name}`;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {type === "textarea" ? (
        <textarea id={id} name={name} className="textarea" required={required} placeholder={placeholder} defaultValue={defaultValue} />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className="input"
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
        />
      )}
      {hint ? <div className="hint">{hint}</div> : null}
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
}) {
  const id = `f-${name}`;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <select id={id} name={name} className="select" required={required} defaultValue={defaultValue ?? ""}>
        <option value="" disabled>
          Sélectionner
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export const organisationTypes = [
  "Laboratoire académique ou université",
  "Organisme public de recherche",
  "CRO ou laboratoire d’analyse",
  "Centre de recherche clinique (hors administration)",
  "Industrie pharmaceutique ou biotech",
  "Industrie cosmétique",
  "Autre structure professionnelle",
];
