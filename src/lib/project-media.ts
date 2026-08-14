/* Per-project media configuration — language-neutral file paths, kept out of the
   locale JSON so a path is set once. Fill a value to activate the visual; empty
   strings render the tidy placeholder (with the expected filename shown). Alt
   text lives in the locale files (`imageAlt`), so it stays translated.

   To add an image: drop the file in /public/images/<folder>/ and set the
   matching path below. Nothing else to change. Folders by type:
   experiences/ (pro, conseil, recherche, entrepreneuriat), education/
   (formation), engagements/ + editorial/ (engagement). */

export type ProjectMedia = {
  logo?: string;
  cover?: string;
  gallery?: string[];
  document?: string;
};

/* Every project exposes a cover + gallery slot so each record is photo-ready.
   Fill `cover` for the card/banner visual and `gallery` for the detail grid. */
export const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  "msc-eastmed": { cover: "/images/experiences/msc-eastmed.jpg", logo: "", gallery: [] },
  "gefp-agoa": { cover: "/images/experiences/gefp-cover.jpg", logo: "", gallery: [] },
  "galaxam-mid": { cover: "/images/experiences/galaxam-mid-cover.jpg", logo: "", gallery: [] },
  "memoire-master": { cover: "", document: "", gallery: [] },
  wtc: { cover: "/images/experiences/wtc-global-forum.jpg", logo: "", gallery: [] },
  "sig-geneve": { cover: "/images/experiences/sig-geneve.jpg", logo: "", gallery: [] },
  ploutos: { cover: "/images/experiences/ploutos-prototype.jpg", logo: "", gallery: ["/images/experiences/ploutos-1.jpg"] },
  popnbuy: { cover: "", logo: "", gallery: [] },
  "master-supply-chain": { cover: "", logo: "", gallery: [] },
  "bachelor-crea": { cover: "/images/education/crea-geneva.jpg", logo: "", gallery: [] },
  lse: { cover: "", logo: "", gallery: [] },
  harvardx: { cover: "", logo: "", gallery: [] },
  miray: { cover: "", logo: "", gallery: [] },
  basket: { cover: "/images/engagements/basket-madagascar.jpg", logo: "", gallery: ["/images/engagements/basket-1.jpg"] },
  "journal-etudiant": { cover: "", logo: "", gallery: [] },
  inskahier: { cover: "", logo: "", gallery: [] },
};

/* Suggested cover filename shown in the placeholder, per project. */
export const SUGGESTED_COVER: Record<string, string> = {
  "msc-eastmed": "/images/experiences/msc-eastmed.jpg",
  "gefp-agoa": "/images/experiences/gefp-cover.jpg",
  "galaxam-mid": "/images/experiences/galaxam-mid-cover.jpg",
  "memoire-master": "/images/experiences/master-thesis-cover.jpg",
  wtc: "/images/experiences/wtc-global-forum.jpg",
  "sig-geneve": "/images/experiences/sig-geneve.jpg",
  ploutos: "/images/experiences/ploutos-prototype.jpg",
  popnbuy: "/images/experiences/popnbuy-platform.jpg",
  "master-supply-chain": "/images/education/inseec-supply-chain.jpg",
  "bachelor-crea": "/images/education/crea-geneva.jpg",
  lse: "/images/education/lse.jpg",
  harvardx: "/images/education/harvardx.jpg",
  miray: "/images/engagements/miray.jpg",
  basket: "/images/engagements/basket-madagascar.jpg",
  "journal-etudiant": "/images/editorial/journal-etudiant.jpg",
  inskahier: "/images/editorial/inskahier.jpg",
};

/* Suggested gallery filenames (per slot) shown in the placeholders. */
const gal = (folder: string, base: string, n = 3) =>
  Array.from({ length: n }, (_, i) => `/images/${folder}/${base}-${i + 1}.jpg`);

export const SUGGESTED_GALLERY: Record<string, string[]> = {
  "msc-eastmed": [
    "/images/experiences/msc-service-eastmed.jpg",
    "/images/experiences/msc-service-levant.jpg",
    "/images/experiences/msc-operations.jpg",
  ],
  "gefp-agoa": gal("experiences", "gefp"),
  "galaxam-mid": gal("experiences", "galaxam-mid"),
  "memoire-master": gal("experiences", "master-thesis"),
  wtc: gal("experiences", "wtc"),
  "sig-geneve": gal("experiences", "sig-geneve"),
  ploutos: gal("experiences", "ploutos"),
  popnbuy: gal("experiences", "popnbuy"),
  "master-supply-chain": gal("education", "inseec"),
  "bachelor-crea": gal("education", "crea"),
  lse: gal("education", "lse"),
  harvardx: gal("education", "harvardx"),
  miray: gal("engagements", "miray"),
  basket: gal("engagements", "basket"),
  "journal-etudiant": gal("editorial", "journal-etudiant"),
  inskahier: gal("editorial", "inskahier"),
};
