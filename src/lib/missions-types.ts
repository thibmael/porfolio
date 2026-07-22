export type FormatFields = {
  commanditaire: string;
  financement?: string;
  periode: string;
  role: string;
  perimetre: string;
  livrables: string;
  resultat: string;
};

export type StandardCaseStudy = FormatFields & {
  id: "zlecaf" | "wtc";
  featured: boolean;
  shortTitle: string;
  title: string;
  nature: string;
  zones: string[];
  periodeStart: number;
  periodeEnd: number | null;
  mediaPlaceholder?: string;
};

export type ConnectivityCaseStudy = FormatFields & {
  id: "connectivite-maritime";
  featured: boolean;
  shortTitle: string;
  title: string;
  nature: string;
  zones: string[];
  periodeStart: number;
  periodeEnd: number | null;
  recherche: { title: string; text: string; cta: string; href: string };
  terrain: { title: string; text: string; bullets: string[] };
};

export type EntrepreneurEntry = FormatFields & {
  title: string;
  periodeStart: number;
  periodeEnd: number | null;
  zones: string[];
  lessonTitle?: string;
  lesson?: string;
};

export type EntrepreneurshipCaseStudy = {
  id: "entrepreneuriat";
  featured: boolean;
  shortTitle: string;
  title: string;
  nature: string;
  zones: string[];
  note: string;
  ploutos: EntrepreneurEntry;
  popnbuy: EntrepreneurEntry;
};

export type CaseStudy = StandardCaseStudy | ConnectivityCaseStudy | EntrepreneurshipCaseStudy;
