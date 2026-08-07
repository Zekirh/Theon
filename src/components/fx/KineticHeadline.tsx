import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

export interface HeadlineSegment {
  text: string;
  className?: string;
}

interface KineticHeadlineProps {
  segments: HeadlineSegment[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  /** "mount" animates immediately, "inview" waits for the viewport. */
  mode?: "mount" | "inview";
  stagger?: number;
}

/**
 * Masked word-by-word kinetic headline — every word rises out of a clipped
 * box with a slight rotation, staggered across the line.
 */
export default function KineticHeadline({
  segments,
  className,
  delay = 0,
  as = "h1",
  mode = "mount",
  stagger = 0.05,
}: KineticHeadlineProps) {
  const reduced = useReducedMotion();
  const Tag = as;

  const words: { word: string; className?: string }[] = [];
  segments.forEach((segment) => {
    segment.text
      .split(" ")
      .filter(Boolean)
      .forEach((word) => words.push({ word, className: segment.className }));
  });

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className={w.className}>{w.word}</span>{" "}
          </Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={cn("inline-block will-change-transform", w.className)}
              initial={{ y: "115%", rotate: 2.2 }}
              {...(mode === "mount"
                ? { animate: { y: "0%", rotate: 0 } }
                : {
                    whileInView: { y: "0%", rotate: 0 },
                    viewport: { once: true, margin: "0px 0px -8% 0px" },
                  })}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + i * stagger }}
            >
              {w.word}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}
