/* Institution / organisation logos featured in the home "references" band.
   Language-neutral file paths kept out of the locale JSON. Fill a value to
   show the real logo; empty shows the styled name fallback (the org labels
   live in locales under home.orgs). Drop files in /public/images/logos/. */

export const LOGO_FILES: Record<string, string> = {
  wtca: "",
  lse: "",
  msc: "",
  sig: "",
  eu: "",
};

/* Suggested filenames for each logo slot. */
export const SUGGESTED_LOGO: Record<string, string> = {
  wtca: "/images/logos/wtca.svg",
  lse: "/images/logos/lse.svg",
  msc: "/images/logos/msc.svg",
  sig: "/images/logos/sig.svg",
  eu: "/images/logos/eu.svg",
};
