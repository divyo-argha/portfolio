import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { AccordionRow } from "@/components/primitives/AccordionRow";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import { positions } from "@/content/experience";
import styles from "./Experience.module.css";

const KIND_LABEL: Record<(typeof positions)[number]["kind"], string> = {
  education: "Education",
  research: "Research",
  industry: "Industry",
  service: "Service",
  leadership: "Leadership",
};

export function Experience() {
  return (
    <Section id="experience" label="Experience" title="Professional experience & roles.">
      <span id="positions" aria-hidden="true" style={{ position: "absolute", top: 0, left: 0 }} />
      <div className={styles.list}>
        {positions.map((position, i) => (
          <Reveal key={position.title + position.org} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
            <AccordionRow
              icon={position.logo ? <Image src={position.logo.src} alt="" width={56} height={56} /> : null}
              eyebrow={position.dates}
              title={position.title}
              subtitle={position.org}
              meta={<Chip>{KIND_LABEL[position.kind]}</Chip>}
            >
              {position.detail ? <p className={styles.detailLine}>{position.detail}</p> : null}
              <ul>
                {position.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {position.link ? (
                <a
                  href={position.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>{position.link.label}</span>
                  <IconArrowUpRight size={12} />
                </a>
              ) : null}
            </AccordionRow>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
