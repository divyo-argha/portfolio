import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { positions } from "@/content/experience";
import styles from "./Positions.module.css";

const KIND_LABEL: Record<(typeof positions)[number]["kind"], string> = {
  education: "Education",
  research: "Research",
  industry: "Industry",
  service: "Service",
};

export function Positions() {
  return (
    <Section id="positions" label="Positions" title="Education, research, and industry experience.">
      <div className={styles.grid}>
        {positions.map((position, i) => (
          <Reveal key={position.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
            <article className={[styles.card, styles[position.kind]].join(" ")}>
              <div className={styles.head}>
                <span className={styles.kind}>{KIND_LABEL[position.kind]}</span>
                {position.logo ? (
                  <span className={styles.logo}>
                    <Image
                      src={position.logo.src}
                      alt={position.logo.alt}
                      width={position.logo.width}
                      height={position.logo.height}
                    />
                  </span>
                ) : null}
              </div>
              <h3 className={styles.title}>{position.title}</h3>
              <p className={styles.org}>{position.org}</p>
              <p className={styles.dates}>{position.dates}</p>
              {position.detail ? <p className={styles.detail}>{position.detail}</p> : null}
              <ul className={styles.bullets}>
                {position.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {position.link ? (
                <a href={position.link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {position.link.label}
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
