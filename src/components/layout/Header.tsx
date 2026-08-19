"use client";

import { usePathname } from "next/navigation";
import { CyquredNavbar } from "@/components/cyqured/CyquredNavbar";
import { SiteHeader } from "./SiteHeader";

export function Header() {
  const pathname = usePathname();
  const isCyquredGame = pathname?.startsWith("/publications/cyqured/game");

  if (isCyquredGame) {
    return <CyquredNavbar />;
  }

  return <SiteHeader />;
}
