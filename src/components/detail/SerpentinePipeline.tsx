import styles from "./SerpentinePipeline.module.css";

export type SerpentineStep = {
  num: string;
  tag: string;
  tagColor: "slate" | "amber" | "sky" | "purple" | "emerald" | "blue";
  title: string;
  subtitle: string;
  bullets: string[];
};

const DEFAULT_STEPS: SerpentineStep[] = [
  {
    num: "01",
    tag: "Concept",
    tagColor: "slate",
    title: "Initial Prototype",
    subtitle: "SUST Undergraduate Thesis",
    bullets: [
      "Tabletop board modeling 16 connected home devices",
      "Basic STRIDE threat cards and open-ended card prompts",
      "Initial gameplay rules for domestic IoT threat modeling",
    ],
  },
  {
    num: "02",
    tag: "Friction Found",
    tagColor: "amber",
    title: "Pilot Playtesting",
    subtitle: "Formative Evaluation",
    bullets: [
      "High cognitive load observed among non-technical novices",
      "Players confused threat types and hesitated on defenses",
      "Heavy reliance on Game Master highlighted need for scaffolding",
    ],
  },
  {
    num: "03",
    tag: "Scaffolding",
    tagColor: "sky",
    title: "Card & Board Redesign",
    subtitle: "Design Iteration",
    bullets: [
      "Added explicit threat titles, device tags, and suggested defenses",
      "Decoupled domain learning from interaction complexity",
      "Optimized 28-cell board track using Monte Carlo simulations (300 runs)",
    ],
  },
  {
    num: "04",
    tag: "Validation",
    tagColor: "purple",
    title: "Empirical Evaluation",
    subtitle: "Mixed-Methods Assessment",
    bullets: [
      "Evaluated with N = 50 university students (SC vs NC cohorts)",
      "Pre/post knowledge tests evaluated threat and defense transfer",
      "System Usability Scale (SUS), NASA-TLX, and TAM surveys",
      "Parallel N = 20 test-retest control baseline to verify learning",
    ],
  },
  {
    num: "05",
    tag: "Publication",
    tagColor: "emerald",
    title: "USENIX SOUPS 2026",
    subtitle: "Hannover, Germany",
    bullets: [
      "Peer-reviewed acceptance in the USENIX SOUPS 2026 Proceedings",
      "Empirically validated the 'CyQured Paradox' in usable security",
      "Demonstrated large-effect knowledge gains across all cohorts (d > 1.5)",
    ],
  },
  {
    num: "06",
    tag: "Impact",
    tagColor: "blue",
    title: "Usable Security Impact",
    subtitle: "Artifact & Next Steps",
    bullets: [
      "Actionable guidelines for designing low-barrier security games",
      "Open-access game assets and rulebook for community deployment",
      "Foundation for longitudinal and multi-generational family trials",
    ],
  },
];

export function SerpentinePipeline({ steps = DEFAULT_STEPS }: { steps?: SerpentineStep[] }) {
  const getTagClass = (color: SerpentineStep["tagColor"]) => {
    switch (color) {
      case "amber":
        return styles.tagAmber;
      case "sky":
        return styles.tagSky;
      case "purple":
        return styles.tagPurple;
      case "emerald":
        return styles.tagEmerald;
      case "blue":
        return styles.tagBlue;
      default:
        return styles.tagSlate;
    }
  };

  const renderCard = (step: SerpentineStep, isFinal = false) => (
    <div className={`${styles.card} ${isFinal ? styles.finalCard : ""}`}>
      <div className={styles.cardHeader}>
        <div className={styles.titleArea}>
          <span className={`${styles.phaseTag} ${getTagClass(step.tagColor)}`}>
            Phase {step.num} · {step.tag}
          </span>
          <h4 className={styles.cardTitle}>{step.title}</h4>
          <span className={styles.cardSubtitle}>{step.subtitle}</span>
        </div>
        <div className={styles.numBadge}>{step.num}</div>
      </div>

      <ul className={styles.bulletList}>
        {step.bullets.map((b, idx) => (
          <li key={idx} className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* 1. DESKTOP / TABLET SERPENTINE GRID (3-Column Layout with Explicit Connectors) */}
      <div className={styles.desktopGrid}>
        {/* ROW 1: Phase 01 ──▶ Phase 02 */}
        <div className={styles.gridCard1}>{renderCard(steps[0])}</div>

        <div className={styles.gridArrow1}>
          <div className={styles.hConnector}>
            <div className={styles.arrowTrack}>
              <div className={styles.arrowLine} />
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" className={styles.arrowHeadRight}>
                <polygon points="4,2 14,9 4,16" />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.gridCard2}>{renderCard(steps[1])}</div>

        {/* TURN 1 (Right Bend): Downward flow from Phase 02 into Phase 03 */}
        <div className={styles.gridTurn1}>
          <div className={styles.turnTrack}>
            <span className={styles.turnPill}>Phase 02 ↴ Phase 03</span>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" className={styles.turnSvg}>
              <rect x="16" y="2" width="4" height="20" rx="2" />
              <polygon points="8,20 18,32 28,20" />
            </svg>
          </div>
        </div>

        {/* ROW 2: Phase 04 ◀── Phase 03 (Serpentine Flow: Right to Left) */}
        <div className={styles.gridCard4}>{renderCard(steps[3])}</div>

        <div className={styles.gridArrow2}>
          <div className={styles.hConnector}>
            <div className={styles.arrowTrack}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" className={styles.arrowHeadLeft}>
                <polygon points="14,2 4,9 14,16" />
              </svg>
              <div className={styles.arrowLine} />
            </div>
          </div>
        </div>

        <div className={styles.gridCard3}>{renderCard(steps[2])}</div>

        {/* TURN 2 (Left Bend): Downward flow from Phase 04 into Phase 05 */}
        <div className={styles.gridTurn2}>
          <div className={styles.turnTrack}>
            <span className={styles.turnPill}>Phase 04 ↳ Phase 05</span>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" className={styles.turnSvg}>
              <rect x="16" y="2" width="4" height="20" rx="2" />
              <polygon points="8,20 18,32 28,20" />
            </svg>
          </div>
        </div>

        {/* ROW 3: Phase 05 ──▶ Phase 06 (USENIX SOUPS 2026 -> Impact) */}
        <div className={styles.gridCard5}>{renderCard(steps[4])}</div>

        <div className={styles.gridArrow3}>
          <div className={styles.hConnector}>
            <div className={styles.arrowTrack}>
              <div className={styles.arrowLine} />
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" className={styles.arrowHeadRight}>
                <polygon points="4,2 14,9 4,16" />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.gridCard6}>{renderCard(steps[5], true)}</div>
      </div>

      {/* 2. MOBILE SINGLE-COLUMN STACK (< 768px) with Explicit Downward Arrows */}
      <div className={styles.mobileStack}>
        {steps.map((step, idx) => (
          <div key={step.num}>
            {renderCard(step, idx === steps.length - 1)}
            {idx < steps.length - 1 && (
              <div className={styles.mobileConnector}>
                <div className={styles.mobileLineTrack}>
                  <div className={styles.mobileLine} />
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className={styles.mobileArrowSvg}>
                    <polygon points="4,5 10,14 16,5" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
