import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import KineticHeadline, { type HeadlineSegment } from "@/components/fx/KineticHeadline";
import Reveal from "@/components/fx/Reveal";
import CauseRipple from "@/components/fx/CauseRipple";
import Cross from "@/components/fx/Cross";

export interface HeroStat {
  k: string;
  v: string;
}

interface PageHeroProps {
  segments: HeadlineSegment[];
  lead: string;
  actions: ReactNode;
  meta: HeroStat[];
  panel: {
    code: string;
    title: string;
    body: ReactNode;
    stats: HeroStat[];
  };
  home?: boolean;
}

/**
 * Shared hero: a full-bleed editorial headline, a lead/meta split row,
 * and a wide instrument band that carries the page's key panel content.
 */
export default function PageHero({ segments, lead, actions, meta, panel, home = false }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Atmosphere */}
      <div className="bp-grid bp-fade absolute inset-0" aria-hidden />
      <div
        className="absolute -top-56 right-[-14%] size-[560px] rounded-full bg-solar/[0.08] blur-[130px]"
        aria-hidden
      />
      <div
        className="absolute -bottom-44 left-[-12%] size-[460px] rounded-full bg-azure/[0.07] blur-[130px]"
        aria-hidden
      />

      <div className={cn("shell relative pb-20 md:pb-24", home ? "pt-36 md:pt-44" : "pt-32 md:pt-40")}>
        {/* Headline */}
        <KineticHeadline
          segments={segments}
          delay={0.15}
          mode="mount"
          className={cn(
            "font-display font-bold leading-[0.98] tracking-[-0.03em] text-bone",
            home
              ? "max-w-[13ch] text-[clamp(3rem,8.6vw,7rem)]"
              : "max-w-[16ch] text-[clamp(2.5rem,6.4vw,5.2rem)]",
          )}
        />

        {/* Lead + actions | meta */}
        <div className="mt-10 grid gap-10 border-t border-bone/10 pt-8 md:mt-14 md:pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal delay={0.5}>
              <p className="max-w-xl text-[1.04rem] leading-relaxed text-bone/60">{lead}</p>
            </Reveal>
            <Reveal delay={0.62}>
              <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.72}>
              <dl className="divide-y divide-bone/10 border-y border-bone/10">
                {meta.map((item) => (
                  <div key={item.k} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/40">
                      {item.k}
                    </dt>
                    <dd className="text-right text-sm font-medium leading-snug text-bone/80">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Instrument band */}
        <Reveal delay={0.84} y={36}>
          <div className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-bone/10 bg-surface md:mt-20">
            <CauseRipple className="right-[-140px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 opacity-50" />
            <Cross className="left-4 top-4" />
            <Cross className="right-4 top-4" />
            <Cross className="bottom-4 left-4" />
            <Cross className="bottom-4 right-4" />

            <div className="relative grid gap-8 p-7 md:p-9 lg:grid-cols-[0.85fr_1.15fr_0.95fr] lg:items-center lg:gap-10">
              <div>
                <div className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/40">
                  <span>{panel.code}</span>
                  <span className="animate-blink inline-block h-3 w-1.5 bg-solar" aria-hidden />
                </div>
                <h2 className="mt-4 font-display text-[1.7rem] font-semibold leading-tight tracking-[-0.01em] text-bone">
                  {panel.title}
                </h2>
              </div>

              <div className="text-[0.95rem] leading-relaxed text-bone/55 lg:border-l lg:border-bone/10 lg:pl-10">
                {panel.body}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {panel.stats.map((stat) => (
                  <div key={stat.k} className="rounded-2xl border border-bone/10 bg-carbon/60 p-4">
                    <p className="font-display text-lg font-semibold text-solar">{stat.k}</p>
                    <p className="mt-1.5 font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.14em] text-bone/50">
                      {stat.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
