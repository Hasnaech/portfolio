import Link from "next/link";
import { breadcrumbLd } from "@/lib/jsonld";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <nav className="breadcrumbs container" aria-label="Fil d’Ariane">
      <ol>
        {all.map((it, i) => (
          <li key={it.path}>
            {i === all.length - 1 ? <span aria-current="page">{it.name}</span> : <Link href={it.path}>{it.name}</Link>}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbLd(all)} />
    </nav>
  );
}
