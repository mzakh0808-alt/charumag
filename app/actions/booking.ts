"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { CONSENT_VERSION } from "@/lib/consent";
import { updateDb } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";

export interface BookingFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function createBooking(
  _previousState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const parsed = bookingSchema.safeParse({
    preferredDate: formData.get("preferredDate"),
    guestsCount: Number(formData.get("guestsCount")),
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    email: formData.get("email") || "",
    comment: formData.get("comment") || "",
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Проверьте поля формы",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Moscow" }).format(new Date());
  if (parsed.data.preferredDate < today) {
    return {
      status: "error",
      fieldErrors: { preferredDate: ["Выберите сегодняшнюю или будущую дату"] },
    };
  }

  await updateDb((database) => {
    const now = new Date().toISOString();
    database.bookings.unshift({
      id: randomUUID(),
      ...parsed.data,
      status: "new",
      consentAt: now,
      consentVersion: CONSENT_VERSION,
      createdAt: now,
      updatedAt: now,
    });
  });

  revalidatePath("/admin/bookings");
  return {
    status: "success",
    message: "Заявка отправлена. Дату экскурсии нужно будет подтвердить с администратором.",
  };
}
