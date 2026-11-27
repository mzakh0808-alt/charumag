import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { filterProducts, type CatalogFilters } from "@/lib/catalog";
import { getDb, withStock } from "@/lib/db";
import { teaTypeLabels } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог чая и аксессуаров",
  description: "Чай из разных стран и аксессуары для чаепития. Поиск, фильтры по типу, стране, цене и наличию.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const PAGE_SIZE = 8;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function priceInKopecks(value: string) {
  const number = Number(value);
  return value && Number.isFinite(number) && number >= 0 ? Math.round(number * 100) : null;
}

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const filters: CatalogFilters = {
    query: first(params.q).trim(),
    kind: first(params.kind),
    teaType: first(params.type),
    country: first(params.country),
    minPrice: priceInKopecks(first(params.min)),
    maxPrice: priceInKopecks(first(params.max)),
    inStock: first(params.stock) === "1",
    sort: first(params.sort) || "featured",
    page: Math.max(1, Number(first(params.page)) || 1),
  };
  const database = await getDb();
  const products = database.products.map((product) => withStock(database, product));
  const filtered = filterProducts(products, filters);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(filters.page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const countries = [...new Set(products.filter((product) => product.isActive).map((product) => product.country))].sort((a, b) =>
    a.localeCompare(b, "ru"),
  );

  const pageHref = (page: number) => {
    const query = new URLSearchParams();
    if (filters.query) query.set("q", filters.query);
    if (filters.kind) query.set("kind", filters.kind);
    if (filters.teaType) query.set("type", filters.teaType);
    if (filters.country) query.set("country", filters.country);
    if (filters.minPrice !== null) query.set("min", String(filters.minPrice / 100));
    if (filters.maxPrice !== null) query.set("max", String(filters.maxPrice / 100));
    if (filters.inStock) query.set("stock", "1");
    if (filters.sort !== "featured") query.set("sort", filters.sort);
    query.set("page", String(page));
    return `/catalog?${query.toString()}`;
  };

  return (
    <div className="container">
      <div className="page-head">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: "Каталог" }]} />
        <h1>Чайная <em>коллекция</em></h1>
        <p>Ищите по названию, выбирайте тип и страну или оставьте только товары в наличии.</p>
      </div>
      <div className="catalog-layout">
        <aside className="filters" aria-label="Фильтры каталога">
          <details open>
            <summary>
              <span className="flex items-center gap-2"><SlidersHorizontal size={18} /> Поиск и фильтры</span>
            </summary>
            <form id="catalog-filters" className="filter-body" action="/catalog">
              <div className="filter-group">
                <label htmlFor="catalog-search">Поиск</label>
                <input id="catalog-search" className="input" type="search" name="q" defaultValue={filters.query} placeholder="Название или описание" />
              </div>
              <div className="filter-group">
                <label htmlFor="catalog-kind">Категория</label>
                <select id="catalog-kind" className="select" name="kind" defaultValue={filters.kind}>
                  <option value="">Чай и аксессуары</option>
                  <option value="tea">Чай</option>
                  <option value="accessory">Аксессуары</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="catalog-type">Тип чая</label>
                <select id="catalog-type" className="select" name="type" defaultValue={filters.teaType}>
                  <option value="">Любой</option>
                  {Object.entries(teaTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="catalog-country">Страна</label>
                <select id="catalog-country" className="select" name="country" defaultValue={filters.country}>
                  <option value="">Любая</option>
                  {countries.map((country) => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <span>Цена, ₽</span>
                <div className="price-inputs">
                  <input className="input" type="number" name="min" min="0" step="50" defaultValue={filters.minPrice === null ? "" : filters.minPrice / 100} placeholder="От" aria-label="Цена от" />
                  <input className="input" type="number" name="max" min="0" step="50" defaultValue={filters.maxPrice === null ? "" : filters.maxPrice / 100} placeholder="До" aria-label="Цена до" />
                </div>
              </div>
              <label className="checkbox-row">
                <input type="checkbox" name="stock" value="1" defaultChecked={filters.inStock} />
                Только в наличии
              </label>
              <button type="submit" className="button button-primary">Показать товары</button>
              <Link href="/catalog" className="text-center text-xs text-[var(--muted)] underline">Сбросить фильтры</Link>
            </form>
          </details>
        </aside>
        <section aria-live="polite">
          <div className="catalog-toolbar">
            <span className="catalog-count">Найдено: {filtered.length}</span>
            <label className="flex items-center gap-2 text-xs">
              Сортировка
              <select className="select" name="sort" form="catalog-filters" defaultValue={filters.sort}>
                <option value="featured">Сначала подборка</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="name">По названию</option>
              </select>
            </label>
          </div>
          {visible.length ? (
            <div className="product-grid product-grid-catalog">
              {visible.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Ничего не нашлось</h2>
              <p className="muted">Попробуйте убрать часть фильтров или изменить поисковый запрос.</p>
              <Link href="/catalog" className="button button-secondary">Показать весь каталог</Link>
            </div>
          )}
          {pageCount > 1 ? (
            <nav className="pagination" aria-label="Страницы каталога">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <Link key={page} href={pageHref(page)} className={`page-link ${page === currentPage ? "active" : ""}`} aria-current={page === currentPage ? "page" : undefined}>
                  {page}
                </Link>
              ))}
            </nav>
          ) : null}
        </section>
      </div>
    </div>
  );
}
