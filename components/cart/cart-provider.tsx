"use client";

import { Check, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";

const STORAGE_KEY = "more-chaya-cart-v1";

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  hydrated: boolean;
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as CartItem[];
        if (Array.isArray(stored)) {
          setItems(
            stored.filter(
              (item) => item && typeof item.productId === "string" && Number.isInteger(item.quantity) && item.quantity > 0,
            ),
          );
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.productId === product.id);
        if (existing) {
          return current.map((item) =>
            item.productId === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, 20) } : item,
          );
        }
        return [
          ...current,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            unit: product.unit,
            quantity: Math.min(quantity, 20),
          },
        ];
      });
      setNotice(`«${product.name}» добавлен в корзину`);
    };

    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      hydrated,
      addItem,
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          setItems((current) => current.filter((item) => item.productId !== productId));
          return;
        }
        setItems((current) =>
          current.map((item) => (item.productId === productId ? { ...item, quantity: Math.min(quantity, 20) } : item)),
        );
      },
      removeItem: (productId) => setItems((current) => current.filter((item) => item.productId !== productId)),
      clearCart: () => setItems([]),
    };
  }, [hydrated, items]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {notice ? (
        <div className="toast" role="status">
          <Check size={18} aria-hidden="true" />
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice("")} aria-label="Закрыть уведомление">
            <X size={18} />
          </button>
        </div>
      ) : null}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
