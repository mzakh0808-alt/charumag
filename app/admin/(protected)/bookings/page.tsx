import type { Metadata } from "next";
import { updateBookingStatus } from "@/app/actions/admin-status";
import { getDb } from "@/lib/db";
import { bookingStatusLabels, formatDate, formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Записи на экскурсии", robots: { index: false } };

export default async function AdminBookingsPage() {
  const database = await getDb();
  return (
    <>
      <div className="admin-header"><div><h1>Экскурсии</h1><p className="muted mb-0 mt-1 text-sm">Заявки на посещение музея</p></div></div>
      {database.bookings.length ? (
        <div className="admin-panel table-scroll">
          <table className="admin-table">
            <thead><tr><th>Создана</th><th>Желаемая дата</th><th>Гости</th><th>Контакты</th><th>Комментарий</th><th>Статус</th></tr></thead>
            <tbody>
              {database.bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="whitespace-nowrap">{formatDateTime(booking.createdAt)}</td>
                  <td className="whitespace-nowrap">{formatDate(booking.preferredDate)}</td>
                  <td>{booking.guestsCount}</td>
                  <td>{booking.customerName}<div className="mt-1"><a href={`tel:${booking.phone}`}>{booking.phone}</a></div>{booking.email ? <div>{booking.email}</div> : null}</td>
                  <td className="max-w-60">{booking.comment || "—"}</td>
                  <td><form action={updateBookingStatus} className="flex gap-2"><input type="hidden" name="id" value={booking.id} /><select name="status" className="select min-h-9 py-1 text-xs" defaultValue={booking.status} aria-label="Статус записи">{Object.entries(bookingStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button className="button button-secondary button-small" type="submit">Сохранить</button></form></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <div className="admin-panel empty-state px-6"><h2>Записей пока нет</h2><p className="muted">Отправьте форму на странице музея — заявка появится здесь.</p></div>}
    </>
  );
}
