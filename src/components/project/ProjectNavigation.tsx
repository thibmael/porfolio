import Link from "next/link";

export function ProjectNavigation({
  prev,
  next,
  backHref,
  labels,
}: {
  prev?: { href: string; org: string };
  next?: { href: string; org: string };
  backHref: string;
  labels: { prev: string; back: string; next: string };
}) {
  return (
    <nav className="mt-16 flex items-stretch justify-between gap-4 border-t border-(--color-line) pt-6 text-sm">
      <div className="flex-1">
        {prev && (
          <Link href={prev.href} className="group inline-flex flex-col">
            <span className="text-xs text-(--color-soft)">← {labels.prev}</span>
            <span className="mt-0.5 font-medium group-hover:underline">{prev.org}</span>
          </Link>
        )}
      </div>
      <Link href={backHref} className="link-underline self-center text-xs font-semibold uppercase tracking-wide">
        {labels.back}
      </Link>
      <div className="flex-1 text-right">
        {next && (
          <Link href={next.href} className="group inline-flex flex-col items-end">
            <span className="text-xs text-(--color-soft)">{labels.next} →</span>
            <span className="mt-0.5 font-medium group-hover:underline">{next.org}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
