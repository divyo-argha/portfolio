export const THEME_STORAGE_KEY = "divyo-argha-theme";

/**
 * Runs before hydration (via a blocking inline script in <head>) so the
 * correct theme is painted on the very first frame — no light-to-dark flash.
 */
export const themeInitScript = `
(function () {
  // Scroll-reveal content is authored at opacity 0 and faded in after
  // hydration. <html> therefore ships with .no-js, which CSS uses to force
  // that content visible; this removes it before first paint whenever
  // scripting is actually available, so a reader with JS off or JS broken
  // still gets a fully readable page instead of a blank one.
  document.documentElement.classList.remove("no-js");
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;
