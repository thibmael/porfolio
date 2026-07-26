import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { Filigrane } from "@/components/ui/Filigrane";
import { EMAIL, PHONE, LINKEDIN_URL, CV_FR_URL, CV_EN_URL } from "@/lib/contact-info";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).contact.title };
}

function CvLink({ href, label, unavailable }: { href: string; label: string; unavailable: string }) {
  if (!href)
    return (
      <span className="rounded-full border border-dashed border-(--color-line) px-4 py-2 text-sm text-(--color-soft)">
        {label} — {unavailable}
      </span>
    );
  return (
    <a href={href} download className="rounded-full border border-(--color-ink) px-4 py-2 text-sm font-medium transition-colors hover:bg-(--color-ink) hover:text-(--color-paper)">
      {label}
    </a>
  );
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getDictionary(locale).contact;

  const rows: { label: string; value: string; href?: string; placeholder: string }[] = [
    { label: c.emailLabel, value: EMAIL, href: EMAIL ? `mailto:${EMAIL}` : undefined, placeholder: c.emailPlaceholder },
    { label: c.phoneLabel, value: PHONE, href: PHONE ? `tel:${PHONE}` : undefined, placeholder: c.phonePlaceholder },
    { label: c.linkedinLabel, value: LINKEDIN_URL ? "LinkedIn" : "", href: LINKEDIN_URL || undefined, placeholder: c.linkedinPlaceholder },
  ];

  return (
    <div className="relative mx-auto max-w-4xl overflow-hidden px-6 py-16">
      <Filigrane teinte="rose" variant={2} opacity={0.07} className="pointer-events-none absolute -right-10 top-6 h-56 w-56" />
      <h1 className="relative display text-4xl leading-tight sm:text-5xl">{c.title}</h1>
      <p className="measure relative mt-5 text-lg leading-relaxed text-(--color-soft)">{c.intro}</p>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <div>
          <dl className="grid gap-5">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="text-xs font-semibold uppercase tracking-widest text-(--color-soft)">{r.label}</dt>
                <dd className="mt-1 text-sm">
                  {r.href ? (
                    <a href={r.href} className="link-underline" target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {r.value}
                    </a>
                  ) : (
                    <span className="text-(--color-soft)">{r.placeholder}</span>
                  )}
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-(--color-soft)">{c.locationLabel}</dt>
              <dd className="mt-1 text-sm">{c.location}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-(--color-soft)">{c.availabilityLabel}</dt>
              <dd className="mt-1 text-sm">{c.availability}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <CvLink href={CV_FR_URL} label={c.cvFr} unavailable={c.cvUnavailable} />
            <CvLink href={CV_EN_URL} label={c.cvEn} unavailable={c.cvUnavailable} />
          </div>
        </div>

        <div>
          <h2 className="display text-lg">{c.formTitle}</h2>
          <div className="mt-4">
            <ContactForm contact={c} email={EMAIL} />
          </div>
        </div>
      </div>
    </div>
  );
}
