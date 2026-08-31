import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { AccordionRow } from "@/components/primitives/AccordionRow";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import { education } from "@/content/education";
import styles from "./Education.module.css";

export function Education() {
  const { university, secondary } = education;

  return (
    <Section id="education" label="Education" title="Degrees, thesis & academic record.">
      <div className={styles.list}>
        <Reveal>
          <AccordionRow
            icon={<Image src={university.logo.src} alt="" width={56} height={56} />}
            eyebrow={university.dates}
            title={university.degree}
            subtitle={`${university.institution} · ${university.location}`}
            meta={<span className={styles.resultBadge}>{university.result}</span>}
            expandable={false}
          >
            <div className={styles.thesisHeader}>
              <span className={styles.thesisPill}>Undergraduate Thesis</span>
              <span className={styles.thesisAcceptedBadge}>Published at USENIX SOUPS 2026</span>
            </div>

            <h4 className={styles.thesisTitle}>
              <Link href={`/publications/${university.thesis.publicationSlug}`} className={styles.thesisLink}>
                <span>&ldquo;{university.thesis.title}&rdquo;</span>
                <IconArrowUpRight size={13} className={styles.thesisArrow} />
              </Link>
            </h4>

            <p className={styles.thesisMetaRow}>
              <span className={styles.thesisMetaLabel}>Authors</span>
              <span>
                {university.thesis.authors.map((author, idx) => (
                  <span key={author.name}>
                    {author.you ? (
                      <Link href="/" className={styles.youLink} title="Argha Pratim Saha — Back to Home">
                        <strong>
                          <u>{author.name}</u>
                        </strong>
                      </Link>
                    ) : (
                      author.name
                    )}
                    {idx < university.thesis.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </p>

            <p className={styles.thesisMetaRow}>
              <span className={styles.thesisMetaLabel}>Supervisors</span>
              <span>{university.thesis.supervisors.join(", ")}</span>
            </p>
          </AccordionRow>
        </Reveal>

        <Reveal delay={1}>
          <AccordionRow
            icon={<Image src={secondary.logo.src} alt="" width={56} height={56} />}
            title={secondary.institution}
            subtitle={secondary.location}
            meta={<Chip>Secondary education</Chip>}
          >
            <div className={styles.examGrid}>
              {secondary.exams.map((exam) => (
                <div key={exam.abbr} className={styles.exam}>
                  <span className={styles.examStage}>
                    {exam.stage} <span className={styles.examAbbr}>({exam.abbr})</span>
                  </span>
                  <span className={styles.examResult}>
                    {exam.group} · {exam.result}
                  </span>
                </div>
              ))}
            </div>
          </AccordionRow>
        </Reveal>
      </div>
    </Section>
  );
}
