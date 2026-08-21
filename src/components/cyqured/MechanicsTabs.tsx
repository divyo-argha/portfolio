"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useCallback } from "react";
import { GameRulesSection } from "./GameRulesSection";
import { GameplayWalkthrough } from "./GameplayWalkthrough";
import { IconBoard, IconCompare } from "@/components/primitives/Icons";
import styles from "./AssetsTabs.module.css";

function MechanicsTabsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = searchParams.get("tab") === "walkthrough" ? "walkthrough" : "rules";

  const setTab = useCallback(
    (tab: "rules" | "walkthrough") => {
      const params = new URLSearchParams(searchParams.toString());
      if (tab === "rules") params.delete("tab");
      else params.set("tab", "walkthrough");
      const qs = params.toString();
      const nextUrl = qs ? `${pathname}?${qs}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  return (
    <>
      <div className={styles.tabContainer} role="tablist" aria-label="Game Mechanics View">
        <div className={styles.tabBar}>
          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "rules"}
            aria-controls="rules-panel"
            className={[styles.tabButton, currentTab === "rules" ? styles.tabButtonActive : ""].join(" ")}
            onClick={() => setTab("rules")}
          >
            <span className={styles.tabIcon}>
              <IconBoard size={16} />
            </span>
            <span>Rules &amp; Mechanics</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "walkthrough"}
            aria-controls="walkthrough-panel"
            className={[styles.tabButton, currentTab === "walkthrough" ? styles.tabButtonActive : ""].join(" ")}
            onClick={() => setTab("walkthrough")}
          >
            <span className={styles.tabIcon}>
              <IconCompare size={16} />
            </span>
            <span>Example Walkthrough</span>
          </button>
        </div>
      </div>

      <div className={styles.tabContentWrap} key={currentTab}>
        {currentTab === "rules" ? (
          <div id="rules-panel" role="tabpanel" aria-label="Rules and Mechanics">
            <GameRulesSection />
          </div>
        ) : (
          <div id="walkthrough-panel" role="tabpanel" aria-label="Example Gameplay Walkthrough">
            <GameplayWalkthrough />
          </div>
        )}
      </div>
    </>
  );
}

export function MechanicsTabs() {
  return (
    <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
      <MechanicsTabsContent />
    </Suspense>
  );
}
