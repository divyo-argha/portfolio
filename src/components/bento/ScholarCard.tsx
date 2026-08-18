import { IconArrowUpRight, IconScholar } from "@/components/primitives/Icons";
import cardStyles from "./BentoCard.module.css";
import styles from "./ScholarCard.module.css";

const SCHOLAR_URL = "https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en";

export function ScholarCard() {
  return (
    <a
      href={SCHOLAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={[cardStyles.card, cardStyles.interactive, styles.card].join(" ")}
      aria-label="Google Scholar — Full publication record"
    >
      <div className={styles.iconWrapper}>
        <IconScholar size={30} className={styles.icon} />
      </div>
      <div className={styles.link}>
        <span>Google Scholar</span>
        <IconArrowUpRight size={14} className={styles.arrow} />
      </div>
      <p className={styles.note}>Full publication record</p>
    </a>
  );
}
