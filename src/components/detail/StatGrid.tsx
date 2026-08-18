import styles from "./StatGrid.module.css";

type StatItem = { value: string; label: string; highlight?: boolean };

export function StatGrid({ items, columns = 4 }: { items: StatItem[]; columns?: 2 | 3 | 4 | 5 }) {
  return (
    <div className={[styles.grid, styles[`cols${columns}`]].join(" ")}>
      {items.map((item) => (
        <div
          key={item.label}
          className={[styles.card, item.highlight ? styles.cardHighlight : ""].join(" ")}
        >
          <span className={[styles.value, item.highlight ? styles.valueHighlight : ""].join(" ")}>
            {item.value}
          </span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
