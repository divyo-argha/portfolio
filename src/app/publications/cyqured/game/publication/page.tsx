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

const BIBTEX = `% BibTeX citation will be available upon official publication in the USENIX SOUPS 2026 Proceedings.
% Paper accepted at USENIX SOUPS 2026 (Hannover, Germany).`;

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
              src="/media/publications/cyqured/cyqured-logo.webp"
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
            <h3 className={pubStyles.abstractHeading}>Abstract</h3>
            <p className={pubStyles.abstractText}>
              As reliance on connected home devices grows, human behavior remains a critical vulnerability that is often
              inadequately addressed by traditional, overly technical educational methods. To bridge this gap, we introduce
              CyQured, a tabletop board game that models a digital home ecosystem of 16 devices, enabling players to
              simulate 16 STRIDE-inspired attacks and defenses through structured gameplay. We evaluated CyQured with 50
              university students, 13 with prior cybersecurity coursework and 37 without, including 14 with limited
              tabletop gaming experience. The evaluation was conducted using a mixed-methods approach that included
              knowledge assessments and user-centered evaluations, including the SUS, TAM, and NASA-TLX scales. While
              novices without domain or tabletop gaming experience reported higher cognitive load and borderline usability
              scores, knowledge gains were observed across all cohorts. Thematic analysis revealed that novices encountered
              initial accessibility barriers and elevated cognitive load due to unfamiliar cybersecurity terminology and
              gameplay mechanics; however, high engagement and social interaction motivated them to persist. Collectively,
              these findings suggest that game-based simulations can effectively engage diverse learners in understanding
              home cybersecurity, while also underscoring the need for accessible game design to support players without
              prior domain knowledge or tabletop gaming experience.
            </p>
          </div>

          <div className={pubStyles.abstractBlock}>
            <h3 className={pubStyles.abstractHeading}>Motivation</h3>
            <p className={pubStyles.abstractText}>
              Most security failures do not start with broken cryptography, they start with people. Even when strong
              technical defenses are in place, human behavior remains one of the main ways attackers get in, and that
              problem is worse at home than at work. A company has a security team, a policy, and an IT budget; a
              household has none of that, just whoever happens to be around when sixteen different devices and accounts
              need protecting. University students face this gap directly: they manage a large personal device footprint
              with widely uneven cybersecurity knowledge, which makes them a useful, accessible population for studying it.
            </p>
            <p className={pubStyles.abstractText}>
              Traditional security awareness training tends to be passive, slideshows and compliance quizzes, and it
              rarely changes what people actually do when a suspicious email lands in their inbox. Existing security
              games do better, but most are built for enterprise IT teams, need an expert facilitator to run, or only
              cover one narrow threat at a time, like phishing or passwords. Very few help someone reason about their
              home as a whole connected system, where a compromised router, a hijacked camera, and a phished email are
              all part of the same picture.
            </p>
            <p className={pubStyles.abstractText}>
              CyQured was built to close that gap: a facilitator-independent tabletop game that models a realistic
              connected home and maps sixteen device-level threats onto the STRIDE framework, so novices who are usually
              left out of security games can learn without an expert running the session. Early playtesting turned up
              something we did not expect, that the friction newcomers felt in their first few turns did not get in the
              way of learning, it deepened it. That tension between initial difficulty and lasting engagement is what
              motivated the structured, mixed-methods evaluation described in the abstract above.
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
          <h3 className={pubStyles.citationHeading}>Citation (Coming Soon)</h3>
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
