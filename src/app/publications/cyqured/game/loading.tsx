import { Chakra_Petch } from "next/font/google";
import styles from "./game.module.css";

const display = Chakra_Petch({
  variable: "--font-cyq-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export default function Loading() {
  return (
    <div className={`${display.variable} ${styles.page}`}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glowWhite} aria-hidden="true" />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Shimmer Placeholder */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <div
            className={styles.skeletonShimmer}
            style={{ width: "240px", height: "28px", borderRadius: "9999px" }}
          />
        </div>

        <header className={styles.hero}>
          <div
            className={styles.skeletonShimmer}
            style={{ width: "160px", height: "16px", margin: "0 auto 1rem", borderRadius: "4px" }}
          />
          <div
            className={styles.skeletonShimmer}
            style={{ width: "300px", height: "60px", margin: "0 auto 1rem", borderRadius: "12px" }}
          />
          <div
            className={styles.skeletonShimmer}
            style={{ width: "420px", height: "20px", margin: "0 auto", borderRadius: "6px" }}
          />
        </header>

        <div className={`${styles.skeletonStage} ${styles.skeletonShimmer}`} aria-hidden="true" />
      </div>
    </div>
  );
}
