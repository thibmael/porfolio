"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import { locales } from "@/lib/i18n-config";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: Locale) {
    if (target === locale) return;
    const segments = pathname.split("/");
    segments[1] = target;
    const nextPath = segments.join("/") || `/${target}`;
    // keep the active filter (query) and any anchor when switching language
    const suffix =
      typeof window !== "undefined" ? window.location.search + window.location.hash : "";
    router.push(nextPath + suffix, { scroll: false });
  }

  return (
    <div className="flex items-center text-sm font-medium tracking-wide uppercase" role="group" aria-label={label}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 text-(--color-line)" aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-current={l === locale ? "true" : undefined}
            className={`link-underline transition-opacity ${l === locale ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
