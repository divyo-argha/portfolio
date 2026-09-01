/**
 * Canonical origin, used for `metadataBase` (OG/Twitter image URLs), the
 * sitemap and robots. Resolved at build time, most explicit first:
 *   1. NEXT_PUBLIC_SITE_URL — set this in Vercel project settings to pin a
 *      custom domain, or to override the two below.
 *   2. NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel with the
 *      project's production domain (bare host, so the scheme is added here).
 *   3. The literal fallback, for local builds and the GitHub Pages workflow.
 * Getting this wrong only mis-stamps absolute URLs; with `indexable: false`
 * nothing is published to search engines yet either way.
 */
const productionUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (productionUrl ? `https://${productionUrl}` : "https://divyo-argha.github.io");

export const siteConfig = {
  name: "Argha Pratim Saha",
  url: siteUrl,
  /** Single switch for search visibility. Both `robots.ts` and the `robots`
   * metadata in `app/layout.tsx` read this, so launching is a one-word change
   * and cannot half-fail. */
  indexable: false,
  navLinks: [
    { label: "About", href: "#top" },
    { label: "Research", href: "#research" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Problem Solving", href: "#problem-solving" },
    { label: "Skills", href: "#skills" },
  ],
};
