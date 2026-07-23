"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Cover, type CoverVariant } from "./covers";

export function ProjectCard({
  onClick,
  eyebrow,
  title,
  hint,
  variant,
  className = "",
  index = 0,
}: {
  onClick: () => void;
  eyebrow: string;
  title: string;
  hint: string;
  variant: CoverVariant;
  className?: string;
  index?: number;
}) {
  const rm = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 200, damping: 20 });
  const glareBg = useTransform(
    px,
    (v) =>
      `radial-gradient(600px circle at ${v * 100}% 0%, rgba(255,255,255,0.14), transparent 45%)`
  );

  function handleMove(e: React.MouseEvent) {
    if (rm) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={rm ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: rm ? 0 : 0.5, delay: rm ? 0 : index * 0.06, ease: "easeOut" }}
      style={rm ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={rm ? undefined : { scale: 1.015 }}
      className={`group relative block overflow-hidden rounded-3xl text-left shadow-[0_10px_40px_-12px_rgba(20,32,45,0.5)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-20px_rgba(20,32,45,0.65)] ${className}`}
    >
      <div className="absolute inset-0" style={{ transform: "translateZ(0)" }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.02 }}
          whileHover={rm ? undefined : { scale: 1.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Cover variant={variant} />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
      {/* moving glare for a glassy 3D feel */}
      {!rm && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}

      <div className="relative flex h-full flex-col justify-end p-6" style={{ transform: "translateZ(40px)" }}>
        <span className="mb-3 w-fit rounded-full bg-white/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          {eyebrow}
        </span>
        <p className="font-serif-display text-2xl leading-[1.1] text-white sm:text-3xl">{title}</p>
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-(--color-ink) shadow-lg transition-transform duration-300 group-hover:translate-x-1">
          {hint}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </motion.button>
  );
}
