import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { EASE_INOUT, EASE_OUT, SPRING_SNAPPY } from "@/lib/motion";
import { getLenis } from "@/lib/scroll";
import Btn from "@/components/fx/Btn";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

/** Floating dark-glass navigation with animated active indicator + fullscreen mobile menu. */
export default function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[120]">
      <div className="shell">
        <div
          className={cn(
            "mt-4 flex h-16 items-center justify-between rounded-full border border-bone/10 px-5 backdrop-blur-xl transition-all duration-500 md:mt-5 md:px-6",
            scrolled || open
              ? "bg-carbon/85 shadow-[0_22px_60px_-32px_rgba(0,0,0,0.9)]"
              : "bg-carbon/55 shadow-[0_18px_50px_-38px_rgba(0,0,0,0.7)]",
          )}
        >
          {/* Brand */}
          <Link
            to="/"
            className="group flex items-baseline gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-[1.15rem] font-bold tracking-tight text-bone transition-colors duration-300 group-hover:text-solar">
              Codecraft<span className="text-solar">.</span>
            </span>
            <span className="hidden font-mono text-[0.56rem] uppercase tracking-[0.22em] text-bone/40 sm:inline">
              / Studios
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors duration-300",
                    active ? "text-carbon" : "text-bone/65 hover:text-solar",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-bone"
                      transition={SPRING_SNAPPY}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Btn to="/contact" size="sm" variant="primary">
                Start a Project
              </Btn>
            </div>

            {/* Burger */}
            <button
              type="button"
              className="relative grid size-11 place-items-center rounded-full border border-bone/15 bg-surface/80 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              <motion.span
                className="absolute block h-[1.5px] w-5 bg-bone"
                animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3.5 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              />
              <motion.span
                className="absolute block h-[1.5px] w-5 bg-bone"
                animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3.5 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[-1] flex flex-col bg-carbon text-bone"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_INOUT }}
          >
            <div className="bp-grid absolute inset-0" aria-hidden />
            <nav
              className="shell relative z-10 mt-32 flex-1 overflow-y-auto"
              aria-label="Mobile"
            >
              <ul>
                {LINKS.map((link, i) => {
                  const active = location.pathname === link.to;
                  return (
                    <li
                      key={link.to}
                      className="overflow-hidden border-b border-bone/10"
                    >
                      <motion.div
                        initial={{ y: "105%" }}
                        animate={{
                          y: 0,
                          transition: {
                            delay: 0.22 + i * 0.06,
                            duration: 0.7,
                            ease: EASE_OUT,
                          },
                        }}
                        exit={{
                          y: "105%",
                          transition: { duration: 0.25, ease: EASE_INOUT },
                        }}
                      >
                        <Link
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className="group flex items-center justify-between py-4"
                        >
                          <span className="flex items-baseline gap-5">
                            <span className="font-mono text-[0.62rem] text-solar">
                              0{i + 1}
                            </span>
                            <span
                              className={cn(
                                "font-display text-[clamp(2.1rem,8.5vw,3.4rem)] font-bold uppercase leading-none tracking-tight transition-colors duration-300",
                                active
                                  ? "text-solar"
                                  : "text-bone group-hover:text-solar",
                              )}
                            >
                              {link.label}
                            </span>
                          </span>
                          <ArrowUpRight className="size-6 text-bone/40 transition-colors duration-300 group-hover:text-solar" />
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <motion.div
              className="shell relative z-10 flex items-center justify-between pb-9 pt-6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.55, duration: 0.5 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-bone/45">
                We build to scale • We force change
              </p>
              <span className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-pulse">
                <span className="animate-blink size-1.5 rounded-full bg-pulse" />
                Online
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
