import { ArrowRight, ArrowUpRight, Gift, ShoppingBag, Truck } from "lucide-react";
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
        <div className="container hero-shell">
          <div className="hero-heading">
            <p className="hero-kicker"><span />Чайный супермаркет в Санкт-Петербурге<span /></p>
            <h1>
              Чай стоит того,
              <span className="hero-title-accent">чтобы не спешить.</span>
            </h1>
            <p className="hero-copy">
              Чай для дома и в подарок, посуда для любимых ритуалов. Выбирайте онлайн и получайте заказ удобным способом.
            </p>
            <div className="hero-actions">
              <Link href="/catalog" className="button button-primary">
                Выбрать чай <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/stores" className="button button-secondary">
                Найти магазин <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="intro-strip" aria-label="О «Море чая»">
        <div className="container intro-grid">
          <div className="intro-item">
            <ShoppingBag size={23} strokeWidth={1.25} aria-hidden="true" />
            <h2>Для дома</h2>
            <p>Чай и аксессуары для повседневного чаепития</p>
          </div>
          <div className="intro-item">
            <Gift size={23} strokeWidth={1.25} aria-hidden="true" />
            <h2>В подарок</h2>
            <p>Сорта чая и посуда для приятного подарка</p>
          </div>
          <div className="intro-item">
            <Truck size={23} strokeWidth={1.25} aria-hidden="true" />
            <h2>Удобное получение</h2>
            <p>Самовывоз из магазина или доставка</p>
          </div>
        </div>
      </section>

      <section className="section collection-section">
        <div className="container">
          <div className="section-top">
            <div>
              <p className="section-eyebrow">Избранная коллекция</p>
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
    </>
  );
}
