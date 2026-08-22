import Image from "next/image";
import styles from "./BoardShowcase.module.css";

export type BoardHighlight = {
  label: string;
  text: string;
};

export function BoardShowcase({
  image = "/media/publications/cyqured/board.webp",
  alt = "The CyQured physical board layout modeling connected home devices",
  caption = "Physical board layout modeling 16 connected devices across a modern home ecosystem",
  eyebrow = "Physical Artifact · Tabletop Layout",
  title = "The Connected Home Ecosystem",
  subtitle = "28-Cell Cyclic Monopoly Track Modeling 16 Devices",
  paragraphs = [
    "The CyQured board translates a modern connected household into a tactile 28-cell perimeter track. Players navigate their tokens around the home, acquiring smart appliances, establishing defensive controls, and mitigating adversarial attacks.",
    "Devices are categorized into perimeter endpoints (smart locks, thermostats, IP cameras) and high-stakes network gateways (wireless routers and home servers). A single security failure on a gateway triggers immediate asset compromise.",
  ],
  highlights = [
    { label: "16 Connected Devices", text: "From IoT sensors to home servers and laptops" },
    { label: "Gateway Stakes Rule", text: "Compromising a router transfers device ownership" },
    { label: "Monte Carlo Tuned", text: "300 simulated games balanced landing distributions" },
    { label: "Self-Facilitated", text: "Runs without an external instructor or game master" },
  ],
}: {
  image?: string;
  alt?: string;
  caption?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  highlights?: BoardHighlight[];
}) {
  return (
    <div className={styles.showcase}>
      {/* Left: Board Visual */}
      <div className={styles.visualPane}>
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 860px) 500px, 100vw"
            className={styles.boardImg}
          />
        </div>
        {caption && <p className={styles.caption}>{caption}</p>}
      </div>

      {/* Right: Board Description */}
      <div className={styles.infoPane}>
        <div className={styles.headerGroup}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h4 className={styles.title}>{title}</h4>
          <span className={styles.subtitle}>{subtitle}</span>
        </div>

        {paragraphs.map((p, idx) => (
          <p key={idx} className={styles.bodyText}>
            {p}
          </p>
        ))}

        {highlights && highlights.length > 0 && (
          <div className={styles.highlightsGrid}>
            {highlights.map((h, idx) => (
              <div key={idx} className={styles.highlightCard}>
                <span className={styles.highlightLabel}>{h.label}</span>
                <span className={styles.highlightDesc}>{h.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
