import styles from "./BarChart.module.css";

type BarItem = { label: string; value: number; highlight?: boolean };

export function BarChart({ items, unit = "%" }: { items: BarItem[]; unit?: string }) {
  const max = Math.max(...items.map((item) => item.value));

  return (
    <div className={styles.chart}>
      {items.map((item) => (
        <div key={item.label} className={styles.row}>
          <span className={styles.label}>{item.label}</span>
          <div className={styles.track}>
            <div
              className={item.highlight ? styles.fillHighlight : styles.fill}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
          <span className={item.highlight ? styles.valueHighlight : styles.value}>
            {item.value}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
