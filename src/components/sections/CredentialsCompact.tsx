import { Section } from "@/components/primitives/Section";
import { ExpandableEntry } from "./ExpandableEntry";
import { education } from "@/content/education";
import { positions } from "@/content/experience";
import styles from "./CredentialsCompact.module.css";

const KIND_LABEL: Record<(typeof positions)[number]["kind"], string> = {
  education: "Education",
  research: "Research",
  industry: "Industry",
  service: "Service",
  leadership: "Leadership",
};

/**
 * Education + Experience, compacted to one line per entry with an optional
 * expand for bullet detail — the full-CV-length version lives in the PDF
 * (see Hero's Download CV), not here. This is Home's lowest-priority section
 * by design (see the research sections above it); it exists so a reader can
 * confirm trajectory at a glance without leaving the page.
 */
export function CredentialsCompact() {
  const { university, secondary } = education;

  return (
    <Section id="background" label="Background" title="Education & experience.">
      <div className={styles.columns}>
        <div className={styles.group}>
          <h3 className={styles.groupLabel}>Education</h3>
          <div className={styles.list}>
            <ExpandableEntry
              title={university.degree}
              meta={`${university.institution} · ${university.dates} · ${university.result}`}
              bullets={[
                `Undergraduate thesis: "${university.thesis.title}"`,
                `Supervisors: ${university.thesis.supervisors.join(", ")}`,
              ]}
              link={{ label: "Thesis → SOUPS 2026 paper", href: `/publications/${university.thesis.publicationSlug}` }}
            />
            <ExpandableEntry
              title={secondary.institution}
              meta={secondary.location}
              bullets={secondary.exams.map((exam) => `${exam.stage} (${exam.abbr}): ${exam.group} · ${exam.result}`)}
            />
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupLabel}>Experience</h3>
          <div className={styles.list}>
            {positions.map((position) => (
              <ExpandableEntry
                key={position.title + position.org}
                title={position.title}
                meta={`${KIND_LABEL[position.kind]} · ${position.org} · ${position.dates}`}
                bullets={position.bullets}
                link={position.link}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
