"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/lib/dictionaries";
import {
  destinationZone,
  madagascar,
  maurice,
  portCoordinates,
  viewBox,
  type PortId,
} from "@/lib/maritime-map-data";

type MapDict = Dictionary["home"]["map"];

export function MaritimeMap({ map }: { map: MapDict }) {
  const [activePort, setActivePort] = useState<PortId | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const ports = map.ports as { id: PortId; name: string }[];

  return (
    <section aria-labelledby="map-title" className="mx-auto max-w-6xl px-6 py-16">
      <h2 id="map-title" className="font-serif-display text-2xl sm:text-3xl">
        {map.title}
      </h2>
      <p className="measure mt-3 text-(--color-ink-soft)">{map.intro}</p>

      {/* Desktop / tablet interactive map */}
      <div className="mt-8 hidden sm:block">
        <svg
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          role="img"
          aria-label={map.title}
          className="w-full"
        >
          {ports.map((port, index) => {
            const from = portCoordinates[port.id];
            if (!from) return null;
            return (
              <motion.path
                key={port.id}
                d={`M ${from.x} ${from.y} Q ${(from.x + destinationZone.x) / 2} ${
                  Math.min(from.y, destinationZone.y) - 40
                } ${destinationZone.x} ${destinationZone.y}`}
                fill="none"
                stroke="var(--color-accent-soft)"
                strokeWidth={activePort === port.id ? 2 : 1}
                strokeOpacity={activePort && activePort !== port.id ? 0.25 : 0.6}
                initial={prefersReducedMotion ? undefined : { pathLength: 0 }}
                animate={prefersReducedMotion ? undefined : { pathLength: 1 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.9, delay: index * 0.12, ease: "easeInOut" }
                }
              />
            );
          })}

          {/* destination zone */}
          <circle cx={destinationZone.x} cy={destinationZone.y} r={7} fill="var(--color-accent)" />
          <text
            x={destinationZone.x + 12}
            y={destinationZone.y + 4}
            className="fill-(--color-ink) text-[11px]"
          >
            {map.destinationZoneLabel}
          </text>

          {/* origin ports */}
          {ports.map((port) => {
            const pos = portCoordinates[port.id];
            if (!pos) return null;
            const isLeHavre = port.id === "le-havre";
            return (
              <g
                key={port.id}
                tabIndex={0}
                role="button"
                aria-label={isLeHavre ? `${port.name} — ${map.leHavreStat}` : port.name}
                onMouseEnter={() => setActivePort(port.id)}
                onMouseLeave={() => setActivePort((current) => (current === port.id ? null : current))}
                onFocus={() => setActivePort(port.id)}
                onBlur={() => setActivePort((current) => (current === port.id ? null : current))}
                onClick={() => setActivePort((current) => (current === port.id ? null : port.id))}
                className="cursor-pointer outline-none"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isLeHavre ? 6 : 4}
                  fill={isLeHavre ? "var(--color-accent)" : "var(--color-ink)"}
                  stroke={activePort === port.id ? "var(--color-accent)" : "transparent"}
                  strokeWidth={3}
                />
                <text
                  x={pos.x - 8}
                  y={pos.y - 10}
                  textAnchor="end"
                  className="fill-(--color-ink-soft) text-[10px]"
                >
                  {port.name}
                </text>
              </g>
            );
          })}

          {activePort === "le-havre" && (
            <g>
              <rect
                x={portCoordinates["le-havre"].x - 10}
                y={portCoordinates["le-havre"].y - 52}
                width={220}
                height={32}
                rx={4}
                fill="var(--color-ink)"
              />
              <text
                x={portCoordinates["le-havre"].x}
                y={portCoordinates["le-havre"].y - 32}
                className="fill-(--color-paper) text-[11px]"
              >
                {map.leHavreStat}
              </text>
            </g>
          )}

          {/* Madagascar & Maurice */}
          <g>
            <circle cx={madagascar.x} cy={madagascar.y} r={5} fill="var(--color-accent)" />
            <text
              x={madagascar.x + 10}
              y={madagascar.y + 4}
              className="fill-(--color-ink) text-[11px] font-medium"
            >
              {map.madagascarLabel}
            </text>
            <circle cx={maurice.x} cy={maurice.y} r={5} fill="var(--color-accent)" />
            <text
              x={maurice.x + 10}
              y={maurice.y + 4}
              className="fill-(--color-ink) text-[11px] font-medium"
            >
              {map.mauriceLabel}
            </text>
          </g>
        </svg>
        <Link href={map.researchHref} className="link-underline mt-4 inline-block text-sm">
          {map.researchLinkLabel} →
        </Link>
      </div>

      {/* Mobile: simplified, non-interactive, no horizontal scroll */}
      <div className="mt-8 sm:hidden">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <p className="font-medium text-(--color-ink-soft)">{map.originsLabel}</p>
            <ul className="mt-1 space-y-1">
              {ports.map((port) => (
                <li key={port.id} className={port.id === "le-havre" ? "font-medium" : undefined}>
                  {port.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-(--color-ink-soft)">{map.destinationsLabel}</p>
            <p className="mt-1">{map.destinationZoneLabel}</p>
            <p className="mt-3 font-medium">{map.leHavreLabel}</p>
            <p className="text-(--color-ink-soft)">{map.leHavreStat}</p>
            <p className="mt-3 font-medium">
              {map.madagascarLabel} · {map.mauriceLabel}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-(--color-ink-soft)">{map.mobileNotice}</p>
        <Link href={map.researchHref} className="link-underline mt-2 inline-block text-sm">
          {map.researchLinkLabel} →
        </Link>
      </div>
    </section>
  );
}
