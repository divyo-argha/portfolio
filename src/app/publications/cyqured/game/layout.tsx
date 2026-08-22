import type { Metadata } from "next";

/**
 * The game section is the only part of the site that presents as CyQured rather
 * than as the portfolio: it swaps in its own navbar (see `layout/Header.tsx`,
 * which branches on this same `/publications/cyqured/game` prefix), its own
 * palette, and from here its own tab title and favicon.
 *
 * Scoped to `game/` deliberately — `/publications/cyqured` itself is the
 * research overview, which is portfolio content and keeps the site-wide
 * "· Argha Saha" title and the AS mark.
 */
export const metadata: Metadata = {
  title: {
    default: "CyQured",
    template: "%s · CyQured",
  },
};

export default function CyQuredGameLayout({ children }: { children: React.ReactNode }) {
  // Renders nothing of its own: this layout exists purely to scope metadata and
  // the `icon.svg` file convention to this segment, so the DOM is unchanged.
  return <>{children}</>;
}
