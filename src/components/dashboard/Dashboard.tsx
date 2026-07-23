"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/missions-types";
import { Tile } from "./Tile";
import { Panel } from "./Panel";
import { Counter } from "@/components/home/Counter";
import {
  BoatMotif,
  BubblesMotif,
  DomainsMotif,
  NetworkMotif,
  StudyMotif,
  TowersMotif,
} from "./motifs";
import { MissionDetail } from "./panels/MissionDetail";
import { RecherchePanel } from "./panels/RecherchePanel";
import { ExpertisePanel } from "./panels/ExpertisePanel";
import { ContactPanel } from "./panels/ContactPanel";

type PanelKey =
  | "zlecaf"
  | "connectivite-maritime"
  | "wtc"
  | "entrepreneuriat"
  | "recherche"
  | "expertise"
  | "contact"
  | null;

export function Dashboard({ dict }: { dict: Dictionary }) {
  const [panel, setPanel] = useState<PanelKey>(null);
  const caseStudies = useMemo(
    () => dict.missions.caseStudies as unknown as CaseStudy[],
    [dict]
  );
  const byId = (id: string) => caseStudies.find((c) => c.id === id)!;

  const d = dict.home.dashboard;
  const eb = d.eyebrows;

  const statMap: Record<string, PanelKey> = {
    zlecaf: "zlecaf",
    eastmed: "connectivite-maritime",
    these: "recherche",
  };

  function renderPanelContent() {
    switch (panel) {
      case "zlecaf":
      case "wtc":
      case "entrepreneuriat":
        return <MissionDetail caseStudy={byId(panel)} format={dict.missions.format} />;
      case "connectivite-maritime":
        return (
          <MissionDetail
            caseStudy={byId(panel)}
            format={dict.missions.format}
            onOpenResearch={() => setPanel("recherche")}
          />
        );
      case "recherche":
        return <RecherchePanel recherche={dict.recherche} />;
      case "expertise":
        return <ExpertisePanel expertise={dict.expertise} />;
      case "contact":
        return <ContactPanel contact={dict.contact} />;
      default:
        return null;
    }
  }

  const panelTitle = (() => {
    switch (panel) {
      case "zlecaf":
      case "wtc":
      case "entrepreneuriat":
      case "connectivite-maritime":
        return byId(panel).shortTitle;
      case "recherche":
        return dict.recherche.title;
      case "expertise":
        return dict.expertise.title;
      case "contact":
        return dict.contact.title;
      default:
        return "";
    }
  })();

  const panelEyebrow = (() => {
    switch (panel) {
      case "zlecaf":
        return eb.zlecaf;
      case "connectivite-maritime":
        return eb.connectivite;
      case "wtc":
        return eb.wtc;
      case "entrepreneuriat":
        return eb.entrepreneuriat;
      case "recherche":
        return eb.recherche;
      case "expertise":
        return eb.expertise;
      case "contact":
        return eb.contact;
      default:
        return undefined;
    }
  })();

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(9rem,1fr)]">
          {/* Identity */}
          <div className="flex flex-col justify-between rounded-2xl border border-(--color-line) bg-(--color-paper) p-6 sm:col-span-2 lg:col-span-5 lg:row-span-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-(--color-ink-soft)">
                {dict.home.hero.eyebrow}
              </p>
              <h1 className="font-serif-display mt-2 text-3xl leading-[1.05] sm:text-4xl">
                {dict.home.hero.name}
              </h1>
              <p className="measure mt-3 text-base text-(--color-ink) sm:text-lg">
                {dict.home.hero.positioning}
              </p>
              <p className="measure mt-2 text-sm text-(--color-ink-soft)">
                {dict.home.hero.subtitle}
              </p>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-3 gap-3 border-t border-(--color-line) pt-4">
                {dict.home.proof.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPanel(statMap[item.id] ?? null)}
                    className="group text-left"
                  >
                    <p className="font-serif-display text-2xl tabular-nums text-(--color-accent)">
                      <Counter value={item.number} prefix={item.prefix} suffix={item.suffix} />
                    </p>
                    <p className="mt-1 text-[0.7rem] leading-tight text-(--color-ink-soft) group-hover:text-(--color-ink)">
                      {item.label}
                    </p>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPanel("contact")}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-(--color-accent) px-5 py-2.5 text-sm font-medium text-(--color-paper) transition-colors hover:bg-(--color-accent-soft)"
              >
                {dict.home.hero.ctaPrimary}
                <span aria-hidden="true">→</span>
              </button>
              <p className="mt-2 text-xs text-(--color-ink-soft)">{dict.home.hero.ctaNote}</p>
            </div>
          </div>

          {/* Connectivité maritime — feature, boat motif */}
          <Tile
            index={1}
            onClick={() => setPanel("connectivite-maritime")}
            eyebrow={eb.connectivite}
            title={byId("connectivite-maritime").shortTitle}
            hint={d.hintExplore}
            motif={<BoatMotif />}
            className="min-h-[16rem] lg:col-span-4 lg:row-span-2"
          />

          {/* Recherche — network motif */}
          <Tile
            index={2}
            onClick={() => setPanel("recherche")}
            eyebrow={eb.recherche}
            title={dict.recherche.subtitle}
            hint={d.hintExplore}
            motif={<NetworkMotif />}
            className="min-h-[16rem] lg:col-span-3 lg:row-span-2"
          />

          {/* ZLECAf — study bars motif */}
          <Tile
            index={3}
            onClick={() => setPanel("zlecaf")}
            eyebrow={eb.zlecaf}
            title={byId("zlecaf").shortTitle}
            hint={d.hintExplore}
            motif={<StudyMotif />}
            className="min-h-[12rem] lg:col-span-4"
          />

          {/* WTC — towers motif */}
          <Tile
            index={4}
            onClick={() => setPanel("wtc")}
            eyebrow={eb.wtc}
            title={byId("wtc").shortTitle}
            hint={d.hintExplore}
            motif={<TowersMotif />}
            className="min-h-[12rem] lg:col-span-4"
          />

          {/* Entrepreneuriat — bubbles motif */}
          <Tile
            index={5}
            onClick={() => setPanel("entrepreneuriat")}
            eyebrow={eb.entrepreneuriat}
            title={byId("entrepreneuriat").shortTitle}
            hint={d.hintExplore}
            motif={<BubblesMotif />}
            className="min-h-[12rem] lg:col-span-4"
          />

          {/* Expertise — domains motif */}
          <Tile
            index={6}
            onClick={() => setPanel("expertise")}
            eyebrow={eb.expertise}
            title={dict.expertise.title}
            hint={d.hintExplore}
            motif={<DomainsMotif />}
            className="min-h-[10rem] lg:col-span-6"
          />

          {/* Contact */}
          <Tile
            index={7}
            onClick={() => setPanel("contact")}
            eyebrow={eb.contact}
            title={dict.contact.title}
            hint={d.hintContact}
            className="min-h-[10rem] lg:col-span-6"
          />
        </div>
      </section>

      <Panel
        open={panel !== null}
        onClose={() => setPanel(null)}
        title={panelTitle}
        eyebrow={panelEyebrow}
        closeLabel={dict.common.close}
      >
        {renderPanelContent()}
      </Panel>
    </>
  );
}
