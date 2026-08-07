import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_INOUT } from "@/lib/motion";
import { itemListJsonLd } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import CTASection from "@/components/site/CTASection";
import TagCardGrid, { type TagCardItem } from "@/components/site/TagCards";
import Figure from "@/components/site/Figure";
import Btn from "@/components/fx/Btn";
import Reveal from "@/components/fx/Reveal";

interface ServiceItem {
  title: string;
  body: string;
  points: string[];
  img: { src: string; alt: string; caption: string };
}

const SERVICES: ServiceItem[] = [
  {
    title: "Frontend Development (Websites & Web Apps)",
    body: "Responsive builds with smooth transitions, strong accessibility, and performance that holds up on real devices.",
    points: [
      "Landing pages, corporate sites, dashboards",
      "UI components, animations, micro-interactions",
      "SEO foundations and content-ready structure",
    ],
    img: {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
      alt: "Laptop on a studio desk running a production frontend codebase",
      caption: "Frontend in production",
    },
  },
  {
    title: "UI/UX Design & Brand Presence",
    body: "Design systems and layouts that make your value obvious — and move users toward clear actions.",
    points: [
      "Wireframes, high-fidelity UI, design systems",
      "Messaging hierarchy + conversion-oriented structure",
      "Brand consistency across pages and platforms",
    ],
    img: {
      src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1600&auto=format&fit=crop",
      alt: "Designer sketching a mobile interface wireframe by hand",
      caption: "Interface planning",
    },
  },
  {
    title: "Database Management & Business Data",
    body: "Reliable data structures and tooling so your business can track, automate, and scale without chaos.",
    points: [
      "Data modeling, optimization, migrations",
      "Admin views, reporting, dashboards",
      "Backups, access control, data hygiene",
    ],
    img: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
      alt: "Macro shot of a circuit board — the data layer up close",
      caption: "Data infrastructure",
    },
  },
  {
    title: "Hosting, Deployment & Maintenance",
    body: "From launch to uptime: we deploy cleanly and keep things stable.",
    points: [
      "Hosting setup, deployment workflow, domain & SSL",
      "Monitoring, performance tuning, security checks",
      "Ongoing maintenance plans and support",
    ],
    img: {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
      alt: "Server racks wired with network cables and status LEDs",
      caption: "Live infrastructure",
    },
  },
];

const TRUST_CARDS: TagCardItem[] = [
  {
    tag: "Proof",
    title: "Case studies & testimonials",
    body: "We can help you present results clearly — what changed, what improved, and why it matters.",
    accent: "azure",
  },
  {
    tag: "Clarity",
    title: "Process & deliverables",
    body: "A transparent workflow that clients understand: scope, timeline, milestones, and success metrics.",
    accent: "solar",
  },
  {
    tag: "Growth",
    title: "SEO, analytics & iteration",
    body: "Track what matters and improve continuously — content, UX, speed, and conversion.",
    accent: "pulse",
  },
];

function ServiceAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-b border-bone/10">
      {SERVICES.map((item, i) => {
        const open = openIndex === i;
        return (
          <Reveal key={item.title} delay={i * 0.06}>
            <div className="border-t border-bone/10">
              <button
                type="button"
                className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-8"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
              >
                <span className="w-12 shrink-0 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-bone/35">
                  S.0{i + 1}
                </span>
                <span
                  className={cn(
                    "flex-1 font-display text-[clamp(1.15rem,2.6vw,1.85rem)] font-semibold leading-tight tracking-[-0.01em] transition-colors duration-300",
                    open ? "text-solar" : "text-bone group-hover:text-solar",
                  )}
                >
                  {item.title}
                </span>
                <span
                  className={cn(
                    "relative grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 md:size-11",
                    open
                      ? "border-solar bg-solar text-carbon"
                      : "border-bone/20 text-bone group-hover:border-bone/60",
                  )}
                >
                  <motion.span
                    className="absolute h-[1.5px] w-4 bg-current"
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_INOUT }}
                  />
                  <motion.span
                    className="absolute h-[1.5px] w-4 bg-current"
                    animate={{ rotate: open ? 135 : 90 }}
                    transition={{ duration: 0.4, ease: EASE_INOUT }}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="panel"
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE_INOUT }}
                  >
                    <div className="pb-8 md:pb-10 md:pl-20">
                      <Figure
                        src={item.img.src}
                        alt={item.img.alt}
                        code={`REC.0${i + 1}`}
                        caption={item.img.caption}
                        className="aspect-[16/9] md:aspect-[21/8]"
                      />
                      <div className="mt-7 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
                        <p className="max-w-md text-[0.95rem] leading-relaxed text-bone/55">
                          {item.body}
                        </p>
                        <ul className="space-y-3.5">
                          {item.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-3.5 text-[0.93rem] leading-relaxed text-bone/80"
                            >
                              <span className="mt-[0.42rem] size-1.5 shrink-0 rotate-45 bg-solar" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <PageShell
      title="Services • Causality Studios"
      description="Causality services: frontend development, UI/UX design, database management, hosting, deployment & maintenance. Full-stack support built to scale."
      path="/services"
      jsonLd={itemListJsonLd(
        SERVICES.map((service) => ({
          name: service.title,
          description: service.body,
        })),
      )}
    >
      <PageHero
        segments={[
          { text: "Full-stack support for brands that want to" },
          { text: "scale.", className: "hl-serif" },
        ]}
        lead="We help businesses move from “we need a website” to “we run on a system.” From design and frontend development to databases, hosting, and ongoing improvement."
        actions={
          <>
            <Btn to="/contact" variant="primary" size="lg">
              Request a Quote
            </Btn>
            <Btn to="#service-breakdown" variant="ghost" size="lg">
              See Breakdown
            </Btn>
          </>
        }
        meta={[
          { k: "Delivery", v: "Fast iterations • Clear comms" },
          { k: "Focus", v: "Outcome-driven • Built to last" },
        ]}
        panel={{
          code: "ENGAGEMENT",
          title: "What you get",
          body: "A practical partnership: design quality, engineering discipline, and resilience in production.",
          stats: [
            { k: "Design", v: "UX • UI • Brand consistency" },
            { k: "Engineering", v: "Code • Data • Hosting" },
          ],
        }}
      />

      {/* SEC.01 — Breakdown */}
      <section className="shell py-20 md:py-28" id="service-breakdown">
        <SectionHeading
          index="01"
          code="BREAKDOWN"
          segments={[
            { text: "Services that cover the" },
            { text: "full business stack.", className: "hl-serif" },
          ]}
          description="Use us for a single focused engagement — or for end-to-end build, launch, and support."
        />
        <ServiceAccordion />
      </section>

      {/* SEC.02 — Also included */}
      <section className="relative border-y border-bone/10 bg-surface/60">
        <div className="shell py-20 md:py-28">
          <SectionHeading
            index="02"
            code="ALSO INCLUDED"
            segments={[
              { text: "Extra factors that strengthen" },
              { text: "trust and conversion.", className: "hl-serif" },
            ]}
            description="These are often the difference between a “nice website” and a system that wins business."
          />
          <TagCardGrid items={TRUST_CARDS} />
        </div>
      </section>

      <div className="pt-20 md:pt-28">
        <CTASection
          title="Let’s map the cause → effect."
          description="Share your goals and current constraints. We’ll respond with a plan, timeline, and the best path to scale."
          secondary={{ label: "Browse Solutions", to: "/solutions" }}
          primary={{ label: "Contact Causality", to: "/contact" }}
        />
      </div>
    </PageShell>
  );
}
