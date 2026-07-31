export type Teinte = "rose" | "blue" | "sage";
export type Format = "featured" | "wide" | "half" | "vertical" | "compact" | "standard";

export type Project = {
  slug: string;
  format: Format;
  teinte: Teinte;
  type: string;
  zones: string[];
  period: "recent" | "old";
  org: string;
  role: string;
  periode: string;
  location: string;
  category: string[];
  summary: string;
  metric: { value: string; label: string };
  highlights?: string[];
  practice?: string;
  tags: string[];
  imageAlt: string;
  externalLink?: string;
  contexte: string;
  monRole: string;
  travail?: string[];
  resultats?: string[];
  issue?: string;
  enseignement?: string;
  ports?: string[];
  steps?: string[];
  evolving?: { label: string; value: string }[];
  thesis?: {
    subtitle: string;
    methodology: string;
    toc: { part: string; chapters: string[] }[];
    summary: string[];
  };
};

export function teinteBg(t: Teinte): string {
  return t === "rose" ? "var(--color-rose)" : "var(--color-blue)";
}
export function teinteInk(t: Teinte): string {
  return t === "rose" ? "var(--color-rose-ink)" : "var(--color-blue-ink)";
}
