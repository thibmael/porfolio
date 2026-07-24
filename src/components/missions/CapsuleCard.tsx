"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Capsule } from "@/lib/capsule-types";
import { teinteInk, teinteVar } from "@/lib/capsule-types";
import { CapsuleDiagram } from "@/components/diagrams/CapsuleDiagram";

export function CapsuleCard({
  capsule,
  natureLabel,
  openLabel,
  dimmed,
  onOpen,
  index = 0,
}: {
  capsule: Capsule;
  natureLabel: string;
  openLabel: string;
  dimmed: boolean;
  onOpen: () => void;
  index?: number;
}) {
  const rm = useReducedMotion();
  const k = capsule.keyFigure;

  return (
    <motion.button
      type="button"
      id={`capsule-${capsule.id}`}
      onClick={onOpen}
      initial={rm ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: dimmed ? 0.35 : 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      animate={{ opacity: dimmed ? 0.35 : 1 }}
      transition={{ duration: rm ? 0 : 0.45, delay: rm ? 0 : index * 0.05, ease: "easeOut" }}
      whileHover={rm || dimmed ? undefined : { y: -4 }}
      className="group relative flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-(--color-line) bg-(--color-paper) text-left transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(28,27,25,0.45)]"
    >
      {/* teinte top rule — carries meaning (institutional vs operational) */}
      <span className="block h-1 w-full" style={{ backgroundColor: teinteVar(capsule.teinte) }} />

      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* 1. identity header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-(--color-ink)">{capsule.role}</p>
            <p className="text-xs text-(--color-ink-soft)">{capsule.org}</p>
          </div>
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide"
            style={{
              backgroundColor: teinteVar(capsule.teinte),
              color: "var(--color-ink)",
            }}
          >
            {capsule.periode}
          </span>
        </div>

        {/* 2. key figure */}
        <div className="flex items-baseline gap-2">
          <span className="font-serif-display text-4xl leading-none text-(--color-ink)">
            {k.prefix}
            {k.value}
            {k.suffix}
          </span>
          <span className="text-xs" style={{ color: teinteInk(capsule.teinte) }}>
            {k.label}
          </span>
        </div>

        {/* 3. one-line summary */}
        <div>
          <h3 className="font-serif-display text-lg leading-snug">{capsule.shortTitle}</h3>
          <p className="measure mt-1 text-sm text-(--color-ink-soft)">{capsule.summary}</p>
        </div>

        {/* 4. signature diagram */}
        <div className="mt-auto h-24 w-full pt-2">
          <CapsuleDiagram capsule={capsule} size="card" />
        </div>

        <span className="flex items-center gap-1 text-xs font-medium" style={{ color: teinteInk(capsule.teinte) }}>
          <span className="sr-only">{natureLabel} — </span>
          {openLabel}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </motion.button>
  );
}
