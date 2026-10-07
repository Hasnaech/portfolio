import Link from "next/link";

// Orbe irise de la charte Skyalys (lavande, blush, menthe).
export function LogoMark({ size = 30, id = "orb" }: { size?: number; id?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b8a7e9" />
          <stop offset="0.55" stopColor="#f4d3d9" />
          <stop offset="1" stopColor="#a9e8c9" />
        </linearGradient>
        <radialGradient id={`${id}-h`} cx="0.34" cy="0.28" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill={`url(#${id}-g)`} />
      <circle cx="20" cy="20" r="18" fill={`url(#${id}-h)`} />
    </svg>
  );
}

export function Logo({ id = "orb" }: { id?: string }) {
  return (
    <Link href="/" className="logo" aria-label="Skyalys, accueil">
      <LogoMark id={id} />
      <span>
        skyalys
        <small>Research peptides</small>
      </span>
    </Link>
  );
}
