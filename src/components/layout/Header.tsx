import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import { localizedHref } from "@/lib/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { CV_FR_URL, CV_EN_URL } from "@/lib/contact-info";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: localizedHref(locale, "/"), label: dict.nav.home },
    { href: localizedHref(locale, "/parcours"), label: dict.nav.parcours },
    { href: localizedHref(locale, "/profil"), label: dict.nav.profil },
    { href: localizedHref(locale, "/contact"), label: dict.nav.contact },
  ];
  const cvUrl =
    (locale === "fr" ? CV_FR_URL : CV_EN_URL) || CV_FR_URL || CV_EN_URL || localizedHref(locale, "/contact");

  return (
    <header className="sticky top-0 z-40 border-b border-(--color-line) bg-(--color-paper)/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href={localizedHref(locale, "/")} className="display text-base">
          Thibault Randrasana
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-(--color-soft) transition-colors hover:bg-(--color-paper-dim) hover:text-(--color-ink)"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle label={dict.nav.themeToggle} />
          <LanguageSwitcher locale={locale} label={dict.nav.languageSwitchLabel} />
          <a
            href={cvUrl}
            className="hidden rounded-full border border-(--color-ink) px-4 py-1.5 text-sm font-medium transition-colors hover:bg-(--color-ink) hover:text-(--color-paper) sm:inline-block"
          >
            {dict.nav.cv}
          </a>
        </div>
      </div>
      <nav aria-label="Navigation mobile" className="flex gap-4 overflow-x-auto px-6 pb-3 md:hidden">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="link-underline shrink-0 text-sm">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
