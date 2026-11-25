"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CONSENT_VERSION, DELIVERY_FEE } from "@/lib/consent";
import { getActiveStores, getProductStock, updateDb } from "@/lib/db";
import type { OrderItem } from "@/lib/types";
import { orderSchema } from "@/lib/validation";

export interface OrderFormState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function createOrder(
  _previousState: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  let rawItems: { productId: string; quantity: number }[] = [];
  try {
    rawItems = JSON.parse(String(formData.get("items") || "[]")) as typeof rawItems;
  } catch {
    return { error: "Не удалось прочитать корзину. Обновите страницу и попробуйте снова." };
  }

  const parsed = orderSchema.safeParse({
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    email: formData.get("email") || "",
    fulfillment: formData.get("fulfillment"),
    storeId: formData.get("storeId") || "",
    deliveryAddress: formData.get("deliveryAddress") || "",
    comment: formData.get("comment") || "",
    consent: formData.get("consent") === "on",
    items: rawItems,
  });

  if (!parsed.success) {
    return { error: "Проверьте поля формы", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const result = await updateDb((database) => {
    const data = parsed.data;
    const groupedItems = new Map<string, number>();
    for (const item of data.items) {
      groupedItems.set(item.productId, (groupedItems.get(item.productId) || 0) + item.quantity);
    }

    const pickupStores = getActiveStores(database, true);
    const warehouse = database.stores.find((store) => store.kind === "warehouse" && store.isActive);
    const stockStoreId = data.fulfillment === "pickup" ? data.storeId : warehouse?.id;
    if (!stockStoreId) return { error: "Склад доставки временно недоступен" };
    if (data.fulfillment === "pickup" && !pickupStores.some((store) => store.id === data.storeId)) {
      return { error: "Выбранный магазин недоступен для самовывоза" };
    }

    const orderItems: OrderItem[] = [];
    for (const [productId, quantity] of groupedItems) {
      const product = database.products.find((item) => item.id === productId && item.isActive);
      if (!product) return { error: "Один из товаров больше не продаётся. Обновите корзину." };
      if (getProductStock(database.inventory, productId, stockStoreId) < quantity) {
        return { error: `Недостаточно товара «${product.name}» в выбранном месте получения` };
      }
      orderItems.push({
        productId,
        productName: product.name,
        unit: product.unit,
        price: product.price,
        quantity,
      });
    }

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = data.fulfillment === "delivery" ? DELIVERY_FEE : 0;
    const now = new Date().toISOString();
    const number = Math.max(1000, ...database.orders.map((order) => order.number)) + 1;

    for (const item of orderItems) {
      const stock = database.inventory.find(
        (entry) => entry.productId === item.productId && entry.storeId === stockStoreId,
      );
      if (stock) stock.quantity -= item.quantity;
      else database.inventory.push({ productId: item.productId, storeId: stockStoreId, quantity: 0 });
    }

    database.orders.unshift({
      id: randomUUID(),
      number,
      status: "new",
      fulfillment: data.fulfillment,
      storeId: data.fulfillment === "pickup" ? data.storeId : stockStoreId,
      customerName: data.customerName,
      phone: data.phone,
      email: data.email,
      deliveryAddress: data.deliveryAddress,
      comment: data.comment,
      items: orderItems,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      consentAt: now,
      consentVersion: CONSENT_VERSION,
      createdAt: now,
      updatedAt: now,
    });
    return { number };
  });

  if ("error" in result) return { error: result.error };
  revalidatePath("/catalog");
  revalidatePath("/admin/orders");
  redirect(`/order/success/${result.number}`);
}
