import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });
const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Море чая — чайные магазины в Санкт-Петербурге", template: "%s — Море чая" },
  description: "Чай и аксессуары для дома и в подарок. Магазины в Санкт-Петербурге, самовывоз и доставка.",
  openGraph: {
    title: "Море чая",
    description: "Чай, посуда и аксессуары в Санкт-Петербурге.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${display.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
