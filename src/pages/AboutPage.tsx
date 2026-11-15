import { organizationJsonLd } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import CTASection from "@/components/site/CTASection";
import TagCardGrid, { type TagCardItem } from "@/components/site/TagCards";
import Figure from "@/components/site/Figure";
import Btn from "@/components/fx/Btn";
import Reveal from "@/components/fx/Reveal";

const PILLARS: TagCardItem[] = [
  {
    tag: "Talent",
    title: "Skill that shows in the details",
    body: "Strong visuals, clean interfaces, and solid engineering and security choices that perform in the real world.",
    accent: "azure",
  },
  {
    tag: "Resilience",
    title: "Systems that don’t collapse under growth",
    body: "We build with the next stage in mind: structure, maintainability, and reliability.",
    accent: "solar",
  },
  {
    tag: "Outcomes",
    title: "Work that moves business forward",
    body: "Every deliverable connects to a result: conversion, clarity, speed, automation, or reduced friction.",
    accent: "pulse",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About Us"
      description="Pantheon is the embodiment of talent, skill, resilience, and the will to force change. We build trust through execution."
      path="/about"
      jsonLd={organizationJsonLd()}
    >
      <PageHero
        segments={[
          { text: "A brand built on talent, resilience, and the sheer will to" },
          { text: "force change.", className: "hl-serif" },
        ]}
        lead="Pantheon exists to provoke results in an ever-growing business world — building digital presence, designing for growth, solving the operational problems that hold teams back, and identifying vulnerabilities as well as fixing gaps in system security."
        actions={
          <>
            <Btn to="/services" variant="primary" size="lg">
              Our Services
            </Btn>
            <Btn to="/contact" variant="ghost" size="lg">
              Work With Us
            </Btn>
          </>
        }
        meta={[
          { k: "Brand", v: "Business solutions • Built to scale" },
          { k: "Core belief", v: "Every system can be improved, and well secured" },
        ]}
        panel={{
          code: "LEADERSHIP",
          title: "Leadership",
          body: (
            <>
              <span className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-solar font-display text-sm font-bold text-carbon-ink">
                   𝖕
                </ span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/50">
                  Lead team member / developer
                </span>
              </span>
              <span className="mt-4 block">
                Pantheon is led by{" "}
                <strong className="font-semibold text-bone">
                  Phinehas
                </strong>{" "}
                — with a focus on quality delivery and long-term outcomes.
              </span>
            </>
          ),
          stats: [
            { k: "Mindset", v: "Resilience • Security" },
            { k: "Standard", v: "Quality • Consistency" },
          ],
        }}
      />

      {/* Studio records */}
      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal y={30}>
            <Figure
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="The team heads-down around one table, laptops open"
              code="REC.01"
              caption="Talent, together"
              className="aspect-[16/10]"
              parallax
            />
          </Reveal>
          <Reveal y={30} delay={0.12}>
            <Figure
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop"
              alt="Hands on a keyboard, deep in the details of a build"
              code="REC.02"
              caption="Craft in the details"
              className="aspect-[16/10]"
            />
          </Reveal>
        </div>
      </section>

      {/* SEC.01 — What we stand for */}
      <section className="relative border-y border-bone/10 bg-surface/60">
        <div className="shell py-20 md:py-28">
          <SectionHeading
            index="01"
            code="WHAT WE STAND FOR"
            segments={[
              { text: "We build trust through" },
              { text: "execution.", className: "hl-serif" },
            ]}
            description="The brand is proven in the quality of service we provide — and the stability of what we ship."
          />
          <TagCardGrid items={PILLARS} />
        </div>
      </section>

      <div className="pt-20 md:pt-28">
        <CTASection
          title="Want Pantheon on your side?"
          description="Let’s define your goal, then build the system that gets you there."
          secondary={{ label: "Explore Solutions", to: "/solutions" }}
          primary={{ label: "Contact", to: "/contact" }}
        />
      </div>
    </PageShell>
  );
}
