import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { Filigrane, teinteByIndex } from "@/components/ui/Filigrane";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).profil.title };
}

const TINTS = ["var(--color-rose)", "var(--color-blue)", "var(--color-sage)"];
const tint = (i: number) => TINTS[i % 3];

export default async function ProfilPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const p = getDictionary(locale).profil;

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="display text-4xl sm:text-5xl">{p.title}</h1>
      <p className="measure mt-6 text-lg leading-relaxed text-(--color-ink)">{p.intro}</p>

      {/* Domains */}
      <section className="mt-14">
        <h2 className="display text-xl">{p.domainsTitle}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.domains.map((d, i) => (
            <div key={d.label} className="group relative overflow-hidden rounded-2xl border border-(--color-line) bg-(--color-card)">
              <span className="block h-1 w-full" style={{ backgroundColor: tint(i) }} />
              <Filigrane teinte={teinteByIndex(i)} variant={i} opacity={0.1} className="pointer-events-none absolute -right-5 -top-6 h-28 w-28" />
              <div className="relative p-5">
                <p className="font-medium leading-snug">{d.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-(--color-soft) opacity-70 transition-opacity group-hover:opacity-100">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zones + Languages */}
      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="display text-xl">{p.zonesTitle}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {p.zones.map((z, i) => (
              <div key={z.label} className="rounded-2xl border border-(--color-line) bg-(--color-card) p-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tint(i) }} />
                  <p className="text-sm font-medium">{z.label}</p>
                </div>
                <p className="mt-1 pl-5 text-xs text-(--color-soft)">{z.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="display text-xl">{p.langTitle}</h2>
          <div className="mt-5 grid gap-3">
            {p.langs.map((l, i) => (
              <div key={l.label} className="rounded-2xl border border-(--color-line) bg-(--color-card) p-4">
                <div className="flex items-baseline justify-between">
                  <p className="font-medium">{l.label}</p>
                  <p className="text-xs text-(--color-soft)">{l.note}</p>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-(--color-paper-dim)">
                  <div className="h-full rounded-full" style={{ width: `${l.levelPct}%`, backgroundColor: tint(i) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mt-12">
        <h2 className="display text-xl">{p.toolsTitle}</h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {p.tools.map((t, i) => (
            <li key={t} className="rounded-full border-2 px-4 py-1.5 text-sm" style={{ borderColor: tint(i) }}>
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
