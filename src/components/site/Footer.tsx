import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import Marquee from "@/components/fx/Marquee";

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const MARQUEE_WORDS = [
  { text: "Pantheon", outline: false },
  { text: "We Force Change", outline: true },
  { text: "Built to Scale", outline: false },
  { text: "Design for Growth", outline: true },
] as const;

/** Statement footer with an oversized scrolling wordmark. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="noise relative overflow-hidden border-t border-bone/10 bg-surface/40">
      <div className="bp-grid absolute inset-0" aria-hidden />

      <div className="relative">
        <div className="shell grid gap-12 py-16 md:py-20 lg:grid-cols-[1.3fr_0.7fr_0.9fr] lg:gap-8">
          {/* Statement */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-bone">
                Pantheon<span className="text-solar">.</span>
              </span>
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-bone/40">
                / Studios
              </span>
            </div>
            <p className="mt-7 max-w-md font-display text-[1.6rem] font-medium leading-snug tracking-[-0.01em] text-bone">
              We build to scale. We design for growth. We{" "}
              <span className="hl-serif">force change.</span>
            </p>
          </div>

          {/* Index */}
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/40">
              Index
            </p>
            <ul className="mt-5 space-y-3.5">
              {FOOTER_LINKS.map((link, i) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-bone/70 transition-all duration-300 hover:translate-x-1 hover:text-solar"
                  >
                    <span className="text-[0.58rem] text-bone/35 transition-colors duration-300 group-hover:text-solar">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Signal */}
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/40">
              Signal
            </p>
            <Link
              to="/contact"
              className="group mt-5 inline-flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-bone transition-colors duration-300 hover:text-solar"
            >
              Start a Project
              <span className="grid size-9 place-items-center rounded-full border border-bone/25 transition-all duration-300 group-hover:border-solar group-hover:bg-solar group-hover:text-carbon-ink">
                <ArrowUpRight className="size-4" strokeWidth={1.8} />
              </span>
            </Link>
            <div className="mt-7 space-y-2.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bone/45">
              <p>Channels — Email • WhatsApp • CRM</p>
              <p>
                Mode — Cause <span className="text-solar">→</span> Effect
              </p>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="border-y border-bone/10 py-5 md:py-7">
          <Marquee duration={38}>
            {MARQUEE_WORDS.map((word, i) => (
              <span key={i} className="flex items-baseline">
                <span
                  className={
                    word.outline
                      ? "text-stroke-bone whitespace-nowrap px-8 font-display text-[clamp(3.2rem,9vw,7.5rem)] font-bold uppercase leading-none tracking-[-0.02em]"
                      : "whitespace-nowrap px-8 font-display text-[clamp(3.2rem,9vw,7.5rem)] font-bold uppercase leading-none tracking-[-0.02em] text-bone"
                  }
                >
                  {word.text}
                </span>
                <span
                  className="font-serif text-[clamp(2rem,5.5vw,4.4rem)] italic leading-none text-solar/80"
                  aria-hidden
                >
                  /
                </span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* Small print */}
        <div className="shell flex flex-col gap-3 py-7 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Pantheon — We Force Change</p>
          <p className="flex items-center gap-2">
            SYS.Status —<span className="text-pulse">Operational</span>
            <span className="animate-blink size-1.5 rounded-full bg-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
