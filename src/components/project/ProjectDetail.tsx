import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import type { Project } from "@/lib/project-types";
import { localizedHref } from "@/lib/routing";
import { PROJECT_MEDIA, SUGGESTED_COVER } from "@/lib/project-media";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Cover } from "./Cover";
import { Accordion } from "@/components/ui/Accordion";
import { ProjectNavigation } from "./ProjectNavigation";
import { THESIS_PDF_URL } from "@/lib/contact-info";

type DetailDict = Dictionary["detail"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-soft)" }}>
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[0.95rem] leading-relaxed">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent)" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
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
  const filename = SUGGESTED_COVER[project.slug] ?? media.logo ?? undefined;
  const backHref = localizedHref(locale, "/parcours");

  return (
    <article className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
      <Link href={backHref} className="link-underline text-xs font-semibold uppercase tracking-wide text-(--color-soft)">
        ← {detail.back}
      </Link>

      {/* cover banner */}
      <div className="relative mt-5 overflow-hidden rounded-3xl" style={{ aspectRatio: "16 / 7" }}>
        <Cover slug={project.slug} src={cover || undefined} alt={project.imageAlt} />
        <span className="absolute left-5 top-5 z-10 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {project.metric.value}
        </span>
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
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
      <p className="measure mt-6 text-lg leading-relaxed">{project.summary}</p>

      {/* facts */}
      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-(--color-line) py-6 sm:grid-cols-4">
        <Fact label={detail.factsRole} value={project.role} />
        <Fact label={detail.factsPeriod} value={project.periode} />
        <Fact label={detail.factsLocation} value={project.location} />
        <Fact label={detail.factsCategory} value={project.category.join(" · ")} />
      </dl>

      {/* content */}
      <Section title={detail.contextTitle}>
        <p className="measure text-[0.98rem] leading-relaxed">{project.contexte}</p>
      </Section>

      <Section title={detail.roleTitle}>
        <p className="measure text-[0.98rem] leading-relaxed">{project.monRole}</p>
      </Section>

      {project.travail && project.travail.length > 0 && (
        <Section title={detail.workTitle}>
          <Bullets items={project.travail} />
        </Section>
      )}

      {/* MSC ports */}
      {project.ports && (
        <Section title={detail.portsTitle}>
          <ul className="flex flex-wrap gap-2">
            {project.ports.map((p) => (
              <li key={p} className="rounded-full border border-(--color-line) px-3 py-1 text-sm text-(--color-soft)">
                {p}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.resultats && project.resultats.length > 0 && (
        <Section title={detail.resultsTitle}>
          <Bullets items={project.resultats} />
          {project.issue && (
            <p className="measure mt-4 rounded-2xl border-l-4 p-4 text-[0.95rem] leading-relaxed" style={{ borderColor: "var(--color-accent)", background: "var(--color-paper-dim)" }}>
              {project.issue}
            </p>
          )}
        </Section>
      )}

      {/* Ploutos steps */}
      {project.steps && (
        <Section title={detail.stepsTitle}>
          <ol className="space-y-0">
            {project.steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-(--color-ink)" style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}>
                    {i + 1}
                  </span>
                  {i < project.steps!.length - 1 && <span className="my-1 w-px flex-1 bg-(--color-line)" style={{ minHeight: 18 }} />}
                </div>
                <span className="pb-4 pt-1 text-[0.95rem]">{s}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* PopnBuy evolving indicators */}
      {project.evolving && (
        <Section title={detail.evolvingTitle}>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.evolving.map((e) => (
              <div key={e.label} className="rounded-2xl border border-(--color-line) p-4">
                <dt className="text-xs text-(--color-soft)">{e.label}</dt>
                <dd className="display mt-1 text-lg" style={{ color: "var(--color-accent)" }}>{e.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* thesis */}
      {project.thesis && (
        <Section title={detail.thesisMethodTitle}>
          <p className="measure text-[0.95rem] leading-relaxed text-(--color-soft)">{project.thesis.methodology}</p>
          <div className="mt-5 border-y border-(--color-line)">
            <Accordion summary={detail.thesisTocTitle} defaultOpen>
              <ol className="space-y-3">
                {project.thesis.toc.map((part) => (
                  <li key={part.part}>
                    <p className="font-medium text-(--color-ink)">{part.part}</p>
                    {part.chapters.length > 0 && (
                      <ul className="mt-1 space-y-1 pl-4">
                        {part.chapters.map((c) => (
                          <li key={c} className="flex gap-2"><span aria-hidden="true">—</span><span>{c}</span></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </Accordion>
            <Accordion summary={detail.thesisSummaryTitle}>
              <div className="space-y-3">
                {project.thesis.summary.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Accordion>
          </div>
          {THESIS_PDF_URL ? (
            <a href={THESIS_PDF_URL} download className="mt-5 inline-block rounded-full bg-(--color-ink) px-5 py-2.5 text-sm font-medium text-(--color-paper) transition-opacity hover:opacity-90">
              {detail.thesisDownload}
            </a>
          ) : (
            <p className="mt-5 text-sm text-(--color-soft)">{detail.thesisUnavailable}</p>
          )}
        </Section>
      )}

      {/* lesson */}
      {project.enseignement && (
        <Section title={detail.lessonTitle}>
          <p className="measure rounded-2xl p-5 text-[0.98rem] leading-relaxed text-(--color-ink)" style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}>
            {project.enseignement}
          </p>
        </Section>
      )}

      {/* external link */}
      {project.externalLink && (
        <div className="mt-8">
          <a href={project.externalLink} target="_blank" rel="noreferrer" className="link-underline text-sm font-semibold" style={{ color: "var(--color-accent)" }}>
            {detail.externalLink} — {project.externalLink.replace("https://", "")} →
          </a>
        </div>
      )}

      {/* gallery */}
      <Section title={detail.galleryTitle}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <MediaPlaceholder key={i} alt={`${project.imageAlt} — ${i + 1}`} ratio="4 / 3" fileLabel={fileLabel} filename={i === 0 ? filename : undefined} />
          ))}
        </div>
      </Section>

      <ProjectNavigation
        prev={prev ? { href: localizedHref(locale, `/parcours/${prev.slug}`), org: prev.org } : undefined}
        next={next ? { href: localizedHref(locale, `/parcours/${next.slug}`), org: next.org } : undefined}
        backHref={backHref}
        labels={{ prev: detail.prev, back: detail.back, next: detail.next }}
      />
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.65rem] font-semibold uppercase tracking-widest text-(--color-soft)">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}
