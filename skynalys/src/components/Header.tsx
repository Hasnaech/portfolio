"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/catalog";
import { useCart } from "./CartProvider";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";

const links = [
  { href: "/lab-tests", label: "Analyses & COA" },
  { href: "/calculator", label: "Calculateur" },
  { href: "/blog", label: "Ressources" },
  { href: "/pro", label: "Espace pro" },
];

export function Header() {
  const { count, open } = useCart();
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const [search, setSearch] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenu(false);
    setMega(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className="container header-inner">
        <button className="icon-btn mobile-only" onClick={() => setMenu(true)} aria-label="Ouvrir le menu">
          <Icon name="menu" />
        </button>
        <Logo />
        <nav className="nav" aria-label="Navigation principale">
          <div className="nav-item" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button aria-expanded={mega} aria-haspopup="true" onClick={() => setMega((m) => !m)}>
              Catalogue ▾
            </button>
            {mega ? (
              <div className="mega">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/categories/${c.slug}`}>
                    <strong>{c.name}</strong>
                    <span>{c.short}</span>
                  </Link>
                ))}
                <Link href="/shop" style={{ gridColumn: "1 / -1", background: "var(--surface-2)" }}>
                  <strong>Toutes les références →</strong>
                </Link>
              </div>
            ) : null}
          </div>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setSearch(true)} aria-label="Rechercher">
            <Icon name="search" />
          </button>
          <Link className="icon-btn" href="/account" aria-label="Mon compte">
            <Icon name="user" />
          </Link>
          <button className="icon-btn" onClick={open} aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}>
            <Icon name="cart" />
            {count > 0 ? <span className="badge-count">{count}</span> : null}
          </button>
          <Link href="/quote" className="btn btn-primary header-cta" style={{ minHeight: 40, marginLeft: 8 }}>
            Demander un devis
          </Link>
        </div>
      </div>

      {menu ? (
        <>
          <div className="overlay" onClick={() => setMenu(false)} />
          <aside className="drawer drawer-left" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="drawer-head">
              <Logo />
              <button className="icon-btn" onClick={() => setMenu(false)} aria-label="Fermer le menu">
                <Icon name="close" />
              </button>
            </div>
            <nav className="drawer-body mobile-nav" aria-label="Navigation mobile">
              <Link href="/shop">Toutes les références</Link>
              <div className="sub">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/categories/${c.slug}`}>
                    {c.name}
                  </Link>
                ))}
              </div>
              {links.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              <Link href="/quote">Demander un devis</Link>
              <Link href="/about">À propos</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </aside>
        </>
      ) : null}
      {search ? <SearchDialog onClose={() => setSearch(false)} /> : null}
    </header>
  );
}
