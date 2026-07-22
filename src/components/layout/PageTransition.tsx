"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion, type Transition } from "motion/react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const transition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: "easeInOut" };

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
