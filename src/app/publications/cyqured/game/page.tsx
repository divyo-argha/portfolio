import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Chakra_Petch } from "next/font/google";
import { AssetsTabs } from "@/components/cyqured/AssetsTabs";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import styles from "./game.module.css";

const display = Chakra_Petch({
  variable: "--font-cyq-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyQured: Game Assets",
  description: "Explore all physical CyQured game assets: the 28-cell smart home board, 16 connected devices, and 84 playable action, chance, and scenario cards.",
};

export default function CyQuredAssetsPage() {
  return (
    <div className={`${display.variable} ${styles.page}`}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glowWhite} aria-hidden="true" />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Physical Track & Playable Decks</p>
          <h1 className={styles.wordmark}>
            <Image
              src="/media/publications/cyqured/cyqured-logo.png"
              alt="cyQured"
              width={632}
              height={225}
              priority
              className={styles.wordmarkLogo}
            />
          </h1>
          <p className={styles.tagline}>
            Explore all tangible components of CyQured: switch between the 84 playable cards catalogue and the 28-cell connected home board.
          </p>
        </header>

        {/* Floating Tab Menu for Game Cards & Game Board (Managed by URL Query Param) */}
        <AssetsTabs />

        {/* Bottom Bridge: Research Paper */}
        <footer className={styles.bottomBridge}>
          <div className={styles.bridgeCard}>
            <div className={styles.bridgeInfo}>
              <span className={styles.bridgeEyebrow}>SOUPS 2026 Research Publication</span>
              <h3 className={styles.bridgeTitle}>Read the Full Scientific Study</h3>
              <p className={styles.bridgeDesc}>
                Explore the empirical evaluation with 50 participants, System Usability Scale (SUS) analysis, learning effect sizes, and full BibTeX citation.
              </p>
            </div>
            <Link href="/publications/cyqured" className={styles.bridgeButton}>
              <span>View Academic Overview</span>
              <IconArrowUpRight size={16} />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
