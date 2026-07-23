"use client";

import type { Dictionary } from "@/lib/dictionaries";
import { ContactForm } from "@/components/contact/ContactForm";
import { CV_EN_URL, CV_FR_URL, EMAIL, LINKEDIN_URL, PHONE } from "@/lib/contact-info";

function CvLink({ href, label, unavailable }: { href: string; label: string; unavailable: string }) {
  if (!href) {
    return (
      <span className="rounded-full border border-dashed border-(--color-line) px-4 py-2 text-sm text-(--color-ink-soft)">
        {label} — {unavailable}
      </span>
    );
  }
  return (
    <a
      href={href}
      download
      className="rounded-full border border-(--color-accent) px-4 py-2 text-sm font-medium text-(--color-accent) transition-colors hover:bg-(--color-accent) hover:text-(--color-paper)"
    >
      {label}
    </a>
  );
}

export function ContactPanel({ contact }: { contact: Dictionary["contact"] }) {
  const c = contact;
  return (
    <div>
      <p className="measure text-sm text-(--color-ink-soft)">{c.intro}</p>

      <dl className="mt-6 grid gap-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
            {c.emailLabel}
          </dt>
          <dd className="mt-1 text-sm">
            {EMAIL ? (
              <a href={`mailto:${EMAIL}`} className="link-underline">
                {EMAIL}
              </a>
            ) : (
              <span className="text-(--color-ink-soft)">{c.emailPlaceholder}</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
            {c.phoneLabel}
          </dt>
          <dd className="mt-1 text-sm">
            {PHONE ? (
              <a href={`tel:${PHONE}`} className="link-underline">
                {PHONE}
              </a>
            ) : (
              <span className="text-(--color-ink-soft)">{c.phonePlaceholder}</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
            {c.linkedinLabel}
          </dt>
          <dd className="mt-1 text-sm">
            {LINKEDIN_URL ? (
              <a href={LINKEDIN_URL} className="link-underline" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : (
              <span className="text-(--color-ink-soft)">{c.linkedinPlaceholder}</span>
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-(--color-line) pt-5">
        <h3 className="font-serif-display text-lg">{c.cvTitle}</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          <CvLink href={CV_FR_URL} label={c.cvFrLabel} unavailable={c.cvUnavailable} />
          <CvLink href={CV_EN_URL} label={c.cvEnLabel} unavailable={c.cvUnavailable} />
        </div>
      </div>

      <div className="mt-6 border-t border-(--color-line) pt-5">
        <h3 className="font-serif-display text-lg">{c.formTitle}</h3>
        <ContactForm contact={c} email={EMAIL} />
      </div>
    </div>
  );
}
