"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Tile({
  onClick,
  eyebrow,
  title,
  hint,
  motif,
  className = "",
  index = 0,
}: {
  onClick?: () => void;
  eyebrow?: string;
  title: string;
  hint?: string;
  motif?: ReactNode;
  className?: string;
  index?: number;
}) {
  const rm = useReducedMotion();
  const interactive = typeof onClick === "function";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      initial={rm ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rm ? 0 : 0.4, delay: rm ? 0 : index * 0.05, ease: "easeOut" }}
      whileHover={interactive && !rm ? { y: -3 } : undefined}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-(--color-line) bg-(--color-paper) p-5 text-left transition-shadow ${
        interactive ? "cursor-pointer hover:shadow-lg hover:border-(--color-accent-soft)" : ""
      } ${className}`}
    >
      {motif && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70 transition-opacity group-hover:opacity-100">
          {motif}
        </div>
      )}
      <div className="relative">
        {eyebrow && (
          <p className="text-[0.7rem] font-medium uppercase tracking-widest text-(--color-ink-soft)">
            {eyebrow}
          </p>
        )}
        <p className="font-serif-display mt-1 text-lg leading-snug sm:text-xl">{title}</p>
      </div>
      {hint && (
        <span className="relative mt-6 inline-flex items-center gap-1 text-xs font-medium text-(--color-accent)">
          {hint}
          {interactive && (
            <motion.span
              aria-hidden="true"
              initial={{ x: 0 }}
              whileHover={rm ? undefined : { x: 3 }}
            >
              →
            </motion.span>
          )}
        </span>
      )}
    </motion.button>
  );
}
