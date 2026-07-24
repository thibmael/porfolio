"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Capsule } from "@/lib/capsule-types";
import { CapsuleCard } from "./CapsuleCard";
import { CapsuleModal } from "./CapsuleModal";

export function MissionsExplorer({
  capsules,
  missions,
  closeLabel,
  openLabel,
  initialId,
}: {
  capsules: Capsule[];
  missions: Dictionary["missions"];
  closeLabel: string;
  openLabel: string;
  initialId?: string | null;
}) {
  const [activeNature, setActiveNature] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(initialId ?? null);

  const f = missions.filters;
  const natureEntries = Object.entries(f.natures) as [string, string][];
  const zoneEntries = Object.entries(f.zones) as [string, string][];

  function matches(c: Capsule) {
    const n = !activeNature || c.nature === activeNature;
    const z = !activeZone || c.zones.includes(activeZone);
    return n && z;
  }

  const open = capsules.find((c) => c.id === openId) ?? null;

  return (
    <>
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <FilterGroup
          legend={f.natureLabel}
          all={f.all}
          active={activeNature}
          entries={natureEntries}
          onChange={setActiveNature}
        />
        <FilterGroup
          legend={f.zoneLabel}
          all={f.all}
          active={activeZone}
          entries={zoneEntries}
          onChange={setActiveZone}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {capsules.map((c, i) => (
          <CapsuleCard
            key={c.id}
            capsule={c}
            natureLabel={f.natures[c.nature as keyof typeof f.natures] ?? ""}
            openLabel={openLabel}
            dimmed={!matches(c)}
            onOpen={() => setOpenId(c.id)}
            index={i}
          />
        ))}
      </div>

      <CapsuleModal
        capsule={open}
        format={missions.format}
        closeLabel={closeLabel}
        onClose={() => setOpenId(null)}
      />
    </>
  );
}

function FilterGroup({
  legend,
  all,
  active,
  entries,
  onChange,
}: {
  legend: string;
  all: string;
  active: string | null;
  entries: [string, string][];
  onChange: (v: string | null) => void;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-medium uppercase tracking-widest text-(--color-ink-soft)">
        {legend}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        <Chip active={!active} onClick={() => onChange(null)}>
          {all}
        </Chip>
        {entries.map(([key, label]) => (
          <Chip key={key} active={active === key} onClick={() => onChange(active === key ? null : key)}>
            {label}
          </Chip>
        ))}
      </div>
    </fieldset>
  );
}

function Chip({
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
      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
        active
          ? "border-(--color-ink) bg-(--color-ink) text-(--color-paper)"
          : "border-(--color-line) text-(--color-ink-soft) hover:border-(--color-ink-soft)"
      }`}
    >
      {children}
    </button>
  );
}
