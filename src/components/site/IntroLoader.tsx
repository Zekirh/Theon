import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { EASE_INOUT } from "@/lib/motion";
import ScrambleText from "@/components/fx/ScrambleText";

interface IntroLoaderProps {
  /** Fired when the counter completes — mount the app behind the panel. */
  onReveal: () => void;
  /** Fired when the wipe finishes — unmount the loader. */
  onDone: () => void;
}

/** First-visit intro: brand mark, decoding label, 0→100 counter, wipe-away. */
export default function IntroLoader({ onReveal, onDone }: IntroLoaderProps) {
  const [count, setCount] = useState<number>(0);
  const [leaving, setLeaving] = useState<boolean>(false);
  const revealFired = useRef<boolean>(false);

  useEffect(() => {
    try {
      sessionStorage.setItem("cs-intro-played", "1");
    } catch {
      // Storage unavailable — the intro may replay next load, which is fine.
    }

    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    let timeout = 0;

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else if (!revealFired.current) {
        revealFired.current = true;
        timeout = window.setTimeout(() => {
          onReveal();
          setLeaving(true);
        }, 240);
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, [onReveal]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] overflow-hidden bg-carbon text-bone"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.85, ease: EASE_INOUT }}
      onAnimationComplete={() => {
        if (leaving) onDone();
      }}
    >
      <div className="bp-grid absolute inset-0" aria-hidden />

      {/* Brand mark + rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative mx-auto grid size-28 place-items-center">
          <span className="ripple-ring" />
          <span className="ripple-ring" style={{ animationDelay: "1.5s" }} />
          <span className="relative grid size-16 place-items-center rounded-2xl bg-solar font-display text-3xl font-bold text-carbon-ink">
            C
          </span>
        </div>
        <p className="mt-7 text-center font-mono text-[0.62rem] uppercase tracking-[0.26em] text-bone/60">
          <ScrambleText text="PANTHEON // STUDIOS" duration={1150} />
        </p>
      </div>

      {/* Counter */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-7 md:px-10 md:pb-9">
        <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-bone/50">
          Forcing change…
        </p>
        <span className="font-display text-[clamp(4rem,12vw,7.5rem)] font-bold leading-none tracking-tight tabular-nums">
          {count}
          <span className="text-solar">%</span>
        </span>
      </div>

      {/* Progress hairline */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-bone/10">
        <div
          className="h-full bg-solar transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
}
