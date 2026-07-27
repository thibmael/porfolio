import type { Teinte } from "@/lib/project-types";
import { teinteBg } from "@/lib/project-types";

/* A soft pastel watermark ("filigrane") — purely decorative, low opacity, sits
   behind content and follows a teinte (rose / blue / sage). Position and size
   are controlled by `className` on the wrapper so it can be dropped anywhere. */
export function Filigrane({
  teinte,
  variant = 0,
  opacity = 0.12,
  className = "absolute -right-6 -top-8 h-40 w-40",
}: {
  teinte: Teinte;
  variant?: number;
  opacity?: number;
  className?: string;
}) {
  const c = teinteBg(teinte);
  const v = ((variant % 3) + 3) % 3;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {v === 0 && (
        <g fill="none" stroke={c} strokeWidth="6">
          <circle cx="120" cy="80" r="34" />
          <circle cx="120" cy="80" r="58" />
          <circle cx="120" cy="80" r="82" />
        </g>
      )}
      {v === 1 && (
        <g fill={c}>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle key={`${r}-${col}`} cx={40 + col * 26} cy={20 + r * 26} r="4.5" />
            ))
          )}
        </g>
      )}
      {v === 2 && (
        <g fill="none" stroke={c} strokeWidth="6" strokeLinecap="round">
          <path d="M-10 150 Q 60 90 130 130 T 260 130" />
          <path d="M-10 172 Q 60 112 130 152 T 260 152" />
          <path d="M-10 128 Q 60 68 130 108 T 260 108" />
        </g>
      )}
    </svg>
  );
}

const TEINTES: Teinte[] = ["rose", "blue"];
export const teinteByIndex = (i: number): Teinte => TEINTES[((i % 2) + 2) % 2];
