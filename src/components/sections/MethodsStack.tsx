import { Section } from "@/components/primitives/Section";
import { Chip } from "@/components/primitives/Chip";
import { Reveal } from "@/components/primitives/Reveal";
import { researchMethods, skillGroups, competitiveProgramming } from "@/content/skills";
import styles from "./MethodsStack.module.css";

export function MethodsStack() {
  return (
    <Section id="methods" label="Methods & stack">
      <div className={styles.split}>
        <Reveal>
          <div className={styles.column}>
            <h3 className={styles.heading}>Research methods</h3>
            <ul className={styles.methods}>
              {researchMethods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className={styles.column}>
            <h3 className={styles.heading}>Engineering</h3>
            <div className={styles.groups}>
              {skillGroups.map((group) => (
                <div key={group.label} className={styles.group}>
                  <span className={styles.groupLabel}>{group.label}</span>
                  <div className={styles.chips}>
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.aside}>{competitiveProgramming}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
