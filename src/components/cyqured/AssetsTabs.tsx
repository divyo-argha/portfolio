"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useCallback } from "react";
import { GameExperience } from "./GameExperience";
import { GameBoardSection } from "./GameBoardSection";
import { StrideGuide } from "./StrideGuide";
import styles from "./AssetsTabs.module.css";

function AssetsTabsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = searchParams.get("tab") === "board" ? "board" : "cards";

  const setTab = useCallback(
    (tab: "cards" | "board") => {
      const params = new URLSearchParams(searchParams.toString());
      if (tab === "cards") {
        params.set("tab", "cards");
        if (!params.has("category")) {
          params.set("category", "attack");
        }
      } else {
        params.set("tab", "board");
        params.delete("category");
        params.delete("card");
      }
      const qs = params.toString();
      const nextUrl = qs ? `${pathname}?${qs}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  return (
    <>
      {/* Floating Floating Tab Menu */}
      <div className={styles.tabContainer} role="tablist" aria-label="Game Assets View">
        <div className={styles.tabBar}>
          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "cards"}
            aria-controls="cards-panel"
            className={[
              styles.tabButton,
              currentTab === "cards" ? styles.tabButtonActive : "",
            ].join(" ")}
            onClick={() => setTab("cards")}
          >
            <span className={styles.tabIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </span>
            <span>Game Cards</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "board"}
            aria-controls="board-panel"
            className={[
              styles.tabButton,
              currentTab === "board" ? styles.tabButtonActive : "",
            ].join(" ")}
            onClick={() => setTab("board")}
          >
            <span className={styles.tabIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </span>
            <span>Game Board</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className={styles.tabContentWrap} key={currentTab}>
        {currentTab === "cards" ? (
          <div id="cards-panel" role="tabpanel" aria-label="Game Cards">
            <GameExperience />
            <StrideGuide />
          </div>
        ) : (
          <div id="board-panel" role="tabpanel" aria-label="Game Board">
            <GameBoardSection />
          </div>
        )}
      </div>
    </>
  );
}

export function AssetsTabs() {
  return (
    <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
      <AssetsTabsContent />
    </Suspense>
  );
}
