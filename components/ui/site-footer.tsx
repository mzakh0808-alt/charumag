import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm text-[#aebbad]">
            Чай для дома и в подарок, посуда и аксессуары в Санкт-Петербурге.
          </p>
        </div>
        <div>
          <h2 className="footer-title">Покупателям</h2>
          <nav className="footer-links" aria-label="Навигация в подвале">
            <Link href="/catalog">Каталог</Link>
            <Link href="/stores">Магазины и самовывоз</Link>
            <Link href="/cart">Корзина</Link>
            <Link href="/privacy">Персональные данные</Link>
          </nav>
        </div>
        <div>
          <h2 className="footer-title">Получение заказа</h2>
          <div className="footer-links">
            <span>Самовывоз из магазина</span>
            <span>Доставка по выбранному адресу</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        Демонстрационный MVP. Не является публичной офертой. Данные о компании и товарах требуют проверки перед публикацией.
      </div>
    </footer>
  );
}
