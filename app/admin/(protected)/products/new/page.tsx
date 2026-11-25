import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/product-form";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Новый товар", robots: { index: false } };

export default async function NewProductPage() {
  const database = await getDb();
  return <><div className="admin-header"><h1>Новый товар</h1></div><ProductForm stores={database.stores} stock={{}} /></>;
}
