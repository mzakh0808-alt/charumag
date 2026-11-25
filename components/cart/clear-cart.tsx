"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/cart-provider";

export function ClearCart() {
  const { clearCart } = useCart();
  const cleared = useRef(false);
  useEffect(() => {
    if (cleared.current) return;
    cleared.current = true;
    clearCart();
  }, [clearCart]);
  return null;
}
