/* A properly-sized image slot with a tidy empty state. When `src` is empty it
   renders a soft dashed frame with a small icon and the placeholder label; when
   a real image URL is provided later it renders that image at the same ratio.
   `bw` applies a black-and-white treatment (used for the hero portrait). */
export function ImagePlaceholder({
  src,
  alt,
  label,
  ratio = "4 / 3",
  bw = false,
  className = "",
  rounded = "rounded-2xl",
}: {
  src?: string;
  alt: string;
  label: string;
  ratio?: string;
  bw?: boolean;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${bw ? "grayscale" : ""}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-(--color-line) bg-(--color-paper-dim) p-4 text-center"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-(--color-ink-soft)">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="8.5" cy="9.5" r="1.6" fill="currentColor" />
            <path d="M4 17l4.5-4.5 3 3L15 11l5 5.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
          </svg>
          <span className="text-xs text-(--color-ink-soft)">{label}</span>
        </div>
      )}
    </div>
  );
}
