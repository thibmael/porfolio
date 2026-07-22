import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-config";

const routes = ["", "/missions", "/expertise", "/recherche", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const route of routes) {
      entries.push({ url: `/${locale}${route}` });
    }
  }
  return entries;
}
