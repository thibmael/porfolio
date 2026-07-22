import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/contact/ContactForm";
import { CV_EN_URL, CV_FR_URL, EMAIL, LINKEDIN_URL, PHONE } from "@/lib/contact-info";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.contact.title };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const c = dict.contact;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionTitle as="h1" className="font-serif-display text-4xl sm:text-5xl">
        {c.title}
      </SectionTitle>
      <p className="measure mt-4 text-(--color-ink-soft)">{c.intro}</p>

      <dl className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-(--color-ink-soft)">
            {c.emailLabel}
          </dt>
          <dd className="mt-1">
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
          <dd className="mt-1">
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
          <dd className="mt-1">
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

      <section className="mt-10 border-t border-(--color-line) pt-8">
        <h2 className="font-serif-display text-xl">{c.cvTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <CvLink href={CV_FR_URL} label={c.cvFrLabel} unavailable={c.cvUnavailable} />
          <CvLink href={CV_EN_URL} label={c.cvEnLabel} unavailable={c.cvUnavailable} />
        </div>
      </section>

      <section className="mt-10 border-t border-(--color-line) pt-8">
        <h2 className="font-serif-display text-xl">{c.formTitle}</h2>
        <ContactForm contact={c} email={EMAIL} />
      </section>
    </div>
  );
}

function CvLink({
  href,
  label,
  unavailable,
}: {
  href: string;
  label: string;
  unavailable: string;
}) {
  if (!href) {
    return (
      <span className="rounded-full border border-dashed border-(--color-line) px-5 py-2 text-sm text-(--color-ink-soft)">
        {label} — {unavailable}
      </span>
    );
  }
  return (
    <a
      href={href}
      download
      className="rounded-full border border-(--color-accent) px-5 py-2 text-sm font-medium text-(--color-accent) transition-colors hover:bg-(--color-accent) hover:text-(--color-paper)"
    >
      {label}
    </a>
  );
}
