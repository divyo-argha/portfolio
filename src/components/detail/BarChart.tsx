import styles from "./BarChart.module.css";

type BarItem = { label: string; value: number; highlight?: boolean };

export function BarChart({ items, unit = "%" }: { items: BarItem[]; unit?: string }) {
  const maxVal = Math.max(...items.map((i) => i.value));
  const chartMax = Math.ceil(maxVal / 10) * 10;
  const yTicks = [100, 75, 50, 25, 0];

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartArea}>
        {/* Background Grid Lines & Y-Axis Scale */}
        <div className={styles.gridLines} aria-hidden="true">
          {yTicks.map((tick) => (
            <div key={tick} className={styles.gridLineRow}>
              <span className={styles.yLabel}>
                {tick}
                {unit}
              </span>
              <div className={styles.line} />
            </div>
          ))}
        </div>

        {/* Vertical Columns */}
        <div className={styles.barsContainer}>
          {items.map((item) => {
            const heightPercent = Math.max(4, (item.value / chartMax) * 100);
            return (
              <div
                key={item.label}
                className={[styles.column, item.highlight ? styles.colHighlight : ""].join(" ")}
              >
                <div className={styles.barTrack}>
                  <div
                    className={item.highlight ? styles.barHighlight : styles.bar}
                    style={{ height: `${heightPercent}%` }}
                  >
                    <span className={styles.valBadge}>
                      {item.value}
                      {unit}
                    </span>
                  </div>
                </div>

                <div className={styles.xLabelWrapper}>
                  <span className={styles.xLabel} title={item.label}>
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
