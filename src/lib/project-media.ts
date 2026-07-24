/* Per-project media configuration — language-neutral file paths, kept out of the
   locale JSON so a path is set once. Fill a value to activate the visual; empty
   strings render the tidy placeholder (with the expected filename shown). Alt
   text lives in the locale files (`imageAlt`), so it stays translated.

   To add an image: drop the file in /public/images/experiences/ (or the right
   folder) and set the matching path below. Nothing else to change. */

export type ProjectMedia = {
  logo?: string;
  cover?: string;
  gallery?: string[];
  document?: string;
};

export const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  "msc-eastmed": { cover: "", logo: "", gallery: [] },
  "gefp-agoa": { cover: "", logo: "", gallery: [] },
  "memoire-master": { cover: "", document: "", gallery: [] },
  wtc: { cover: "", logo: "", gallery: [] },
  ploutos: { cover: "", logo: "", gallery: [] },
  popnbuy: { cover: "", logo: "", gallery: [] },
  "master-supply-chain": { logo: "" },
  "bachelor-crea": { logo: "" },
  lse: { logo: "" },
  harvardx: { logo: "" },
  miray: { logo: "" },
  basket: { cover: "" },
  "journal-etudiant": { logo: "" },
  inskahier: { logo: "" },
};

/* Suggested cover filenames shown in the placeholder for the main projects. */
export const SUGGESTED_COVER: Record<string, string> = {
  "msc-eastmed": "/images/experiences/msc-eastmed.jpg",
  "gefp-agoa": "/images/experiences/gefp-cover.jpg",
  "memoire-master": "/images/experiences/master-thesis-cover.jpg",
  wtc: "/images/experiences/wtc-global-forum.jpg",
  ploutos: "/images/experiences/ploutos-prototype.jpg",
  popnbuy: "/images/experiences/popnbuy-platform.jpg",
};
