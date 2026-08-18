import type { Metadata } from "next";
import Link from "next/link";
import { Chakra_Petch } from "next/font/google";
import { GameExperience } from "@/components/cyqured/GameExperience";
import { IconArrowLeft } from "@/components/primitives/Icons";
import styles from "./game.module.css";

const display = Chakra_Petch({
  variable: "--font-cyq-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyQured — Play the Cards",
  description: "The full CyQured card catalogue: every attack, defense, chance, and scenario card, with live threat-to-defense mappings.",
};

export default function CyQuredGamePage() {
  return (
    <div className={`${display.variable} ${styles.page}`}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.inner}>
        <Link href="/publications/cyqured" className={styles.backLink}>
          <IconArrowLeft size={14} />
          Overview
        </Link>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>Every card. Every counter.</p>
          <h1 className={styles.wordmark}>cyQured</h1>
          <p className={styles.tagline}>
            34 attack and defense cards, 30 chance cards, 20 scenario cards — flip any card to see exactly
            what stops it.
          </p>
        </header>

        <GameExperience />
      </div>
    </div>
  );
}
