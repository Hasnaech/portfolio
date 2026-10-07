import Link from "next/link";

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="var(--brand-700)" />
      <path d="M12 26c3 3 13 3 15-1 2-5-14-4-13-10 1-4 10-5 14-1" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="11" r="3" fill="var(--accent)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Skynalys, accueil">
      <LogoMark />
      <span>
        SKYNALYS
        <small>Research peptides</small>
      </span>
    </Link>
  );
}
