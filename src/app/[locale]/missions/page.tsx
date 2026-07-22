import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { MissionsTimeline } from "@/components/missions/MissionsTimeline";
import { CaseStudySection } from "@/components/missions/CaseStudySection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { CaseStudy } from "@/lib/missions-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.missions.title };
}

export default async function MissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const caseStudies = dict.missions.caseStudies as unknown as CaseStudy[];

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pb-6 pt-16">
        <SectionTitle as="h1" className="font-serif-display text-4xl sm:text-5xl">
          {dict.missions.title}
        </SectionTitle>
        <p className="measure mt-4 text-(--color-ink-soft)">{dict.missions.intro}</p>
      </div>

      <MissionsTimeline
        caseStudies={caseStudies}
        timeline={dict.missions.timeline}
        format={dict.missions.format}
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        {caseStudies.map((caseStudy) => (
          <CaseStudySection key={caseStudy.id} caseStudy={caseStudy} format={dict.missions.format} />
        ))}
      </div>
    </>
  );
}
