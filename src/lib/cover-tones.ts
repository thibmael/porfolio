/* Duotone cover tone + monogram per project, used when no real image is set.
   Dusty pastel gradients (rose / mauve / plum / clay / dusty-blue) — mid-depth
   so overlaid white text stays legible. Once a real cover image is added in
   project-media.ts it replaces the gradient. */
export type Tone = { grad: [string, string]; mono: string };

const FALLBACK: Tone = { grad: ["#4a4152", "#665a70"], mono: "•" };

export const COVER_TONES: Record<string, Tone> = {
  "msc-eastmed": { grad: ["#3c5165", "#5b7387"], mono: "MSC" },
  "gefp-agoa": { grad: ["#6a4650", "#8a6270"], mono: "GE" },
  "memoire-master": { grad: ["#4c3a52", "#6e5170"], mono: "MR" },
  wtc: { grad: ["#514455", "#73607a"], mono: "WT" },
  ploutos: { grad: ["#414a63", "#5d6f8c"], mono: "PL" },
  popnbuy: { grad: ["#3f4260", "#5a5e82"], mono: "PB" },
  "master-supply-chain": { grad: ["#3f4a5a", "#5c6a7e"], mono: "IN" },
  "bachelor-crea": { grad: ["#5e4650", "#805f6e"], mono: "CR" },
  lse: { grad: ["#3d4f5e", "#5a7080"], mono: "LSE" },
  harvardx: { grad: ["#5a4149", "#7c5a64"], mono: "HX" },
  miray: { grad: ["#5f4646", "#82605f"], mono: "MI" },
  basket: { grad: ["#3e4f5f", "#5c7183"], mono: "BB" },
  "journal-etudiant": { grad: ["#513744", "#734e5f"], mono: "JE" },
  inskahier: { grad: ["#3b3e5a", "#565a7c"], mono: "IK" },
};

export function tone(slug: string): Tone {
  return COVER_TONES[slug] ?? FALLBACK;
}
