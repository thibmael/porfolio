export type Teinte = "rose" | "blue" | "mix";
export type DiagramType = "process" | "venn" | "network" | "radial" | "arc" | "progress";

export type CapsuleMedia = { alt: string; label: string; ratio: string };

export type ResearchContent = {
  subtitle: string;
  methodologyTitle: string;
  methodology: string;
  tocTitle: string;
  toc: { part: string; chapters: string[] }[];
  summaryTitle: string;
  summary: string[];
  previewTitle: string;
  previewPlaceholder: string;
  previewNote: string;
  downloadLabel: string;
  downloadUnavailable: string;
};

export type DiagramData = {
  steps?: string[];
  circles?: string[];
  origins?: string[];
  hub?: string;
  hubNote?: string;
  destination?: string;
  center?: string;
  groups?: string[];
  value?: number;
  unit?: string;
  status?: string;
};

export type Capsule = {
  id: string;
  teinte: Teinte;
  nature: string;
  zones: string[];
  diagramType: DiagramType;
  org: string;
  role: string;
  periode: string;
  keyFigure: { value: number; prefix?: string; suffix?: string; label: string };
  shortTitle: string;
  summary: string;
  commanditaire: string;
  financement?: string;
  perimetre: string;
  livrables: string;
  resultat: string;
  enseignement?: string;
  diagram: DiagramData;
  media?: CapsuleMedia;
  research?: ResearchContent;
};

export function teinteVar(teinte: Teinte): string {
  return teinte === "rose" ? "var(--color-rose)" : "var(--color-blue)";
}
export function teinteInk(teinte: Teinte): string {
  return teinte === "rose" ? "var(--color-rose-ink)" : "var(--color-blue-ink)";
}
