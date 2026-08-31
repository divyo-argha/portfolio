"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given `#id` hashes is currently in view, so nav UI
 * (the desktop `ProfileIsland` list and the mobile `FloatingNavTrigger`) can
 * highlight the right entry. Extracted out of the old `SiteHeader` so both
 * can share one observer instead of each running their own.
 */
export function useActiveSection(hashes: string[]): string {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = hashes.map((h) => h.replace(/^#/, ""));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const next = `#${entry.target.id}`;
            setActiveSection((prev) => (prev !== next ? next : prev));
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.1,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hashes]);

  return activeSection;
}
