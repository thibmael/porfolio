"use client";

import dynamic from "next/dynamic";
import type { Dictionary } from "@/lib/dictionaries";

const MaritimeMap = dynamic(() => import("./MaritimeMap").then((m) => m.MaritimeMap), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="h-64 animate-pulse rounded bg-(--color-paper-dim)" aria-hidden="true" />
    </div>
  ),
});

export function MaritimeMapLoader({ map }: { map: Dictionary["home"]["map"] }) {
  return <MaritimeMap map={map} />;
}
