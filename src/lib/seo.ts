/**
 * Central SEO configuration and JSON-LD structured-data builders.
 *
 * NOTE: When a custom domain is added to the Vercel deployment, update
 * SITE_URL below to the production domain so canonical URLs and structured
 * data point at the real, indexable origin.
 */

export const SITE_URL = "https://codecraft.vercel.app";

export const SITE_NAME = "Codecraft";

export const SITE_TITLE = "Codecraft • We Force Change";

export const SITE_DESCRIPTION =
  "Codecraft provides business-ready digital solutions: web experiences, scalable systems, database management, hosting, and growth-focused design. We build to scale. We force change.";

export const SITE_IMAGE = `${SITE_URL}/icon.png`;

/** Per-page default descriptions (used when a page omits its own). */
export const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/": SITE_DESCRIPTION,
"/services":
    "Codecraft services: frontend development, UI/UX design, database management, hosting, deployment & maintenance. Full-stack support built to scale.",
  "/solutions":
    "Codecraft solutions: admin panels, dashboards, CRM tools, bookings, payments, inventory, growth pages and workflow automation that remove friction and provoke results.",
  "/about":
    "Codecraft is led by Richmond C.U — talent, resilience, and the will to force change. We build trust through execution.",
  "/contact":
    "Start a project with Codecraft. Tell us what you’re building and what results you want — we’ll reply with next steps, timeline, and a scale path.",
};

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

type JsonLd = Record<string, unknown>;

export const websiteJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
name: SITE_NAME,
  alternateName: "Codecraft",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
  },
});

export const organizationJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Organization",
name: SITE_NAME,
  alternateName: "Codecraft",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description: SITE_DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Richmond C.U",
  },
  knowsAbout: [
    "Frontend Development",
    "UI/UX Design",
    "Database Management",
    "Hosting & Deployment",
    "Business Automation",
    "Web Applications",
  ],
});

export const professionalServiceJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/icon.png`,
  description: SITE_DESCRIPTION,
  priceRange: "$$",
  areaServed: "Worldwide",
  knowsAbout: [
    "Websites & Frontend Development",
    "Database Management & Integrations",
    "Hosting, Maintenance & Reliability",
  ],
});

export const itemListJsonLd = (items: { name: string; description: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    description: item.description,
  })),
});


export const contactPageJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Codecraft",
  url: `${SITE_URL}/contact`,
  description: "Start a project with Codecraft.",
  about: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
});

/** Adds the JSON-LD script tag to <head>. */
export function injectJsonLd(data: JsonLd | JsonLd[]) {
  const scripts = Array.isArray(data) ? data : [data];
  scripts.forEach((item) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

