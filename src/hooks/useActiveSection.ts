"use client";

import { useEffect, useState } from "react";

// Mapping of in-page section IDs to the primary nav hashes
const SECTION_MAP: Record<string, string> = {
  top: "#top",
  news: "#top",
  research: "#research",
  publications: "#research",
  "ongoing-work": "#research",
  "research-focus": "#research",
  experience: "#experience",
  positions: "#experience",
  education: "#education",
  projects: "#projects",
  engineering: "#projects",
  programming: "#projects",
  "problem-solving": "#problem-solving",
  skills: "#skills",
};

// Global lock timestamp to prevent intermediate tab flickering during programmatic smooth scroll
let scrollLockUntil = 0;
let forcedActiveSection = "";

export function lockActiveSectionForScroll(hash: string, duration = 850) {
  forcedActiveSection = hash;
  scrollLockUntil = performance.now() + duration;
}

/**
 * Tracks which of the given `#id` hashes is currently in view, so nav UI
 * (the desktop ProfileIsland list and the mobile FloatingNavTrigger) highlights
 * the correct entry with precision and instantaneous responsiveness.
 */
export function useActiveSection(hashes: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(() => hashes[0] || "#top");

  useEffect(() => {
    let ticking = false;

    function calculateActiveSection() {
      // If programmatic smooth scroll is currently executing, preserve the target tab
      if (performance.now() < scrollLockUntil && forcedActiveSection) {
        setActiveSection(forcedActiveSection);
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Near the very top of the page
      if (scrollY < 100) {
        setActiveSection(hashes[0] || "#top");
        return;
      }

      // 2. Near the very bottom of the page
      if (scrollY + windowHeight >= docHeight - 40) {
        setActiveSection(hashes[hashes.length - 1] || "#skills");
        return;
      }

      // 3. Scan section elements on the page
      // Trigger line: ~150px from viewport top (where sticky header pins)
      const triggerY = 150;

      const trackedElements: { hash: string; top: number; bottom: number }[] = [];

      const allIds = [
        "top",
        "news",
        "research",
        "publications",
        "ongoing-work",
        "research-focus",
        "experience",
        "education",
        "projects",
        "problem-solving",
        "skills",
      ];

      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const mappedHash = SECTION_MAP[id] || `#${id}`;
          if (hashes.includes(mappedHash)) {
            trackedElements.push({
              hash: mappedHash,
              top: rect.top,
              bottom: rect.bottom,
            });
          }
        }
      }

      // Find the section currently intersecting the trigger line
      let matchedHash = "";
      for (const item of trackedElements) {
        if (item.top <= triggerY && item.bottom > triggerY) {
          matchedHash = item.hash;
          break;
        }
      }

      // Fallback: Find the closest section whose top has passed the trigger line
      if (!matchedHash) {
        let maxPassedTop = -Infinity;
        for (const item of trackedElements) {
          if (item.top <= triggerY && item.top > maxPassedTop) {
            maxPassedTop = item.top;
            matchedHash = item.hash;
          }
        }
      }

      if (matchedHash) {
        setActiveSection((prev) => (prev !== matchedHash ? matchedHash : prev));
      }
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    }

    calculateActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hashes]);

  return activeSection;
}
