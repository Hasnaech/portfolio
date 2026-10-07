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
          backgroundColor: "#14192b",
          backgroundImage: "radial-gradient(circle at 85% 20%, rgba(184,167,233,0.45), transparent 55%), radial-gradient(circle at 95% 95%, rgba(169,232,201,0.3), transparent 50%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 52, height: 52, borderRadius: 999, background: "linear-gradient(135deg, #b8a7e9, #f4d3d9 55%, #a9e8c9)" }} />
          skynalys
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 26, color: "#b8a7e9", textTransform: "uppercase", letterSpacing: 4 }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 60 ? 54 : 72, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 28, color: "#c9cce0" }}>{subtitle}</div> : null}
        </div>
        <div style={{ fontSize: 22, color: "#a3a8c3" }}>Grade recherche · COA par lot · Réservé aux professionnels</div>
      </div>
    ),
    ogSize,
  );
}
