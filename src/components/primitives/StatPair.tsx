import styles from "./StatPair.module.css";

export function StatPair({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
