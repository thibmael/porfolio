/* Duotone cover tone + monogram per project, used when no real image is set.
   Dark gradients so overlaid white text stays legible. Once a real cover image
   is added in project-media.ts it replaces the gradient. */
export type Tone = { grad: [string, string]; mono: string };

const FALLBACK: Tone = { grad: ["#233a34", "#3a5a50"], mono: "•" };

export const COVER_TONES: Record<string, Tone> = {
  "msc-eastmed": { grad: ["#20344a", "#3a5573"], mono: "MSC" },
  "gefp-agoa": { grad: ["#54443a", "#87694d"], mono: "GE" },
  "memoire-master": { grad: ["#0e3b33", "#1f6a5b"], mono: "MR" },
  wtc: { grad: ["#382e46", "#5f4f74"], mono: "WT" },
  ploutos: { grad: ["#1b3a3a", "#2f5e56"], mono: "PL" },
  popnbuy: { grad: ["#282d49", "#46507a"], mono: "PB" },
  "master-supply-chain": { grad: ["#2b4038", "#436054"], mono: "IN" },
  "bachelor-crea": { grad: ["#33463b", "#4d6a58"], mono: "CR" },
  lse: { grad: ["#294049", "#3f636f"], mono: "LSE" },
  harvardx: { grad: ["#3a3330", "#5c504a"], mono: "HX" },
  miray: { grad: ["#4a3a3a", "#6f5252"], mono: "MI" },
  basket: { grad: ["#293a4a", "#41607a"], mono: "BB" },
  "journal-etudiant": { grad: ["#463138", "#6e4b57"], mono: "JE" },
  inskahier: { grad: ["#2a3448", "#465073"], mono: "IK" },
};

export function tone(slug: string): Tone {
  return COVER_TONES[slug] ?? FALLBACK;
}
