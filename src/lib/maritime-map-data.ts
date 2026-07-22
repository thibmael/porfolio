export type PortId =
  | "fos"
  | "le-havre"
  | "montoir"
  | "bordeaux"
  | "brest"
  | "dunkerque"
  | "anvers"
  | "rotterdam"
  | "hambourg"
  | "barcelone"
  | "genes";

export const viewBox = { width: 900, height: 460 };

export const portCoordinates: Record<PortId, { x: number; y: number }> = {
  brest: { x: 90, y: 150 },
  "le-havre": { x: 150, y: 120 },
  dunkerque: { x: 210, y: 95 },
  anvers: { x: 235, y: 105 },
  rotterdam: { x: 255, y: 100 },
  hambourg: { x: 320, y: 90 },
  montoir: { x: 120, y: 190 },
  bordeaux: { x: 110, y: 235 },
  fos: { x: 245, y: 260 },
  barcelone: { x: 210, y: 290 },
  genes: { x: 290, y: 250 },
};

export const destinationZone = { x: 560, y: 260 };

export const madagascar = { x: 790, y: 400 };
export const maurice = { x: 830, y: 415 };
