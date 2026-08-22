import styles from "./QuoteBento.module.css";

export function QuoteBento() {
  return (
    <div className={styles.bentoContainer}>
      <div className={styles.bentoGrid}>
        {/* 1. HERO TILE: The CyQured Paradox & Productive Struggle (Full 12 cols) */}
        <div className={`${styles.card} ${styles.heroTile}`}>
          <div className={styles.watermarkQuote}>&ldquo;</div>
          <div>
            <div className={styles.cardHeader}>
              <div className={styles.badgeGroup}>
                <span className={`${styles.themeBadge} ${styles.badgeBlue}`}>
                  Core Finding · The CyQured Paradox
                </span>
                <span className={styles.statPill}>
                  Knowledge Gain: <strong className={styles.statHighlight}>ΔM = +1.93 pts</strong>
                </span>
                <span className={styles.statPill}>
                  Effect Size: <strong className={styles.statHighlight}>d = 1.69 (Large)</strong>
                </span>
              </div>
            </div>

            <blockquote className={styles.heroQuoteText}>
              &ldquo;It was confusing, sure, but I actually learned a lot of things.&rdquo;
            </blockquote>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>P15</div>
              <div className={styles.authorMeta}>
                <span className={styles.authorName}>Participant 15</span>
                <span className={styles.authorDesc}>Novice · No Security Coursework · Non-Gamer</span>
              </div>
            </div>
            <p className={styles.takeawayText}>
              Initial cognitive friction did not hinder domain mastery. Novices converted early rule uncertainty
              into statistically significant, large-effect knowledge gains.
            </p>
          </div>
        </div>

        {/* 2. SOCIAL SCAFFOLDING TILE: Dual Cohort Dialogue (7 cols) */}
        <div className={`${styles.card} ${styles.dialogueTile}`}>
          <div>
            <div className={styles.cardHeader}>
              <div className={styles.badgeGroup}>
                <span className={`${styles.themeBadge} ${styles.badgeEmerald}`}>
                  Social Scaffolding & Interaction
                </span>
                <span className={styles.statPill}>TAM Attitude: 4.60 / 5.0</span>
              </div>
            </div>

            <div className={styles.dialogueStack}>
              <div className={styles.dialogueItem}>
                <p className={styles.dialogueQuote}>
                  &ldquo;It was engaging to have such good discussions with everyone.&rdquo;
                </p>
                <div className={styles.dialogueAuthor}>
                  <span>P9</span>
                  <span className={`${styles.roleTag} ${styles.roleSC}`}>Security Coursework (SC)</span>
                </div>
              </div>

              <div className={styles.dialogueItem}>
                <p className={styles.dialogueQuote}>
                  &ldquo;The fun part was everyone sitting together and playing.&rdquo;
                </p>
                <div className={styles.dialogueAuthor}>
                  <span>P27</span>
                  <span className={`${styles.roleTag} ${styles.roleNC}`}>Novice (NC)</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <p className={styles.takeawayText}>
              Forced verbal justification (Phase 4) turned the game table into a peer-tutoring environment,
              buffering novice intimidation through collaborative debate.
            </p>
          </div>
        </div>

        {/* 3. COGNITIVE LOAD & USABILITY DIVIDE TILE (5 cols) */}
        <div className={`${styles.card} ${styles.metricTile}`}>
          <div>
            <div className={styles.cardHeader}>
              <div className={styles.badgeGroup}>
                <span className={`${styles.themeBadge} ${styles.badgeAmber}`}>
                  Initial Usability Friction
                </span>
                <span className={styles.statPill}>NC-NM SUS: 54.1</span>
              </div>
            </div>

            <blockquote className={styles.quoteText}>
              &ldquo;There are just too many rules to remember right at the start.&rdquo;
            </blockquote>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>P27</div>
              <div className={styles.authorMeta}>
                <span className={styles.authorName}>Participant 27</span>
                <span className={styles.authorDesc}>Novice (No Monopoly Experience)</span>
              </div>
            </div>
            <p className={styles.takeawayText}>
              First-time tabletop players carried a dual cognitive load: assimilating movement mechanics
              while reasoning about unfamiliar cybersecurity threats.
            </p>
          </div>
        </div>

        {/* 4. LEARNING PROGRESSION TILE: 3-Phase Stepper (7 cols) */}
        <div className={`${styles.card} ${styles.progressionTile}`}>
          <div>
            <div className={styles.cardHeader}>
              <div className={styles.badgeGroup}>
                <span className={`${styles.themeBadge} ${styles.badgeBlue}`}>
                  Gradual Adaptation
                </span>
                <span className={styles.statPill}>3-Round Adaptation Loop</span>
              </div>
            </div>

            <blockquote className={styles.quoteText}>
              &ldquo;It was confusing in the beginning, but it got easier as we played.&rdquo;
            </blockquote>

            <div className={styles.stepperRow}>
              <div className={styles.stepNode}>
                <span className={styles.stepNum}>Round 1</span>
                <span className={styles.stepLabel}>Orientation</span>
                <span className={styles.stepDesc}>Rule hesitation & card reading</span>
              </div>
              <div className={styles.stepNode}>
                <span className={styles.stepNum}>Round 2</span>
                <span className={styles.stepLabel}>Recognition</span>
                <span className={styles.stepDesc}>STRIDE threat mapping settles</span>
              </div>
              <div className={styles.stepNode}>
                <span className={styles.stepNum}>Round 3</span>
                <span className={styles.stepLabel}>Strategy</span>
                <span className={styles.stepDesc}>Independent defense & trade</span>
              </div>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>P1</div>
              <div className={styles.authorMeta}>
                <span className={styles.authorName}>Participant 1</span>
                <span className={styles.authorDesc}>Novice · No Security Coursework</span>
              </div>
            </div>
            <p className={styles.takeawayText}>
              Extraneous cognitive load cleared rapidly as players completed cyclical laps around the board.
            </p>
          </div>
        </div>

        {/* 5. TERMINOLOGY & JARGON TRANSLATION TILE (5 cols) */}
        <div className={`${styles.card} ${styles.jargonTile}`}>
          <div>
            <div className={styles.cardHeader}>
              <div className={styles.badgeGroup}>
                <span className={`${styles.themeBadge} ${styles.badgePurple}`}>
                  Domain Vocabulary
                </span>
                <span className={styles.statPill}>16 Threat Types</span>
              </div>
            </div>

            <blockquote className={styles.quoteText}>
              &ldquo;At first, concepts like spoofing were really confusing to me.&rdquo;
            </blockquote>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>P33</div>
              <div className={styles.authorMeta}>
                <span className={styles.authorName}>Participant 33</span>
                <span className={styles.authorDesc}>Novice · No Security Coursework</span>
              </div>
            </div>
            <p className={styles.takeawayText}>
              Grounded card prompts and device target tags translated abstract STRIDE jargon into concrete,
              tactile decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
