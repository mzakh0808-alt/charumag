import type { Metadata } from "next";
import { Clock3, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getActiveStores, getDb } from "@/lib/db";
import { JsonLd, siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Магазины в Санкт-Петербурге",
  description: "Адреса, телефоны и часы работы магазинов «Море чая». Карта и выбор магазина для самовывоза.",
};

export default async function StoresPage() {
  const database = await getDb();
  const stores = getActiveStores(database);
  const points = stores.map((store) => `${store.longitude},${store.latitude},pm2gnm`).join("~");
  const center = stores[0] || { longitude: 30.3149, latitude: 59.9237 };

  return (
    <div className="container pb-16">
      <div className="page-head">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: "Магазины" }]} />
        <h1>Приходите за чаем</h1>
        <p>Адреса и контакты ниже нужны для проверки макета. Перед публикацией их заменят реальными данными сети.</p>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": stores.map((store) => ({
            "@type": "LocalBusiness",
            "@id": `${siteUrl}/stores#${store.slug}`,
            name: store.name,
            url: `${siteUrl}/stores`,
            telephone: store.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: store.address,
              addressLocality: "Санкт-Петербург",
              addressCountry: "RU",
            },
            geo: { "@type": "GeoCoordinates", latitude: store.latitude, longitude: store.longitude },
            openingHours: "Mo-Su 09:00-21:00",
          })),
        }}
      />
      <div className="store-grid">
        {stores.map((store) => (
          <article key={store.id} className="store-card">
            {store.isDemo ? <span className="demo-badge">Демонстрационный магазин</span> : null}
            <h2>{store.name}</h2>
            <div className="store-line"><MapPin size={18} aria-hidden="true" /><span>{store.address}</span></div>
            <div className="store-line"><Phone size={18} aria-hidden="true" /><span>{store.phone}</span></div>
            <div className="store-line"><Clock3 size={18} aria-hidden="true" /><span>{store.workingHours}</span></div>
            {store.isPickupAvailable ? <p className="mb-0 mt-5 text-xs font-semibold text-[var(--pine)]">Доступен самовывоз демонстрационных заказов</p> : null}
          </article>
        ))}
      </div>
      <div className="map-wrap">
        <iframe
          className="map-frame"
          title="Демонстрационные магазины на карте Санкт-Петербурга"
          src={`https://yandex.ru/map-widget/v1/?ll=${center.longitude}%2C${center.latitude}&z=12&pt=${encodeURIComponent(points)}`}
          loading="lazy"
          allowFullScreen
        />
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">Карта © Яндекс. Метки показывают демонстрационные адреса, а не подтверждённые магазины сети.</p>
    </div>
  );
}
