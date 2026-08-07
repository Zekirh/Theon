import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Smooth-scrolls to an element by id, accounting for the floating nav. */
export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -110, duration: 1.3 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Instant jump to top — used behind the page-transition shutter. */
export function jumpToTop(): void {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}
