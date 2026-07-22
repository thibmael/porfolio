import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/missions-types";
import { SectionTitle } from "@/components/ui/SectionTitle";

type FormatDict = Dictionary["missions"]["format"];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
        {label}
      </dt>
      <dd className="mt-1 text-sm sm:text-base">{value}</dd>
    </div>
  );
}

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex h-32 items-center justify-center rounded border border-dashed border-(--color-line) px-3 text-center text-xs text-(--color-ink-soft)"
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export function CaseStudySection({
  caseStudy,
  format,
}: {
  caseStudy: CaseStudy;
  format: FormatDict;
}) {
  return (
    <article id={caseStudy.id} className="scroll-mt-24 border-t border-(--color-line) py-14">
      <SectionTitle as="h3" className="font-serif-display text-2xl sm:text-3xl">
        {caseStudy.shortTitle}
      </SectionTitle>
      <p className="measure mt-3 text-sm text-(--color-ink-soft) sm:text-base">
        {caseStudy.title}
      </p>

      {caseStudy.id === "connectivite-maritime" ? (
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          <div>
            <h4 className="font-serif-display text-lg">{caseStudy.recherche.title}</h4>
            <p className="measure mt-2 text-sm">{caseStudy.recherche.text}</p>
            <Link href={caseStudy.recherche.href} className="link-underline mt-3 inline-block text-sm font-medium">
              {caseStudy.recherche.cta} →
            </Link>
          </div>
          <div>
            <h4 className="font-serif-display text-lg">{caseStudy.terrain.title}</h4>
            <p className="measure mt-2 text-sm">{caseStudy.terrain.text}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {caseStudy.terrain.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span aria-hidden="true">—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {caseStudy.id === "entrepreneuriat" ? (
        <div className="mt-4">
          <p className="measure text-sm italic text-(--color-ink-soft)">{caseStudy.note}</p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {[caseStudy.ploutos, caseStudy.popnbuy].map((entry) => (
              <div key={entry.title}>
                <h4 className="font-serif-display text-lg">{entry.title}</h4>
                <dl className="mt-4 space-y-3">
                  <Field label={format.commanditaire} value={entry.commanditaire} />
                  <Field label={format.periode} value={entry.periode} />
                  <Field label={format.role} value={entry.role} />
                  <Field label={format.perimetre} value={entry.perimetre} />
                  <Field label={format.livrables} value={entry.livrables} />
                  <Field label={format.resultat} value={entry.resultat} />
                </dl>
                {"lessonTitle" in entry && (
                  <div className="mt-4 border-l-2 border-(--color-accent) pl-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
                      {entry.lessonTitle}
                    </p>
                    <p className="measure mt-1 text-sm">{entry.lesson}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <Field label={format.commanditaire} value={caseStudy.commanditaire} />
          {"financement" in caseStudy && caseStudy.financement && (
            <Field label={format.financement} value={caseStudy.financement} />
          )}
          <Field label={format.periode} value={caseStudy.periode} />
          <Field label={format.role} value={caseStudy.role} />
          <Field label={format.perimetre} value={caseStudy.perimetre} />
          <Field label={format.livrables} value={caseStudy.livrables} />
          <Field label={format.resultat} value={caseStudy.resultat} />
        </dl>
      )}

      {"mediaPlaceholder" in caseStudy && caseStudy.mediaPlaceholder && (
        <MediaPlaceholder label={caseStudy.mediaPlaceholder} />
      )}
    </article>
  );
}
