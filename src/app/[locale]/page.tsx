import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { localizedHref } from "@/lib/routing";
import { notFound } from "next/navigation";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { ProjectCard } from "@/components/project/ProjectCard";
import type { Project } from "@/lib/project-types";
import { CV_FR_URL, CV_EN_URL, PORTRAIT_URL } from "@/lib/contact-info";
import { LOGO_FILES } from "@/lib/logos";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const hero = dict.home.hero;
  const projects = dict.projects as unknown as Project[];
  const preview = dict.home.previewSlugs
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is Project => Boolean(p));
  const cvUrl =
    (locale === "fr" ? CV_FR_URL : CV_EN_URL) || CV_FR_URL || CV_EN_URL || localizedHref(locale, "/contact");

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-8 pt-12 lg:grid-cols-[1.05fr_0.92fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-(--color-accent)">
            <span className="h-2 w-2 rounded-full bg-(--color-accent) shadow-[0_0_0_4px_rgba(154,95,107,0.18)]" />
            {hero.available}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-(--color-accent)">{hero.eyebrow}</p>
          <h1 className="display mt-3 text-4xl leading-[1.03] sm:text-5xl">{hero.title}</h1>
          <p className="measure mt-5 text-lg leading-relaxed text-(--color-ink)">{hero.subtitle}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href={localizedHref(locale, "/parcours")} className="rounded-full bg-(--color-ink) px-6 py-3 text-sm font-semibold text-(--color-paper) transition-opacity hover:opacity-90">
              {hero.ctaExplore}
            </Link>
            <a href={cvUrl} className="rounded-full border border-(--color-line) px-6 py-3 text-sm font-semibold transition-colors hover:border-(--color-ink)">
              {hero.ctaCV}
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <MediaPlaceholder
            src={PORTRAIT_URL || undefined}
            alt={hero.photoAlt}
            ratio="1 / 1"
            filename={hero.photoFile}
            fileLabel={dict.common.fileLabel}
            rounded="rounded-3xl"
            objectPosition="center 22%"
          />
        </div>
      </section>

      {/* References band — quiet, borderless strip: a line of trust, not a box */}
      <section className="mx-auto max-w-6xl px-6 pt-10" data-reveal>
        <p className="text-center text-[0.7rem] font-semibold uppercase tracking-widest text-(--color-soft)">
          {dict.home.orgsTitle}
        </p>
        <ul className="mt-6 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {dict.home.orgs.map((o) => {
            const logo = LOGO_FILES[o.id] || "";
            return (
              <li key={o.id}>
                <div className="flex h-20 items-center justify-center rounded-xl bg-white px-4 shadow-sm ring-1 ring-black/[0.06] transition-transform duration-300 hover:-translate-y-0.5 sm:h-24 sm:px-5">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt={o.alt} className="max-h-12 w-auto max-w-full object-contain sm:max-h-16" />
                  ) : (
                    <span className="display text-center text-lg font-bold leading-tight text-[#1a171a] sm:text-xl" title={o.alt}>
                      {o.name}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Stats band — the bold, structured counterpart to the quiet logo strip */}
      <section className="mx-auto max-w-6xl px-6 pt-12" data-reveal>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-(--color-line) bg-(--color-line) sm:grid-cols-4">
          {dict.home.stats.map((s, i) => (
            <div key={i} className="bg-(--color-paper) p-6">
              <dt className="display text-3xl font-bold">
                {s.value}
                <span className="text-lg" style={{ color: i % 2 === 0 ? "var(--color-accent)" : "var(--color-accent-blue)" }}>{s.unit}</span>
              </dt>
              <dd className="mt-1 text-[0.8rem] leading-snug text-(--color-soft)">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Preview */}
      <section className="mx-auto max-w-6xl px-6 py-14" data-reveal>
        <div className="flex items-end justify-between gap-4 border-t border-(--color-line) pt-6">
          <h2 className="display text-2xl sm:text-3xl">{dict.home.previewTitle}</h2>
          <Link href={localizedHref(locale, "/parcours")} className="link-underline hidden text-sm font-medium sm:block">
            {dict.home.previewCta} →
          </Link>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((p) => (
            <ProjectCard key={p.slug} project={p} href={localizedHref(locale, `/parcours/${p.slug}`)} cta={dict.parcours.cardCta} ratio="4 / 5" />
          ))}
        </div>
        <div className="mt-7 sm:hidden">
          <Link href={localizedHref(locale, "/parcours")} className="link-underline text-sm font-medium">
            {dict.home.previewCta} →
          </Link>
        </div>
      </section>
    </>
  );
}
