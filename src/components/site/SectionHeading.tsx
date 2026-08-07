import { cn } from "@/lib/utils";
import KineticHeadline, { type HeadlineSegment } from "@/components/fx/KineticHeadline";
import ScrambleText from "@/components/fx/ScrambleText";
import Reveal from "@/components/fx/Reveal";

interface SectionHeadingProps {
  index: string;
  code: string;
  segments: HeadlineSegment[];
  description?: string;
  className?: string;
}

/** Editorial section header: index rule on top, headline + description split below. */
export default function SectionHeading({ index, code, segments, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone/45">
        <span className="text-solar">{index}</span>
        <ScrambleText text={code} />
        <span className="h-px flex-1 bg-bone/10" />
        <span className="hidden sm:inline">CSY</span>
      </div>
      <div className="mt-7 grid items-end gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        <KineticHeadline
          as="h2"
          mode="inview"
          segments={segments}
          className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.02em] text-bone"
        />
        {description ? (
          <Reveal delay={0.15}>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-bone/55 lg:justify-self-end">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
