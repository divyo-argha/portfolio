import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { skillGroups } from "@/content/skills";
import styles from "./Skills.module.css";

export function Skills() {
  return (
    <Section id="skills" label="Skills" title="Programming languages, systems & tools.">
      <div className={styles.grid}>
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={Math.min(i, 2) as 0 | 1 | 2}>
            <article className={styles.card}>
              <h4 className={styles.label}>{group.label}</h4>
              <div className={styles.chips}>
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
