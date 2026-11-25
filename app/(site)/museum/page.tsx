import type { Metadata } from "next";
import { Coffee, MapPin } from "lucide-react";
import { BookingForm } from "@/components/museum/booking-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Музей и клуб чайной культуры",
  description: "Музей и клуб чайной культуры на набережной Фонтанки, 91. Экскурсии с дегустацией шести сортов чая и чайное кафе «Ти Лаунж».",
};

export default function MuseumPage() {
  const minDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Moscow" }).format(new Date());
  return (
    <div className="container pb-16">
      <div className="page-head">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: "Музей и клуб" }]} />
        <h1>Музей, в котором можно попробовать историю</h1>
        <p>Клуб чайной культуры, экскурсии с дегустацией и чайное кафе на набережной Фонтанки.</p>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          name: "Музей и клуб чайной культуры «Море чая»",
          url: `${siteUrl}/museum`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "наб. реки Фонтанки, 91",
            addressLocality: "Санкт-Петербург",
            addressCountry: "RU",
          },
        }}
      />
      <section className="museum-intro">
        <div className="museum-story">
          <span className="big-number">1882</span>
          <h2 className="serif mt-0 text-3xl font-medium">Чайная лавка в доме купца Горсткина</h2>
          <p>
            Музей и клуб находятся в историческом доме на набережной Фонтанки, 91. Здесь чайная лавка существует с 1882 года.
          </p>
          <div className="mt-7 flex items-start gap-3 text-sm">
            <MapPin size={19} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>Санкт-Петербург,<br />наб. реки Фонтанки, 91</span>
          </div>
        </div>
        <div>
          <h2 className="section-heading">Знакомство через вкус</h2>
          <p className="muted mt-5">
            Во время экскурсии гости знакомятся с музеем и пробуют шесть сортов чая. После можно продолжить встречу в чайном кафе «Ти Лаунж».
          </p>
          <div className="detail-list">
            <div className="detail-row"><span>Формат</span><strong>Экскурсия с дегустацией</strong></div>
            <div className="detail-row"><span>Дегустация</span><strong>6 сортов чая</strong></div>
            <div className="detail-row"><span>На территории</span><strong>Музей, клуб, «Ти Лаунж»</strong></div>
          </div>
          <div className="notice">
            Расписание, длительность, стоимость и правила посещения не указаны в исходных данных. Их нужно согласовать с заказчиком перед публикацией.
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-[var(--muted)]">
            <Coffee size={22} strokeWidth={1.4} className="text-[var(--pine)]" aria-hidden="true" />
            <span>Чайное кафе «Ти Лаунж» находится в пространстве музея.</span>
          </div>
        </div>
      </section>
      <section id="booking" className="booking-panel scroll-mt-6">
        <h2>Записаться на экскурсию</h2>
        <p className="muted mb-7">Оставьте пожелания по дате и числу гостей. Заявка появится в демонстрационной админ-панели.</p>
        <BookingForm minDate={minDate} />
      </section>
    </div>
  );
}
