import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teinteBg, type Teinte } from "@/lib/project-types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).profil.title };
}

const ROSE = "var(--color-accent)";
const BLUE = "var(--color-accent-blue)";
const dot = (i: number) => (i % 2 === 0 ? ROSE : BLUE);
const cardTint = (t: Teinte) => ({
  background: `color-mix(in srgb, ${teinteBg(t)} 28%, var(--color-paper))`,
  borderColor: `color-mix(in srgb, ${teinteBg(t)} 55%, var(--color-paper))`,
});

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
        <SectionHeading title={p.domainsTitle} accent={ROSE} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.domains.map((d, i) => (
            <div key={d.label} className="rounded-2xl border p-5" style={cardTint(i % 2 === 0 ? "rose" : "blue")}>
              <p className="font-medium leading-snug">{d.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-(--color-soft)">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zones + Languages */}
      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading title={p.zonesTitle} accent={BLUE} />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {p.zones.map((z, i) => (
              <div key={z.label} className="rounded-2xl border border-(--color-line) bg-(--color-paper) p-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dot(i) }} />
                  <p className="text-sm font-medium">{z.label}</p>
                </div>
                <p className="mt-1 pl-5 text-xs text-(--color-soft)">{z.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title={p.langTitle} accent={ROSE} />
          <div className="mt-5 grid gap-3">
            {p.langs.map((l, i) => (
              <div key={l.label} className="rounded-2xl border border-(--color-line) bg-(--color-paper) p-4">
                <div className="flex items-baseline justify-between">
                  <p className="font-medium">{l.label}</p>
                  <p className="text-xs text-(--color-soft)">{l.note}</p>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-(--color-paper-dim)">
                  <div className="h-full rounded-full" style={{ width: `${l.levelPct}%`, backgroundColor: dot(i) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mt-12">
        <SectionHeading title={p.toolsTitle} accent={BLUE} />
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {p.tools.map((t, i) => (
            <li key={t} className="rounded-full border-2 px-4 py-1.5 text-sm" style={{ borderColor: dot(i) }}>
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
