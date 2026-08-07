import { cn } from "@/lib/utils";
import Reveal from "@/components/fx/Reveal";

export interface StepItem {
  num: string;
  title: string;
  body: string;
}

interface StepsProps {
  items: StepItem[];
  /** Background class used to mask the dashed line behind the numbers. */
  maskClass?: string;
}

/** Three-step process row with a dashed connector and traveling pulse. */
export default function Steps({ items, maskClass = "bg-carbon" }: StepsProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-10 hidden border-t border-dashed border-bone/20 md:block" aria-hidden />
      <span
        className="travel-dot absolute top-10 hidden size-2 -translate-y-1/2 rounded-full bg-solar md:block"
        aria-hidden
      />
      <div className="grid gap-12 md:grid-cols-3 md:gap-8">
        {items.map((step, i) => (
          <Reveal key={step.num} delay={i * 0.12} className="relative">
            <div className={cn("relative inline-block pr-5", maskClass)}>
              <span className="text-stroke-bone font-display text-[4.2rem] font-bold leading-none tracking-tight md:text-[4.8rem]">
                {step.num}
              </span>
              <span className="absolute -right-0.5 top-1 size-2 rounded-full bg-solar" aria-hidden />
            </div>
            <h3 className="mt-5 font-display text-[1.35rem] font-semibold tracking-[-0.01em] text-bone">
              {step.title}
            </h3>
            <p className="mt-2.5 max-w-sm text-[0.94rem] leading-relaxed text-bone/55">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
