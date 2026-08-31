import type { ReactNode } from "react";
import styles from "./BentoGrid.module.css";

type BentoGridProps = {
  feature: ReactNode;
  iccit: ReactNode;
  naacl: ReactNode;
  scholar: ReactNode;
};

export function BentoGrid({ feature, iccit, naacl, scholar }: BentoGridProps) {
  return (
    <div className={styles.grid}>
      <div className={styles.feature}>{feature}</div>
      <div className={styles.iccit}>{iccit}</div>
      <div className={styles.naacl}>{naacl}</div>
      <div className={styles.scholar}>{scholar}</div>
    </div>
  );
}
