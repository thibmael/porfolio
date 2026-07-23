import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import { localizedHref } from "@/lib/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: localizedHref(locale, "/"), label: dict.nav.home },
    { href: localizedHref(locale, "/missions"), label: dict.nav.missions },
    { href: localizedHref(locale, "/expertise"), label: dict.nav.expertise },
    { href: localizedHref(locale, "/recherche"), label: dict.nav.recherche },
  ];

  return (
    <header className="border-b border-(--color-line)">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={localizedHref(locale, "/")} className="font-serif-display text-lg">
          Thibault Randrasana
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-(--color-ink-soft) transition-colors hover:bg-(--color-paper-dim) hover:text-(--color-ink)"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <LanguageSwitcher locale={locale} label={dict.nav.languageSwitchLabel} />
          <Link
            href={localizedHref(locale, "/contact")}
            className="hidden rounded-full bg-(--color-accent) px-4 py-2 text-sm text-(--color-paper) transition-colors hover:bg-(--color-accent-soft) sm:inline-block"
          >
            {dict.nav.contact}
          </Link>
        </div>
      </div>
      <nav aria-label="Navigation mobile" className="flex gap-4 overflow-x-auto px-6 pb-3 md:hidden">
        {[...links, { href: localizedHref(locale, "/contact"), label: dict.nav.contact }].map(
          (link) => (
            <Link key={link.href} href={link.href} className="link-underline shrink-0 text-sm">
              {link.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
