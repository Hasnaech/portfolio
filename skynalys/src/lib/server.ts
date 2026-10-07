import { site } from "./site";

// Utilitaires communs aux routes API : validation, anti-spam et envoi d'email.

export type Payload = Record<string, unknown>;

export async function readJson(req: Request): Promise<Payload | null> {
  try {
    const len = Number(req.headers.get("content-length") || 0);
    if (len > 50_000) return null;
    const data = await req.json();
    return data && typeof data === "object" ? (data as Payload) : null;
  } catch {
    return null;
  }
}

export const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export function missing(data: Payload, fields: string[]) {
  return fields.filter((f) => !str(data[f]));
}

export function isSpam(data: Payload) {
  return str(data.website) !== "";
}

export function reference(prefix: string) {
  const d = new Date();
  const ymd = `${d.getFullYear() % 100}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${ymd}-${rand}`;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

// Envoie un email via Resend si RESEND_API_KEY est defini, sinon journalise.
export async function notify(subject: string, fields: Record<string, string>, replyTo?: string) {
  const html = `<h2>${esc(subject)}</h2><table cellpadding="6">${Object.entries(fields)
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[notify] ${subject}`, fields);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || `${site.name} <no-reply@skynalys.eu>`,
      to: [process.env.ORDERS_EMAIL_TO || site.ordersEmail],
      reply_to: replyTo,
      subject,
      html,
    }),
  });
  if (!res.ok) console.error("[notify] echec Resend", res.status, await res.text().catch(() => ""));
}

export const ok = (body: object = {}) => Response.json({ ok: true, ...body });
export const fail = (error: string, status = 400) => Response.json({ ok: false, error }, { status });
