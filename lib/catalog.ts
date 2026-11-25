import type { ProductWithStock } from "@/lib/db";

export interface CatalogFilters {
  query: string;
  kind: string;
  teaType: string;
  country: string;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  sort: string;
  page: number;
}

export const emptyFilters: CatalogFilters = {
  query: "",
  kind: "",
  teaType: "",
  country: "",
  minPrice: null,
  maxPrice: null,
  inStock: false,
  sort: "featured",
  page: 1,
};

export function filterProducts(products: ProductWithStock[], filters: CatalogFilters) {
  const query = filters.query.toLocaleLowerCase("ru");
  const filtered = products.filter((product) => {
    if (!product.isActive) return false;
    if (query && !`${product.name} ${product.shortDescription} ${product.country}`.toLocaleLowerCase("ru").includes(query)) {
      return false;
    }
    if (filters.kind && product.kind !== filters.kind) return false;
    if (filters.teaType && product.teaType !== filters.teaType) return false;
    if (filters.country && product.country !== filters.country) return false;
    if (filters.minPrice !== null && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && product.price > filters.maxPrice) return false;
    if (filters.inStock && product.stock <= 0) return false;
    return true;
  });

  return filtered.sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    if (filters.sort === "name") return a.name.localeCompare(b.name, "ru");
    return Number(b.isFeatured) - Number(a.isFeatured) || a.name.localeCompare(b.name, "ru");
  });
}
