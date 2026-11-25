import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Редактирование товара", robots: { index: false } };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const database = await getDb();
  const product = database.products.find((item) => item.id === id);
  if (!product) notFound();
  const stock = Object.fromEntries(
    database.inventory.filter((item) => item.productId === product.id).map((item) => [item.storeId, item.quantity]),
  );
  return <><div className="admin-header"><div><h1>{product.name}</h1><p className="muted mb-0 mt-1 text-sm">Редактирование товара</p></div></div><ProductForm product={product} stores={database.stores} stock={stock} /></>;
}
