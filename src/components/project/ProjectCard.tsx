"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/project-types";
import { teinteBg, teinteInk } from "@/lib/project-types";
import { PROJECT_MEDIA, SUGGESTED_COVER } from "@/lib/project-media";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Filigrane } from "@/components/ui/Filigrane";

export function ProjectCard({
  project,
  href,
  cta,
  fileLabel,
  dimmed = false,
  index = 0,
}: {
  project: Project;
  href: string;
  cta: string;
  fileLabel: string;
  dimmed?: boolean;
  index?: number;
}) {
  const rm = useReducedMotion();
  const media = PROJECT_MEDIA[project.slug] ?? {};
  const cover = media.cover || media.logo || "";
  const filename = SUGGESTED_COVER[project.slug] ?? media.logo ?? undefined;
  const isWide = project.format === "wide";
  const isCompact = project.format === "compact";
  const isFeatured = project.format === "featured";

  const mediaRatio = isFeatured ? "16 / 9" : isWide ? "1 / 1" : "16 / 10";

  const MediaBlock = (
    <div className="relative overflow-hidden">
      <motion.div whileHover={rm ? undefined : { scale: 1.04 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="h-full">
        <MediaPlaceholder
          src={cover || undefined}
          alt={project.imageAlt}
          ratio={mediaRatio}
          filename={cover ? undefined : filename}
          fileLabel={fileLabel}
          rounded="rounded-none"
          className="h-full"
        />
      </motion.div>
    </div>
  );

  const filVariant = project.slug.charCodeAt(0) % 3;
  const Body = (
    <div className={`relative flex flex-1 flex-col ${isCompact ? "gap-2 p-5" : "gap-3 p-6"}`}>
      <Filigrane teinte={project.teinte} variant={filVariant} />
      <div className="relative flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-(--color-ink)"
          style={{ backgroundColor: teinteBg(project.teinte) }}
        >
          {project.category[0]}
        </span>
        <span className="text-xs text-(--color-soft)">{project.periode}</span>
      </div>

      <div>
        <h3 className={`display leading-tight ${isFeatured ? "text-2xl" : "text-lg"}`}>{project.org}</h3>
        <p className="mt-0.5 text-sm text-(--color-soft)">{project.role}</p>
      </div>

      {!isCompact && <p className="text-sm leading-relaxed text-(--color-ink)">{project.summary}</p>}

      <div className={`mt-auto ${isCompact ? "" : "pt-1"}`}>
        <div className="flex items-baseline gap-2">
          <span className="display text-xl" style={{ color: teinteInk(project.teinte) }}>
            {project.metric.value}
          </span>
          <span className="text-xs text-(--color-soft)">{project.metric.label}</span>
        </div>
        {!isCompact && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full border border-(--color-line) px-2 py-0.5 text-[0.68rem] text-(--color-soft)">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: teinteInk(project.teinte) }}>
        {cta}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </div>
  );

  return (
    <motion.div
      initial={rm ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
      animate={{ opacity: dimmed ? 0.4 : 1 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: rm ? 0 : 0.45, delay: rm ? 0 : Math.min(index * 0.04, 0.3), ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={href}
        className={`group flex h-full overflow-hidden rounded-2xl border border-(--color-line) bg-(--color-card) transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-25px_rgba(27,26,23,0.5)] ${
          isWide ? "flex-row" : "flex-col"
        }`}
        style={{ ["--tw-border-opacity" as string]: "1" }}
      >
        {!isCompact && (
          <div className={isWide ? "w-2/5 shrink-0" : "w-full"}>{MediaBlock}</div>
        )}
        {isCompact && (
          <div className="shrink-0 p-5 pb-0">
            <div className="h-14 w-14 overflow-hidden rounded-xl">
              <MediaPlaceholder src={cover || undefined} alt={project.imageAlt} ratio="1 / 1" rounded="rounded-xl" />
            </div>
          </div>
        )}
        {Body}
      </Link>
    </motion.div>
  );
}
