import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import { localizedHref } from "@/lib/routing";
import { LINKEDIN_URL } from "@/lib/contact-info";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-(--color-line) py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-(--color-ink-soft) sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif-display text-base text-(--color-ink)">Thibault Randrasana</p>
          <p className="measure mt-1">{dict.footer.tagline}</p>
          <p className="mt-1">{dict.footer.availability}</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Link href={localizedHref(locale, "/contact")} className="link-underline">
            {dict.nav.contact}
          </Link>
          {LINKEDIN_URL ? (
            <a href={LINKEDIN_URL} className="link-underline" target="_blank" rel="noreferrer">
              {dict.footer.linkedin}
            </a>
          ) : (
            <span>{dict.footer.linkedinPlaceholder}</span>
          )}
          <span>
            © {new Date().getFullYear()} Thibault Randrasana — {dict.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
