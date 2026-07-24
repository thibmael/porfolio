import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MissionsExplorer } from "@/components/missions/MissionsExplorer";
import type { Capsule } from "@/lib/capsule-types";

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
  const capsules = dict.missions.capsules as unknown as Capsule[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle as="h1" className="font-serif-display text-4xl sm:text-5xl">
        {dict.missions.title}
      </SectionTitle>
      <p className="measure mt-4 text-(--color-ink-soft)">{dict.missions.intro}</p>

      <div className="mt-10">
        <MissionsExplorer
          capsules={capsules}
          missions={dict.missions}
          closeLabel={dict.common.close}
          openLabel={dict.common.openFiche}
        />
      </div>
    </div>
  );
}
