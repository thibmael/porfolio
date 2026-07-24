import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import type { Project } from "@/lib/project-types";

export function generateStaticParams() {
  const fr = getDictionary("fr");
  const slugs = (fr.projects as unknown as Project[]).map((p) => p.slug);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const projects = getDictionary(locale).projects as unknown as Project[];
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.org} — ${project.role}`,
    description: project.summary,
    openGraph: { title: project.org, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const projects = dict.projects as unknown as Project[];
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = projects[idx];

  const articleJsonLd = project.thesis
    ? {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: project.thesis.subtitle,
        author: { "@type": "Person", name: "Thibault M. E. Randrasana" },
        description: project.thesis.methodology,
        inLanguage: locale,
      }
    : null;

  return (
    <>
      <ProjectDetail
        project={project}
        detail={dict.detail}
        locale={locale as Locale}
        prev={idx > 0 ? projects[idx - 1] : undefined}
        next={idx < projects.length - 1 ? projects[idx + 1] : undefined}
        fileLabel={dict.common.fileLabel}
      />
      {articleJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      )}
    </>
  );
}
