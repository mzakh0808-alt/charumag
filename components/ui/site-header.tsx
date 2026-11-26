"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Logo } from "@/components/ui/logo";

const links = [
  { href: "/catalog", label: "Каталог" },
  { href: "/stores", label: "Магазины" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <>
      <a href="#main-content" className="skip-link">Перейти к содержимому</a>
      <div className={`demo-bar ${isHome ? "demo-bar-home" : ""}`}>Тестовый сайт: ассортимент, цены, остатки и контакты магазинов — демонстрационные</div>
      <header className={`site-header ${isHome ? "site-header-home" : ""}`}>
        <div className="container header-inner">
          <Logo light={isHome} />
          <nav className="desktop-nav" aria-label="Основная навигация">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link ${pathname.startsWith(link.href) ? "active" : ""}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/cart" className="cart-link" aria-label={`Корзина, товаров: ${hydrated ? count : 0}`}>
              <ShoppingBag size={22} strokeWidth={1.6} />
              <span className="hidden text-sm sm:inline">Корзина</span>
              {hydrated && count > 0 ? <span className="cart-count">{count}</span> : null}
            </Link>
            <button
              type="button"
              className="icon-button mobile-trigger"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
            >
              {open ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="mobile-menu" id="mobile-navigation">
            <nav aria-label="Мобильная навигация">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
