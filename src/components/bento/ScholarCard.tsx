import { IconArrowUpRight, IconScholar } from "@/components/primitives/Icons";
import cardStyles from "./BentoCard.module.css";
import styles from "./ScholarCard.module.css";

const SCHOLAR_URL = "https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en";

export function ScholarCard() {
  return (
    <article className={[cardStyles.card, cardStyles.interactive, cardStyles.stretchedLink, styles.card].join(" ")}>
      <div className={styles.iconWrapper}>
        <IconScholar size={30} className={styles.icon} />
      </div>
      <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
        <span>Google Scholar</span>
        <IconArrowUpRight size={14} className={styles.arrow} />
      </a>
      <p className={styles.note}>4 citations · Full publication record</p>
    </article>
  );
}
