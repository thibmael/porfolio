import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { ProofBlocks } from "@/components/home/ProofBlocks";
import { MaritimeMapLoader } from "@/components/map/MaritimeMapLoader";
import { SectionsPreview } from "@/components/home/SectionsPreview";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero hero={dict.home.hero} />
      <ProofBlocks proof={dict.home.proof} />
      <MaritimeMapLoader map={dict.home.map} />
      <SectionsPreview preview={dict.home.sectionsPreview} locale={locale} />
    </>
  );
}
