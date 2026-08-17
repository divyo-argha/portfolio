import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import { positions } from "@/content/experience";
import styles from "./Positions.module.css";

const KIND_LABEL: Record<(typeof positions)[number]["kind"], string> = {
  education: "Education",
  research: "Research",
  industry: "Industry",
  service: "Service",
  leadership: "Leadership",
};

export function Positions() {
  return (
    <Section id="positions" label="Positions" title="Experience & roles.">
      <div className={styles.grid}>
        {positions.map((position, i) => (
          <Reveal key={position.title + position.org} delay={Math.min(i, 2) as 0 | 1 | 2}>
            <article className={[styles.card, styles[position.kind]].join(" ")}>
              <div className={styles.topRow}>
                {position.logo ? (
                  <div className={styles.logoWrapper}>
                    <Image
                      src={position.logo.src}
                      alt={position.logo.alt}
                      width={72}
                      height={72}
                      className={styles.logoImg}
                    />
                  </div>
                ) : null}

                <div className={styles.badges}>
                  <span className={[styles.kindBadge, styles[`badge_${position.kind}`]].join(" ")}>
                    <span className={styles.kindDot} />
                    {KIND_LABEL[position.kind]}
                  </span>
                  <span className={styles.datesBadge}>{position.dates}</span>
                </div>
              </div>

              <div className={styles.headerBlock}>
                <h3 className={styles.title}>{position.title}</h3>
                <p className={styles.org}>{position.org}</p>
                {position.detail || position.link ? (
                  <div className={styles.detailRow}>
                    {position.detail ? <span className={styles.detail}>{position.detail}</span> : <span />}
                    {position.link ? (
                      <a
                        href={position.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.inlineLink}
                      >
                        <span>{position.link.label}</span>
                        <IconArrowUpRight size={12} />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <ul className={styles.bullets}>
                {position.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
