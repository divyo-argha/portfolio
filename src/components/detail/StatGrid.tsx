import styles from "./StatGrid.module.css";

type StatItem = { value: string; label: string };

export function StatGrid({ items, columns = 4 }: { items: StatItem[]; columns?: 2 | 3 | 4 }) {
  return (
    <div className={[styles.grid, styles[`cols${columns}`]].join(" ")}>
      {items.map((item) => (
        <div key={item.label} className={styles.card}>
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
