import type { Metadata } from "next";
import Link from "next/link";
import { toggleProduct } from "@/app/actions/admin-products";
import { getDb, getProductStock } from "@/lib/db";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Товары", robots: { index: false } };

export default async function AdminProductsPage() {
  const database = await getDb();
  return (
    <>
      <div className="admin-header"><div><h1>Товары</h1><p className="muted mb-0 mt-1 text-sm">Каталог, публикация, цены и остатки</p></div><Link href="/admin/products/new" className="button button-primary button-small">Добавить товар</Link></div>
      <div className="admin-panel table-scroll">
        <table className="admin-table">
          <thead><tr><th>Товар</th><th>Категория</th><th>Цена</th><th>Остаток</th><th>Статус</th><th>Действия</th></tr></thead>
          <tbody>
            {database.products.map((product) => (
              <tr key={product.id}>
                <td><Link href={`/admin/products/${product.id}`}>{product.name}</Link><div className="mt-1 text-[10px] text-[var(--muted)]">/{product.slug}</div></td>
                <td>{product.kind === "tea" ? "Чай" : "Аксессуар"}</td>
                <td className="whitespace-nowrap">{formatPrice(product.price)}</td>
                <td>{getProductStock(database.inventory, product.id)}</td>
                <td><span className={`status ${product.isActive ? "status-confirmed" : "status-cancelled"}`}>{product.isActive ? "Опубликован" : "Скрыт"}</span>{product.isDemo ? <div className="mt-1 text-[9px] text-[var(--muted)]">Демо</div> : null}</td>
                <td><div className="flex flex-wrap items-center gap-2"><Link href={`/admin/products/${product.id}`} className="button button-secondary button-small">Изменить</Link><form action={toggleProduct}><input type="hidden" name="id" value={product.id} /><button className="button button-secondary button-small" type="submit">{product.isActive ? "Скрыть" : "Показать"}</button></form></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
