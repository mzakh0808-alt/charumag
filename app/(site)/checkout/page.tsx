import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/checkout-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getActiveStores, getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Оформление заказа", robots: { index: false } };

export default async function CheckoutPage() {
  const database = await getDb();
  return (
    <div className="container">
      <div className="page-head">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/cart", label: "Корзина" }, { label: "Оформление" }]} />
        <h1>Оформление заказа</h1>
        <p>Выберите способ получения и оставьте контакты для подтверждения.</p>
      </div>
      <CheckoutForm stores={getActiveStores(database, true)} />
    </div>
  );
}
