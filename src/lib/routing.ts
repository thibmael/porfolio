import type { Locale } from "./i18n-config";

export function localizedHref(locale: Locale, path: string = "") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
