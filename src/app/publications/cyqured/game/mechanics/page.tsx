import type { Metadata } from "next";
import Link from "next/link";
import { Chakra_Petch } from "next/font/google";
import { MechanicsTabs } from "@/components/cyqured/MechanicsTabs";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import styles from "../game.module.css";

const display = Chakra_Petch({
  variable: "--font-cyq-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyQured: Game Mechanics",
  description: "Explore the game mechanics: 4-step turn progression, STRIDE threat taxonomy, device compromise battles, and victory rules.",
};

export default function CyQuredMechanicsPage() {
  return (
    <div className={`${display.variable} ${styles.page}`}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Rules & Mechanics / Example Walkthrough (Managed by URL Query Param) */}
        <MechanicsTabs />

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
              <span>Research Overview</span>
              <IconArrowUpRight size={16} />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
