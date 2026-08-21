import type { Metadata } from "next";
import Link from "next/link";
import { Chakra_Petch } from "next/font/google";
import { Hero } from "@/components/cyqured/Hero";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import styles from "./game.module.css";

const display = Chakra_Petch({
  variable: "--font-cyq-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyQured: The Game",
  description: "A tabletop cybersecurity game for the connected home: browse the playable cards and board, walk through the mechanics, or read the SOUPS 2026 research publication.",
};

const SECTIONS = [
  {
    href: "/publications/cyqured/game/assets",
    title: "Game Assets",
    body: "The 28-cell smart home board, 16 connected devices, and 84 playable action, chance, and scenario cards.",
  },
  {
    href: "/publications/cyqured/game/mechanics",
    title: "Game Mechanics",
    body: "The 4-step turn progression, STRIDE threat taxonomy, device compromise battles, and victory rules.",
  },
  {
    href: "/publications/cyqured/game/publication",
    title: "Research Publication",
    body: "Download the SOUPS 2026 manuscript and read the empirical evaluation with 50 participants.",
  },
] as const;

export default function CyQuredGameHomePage() {
  return (
    <div className={`${display.variable} ${styles.page}`}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glowWhite} aria-hidden="true" />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <h1 className="visually-hidden">CyQured: The Game</h1>
          <p className={styles.eyebrow}>Physical Track & Playable Decks</p>
          <Hero />
        </header>

        {/* Section Cards: Assets / Mechanics / Publication */}
        <div className={styles.sectionGrid}>
          {SECTIONS.map((section) => (
            <Link key={section.href} href={section.href} className={styles.sectionCard}>
              <span className={styles.sectionCardTitle}>
                {section.title}
                <IconArrowUpRight size={16} />
              </span>
              <p className={styles.sectionCardDesc}>{section.body}</p>
            </Link>
          ))}
        </div>

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
