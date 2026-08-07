import { itemListJsonLd } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import CTASection from "@/components/site/CTASection";
import Steps from "@/components/site/Steps";
import TagCardGrid, { type TagCardItem } from "@/components/site/TagCards";
import Btn from "@/components/fx/Btn";

const SOLUTION_CARDS: TagCardItem[] = [
  {
    tag: "Operations",
    title: "Admin panels & reporting dashboards",
    body: "Unified visibility into performance, customers, orders, and team actions — so you can act fast and confidently.",
    accent: "azure",
    image: {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=900&auto=format&fit=crop",
      alt: "A laptop glowing in a dark operations room",
    },
  },
  {
    tag: "Sales",
    title: "CRM & customer lifecycle tools",
    body: "Track leads, follow-ups, and client history. Reduce missed opportunities and keep relationships organized.",
    accent: "solar",
    image: {
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=900&auto=format&fit=crop",
      alt: "A team walking through pipeline numbers in an all-hands meeting",
    },
  },
  {
    tag: "Payments",
    title: "Bookings, invoicing & payment flows",
    body: "Streamline how clients schedule, pay, and receive confirmations — with a clean, trustworthy experience.",
    accent: "pulse",
    image: {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&auto=format&fit=crop",
      alt: "A customer paying by phone at a checkout counter",
    },
  },
  {
    tag: "Inventory",
    title: "Stock, orders & fulfillment systems",
    body: "Reduce stock errors and manual spreadsheets with structured tracking, alerts, and role-based access.",
    accent: "azure",
    image: {
      src: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=900&auto=format&fit=crop",
      alt: "A stocked warehouse aisle under bright lights",
    },
  },
  {
    tag: "Marketing",
    title: "Growth pages + analytics foundation",
    body: "High-performing landing pages with clarity, SEO structure, and analytics that supports iteration.",
    accent: "solar",
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
      alt: "An analytics dashboard tracking campaign growth on a laptop",
    },
  },
  {
    tag: "Automation",
    title: "Integrations & workflow automation",
    body: "Connect tools, reduce repetitive tasks, and create a reliable handoff between teams and systems.",
    accent: "pulse",
    image: {
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=900&auto=format&fit=crop",
      alt: "A service robot — repetitive work, delegated",
    },
  },
];

const GROWTH_STEPS = [
  {
    num: "01",
    title: "Define the bottleneck",
    body: "We map what’s slowing you down: delays, data gaps, manual work, unreliable tools, or poor visibility.",
  },
  {
    num: "02",
    title: "Build the system",
    body: "We design UX, build the frontend, structure the data, and connect the pieces into one reliable workflow.",
  },
  {
    num: "03",
    title: "Maintain the force",
    body: "Hosting, updates, monitoring, and iteration — so improvements stick and performance stays strong.",
  },
];

export default function SolutionsPage() {
  return (
    <PageShell
      title="Solutions • Causality Studios"
      description="Causality solutions: admin panels, dashboards, CRM tools, bookings, payments, inventory, growth pages and workflow automation that remove friction and provoke results."
      path="/solutions"
      jsonLd={itemListJsonLd(
        SOLUTION_CARDS.map((card) => ({
          name: card.title,
          description: card.body,
        })),
      )}
    >
      <PageHero
        segments={[
          { text: "Systems that remove friction — and" },
          { text: "provoke results.", className: "hl-serif" },
        ]}
        lead="Causality helps businesses solve operational and management issues using clear UX, reliable data, and scalable implementation."
        actions={
          <>
            <Btn to="/contact" variant="primary" size="lg">
              Tell Us the Problem
            </Btn>
            <Btn to="#solutions-examples" variant="ghost" size="lg">
              See Examples
            </Btn>
          </>
        }
        meta={[
          { k: "Outcome", v: "Less manual work • More clarity" },
          { k: "Delivery", v: "Build • Integrate • Maintain" },
        ]}
        panel={{
          code: "AT-THE-CORE",
          title: "At the core",
          body: "We don’t just ship pages. We create business systems that coordinate people, data, and decisions — then we keep them reliable in production.",
          stats: [
            { k: "Speed", v: "Automation • Workflows" },
            { k: "Control", v: "Dashboards • Data integrity" },
          ],
        }}
      />

      {/* SEC.01 — Examples */}
      <section className="shell py-20 md:py-28" id="solutions-examples">
        <SectionHeading
          index="01"
          code="EXAMPLES"
          segments={[
            { text: "Solutions we can build for" },
            { text: "your business.", className: "hl-serif" },
          ]}
          description="Pick a direction. We’ll tailor it to your model, team, and growth stage."
        />
        <TagCardGrid items={SOLUTION_CARDS} />
      </section>

      {/* SEC.02 — Built for growth */}
      <section className="relative border-y border-bone/10 bg-surface/60">
        <div className="shell py-20 md:py-28">
          <SectionHeading
            index="02"
            code="BUILT FOR GROWTH"
            segments={[
              { text: "We design for clarity — then" },
              { text: "engineer for scale.", className: "hl-serif" },
            ]}
            description="Your business doesn’t stay the same. Your systems shouldn’t break when you grow."
          />
          <Steps items={GROWTH_STEPS} maskClass="bg-transparent" />
        </div>
      </section>

      <div className="pt-20 md:pt-28">
        <CTASection
          title="Need a system, not just a site?"
          description="Share your business model and current workflow. We’ll suggest the fastest path to stability and scale."
          secondary={{ label: "See Services", to: "/services" }}
          primary={{ label: "Start Here", to: "/contact" }}
        />
      </div>
    </PageShell>
  );
}
