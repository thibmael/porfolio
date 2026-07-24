"use client";

import type { Dictionary } from "@/lib/dictionaries";
import type { Capsule } from "@/lib/capsule-types";
import { teinteInk, teinteVar } from "@/lib/capsule-types";
import { Modal } from "@/components/ui/Modal";
import { CapsuleDiagram } from "@/components/diagrams/CapsuleDiagram";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Accordion } from "@/components/ui/Accordion";
import { THESIS_PDF_URL } from "@/lib/contact-info";

type FormatDict = Dictionary["missions"]["format"];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.68rem] font-semibold uppercase tracking-widest text-(--color-ink-soft)">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}

export function CapsuleModal({
  capsule,
  format,
  closeLabel,
  onClose,
}: {
  capsule: Capsule | null;
  format: FormatDict;
  closeLabel: string;
  onClose: () => void;
}) {
  const open = capsule !== null;
  const r = capsule?.research;

  return (
    <Modal open={open} onClose={onClose} closeLabel={closeLabel} labelledBy="capsule-title">
      {capsule && (
        <div>
          <span className="block h-1.5 w-full" style={{ backgroundColor: teinteVar(capsule.teinte) }} />
          <div className="px-6 pt-6 sm:px-9">
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: teinteInk(capsule.teinte) }}>
              {capsule.role} · {capsule.org}
            </p>
            <h2 id="capsule-title" className="font-serif-display mt-2 pr-10 text-2xl leading-tight sm:text-3xl">
              {capsule.shortTitle}
            </h2>
          </div>

          <div className="grid gap-8 px-6 py-7 sm:grid-cols-[1.1fr_1fr] sm:px-9">
            {/* left: labelled facts */}
            <dl className="space-y-5">
              <Field label={format.commanditaire} value={capsule.commanditaire} />
              {capsule.financement && <Field label={format.financement} value={capsule.financement} />}
              <Field label={format.periode} value={capsule.periode} />
              <Field label={format.role} value={capsule.role} />
              <Field label={format.perimetre} value={capsule.perimetre} />
              <Field label={format.livrables} value={capsule.livrables} />
              <Field label={format.resultat} value={capsule.resultat} />
            </dl>

            {/* right: enlarged diagram + lesson + media */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-(--color-line) bg-(--color-paper-dim) p-4">
                <div className="h-40 w-full">
                  <CapsuleDiagram capsule={capsule} size="full" />
                </div>
              </div>

              {capsule.enseignement && (
                <div className="rounded-2xl p-5" style={{ backgroundColor: teinteVar(capsule.teinte) }}>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-(--color-ink)">
                    {format.enseignement}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-(--color-ink)">{capsule.enseignement}</p>
                </div>
              )}

              {capsule.media && (
                <ImagePlaceholder
                  alt={capsule.media.alt}
                  label={capsule.media.label}
                  ratio={capsule.media.ratio}
                />
              )}
            </div>
          </div>

          {/* research extras */}
          {r && (
            <div className="border-t border-(--color-line) px-6 py-7 sm:px-9">
              <h3 className="font-serif-display text-lg">{r.methodologyTitle}</h3>
              <p className="measure mt-2 text-sm leading-relaxed text-(--color-ink-soft)">{r.methodology}</p>

              <div className="mt-5 border-y border-(--color-line)">
                <Accordion summary={r.tocTitle} defaultOpen>
                  <ol className="space-y-3">
                    {r.toc.map((part) => (
                      <li key={part.part}>
                        <p className="font-medium text-(--color-ink)">{part.part}</p>
                        {part.chapters.length > 0 && (
                          <ul className="mt-1 space-y-1 pl-4">
                            {part.chapters.map((c) => (
                              <li key={c} className="flex gap-2">
                                <span aria-hidden="true">—</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                </Accordion>
                <Accordion summary={r.summaryTitle}>
                  <div className="space-y-3">
                    {r.summary.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </Accordion>
              </div>

              <div className="mt-6">
                <h4 className="font-serif-display text-base">{r.previewTitle}</h4>
                <p className="mt-1 text-sm text-(--color-ink-soft)">{r.previewNote}</p>
                {THESIS_PDF_URL ? (
                  <a
                    href={THESIS_PDF_URL}
                    download
                    className="mt-3 inline-block rounded-full bg-(--color-ink) px-5 py-2.5 text-sm font-medium text-(--color-paper) transition-opacity hover:opacity-90"
                  >
                    {r.downloadLabel}
                  </a>
                ) : (
                  <div className="mt-3 flex h-32 items-center justify-center rounded-2xl border border-dashed border-(--color-line) bg-(--color-paper-dim) text-center text-sm text-(--color-ink-soft)">
                    {r.previewPlaceholder}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
