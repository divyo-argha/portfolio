export const THEME_STORAGE_KEY = "divyo-argha-theme";

/**
 * Runs before hydration (via a blocking inline script in <head>) so the
 * correct theme is painted on the very first frame — no light-to-dark flash.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;
