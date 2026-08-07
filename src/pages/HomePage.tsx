import { MoveRight } from "lucide-react";

import { professionalServiceJsonLd, websiteJsonLd } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import CTASection from "@/components/site/CTASection";
import Steps from "@/components/site/Steps";
import TagCardGrid, { type TagCardItem } from "@/components/site/TagCards";
import Figure from "@/components/site/Figure";
import Btn from "@/components/fx/Btn";
import GlowCard from "@/components/fx/GlowCard";
import Marquee from "@/components/fx/Marquee";
import Reveal from "@/components/fx/Reveal";

const MARQUEE_ITEMS = [
  "We Force Change",
  "Built to Scale",
  "Cause → Effect → Momentum",
  "Web • Systems • Data",
  "Design for Growth",
] as const;

const MODEL_NODES = [
  {
    phase: "Phase 01",
    word: "Cause",
    sub: "Input // Root problem",
    shape: "circle",
  },
  {
    phase: "Phase 02",
    word: "Effect",
    sub: "Output // Measurable shift",
    shape: "square",
  },
  {
    phase: "Phase 03",
    word: "Momentum",
    sub: "Loop // Compounding growth",
    shape: "triangle",
  },
] as const;

const SERVICE_CARDS: TagCardItem[] = [
  {
    tag: "Digital presence",
    title: "Websites & Frontend Development",
    body: "Responsive, high-performance websites and web apps with strong aesthetics, smooth transitions, and conversion-focused UX.",
    accent: "azure",
  },
  {
    tag: "Systems & data",
    title: "Database Management & Integrations",
    body: "Data models, dashboards, admin tools, automation, and integrations that reduce manual work and improve visibility.",
    accent: "solar",
  },
  {
    tag: "Scale & stability",
    title: "Hosting, Maintenance & Reliability",
    body: "Deployment, monitoring, performance tuning, backups, and ongoing support — built for uptime and growth.",
    accent: "pulse",
  },
];

const WORK_STEPS = [
  {
    num: "01",
    title: "Discover",
    body: "We define goals, users, constraints, and success metrics — so every decision has a reason.",
  },
  {
    num: "02",
    title: "Design & Build",
    body: "We create the interface and the system together: fast UI, clean data, scalable architecture.",
  },
  {
    num: "03",
    title: "Launch & Scale",
    body: "We deploy, monitor, iterate, and improve — turning feedback into momentum.",
  },
];

function ModelShape({
  shape,
}: {
  shape: (typeof MODEL_NODES)[number]["shape"];
}) {
  if (shape === "circle") {
    return (
      <span className="block size-10 rounded-full border-[3px] border-azure transition-transform duration-700 group-hover:scale-110" />
    );
  }
  if (shape === "square") {
    return (
      <span className="block size-10 bg-solar transition-transform duration-700 group-hover:rotate-90" />
    );
  }
  return (
    <span
      className="block size-10 bg-pulse transition-transform duration-700 group-hover:rotate-180"
      style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
    />
  );
}

export default function HomePage() {
  return (
    <PageShell
      title="Codecraft • We Force Change"
      description="Codecraft provides business-ready digital solutions: web experiences, scalable systems, database management, hosting, and growth-focused design. We build to scale. We force change."
      path="/"
      jsonLd={[professionalServiceJsonLd(), websiteJsonLd()]}
    >
      <PageHero
        home
        segments={[
          { text: "We" },
          { text: "force change", className: "hl-serif" },
          { text: "for every growing business." },
        ]}
        lead="Codecraft provides end-to-end digital solutions — from responsive web experiences to scalable databases, hosting, and operational systems that keep teams moving… Forcing Change. We believe that change responds to actions. Visions are only hopes yet to be realised. We introduce the force that brings the vision about."
        actions={
          <>
            <Btn to="/services" variant="primary" size="lg">
              Explore Services
            </Btn>
            <Btn to="/contact" variant="ghost" size="lg">
              Start a Project
            </Btn>
          </>
        }
        meta={[
          { k: "We build", v: "Websites • Apps • Systems" },
          { k: "We scale", v: "Data • Hosting • Operations" },
        ]}
        panel={{
          code: "BUILT-TO-SCALE",
          title: "Built to Scale",
          body: "Digital presence is only the beginning. We design for growth, build for resilience, and solve the management problems that slow businesses down.",
          stats: [
            { k: "Build", v: "Frontend • UI/UX • Performance" },
            { k: "Run", v: "Database • Hosting • Support" },
          ],
        }}
      />

      {/* Marquee strip — bright band on the dark canvas */}
      <div className="bg-bone py-5 text-carbon md:py-6">
        <Marquee duration={32}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="flex items-baseline">
              <span
                className={
                  i % 2 === 1
                    ? "text-stroke-carbon whitespace-nowrap px-7 font-display text-xl font-bold uppercase tracking-tight md:text-2xl"
                    : "whitespace-nowrap px-7 font-display text-xl font-bold uppercase tracking-tight text-carbon md:text-2xl"
                }
              >
                {item}
              </span>
              <span
                className="font-serif text-lg italic leading-none text-carbon/40 md:text-xl"
                aria-hidden
              >
                /
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Field record — the studio at work */}
      <section className="shell pt-16 md:pt-24">
        <Reveal y={36}>
          <Figure
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
            alt="Top-down view of the studio team building across multiple laptops at one desk"
            code="FIG.01 // FIELD RECORD"
            caption="The studio in motion"
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            parallax
          />
        </Reveal>
      </section>

      {/* SEC.01 — Codecraft model */}
      <section className="shell py-20 md:py-28">
        <SectionHeading
          index="01"
          code="CODECRAFT MODEL"
          segments={[
            { text: "Cause. Effect." },
            { text: "Momentum.", className: "hl-serif" },
          ]}
          description="We start with the root cause, then build the system that creates a measurable effect — faster operations, cleaner data, and stronger growth."
        />

        <div className="relative">
          <div
            className="absolute left-6 right-6 top-1/2 hidden border-t border-dashed border-bone/20 md:block"
            aria-hidden
          />
          <span
            className="travel-dot absolute top-1/2 hidden size-2 -translate-y-1/2 rounded-full bg-solar md:block"
            aria-hidden
          />
          <div className="grid gap-5 md:grid-cols-3">
            {MODEL_NODES.map((node, i) => (
              <Reveal key={node.word} delay={i * 0.12} className="relative">
                <GlowCard className="group relative z-10 p-8">
                  {i < MODEL_NODES.length - 1 && (
                    <span
                      className="absolute -right-[1.75rem] top-1/2 z-20 hidden size-9 -translate-y-1/2 place-items-center rounded-full bg-bone text-carbon shadow-lg md:grid"
                      aria-hidden
                    >
                      <MoveRight className="size-4" strokeWidth={1.8} />
                    </span>
                  )}
                  <div className="flex items-start justify-between">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/45">
                      {node.phase}
                    </p>
                    <ModelShape shape={node.shape} />
                  </div>
                  <h3 className="mt-10 font-display text-[2rem] font-bold tracking-[-0.01em] text-bone md:text-[2.3rem]">
                    {node.word}
                  </h3>
                  <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/50">
                    {node.sub}
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEC.02 — What we do */}
      <section className="relative border-y border-bone/10 bg-surface/60">
        <div className="shell py-20 md:py-28">
          <SectionHeading
            index="02"
            code="WHAT WE DO"
            segments={[
              { text: "Services designed to create" },
              { text: "measurable", className: "hl-serif" },
              { text: "business outcomes." },
            ]}
            description="From first impression to back-office flow, we turn problems into systems — and systems into results."
          />
          <TagCardGrid items={SERVICE_CARDS} />
        </div>
      </section>

      {/* SEC.03 — How we work */}
      <section className="shell py-20 md:py-28">
        <SectionHeading
          index="03"
          code="HOW WE WORK"
          segments={[
            { text: "Clarity first. Execution next." },
            { text: "Growth always.", className: "hl-serif" },
          ]}
          description="A simple process that keeps delivery fast, communication clear, and outcomes measurable."
        />
        <Steps items={WORK_STEPS} />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <Reveal y={30}>
            <Figure
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
              alt="Dark analytics dashboard tracking product performance week over week"
              code="FIG.02"
              caption="Measurable outcomes"
              className="aspect-[16/10]"
            />
          </Reveal>
          <Reveal y={30} delay={0.12}>
            <Figure
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop"
              alt="Close-up of production code running on a monitor"
              code="FIG.03"
              caption="Code that holds up"
              className="aspect-[16/10]"
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to provoke results?"
        description="Tell us what you’re building — and what’s currently slowing your business down."
        secondary={{ label: "See Solutions", to: "/solutions" }}
        primary={{ label: "Contact Codecraft", to: "/contact" }}
      />
    </PageShell>
  );
}
