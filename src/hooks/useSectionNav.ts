"use client";

import { useRouter } from "next/navigation";

/**
 * Click handler for in-page nav links (id="#section"). Smooth-scrolls when
 * the target exists on the current page; otherwise routes to `/#id` — the
 * nav renders on every route, but section ids only exist on the homepage.
 * Driven from JS rather than CSS `scroll-behavior`, which got interrupted
 * mid-animation by post-hydration layout shifts and landed short.
 */
export function useSectionNav() {
  const router = useRouter();

  return function navigateToSection(hash: string) {
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);

    if (!el) {
      router.push(`/#${id}`);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
  };
}
