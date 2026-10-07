"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/lib/catalog";
import { lineTotal, unitPrice, round } from "@/lib/pricing";

export type CartItem = { slug: string; sku: string; qty: number };

export type CartLine = CartItem & {
  name: string;
  label: string;
  basePrice: number;
  unit: number;
  total: number;
};

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: CartItem) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
export const STORAGE_KEY = "skyalys-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* stockage indisponible : panier en memoire uniquement */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === item.sku);
      if (existing) return prev.map((i) => (i.sku === item.sku ? { ...i, qty: Math.min(999, i.qty + item.qty) } : i));
      return [...prev, item];
    });
  }, []);

  const setQty = useCallback((sku: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.sku !== sku) : prev.map((i) => (i.sku === sku ? { ...i, qty: Math.min(999, qty) } : i)),
    );
  }, []);

  const remove = useCallback((sku: string) => setItems((prev) => prev.filter((i) => i.sku !== sku)), []);
  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((i) => {
        const p = getProduct(i.slug);
        const v = p?.variants.find((x) => x.sku === i.sku);
        if (!p || !v) return [];
        return [
          {
            ...i,
            name: p.name,
            label: v.label,
            basePrice: v.price,
            unit: unitPrice(v.price, i.qty),
            total: lineTotal(v.price, i.qty),
          },
        ];
      }),
    [items],
  );

  const value: CartContextValue = {
    items,
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: round(lines.reduce((n, l) => n + l.total, 0)),
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    add,
    setQty,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit etre utilise dans CartProvider");
  return ctx;
}
