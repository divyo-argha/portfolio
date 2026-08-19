import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Chakra_Petch } from "next/font/google";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import styles from "../game.module.css";
import pubStyles from "./publication.module.css";

const display = Chakra_Petch({
  variable: "--font-cyq-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyQured: SOUPS 2026 Research Publication",
  description: "Download the scientific manuscript and explore the empirical study on CyQured accepted at USENIX SOUPS 2026.",
};

const BIBTEX = `@inproceedings{das2026cyqured,
  title     = {{CyQured}: Design, Development, and Empirical Evaluation of a
               Tabletop Game for Personal Cybersecurity Education},
  author    = {Das, Utsho and Saha, Argha Pratim and Ferdous, Md Sadek and
               Masum, Md and Chowdhury, Farida},
  booktitle = {Symposium on Usable Privacy and Security (SOUPS 2026)},
  year      = {2026},
  address   = {Hannover, Germany},
  publisher = {USENIX Association},
}`;

export default function CyQuredPublicationPage() {
  return (
    <div className={`${display.variable} ${styles.page}`}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Hero Section */}
        <header className={styles.hero}>
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
            Accepted at the USENIX Symposium on Usable Privacy and Security (SOUPS 2026), Hannover, Germany.
          </p>
        </header>

        {/* Paper Details Card */}
        <div className={pubStyles.paperCard}>
          <div className={pubStyles.venueBadge}>USENIX SOUPS 2026</div>
          <h2 className={pubStyles.paperTitle}>
            CyQured: Design, Development, and Empirical Evaluation of a Tabletop Game for Personal Cybersecurity Education
          </h2>

          <div className={pubStyles.authorList}>
            <span className={pubStyles.authorHighlight}>Utsho Das*</span>,{" "}
            <span className={pubStyles.authorHighlight}>Argha Pratim Saha*</span>,{" "}
            <span>Md Sadek Ferdous</span>,{" "}
            <span>Md Masum</span>,{" "}
            <span>Farida Chowdhury</span>
            <span className={pubStyles.contributionNote}> (*equal contribution)</span>
          </div>

          <div className={pubStyles.abstractBlock}>
            <h3 className={pubStyles.abstractHeading}>Abstract & Motivation</h3>
            <p className={pubStyles.abstractText}>
              Most people live around connected devices without thinking of them as an interconnected security system.
              CyQured turns the connected home into a tabletop game where players acquire devices, encounter STRIDE threats,
              choose defensive mitigations, and explain their security reasoning aloud.
            </p>
            <p className={pubStyles.abstractText}>
              In a mixed-methods empirical evaluation with 50 participants, players demonstrated statistically significant
              knowledge gains (large effect sizes, d = 1.62 to 1.88). The study uncovered the &ldquo;CyQured Paradox&rdquo;:
              usability friction during early gameplay did not hinder learning, but rather fostered deeper reflective engagement.
            </p>
          </div>

          {/* Action CTAs */}
          <div className={pubStyles.actionRow}>
            <a
              href="/papers/cyqured.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={pubStyles.downloadButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Manuscript (PDF)</span>
            </a>

            <Link href="/publications/cyqured" className={pubStyles.overviewButton}>
              <span>Interactive Study Overview</span>
              <IconArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Overview Section Card */}
        <section className={pubStyles.overviewSection}>
          <div className={pubStyles.overviewInner}>
            <div>
              <span className={pubStyles.overviewEyebrow}>Portfolio Academic Page</span>
              <h3 className={pubStyles.overviewTitle}>Explore the Interactive Study & Data</h3>
              <p className={pubStyles.overviewDesc}>
                View complete empirical results, System Usability Scale (SUS) bar charts, knowledge test gain distributions,
                technology acceptance metrics, qualitative participant interview quotes, and methodological workflows.
              </p>
            </div>
            <Link href="/publications/cyqured" className={pubStyles.overviewCtaButton}>
              <span>Visit /publications/cyqured</span>
              <IconArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        {/* BibTeX Citation Box */}
        <section className={pubStyles.citationSection}>
          <h3 className={pubStyles.citationHeading}>Cite this Paper (BibTeX)</h3>
          <div className={pubStyles.codeWrapper}>
            <pre className={pubStyles.codeBlock}>
              <code>{BIBTEX}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
