"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { ProductVisual } from "@/components/catalog/product-visual";
import { formatPrice, teaTypeLabels } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product & { stock: number } }) {
  const { addItem } = useCart();
  return (
    <article className="product-card">
      <Link href={`/catalog/${product.slug}`} tabIndex={-1} aria-hidden="true">
        <ProductVisual product={product} />
      </Link>
      <div className="product-info">
        <p className="product-meta">
          {product.kind === "tea" ? teaTypeLabels[product.teaType || ""] : "Аксессуар"} · {product.unit}
        </p>
        <Link href={`/catalog/${product.slug}`} className="product-name">
          {product.name}
        </Link>
        <p className="product-description">{product.shortDescription}</p>
        {product.isDemo ? <span className="demo-badge">Демо-товар</span> : null}
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button
            type="button"
            className="button button-secondary button-small"
            onClick={() => addItem(product)}
            disabled={product.stock <= 0}
            aria-label={product.stock > 0 ? `Добавить ${product.name} в корзину` : `${product.name} нет в наличии`}
          >
            <ShoppingBag size={15} aria-hidden="true" />
            {product.stock > 0 ? "В корзину" : "Нет в наличии"}
          </button>
        </div>
      </div>
    </article>
  );
}
