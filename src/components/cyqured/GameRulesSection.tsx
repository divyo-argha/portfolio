import styles from "./GameRulesSection.module.css";

const TURN_STEPS = [
  {
    step: "STEP 01",
    title: "Roll & Move",
    desc: "Roll the dice and advance your token clockwise around the 28 connected home cells.",
  },
  {
    step: "STEP 02",
    title: "Land & Resolve",
    desc: "Trigger the landed cell: acquire an unowned smart device, draw Chance, or resolve a Scenario.",
  },
  {
    step: "STEP 03",
    title: "Decide & Play",
    desc: "Play an Attack card targeting an opponent's device, or play Defenses to protect your home network.",
  },
  {
    step: "STEP 04",
    title: "Explain Aloud",
    desc: "Read the threat aloud and verbally justify why your defense counters it to lock in your points.",
    highlight: true,
  },
];

const STRIDE_CATEGORIES = [
  {
    letter: "S",
    name: "Spoofing",
    color: "#5ee1f2",
    desc: "Impersonating a person, device, or service to gain unauthorized access (e.g., Phishing, Caller ID Spoofing).",
  },
  {
    letter: "T",
    name: "Tampering",
    color: "#4fe0a8",
    desc: "Modifying data, code, or firmware streams maliciously (e.g., Firmware Tampering, MitM Attacks).",
  },
  {
    letter: "R",
    name: "Repudiation",
    color: "#b48fe0",
    desc: "Denying an unauthorized action occurred due to insufficient logging or missing digital audit trails.",
  },
  {
    letter: "I",
    name: "Information Disclosure",
    color: "#f5a623",
    desc: "Exposing private credentials, video feeds, or sensitive network traffic to unauthorized parties.",
  },
  {
    letter: "D",
    name: "Denial of Service",
    color: "#ff5e7e",
    desc: "Overwhelming connected devices or home servers to render them unavailable for legitimate use.",
  },
  {
    letter: "E",
    name: "Elevation of Privilege",
    color: "#a3d94f",
    desc: "Exploiting vulnerabilities to escalate permissions and gain administrator or root control.",
  },
];

export function GameRulesSection() {
  return (
    <section id="rules" className={styles.section} aria-label="Game Rules and Mechanics">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Gameplay Framework</span>
        <h2 className={styles.title}>Rules & Mechanics</h2>
        <p className={styles.subtitle}>
          How turns work, how STRIDE threat counters resolve, and what it takes to protect your connected home.
        </p>
      </div>

      {/* Turn Pipeline */}
      <h3 className={styles.subheading}>Turn Progression</h3>
      <div className={styles.flowGrid}>
        {TURN_STEPS.map((s) => (
          <div
            key={s.step}
            className={[styles.flowCard, s.highlight ? styles.flowHighlight : ""].join(" ")}
          >
            <span className={styles.flowStep}>{s.step}</span>
            <h4 className={styles.flowTitle}>{s.title}</h4>
            <p className={styles.flowDesc}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* STRIDE Threats */}
      <h3 className={styles.subheading}>STRIDE Threat Model</h3>
      <div className={styles.strideGrid}>
        {STRIDE_CATEGORIES.map((cat) => (
          <div
            key={cat.letter}
            className={styles.strideCard}
            style={{ "--card-color": cat.color } as React.CSSProperties}
          >
            <div className={styles.strideBadge}>
              <span className={styles.strideLetter}>{cat.letter}</span>
              <span>
                <span className={styles.strideInitial}>{cat.name.charAt(0)}</span>
                {cat.name.slice(1)}
              </span>
            </div>
            <p className={styles.strideDesc}>{cat.desc}</p>
          </div>
        ))}
      </div>

      {/* Battle Resolution & End Conditions */}
      <div className={styles.splitGrid}>
        <div className={styles.ruleBox}>
          <h3 className={styles.ruleBoxTitle}>Battle & Compromise Rules</h3>
          <ul className={styles.ruleList}>
            <li className={styles.ruleItem}>
              <span className={styles.ruleBullet}>01</span>
              <div>
                <strong>Attack Deployment:</strong> Attacker chooses an attack card compatible with the defender’s device type.
              </div>
            </li>
            <li className={styles.ruleItem}>
              <span className={styles.ruleBullet}>02</span>
              <div>
                <strong>Defense Response:</strong> Defender has one turn to play a matching mitigation card (e.g., MFA, Firewall, Encryption).
              </div>
            </li>
            <li className={styles.ruleItem}>
              <span className={styles.ruleBullet}>03</span>
              <div>
                <strong>Critical Infrastructure:</strong> The Wireless Router (18 pts) and Home Server (20 pts) affect all child devices on the network when compromised.
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.ruleBox}>
          <h3 className={styles.ruleBoxTitle}>Victory Conditions (Flexible: Choose One)</h3>
          <ul className={styles.ruleList}>
            <li className={styles.ruleItem}>
              <span className={styles.ruleBullet}>01</span>
              <div>
                <strong>Elimination:</strong> Last player holding credit points and functioning connected devices wins the match.
              </div>
            </li>
            <li className={styles.ruleItem}>
              <span className={styles.ruleBullet}>02</span>
              <div>
                <strong>Timed Match:</strong> Highest combined device defense and credit points when the session timer expires.
              </div>
            </li>
            <li className={styles.ruleItem}>
              <span className={styles.ruleBullet}>03</span>
              <div>
                <strong>Target Score:</strong> First player to secure the agreed network credit milestone (e.g. 100 points).
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
