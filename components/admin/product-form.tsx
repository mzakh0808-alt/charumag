"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveProduct } from "@/app/actions/admin-products";
import type { Product, Store } from "@/lib/types";

function Submit() {
  const { pending } = useFormStatus();
  return <button className="button button-primary" type="submit" disabled={pending}>{pending ? "Сохраняем…" : "Сохранить товар"}</button>;
}

export function ProductForm({ product, stores, stock }: { product?: Product; stores: Store[]; stock: Record<string, number> }) {
  const [state, formAction] = useActionState(saveProduct, {});
  return (
    <form action={formAction} className="admin-form form-grid">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      {state.error ? <div className="form-error" role="alert">{state.error}</div> : null}
      <div className="notice">Новые товары в этом тестовом сайте автоматически получают пометку «Демо». Изображения пока создаются как визуальные заглушки.</div>
      <div className="form-two">
        <div className="field"><label htmlFor="product-name">Название *</label><input id="product-name" name="name" className="input" defaultValue={product?.name} required /></div>
        <div className="field"><label htmlFor="product-slug">URL, латиницей *</label><input id="product-slug" name="slug" className="input" defaultValue={product?.slug} placeholder="zeleny-chay" required /></div>
      </div>
      <div className="field"><label htmlFor="product-short">Короткое описание *</label><input id="product-short" name="shortDescription" className="input" defaultValue={product?.shortDescription} required /></div>
      <div className="field"><label htmlFor="product-description">Полное описание *</label><textarea id="product-description" name="description" className="textarea" defaultValue={product?.description} required /></div>
      <div className="form-two">
        <div className="field"><label htmlFor="product-kind">Категория</label><select id="product-kind" name="kind" className="select" defaultValue={product?.kind || "tea"}><option value="tea">Чай</option><option value="accessory">Аксессуар</option></select></div>
        <div className="field"><label htmlFor="product-type">Тип чая</label><select id="product-type" name="teaType" className="select" defaultValue={product?.teaType || ""}><option value="">Не применимо</option><option value="black">Чёрный</option><option value="green">Зелёный</option><option value="white">Белый</option><option value="oolong">Улун</option><option value="puer">Пуэр</option><option value="herbal">Травяной</option></select></div>
      </div>
      <div className="form-two">
        <div className="field"><label htmlFor="product-country">Страна *</label><input id="product-country" name="country" className="input" defaultValue={product?.country || "Китай"} required /></div>
        <div className="field"><label htmlFor="product-unit">Фасовка / объём *</label><input id="product-unit" name="unit" className="input" defaultValue={product?.unit || "100 г"} required /></div>
      </div>
      <div className="form-two">
        <div className="field"><label htmlFor="product-weight">Вес, граммы</label><input id="product-weight" name="weightGrams" className="input" type="number" min="1" defaultValue={product?.weightGrams || ""} /></div>
        <div className="field"><label htmlFor="product-price">Цена, ₽ *</label><input id="product-price" name="price" className="input" type="number" min="0" step="1" defaultValue={product ? product.price / 100 : ""} required /></div>
      </div>
      <div className="form-two">
        <div className="field"><label htmlFor="product-visual">Тип заглушки</label><select id="product-visual" name="visual" className="select" defaultValue={product?.visual || "leaf"}><option value="leaf">Чайные листья</option><option value="tin">Банка</option><option value="pot">Чайник</option><option value="cup">Пиала</option></select></div>
        <div className="field"><label htmlFor="product-accent">Цвет заглушки</label><input id="product-accent" name="accent" type="color" className="h-[46px] w-full border border-[var(--line)] bg-white p-1" defaultValue={product?.accent || "#334a40"} /></div>
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="checkbox-row"><input type="checkbox" name="isActive" defaultChecked={product?.isActive ?? true} />Опубликован</label>
        <label className="checkbox-row"><input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured ?? false} />Показывать на главной</label>
      </div>
      <fieldset>
        <legend>Остатки</legend>
        <div className="form-two">
          {stores.map((store) => (
            <div className="field" key={store.id}>
              <label htmlFor={`stock-${store.id}`}>{store.name}{store.kind === "warehouse" ? " (доставка)" : ""}</label>
              <input id={`stock-${store.id}`} name={`stock_${store.id}`} className="input" type="number" min="0" defaultValue={stock[store.id] || 0} />
            </div>
          ))}
        </div>
      </fieldset>
      <div><Submit /></div>
    </form>
  );
}
