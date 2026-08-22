"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";

// Both headers render on every route's client graph if imported statically, so
// the homepage paid for the game navbar's JS *and* its CSS module. Lazy imports
// split each into its own chunk, fetched only on the routes that branch to it.
// `ssr` stays on (the default): each route is prerendered separately under
// `output: "export"`, so the correct header is still in the served HTML — no
// post-hydration swap, no layout shift, and no-JS readers keep their nav.
const CyquredNavbar = dynamic(() =>
  import("@/components/cyqured/CyquredNavbar").then((m) => m.CyquredNavbar),
);

export function Header() {
  const pathname = usePathname();
  const isCyquredGame = pathname?.startsWith("/publications/cyqured/game");

  if (isCyquredGame) {
    return <CyquredNavbar />;
  }

  return <SiteHeader />;
}
