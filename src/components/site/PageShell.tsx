import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_INOUT } from "@/lib/motion";
import { jumpToTop } from "@/lib/scroll";
import Seo from "@/components/Seo";
import Footer from "./Footer";

/** Module-level flag: false only for the very first page of the session. */
let hasNavigated = false;

interface PageShellProps {
  title: string;
  children: ReactNode;
  /** SEO meta description for this page. */
  description?: string;
  /** Canonical path for this page, e.g. "/services". */
  path?: string;
  /** Open Graph / Twitter card image URL. */
  image?: string;
  /** Set true to ask crawlers not to index this page. */
  noindex?: boolean;
  /** JSON-LD structured data to inject on this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Wraps every page with the bright shutter transition (sweeps up on exit,
 * peels away on enter) and handles scroll-to-top + document titles.
 */
export default function PageShell({
  title,
  children,
  description,
  path,
  image,
  noindex = false,
  jsonLd,
}: PageShellProps) {
  const reduced = useReducedMotion();
  const [showEnter] = useState<boolean>(() => hasNavigated && !reduced);

  useEffect(() => {
    hasNavigated = true;
    jumpToTop();
  }, []);

  return (
    <>
      {/* Per-page SEO (title, meta, canonical, OG, Twitter, JSON-LD) */}
      <Seo
        title={title}
        description={description}
        path={path}
        image={image}
        noindex={noindex}
        jsonLd={jsonLd}
      />

      {/* Enter shutter: covers the screen, peels upward to reveal the page */}
      {showEnter && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[150] bg-bone"
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.72, ease: EASE_INOUT, delay: 0.06 }}
          aria-hidden
        >
          <span className="absolute bottom-0 left-0 h-1 w-full bg-solar" />
        </motion.div>
      )}

      {/* Exit shutter: sweeps up from the bottom when leaving the page */}
      {!reduced && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[150] bg-bone"
          style={{ transformOrigin: "bottom" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1, transition: { duration: 0.5, ease: EASE_INOUT } }}
          aria-hidden
        >
          <span className="absolute left-0 top-0 h-1 w-full bg-solar" />
        </motion.div>
      )}

      <motion.div
        initial={showEnter ? { opacity: 0 } : false}
        animate={{
          opacity: 1,
          transition: { duration: 0.45, delay: showEnter ? 0.22 : 0 },
        }}
      >
        <main className="relative min-h-screen">{children}</main>
        <Footer />
      </motion.div>
    </>
  );
}
