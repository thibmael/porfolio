/* Small uppercase section label with a short accent bar, matching the
   project detail pages. Keeps section headings consistent across the site. */
export function SectionHeading({
  title,
  accent = "var(--color-accent)",
  className = "",
}: {
  title: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="h-3.5 w-1 rounded-full" style={{ backgroundColor: accent }} />
      <h2 className="text-xs font-semibold uppercase tracking-widest text-(--color-soft)">{title}</h2>
    </div>
  );
}
