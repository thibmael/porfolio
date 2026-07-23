"use client";

import { motion, useReducedMotion } from "motion/react";

/* Art-directed, full-bleed cover scenes — one visual identity per project.
   Fixed editorial slate palette (they read as printed covers, so they do not
   theme-flip). All motion is transform/opacity only; under
   prefers-reduced-motion each cover renders a static frame. */

const C = {
  ink0: "#14202d",
  ink1: "#1e3145",
  ink2: "#2c4763",
  ink3: "#3c5a7c",
  line: "#8da3c2",
  steel: "#6f8bab",
  foam: "#eef2f6",
  sand: "#e4d2b4",
};

export type CoverVariant =
  | "maritime"
  | "textile"
  | "towers"
  | "live"
  | "research"
  | "hero";

function Grain({ id }: { id: string }) {
  return (
    <>
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect
        x="0"
        y="0"
        width="400"
        height="300"
        filter={`url(#${id})`}
        opacity="0.06"
        style={{ mixBlendMode: "overlay" }}
      />
    </>
  );
}

export function Cover({ variant, className = "" }: { variant: CoverVariant; className?: string }) {
  const rm = useReducedMotion();
  const drift = (dur: number, from: number, to: number) =>
    rm ? {} : { animate: { x: [from, to] }, transition: { duration: dur, repeat: Infinity, ease: "linear" as const } };

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className}`}
      aria-hidden="true"
    >
      {variant === "maritime" && <Maritime drift={drift} />}
      {variant === "hero" && <Hero drift={drift} />}
      {variant === "textile" && <Textile rm={rm} />}
      {variant === "towers" && <Towers rm={rm} />}
      {variant === "live" && <Live rm={rm} />}
      {variant === "research" && <Research rm={rm} />}
    </svg>
  );
}

type DriftFn = (dur: number, from: number, to: number) => Record<string, unknown>;

function Maritime({ drift }: { drift: DriftFn }) {
  return (
    <g>
      <defs>
        <linearGradient id="mar-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.ink2} />
          <stop offset="0.55" stopColor={C.ink1} />
          <stop offset="1" stopColor={C.ink0} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#mar-sky)" />
      <circle cx="300" cy="92" r="30" fill={C.sand} opacity="0.14" />
      <circle cx="300" cy="92" r="30" fill="none" stroke={C.sand} strokeOpacity="0.25" />

      {/* ship silhouette on the horizon */}
      <g opacity="0.92">
        <rect x="150" y="150" width="90" height="14" rx="1" fill={C.ink0} />
        <path d="M150 164 L246 164 L236 176 L160 176 Z" fill={C.ink0} />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect
            key={i}
            x={154 + i * 9}
            y={140 + (i % 3) * 3}
            width="8"
            height={10 - (i % 3) * 2}
            fill={i % 2 ? C.ink2 : C.steel}
          />
        ))}
        <rect x="228" y="132" width="10" height="18" fill={C.ink0} />
      </g>

      {/* sea strata drifting */}
      {[186, 204, 224, 248, 276].map((y, i) => (
        <motion.path
          key={y}
          d={`M-40 ${y} q 30 -6 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0`}
          fill="none"
          stroke={i < 2 ? C.steel : C.ink2}
          strokeWidth={1.4}
          strokeOpacity={0.5 - i * 0.05}
          {...(drift(5 + i * 1.5, i % 2 ? -60 : 0, i % 2 ? 0 : -60) as object)}
        />
      ))}
      <Grain id="grain-mar" />
    </g>
  );
}

function Hero({ drift }: { drift: DriftFn }) {
  return (
    <g>
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.ink1} />
          <stop offset="0.6" stopColor={C.ink0} />
          <stop offset="1" stopColor="#0f1922" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#hero-sky)" />
      {/* coordinate ticks */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={20 + i * 34} y1="20" x2={20 + i * 34} y2="26" stroke={C.steel} strokeOpacity="0.3" />
      ))}
      <circle cx="86" cy="86" r="34" fill={C.sand} opacity="0.12" />

      {/* island silhouette (organic) */}
      <path
        d="M250 120 q 34 -14 52 16 q 20 30 6 64 q -12 32 -44 40 q -34 8 -52 -18 q -18 -28 -4 -60 q 12 -30 42 -42 Z"
        fill={C.ink2}
        opacity="0.9"
      />
      <path
        d="M262 150 q 20 -6 30 12 M258 176 q 22 4 40 -6 M270 198 q 12 8 26 2"
        fill="none"
        stroke={C.steel}
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />

      {[210, 232, 258, 286].map((y, i) => (
        <motion.path
          key={y}
          d={`M-40 ${y} q 34 -6 68 0 t 68 0 t 68 0 t 68 0 t 68 0 t 68 0`}
          fill="none"
          stroke={i < 2 ? C.steel : C.ink3}
          strokeWidth="1.4"
          strokeOpacity={0.5 - i * 0.06}
          {...(drift(6 + i * 1.4, i % 2 ? -68 : 0, i % 2 ? 0 : -68) as object)}
        />
      ))}
      <Grain id="grain-hero" />
    </g>
  );
}

function Textile({ rm }: { rm: boolean | null }) {
  return (
    <g>
      <rect width="400" height="300" fill={C.ink1} />
      {/* warp (vertical) */}
      {Array.from({ length: 22 }).map((_, i) => (
        <line
          key={`w${i}`}
          x1={10 + i * 18}
          y1="0"
          x2={10 + i * 18}
          y2="300"
          stroke={C.ink2}
          strokeWidth={i % 5 === 0 ? 2 : 1}
          strokeOpacity="0.7"
        />
      ))}
      {/* weft (horizontal), a few highlighted sand threads */}
      {Array.from({ length: 17 }).map((_, i) => (
        <motion.line
          key={`f${i}`}
          x1="0"
          y1={10 + i * 18}
          x2="400"
          y2={10 + i * 18}
          stroke={i % 6 === 2 ? C.sand : C.steel}
          strokeWidth={i % 6 === 2 ? 2 : 1}
          strokeOpacity={i % 6 === 2 ? 0.8 : 0.35}
          initial={{ pathLength: rm ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={rm ? undefined : { duration: 1.4, delay: i * 0.08, ease: "easeInOut" }}
        />
      ))}
      <Grain id="grain-tex" />
    </g>
  );
}

function Towers({ rm }: { rm: boolean | null }) {
  const towers = [
    { x: 40, w: 34, h: 150 },
    { x: 82, w: 44, h: 210 },
    { x: 134, w: 30, h: 120 },
    { x: 250, w: 32, h: 132 },
    { x: 290, w: 46, h: 196 },
    { x: 344, w: 30, h: 150 },
  ];
  return (
    <g>
      <defs>
        <linearGradient id="tow-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.ink1} />
          <stop offset="1" stopColor={C.ink0} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#tow-sky)" />
      {/* linking arc between the two clusters */}
      <motion.path
        d="M100 96 Q 200 30 312 100"
        fill="none"
        stroke={C.sand}
        strokeWidth="1.4"
        strokeOpacity="0.6"
        strokeDasharray="3 4"
        initial={{ pathLength: rm ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={rm ? undefined : { duration: 1.6, ease: "easeInOut" }}
      />
      <circle cx="100" cy="96" r="3.5" fill={C.sand} />
      <circle cx="312" cy="100" r="3.5" fill={C.sand} />
      {towers.map((t, ti) => (
        <g key={t.x}>
          <rect x={t.x} y={300 - t.h} width={t.w} height={t.h} fill={ti === 1 || ti === 4 ? C.ink2 : C.ink1} stroke={C.ink0} />
          {Array.from({ length: Math.floor(t.h / 16) }).map((_, r) =>
            Array.from({ length: Math.floor(t.w / 10) }).map((_, c) => (
              <motion.rect
                key={`${r}-${c}`}
                x={t.x + 5 + c * 10}
                y={300 - t.h + 8 + r * 16}
                width="4"
                height="6"
                fill={C.foam}
                initial={{ opacity: 0.18 }}
                animate={rm ? { opacity: 0.3 } : { opacity: [0.1, 0.55, 0.1] }}
                transition={rm ? undefined : { duration: 3.5, repeat: Infinity, delay: (r + c + ti) * 0.35 }}
              />
            ))
          )}
        </g>
      ))}
      <Grain id="grain-tow" />
    </g>
  );
}

function Live({ rm }: { rm: boolean | null }) {
  const bubbles = [
    { x: 120, r: 10, d: 0 },
    { x: 200, r: 16, d: 0.9 },
    { x: 170, r: 8, d: 1.8 },
    { x: 250, r: 13, d: 0.5 },
    { x: 285, r: 9, d: 2.3 },
    { x: 150, r: 7, d: 1.3 },
  ];
  return (
    <g>
      <rect width="400" height="300" fill={C.ink1} />
      {/* broadcast rings */}
      {[26, 46, 68].map((r, i) => (
        <motion.circle
          key={r}
          cx="80"
          cy="150"
          r={r}
          fill="none"
          stroke={C.steel}
          strokeWidth="1.4"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={rm ? { opacity: 0.4 } : { opacity: [0.05, 0.5, 0.05], scale: [0.85, 1.1, 0.85] }}
          transition={rm ? undefined : { duration: 3, repeat: Infinity, delay: i * 0.5 }}
          style={{ transformOrigin: "80px 150px" }}
        />
      ))}
      {/* play button */}
      <circle cx="80" cy="150" r="18" fill={C.sand} opacity="0.9" />
      <path d="M74 141 L92 150 L74 159 Z" fill={C.ink0} />
      {/* rising bubbles (live reactions) */}
      {bubbles.map((b, i) =>
        rm ? (
          <circle key={i} cx={b.x} cy={170 - i * 18} r={b.r} fill="none" stroke={C.foam} strokeOpacity="0.4" strokeWidth="1.5" />
        ) : (
          <motion.circle
            key={i}
            cx={b.x}
            r={b.r}
            fill="none"
            stroke={C.foam}
            strokeWidth="1.5"
            initial={{ cy: 280, opacity: 0 }}
            animate={{ cy: [280, 30], opacity: [0, 0.6, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: b.d, ease: "easeOut" }}
          />
        )
      )}
      <Grain id="grain-live" />
    </g>
  );
}

function Research({ rm }: { rm: boolean | null }) {
  const islands = [
    { x: 120, y: 110, r: 16 },
    { x: 300, y: 90, r: 10 },
    { x: 250, y: 200, r: 22 },
    { x: 150, y: 220, r: 9 },
  ];
  const lanes: [number, number][] = [
    [0, 1],
    [0, 2],
    [2, 3],
    [1, 2],
  ];
  return (
    <g>
      <rect width="400" height="300" fill={C.ink0} />
      {/* coordinate grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke={C.ink2} strokeOpacity="0.35" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke={C.ink2} strokeOpacity="0.35" />
      ))}
      {lanes.map(([a, b], i) => {
        const A = islands[a];
        const B = islands[b];
        return (
          <motion.line
            key={i}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke={C.sand}
            strokeWidth="1.3"
            strokeDasharray="4 6"
            strokeOpacity="0.7"
            initial={{ strokeDashoffset: rm ? 0 : 100 }}
            animate={rm ? { strokeDashoffset: 0 } : { strokeDashoffset: [100, 0] }}
            transition={rm ? undefined : { duration: 4, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
      {islands.map((is, i) => (
        <g key={i}>
          <circle cx={is.x} cy={is.y} r={is.r} fill={C.ink2} stroke={C.steel} strokeOpacity="0.6" />
          <motion.circle
            cx={is.x}
            cy={is.y}
            r={is.r}
            fill="none"
            stroke={C.steel}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={rm ? { opacity: 0.4 } : { opacity: [0.5, 0, 0.5], scale: [1, 1.5, 1] }}
            transition={rm ? undefined : { duration: 3.5, repeat: Infinity, delay: i * 0.5 }}
            style={{ transformOrigin: `${is.x}px ${is.y}px` }}
          />
        </g>
      ))}
      <Grain id="grain-res" />
    </g>
  );
}
