import styles from "./Chip.module.css";

export function Chip({ children }: { children: string }) {
  return <span className={styles.chip}>{children}</span>;
}
