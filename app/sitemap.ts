import type { MetadataRoute } from "next";
import { getDb } from "@/lib/db";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const database = await getDb();
  const staticPages = ["", "/catalog", "/stores", "/museum", "/privacy"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/catalog" ? ("daily" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.8,
  }));
  const products = database.products.filter((product) => product.isActive).map((product) => ({
    url: `${siteUrl}/catalog/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...products];
}
