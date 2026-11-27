import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = { title: "Корзина", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="container">
      <div className="page-head">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: "Корзина" }]} />
        <h1>Ваша <em>корзина</em></h1>
      </div>
      <CartView />
    </div>
  );
}
