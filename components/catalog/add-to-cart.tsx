"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/lib/types";

export function AddToCart({ product, stock }: { product: Product; stock: number }) {
  const { addItem } = useCart();
  const [quantity, setLocalQuantity] = useState(1);

  const add = () => addItem(product, quantity);

  if (stock <= 0) {
    return <p className="stock-note out">В демонстрационных остатках товара нет. Скоро здесь можно будет оставить заявку.</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="quantity-control" aria-label="Количество товара">
        <button type="button" onClick={() => setLocalQuantity((value) => Math.max(1, value - 1))} aria-label="Уменьшить количество">
          <Minus size={16} />
        </button>
        <span aria-live="polite">{quantity}</span>
        <button
          type="button"
          onClick={() => setLocalQuantity((value) => Math.min(Math.min(stock, 20), value + 1))}
          aria-label="Увеличить количество"
        >
          <Plus size={16} />
        </button>
      </div>
      <button type="button" className="button button-primary" onClick={add}>
        <ShoppingBag size={18} aria-hidden="true" />
        Добавить в корзину
      </button>
    </div>
  );
}
