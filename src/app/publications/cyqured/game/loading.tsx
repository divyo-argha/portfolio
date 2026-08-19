import Link from "next/link";
import Image from "next/image";
import { Chakra_Petch } from "next/font/google";
import { IconArrowLeft } from "@/components/primitives/Icons";
import styles from "./game.module.css";

const display = Chakra_Petch({
  variable: "--font-cyq-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const SKELETON_FILTERS = 5;
const SKELETON_CARDS = 21;

export default function Loading() {
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
            34 attack and defense cards, 30 chance cards, 20 scenario cards: flip any card to see exactly
            what stops it.
          </p>
        </header>

        <div className={`${styles.skeletonStage} ${styles.skeletonShimmer}`} aria-hidden="true" />

        <div className={styles.skeletonFilterBar} aria-hidden="true">
          {Array.from({ length: SKELETON_FILTERS }).map((_, i) => (
            <span key={i} className={`${styles.skeletonPill} ${styles.skeletonShimmer}`} />
          ))}
        </div>

        <div className={styles.skeletonGrid} aria-hidden="true">
          {Array.from({ length: SKELETON_CARDS }).map((_, i) => (
            <span key={i} className={`${styles.skeletonCard} ${styles.skeletonShimmer}`} />
          ))}
        </div>

        <div className={`${styles.skeletonBoard} ${styles.skeletonShimmer}`} aria-hidden="true" />
      </div>
    </div>
  );
}
