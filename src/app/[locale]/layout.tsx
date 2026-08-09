import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import "../globals.css";

// Set the saved theme before paint to avoid a flash of the wrong theme.
const themeInit = `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(e){}`;

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const work = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
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

  // Absolute base for OG/Twitter image URLs. Auto-detected on Vercel; set
  // NEXT_PUBLIC_SITE_URL to your domain for a custom deploy.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.defaultTitle,
      template: `%s — Thibault Randrasana`,
    },
    description: dict.meta.defaultDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      url: `/${locale}`,
      siteName: "Thibault M. E. Randrasana",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        { url: "/og.jpg", width: 1200, height: 630, alt: dict.meta.defaultTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      images: ["/og.jpg"],
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
    jobTitle: dict.home.hero.title,
    description: dict.meta.defaultDescription,
    knowsLanguage: ["mg", "fr", "en"],
    alumniOf: [
      "INSEEC, Omnes Education",
      "CREA Genève, Omnes Education",
      "London School of Economics and Political Science",
    ],
  };

  return (
    <html lang={locale} className={`${outfit.variable} ${work.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a href="#main-content" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        <ScrollReveal />
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
