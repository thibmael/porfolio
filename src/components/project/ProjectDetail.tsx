import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import type { Project } from "@/lib/project-types";
import { teinteInk, teinteBg } from "@/lib/project-types";
import { localizedHref } from "@/lib/routing";
import { PROJECT_MEDIA, SUGGESTED_COVER, SUGGESTED_GALLERY } from "@/lib/project-media";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Cover } from "./Cover";
import { Accordion } from "@/components/ui/Accordion";
import { ProjectNavigation } from "./ProjectNavigation";
import { THESIS_PDF_URL } from "@/lib/contact-info";

type DetailDict = Dictionary["detail"];

function DownloadGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

/* Section heading with a short accent bar for structure. */
function Head({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span aria-hidden="true" className="h-3.5 w-1 rounded-full" style={{ backgroundColor: accent }} />
      <h2 className="text-xs font-semibold uppercase tracking-widest text-(--color-soft)">{title}</h2>
    </div>
  );
}

export function ProjectDetail({
  project,
  detail,
  locale,
  prev,
  next,
  fileLabel,
}: {
  project: Project;
  detail: DetailDict;
  locale: Locale;
  prev?: Project;
  next?: Project;
  fileLabel: string;
}) {
  const media = PROJECT_MEDIA[project.slug] ?? {};
  const cover = media.cover || media.logo || "";
  const gallery = media.gallery ?? [];
  const galleryHints = SUGGESTED_GALLERY[project.slug] ?? [];
  const filename = SUGGESTED_COVER[project.slug] ?? media.logo ?? undefined;
  const backHref = localizedHref(locale, "/parcours");
  const accent = teinteInk(project.teinte);
  const soft = teinteBg(project.teinte);
  const tint = `color-mix(in srgb, ${soft} 40%, var(--color-paper))`;
  const tintLine = `color-mix(in srgb, ${soft} 65%, var(--color-paper))`;

  const facts: { label: string; value: string }[] = [
    { label: detail.factsRole, value: project.role },
    { label: detail.factsPeriod, value: project.periode },
    { label: detail.factsLocation, value: project.location },
    { label: detail.factsCategory, value: project.category.join(" · ") },
  ];

  return (
    <article className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
      <Link href={backHref} className="link-underline text-xs font-semibold uppercase tracking-wide text-(--color-soft)">
        ← {detail.back}
      </Link>

      {/* cover banner */}
      <div className="relative mt-5 overflow-hidden rounded-3xl" style={{ aspectRatio: "16 / 7" }}>
        <Cover slug={project.slug} src={cover || undefined} alt={project.imageAlt} hint={cover ? undefined : filename} hintClassName="left-5 top-5" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-8">
          <div className="flex flex-wrap gap-2">
            {project.category.map((c) => (
              <span key={c} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                {c}
              </span>
            ))}
          </div>
          <h1 className="display mt-3 text-3xl font-bold leading-tight sm:text-4xl">{project.org}</h1>
          <p className="mt-1 text-white/85">{project.role}</p>
        </div>
      </div>

      {/* Lead: summary + key figure / facts card */}
      <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-10">
        <div>
          <p className="text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">{project.summary}</p>
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-7">
              <Head title={detail.highlightsTitle} accent={accent} />
              <ul className="mt-3 flex flex-col gap-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-[0.95rem] font-medium">
                    <span
                      aria-hidden="true"
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      ✓
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="rounded-3xl border p-6" style={{ background: tint, borderColor: tintLine }}>
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-(--color-soft)">{project.metric.label}</p>
          <p className="display mt-1 text-4xl font-bold leading-none" style={{ color: accent }}>{project.metric.value}</p>
          <dl className="mt-5 space-y-3 border-t pt-5 text-sm" style={{ borderColor: tintLine }}>
            {facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4">
                <dt className="shrink-0 text-(--color-soft)">{f.label}</dt>
                <dd className="text-right font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          {project.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5 border-t pt-5" style={{ borderColor: tintLine }}>
              {project.tags.map((t) => (
                <li key={t} className="rounded-full bg-(--color-paper) px-2.5 py-1 text-xs text-(--color-soft)">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>

      {/* Contexte + rôle, two columns */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
        <section>
          <Head title={detail.contextTitle} accent={accent} />
          <p className="mt-3 leading-relaxed text-(--color-ink)">{project.contexte}</p>
        </section>
        <section>
          <Head title={detail.roleTitle} accent={accent} />
          <p className="mt-3 leading-relaxed text-(--color-ink)">{project.monRole}</p>
        </section>
      </div>

      {/* Travail — card grid */}
      {project.travail && project.travail.length > 0 && (
        <section className="mt-12">
          <Head title={detail.workTitle} accent={accent} />
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.travail.map((it) => (
              <li
                key={it}
                className="rounded-2xl border border-(--color-line) bg-(--color-paper) p-4 pl-5 text-[0.95rem] leading-relaxed"
                style={{ borderLeft: `3px solid ${accent}` }}
              >
                {it}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* MSC ports */}
      {project.ports && (
        <section className="mt-12">
          <Head title={detail.portsTitle} accent={accent} />
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.ports.map((p) => (
              <li key={p} className="rounded-full border border-(--color-line) px-3 py-1 text-sm text-(--color-soft)">
                {p}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Résultats — highlighted cards */}
      {project.resultats && project.resultats.length > 0 && (
        <section className="mt-12">
          <Head title={detail.resultsTitle} accent={accent} />
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.resultats.map((it) => (
              <li key={it} className="flex gap-3 rounded-2xl p-5 text-[0.95rem] leading-relaxed" style={{ background: tint }}>
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold text-white"
                  style={{ backgroundColor: accent }}
                >
                  ✓
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
          {project.issue && (
            <p className="mt-4 rounded-2xl border-l-4 bg-(--color-paper-dim) p-4 text-[0.95rem] leading-relaxed" style={{ borderColor: accent }}>
              {project.issue}
            </p>
          )}
        </section>
      )}

      {/* Ploutos steps — timeline */}
      {project.steps && (
        <section className="mt-12">
          <Head title={detail.stepsTitle} accent={accent} />
          <ol className="mt-4 space-y-0">
            {project.steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ backgroundColor: accent }}>
                    {i + 1}
                  </span>
                  {i < project.steps!.length - 1 && <span className="my-1 w-px flex-1 bg-(--color-line)" style={{ minHeight: 18 }} />}
                </div>
                <span className="pb-4 pt-1 text-[0.95rem]">{s}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* PopnBuy evolving indicators */}
      {project.evolving && (
        <section className="mt-12">
          <Head title={detail.evolvingTitle} accent={accent} />
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.evolving.map((e) => (
              <div key={e.label} className="rounded-2xl border p-4" style={{ background: tint, borderColor: tintLine }}>
                <dt className="text-xs text-(--color-soft)">{e.label}</dt>
                <dd className="display mt-1 text-lg" style={{ color: accent }}>{e.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* thesis — research deep-dive: analysis & significance foregrounded */}
      {project.thesis && (
        <section className="mt-12">
          <Head title={detail.thesisSummaryTitle} accent={accent} />
          <div className="mt-4 overflow-hidden rounded-3xl border" style={{ borderColor: tintLine }}>
            {/* header: small meta + download (no vanity page count) */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 sm:px-7" style={{ background: tint }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-(--color-soft)">
                {project.metric.value} · {project.metric.label}
              </p>
              {THESIS_PDF_URL ? (
                <a
                  href={THESIS_PDF_URL}
                  download
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accent }}
                >
                  <DownloadGlyph />
                  {detail.thesisDownload}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 text-xs text-(--color-soft)" style={{ borderColor: tintLine }}>
                  <DownloadGlyph />
                  {detail.thesisUnavailable}
                </span>
              )}
            </div>
            {/* body: the analysis and its significance, shown openly */}
            <div className="bg-(--color-paper) px-6 py-6 sm:px-7">
              <div className="measure space-y-3">
                {project.thesis.summary.map((p, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "text-lg leading-relaxed text-(--color-ink)" : "text-[0.98rem] leading-relaxed text-(--color-soft)"}
                  >
                    {p}
                  </p>
                ))}
              </div>
              <p className="measure mt-5 border-t border-(--color-line) pt-4 text-[0.85rem] leading-relaxed text-(--color-soft)">
                <span className="font-semibold text-(--color-ink)">{detail.thesisMethodTitle} — </span>
                {project.thesis.methodology}
              </p>
              <div className="mt-2">
                <Accordion summary={detail.thesisTocTitle}>
                  <ol className="space-y-4">
                    {project.thesis.toc.map((part, i) => (
                      <li key={part.part} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold text-white" style={{ backgroundColor: accent }}>
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-medium text-(--color-ink)">{part.part}</p>
                          {part.chapters.length > 0 && (
                            <ul className="mt-1 space-y-1 text-(--color-soft)">
                              {part.chapters.map((c) => (
                                <li key={c} className="flex gap-2"><span aria-hidden="true">—</span><span>{c}</span></li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* lesson — pull quote */}
      {project.enseignement && (
        <section className="mt-12">
          <Head title={detail.lessonTitle} accent={accent} />
          <blockquote className="relative mt-4 overflow-hidden rounded-3xl p-6 sm:p-8" style={{ background: accent }}>
            <span aria-hidden="true" className="display absolute -top-3 right-4 text-8xl leading-none text-white/15">”</span>
            <p className="relative text-lg font-medium leading-relaxed text-white sm:text-xl">{project.enseignement}</p>
          </blockquote>
        </section>
      )}

      {/* external link */}
      {project.externalLink && (
        <div className="mt-8">
          <a href={project.externalLink} target="_blank" rel="noreferrer" className="link-underline text-sm font-semibold" style={{ color: accent }}>
            {detail.externalLink} — {project.externalLink.replace("https://", "")} →
          </a>
        </div>
      )}

      {/* gallery */}
      <section className="mt-12">
        <Head title={detail.galleryTitle} accent={accent} />
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <MediaPlaceholder
              key={i}
              src={gallery[i] || undefined}
              alt={`${project.imageAlt} — ${i + 1}`}
              ratio="4 / 3"
              fileLabel={fileLabel}
              filename={gallery[i] ? undefined : galleryHints[i]}
            />
          ))}
        </div>
      </section>

      <ProjectNavigation
        prev={prev ? { href: localizedHref(locale, `/parcours/${prev.slug}`), org: prev.org } : undefined}
        next={next ? { href: localizedHref(locale, `/parcours/${next.slug}`), org: next.org } : undefined}
        backHref={backHref}
        labels={{ prev: detail.prev, back: detail.back, next: detail.next }}
      />
    </article>
  );
}
