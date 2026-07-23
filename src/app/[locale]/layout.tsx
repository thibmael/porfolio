import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { CustomCursor } from "@/components/layout/CustomCursor";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: {
      default: dict.meta.defaultTitle,
      template: `%s — Thibault Randrasana`,
    },
    description: dict.meta.defaultDescription,
    alternates: {
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thibault M. E. Randrasana",
    jobTitle: dict.home.hero.positioning,
    description: dict.meta.defaultDescription,
    knowsLanguage: ["mg", "fr", "en"],
    alumniOf: [
      "INSEEC, Omnes Education",
      "CREA Genève, Omnes Education",
      "London School of Economics and Political Science",
    ],
  };

  return (
    <html lang={locale} className={`${bricolage.variable} ${instrument.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        <CustomCursor />
        <Header locale={locale as Locale} dict={dict} />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer locale={locale as Locale} dict={dict} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
