import { useEffect, type ReactNode } from "react";

import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";

interface SeoProps {
  /** Full title, e.g. "Services • Forgepoint". Defaults to the site title. */
  title?: string;
  /** Meta description. Defaults to the site-wide description. */
  description?: string;
  /** Canonical path for this page, e.g. "/services". */
  path?: string;
  /** Custom image URL for Open Graph / Twitter cards. */
  image?: string;
  /** Set true to ask crawlers not to index the page (e.g. 404). */
  noindex?: boolean;
  /** JSON-LD structured data to inject on this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Extra <head> nodes (e.g. <link> or <meta> tags). */
  children?: ReactNode;
}

/** Removes a meta tag by its attribute selector. */
function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Removes a <link rel="..."> tag and returns whether it was present. */
function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  const existed = Boolean(el);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return existed;
}

/** OMGOD !!!!!! THIS THING Removes any existing JSON-LD scripts injected at runtime by this component. */
function clearRuntimeJsonLd() {
  document.head
    .querySelectorAll('script[type="application/ld+json"][data-seo="runtime"]')
    .forEach((n) => n.remove());
}

/**
 * Per-page SEO manager.
 *
 * Keeps <head> in sync with the current route: title, meta description,
 * canonical URL, Open Graph tags, Twitter cards, robots directives, and
 * JSON-LD structured data. Renders nothing to the DOM.
 */
export default function Seo({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path = "/",
  image = SITE_IMAGE,
  noindex = false,
  jsonLd,
  children,
}: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    // --- Title ---
    document.title = title;

    // --- Basic meta ---
    upsertMeta("name", "description", description);

    // --- Canonical ---
    upsertLink("canonical", url);

    // --- Open Graph ---
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", title);

    // --- Twitter ---
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    // --- Robots ---
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow",
    );

    // --- JSON-LD (runtime-injected for SPA routes) ---
    clearRuntimeJsonLd();
    if (jsonLd) {
      const scripts = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      scripts.forEach((data) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.seo = "runtime";
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
  }, [title, description, path, image, noindex, jsonLd]);

  return <>{children}</>;
}

/** Re-exports the static site URL so pages can build canonical paths. */
export { SITE_URL };
