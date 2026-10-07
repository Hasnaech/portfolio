import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Image de partage generee a la volee (LinkedIn, Slack, WhatsApp, Google).
export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0d2438 0%, #163a5a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 800, letterSpacing: 3 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "#23a594" }} />
          SKYNALYS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 26, color: "#23a594", textTransform: "uppercase", letterSpacing: 4 }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 60 ? 54 : 72, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 28, color: "#c6d5e2" }}>{subtitle}</div> : null}
        </div>
        <div style={{ fontSize: 22, color: "#9fb3c4" }}>Grade recherche · COA par lot · Réservé aux professionnels</div>
      </div>
    ),
    ogSize,
  );
}
