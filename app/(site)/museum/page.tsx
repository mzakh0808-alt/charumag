import type { Metadata } from "next";
import { Coffee, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Музей и клуб чайной культуры",
  description: "Музей и клуб чайной культуры в историческом доме купца Горсткина на набережной Фонтанки, 91. Чайное кафе «Ти Лаунж».",
};

export default function MuseumPage() {
  return (
    <div className="container pb-16">
      <div className="page-head">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: "Музей и клуб" }]} />
        <h1>История, которую можно почувствовать</h1>
        <p>Музей, клуб чайной культуры и чайное кафе в историческом доме на набережной Фонтанки.</p>
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
          <h2 className="section-heading">Пространство чайной культуры</h2>
          <p className="muted mt-5">
            Место для знакомства с историей чая, спокойных встреч и внимательного выбора любимого сорта. В пространстве музея работает чайное кафе «Ти Лаунж».
          </p>
          <div className="detail-list">
            <div className="detail-row"><span>Адрес</span><strong>Фонтанки, 91</strong></div>
            <div className="detail-row"><span>Историческое место</span><strong>Дом купца Горсткина</strong></div>
            <div className="detail-row"><span>В пространстве</span><strong>Музей, клуб, «Ти Лаунж»</strong></div>
          </div>
          <div className="notice">
            Режим работы музея и контакты для связи будут добавлены после получения подтверждённой информации от заказчика.
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-[var(--muted)]">
            <Coffee size={22} strokeWidth={1.4} className="text-[var(--pine)]" aria-hidden="true" />
            <span>Чайное кафе «Ти Лаунж» находится в пространстве музея.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
