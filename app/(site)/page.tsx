import { ArrowRight, Gift, Leaf, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd, siteUrl } from "@/lib/seo";

const collections = [
  { name: "Зелёный чай", note: "Свежий и лёгкий", image: "/images/green-tea.jpg", href: "/catalog?type=green" },
  { name: "Чёрный чай", note: "Насыщенный и тёплый", image: "/images/oolong-tea.jpg", href: "/catalog?type=black" },
  { name: "Листовой чай", note: "Для вашего ритуала", image: "/images/black-tea.jpg", href: "/catalog?kind=tea" },
  { name: "Чайная посуда", note: "Красота в деталях", image: "/images/teaware.jpg", href: "/catalog?kind=accessory" },
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
            <h1>Искусство<br />неспешного чая</h1>
            <p>Чай и посуда для дома и в подарок.<br />Выберите свой сорт и наслаждайтесь моментом.</p>
            <Link href="/catalog" className="button button-hero">
              Смотреть коллекцию <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-vertical-note" aria-hidden="true"><span>茶</span><span>の</span><span>時</span><span>間</span></div>
        </div>
      </section>

      <section className="benefit-strip" aria-label="Преимущества покупки">
        <div className="container benefit-grid">
          <div className="benefit-item">
            <Leaf size={27} strokeWidth={1.15} aria-hidden="true" />
            <div><h2>Чай для дома</h2><p>Сорта для повседневного чаепития</p></div>
          </div>
          <div className="benefit-item">
            <Gift size={27} strokeWidth={1.15} aria-hidden="true" />
            <div><h2>Чай в подарок</h2><p>Напитки и посуда для близких</p></div>
          </div>
          <div className="benefit-item">
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
          <p className="atmosphere-eyebrow">Наша философия</p>
          <h2>Чай — больше,<br />чем напиток</h2>
          <p>
            Это повод остановиться, почувствовать вкус и уделить время себе. Выберите чай и посуду, которые сделают ваш привычный ритуал особенным.
          </p>
          <Link href="/catalog" className="text-link">Выбрать чай <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="home-collection">
        <div className="container">
          <p className="atmosphere-eyebrow">Море чая</p>
          <h2>Исследуйте нашу коллекцию</h2>
          <div className="collection-photo-grid">
            {collections.map((collection) => (
              <Link key={collection.name} href={collection.href} className="collection-photo-card">
                <div className="collection-photo">
                  <Image src={collection.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="collection-photo-info">
                  <h3>{collection.name}</h3>
                  <p>{collection.note}</p>
                  <ArrowRight size={14} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="store-cta">
        <Image src="/images/teaware.jpg" alt="Чайный набор из тёмной керамики" fill sizes="100vw" />
        <div className="store-cta-overlay" />
        <div className="container store-cta-content">
          <p className="atmosphere-eyebrow">Магазины в Санкт-Петербурге</p>
          <h2>Выберите чай<br />в спокойной обстановке</h2>
          <p>Адреса, телефоны и часы работы магазинов — на отдельной странице.</p>
          <Link href="/stores" className="button button-outline-light">Найти магазин <ShoppingBag size={15} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
