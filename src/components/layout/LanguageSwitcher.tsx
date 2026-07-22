"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import { locales } from "@/lib/i18n-config";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const target: Locale = locale === "fr" ? "en" : "fr";

  function handleSwitch() {
    const segments = pathname.split("/");
    segments[1] = target;
    const nextPath = segments.join("/") || `/${target}`;
    router.push(nextPath, { scroll: false });
  }

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className="link-underline text-sm font-medium tracking-wide uppercase"
      aria-label={label}
    >
      {locales.map((l, i) => (
        <span key={l} aria-hidden={l !== target}>
          {i > 0 ? " / " : ""}
          <span className={l === locale ? "opacity-100" : "opacity-50"}>{l.toUpperCase()}</span>
        </span>
      ))}
    </button>
  );
}
