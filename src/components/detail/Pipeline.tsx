import styles from "./Pipeline.module.css";

type PipelineStep = { label: string; highlight?: boolean };

export function Pipeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <div className={styles.pipeline}>
      {steps.map((step, i) => (
        <div key={step.label} className={styles.stepWrap}>
          <div className={step.highlight ? styles.stepHighlight : styles.step}>{step.label}</div>
          {i < steps.length - 1 ? <span className={styles.arrow}>→</span> : null}
        </div>
      ))}
    </div>
  );
}
