"use client";

import { useRouter } from "next/navigation";
import { lockActiveSectionForScroll } from "./useActiveSection";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Animated smooth scroll handler with slow, luxurious ease-in-out easing.
 */
function smoothScrollTo(targetY: number, duration = 800) {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Click handler for in-page nav links (id="#section"). Smoothly scrolls with
 * a slow, animated transition when the target exists on the current page;
 * otherwise routes to `/#id`.
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

    lockActiveSectionForScroll(hash, 850);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetRect = el.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset;
    const targetY = Math.max(0, currentScrollY + targetRect.top);

    if (reduced) {
      window.scrollTo(0, targetY);
    } else {
      smoothScrollTo(targetY, 800);
    }

    history.pushState(null, "", `#${id}`);
  };
}
