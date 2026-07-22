import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Hero({ hero }: { hero: Dictionary["home"]["hero"] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-24">
      <p className="text-sm font-medium uppercase tracking-widest text-(--color-ink-soft)">
        {hero.eyebrow}
      </p>
      <SectionTitle
        as="h1"
        className="font-serif-display mt-4 text-4xl leading-[1.1] sm:text-6xl"
      >
        {hero.name}
      </SectionTitle>
      <p className="measure mt-6 text-xl leading-snug text-(--color-ink) sm:text-2xl">
        {hero.positioning}
      </p>
      <p className="measure mt-4 text-base text-(--color-ink-soft) sm:text-lg">{hero.subtitle}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href={hero.ctaHref}
          className="rounded-full bg-(--color-accent) px-6 py-3 text-sm font-medium text-(--color-paper) transition-colors hover:bg-(--color-accent-soft)"
        >
          {hero.ctaPrimary}
        </Link>
        <Link href={hero.secondaryCtaHref} className="link-underline text-sm font-medium">
          {hero.secondaryCta}
        </Link>
      </div>
      <p className="mt-3 text-xs text-(--color-ink-soft)">{hero.ctaNote}</p>
    </section>
  );
}
