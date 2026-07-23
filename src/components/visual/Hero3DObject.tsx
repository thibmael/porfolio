"use client";

import { motion, useReducedMotion } from "motion/react";

/* A floating isometric stack of shipping containers — a light 3D anchor for
   the hero. Pure SVG isometric projection (three shaded faces), gentle float
   and sway. Frozen under prefers-reduced-motion. */

function Container({
  x,
  y,
  top,
  left,
  right,
}: {
  x: number;
  y: number;
  top: string;
  left: string;
  right: string;
}) {
  // isometric box: width w, depth d, height h
  const w = 120;
  const d = 46;
  const h = 40;
  const ky = 0.28;
  const p = (px: number, py: number, pz: number) => {
    const sx = x + (px - pz);
    const sy = y + (px + pz) * ky - py;
    return `${sx},${sy}`;
  };
  return (
    <g>
      {/* top face */}
      <polygon
        points={`${p(0, h, 0)} ${p(w, h, 0)} ${p(w, h, d)} ${p(0, h, d)}`}
        fill={top}
      />
      {/* left face (front) */}
      <polygon points={`${p(0, 0, 0)} ${p(w, 0, 0)} ${p(w, h, 0)} ${p(0, h, 0)}`} fill={left} />
      {/* right face (side) */}
      <polygon points={`${p(w, 0, 0)} ${p(w, 0, d)} ${p(w, h, d)} ${p(w, h, 0)}`} fill={right} />
      {/* corrugation ridges on the front face */}
      {Array.from({ length: 11 }).map((_, i) => {
        const px = 6 + i * 10;
        return (
          <line
            key={i}
            x1={x + px}
            y1={y - 0 + px * ky}
            x2={x + px}
            y2={y - h + px * ky}
            stroke="#00000022"
            strokeWidth="2"
          />
        );
      })}
    </g>
  );
}

export function Hero3DObject({ className = "" }: { className?: string }) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      aria-hidden="true"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rm ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={rm ? undefined : { y: [0, -12, 0], rotate: [0, 0.6, 0] }}
        transition={rm ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
      >
        <svg viewBox="0 0 260 260" className="h-full w-full">
          {/* stacked containers */}
          <g transform="translate(70 150)">
            <Container x={-60} y={40} top="#3c5a7c" left="#25405c" right="#1b2f44" />
            <Container x={-30} y={2} top="#e2d0ad" left="#c39a56" right="#95713a" />
            <Container x={-70} y={-34} top="#d7e0ea" left="#9fb2ca" right="#748ba9" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
