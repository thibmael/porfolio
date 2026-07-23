"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { THESIS_PDF_URL } from "@/lib/contact-info";

export function RecherchePanel({ recherche }: { recherche: Dictionary["recherche"] }) {
  const r = recherche;
  const [showToc, setShowToc] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div>
      <p className="measure text-base text-(--color-ink)">{r.subtitle}</p>
      <p className="mt-1 text-sm font-medium uppercase tracking-wide text-(--color-ink-soft)">
        {r.type}
      </p>

      <div className="mt-6">
        <h3 className="font-serif-display text-lg">{r.methodologyTitle}</h3>
        <p className="measure mt-2 text-sm">{r.methodology}</p>
      </div>

      <div className="mt-6 divide-y divide-(--color-line) border-y border-(--color-line)">
        <details open={showToc} onToggle={(e) => setShowToc(e.currentTarget.open)} className="py-3">
          <summary className="cursor-pointer list-none font-medium marker:content-none">
            {r.tocTitle}
          </summary>
          <ol className="mt-3 space-y-3 text-sm text-(--color-ink-soft)">
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
        </details>
        <details
          open={showSummary}
          onToggle={(e) => setShowSummary(e.currentTarget.open)}
          className="py-3"
        >
          <summary className="cursor-pointer list-none font-medium marker:content-none">
            {r.summaryTitle}
          </summary>
          <div className="mt-3 space-y-3 text-sm text-(--color-ink-soft)">
            {r.summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      </div>

      <div className="mt-6">
        <h3 className="font-serif-display text-lg">{r.previewTitle}</h3>
        <p className="mt-2 text-sm text-(--color-ink-soft)">{r.previewNote}</p>
        {THESIS_PDF_URL ? (
          <>
            <iframe
              src={THESIS_PDF_URL}
              title={r.previewTitle}
              className="mt-3 h-64 w-full rounded-lg border border-(--color-line)"
            />
            <a
              href={THESIS_PDF_URL}
              download
              className="mt-3 inline-block rounded-full bg-(--color-accent) px-5 py-2.5 text-sm font-medium text-(--color-paper) transition-colors hover:bg-(--color-accent-soft)"
            >
              {r.downloadLabel}
            </a>
          </>
        ) : (
          <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-dashed border-(--color-line) text-center text-sm text-(--color-ink-soft)">
            {r.previewPlaceholder}
          </div>
        )}
      </div>
    </div>
  );
}
