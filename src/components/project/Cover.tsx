import { tone } from "@/lib/cover-tones";
import { ScatterCloud } from "./ScatterCloud";

/* Projects whose cover is a built-in data diagram rather than a photo slot. */
const DIAGRAM_SLUGS = new Set(["galaxam-mid"]);

function ImageGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M4 17l4.5-4.5L13 17l3-3 4 4" />
    </svg>
  );
}

/* The visual surface of a project: a real image if provided, otherwise a
   duotone gradient with the project's monogram. A dark bottom gradient keeps
   overlaid white text legible. When there is no real image yet, an optional
   `hint` marks the slot as a photo placeholder — pass `true` for a bare camera
   icon (cards) or a filename string to also show the expected path (banners).
   The hint disappears automatically once a real image is set. Fills its
   (positioned) parent. */
export function Cover({
  slug,
  src,
  alt,
  overlay = true,
  className = "",
  hint,
  hintClassName = "left-3 top-3",
}: {
  slug: string;
  src?: string;
  alt: string;
  overlay?: boolean;
  className?: string;
  hint?: true | string;
  hintClassName?: string;
}) {
  const t = tone(slug);
  const diagram = !src && DIAGRAM_SLUGS.has(slug);
  return (
    <div
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ backgroundImage: `linear-gradient(150deg, ${t.grad[0]}, ${t.grad[1]})` }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : diagram ? (
        <ScatterCloud />
      ) : (
        <>
          {/* Fine dot grid — a deliberate designed surface, not an empty fill. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.4px)",
              backgroundSize: "14px 14px",
            }}
          />
          {/* Soft corner glow adds depth to the duotone. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: "radial-gradient(120% 90% at 15% 0%, rgba(255,255,255,0.18), transparent 55%)" }}
          />
          <span
            aria-hidden="true"
            className="display pointer-events-none absolute right-3 top-0 font-bold leading-none text-white/15"
            style={{ fontSize: "clamp(44px, 13vw, 150px)" }}
          >
            {t.mono}
          </span>
        </>
      )}
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
      )}
      {!src && hint && !diagram && (
        <span
          className={`pointer-events-none absolute z-10 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[0.62rem] font-medium text-white/80 backdrop-blur-sm ${hintClassName}`}
        >
          <ImageGlyph />
          {hint !== true && <span className="font-mono">{hint}</span>}
        </span>
      )}
    </div>
  );
}
