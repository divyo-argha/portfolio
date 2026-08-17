import { IconArrowUpRight, IconScholar } from "@/components/primitives/Icons";
import cardStyles from "./BentoCard.module.css";
import styles from "./ScholarCard.module.css";

const SCHOLAR_URL = "https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en";

export function ScholarCard() {
  return (
    <article className={[cardStyles.card, cardStyles.interactive, cardStyles.stretchedLink, styles.card].join(" ")}>
      <IconScholar size={22} className={styles.icon} />
      <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Google Scholar
        <IconArrowUpRight size={13} />
      </a>
      <p className={styles.note}>Full publication record</p>
    </article>
  );
}
