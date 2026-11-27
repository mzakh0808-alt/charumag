"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { items, total, hydrated, setQuantity, removeItem } = useCart();

  if (!hydrated) return <div className="empty-state"><p className="muted">Загружаем корзину…</p></div>;

  if (!items.length) {
    return (
      <div className="empty-state">
        <ShoppingBag size={36} strokeWidth={1.2} className="mb-4" aria-hidden="true" />
        <h2>В корзине пока пусто</h2>
        <p className="muted">Начните с чая или выберите посуду для домашнего чаепития.</p>
        <Link href="/catalog" className="button button-primary">Перейти в каталог</Link>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="cart-list">
        {items.map((item) => (
          <article key={item.productId} className="cart-item">
            <div>
              <Link href={`/catalog/${item.slug}`}><h2>{item.name}</h2></Link>
              <div className="cart-item-meta">{item.unit} · {formatPrice(item.price)} за шт.</div>
              <div className="mt-4 flex items-center gap-3">
                <div className="quantity-control" aria-label={`Количество ${item.name}`}>
                  <button type="button" onClick={() => setQuantity(item.productId, item.quantity - 1)} aria-label="Уменьшить количество"><Minus size={15} /></button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => setQuantity(item.productId, item.quantity + 1)} aria-label="Увеличить количество"><Plus size={15} /></button>
                </div>
                <button type="button" className="icon-button text-[var(--muted)]" onClick={() => removeItem(item.productId)} aria-label={`Удалить ${item.name}`}><Trash2 size={17} /></button>
              </div>
            </div>
            <strong className="whitespace-nowrap">{formatPrice(item.price * item.quantity)}</strong>
          </article>
        ))}
      </div>
      <div className="cart-bottom">
        <div>
          <div className="cart-bottom-label">Товары, без стоимости доставки</div>
          <div className="cart-total">{formatPrice(total)}</div>
        </div>
        <Link href="/checkout" className="button button-gold">Оформить заказ</Link>
      </div>
    </div>
  );
}
