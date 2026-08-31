import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { AccordionRow } from "@/components/primitives/AccordionRow";
import { ongoingWork } from "@/content/research";
import styles from "./ResearchSections.module.css";

export function OngoingWork() {
  return (
    <Section id="ongoing-work" label="Ongoing work" title="What's in progress right now.">
      <div className={styles.subBlock}>
        {ongoingWork.map((item, i) => (
          <Reveal key={item.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
            <AccordionRow
              eyebrow={item.dates}
              title={item.title}
              subtitle={item.org}
              meta={item.tags.slice(0, 2).map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            >
              {item.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </AccordionRow>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
