import { ArrowRight, Coffee, Landmark, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { HeroArt } from "@/components/ui/hero-art";
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
            <p className="hero-kicker">Чайный супермаркет в Санкт-Петербурге</p>
            <h1>Чай стоит того, чтобы не спешить.</h1>
            <p className="hero-copy">
              Чай для дома и в подарок, посуда для любимых ритуалов и музей чайной культуры в историческом доме на Фонтанке.
            </p>
            <div className="hero-actions">
              <Link href="/catalog" className="button button-primary">
                Выбрать чай <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/museum" className="button button-secondary">
                О музее и клубе
              </Link>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="intro-strip" aria-label="О «Море чая»">
        <div className="container intro-grid">
          <div className="intro-item">
            <ShoppingBag size={25} strokeWidth={1.25} aria-hidden="true" />
            <h2>Для дома и в подарок</h2>
            <p>Чай и аксессуары с самовывозом или доставкой</p>
          </div>
          <div className="intro-item">
            <Landmark size={25} strokeWidth={1.25} aria-hidden="true" />
            <h2>История места</h2>
            <p>Чайная лавка в доме купца Горсткина с 1882 года</p>
          </div>
          <div className="intro-item">
            <Coffee size={25} strokeWidth={1.25} aria-hidden="true" />
            <h2>«Ти Лаунж»</h2>
            <p>Чайное кафе музея на набережной Фонтанки</p>
          </div>
        </div>
      </section>

      <section className="section collection-section">
        <div className="container">
          <div className="section-top">
            <div>
              <h2 className="section-heading">Выбор для неспешного чаепития</h2>
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
            <span className="museum-year">1882</span>
            <h2 className="section-heading">Дом, где чаю уделяют время</h2>
          </div>
          <div>
            <p>
              Клуб чайной культуры и музей расположены на набережной Фонтанки, 91 — в историческом доме купца Горсткина, где чайная лавка существует с 1882 года.
            </p>
            <div className="museum-facts">
              <div className="museum-fact">
                <strong>Дом купца Горсткина</strong>
                <span>историческое пространство музея и клуба</span>
              </div>
              <div className="museum-fact">
                <strong>«Ти Лаунж»</strong>
                <span>чайное кафе на набережной Фонтанки</span>
              </div>
            </div>
            <Link href="/museum" className="button button-light">
              О музее и клубе <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
