import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { AccordionRow } from "@/components/primitives/AccordionRow";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import { problemSolvingData } from "@/content/problemSolving";
import styles from "./ProblemSolving.module.css";

export function ProblemSolving() {
  const { totalSolved, description, codeforces, leetcode, otherJudges, campusContests } = problemSolvingData;

  return (
    <Section id="problem-solving" label="Problem Solving" title="Algorithmic problem solving & contests.">
      <Reveal>
        <p className={styles.description}>
          <span className={styles.totalSolved}>{totalSolved}</span> {description}
        </p>
      </Reveal>

      <div className={styles.list}>
        <Reveal delay={1}>
          <AccordionRow
            title={codeforces.handle}
            subtitle={`${codeforces.platform} · Primary handle`}
            meta={<span className={styles.ratingBadge}>{codeforces.badge}</span>}
          >
            <a href={codeforces.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span>View profile</span>
              <IconArrowUpRight size={12} />
            </a>

            {codeforces.additionalHandles && codeforces.additionalHandles.length > 0 ? (
              <div className={styles.altHandles}>
                <span className={styles.altLabel}>Alternate handles</span>
                {codeforces.additionalHandles.map((alt) => (
                  <a key={alt.handle} href={alt.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <span>
                      {alt.handle}
                      {alt.rating ? ` (${alt.rating})` : ""}
                    </span>
                    <IconArrowUpRight size={10} />
                  </a>
                ))}
              </div>
            ) : null}
          </AccordionRow>
        </Reveal>

        <Reveal delay={2}>
          <AccordionRow
            title={leetcode.handle}
            subtitle={`${leetcode.platform} · ${leetcode.problemsSolved} problems solved`}
            meta={<span className={styles.ratingBadge}>{leetcode.badge}</span>}
          >
            <a href={leetcode.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span>View profile</span>
              <IconArrowUpRight size={12} />
            </a>

            {leetcode.metaBadges && leetcode.metaBadges.length > 0 ? (
              <div className={styles.metaBadges}>
                {leetcode.metaBadges.map((badge) => (
                  <Chip key={badge.label}>{`${badge.label}: ${badge.value}`}</Chip>
                ))}
              </div>
            ) : null}
          </AccordionRow>
        </Reveal>

        <Reveal delay={3}>
          <AccordionRow title="Practice judges" subtitle={`${otherJudges.length} platforms`}>
            <div className={styles.judgeGrid}>
              {otherJudges.map((judge) => (
                <a
                  key={judge.platform}
                  href={judge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.judgeLink}
                >
                  <span className={styles.judgePlatform}>{judge.platform}</span>
                  <span className={styles.link}>
                    <span>{judge.handle}</span>
                    <IconArrowUpRight size={10} />
                  </span>
                </a>
              ))}
            </div>
          </AccordionRow>
        </Reveal>

        <Reveal delay={3}>
          <AccordionRow
            eyebrow={campusContests.dates}
            title={campusContests.title}
            subtitle={campusContests.institution}
            meta={<Chip>{campusContests.tag}</Chip>}
          >
            <p>{campusContests.detail}</p>
          </AccordionRow>
        </Reveal>
      </div>
    </Section>
  );
}
