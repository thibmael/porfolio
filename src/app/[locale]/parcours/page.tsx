import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { ProjectExplorer } from "@/components/project/ProjectExplorer";
import type { Project } from "@/lib/project-types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).parcours.title };
}

export default async function ParcoursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const projects = dict.projects as unknown as Project[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="display text-4xl sm:text-5xl">{dict.parcours.title}</h1>
      <p className="measure mt-4 text-(--color-soft)">{dict.parcours.intro}</p>

      <div className="mt-8">
        <ProjectExplorer projects={projects} parcours={dict.parcours} locale={locale as Locale} />
      </div>
    </div>
  );
}
