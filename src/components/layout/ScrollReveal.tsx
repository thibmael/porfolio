"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Reveals [data-reveal] elements as they enter the viewport. Re-scans on route
   change (the layout persists across navigations). Degrades gracefully: without
   JS the .js class is absent so nothing is hidden; with reduced-motion the
   elements are shown immediately. */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    // Reveal already-visible elements synchronously (no flash on load); observe
    // the rest so they animate in as they scroll into view.
    const vh = window.innerHeight;
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.92 && rect.bottom > 0) el.classList.add("reveal-in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
