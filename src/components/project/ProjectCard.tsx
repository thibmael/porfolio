import Link from "next/link";
import type { Project, Format } from "@/lib/project-types";
import { PROJECT_MEDIA } from "@/lib/project-media";
import { Cover } from "./Cover";

const ASPECT: Record<Format, string> = {
  featured: "16 / 9",
  wide: "16 / 8",
  vertical: "3 / 4",
  standard: "4 / 3",
  compact: "5 / 4",
};

export function ProjectCard({
  project,
  href,
  cta,
  dimmed = false,
}: {
  project: Project;
  href: string;
  cta: string;
  dimmed?: boolean;
}) {
  const media = PROJECT_MEDIA[project.slug] ?? {};
  const cover = media.cover || media.logo || "";
  const big = project.format === "featured" || project.format === "wide";

  return (
    <Link
      href={href}
      aria-label={`${project.org} — ${project.role}`}
      className="group relative block overflow-hidden rounded-2xl shadow-[0_18px_40px_-26px_rgba(15,23,20,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,20,0.65)]"
      style={{ aspectRatio: ASPECT[project.format], opacity: dimmed ? 0.4 : 1 }}
    >
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.05]">
        <Cover slug={project.slug} src={cover || undefined} alt={project.imageAlt} />
      </div>

      {/* metric chip */}
      <span className="absolute left-4 top-4 z-10 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {project.metric.value}
      </span>

      {/* bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white sm:p-5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-white/80">
          {project.category[0]}
          <span className="text-white/50"> · {project.periode}</span>
        </p>
        <h3 className={`display mt-1 font-bold leading-tight ${big ? "text-2xl" : "text-lg"}`}>
          {project.org}
        </h3>
        {big && <p className="mt-1 text-sm text-white/85">{project.summary}</p>}
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {cta}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
