import type { Metadata } from "next";
import { updateOrderStatus } from "@/app/actions/admin-status";
import { getDb } from "@/lib/db";
import { formatDateTime, formatPrice, orderStatusLabels } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Заказы", robots: { index: false } };

export default async function AdminOrdersPage() {
  const database = await getDb();
  return (
    <>
      <div className="admin-header"><div><h1>Заказы</h1><p className="muted mb-0 mt-1 text-sm">Состав, контакты и статусы заказов</p></div></div>
      {database.orders.length ? (
        <div className="admin-panel table-scroll">
          <table className="admin-table">
            <thead><tr><th>Заказ</th><th>Покупатель</th><th>Получение</th><th>Сумма</th><th>Статус</th><th>Состав</th></tr></thead>
            <tbody>
              {database.orders.map((order) => {
                const store = database.stores.find((item) => item.id === order.storeId);
                return (
                  <tr key={order.id}>
                    <td><strong>№{order.number}</strong><div className="mt-1 whitespace-nowrap text-[var(--muted)]">{formatDateTime(order.createdAt)}</div></td>
                    <td>{order.customerName}<div className="mt-1"><a href={`tel:${order.phone}`}>{order.phone}</a></div>{order.email ? <div>{order.email}</div> : null}</td>
                    <td>{order.fulfillment === "pickup" ? "Самовывоз" : "Доставка"}<div className="mt-1 max-w-52 text-[var(--muted)]">{order.fulfillment === "pickup" ? store?.name : order.deliveryAddress}</div>{order.comment ? <div className="mt-2 max-w-52">Комментарий: {order.comment}</div> : null}</td>
                    <td className="whitespace-nowrap">{formatPrice(order.total)}</td>
                    <td><form action={updateOrderStatus} className="flex gap-2"><input type="hidden" name="id" value={order.id} /><select name="status" className="select min-h-9 py-1 text-xs" defaultValue={order.status} aria-label={`Статус заказа ${order.number}`}>{Object.entries(orderStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button className="button button-secondary button-small" type="submit">Сохранить</button></form></td>
                    <td><details className="min-w-40"><summary className="cursor-pointer text-[var(--pine)]">{order.items.reduce((sum, item) => sum + item.quantity, 0)} шт.</summary><ul className="mb-0 mt-3 list-none p-0">{order.items.map((item) => <li key={item.productId} className="mb-2">{item.productName} × {item.quantity}<div className="text-[var(--muted)]">{formatPrice(item.price * item.quantity)}</div></li>)}</ul></details></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : <div className="admin-panel empty-state px-6"><h2>Заказов пока нет</h2><p className="muted">Оформите демонстрационный заказ на сайте — он появится здесь.</p></div>}
    </>
  );
}
