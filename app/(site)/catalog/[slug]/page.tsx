import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/catalog/add-to-cart";
import { ProductVisual } from "@/components/catalog/product-visual";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getDb, getProductStock } from "@/lib/db";
import { formatPrice, teaTypeLabels } from "@/lib/format";
import { JsonLd, siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const database = await getDb();
  const product = database.products.find((item) => item.slug === slug && item.isActive);
  if (!product) return { title: "Товар не найден" };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/catalog/${product.slug}` },
    openGraph: { title: product.name, description: product.shortDescription, type: "website" },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const database = await getDb();
  const product = database.products.find((item) => item.slug === slug && item.isActive);
  if (!product) notFound();
  const stock = getProductStock(database.inventory, product.id);

  return (
    <div className="container">
      <div className="page-head pb-6">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/catalog", label: "Каталог" }, { label: product.name }]} />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.shortDescription,
          url: `${siteUrl}/catalog/${product.slug}`,
          category: product.kind === "tea" ? "Чай" : "Аксессуары для чаепития",
          offers: {
            "@type": "Offer",
            priceCurrency: "RUB",
            price: (product.price / 100).toFixed(2),
            availability: stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${siteUrl}/catalog/${product.slug}`,
          },
        }}
      />
      <article className="product-detail">
        <ProductVisual product={product} large />
        <div className="product-detail-info">
          {product.isDemo ? <span className="demo-badge">Демонстрационный товар</span> : null}
          <h1>{product.name}</h1>
          <p className="muted">{product.shortDescription}</p>
          <div className="product-detail-price">{formatPrice(product.price)}</div>
          <AddToCart product={product} stock={stock} />
          <p className={`stock-note ${stock <= 0 ? "out" : ""}`}>
            {stock > 0 ? `В наличии по демонстрационным остаткам: ${stock}` : "Нет в наличии"}
          </p>
          <div className="detail-list">
            <div className="detail-row"><span>Категория</span><strong>{product.kind === "tea" ? "Чай" : "Аксессуар"}</strong></div>
            {product.teaType ? <div className="detail-row"><span>Тип</span><strong>{teaTypeLabels[product.teaType]}</strong></div> : null}
            <div className="detail-row"><span>Страна</span><strong>{product.country}</strong></div>
            <div className="detail-row"><span>Фасовка / объём</span><strong>{product.unit}</strong></div>
          </div>
          <p className="product-detail-description">{product.description}</p>
          <div className="notice">
            Цена, описание и остатки указаны для проверки интерфейса. Перед настоящим заказом их нужно заменить данными заказчика.
          </div>
        </div>
      </article>
    </div>
  );
}
