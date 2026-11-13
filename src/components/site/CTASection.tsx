import Btn from "@/components/fx/Btn";
import Cross from "@/components/fx/Cross";
import KineticHeadline from "@/components/fx/KineticHeadline";
import Reveal from "@/components/fx/Reveal";
import ScrambleText from "@/components/fx/ScrambleText";

interface CTALink {
  label: string;
  to: string;
}

interface CTASectionProps {
  title: string;
  description: string;
  primary: CTALink;
  secondary: CTALink;
  eyebrow?: string;
}

/** Closing statement panel — a bright bone slab on the dark canvas. */
export default function CTASection({
  title,
  description,
  primary,
  secondary,
  eyebrow = "Next action",
}: CTASectionProps) {
  return (
    <section className="shell pb-24 md:pb-32">
      <Reveal>
        <div className="noise relative overflow-hidden rounded-[2rem] bg-bone px-7 py-14 text-carbon-ink md:px-14 md:py-20">
          <div className="bp-grid-ink absolute inset-0" aria-hidden />
          <div
            className="animate-beam absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-solar/40 to-transparent"
            aria-hidden
          />
          <Cross className="left-5 top-5 text-carbon-ink/30" />
          <Cross className="bottom-5 right-5 text-carbon-ink/30" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-carbon-ink/55">
                <ScrambleText text={eyebrow.toUpperCase()} />
              </p>
              <KineticHeadline
                as="h3"
                mode="inview"
                segments={[{ text: title }]}
                className="mt-5 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.03] tracking-[-0.02em] text-carbon-ink"
              />
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-carbon-ink/65">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3 pb-1">
              <Btn to={secondary.to} variant="invertGhost">
                {secondary.label}
              </Btn>
              <Btn to={primary.to} variant="invert">
                {primary.label}
              </Btn>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
