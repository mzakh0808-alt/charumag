import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(10, "Укажите телефон")
  .max(30, "Слишком длинный номер")
  .regex(/^[+\d\s()—-]+$/, "Проверьте номер телефона");

const email = z
  .string()
  .trim()
  .max(160)
  .refine((value) => !value || z.email().safeParse(value).success, "Проверьте email")
  .optional()
  .default("");

export const orderSchema = z
  .object({
    customerName: z.string().trim().min(2, "Укажите имя").max(100),
    phone,
    email,
    fulfillment: z.enum(["pickup", "delivery"]),
    storeId: z.string().optional().default(""),
    deliveryAddress: z.string().trim().max(500).optional().default(""),
    comment: z.string().trim().max(1000).optional().default(""),
    consent: z.literal(true, "Нужно согласие на обработку персональных данных"),
    items: z
      .array(z.object({ productId: z.string(), quantity: z.number().int().min(1).max(20) }))
      .min(1, "Корзина пуста"),
  })
  .superRefine((value, context) => {
    if (value.fulfillment === "pickup" && !value.storeId) {
      context.addIssue({ code: "custom", path: ["storeId"], message: "Выберите магазин" });
    }
    if (value.fulfillment === "delivery" && value.deliveryAddress.length < 8) {
      context.addIssue({ code: "custom", path: ["deliveryAddress"], message: "Укажите полный адрес доставки" });
    }
  });

export const productSchema = z.object({
  name: z.string().trim().min(2).max(140),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, "Только латинские буквы, цифры и дефис"),
  shortDescription: z.string().trim().min(2).max(240),
  description: z.string().trim().min(2).max(4000),
  kind: z.enum(["tea", "accessory"]),
  teaType: z.enum(["", "black", "green", "white", "oolong", "puer", "herbal"]).optional().default(""),
  country: z.string().trim().min(2).max(100),
  weightGrams: z.number().int().positive().nullable(),
  unit: z.string().trim().min(1).max(80),
  price: z.number().int().nonnegative(),
  visual: z.enum(["leaf", "tin", "pot", "cup"]),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
});
