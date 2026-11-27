"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createOrder, type OrderFormState } from "@/app/actions/order";
import { useCart } from "@/components/cart/cart-provider";
import { DELIVERY_FEE } from "@/lib/consent";
import { formatPrice } from "@/lib/format";
import type { Store } from "@/lib/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="button button-gold w-full" disabled={pending}>{pending ? "Создаём заказ…" : "Оформить заказ"}</button>;
}

function FieldError({ errors }: { errors?: string[] }) {
  return errors?.length ? <span className="field-error">{errors[0]}</span> : null;
}

export function CheckoutForm({ stores }: { stores: Store[] }) {
  const { items, total, hydrated } = useCart();
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [state, formAction] = useActionState<OrderFormState, FormData>(createOrder, {});

  if (!hydrated) return <p className="muted">Загружаем корзину…</p>;
  if (!items.length) {
    return (
      <div className="empty-state">
        <h2>Сначала выберите товары</h2>
        <p className="muted">Корзина пуста, поэтому оформление заказа пока недоступно.</p>
        <Link href="/catalog" className="button button-primary">Перейти в каталог</Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="checkout-layout">
      <input type="hidden" name="items" value={JSON.stringify(items.map((item) => ({ productId: item.productId, quantity: item.quantity })))} />
      <div className="form-grid">
        <section className="checkout-section">
          <h2>Способ получения</h2>
          {state.error ? <div className="form-error mb-5" role="alert">{state.error}</div> : null}
          <div className="radio-cards">
            <label className="radio-card">
              <input type="radio" name="fulfillment" value="pickup" checked={fulfillment === "pickup"} onChange={() => setFulfillment("pickup")} />
              <span><strong>Самовывоз из магазина</strong><small>Без дополнительной платы</small></span>
            </label>
            <label className="radio-card">
              <input type="radio" name="fulfillment" value="delivery" checked={fulfillment === "delivery"} onChange={() => setFulfillment("delivery")} />
              <span><strong>Доставка</strong><small>Демонстрационный тариф: {formatPrice(DELIVERY_FEE)}</small></span>
            </label>
          </div>
          <FieldError errors={state.fieldErrors?.fulfillment} />
        </section>

        {fulfillment === "pickup" ? (
          <div className="field">
            <label htmlFor="pickup-store">Магазин для самовывоза</label>
            <select id="pickup-store" name="storeId" className="select" defaultValue={stores[0]?.id || ""}>
              {stores.map((store) => <option key={store.id} value={store.id}>{store.name} — {store.address}</option>)}
            </select>
            <FieldError errors={state.fieldErrors?.storeId} />
          </div>
        ) : (
          <div className="field">
            <label htmlFor="delivery-address">Адрес доставки</label>
            <textarea id="delivery-address" name="deliveryAddress" className="textarea" placeholder="Город, улица, дом, квартира" />
            <FieldError errors={state.fieldErrors?.deliveryAddress} />
          </div>
        )}

        <section className="checkout-section">
          <h2>Контакты</h2>
          <div className="form-grid">
            <div className="form-two">
              <div className="field">
                <label htmlFor="customer-name">Имя *</label>
                <input id="customer-name" name="customerName" className="input" autoComplete="name" required />
                <FieldError errors={state.fieldErrors?.customerName} />
              </div>
              <div className="field">
                <label htmlFor="customer-phone">Телефон *</label>
                <input id="customer-phone" name="phone" className="input" type="tel" autoComplete="tel" placeholder="+7 900 000-00-00" required />
                <FieldError errors={state.fieldErrors?.phone} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="customer-email">Email, если нужен</label>
              <input id="customer-email" name="email" className="input" type="email" autoComplete="email" />
              <FieldError errors={state.fieldErrors?.email} />
            </div>
            <div className="field">
              <label htmlFor="order-comment">Комментарий к заказу</label>
              <textarea id="order-comment" name="comment" className="textarea" placeholder="Например, удобное время звонка" />
            </div>
          </div>
        </section>
      </div>

      <aside className="order-summary">
        <h2>Ваш заказ</h2>
        {items.map((item) => (
          <div key={item.productId} className="summary-line">
            <span>{item.name} × {item.quantity}</span>
            <span className="whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="summary-line"><span>Товары</span><span>{formatPrice(total)}</span></div>
        <div className="summary-line"><span>Получение</span><span>{fulfillment === "delivery" ? formatPrice(DELIVERY_FEE) : "Бесплатно"}</span></div>
        <div className="summary-line summary-total"><span>Итого</span><span>{formatPrice(total + (fulfillment === "delivery" ? DELIVERY_FEE : 0))}</span></div>
        <label className="checkbox-row my-5">
          <input type="checkbox" name="consent" required />
          <span>Я соглашаюсь на <Link href="/privacy" className="underline" target="_blank">обработку персональных данных</Link> для оформления заказа *</span>
        </label>
        <FieldError errors={state.fieldErrors?.consent} />
        <SubmitButton />
        <p className="order-summary-note">Это демонстрационный заказ без онлайн-оплаты. Администратор увидит его в панели управления.</p>
      </aside>
    </form>
  );
}
