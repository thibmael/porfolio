import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/ui/SectionTitle";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.expertise.title };
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const e = dict.expertise;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <SectionTitle as="h1" className="font-serif-display text-4xl sm:text-5xl">
        {e.title}
      </SectionTitle>

      <section className="mt-12">
        <h2 className="font-serif-display text-xl">{e.domains.title}</h2>
        <ul className="measure mt-3 space-y-2 text-sm sm:text-base">
          {e.domains.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 grid gap-4 border-t border-(--color-line) pt-8 sm:grid-cols-2">
        <div>
          <h2 className="font-serif-display text-xl">{e.geography.title}</h2>
          <p className="mt-2 text-sm sm:text-base">{e.geography.primary}</p>
          <p className="mt-1 text-sm text-(--color-ink-soft)">{e.geography.secondary}</p>
        </div>
      </section>

      <section className="mt-10 border-t border-(--color-line) pt-8">
        <h2 className="font-serif-display text-xl">{e.editorial.title}</h2>
        <p className="measure mt-2 text-sm text-(--color-ink-soft)">{e.editorial.intro}</p>
        <div className="mt-6 space-y-6">
          {e.editorial.items.map((item) => (
            <div key={item.role}>
              <p className="font-medium">{item.role}</p>
              <p className="measure mt-1 text-sm text-(--color-ink-soft)">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm italic text-(--color-ink-soft)">{e.editorial.linksPlaceholder}</p>
        <p className="measure mt-4 rounded border border-dashed border-(--color-line) p-4 text-xs text-(--color-ink-soft)">
          {e.editorial.verificationNote}
        </p>
      </section>

      <section className="mt-10 grid gap-8 border-t border-(--color-line) pt-8 sm:grid-cols-2">
        <div>
          <h2 className="font-serif-display text-xl">{e.languages.title}</h2>
          <ul className="mt-3 space-y-1 text-sm sm:text-base">
            {e.languages.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif-display text-xl">{e.tools.title}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {e.tools.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-(--color-line) px-3 py-1 text-xs text-(--color-ink-soft)"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 border-t border-(--color-line) pt-8">
        <h2 className="font-serif-display text-xl">{e.education.title}</h2>
        <ul className="measure mt-3 space-y-2 text-sm sm:text-base">
          {e.education.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-(--color-line) pt-8">
        <h2 className="font-serif-display text-xl">{e.engagements.title}</h2>
        <ul className="measure mt-3 space-y-2 text-sm sm:text-base">
          {e.engagements.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
