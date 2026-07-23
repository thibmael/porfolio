"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";

/* Thematic, looping motifs — one visual identity per tile.
   All motion is transform/opacity only. Under prefers-reduced-motion each
   motif renders a static, representative frame (no looping). */

const loop = (duration: number, extra: Partial<Transition> = {}): Transition => ({
  duration,
  repeat: Infinity,
  ease: "easeInOut",
  ...extra,
});

/* MSC / maritime connectivity — a boat crossing over moving swells. */
export function BoatMotif() {
  const rm = useReducedMotion();
  return (
    <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden="true">
      <motion.g
        initial={rm ? { x: 40 } : { x: -20 }}
        animate={rm ? { x: 40 } : { x: 110 }}
        transition={rm ? undefined : loop(6, { ease: "linear" })}
      >
        <motion.g
          initial={{ y: 0 }}
          animate={rm ? { y: 0 } : { y: [0, -1.5, 0] }}
          transition={rm ? undefined : loop(2.2)}
        >
          <rect x="-9" y="26" width="18" height="6" rx="1" fill="var(--color-accent)" />
          <rect x="-6" y="19" width="4" height="7" fill="var(--color-accent-soft)" />
          <rect x="-1" y="19" width="4" height="7" fill="var(--color-accent-soft)" />
          <rect x="4" y="19" width="3" height="7" fill="var(--color-accent-soft)" />
        </motion.g>
      </motion.g>
      {[38, 46, 54].map((y, i) => (
        <motion.path
          key={y}
          d={`M0 ${y} q 15 -4 30 0 t 30 0 t 30 0 t 30 0`}
          fill="none"
          stroke="var(--color-accent-soft)"
          strokeWidth="1"
          strokeOpacity={0.4 - i * 0.1}
          initial={{ x: 0 }}
          animate={rm ? { x: 0 } : { x: [-30, 0] }}
          transition={rm ? undefined : loop(3 + i, { ease: "linear" })}
        />
      ))}
    </svg>
  );
}

/* WTC — three towers rising, with windows that light up. */
export function TowersMotif() {
  const rm = useReducedMotion();
  const towers = [
    { x: 26, w: 16, h: 34 },
    { x: 48, w: 20, h: 46 },
    { x: 74, w: 16, h: 28 },
  ];
  return (
    <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden="true">
      {towers.map((t, i) => (
        <g key={t.x}>
          <motion.rect
            x={t.x}
            width={t.w}
            fill="var(--color-accent)"
            initial={rm ? { height: t.h, y: 56 - t.h } : { height: 0, y: 56 }}
            animate={{ height: t.h, y: 56 - t.h }}
            transition={rm ? undefined : { duration: 0.9, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          {Array.from({ length: Math.floor(t.h / 8) }).map((_, r) => (
            <motion.rect
              key={r}
              x={t.x + 3}
              y={56 - t.h + 5 + r * 8}
              width={t.w - 6}
              height={3}
              fill="var(--color-paper)"
              initial={{ opacity: 0.25 }}
              animate={rm ? { opacity: 0.4 } : { opacity: [0.15, 0.7, 0.15] }}
              transition={rm ? undefined : loop(3, { delay: (i + r) * 0.4 })}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* PopnBuy — live-commerce reaction bubbles floating up. */
export function BubblesMotif() {
  const rm = useReducedMotion();
  const bubbles = [
    { x: 34, r: 5, delay: 0 },
    { x: 52, r: 7, delay: 0.8 },
    { x: 46, r: 4, delay: 1.6 },
    { x: 68, r: 6, delay: 0.4 },
    { x: 78, r: 4, delay: 2.1 },
  ];
  return (
    <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden="true">
      {bubbles.map((b, i) =>
        rm ? (
          <circle
            key={i}
            cx={b.x}
            cy={40 - i * 4}
            r={b.r}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            opacity={0.5}
          />
        ) : (
          <motion.circle
            key={i}
            cx={b.x}
            r={b.r}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            initial={{ cy: 54, opacity: 0 }}
            animate={{ cy: [54, 8], opacity: [0, 0.7, 0] }}
            transition={loop(3.4, { delay: b.delay, ease: "easeOut" })}
          />
        )
      )}
    </svg>
  );
}

/* ZLECAf diagnostic study — ascending data bars. */
export function StudyMotif() {
  const rm = useReducedMotion();
  const bars = [16, 26, 22, 38, 32, 46];
  return (
    <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={22 + i * 13}
          width={8}
          fill={i === bars.length - 1 ? "var(--color-accent)" : "var(--color-accent-soft)"}
          initial={rm ? { height: h, y: 52 - h } : { height: 0, y: 52 }}
          animate={
            rm
              ? { height: h, y: 52 - h }
              : { height: [h * 0.6, h, h * 0.6], y: [52 - h * 0.6, 52 - h, 52 - h * 0.6] }
          }
          transition={rm ? undefined : loop(2.6, { delay: i * 0.15 })}
        />
      ))}
      <line x1="18" y1="52" x2="102" y2="52" stroke="var(--color-line)" strokeWidth="1" />
    </svg>
  );
}

/* Research — a small maritime network of nodes and pulsing links. */
export function NetworkMotif() {
  const rm = useReducedMotion();
  const nodes = [
    { x: 24, y: 20 },
    { x: 60, y: 14 },
    { x: 96, y: 26 },
    { x: 40, y: 44 },
    { x: 82, y: 46 },
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [1, 4],
    [2, 4],
  ];
  return (
    <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden="true">
      {links.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-accent-soft)"
          strokeWidth="1"
          initial={{ opacity: 0.3 }}
          animate={rm ? { opacity: 0.4 } : { opacity: [0.15, 0.6, 0.15] }}
          transition={rm ? undefined : loop(3, { delay: i * 0.3 })}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={3}
          fill="var(--color-accent)"
          initial={{ scale: 1 }}
          animate={rm ? { scale: 1 } : { scale: [1, 1.4, 1] }}
          transition={rm ? undefined : loop(2.4, { delay: i * 0.35 })}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
    </svg>
  );
}

/* Expertise — concentric arcs, domains radiating out. */
export function DomainsMotif() {
  const rm = useReducedMotion();
  return (
    <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden="true">
      {[10, 18, 26].map((r, i) => (
        <motion.circle
          key={r}
          cx={60}
          cy={30}
          r={r}
          fill="none"
          stroke="var(--color-accent-soft)"
          strokeWidth="1"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={rm ? { opacity: 0.4 } : { opacity: [0.1, 0.5, 0.1], scale: [0.9, 1.05, 0.9] }}
          transition={rm ? undefined : loop(3.2, { delay: i * 0.5 })}
          style={{ transformOrigin: "60px 30px" }}
        />
      ))}
      <circle cx={60} cy={30} r={3.5} fill="var(--color-accent)" />
    </svg>
  );
}
