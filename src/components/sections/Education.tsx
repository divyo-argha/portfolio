"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { IconChevronDown } from "@/components/primitives/Icons";
import { education } from "@/content/education";
import styles from "./Education.module.css";

export function Education() {
  const { university, secondary } = education;
  const [expanded, setExpanded] = useState(false);

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

            {/* Thesis Callout */}
            <div className={styles.thesisBlock}>
              <div className={styles.thesisHeader}>
                <span className={styles.thesisPill}>Undergraduate Thesis</span>
                <span className={styles.thesisAcceptedBadge}>Accepted at USENIX SOUPS 2026</span>
              </div>

              <h4 className={styles.thesisTitle}>&ldquo;{university.thesis.title}&rdquo;</h4>

              <div className={styles.thesisMetaGrid}>
                <div className={styles.thesisMetaItem}>
                  <span className={styles.thesisMetaLabel}>Authors:</span>
                  <span className={styles.thesisMetaValue}>
                    {university.thesis.authors.map((author, idx) => (
                      <span key={author.name}>
                        {author.you ? (
                          <strong className={styles.youAuthor}>
                            <u>{author.name}</u>
                          </strong>
                        ) : (
                          author.name
                        )}
                        {idx < university.thesis.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </span>
                </div>

                <div className={styles.thesisMetaItem}>
                  <span className={styles.thesisMetaLabel}>Supervisors:</span>
                  <span className={styles.thesisMetaValue}>
                    {university.thesis.supervisors.join(", ")}
                  </span>
                </div>
              </div>

              <p className={styles.thesisSummary}>{university.thesis.summary}</p>
            </div>

            {/* Accordion Toggle for Coursework & Highlights */}
            <button
              type="button"
              className={styles.accordionToggle}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              <span>{expanded ? "Hide Coursework & Highlights" : "View Relevant Coursework & Highlights (13 Courses)"}</span>
              <IconChevronDown
                size={15}
                className={[styles.chevron, expanded ? styles.chevronExpanded : ""].join(" ")}
              />
            </button>

            {/* Collapsible Drawer */}
            {expanded ? (
              <div className={styles.accordionDrawer}>
                <div className={styles.courseworkSection}>
                  <h4 className={styles.subHeading}>Relevant Coursework</h4>
                  <div className={styles.courseworkGrid}>
                    {university.coursework.map((course) => (
                      <span key={course} className={styles.courseTag}>
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.highlightsSection}>
                  <h4 className={styles.subHeading}>Highlights</h4>
                  <ul className={styles.highlightList}>
                    {university.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </article>
        </Reveal>

        {/* School & College Secondary Grid */}
        <div className={styles.secondaryGrid}>
          {secondary.map((item, idx) => (
            <Reveal key={item.institution + item.exam} delay={(idx + 1) as 1 | 2}>
              <article className={styles.secondaryCard}>
                <div className={styles.secLogoWrapper}>
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={46}
                    height={46}
                    className={styles.secLogoImg}
                  />
                </div>

                <div className={styles.secContent}>
                  <div className={styles.secBadgeRow}>
                    <span className={styles.secExamBadge}>{item.exam}</span>
                    <span className={styles.secGroup}>{item.group}</span>
                  </div>
                  <h4 className={styles.secInstitution}>{item.institution}</h4>
                  <p className={styles.secLocation}>{item.location}</p>
                </div>

                <div className={styles.secResult}>
                  <span className={styles.secResultLabel}>Result</span>
                  <span className={styles.secResultValue}>{item.result}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
