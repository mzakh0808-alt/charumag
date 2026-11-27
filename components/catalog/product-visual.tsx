import { Coffee, Leaf, Package } from "lucide-react";
import type { Product } from "@/lib/types";

export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  const Icon = product.visual === "leaf" ? Leaf : product.visual === "tin" ? Package : Coffee;
  return (
    <div
      className={`product-visual ${large ? "product-visual-large" : ""}`}
      style={{ "--product-accent": product.accent } as React.CSSProperties}
      role="img"
      aria-label={`${product.imageAlt}. Изображение-заглушка`}
    >
      <span className="visual-demo">Демо-изображение</span>
      <div className="visual-halo" aria-hidden="true" />
      <div className="visual-object">
        <span className="visual-brand">Море чая</span>
        <div className="visual-emblem"><Icon strokeWidth={1.05} aria-hidden="true" /></div>
        <span className="visual-kind">{product.kind === "tea" ? "Чайная коллекция" : "Чайные аксессуары"}</span>
      </div>
      <span className="visual-caption">{product.country}</span>
    </div>
  );
}
