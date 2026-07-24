import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { localizedHref } from "@/lib/routing";
import { notFound } from "next/navigation";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { ProjectCard } from "@/components/project/ProjectCard";
import type { Project } from "@/lib/project-types";
import { CV_FR_URL, CV_EN_URL, PORTRAIT_URL } from "@/lib/contact-info";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const hero = dict.home.hero;
  const projects = dict.projects as unknown as Project[];
  const preview = dict.home.previewSlugs
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is Project => Boolean(p));
  const cvUrl = (locale === "fr" ? CV_FR_URL : CV_EN_URL) || localizedHref(locale, "/contact");

  return (
    <>
      {/* Hero — asymmetric */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-14 sm:pt-20 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-soft)">{hero.eyebrow}</p>
          <p className="mt-3 text-sm font-medium text-(--color-soft)">{hero.name}</p>
          <h1 className="display mt-2 text-4xl leading-[1.08] sm:text-5xl">{hero.title}</h1>
          <p className="measure mt-5 text-lg leading-relaxed text-(--color-ink)">{hero.subtitle}</p>
          <p className="measure mt-4 text-[0.98rem] leading-relaxed text-(--color-soft)">{hero.personal}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={localizedHref(locale, "/parcours")} className="rounded-full bg-(--color-ink) px-6 py-3 text-sm font-medium text-(--color-paper) transition-opacity hover:opacity-90">
              {hero.ctaExplore}
            </Link>
            <a href={cvUrl} className="rounded-full border border-(--color-ink) px-6 py-3 text-sm font-medium transition-colors hover:bg-(--color-ink) hover:text-(--color-paper)">
              {hero.ctaCV}
            </a>
            <Link href={localizedHref(locale, "/contact")} className="link-underline text-sm font-medium">
              {hero.ctaContact}
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <MediaPlaceholder
            src={PORTRAIT_URL || undefined}
            alt={hero.photoAlt}
            ratio="4 / 5"
            filename={hero.photoFile}
            fileLabel={dict.common.fileLabel}
            bw
            rounded="rounded-[1.75rem]"
          />
        </div>
      </section>

      {/* Quick proofs */}
      <section className="border-y border-(--color-line) bg-(--color-card)">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.proofs.map((p, i) => (
            <div key={i} className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: i % 2 ? "var(--color-blue)" : "var(--color-rose)" }} />
              <p className="text-sm leading-relaxed text-(--color-ink)">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display text-2xl sm:text-3xl">{dict.home.previewTitle}</h2>
          <Link href={localizedHref(locale, "/parcours")} className="link-underline hidden text-sm font-medium sm:block">
            {dict.home.previewCta} →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              href={localizedHref(locale, `/parcours/${p.slug}`)}
              cta={dict.parcours.cardCta}
              fileLabel={dict.common.fileLabel}
              index={i}
            />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link href={localizedHref(locale, "/parcours")} className="link-underline text-sm font-medium">
            {dict.home.previewCta} →
          </Link>
        </div>
      </section>
    </>
  );
}
