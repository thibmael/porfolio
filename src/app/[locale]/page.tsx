import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { localizedHref } from "@/lib/routing";
import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Counter } from "@/components/home/Counter";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PORTRAIT_URL } from "@/lib/contact-info";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const hero = dict.home.hero;

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-(--color-ink-soft)">
            {hero.eyebrow}
          </p>
          <SectionTitle as="h1" className="font-serif-display mt-4 text-4xl leading-[1.05] sm:text-6xl">
            {hero.name}
          </SectionTitle>
          <p className="measure mt-6 text-xl leading-snug sm:text-2xl">{hero.positioning}</p>
          <p className="measure mt-4 text-base text-(--color-ink-soft)">{hero.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={localizedHref(locale, "/contact")}
              className="rounded-full bg-(--color-ink) px-6 py-3 text-sm font-medium text-(--color-paper) transition-opacity hover:opacity-90"
            >
              {hero.ctaPrimary}
            </Link>
            <Link href={localizedHref(locale, "/missions")} className="link-underline text-sm font-medium">
              {hero.secondaryCta}
            </Link>
          </div>
          <p className="mt-3 text-xs text-(--color-ink-soft)">{hero.ctaNote}</p>
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <ImagePlaceholder
            src={PORTRAIT_URL || undefined}
            alt={hero.photoAlt}
            label={hero.photoPlaceholder}
            ratio="4 / 5"
            bw
            rounded="rounded-3xl"
          />
        </div>
      </section>

      <section aria-labelledby="proof-title" className="border-y border-(--color-line) bg-(--color-paper-dim)">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 id="proof-title" className="sr-only">
            {dict.home.proof.title}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {dict.home.proof.items.map((item) => (
              <Link
                key={item.id}
                href={localizedHref(locale, `/missions#capsule-${item.capsule}`)}
                className="group block"
              >
                <p className="font-serif-display text-4xl tabular-nums sm:text-5xl">
                  <Counter value={item.number} prefix={item.prefix} suffix={item.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-(--color-ink-soft)">
                  {item.label}
                </p>
                <p className="measure mt-2 text-sm text-(--color-ink)">{item.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
