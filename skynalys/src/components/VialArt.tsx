import type { Product } from "@/lib/catalog";

// Illustration vectorielle du flacon aux couleurs de la marque.
// A remplacer par de vraies photos produit quand elles seront disponibles.
export function VialArt({ product, label, size = 220 }: { product: Product; label?: string; size?: number }) {
  const isLiquid = product.format === "consommable";
  const cap = isLiquid ? "var(--brand-500)" : "var(--brand-700)";
  return (
    <svg
      viewBox="0 0 200 260"
      width={size}
      height={(size * 260) / 200}
      role="img"
      aria-label={`${product.name}${label ? ` ${label}` : ""}, flacon Skynalys`}
    >
      <defs>
        <linearGradient id={`glass-${product.slug}`} x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#e9eff4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="246" rx="62" ry="8" fill="#0d2438" opacity="0.08" />
      <rect x="62" y="18" width="76" height="34" rx="6" fill={cap} />
      <rect x="62" y="44" width="76" height="8" fill="#000" opacity="0.12" />
      <rect x="70" y="52" width="60" height="14" fill="#c9d3dc" />
      <path
        d="M52 78c0-8 6-12 14-12h68c8 0 14 4 14 12v150c0 8-6 14-14 14H66c-8 0-14-6-14-14z"
        fill={`url(#glass-${product.slug})`}
        stroke="#c3ced8"
        strokeWidth="2"
      />
      {isLiquid ? (
        <path d="M54 150h92v78c0 7-5 12-12 12H66c-7 0-12-5-12-12z" fill="var(--brand-500)" opacity="0.18" />
      ) : (
        <path d="M54 208c14-6 30-8 46-6s32 2 46 6v20c0 7-5 12-12 12H66c-7 0-12-5-12-12z" fill="#f4f6f8" stroke="#dfe5ea" />
      )}
      <rect x="52" y="104" width="96" height="88" fill="#fff" stroke="#dde4ea" />
      <rect x="52" y="104" width="96" height="10" fill="var(--accent)" />
      <text x="100" y="134" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="11" fill="#0d2438" letterSpacing="1.5">
        SKYNALYS
      </text>
      <text x="100" y="155" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize={product.name.length > 12 ? 9 : 12} fill="#163a5a">
        {product.name}
      </text>
      {label ? (
        <text x="100" y="172" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fill="#44525e">
          {label}
        </text>
      ) : null}
      <text x="100" y="186" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="6" fill="#6b7884" letterSpacing="0.3">
        RESEARCH USE ONLY
      </text>
      <rect x="60" y="82" width="6" height="140" rx="3" fill="#fff" opacity="0.7" />
    </svg>
  );
}
