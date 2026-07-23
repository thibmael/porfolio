"use client";

import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/missions-types";

type FormatDict = Dictionary["missions"]["format"];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex h-24 items-center justify-center rounded-lg border border-dashed border-(--color-line) px-3 text-center text-xs text-(--color-ink-soft)"
        >
          {label}
        </div>
      ))}
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
      <div>
        <p className="measure text-sm text-(--color-ink-soft)">{caseStudy.title}</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-serif-display text-lg">{caseStudy.recherche.title}</h3>
            <p className="mt-2 text-sm">{caseStudy.recherche.text}</p>
            {onOpenResearch && (
              <button
                type="button"
                onClick={onOpenResearch}
                className="link-underline mt-3 text-sm font-medium text-(--color-accent)"
              >
                {researchCta ?? caseStudy.recherche.cta} →
              </button>
            )}
          </div>
          <div>
            <h3 className="font-serif-display text-lg">{caseStudy.terrain.title}</h3>
            <p className="mt-2 text-sm">{caseStudy.terrain.text}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {caseStudy.terrain.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden="true">—</span>
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
      <div>
        <p className="measure text-sm italic text-(--color-ink-soft)">{caseStudy.note}</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {[caseStudy.ploutos, caseStudy.popnbuy].map((entry) => (
            <div key={entry.title}>
              <h3 className="font-serif-display text-lg">{entry.title}</h3>
              <dl className="mt-4 space-y-3">
                <Field label={format.commanditaire} value={entry.commanditaire} />
                <Field label={format.periode} value={entry.periode} />
                <Field label={format.role} value={entry.role} />
                <Field label={format.perimetre} value={entry.perimetre} />
                <Field label={format.livrables} value={entry.livrables} />
                <Field label={format.resultat} value={entry.resultat} />
              </dl>
              {"lessonTitle" in entry && entry.lessonTitle && (
                <div className="mt-4 border-l-2 border-(--color-accent) pl-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
                    {entry.lessonTitle}
                  </p>
                  <p className="mt-1 text-sm">{entry.lesson}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="measure text-sm text-(--color-ink-soft)">{caseStudy.title}</p>
      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label={format.commanditaire} value={caseStudy.commanditaire} />
        {"financement" in caseStudy && caseStudy.financement && (
          <Field label={format.financement} value={caseStudy.financement} />
        )}
        <Field label={format.periode} value={caseStudy.periode} />
        <Field label={format.role} value={caseStudy.role} />
        <Field label={format.perimetre} value={caseStudy.perimetre} />
        <Field label={format.livrables} value={caseStudy.livrables} />
        <Field label={format.resultat} value={caseStudy.resultat} />
      </dl>
      {"mediaPlaceholder" in caseStudy && caseStudy.mediaPlaceholder && (
        <MediaPlaceholder label={caseStudy.mediaPlaceholder} />
      )}
    </div>
  );
}
