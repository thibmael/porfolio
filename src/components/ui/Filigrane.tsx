import type { Teinte } from "@/lib/project-types";
import { teinteBg } from "@/lib/project-types";

/* A soft pastel watermark ("filigrane") for the off-white cards. Very low
   opacity, purely decorative, sits behind the content. Colour follows the
   card's teinte (rose / blue / sage). */
export function Filigrane({
  teinte,
  variant = 0,
  className = "",
}: {
  teinte: Teinte;
  variant?: number;
  className?: string;
}) {
  const c = teinteBg(teinte);
  const v = variant % 3;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute -right-6 -top-8 h-40 w-40 ${className}`}
      style={{ opacity: 0.14 }}
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
        <g fill="none" stroke={c} strokeWidth="6">
          <path d="M20 150 Q 80 40 190 70" />
          <path d="M20 175 Q 90 70 200 100" />
          <path d="M40 195 Q 110 100 210 130" />
        </g>
      )}
    </svg>
  );
}
