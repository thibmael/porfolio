import type { ReactNode } from "react";

export function Accordion({
  summary,
  children,
  defaultOpen = false,
}: {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group border-b border-(--color-line) py-4"
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:content-none">
        <span>{summary}</span>
        <span className="shrink-0 text-(--color-ink-soft) transition-transform group-open:rotate-45" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="measure mt-3 text-sm text-(--color-ink-soft) sm:text-base">{children}</div>
    </details>
  );
}
