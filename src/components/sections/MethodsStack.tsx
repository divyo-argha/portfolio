import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import { methodGroups } from "@/content/skills";
import styles from "./MethodsStack.module.css";

export function MethodsStack() {
  return (
    <div className={styles.sectionWrap}>
      <div className={styles.subheadBlock}>
        <span className={styles.subheadEyebrow}>03 · Methodologies</span>
        <h3 className={styles.subheadTitle}>Empirical study methods & evaluation.</h3>
        <p className={styles.subheadLede}>
          Every method below is directly attached to the published study or manuscript that employed it, with its sample size and measurement protocols.
        </p>
      </div>

      <div className={styles.studiesGrid}>
        {methodGroups.map((group, i) => (
          <Reveal key={group.study} delay={Math.min(i, 2) as 0 | 1 | 2}>
            <article className={styles.studyCard}>
              <div className={styles.studyHead}>
                <h4 className={styles.studyTitle}>
                  {group.href ? (
                    <Link href={group.href} className={styles.studyLink}>
                      <span>{group.study}</span>
                      <IconArrowUpRight size={13} className={styles.studyArrow} />
                    </Link>
                  ) : (
                    <span>{group.study}</span>
                  )}
                </h4>
                <span className={styles.studyContext}>{group.context}</span>
              </div>
              <ul className={styles.methodList}>
                {group.methods.map((method) => (
                  <li key={method} className={styles.method}>
                    {method}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
