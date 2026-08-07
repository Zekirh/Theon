import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>*+=";

const isStable = (ch: string): boolean => /[^A-Za-z0-9]/.test(ch);

const scrambleAll = (text: string): string =>
  text
    .split("")
    .map((ch) => (isStable(ch) ? ch : POOL[Math.floor(Math.random() * POOL.length)]))
    .join("");

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

/** Decodes text like a readout: random glyphs settle into the real string. */
export default function ScrambleText({ text, className, delay = 0, duration = 850 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -6% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<string>(() => (reduced ? text : scrambleAll(text)));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(text);
      return;
    }

    const start = performance.now() + delay;
    const intervalId = window.setInterval(() => {
      const now = performance.now();
      if (now < start) return;
      const progress = Math.min(1, (now - start) / duration);
      const settled = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text.charAt(i);
        out += i < settled || isStable(ch) ? ch : POOL[Math.floor(Math.random() * POOL.length)];
      }
      setDisplay(progress >= 1 ? text : out);
      if (progress >= 1) window.clearInterval(intervalId);
    }, 34);

    return () => window.clearInterval(intervalId);
  }, [inView, reduced, text, delay, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
