import { ArrowRight, Coffee, Landmark, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { getDb, withStock } from "@/lib/db";
import { JsonLd, siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const database = await getDb();
  const featured = database.products.filter((product) => product.isActive && product.isFeatured).slice(0, 3);

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
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Чай стоит того, чтобы не спешить.</h1>
            <p className="hero-copy">
              Чай для дома и в подарок, посуда для любимых ритуалов и музей чайной культуры в историческом доме на Фонтанке.
            </p>
            <div className="hero-actions">
              <Link href="/catalog" className="button button-primary">
                Выбрать чай <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/museum" className="button button-secondary">
                Записаться в музей
              </Link>
            </div>
          </div>
          <div className="hero-art" aria-label="Чашка чая — декоративная иллюстрация" role="img">
            <div className="hero-steam" />
            <div className="hero-cup" />
            <div className="hero-art-note">
              <span>Санкт-Петербург</span>
              <span>чайная культура с 1882 года</span>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-strip" aria-label="Возможности">
        <div className="container intro-grid">
          <div className="intro-item">
            <ShoppingBag size={24} strokeWidth={1.4} aria-hidden="true" />
            <h2>Для дома и в подарок</h2>
            <p>Чай и аксессуары с самовывозом или доставкой</p>
          </div>
          <div className="intro-item">
            <Landmark size={24} strokeWidth={1.4} aria-hidden="true" />
            <h2>История за чашкой</h2>
            <p>Экскурсия с дегустацией шести сортов чая</p>
          </div>
          <div className="intro-item">
            <Coffee size={24} strokeWidth={1.4} aria-hidden="true" />
            <h2>«Ти Лаунж»</h2>
            <p>Чайное кафе музея на набережной Фонтанки</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-top">
            <div>
              <h2 className="section-heading">Начать знакомство</h2>
              <p className="muted mb-0 mt-3">Демонстрационная подборка из тестового каталога</p>
            </div>
            <Link href="/catalog" className="button button-secondary button-small">
              Весь каталог <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={withStock(database, product)} />
            ))}
          </div>
        </div>
      </section>

      <section className="museum-banner">
        <div className="container museum-grid">
          <div>
            <h2 className="section-heading">Дом, где чаю уделяют время</h2>
          </div>
          <div>
            <p>
              Клуб чайной культуры и музей расположены на набережной Фонтанки, 91 — в историческом доме купца Горсткина, где чайная лавка работает с 1882 года.
            </p>
            <div className="museum-facts">
              <div className="museum-fact">
                <strong>6 сортов</strong>
                <span>дегустация во время экскурсии</span>
              </div>
              <div className="museum-fact">
                <strong>Фонтанки, 91</strong>
                <span>музей, клуб и чайное кафе «Ти Лаунж»</span>
              </div>
            </div>
            <Link href="/museum" className="button button-light">
              Подробнее и запись <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
