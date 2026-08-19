import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Chakra_Petch } from "next/font/google";
import { GameRulesSection } from "@/components/cyqured/GameRulesSection";
import { IconArrowUpRight, IconScholar } from "@/components/primitives/Icons";
import { profile, socialLinks } from "@/content/profile";
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
  const scholarLink = socialLinks.find((l) => l.label === "Google Scholar");

  return (
    <div className={`${display.variable} ${styles.page}`}>
      <div className={styles.grain} aria-hidden="true" />
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

        {/* Dedicated Game Mechanics Content */}
        <GameRulesSection />

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
