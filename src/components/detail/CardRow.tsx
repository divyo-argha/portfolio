import Image from "next/image";
import styles from "./CardRow.module.css";

export type CardSample = {
  src: string;
  alt: string;
  category: string;
  categoryColor: "cyan" | "emerald" | "amber" | "purple";
  title: string;
  description: string;
};

const DEFAULT_CARDS: CardSample[] = [
  {
    src: "/media/publications/cyqured/example-attack.webp",
    alt: "CyQured attack card example",
    category: "Attack Action",
    categoryColor: "cyan",
    title: "STRIDE Threat Cards",
    description: "Targets devices with explicit attack titles and prompts",
  },
  {
    src: "/media/publications/cyqured/example-defense.webp",
    alt: "CyQured defense card example",
    category: "Defense Action",
    categoryColor: "emerald",
    title: "Counter-Mitigations",
    description: "Specifies matching defenses and protected device types",
  },
  {
    src: "/media/publications/cyqured/example-chance.webp",
    alt: "CyQured chance card example",
    category: "Chance Event",
    categoryColor: "amber",
    title: "Real-World Events",
    description: "Injects uncertainty, incident responses, and network outages",
  },
  {
    src: "/media/publications/cyqured/cards/scenario/scenario-02.webp",
    alt: "CyQured scenario challenge card example",
    category: "Scenario Challenge",
    categoryColor: "purple",
    title: "Incident Scenarios",
    description: "Prompts players to identify STRIDE categories for points",
  },
];

export function CardRow({ cards = DEFAULT_CARDS }: { cards?: CardSample[] }) {
  const getTagClass = (color: CardSample["categoryColor"]) => {
    switch (color) {
      case "emerald":
        return styles.tagEmerald;
      case "amber":
        return styles.tagAmber;
      case "purple":
        return styles.tagPurple;
      default:
        return styles.tagCyan;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {cards.map((c, idx) => (
          <div key={idx} className={styles.cardItem}>
            <div className={styles.imageFrame}>
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(min-width: 768px) 220px, 50vw"
                className={styles.cardImage}
              />
            </div>
            <div className={styles.metaArea}>
              <span className={`${styles.categoryTag} ${getTagClass(c.categoryColor)}`}>
                {c.category}
              </span>
              <h5 className={styles.cardTitle}>{c.title}</h5>
              <p className={styles.cardDesc}>{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
