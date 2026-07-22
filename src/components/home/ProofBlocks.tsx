import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { Counter } from "./Counter";

export function ProofBlocks({ proof }: { proof: Dictionary["home"]["proof"] }) {
  return (
    <section aria-labelledby="proof-title" className="border-y border-(--color-line) py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="proof-title" className="sr-only">
          {proof.title}
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {proof.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block border-l border-(--color-line) pl-5 transition-colors hover:border-(--color-accent)"
            >
              <p className="font-serif-display text-4xl tabular-nums text-(--color-accent) sm:text-5xl">
                <Counter value={item.number} prefix={item.prefix} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-(--color-ink-soft)">
                {item.label}
              </p>
              <p className="measure mt-2 text-sm text-(--color-ink)">{item.detail}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
