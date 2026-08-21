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
  // The <h2> always renders, because `aria-labelledby` below always points at
  // it. When a section has no visible title it falls back to its eyebrow label
  // and is hidden visually only — that keeps the accessible name intact and
  // stops the heading outline jumping from <h1> straight to <h3>.
  const hasVisibleTitle = Boolean(title);

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
            <h2
              id={`${id}-heading`}
              className={hasVisibleTitle ? styles.title : "visually-hidden"}
            >
              {hasVisibleTitle ? title : label}
            </h2>
            {lede ? <p className={styles.lede}>{lede}</p> : null}
          </div>
        </Reveal>
      </Container>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
