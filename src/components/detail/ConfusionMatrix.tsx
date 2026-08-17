import styles from "./ConfusionMatrix.module.css";

export function ConfusionMatrix({
  truePositive,
  trueNegative,
  falsePositive,
  falseNegative,
  positiveLabel,
  negativeLabel,
}: {
  truePositive: number;
  trueNegative: number;
  falsePositive: number;
  falseNegative: number;
  positiveLabel: string;
  negativeLabel: string;
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        <div className={styles.corner} />
        <div className={styles.colHead}>Predicted {positiveLabel}</div>
        <div className={styles.colHead}>Predicted {negativeLabel}</div>

        <div className={styles.rowHead}>Actually {positiveLabel}</div>
        <div className={[styles.cell, styles.correct].join(" ")}>
          <span className={styles.count}>{truePositive.toLocaleString()}</span>
          <span className={styles.cellLabel}>True positive</span>
        </div>
        <div className={[styles.cell, styles.wrong].join(" ")}>
          <span className={styles.count}>{falseNegative.toLocaleString()}</span>
          <span className={styles.cellLabel}>False negative</span>
        </div>

        <div className={styles.rowHead}>Actually {negativeLabel}</div>
        <div className={[styles.cell, styles.wrong].join(" ")}>
          <span className={styles.count}>{falsePositive.toLocaleString()}</span>
          <span className={styles.cellLabel}>False positive</span>
        </div>
        <div className={[styles.cell, styles.correct].join(" ")}>
          <span className={styles.count}>{trueNegative.toLocaleString()}</span>
          <span className={styles.cellLabel}>True negative</span>
        </div>
      </div>
    </div>
  );
}
