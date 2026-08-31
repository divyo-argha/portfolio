"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { MouseGlow } from "./MouseGlow";
import { ProfileIsland } from "./ProfileIsland";
import { ThemeToggle } from "./ThemeToggle";
import { FloatingNavTrigger } from "./FloatingNavTrigger";
import { MobileNav } from "./MobileNav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { siteConfig } from "@/lib/site";
import styles from "./Header.module.css";

// Both headers render on every route's client graph if imported statically, so
// the homepage paid for the game navbar's JS *and* its CSS module. Lazy imports
// split each into its own chunk, fetched only on the routes that branch to it.
// `ssr` stays on (the default): each route is prerendered separately under
// `output: "export"`, so the correct header is still in the served HTML — no
// post-hydration swap, no layout shift, and no-JS readers keep their nav.
const CyquredNavbar = dynamic(() =>
  import("@/components/cyqured/CyquredNavbar").then((m) => m.CyquredNavbar),
);

const NAV_HASHES = siteConfig.navLinks.map((link) => link.href);

export function Header({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCyquredGame = pathname?.startsWith("/publications/cyqured/game");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const activeSection = useActiveSection(NAV_HASHES);

  if (isCyquredGame) {
    return (
      <>
        <CyquredNavbar />
        {children}
      </>
    );
  }

  return (
    <div className={styles.shell}>
      <MouseGlow />
      <div className={styles.topRightCluster}>
        <ThemeToggle />
        <FloatingNavTrigger open={mobileNavOpen} onToggle={() => setMobileNavOpen((v) => !v)} />
      </div>

      <div className={styles.row}>
        <ProfileIsland />
        <div className={styles.content}>{children}</div>
      </div>

      <MobileNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        activeSection={activeSection}
      />
    </div>
  );
}
