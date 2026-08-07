import { type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}

/** Infinite horizontal scroll strip (content is duplicated for the loop). */
export default function Marquee({ children, className, duration = 26, reverse = false }: MarqueeProps) {
  return (
    <div className={cn("relative flex w-full overflow-hidden", className)}>
      <div
        className={cn("marquee-track flex w-max items-center", reverse && "marquee-reverse")}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
