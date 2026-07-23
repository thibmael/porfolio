"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function Panel({
  open,
  onClose,
  title,
  eyebrow,
  closeLabel,
  banner,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  closeLabel: string;
  banner?: ReactNode;
  children: ReactNode;
}) {
  const rm = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: rm ? 0 : 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-(--color-line) bg-(--color-paper) shadow-2xl outline-none sm:rounded-2xl"
            initial={rm ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={rm ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: rm ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-4 top-4 z-10 shrink-0 rounded-full border border-white/30 bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {banner ? (
              <div className="relative h-40 shrink-0 overflow-hidden sm:h-52">
                <div className="absolute inset-0">{banner}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  {eyebrow && (
                    <p className="text-xs font-medium uppercase tracking-widest text-white/80">
                      {eyebrow}
                    </p>
                  )}
                  <h2 className="font-serif-display text-2xl leading-tight text-white sm:text-3xl">
                    {title}
                  </h2>
                </div>
              </div>
            ) : (
              <div className="border-b border-(--color-line) px-6 py-4 pr-16">
                {eyebrow && (
                  <p className="text-xs font-medium uppercase tracking-widest text-(--color-ink-soft)">
                    {eyebrow}
                  </p>
                )}
                <h2 className="font-serif-display text-2xl leading-tight">{title}</h2>
              </div>
            )}
            <div className="overflow-y-auto px-6 py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
