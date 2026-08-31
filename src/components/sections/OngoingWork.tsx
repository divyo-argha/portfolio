import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { AccordionRow } from "@/components/primitives/AccordionRow";
import { ongoingWork } from "@/content/research";
import styles from "./OngoingWork.module.css";

/**
 * Deliberately not a full `Section` — no big title, just a divider and a
 * small "Current" label above the list, since this is a footnote to
 * Publications rather than its own headline-level topic.
 */
export function OngoingWork() {
  return (
    <section id="ongoing-work" className={styles.wrap} aria-label="Ongoing work">
      <Container>
        <p className={styles.label}>Current</p>
        <div className={styles.list}>
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
      </Container>
    </section>
  );
}
