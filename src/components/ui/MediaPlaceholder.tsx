/* An image slot with a tidy empty state. When `src` is set it renders the image
   at the given ratio; otherwise a neutral frame with a discreet icon, the alt
   text, and (optionally) the expected filename so it is obvious what to drop in.
   `bw` applies a black-and-white treatment. */
export function MediaPlaceholder({
  src,
  alt,
  ratio = "4 / 3",
  filename,
  fileLabel,
  bw = false,
  rounded = "rounded-2xl",
  className = "",
  objectPosition,
}: {
  src?: string;
  alt: string;
  ratio?: string;
  filename?: string;
  fileLabel?: string;
  bw?: boolean;
  rounded?: string;
  className?: string;
  objectPosition?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${bw ? "grayscale" : ""}`} style={objectPosition ? { objectPosition } : undefined} />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-(--color-line) bg-(--color-card) p-4 text-center"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-(--color-soft)">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
            <path d="M4 17l4.5-4.5 3 3L15 11l5 5.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
          </svg>
          <span className="text-[0.7rem] leading-tight text-(--color-soft)">{alt}</span>
          {filename && (
            <span className="mt-1 rounded bg-(--color-paper-dim) px-2 py-0.5 font-mono text-[0.62rem] text-(--color-soft)">
              {fileLabel ? `${fileLabel}: ` : ""}
              {filename}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
