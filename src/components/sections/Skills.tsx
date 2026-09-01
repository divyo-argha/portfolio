import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { skillGroups } from "@/content/skills";
import styles from "./Skills.module.css";

export function Skills() {
  return (
    <Section id="skills" label="Skills" title="Programming languages, systems & tools.">
      <div className={styles.divisions}>
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={Math.min(i, 2) as 0 | 1 | 2}>
            <div className={styles.divisionRow} data-theme={group.theme}>
              <div className={styles.divisionHeader}>
                <h4 className={styles.divisionLabel}>{group.label}</h4>
                <span className={styles.divisionCount}>{group.items.length}</span>
              </div>
              <div className={styles.pillsList}>
                {group.items.map((item) => (
                  <span key={item} className={styles.pill}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
