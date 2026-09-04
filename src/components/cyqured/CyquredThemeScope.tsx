"use client";

import { useEffect } from "react";

/**
 * Enforces dark theme on the document root whenever the user is browsing
 * the CyQured game microsite (/publications/cyqured/game and all subroutes).
 * Restores the previous user theme when unmounting back to the portfolio.
 */
export function CyquredThemeScope() {
  useEffect(() => {
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");

    return () => {
      if (prevTheme) {
        document.documentElement.setAttribute("data-theme", prevTheme);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    };
  }, []);

  return null;
}
