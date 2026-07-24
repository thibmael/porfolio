"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Capsule, DiagramData, Teinte } from "@/lib/capsule-types";
import { teinteVar } from "@/lib/capsule-types";

type Size = "card" | "full";

export function CapsuleDiagram({
  capsule,
  size = "card",
}: {
  capsule: Capsule;
  size?: Size;
}) {
  const { diagramType, diagram, teinte } = capsule;
  switch (diagramType) {
    case "process":
      return <ProcessDiagram data={diagram} teinte={teinte} size={size} />;
    case "venn":
      return <VennDiagram data={diagram} size={size} />;
    case "network":
      return <NetworkDiagram data={diagram} teinte={teinte} size={size} />;
    case "radial":
      return <RadialDiagram data={diagram} teinte={teinte} size={size} />;
    case "arc":
      return <ArcDiagram data={diagram} teinte={teinte} size={size} />;
    case "progress":
      return <ProgressDiagram data={diagram} teinte={teinte} size={size} />;
    default:
      return null;
  }
}

const draw = (rm: boolean | null, delay = 0) =>
  rm
    ? { initial: { pathLength: 1, opacity: 1 }, animate: { pathLength: 1, opacity: 1 } }
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true, margin: "-5%" },
        transition: { duration: 0.7, delay, ease: "easeInOut" as const },
      };

const pop = (rm: boolean | null, delay = 0) =>
  rm
    ? { initial: { scale: 1, opacity: 1 }, animate: { scale: 1, opacity: 1 } }
    : {
        initial: { scale: 0, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: { once: true, margin: "-5%" },
        transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

function Label({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-(--color-ink-soft) text-[9px]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </text>
  );
}

/* 1. Process — GEFP: a linear 4-step flow, last step emphasised. */
function ProcessDiagram({ data, teinte, size }: { data: DiagramData; teinte: Teinte; size: Size }) {
  const rm = useReducedMotion();
  const steps = data.steps ?? [];
  const accent = teinteVar(teinte);
  const y = size === "card" ? 46 : 40;
  const x0 = 24;
  const x1 = 296;
  const step = (x1 - x0) / (steps.length - 1);
  return (
    <svg viewBox="0 0 320 100" className="h-full w-full" role="img" aria-label="Processus en 4 étapes">
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="var(--color-line)" strokeWidth="2" />
      <motion.line
        x1={x0}
        y1={y}
        x2={x1}
        y2={y}
        stroke={accent}
        strokeWidth="2"
        {...draw(rm)}
      />
      {steps.map((s, i) => {
        const cx = x0 + i * step;
        const last = i === steps.length - 1;
        return (
          <g key={s}>
            <motion.circle
              cx={cx}
              cy={y}
              r={last ? 8 : 5}
              fill={last ? accent : "var(--color-paper)"}
              stroke={accent}
              strokeWidth="2"
              {...pop(rm, 0.1 + i * 0.15)}
              style={{ transformOrigin: `${cx}px ${y}px` }}
            />
            {size === "full" && (
              <Label x={cx} y={y + 22 + (i % 2 ? 12 : 0)}>
                {s}
              </Label>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* 2. Venn — Research: three method circles (ink, rose, blue). */
function VennDiagram({ data, size }: { data: DiagramData; size: Size }) {
  const rm = useReducedMotion();
  const circles = data.circles ?? [];
  const nodes = [
    { cx: 130, cy: 42, stroke: "var(--color-ink)", fill: "var(--color-ink)", lx: 96, ly: 20 },
    { cx: 190, cy: 42, stroke: "var(--color-rose-ink)", fill: "var(--color-rose)", lx: 224, ly: 20 },
    { cx: 160, cy: 74, stroke: "var(--color-blue-ink)", fill: "var(--color-blue)", lx: 160, ly: 96 },
  ];
  return (
    <svg viewBox="0 0 320 110" className="h-full w-full" role="img" aria-label="Diagramme de Venn à trois cercles">
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={30}
          fill={n.fill}
          fillOpacity={0.28}
          stroke={n.stroke}
          strokeWidth="1.5"
          {...pop(rm, 0.1 + i * 0.15)}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        />
      ))}
      {size === "full" &&
        circles.map((c, i) => (
          <Label key={c} x={nodes[i].lx} y={nodes[i].ly}>
            {c}
          </Label>
        ))}
    </svg>
  );
}

/* 3. Network — MSC: abstract convergence (origins → Le Havre hub → destination).
   Deliberately NOT a geographic map. */
function NetworkDiagram({ data, teinte, size }: { data: DiagramData; teinte: Teinte; size: Size }) {
  const rm = useReducedMotion();
  const origins = data.origins ?? [];
  const accent = teinteVar(teinte);
  const hubX = 176;
  const hubY = 55;
  const destX = 296;
  const destY = 55;
  const col = origins.map((o, i) => ({
    name: o,
    x: 30,
    y: 14 + (i * 82) / Math.max(origins.length - 1, 1),
  }));
  const hubIsLeHavre = (name: string) => name === data.hub;
  return (
    <svg viewBox="0 0 320 110" className="h-full w-full" role="img" aria-label="Réseau de convergence de ports">
      {col.map((o, i) => (
        <motion.path
          key={o.name}
          d={`M ${o.x} ${o.y} Q ${(o.x + hubX) / 2} ${o.y} ${hubX} ${hubY}`}
          fill="none"
          stroke={hubIsLeHavre(o.name) ? accent : "var(--color-line)"}
          strokeWidth={hubIsLeHavre(o.name) ? 2 : 1}
          {...draw(rm, i * 0.05)}
        />
      ))}
      <motion.line x1={hubX} y1={hubY} x2={destX} y2={destY} stroke={accent} strokeWidth="2" {...draw(rm, 0.5)} />
      {col.map((o, i) => (
        <motion.circle
          key={o.name}
          cx={o.x}
          cy={o.y}
          r={hubIsLeHavre(o.name) ? 4 : 2.5}
          fill={hubIsLeHavre(o.name) ? accent : "var(--color-ink-soft)"}
          {...pop(rm, i * 0.04)}
          style={{ transformOrigin: `${o.x}px ${o.y}px` }}
        />
      ))}
      <motion.circle cx={hubX} cy={hubY} r={8} fill={accent} {...pop(rm, 0.5)} style={{ transformOrigin: `${hubX}px ${hubY}px` }} />
      <motion.rect x={destX - 6} y={destY - 6} width={12} height={12} fill="var(--color-ink)" {...pop(rm, 0.6)} style={{ transformOrigin: `${destX}px ${destY}px` }} />
      {size === "full" && (
        <>
          <Label x={hubX} y={hubY - 14}>{data.hub ?? ""}</Label>
          <Label x={hubX} y={hubY + 20}>{data.hubNote ?? ""}</Label>
          <Label x={destX} y={destY - 12} anchor="end">{data.destination ?? ""}</Label>
        </>
      )}
    </svg>
  );
}

/* 4. Radial — WTC: a central actor linked to four stakeholder groups. */
function RadialDiagram({ data, teinte, size }: { data: DiagramData; teinte: Teinte; size: Size }) {
  const rm = useReducedMotion();
  const groups = data.groups ?? [];
  const accent = teinteVar(teinte);
  const cx = 160;
  const cy = 55;
  const positions = [
    { x: 50, y: 22 },
    { x: 270, y: 22 },
    { x: 50, y: 90 },
    { x: 270, y: 90 },
  ];
  return (
    <svg viewBox="0 0 320 110" className="h-full w-full" role="img" aria-label="Réseau radial de parties prenantes">
      {positions.map((p, i) => (
        <motion.line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={accent} strokeWidth="1.5" {...draw(rm, i * 0.12)} />
      ))}
      {positions.map((p, i) => (
        <g key={i}>
          <motion.circle cx={p.x} cy={p.y} r={5} fill="var(--color-paper)" stroke={accent} strokeWidth="2" {...pop(rm, 0.2 + i * 0.12)} style={{ transformOrigin: `${p.x}px ${p.y}px` }} />
          {size === "full" && (
            <Label x={p.x} y={p.y < cy ? p.y - 10 : p.y + 16} anchor={p.x < cx ? "start" : "end"}>
              {groups[i] ?? ""}
            </Label>
          )}
        </g>
      ))}
      <motion.circle cx={cx} cy={cy} r={9} fill={accent} {...pop(rm, 0.1)} style={{ transformOrigin: `${cx}px ${cy}px` }} />
      {size === "full" && <Label x={cx} y={cy - 14}>{data.center ?? ""}</Label>}
    </svg>
  );
}

/* 5. Arc — Ploutos: a descending 4-step arc; the last node is hollow/dashed
   to make the non-outcome legible rather than softened. */
function ArcDiagram({ data, teinte, size }: { data: DiagramData; teinte: Teinte; size: Size }) {
  const rm = useReducedMotion();
  const steps = data.steps ?? [];
  const accent = teinteVar(teinte);
  // points along a downward arc
  const pts = [
    { x: 30, y: 30 },
    { x: 120, y: 20 },
    { x: 210, y: 45 },
    { x: 296, y: 82 },
  ];
  const path = `M ${pts[0].x} ${pts[0].y} Q ${pts[1].x} ${pts[1].y - 4} ${pts[1].x} ${pts[1].y} T ${pts[2].x} ${pts[2].y} Q ${pts[3].x - 40} ${pts[3].y - 4} ${pts[3].x} ${pts[3].y}`;
  return (
    <svg viewBox="0 0 320 105" className="h-full w-full" role="img" aria-label="Frise en arc descendant, résultat non atteint">
      <motion.path d={path} fill="none" stroke={accent} strokeWidth="2" {...draw(rm)} />
      {pts.map((p, i) => {
        const last = i === pts.length - 1;
        return (
          <g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={5}
              fill={last ? "var(--color-paper)" : accent}
              stroke={accent}
              strokeWidth="2"
              strokeDasharray={last ? "3 3" : undefined}
              {...pop(rm, 0.15 + i * 0.15)}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
            {size === "full" && (
              <Label x={p.x} y={p.y < 40 ? p.y - 12 : p.y + 18} anchor={i === 0 ? "start" : last ? "end" : "middle"}>
                {steps[i] ?? ""}
              </Label>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* 6. Progress — PopnBuy: a single count on an open-ended track (no fake target,
   no time series). */
function ProgressDiagram({ data, teinte, size }: { data: DiagramData; teinte: Teinte; size: Size }) {
  const rm = useReducedMotion();
  const accent = teinteVar(teinte);
  const value = data.value ?? 0;
  const ticks = 10;
  const filled = 6; // representative fill; the track is open-ended (dashed tail)
  return (
    <svg viewBox="0 0 320 90" className="h-full w-full" role="img" aria-label="Indicateur de progression">
      <text x={24} y={40} className="fill-(--color-ink)" style={{ fontFamily: "var(--font-serif)", fontSize: 30 }}>
        {value}
      </text>
      {Array.from({ length: ticks }).map((_, i) => {
        const x = 120 + i * 16;
        const on = i < filled;
        return (
          <motion.rect
            key={i}
            x={x}
            y={24}
            width={10}
            height={12}
            rx={2}
            fill={on ? accent : "none"}
            stroke={on ? accent : "var(--color-line)"}
            strokeWidth="1.5"
            strokeDasharray={i >= filled ? "2 2" : undefined}
            {...pop(rm, i * 0.05)}
            style={{ transformOrigin: `${x + 5}px 30px` }}
          />
        );
      })}
      {size === "full" && (
        <>
          <Label x={24} y={60} anchor="start">{data.unit ?? ""}</Label>
          <Label x={120} y={60} anchor="start">{data.status ?? ""}</Label>
        </>
      )}
    </svg>
  );
}
