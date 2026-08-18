import styles from "./BarChart.module.css";

type BarItem = { label: string; value: number; highlight?: boolean };

/** Round a max value up to a "nice" chart ceiling, scaled to its own magnitude
 * (e.g. a 1-5 Likert max rounds to the nearest 1, a 0-100 SUS max to the
 * nearest 25) rather than always assuming a 0-100 percentage scale. */
function niceCeiling(value: number): number {
  if (value <= 5) return Math.ceil(value);
  if (value <= 10) return Math.ceil(value / 2) * 2;
  if (value <= 50) return Math.ceil(value / 10) * 10;
  return Math.ceil(value / 25) * 25;
}

export function BarChart({ items, unit = "%" }: { items: BarItem[]; unit?: string }) {
  const maxVal = Math.max(...items.map((i) => i.value));
  const chartMax = niceCeiling(maxVal);
  const yTicks = [chartMax, chartMax * 0.75, chartMax * 0.5, chartMax * 0.25, 0].map((tick) =>
    Number(tick.toFixed(2)),
  );

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
