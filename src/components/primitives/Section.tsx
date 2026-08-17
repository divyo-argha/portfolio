import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import styles from "./Section.module.css";

type SectionProps = {
  id: string;
  label: string;
  title?: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  bleed?: boolean;
  tone?: "default" | "raised";
};

export function Section({ id, label, title, lede, children, bleed, tone = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={[styles.section, tone === "raised" ? styles.raised : ""].join(" ")}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <Reveal>
          <div className={styles.head}>
            <Eyebrow>{label}</Eyebrow>
            {title ? (
              <h2 id={`${id}-heading`} className={styles.title}>
                {title}
              </h2>
            ) : null}
            {lede ? <p className={styles.lede}>{lede}</p> : null}
          </div>
        </Reveal>
      </Container>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
