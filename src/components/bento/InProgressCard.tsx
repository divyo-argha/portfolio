import cardStyles from "./BentoCard.module.css";
import styles from "./InProgressCard.module.css";

export function InProgressCard() {
  return (
    <article className={cardStyles.card}>
      <span className={styles.dot} aria-hidden="true" />
      <h3 className={styles.title}>In progress</h3>
      <p className={styles.body}>
        Extending CyQured&rsquo;s evaluation methods to home-network threat scenarios, with a manuscript on phishing
        and smishing recognition among young adults in Bangladesh currently in preparation.
      </p>
    </article>
  );
}
