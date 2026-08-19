import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Chakra_Petch } from "next/font/google";
import { AssetsTabs } from "@/components/cyqured/AssetsTabs";
import { IconArrowUpRight, IconScholar } from "@/components/primitives/Icons";
import { profile, socialLinks } from "@/content/profile";
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
  const scholarLink = socialLinks.find((l) => l.label === "Google Scholar");

  return (
    <div className={`${display.variable} ${styles.page}`}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glowWhite} aria-hidden="true" />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Scholarly Provenance Header */}
        <div className={styles.provenanceBar}>
          <div className={styles.provenancePill}>
            <span className={styles.provenanceConf}>USENIX SOUPS 2026</span>
            <span className={styles.provenanceDivider}>•</span>
            <Link
              href="/"
              className={styles.provenanceAuthorLink}
              title="Argha Pratim Saha — Lead Author & Security Researcher"
            >
              <Image
                src="/media/people/portrait.jpg"
                alt="Argha Pratim Saha"
                width={16}
                height={16}
                className={styles.provenanceAuthorPhoto}
              />
              <span>Argha Pratim Saha</span>
            </Link>
            <span className={styles.provenanceDivider}>•</span>
            <Link href="/publications/cyqured" className={styles.provenancePaperLink}>
              <span>Academic Overview</span>
              <IconArrowUpRight size={12} />
            </Link>
          </div>
        </div>

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

        {/* Bottom Bridge: Research Paper & Lead Researcher Attribution */}
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

          <div className={styles.authorStrip}>
            <div className={styles.authorLeft}>
              <Image
                src="/media/people/portrait.jpg"
                alt={profile.name}
                width={44}
                height={44}
                className={styles.authorPhoto}
              />
              <div>
                <h4 className={styles.authorName}>{profile.name}</h4>
                <p className={styles.authorRole}>Lead Author · Usable Security & HCI Researcher · SUST</p>
              </div>
            </div>

            <div className={styles.authorActions}>
              <Link href="/" className={styles.portfolioCta}>
                <span>View Full Portfolio</span>
                <IconArrowUpRight size={13} />
              </Link>
              {scholarLink ? (
                <a
                  href={scholarLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.scholarCta}
                >
                  <IconScholar size={14} />
                  <span>Google Scholar</span>
                </a>
              ) : null}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
