import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import { ClearCart } from "@/components/cart/clear-cart";

export const metadata: Metadata = { title: "Заказ создан", robots: { index: false } };

export default async function OrderSuccessPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  return (
    <div className="narrow section">
      <ClearCart />
      <div className="empty-state text-center">
        <Check size={44} className="mx-auto mb-5 text-[var(--pine)]" strokeWidth={1.4} aria-hidden="true" />
        <h1 className="serif mb-3 text-4xl font-medium">Заказ №{number} создан</h1>
        <p className="muted mx-auto max-w-lg">
          Демонстрационный заказ сохранён в админ-панели. В рабочей версии здесь будут указаны сроки и способ подтверждения.
        </p>
        <Link href="/catalog" className="button button-primary mt-3">Вернуться в каталог</Link>
      </div>
    </div>
  );
}
