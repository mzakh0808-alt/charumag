import { ArrowRight, ArrowUpRight, Gift, Leaf, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd, siteUrl } from "@/lib/seo";

const collections = [
  { number: "01", name: "Зелёный чай", note: "Свежий и лёгкий", image: "/images/green-tea.jpg", href: "/catalog?type=green" },
  { number: "02", name: "Чёрный чай", note: "Насыщенный и тёплый", image: "/images/oolong-tea.jpg", href: "/catalog?type=black" },
  { number: "03", name: "Листовой чай", note: "Для вашего ритуала", image: "/images/black-tea.jpg", href: "/catalog?kind=tea" },
  { number: "04", name: "Чайная посуда", note: "Красота в деталях", image: "/images/teaware.jpg", href: "/catalog?kind=accessory" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Море чая",
          url: siteUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/catalog?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <section className="atmosphere-hero">
        <Image
          src="/images/tea-ceremony-hero.jpg"
          alt="Заваривание чая во время чайной церемонии"
          fill
          priority
          sizes="100vw"
          className="atmosphere-hero-image"
        />
        <div className="atmosphere-hero-overlay" />
        <div className="container atmosphere-hero-inner">
          <div className="atmosphere-hero-content">
            <p className="atmosphere-eyebrow">Море чая · Санкт-Петербург</p>
            <h1>Чай, которому<br /><em>есть время.</em></h1>
            <p>Чай и посуда для дома и в подарок.<br />Выберите свой сорт и создайте ритуал, который хочется повторять.</p>
            <div className="hero-actions">
              <Link href="/catalog" className="button button-gold">
                Выбрать чай <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/stores" className="hero-secondary">Найти магазин <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="hero-seal" aria-hidden="true">
            <div><span>МЧ</span><small>Санкт-Петербург</small></div>
          </div>
          <span className="hero-edition" aria-hidden="true">Чайная коллекция · 01</span>
        </div>
      </section>

      <section className="benefit-strip" aria-label="Преимущества покупки">
        <div className="container benefit-grid">
          <div className="benefit-item">
            <span className="benefit-number">01</span>
            <Leaf size={27} strokeWidth={1.15} aria-hidden="true" />
            <div><h2>Чай для дома</h2><p>Сорта для повседневного чаепития</p></div>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">02</span>
            <Gift size={27} strokeWidth={1.15} aria-hidden="true" />
            <div><h2>Чай в подарок</h2><p>Напитки и посуда для близких</p></div>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">03</span>
            <Truck size={27} strokeWidth={1.15} aria-hidden="true" />
            <div><h2>Удобное получение</h2><p>Самовывоз или доставка</p></div>
          </div>
        </div>
      </section>

      <section className="tea-story">
        <div className="tea-story-image">
          <Image src="/images/tea-story.jpg" alt="Тёмный чайник и пиала на деревянном чайном столике" fill sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="tea-story-content">
          <p className="atmosphere-eyebrow">Философия чаепития</p>
          <h2>Настоящий вкус<br />начинается <em>с паузы</em></h2>
          <p>
            Заварить чай — значит оставить немного времени для себя. Подберите сорт под настроение и посуду, которая сделает привычный ритуал особенным.
          </p>
          <Link href="/catalog" className="text-link">Собрать свой ритуал <ArrowRight size={14} aria-hidden="true" /></Link>
          <p className="story-note">Ваш дом · Ваше настроение · Ваш чай</p>
        </div>
      </section>

      <section className="home-collection">
        <div className="container">
          <div className="collection-heading">
            <p className="atmosphere-eyebrow">Коллекция Море чая</p>
            <h2>Для каждого <em>чайного момента</em></h2>
            <p>От лёгкого зелёного чая до посуды для неспешной церемонии дома.</p>
          </div>
          <div className="collection-photo-grid">
            {collections.map((collection) => (
              <Link key={collection.name} href={collection.href} className="collection-photo-card">
                <div className="collection-photo">
                  <Image src={collection.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="collection-photo-info">
                  <span className="collection-number">{collection.number}</span>
                  <h3>{collection.name}</h3>
                  <p>{collection.note}</p>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="store-cta-wrap">
        <section className="container store-cta">
          <Image src="/images/teaware.jpg" alt="Чайный набор из тёмной керамики" fill sizes="(min-width: 1320px) 1280px, 100vw" />
          <div className="store-cta-overlay" />
          <div className="store-cta-content">
            <p className="atmosphere-eyebrow">Магазины в Санкт-Петербурге</p>
            <h2>Чай стоит<br /><em>выбирать не спеша</em></h2>
            <p>Адреса, телефоны и часы работы магазинов — на отдельной странице.</p>
            <Link href="/stores" className="button button-outline-light">Найти магазин <ShoppingBag size={15} aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
