"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import type { Project, Format } from "@/lib/project-types";
import { localizedHref } from "@/lib/routing";
import { ProjectCard } from "./ProjectCard";

const SPAN: Record<Format, string> = {
  featured: "sm:col-span-6 lg:col-span-8",
  wide: "sm:col-span-6 lg:col-span-8",
  vertical: "sm:col-span-3 lg:col-span-4",
  standard: "sm:col-span-3 lg:col-span-4",
  compact: "",
};

export function ProjectExplorer({
  projects,
  parcours,
  locale,
  fileLabel,
}: {
  projects: Project[];
  parcours: Dictionary["parcours"];
  locale: Locale;
  fileLabel: string;
}) {
  const f = parcours.filters;
  const [type, setType] = useState<string | null>(null);
  const [zone, setZone] = useState<string | null>(null);
  const [period, setPeriod] = useState<string | null>(null);

  // hydrate filters from URL (so the FR/EN switch, which keeps the query, restores them)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setType(p.get("type"));
    setZone(p.get("zone"));
    setPeriod(p.get("period"));
  }, []);

  useEffect(() => {
    const p = new URLSearchParams();
    if (type) p.set("type", type);
    if (zone) p.set("zone", zone);
    if (period) p.set("period", period);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [type, zone, period]);

  const matches = (pr: Project) =>
    (!type || pr.type === type) && (!zone || pr.zones.includes(zone)) && (!period || pr.period === period);

  const mains = projects.filter((p) => p.format !== "compact");
  const others = projects.filter((p) => p.format === "compact");

  return (
    <>
      <div className="flex flex-col gap-4 border-y border-(--color-line) py-6">
        <FilterRow label={f.typeLabel} all={f.all} active={type} entries={Object.entries(f.types)} onChange={setType} />
        <FilterRow label={f.zoneLabel} all={f.all} active={zone} entries={Object.entries(f.zones)} onChange={setZone} />
        <FilterRow label={f.periodLabel} all={f.all} active={period} entries={Object.entries(f.periods)} onChange={setPeriod} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 [grid-auto-flow:dense] sm:grid-cols-6 lg:grid-cols-12">
        {mains.map((p, i) => (
          <div key={p.slug} className={SPAN[p.format]}>
            <ProjectCard
              project={p}
              href={localizedHref(locale, `/parcours/${p.slug}`)}
              cta={parcours.cardCta}
              fileLabel={fileLabel}
              dimmed={!matches(p)}
              index={i}
            />
          </div>
        ))}
      </div>

      <h2 className="display mt-16 text-xl">{parcours.othersTitle}</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            href={localizedHref(locale, `/parcours/${p.slug}`)}
            cta={parcours.cardCta}
            fileLabel={parcours.filters.all === "Toutes" ? "Fichier" : "File"}
            dimmed={!matches(p)}
            index={i}
          />
        ))}
      </div>
    </>
  );
}

function FilterRow({
  label,
  all,
  active,
  entries,
  onChange,
}: {
  label: string;
  all: string;
  active: string | null;
  entries: [string, string][];
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-16 shrink-0 text-xs font-semibold uppercase tracking-wide text-(--color-soft)">{label}</span>
      <Chip active={!active} onClick={() => onChange(null)}>{all}</Chip>
      {entries.map(([k, v]) => (
        <Chip key={k} active={active === k} onClick={() => onChange(active === k ? null : k)}>{v}</Chip>
      ))}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active ? "border-(--color-ink) bg-(--color-ink) text-(--color-paper)" : "border-(--color-line) text-(--color-soft) hover:border-(--color-soft)"
      }`}
    >
      {children}
    </button>
  );
}
