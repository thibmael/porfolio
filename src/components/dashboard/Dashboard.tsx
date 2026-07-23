"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/missions-types";
import { Panel } from "./Panel";
import { Counter } from "@/components/home/Counter";
import { Cover, type CoverVariant } from "@/components/visual/covers";
import { ProjectCard } from "@/components/visual/ProjectCard";
import { MissionDetail } from "./panels/MissionDetail";
import { RecherchePanel } from "./panels/RecherchePanel";
import { ExpertisePanel } from "./panels/ExpertisePanel";
import { ContactPanel } from "./panels/ContactPanel";
import { PORTRAIT_URL } from "@/lib/contact-info";

type PanelKey =
  | "zlecaf"
  | "connectivite-maritime"
  | "wtc"
  | "entrepreneuriat"
  | "recherche"
  | "expertise"
  | "contact"
  | null;

const coverFor: Record<Exclude<PanelKey, null>, CoverVariant> = {
  "connectivite-maritime": "maritime",
  zlecaf: "textile",
  wtc: "towers",
  entrepreneuriat: "live",
  recherche: "research",
  expertise: "hero",
  contact: "maritime",
};

export function Dashboard({ dict }: { dict: Dictionary }) {
  const [panel, setPanel] = useState<PanelKey>(null);
  const rm = useReducedMotion();
  const caseStudies = useMemo(
    () => dict.missions.caseStudies as unknown as CaseStudy[],
    [dict]
  );
  const byId = (id: string) => caseStudies.find((c) => c.id === id)!;

  const d = dict.home.dashboard;
  const eb = d.eyebrows;
  const hero = dict.home.hero;

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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Cover variant="hero" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:py-24">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 backdrop-blur-sm sm:h-20 sm:w-20">
              {PORTRAIT_URL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={PORTRAIT_URL} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="font-serif-display text-2xl text-white">TR</span>
              )}
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/80">
              {hero.eyebrow}
            </p>
          </div>

          <div>
            <motion.h1
              initial={rm ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: rm ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-display max-w-4xl text-4xl leading-[1.03] text-white sm:text-6xl"
            >
              {hero.name}
            </motion.h1>
            <p className="measure mt-5 text-lg text-white/90 sm:text-2xl">{hero.positioning}</p>
            <p className="measure mt-3 text-sm text-white/70 sm:text-base">{hero.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            {dict.home.proof.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPanel(statMap[item.id] ?? null)}
                className="group text-left"
              >
                <p className="font-serif-display text-3xl tabular-nums text-white sm:text-4xl">
                  <Counter value={item.number} prefix={item.prefix} suffix={item.suffix} />
                </p>
                <p className="mt-1 text-xs text-white/70 group-hover:text-white">{item.label}</p>
              </button>
            ))}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setPanel("contact")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-(--color-ink) transition-transform hover:-translate-y-0.5"
            >
              {hero.ctaPrimary}
              <span aria-hidden="true">→</span>
            </button>
            <p className="mt-2 text-xs text-white/60">{hero.ctaNote}</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs font-medium uppercase tracking-widest text-(--color-ink-soft)">
          {dict.missions.title}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <ProjectCard
            index={0}
            onClick={() => setPanel("connectivite-maritime")}
            eyebrow={eb.connectivite}
            title={byId("connectivite-maritime").shortTitle}
            hint={d.hintExplore}
            variant="maritime"
            className="h-72 sm:h-80"
          />
          <ProjectCard
            index={1}
            onClick={() => setPanel("zlecaf")}
            eyebrow={eb.zlecaf}
            title={byId("zlecaf").shortTitle}
            hint={d.hintExplore}
            variant="textile"
            className="h-72 sm:h-80"
          />
          <ProjectCard
            index={2}
            onClick={() => setPanel("wtc")}
            eyebrow={eb.wtc}
            title={byId("wtc").shortTitle}
            hint={d.hintExplore}
            variant="towers"
            className="h-72 sm:h-80"
          />
          <ProjectCard
            index={3}
            onClick={() => setPanel("entrepreneuriat")}
            eyebrow={eb.entrepreneuriat}
            title={byId("entrepreneuriat").shortTitle}
            hint={d.hintExplore}
            variant="live"
            className="h-72 sm:h-80"
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <ProjectCard
            index={4}
            onClick={() => setPanel("recherche")}
            eyebrow={eb.recherche}
            title={dict.recherche.title}
            hint={d.hintExplore}
            variant="research"
            className="h-56 sm:col-span-2"
          />
          <ProjectCard
            index={5}
            onClick={() => setPanel("expertise")}
            eyebrow={eb.expertise}
            title={dict.expertise.title}
            hint={d.hintExplore}
            variant="hero"
            className="h-56"
          />
        </div>

        {/* Contact strip */}
        <button
          type="button"
          onClick={() => setPanel("contact")}
          className="group relative mt-5 flex w-full flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl bg-[#1e3145] p-6 text-left sm:flex-row sm:items-center"
        >
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-white/70">
              {eb.contact}
            </p>
            <p className="font-serif-display mt-1 text-2xl text-white">{hero.ctaPrimary}</p>
          </div>
          <span className="relative inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition-transform group-hover:-translate-y-0.5">
            {d.hintContact}
            <span aria-hidden="true">→</span>
          </span>
        </button>
      </section>

      <Panel
        open={panel !== null}
        onClose={() => setPanel(null)}
        title={panelTitle}
        eyebrow={panelEyebrow}
        closeLabel={dict.common.close}
        banner={panel ? <Cover variant={coverFor[panel]} /> : undefined}
      >
        {renderPanelContent()}
      </Panel>
    </>
  );
}
