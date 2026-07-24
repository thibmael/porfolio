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

const TINTS = ["var(--color-rose)", "var(--color-blue)"];
const tint = (i: number) => TINTS[i % 2];

function DomainMotif({ i }: { i: number }) {
  const c = tint(i);
  return (
    <svg viewBox="0 0 48 32" className="h-8 w-12" aria-hidden="true">
      {i === 0 && (
        <>
          <circle cx="18" cy="16" r="10" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
          <circle cx="30" cy="16" r="10" fill={c} fillOpacity="0.4" stroke={c} strokeWidth="1.5" />
        </>
      )}
      {i === 1 && (
        <>
          <line x1="6" y1="24" x2="24" y2="8" stroke={c} strokeWidth="1.5" />
          <line x1="24" y1="8" x2="42" y2="20" stroke={c} strokeWidth="1.5" />
          <circle cx="6" cy="24" r="3" fill="var(--color-ink)" />
          <circle cx="24" cy="8" r="3.5" fill={c} />
          <circle cx="42" cy="20" r="3" fill="var(--color-ink)" />
        </>
      )}
      {i === 2 && (
        <>
          {[0, 1, 2, 3].map((b) => (
            <rect key={b} x={8 + b * 9} y={24 - (b + 1) * 5} width="5" height={(b + 1) * 5} fill={b === 3 ? c : "var(--color-ink)"} />
          ))}
        </>
      )}
      {i === 3 && (
        <>
          {[6, 11, 16].map((r, k) => (
            <circle key={r} cx="24" cy="16" r={r} fill="none" stroke={k === 1 ? c : "var(--color-ink)"} strokeWidth="1.4" />
          ))}
          <circle cx="24" cy="16" r="2.5" fill={c} />
        </>
      )}
    </svg>
  );
}

function Block({
  i,
  children,
  className = "",
}: {
  i: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-(--color-line) bg-(--color-paper) ${className}`}>
      <span className="block h-1 w-full" style={{ backgroundColor: tint(i) }} />
      <div className="p-5">{children}</div>
    </div>
  );
}

function CategoryTitle({ children }: { children: string }) {
  return <h2 className="font-serif-display text-xl">{children}</h2>;
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const e = getDictionary(locale).expertise;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle as="h1" className="font-serif-display text-4xl sm:text-5xl">
        {e.title}
      </SectionTitle>
      <p className="measure mt-4 text-(--color-ink-soft)">{e.intro}</p>

      {/* Domains */}
      <section className="mt-12">
        <CategoryTitle>{e.domains.title}</CategoryTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {e.domains.items.map((item, i) => (
            <Block key={item.label} i={i} className="group">
              <div className="flex items-start gap-4">
                <DomainMotif i={i} />
                <div>
                  <p className="font-medium leading-snug">{item.label}</p>
                  <p className="mt-1 text-sm text-(--color-ink-soft) opacity-70 transition-opacity group-hover:opacity-100">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Block>
          ))}
        </div>
      </section>

      {/* Geography + Languages */}
      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <CategoryTitle>{e.geography.title}</CategoryTitle>
          <div className="mt-4 grid gap-4">
            <Block i={0}>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tint(0) }} />
                <p className="text-sm font-medium">{e.geography.primary}</p>
              </div>
            </Block>
            <Block i={1}>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: tint(1) }} />
                <p className="text-sm text-(--color-ink-soft)">{e.geography.secondary}</p>
              </div>
            </Block>
          </div>
        </div>

        <div>
          <CategoryTitle>{e.languages.title}</CategoryTitle>
          <div className="mt-4 grid gap-4">
            {e.languages.items.map((lang, i) => (
              <Block key={lang.label} i={i}>
                <div className="flex items-baseline justify-between">
                  <p className="font-medium">{lang.label}</p>
                  <p className="text-xs text-(--color-ink-soft)">{lang.note}</p>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-(--color-paper-dim)">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${lang.levelPct}%`, backgroundColor: tint(i) }}
                  />
                </div>
              </Block>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mt-8">
        <CategoryTitle>{e.tools.title}</CategoryTitle>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {e.tools.items.map((t, i) => (
            <li
              key={t}
              className="rounded-full border-2 px-4 py-1.5 text-sm"
              style={{ borderColor: tint(i) }}
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section className="mt-8">
        <CategoryTitle>{e.education.title}</CategoryTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {e.education.items.map((ed, i) => (
            <Block key={ed.label} i={i}>
              <p className="text-sm font-medium leading-snug">{ed.label}</p>
              <p className="mt-1 text-xs text-(--color-ink-soft)">{ed.org}</p>
            </Block>
          ))}
        </div>
      </section>

      {/* Engagements */}
      <section className="mt-8">
        <CategoryTitle>{e.engagements.title}</CategoryTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {e.engagements.items.map((g, i) => (
            <Block key={g.label} i={i}>
              <p className="text-sm font-medium leading-snug">{g.label}</p>
              <p className="mt-1 text-xs text-(--color-ink-soft)">{g.note}</p>
            </Block>
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section className="mt-8">
        <CategoryTitle>{e.editorial.title}</CategoryTitle>
        <p className="measure mt-2 text-sm text-(--color-ink-soft)">{e.editorial.intro}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {e.editorial.items.map((item, i) => (
            <Block key={item.role} i={i}>
              <p className="text-sm font-medium leading-snug">{item.role}</p>
              <p className="mt-1.5 text-sm text-(--color-ink-soft)">{item.text}</p>
            </Block>
          ))}
        </div>
        <p className="mt-3 text-sm italic text-(--color-ink-soft)">{e.editorial.linksPlaceholder}</p>
        <p className="measure mt-3 rounded-2xl border border-dashed border-(--color-line) p-4 text-xs text-(--color-ink-soft)">
          {e.editorial.verificationNote}
        </p>
      </section>
    </div>
  );
}
