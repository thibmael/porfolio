"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/missions-types";

type TimelineDict = Dictionary["missions"]["timeline"];
type FormatDict = Dictionary["missions"]["format"];

type Point = {
  id: string;
  anchor: string;
  label: string;
  nature: string;
  zones: string[];
  start: number;
  end: number | null;
  commanditaire: string;
  periode: string;
  role: string;
  perimetre: string;
  livrables: string;
  resultat: string;
};

function buildPoints(caseStudies: CaseStudy[]): Point[] {
  const points: Point[] = [];

  for (const cs of caseStudies) {
    if (cs.id === "entrepreneuriat") {
      const p = cs.ploutos;
      const b = cs.popnbuy;
      points.push({
        id: "ploutos",
        anchor: cs.id,
        label: p.title,
        nature: cs.nature,
        zones: p.zones,
        start: p.periodeStart,
        end: p.periodeEnd,
        commanditaire: p.commanditaire,
        periode: p.periode,
        role: p.role,
        perimetre: p.perimetre,
        livrables: p.livrables,
        resultat: p.resultat,
      });
      points.push({
        id: "popnbuy",
        anchor: cs.id,
        label: b.title,
        nature: cs.nature,
        zones: b.zones,
        start: b.periodeStart,
        end: b.periodeEnd,
        commanditaire: b.commanditaire,
        periode: b.periode,
        role: b.role,
        perimetre: b.perimetre,
        livrables: b.livrables,
        resultat: b.resultat,
      });
    } else {
      points.push({
        id: cs.id,
        anchor: cs.id,
        label: cs.shortTitle,
        nature: cs.nature,
        zones: cs.zones,
        start: cs.periodeStart,
        end: cs.periodeEnd ?? null,
        commanditaire: cs.commanditaire,
        periode: cs.periode,
        role: cs.role,
        perimetre: cs.perimetre,
        livrables: cs.livrables,
        resultat: cs.resultat,
      });
    }
  }

  return points.sort((a, b) => a.start - b.start);
}

export function MissionsTimeline({
  caseStudies,
  timeline,
  format,
}: {
  caseStudies: CaseStudy[];
  timeline: TimelineDict;
  format: FormatDict;
}) {
  const points = useMemo(() => buildPoints(caseStudies), [caseStudies]);
  const [activeNature, setActiveNature] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [activePointId, setActivePointId] = useState<string | null>(null);

  const minYear = 2019;
  const maxYear = new Date().getFullYear();
  const span = Math.max(maxYear - minYear, 1);

  function matches(point: Point) {
    const natureOk = !activeNature || point.nature === activeNature;
    const zoneOk = !activeZone || point.zones.includes(activeZone);
    return natureOk && zoneOk;
  }

  const activePoint = points.find((p) => p.id === activePointId) ?? null;

  const natureEntries = Object.entries(timeline.natures) as [string, string][];
  const zoneEntries = Object.entries(timeline.zones) as [string, string][];

  return (
    <section aria-labelledby="timeline-title" className="mx-auto max-w-6xl px-6 py-14">
      <h2 id="timeline-title" className="font-serif-display text-2xl sm:text-3xl">
        {timeline.title}
      </h2>
      <p className="measure mt-2 text-sm text-(--color-ink-soft)">{timeline.instructions}</p>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        <fieldset>
          <legend className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
            {timeline.filterNatureLabel}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <FilterButton active={!activeNature} onClick={() => setActiveNature(null)}>
              {timeline.allLabel}
            </FilterButton>
            {natureEntries.map(([key, label]) => (
              <FilterButton
                key={key}
                active={activeNature === key}
                onClick={() => setActiveNature((current) => (current === key ? null : key))}
              >
                {label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
            {timeline.filterZoneLabel}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <FilterButton active={!activeZone} onClick={() => setActiveZone(null)}>
              {timeline.allLabel}
            </FilterButton>
            {zoneEntries.map(([key, label]) => (
              <FilterButton
                key={key}
                active={activeZone === key}
                onClick={() => setActiveZone((current) => (current === key ? null : key))}
              >
                {label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Desktop horizontal timeline */}
      <div className="relative mt-12 hidden h-24 sm:block">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-(--color-line)" />
        {points.map((point) => {
          const leftPct = ((point.start - minYear) / span) * 100;
          const isMatch = matches(point);
          return (
            <button
              key={point.id}
              type="button"
              style={{ left: `${Math.min(Math.max(leftPct, 0), 100)}%` }}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-opacity"
              data-match={isMatch}
              onClick={() => setActivePointId((current) => (current === point.id ? null : point.id))}
              aria-expanded={activePointId === point.id}
              aria-label={point.label}
            >
              <span
                className="h-3 w-3 rounded-full border-2 transition-colors"
                style={{
                  opacity: isMatch ? 1 : 0.25,
                  backgroundColor:
                    activePointId === point.id ? "var(--color-accent)" : "var(--color-paper)",
                  borderColor: "var(--color-accent)",
                }}
              />
              <span
                className="max-w-[9rem] text-center text-xs text-(--color-ink-soft)"
                style={{ opacity: isMatch ? 1 : 0.35 }}
              >
                {point.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile vertical timeline */}
      <ol className="mt-8 space-y-4 border-l border-(--color-line) pl-5 sm:hidden">
        {points.map((point) => {
          const isMatch = matches(point);
          return (
            <li key={point.id} style={{ opacity: isMatch ? 1 : 0.35 }}>
              <button
                type="button"
                className="text-left text-sm font-medium"
                onClick={() => setActivePointId((current) => (current === point.id ? null : point.id))}
                aria-expanded={activePointId === point.id}
              >
                {point.label}
              </button>
            </li>
          );
        })}
      </ol>

      {activePoint && (
        <dl className="mt-8 grid gap-4 border-t border-(--color-line) pt-6 sm:grid-cols-3">
          <Field label={format.commanditaire} value={activePoint.commanditaire} />
          <Field label={format.periode} value={activePoint.periode} />
          <Field label={format.role} value={activePoint.role} />
          <Field label={format.perimetre} value={activePoint.perimetre} className="sm:col-span-3" />
          <Field label={format.livrables} value={activePoint.livrables} className="sm:col-span-3" />
          <Field label={format.resultat} value={activePoint.resultat} className="sm:col-span-3" />
        </dl>
      )}
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-(--color-accent) bg-(--color-accent) text-(--color-paper)"
          : "border-(--color-line) text-(--color-ink-soft)"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}
