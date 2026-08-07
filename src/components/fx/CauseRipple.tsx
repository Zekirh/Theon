import { cn } from "@/lib/utils";

type RippleTone = "solar" | "azure" | "pulse";

interface CauseRippleProps {
  className?: string;
  tone?: RippleTone;
  rings?: number;
}

const RING_CLASS: Record<RippleTone, string> = {
  solar: "",
  azure: "ripple-ring-azure",
  pulse: "ripple-ring-pulse",
};

const DOT_CLASS: Record<RippleTone, string> = {
  solar: "bg-solar",
  azure: "bg-azure",
  pulse: "bg-pulse",
};

/** Concentric expanding rings — the cause-and-effect signature flourish. */
export default function CauseRipple({ className, tone = "solar", rings = 4 }: CauseRippleProps) {
  return (
    <div className={cn("pointer-events-none absolute", className)} aria-hidden>
      {Array.from({ length: rings }).map((_, i) => (
        <span
          key={i}
          className={cn("ripple-ring", RING_CLASS[tone])}
          style={{ animationDelay: `${i * 1.15}s` }}
        />
      ))}
      <span
        className={cn(
          "absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
          DOT_CLASS[tone],
        )}
      />
    </div>
  );
}
