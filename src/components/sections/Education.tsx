import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import { education } from "@/content/education";
import styles from "./Education.module.css";

export function Education() {
  const { university, secondary } = education;

  return (
    <Section id="education" label="Education" title="Academic background">
      <div className={styles.container}>
        {/* Featured University Card */}
        <Reveal>
          <article className={styles.universityCard}>
            <div className={styles.uniHeader}>
              <div className={styles.logoWrapper}>
                <Image
                  src={university.logo.src}
                  alt={university.logo.alt}
                  width={90}
                  height={90}
                  className={styles.logoImg}
                />
              </div>

              <div className={styles.uniMeta}>
                <div className={styles.badgeRow}>
                  <span className={styles.degreeBadge}>Undergraduate Degree</span>
                  <span className={styles.dates}>{university.dates}</span>
                </div>
                <h3 className={styles.degreeTitle}>{university.degree}</h3>
                <p className={styles.institutionName}>{university.institution} · {university.location}</p>
              </div>

              <div className={styles.resultBadge}>
                <span className={styles.resultLabel}>Result</span>
                <span className={styles.resultValue}>{university.result}</span>
              </div>
            </div>

            {/* Thesis Callout — a pointer to the paper, not a retelling of it */}
            <div className={styles.thesisBlock}>
              <div className={styles.thesisHeader}>
                <span className={styles.thesisPill}>Undergraduate Thesis</span>
                <span className={styles.thesisAcceptedBadge}>Accepted at USENIX SOUPS 2026</span>
              </div>

              <h4 className={styles.thesisTitle}>
                <Link
                  href={`/publications/${university.thesis.publicationSlug}`}
                  className={styles.thesisLink}
                >
                  <span>&ldquo;{university.thesis.title}&rdquo;</span>
                  <IconArrowUpRight size={13} className={styles.thesisArrow} />
                </Link>
              </h4>

              <div className={styles.thesisMeta}>
                <p className={styles.thesisMetaRow}>
                  <span className={styles.thesisMetaLabel}>Authors</span>
                  <span>
                    {university.thesis.authors.map((author, idx) => (
                      <span key={author.name}>
                        {author.you ? (
                          <Link href="/" className={styles.youLink} title="Argha Pratim Saha — Back to Home">
                            <strong className={styles.youAuthor}>
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
              </div>
            </div>
          </article>
        </Reveal>

        {/* Secondary education — one institution, both exams, one row */}
        <Reveal delay={1}>
          <article className={styles.secondaryRow}>
            <div className={styles.secLogoWrapper}>
              <Image
                src={secondary.logo.src}
                alt={secondary.logo.alt}
                width={44}
                height={44}
                className={styles.secLogoImg}
              />
            </div>

            <div className={styles.secContent}>
              <h4 className={styles.secInstitution}>{secondary.institution}</h4>
              <p className={styles.secLocation}>{secondary.location}</p>
            </div>

            <div className={styles.secExams}>
              {secondary.exams.map((exam) => (
                <div key={exam.abbr} className={styles.secExam}>
                  <span className={styles.secExamStage}>
                    {exam.stage} <span className={styles.secExamAbbr}>({exam.abbr})</span>
                  </span>
                  <span className={styles.secExamResult}>
                    {exam.group} · {exam.result}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
