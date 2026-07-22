import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Accordion } from "@/components/ui/Accordion";
import { THESIS_PDF_URL } from "@/lib/contact-info";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.recherche.title };
}

export default async function RecherchePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const r = dict.recherche;

  const scholarlyArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: r.subtitle,
    author: {
      "@type": "Person",
      name: "Thibault M. E. Randrasana",
    },
    about: r.subtitle,
    description: r.methodology,
    inLanguage: locale,
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionTitle as="h1" className="font-serif-display text-4xl sm:text-5xl">
        {r.title}
      </SectionTitle>
      <p className="measure mt-4 text-lg text-(--color-ink)">{r.subtitle}</p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wide text-(--color-ink-soft)">
        {r.type}
      </p>

      <section className="mt-10">
        <h2 className="font-serif-display text-xl">{r.methodologyTitle}</h2>
        <p className="measure mt-2 text-sm sm:text-base">{r.methodology}</p>
      </section>

      <section className="mt-10">
        <Accordion summary={r.tocTitle}>
          <p>{r.tocPlaceholder}</p>
        </Accordion>
        <Accordion summary={r.summaryTitle}>
          <p>{r.summaryPlaceholder}</p>
        </Accordion>
      </section>

      <section className="mt-10 border-t border-(--color-line) pt-8">
        <h2 className="font-serif-display text-xl">{r.previewTitle}</h2>
        <p className="measure mt-2 text-sm text-(--color-ink-soft)">{r.previewNote}</p>
        {THESIS_PDF_URL ? (
          <>
            <iframe
              src={THESIS_PDF_URL}
              title={r.previewTitle}
              className="mt-4 h-72 w-full rounded border border-(--color-line)"
            />
            <a
              href={THESIS_PDF_URL}
              download
              className="mt-4 inline-block rounded-full bg-(--color-accent) px-6 py-3 text-sm font-medium text-(--color-paper) transition-colors hover:bg-(--color-accent-soft)"
            >
              {r.downloadLabel}
            </a>
          </>
        ) : (
          <>
            <div className="mt-4 flex h-72 items-center justify-center rounded border border-dashed border-(--color-line) text-center text-sm text-(--color-ink-soft)">
              {r.previewPlaceholder}
            </div>
            <p className="mt-4 text-sm text-(--color-ink-soft)">{r.downloadUnavailable}</p>
          </>
        )}
      </section>

      <Link href={r.backToMissionsHref} className="link-underline mt-10 inline-block text-sm font-medium">
        ← {r.backToMissions}
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd) }}
      />
    </div>
  );
}
