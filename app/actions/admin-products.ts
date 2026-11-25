"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { updateDb } from "@/lib/db";
import type { Product, TeaType } from "@/lib/types";
import { productSchema } from "@/lib/validation";

export interface ProductFormState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function saveProduct(
  _previousState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const weight = String(formData.get("weightGrams") || "");
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    kind: formData.get("kind"),
    teaType: formData.get("teaType") || "",
    country: formData.get("country"),
    weightGrams: weight ? Number(weight) : null,
    unit: formData.get("unit"),
    price: Math.round(Number(formData.get("price")) * 100),
    visual: formData.get("visual"),
    accent: formData.get("accent"),
    isActive: formData.get("isActive") === "on",
    isFeatured: formData.get("isFeatured") === "on",
  });
  if (!parsed.success) {
    return { error: "Проверьте поля формы", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const result = await updateDb((database) => {
    if (database.products.some((product) => product.slug === parsed.data.slug && product.id !== id)) {
      return { error: "Товар с таким URL уже существует" };
    }
    const existing = database.products.find((product) => product.id === id);
    const now = new Date().toISOString();
    const product: Product = {
      id: existing?.id || randomUUID(),
      ...parsed.data,
      teaType: (parsed.data.teaType || null) as TeaType | null,
      weightGrams: parsed.data.weightGrams,
      imageAlt: `Изображение-заглушка: ${parsed.data.name}`,
      isDemo: existing?.isDemo ?? true,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };
    if (existing) database.products = database.products.map((item) => (item.id === id ? product : item));
    else database.products.unshift(product);

    for (const store of database.stores) {
      const value = Math.max(0, Math.floor(Number(formData.get(`stock_${store.id}`)) || 0));
      const stock = database.inventory.find((item) => item.productId === product.id && item.storeId === store.id);
      if (stock) stock.quantity = value;
      else database.inventory.push({ productId: product.id, storeId: store.id, quantity: value });
    }
    return { slug: product.slug };
  });

  if (result.error) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath(`/catalog/${result.slug}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function toggleProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await updateDb((database) => {
    const product = database.products.find((item) => item.id === id);
    if (product) {
      product.isActive = !product.isActive;
      product.updatedAt = new Date().toISOString();
    }
  });
  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath("/admin/products");
}
