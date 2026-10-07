"use client";

import { useEffect } from "react";
import { STORAGE_KEY, useCart } from "@/components/CartProvider";

// Vide le panier apres un paiement reussi (stockage local compris).
export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    clear();
  }, [clear]);
  return null;
}
