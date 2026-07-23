"use client";

import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/missions-types";

type FormatDict = Dictionary["missions"]["format"];

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.68rem] font-semibold uppercase tracking-widest text-(--color-accent)">
        {label}
      </dt>
      <dd className="mt-1.5 text-[0.95rem] leading-relaxed">{value}</dd>
    </div>
  );
}

function Prose({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="text-[0.68rem] font-semibold uppercase tracking-widest text-(--color-accent)">
        {label}
      </h3>
      <p className="measure mt-2 text-lg leading-relaxed text-(--color-ink)">{value}</p>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-(--color-accent) p-6 text-(--color-paper)">
      <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-(--color-paper) opacity-70">
        {label}
      </p>
      <p className="font-serif-display mt-2 text-xl leading-snug sm:text-2xl">{value}</p>
    </div>
  );
}

function Gallery({ label }: { label: string }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-(--color-line) bg-(--color-paper-dim) px-3 text-center text-xs text-(--color-ink-soft)"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MissionDetail({
  caseStudy,
  format,
  onOpenResearch,
  researchCta,
}: {
  caseStudy: CaseStudy;
  format: FormatDict;
  onOpenResearch?: () => void;
  researchCta?: string;
}) {
  if (caseStudy.id === "connectivite-maritime") {
    return (
      <div className="space-y-10">
        <p className="measure text-lg leading-relaxed text-(--color-ink-soft)">{caseStudy.title}</p>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-serif-display text-xl">{caseStudy.recherche.title}</h3>
            <p className="measure mt-3 text-[0.95rem] leading-relaxed">{caseStudy.recherche.text}</p>
            {onOpenResearch && (
              <button
                type="button"
                onClick={onOpenResearch}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-(--color-accent) px-4 py-2 text-xs font-semibold text-(--color-paper) transition-transform hover:-translate-y-0.5"
              >
                {researchCta ?? caseStudy.recherche.cta}
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
          <div>
            <h3 className="font-serif-display text-xl">{caseStudy.terrain.title}</h3>
            <p className="measure mt-3 text-[0.95rem] leading-relaxed">{caseStudy.terrain.text}</p>
            <ul className="mt-4 space-y-3">
              {caseStudy.terrain.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent)" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (caseStudy.id === "entrepreneuriat") {
    return (
      <div className="space-y-8">
        <p className="measure text-lg italic leading-relaxed text-(--color-ink-soft)">
          {caseStudy.note}
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {[caseStudy.ploutos, caseStudy.popnbuy].map((entry) => (
            <div key={entry.title} className="rounded-2xl border border-(--color-line) p-6">
              <h3 className="font-serif-display text-xl">{entry.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-(--color-paper-dim) px-3 py-1 text-xs text-(--color-ink-soft)">
                  {entry.periode}
                </span>
                <span className="rounded-full bg-(--color-paper-dim) px-3 py-1 text-xs text-(--color-ink-soft)">
                  {entry.role}
                </span>
              </div>
              <p className="mt-4 text-[0.95rem] leading-relaxed">{entry.perimetre}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-(--color-ink-soft)">
                {entry.livrables}
              </p>
              <p className="mt-4 border-l-2 border-(--color-accent) pl-4 text-[0.95rem] leading-relaxed">
                {entry.resultat}
              </p>
              {"lessonTitle" in entry && entry.lessonTitle && (
                <div className="mt-5 rounded-xl bg-(--color-paper-dim) p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-(--color-accent)">
                    {entry.lessonTitle}
                  </p>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed">{entry.lesson}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <p className="measure text-lg leading-relaxed text-(--color-ink-soft)">{caseStudy.title}</p>

      <Result label={format.resultat} value={caseStudy.resultat} />

      <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        <MetaBlock label={format.commanditaire} value={caseStudy.commanditaire} />
        {"financement" in caseStudy && caseStudy.financement && (
          <MetaBlock label={format.financement} value={caseStudy.financement} />
        )}
        <MetaBlock label={format.periode} value={caseStudy.periode} />
        <MetaBlock label={format.role} value={caseStudy.role} />
      </dl>

      <div className="space-y-8 border-t border-(--color-line) pt-8">
        <Prose label={format.perimetre} value={caseStudy.perimetre} />
        <Prose label={format.livrables} value={caseStudy.livrables} />
      </div>

      {"mediaPlaceholder" in caseStudy && caseStudy.mediaPlaceholder && (
        <Gallery label={caseStudy.mediaPlaceholder} />
      )}
    </div>
  );
}
