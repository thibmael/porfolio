/* An image slot. When `src` is set it renders the image at the given ratio;
   when there is no image it renders nothing at all (no placeholder frame).
   `bw` applies a black-and-white treatment. */
export function MediaPlaceholder({
  src,
  alt,
  ratio = "4 / 3",
  bw = false,
  rounded = "rounded-2xl",
  className = "",
  objectPosition,
  priority = false,
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
  priority?: boolean;
}) {
  if (!src) return null;
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`} style={{ aspectRatio: ratio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={`h-full w-full object-cover ${bw ? "grayscale" : ""}`}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
