/* Abstract data scatter — 1,662 points grouped into 63 clusters — evoking the
   scale of coverage (health centres across districts) without drawing a map.
   Rose + blue pastel only, deterministic so SSR and client match. Rendered as
   the cover visual for the Galaxam / USAID distribution project. */

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CLUSTERS = 63;
const TOTAL = 1662;

const DOTS: { x: number; y: number; c: 0 | 1; o: number; r: number }[] = (() => {
  const rnd = mulberry32(1662);
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  const gauss = () => (rnd() + rnd() + rnd() - 1.5) * 1.4; // ~normal
  const centers = Array.from({ length: CLUSTERS }, () => ({ x: 6 + rnd() * 88, y: 6 + rnd() * 48 }));
  const per = Array.from({ length: CLUSTERS }, () => Math.floor(TOTAL / CLUSTERS));
  for (let i = 0; i < TOTAL - per.reduce((a, b) => a + b, 0); i++) per[i]++;
  const out: { x: number; y: number; c: 0 | 1; o: number; r: number }[] = [];
  centers.forEach((ctr, ci) => {
    const c: 0 | 1 = ci % 2 === 0 ? 0 : 1;
    for (let j = 0; j < per[ci]; j++) {
      out.push({
        x: clamp(ctr.x + gauss() * 2.6, 1.5, 98.5),
        y: clamp(ctr.y + gauss() * 1.9, 1.5, 58.5),
        c,
        o: 0.35 + rnd() * 0.5,
        r: 0.34 + rnd() * 0.18,
      });
    }
  });
  return out;
})();

export function ScatterCloud({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      {DOTS.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c === 0 ? "#e9b7c6" : "#b8cde0"} opacity={p.o} />
      ))}
    </svg>
  );
}
