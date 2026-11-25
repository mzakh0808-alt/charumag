"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { updateDb } from "@/lib/db";

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const parsed = z.enum(["new", "confirmed", "ready", "completed", "cancelled"]).safeParse(formData.get("status"));
  if (!parsed.success) return;
  await updateDb((database) => {
    const order = database.orders.find((item) => item.id === id);
    if (order) {
      order.status = parsed.data;
      order.updatedAt = new Date().toISOString();
    }
  });
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const parsed = z.enum(["new", "confirmed", "completed", "cancelled"]).safeParse(formData.get("status"));
  if (!parsed.success) return;
  await updateDb((database) => {
    const booking = database.bookings.find((item) => item.id === id);
    if (booking) {
      booking.status = parsed.data;
      booking.updatedAt = new Date().toISOString();
    }
  });
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}
