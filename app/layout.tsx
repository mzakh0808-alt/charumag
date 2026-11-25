import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });
const lora = Lora({ subsets: ["latin", "cyrillic"], variable: "--font-lora" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Море чая — чайные магазины в Санкт-Петербурге", template: "%s — Море чая" },
  description: "Чай и аксессуары для дома и в подарок. Магазины в Санкт-Петербурге, музей и клуб чайной культуры на Фонтанке.",
  openGraph: {
    title: "Море чая",
    description: "Чай, посуда и чайная культура в Санкт-Петербурге.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${lora.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
