import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { IconArrowUpRight, IconCode, IconTrophy } from "@/components/primitives/Icons";
import { problemSolvingData } from "@/content/problemSolving";
import styles from "./ProblemSolving.module.css";

export function ProblemSolving() {
  const { totalSolved, description, codeforces, leetcode, otherJudges, campusContests } =
    problemSolvingData;

  return (
    <Section
      id="problem-solving"
      label="Problem Solving"
      title="Algorithmic problem solving & competitive practice."
    >
      <div className={styles.bentoGrid}>
        {/* Bento Cell 1: Hero Overview */}
        <div className={styles.overviewCard}>
          <Reveal>
            <article className={styles.card}>
              <div className={styles.overviewMain}>
                <span className={styles.overviewEyebrow}>Online Judges & Practice</span>
                <div className={styles.overviewHeroRow}>
                  <span className={styles.overviewNumber}>{totalSolved}</span>
                  <span className={styles.overviewNumberLabel}>Problems Solved Across Online Judges</span>
                </div>
                <p className={styles.overviewBody}>{description}</p>
                <div className={styles.overviewTags}>
                  <span className={styles.overviewTag}>Data Structures</span>
                  <span className={styles.overviewTag}>Graph Theory</span>
                  <span className={styles.overviewTag}>Dynamic Programming</span>
                  <span className={styles.overviewTag}>Competitive Contests</span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Bento Cell 2: Codeforces Specialist */}
        <div className={styles.codeforcesCard}>
          <Reveal delay={1}>
            <article className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardPlatform}>
                  <span className={styles.cardPlatformIcon}>
                    <IconCode size={16} />
                  </span>
                  <span>{codeforces.platform}</span>
                </span>
                <span className={styles.specialistBadge}>{codeforces.badge}</span>
              </div>

              <div className={styles.handleRow}>
                <a
                  href={codeforces.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.handleLink}
                >
                  <span>{codeforces.handle}</span>
                  <IconArrowUpRight size={13} className={styles.handleArrow} />
                </a>
                <span className={styles.handleSubtext}>Primary Handle</span>
              </div>

              {codeforces.additionalHandles && codeforces.additionalHandles.length > 0 ? (
                <div className={styles.altSection}>
                  <span className={styles.altLabel}>Alternate Handles</span>
                  <div className={styles.altList}>
                    {codeforces.additionalHandles.map((alt) => (
                      <a
                        key={alt.handle}
                        href={alt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.altChip}
                      >
                        <span>{alt.handle}</span>
                        {alt.rating ? <span className={styles.altRating}>({alt.rating})</span> : null}
                        <IconArrowUpRight size={10} className={styles.handleArrow} />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          </Reveal>
        </div>

        {/* Bento Cell 3: LeetCode */}
        <div className={styles.leetcodeCard}>
          <Reveal delay={2}>
            <article className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardPlatform}>{leetcode.platform}</span>
                <span className={styles.leetcodeBadge}>{leetcode.badge}</span>
              </div>

              <div className={styles.handleRow}>
                <a
                  href={leetcode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.handleLink}
                >
                  <span>{leetcode.handle}</span>
                  <IconArrowUpRight size={13} className={styles.handleArrow} />
                </a>
                <span className={styles.handleSubtext}>Knight · Rating {leetcode.rating}</span>
              </div>

              {leetcode.metaBadges && leetcode.metaBadges.length > 0 ? (
                <div className={styles.leetcodeStatsGrid}>
                  {leetcode.metaBadges.map((badge) => (
                    <div key={badge.label} className={styles.leetcodeStatItem}>
                      <span className={styles.leetcodeStatVal}>{badge.value}</span>
                      <span className={styles.leetcodeStatLbl}>{badge.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.cardBody}>
                  Continuous problem solving across algorithmic patterns, tree/graph traversals, recursion, and dynamic programming.
                </p>
              )}
            </article>
          </Reveal>
        </div>

        {/* Bento Cell 4: SUST Intra-University Contests */}
        <div className={styles.sustCard}>
          <Reveal delay={2}>
            <article className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardPlatform}>
                  <span className={styles.cardPlatformIcon}>
                    <IconTrophy size={16} />
                  </span>
                  <span>{campusContests.title}</span>
                </span>
                <span className={styles.sustBadge}>{campusContests.tag}</span>
              </div>

              <p className={styles.cardBody}>{campusContests.detail}</p>

              <div className={styles.sustMeta}>
                <span className={styles.sustInst}>{campusContests.institution}</span>
                <span className={styles.sustDates}>{campusContests.dates}</span>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Bento Cell 5: Practice Archives */}
        <div className={styles.archivesCard}>
          <Reveal delay={3}>
            <article className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardPlatform}>Practice Judges</span>
                <span className={styles.archivesBadge}>{otherJudges.length} Platforms</span>
              </div>

              <div className={styles.archivesGrid}>
                {otherJudges.map((judge) => (
                  <div key={judge.platform} className={styles.archiveItem}>
                    <span className={styles.archivePlatform}>{judge.platform}</span>
                    <a
                      href={judge.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.archiveLink}
                    >
                      <span>{judge.handle}</span>
                      <IconArrowUpRight size={10} />
                    </a>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
