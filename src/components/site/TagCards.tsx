import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import GlowCard from "@/components/fx/GlowCard";
import Reveal from "@/components/fx/Reveal";

export interface TagCardItem {
  tag: string;
  title: string;
  body: string;
  accent: "solar" | "azure" | "pulse";
  /** Optional photographic header rendered full-bleed at the top of the card */
  image?: { src: string; alt: string };
}

const ACCENT_DOT: Record<TagCardItem["accent"], string> = {
  solar: "bg-solar",
  azure: "bg-azure",
  pulse: "bg-pulse",
};

interface TagCardGridProps {
  items: TagCardItem[];
}

/** Grid of glow cards with mono kickers, ghost indices, and module footers. */
export default function TagCardGrid({ items }: TagCardGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % 3) * 0.1} className="h-full">
          <GlowCard className="group flex h-full flex-col p-7 md:p-8">
            {item.image && (
              <div className="relative -mx-7 -mt-7 mb-7 h-44 overflow-hidden rounded-t-[1.25rem] border-b border-bone/10 md:-mx-8 md:-mt-8">
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale brightness-[0.8] contrast-[1.06] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-[0.2] group-hover:brightness-[0.92]"
                />
                <div className="pointer-events-none absolute inset-0 bg-solar/10 mix-blend-overlay" aria-hidden />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <span className="flex items-center gap-2.5 pt-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/50">
                <span className={cn("size-1.5 rounded-full", ACCENT_DOT[item.accent])} />
                {item.tag}
              </span>
              <span className="text-stroke-bone-soft font-display text-4xl font-bold leading-none">
                {String(i + 1).padStart(3, "0")}
              </span>
            </div>
            <h3 className="mt-8 font-display text-[1.32rem] font-semibold leading-snug tracking-[-0.01em] text-bone">
              {item.title}
            </h3>
            <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-bone/55">{item.body}</p>
            <div className="mt-8 flex items-center justify-between border-t border-bone/10 pt-5">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-bone/35">
                Module / {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-bone/15 text-bone transition-all duration-300 group-hover:border-solar group-hover:bg-solar group-hover:text-carbon">
                <ArrowUpRight className="size-4" strokeWidth={1.8} />
              </span>
            </div>
          </GlowCard>
        </Reveal>
      ))}
    </div>
  );
}
