"use client";

import { ClipboardList, LayoutDashboard, Package, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Сводка", icon: LayoutDashboard },
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/orders", label: "Заказы", icon: ClipboardList },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Навигация администратора">
      {links.map((link) => {
        const Icon = link.icon;
        const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
        return <Link key={link.href} href={link.href} className={`admin-nav-link ${active ? "active" : ""}`}><Icon size={17} />{link.label}</Link>;
      })}
      <Link href="/" className="admin-nav-link mt-4"><Store size={17} />Открыть сайт</Link>
    </nav>
  );
}
