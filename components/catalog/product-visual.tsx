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
      <span className="visual-demo">Изображение-заглушка</span>
      <div className="visual-object">
        <Icon strokeWidth={1.15} aria-hidden="true" />
        <span>{product.kind === "tea" ? "Море чая" : "посуда"}</span>
      </div>
      <span className="visual-caption">{product.country}</span>
    </div>
  );
}
