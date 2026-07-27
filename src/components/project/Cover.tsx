import { tone } from "@/lib/cover-tones";

/* The visual surface of a project: a real image if provided, otherwise a
   duotone gradient with the project's monogram. A dark bottom gradient keeps
   overlaid white text legible. Fills its (positioned) parent. */
export function Cover({
  slug,
  src,
  alt,
  overlay = true,
  className = "",
}: {
  slug: string;
  src?: string;
  alt: string;
  overlay?: boolean;
  className?: string;
}) {
  const t = tone(slug);
  return (
    <div
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ backgroundImage: `linear-gradient(150deg, ${t.grad[0]}, ${t.grad[1]})` }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span
          aria-hidden="true"
          className="display pointer-events-none absolute right-3 top-0 font-bold leading-none text-white/15"
          style={{ fontSize: "clamp(44px, 13vw, 150px)" }}
        >
          {t.mono}
        </span>
      )}
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/0" />
      )}
    </div>
  );
}
