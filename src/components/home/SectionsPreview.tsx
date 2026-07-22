import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import { localizedHref } from "@/lib/routing";

export function SectionsPreview({
  preview,
  locale,
}: {
  preview: Dictionary["home"]["sectionsPreview"];
  locale: Locale;
}) {
  const cards = [
    { ...preview.missions, href: localizedHref(locale, "/missions") },
    { ...preview.expertise, href: localizedHref(locale, "/expertise") },
    { ...preview.recherche, href: localizedHref(locale, "/recherche") },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.href} className="border-t border-(--color-line) pt-4">
            <h3 className="font-serif-display text-xl">{card.title}</h3>
            <p className="mt-2 text-sm text-(--color-ink-soft)">{card.text}</p>
            <Link href={card.href} className="link-underline mt-3 inline-block text-sm font-medium">
              {card.cta} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
