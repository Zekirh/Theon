import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import Cross from "@/components/fx/Cross";

interface FigureProps {
  src: string;
  alt: string;
  /** Mono index label, e.g. "FIG.01 // FIELD RECORD" */
  code: string;
  /** Short mono caption shown bottom-right */
  caption: string;
  /** Controls the frame ratio, e.g. "aspect-[16/10]" */
  className?: string;
  /** Subtle scroll parallax inside the frame */
  parallax?: boolean;
  eager?: boolean;
}

/**
 * Instrument-style photographic figure: desaturated and dimmed by default,
 * warming toward full color on hover, with crosshair corners and a mono
 * caption bar — so photography reads as studio field records, not stock.
 */
export default function Figure({
  src,
  alt,
  code,
  caption,
  className,
  parallax = false,
  eager = false,
}: FigureProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const withParallax = parallax && !reduced;

  return (
    <figure
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-bone/10 bg-raised",
        className,
      )}
    >
      <motion.div className="absolute inset-0" style={withParallax ? { y, scale: 1.14 } : undefined}>
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          className="h-full w-full object-cover grayscale brightness-[0.82] contrast-[1.06] transition-[filter] duration-700 ease-out group-hover:grayscale-[0.15] group-hover:brightness-[0.94]"
        />
      </motion.div>

      {/* Amber instrument wash + legibility gradient */}
      <div className="pointer-events-none absolute inset-0 bg-solar/10 mix-blend-overlay" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/80 via-carbon/10 to-carbon/25"
        aria-hidden
      />

      <Cross className="left-4 top-4 text-bone/40" />
      <Cross className="right-4 top-4 text-bone/40" />

      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-5 py-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-bone/80">{code}</span>
        <span className="flex items-center gap-2.5 text-right font-mono text-[0.58rem] uppercase tracking-[0.18em] text-bone/60">
          <span className="size-1.5 rounded-full bg-solar" aria-hidden />
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
