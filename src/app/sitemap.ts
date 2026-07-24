import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import type { Project } from "@/lib/project-types";

const routes = ["", "/parcours", "/profil", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = (getDictionary("fr").projects as unknown as Project[]).map((p) => p.slug);
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const route of routes) entries.push({ url: `/${locale}${route}` });
    for (const slug of slugs) entries.push({ url: `/${locale}/parcours/${slug}` });
  }
  return entries;
}
