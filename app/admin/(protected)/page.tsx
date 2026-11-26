import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Сводка", robots: { index: false } };

export default async function AdminDashboard() {
  const database = await getDb();
  const newOrders = database.orders.filter((order) => order.status === "new").length;
  const activeProducts = database.products.filter((product) => product.isActive).length;
  const revenue = database.orders.filter((order) => order.status !== "cancelled").reduce((sum, order) => sum + order.total, 0);
  return (
    <>
      <div className="admin-header"><div><h1>Сводка</h1><p className="muted mb-0 mt-1 text-sm">Тестовые данные и новые заказы</p></div></div>
      <div className="stats-grid">
        <div className="stat-card"><span>Новые заказы</span><strong>{newOrders}</strong></div>
        <div className="stat-card"><span>Активные товары</span><strong>{activeProducts}</strong></div>
        <div className="stat-card"><span>Сумма неотменённых заказов</span><strong className="text-2xl">{formatPrice(revenue)}</strong></div>
      </div>
      <div className="admin-panel mt-6 p-5">
        <h2 className="serif mt-0 text-2xl font-medium">Быстрые действия</h2>
        <div className="flex flex-wrap gap-3"><Link href="/admin/products/new" className="button button-primary button-small">Добавить товар</Link><Link href="/admin/orders" className="button button-secondary button-small">Проверить заказы</Link></div>
      </div>
    </>
  );
}
