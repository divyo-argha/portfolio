"use client";

import { useEffect } from "react";

/**
 * Handles landing on `/#section` — whether from a bookmarked URL, the
 * Header's cross-page fallback (see lib/scroll.ts), or a detail page's
 * BackLink. A plain browser fragment jump on load is unreliable once
 * images/fonts are still shifting layout, so this waits a tick for things
 * to settle before scrolling.
 */
export function useScrollToHashOnMount() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;

    const timeout = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 60);

    return () => clearTimeout(timeout);
  }, []);
}
