"use client";

import { motion, useReducedMotion } from "motion/react";
import { Cover, type CoverVariant } from "./covers";

export function ProjectCard({
  onClick,
  eyebrow,
  title,
  hint,
  variant,
  className = "",
  index = 0,
}: {
  onClick: () => void;
  eyebrow: string;
  title: string;
  hint: string;
  variant: CoverVariant;
  className?: string;
  index?: number;
}) {
  const rm = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={rm ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: rm ? 0 : 0.5, delay: rm ? 0 : index * 0.06, ease: "easeOut" }}
      className={`group relative block overflow-hidden rounded-2xl border border-(--color-line) text-left ${className}`}
    >
      <div className="absolute inset-0">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1 }}
          whileHover={rm ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Cover variant={variant} />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
      <div className="relative flex h-full flex-col justify-end p-6">
        <p className="text-[0.7rem] font-medium uppercase tracking-widest text-white/75">
          {eyebrow}
        </p>
        <p className="font-serif-display mt-1 text-xl leading-snug text-white sm:text-2xl">
          {title}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white/90">
          {hint}
          <motion.span aria-hidden="true" initial={{ x: 0 }} whileHover={rm ? undefined : { x: 4 }}>
            →
          </motion.span>
        </span>
      </div>
    </motion.button>
  );
}
