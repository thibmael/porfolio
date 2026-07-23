"use client";

import type { Dictionary } from "@/lib/dictionaries";

export function ExpertisePanel({ expertise }: { expertise: Dictionary["expertise"] }) {
  const e = expertise;
  return (
    <div className="space-y-8">
      <section>
        <h3 className="font-serif-display text-lg">{e.domains.title}</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {e.domains.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-serif-display text-lg">{e.geography.title}</h3>
        <p className="mt-2 text-sm">{e.geography.primary}</p>
        <p className="text-sm text-(--color-ink-soft)">{e.geography.secondary}</p>
      </section>

      <section>
        <h3 className="font-serif-display text-lg">{e.editorial.title}</h3>
        <p className="mt-2 text-sm text-(--color-ink-soft)">{e.editorial.intro}</p>
        <div className="mt-4 space-y-4">
          {e.editorial.items.map((item) => (
            <div key={item.role}>
              <p className="text-sm font-medium">{item.role}</p>
              <p className="mt-1 text-sm text-(--color-ink-soft)">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm italic text-(--color-ink-soft)">{e.editorial.linksPlaceholder}</p>
        <p className="mt-3 rounded-lg border border-dashed border-(--color-line) p-3 text-xs text-(--color-ink-soft)">
          {e.editorial.verificationNote}
        </p>
      </section>

      <div className="grid gap-8 sm:grid-cols-2">
        <section>
          <h3 className="font-serif-display text-lg">{e.languages.title}</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {e.languages.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-serif-display text-lg">{e.tools.title}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {e.tools.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-(--color-line) px-3 py-1 text-xs text-(--color-ink-soft)"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h3 className="font-serif-display text-lg">{e.education.title}</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {e.education.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-serif-display text-lg">{e.engagements.title}</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {e.engagements.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
