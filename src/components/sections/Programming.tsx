import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { IconArrowUpRight, IconCode, IconTrophy } from "@/components/primitives/Icons";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/content/projects";
import { problemSolvingData } from "@/content/problemSolving";
import { skillGroups } from "@/content/skills";
import styles from "./Programming.module.css";

export function Programming() {
  const { totalSolved, description, codeforces, leetcode, otherJudges, campusContests } =
    problemSolvingData;

  return (
    <Section
      id="programming"
      label="Programming"
      title="Software systems, algorithmic problem solving & technical stack."
      lede="Applied software engineering, competitive algorithm practice, and systems tooling."
    >
      {/* Anchor for backward compatibility */}
      <span id="engineering" aria-hidden="true" style={{ position: "relative", top: "-5rem", display: "block" }} />
      <span id="problem-solving" aria-hidden="true" style={{ position: "relative", top: "-5rem", display: "block" }} />

      <div className={styles.container}>
        {/* Subsection 1: Selected Software Projects */}
        <div className={styles.subBlock}>
          <div className={styles.subheadRow}>
            <span className={styles.subheadEyebrow}>01 · Software Systems</span>
            <h3 className={styles.subheadTitle}>Selected software projects.</h3>
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Subsection 2: Algorithmic Problem Solving */}
        <div className={styles.subBlock}>
          <div className={styles.subheadRow}>
            <span className={styles.subheadEyebrow}>02 · Competitive Algorithms</span>
            <h3 className={styles.subheadTitle}>Algorithmic problem solving & contests.</h3>
          </div>

          <div className={styles.problemGrid}>
            {/* Cell 1: Overview */}
            <div className={styles.overviewCell}>
              <Reveal>
                <article className={styles.card}>
                  <div className={styles.overviewMain}>
                    <span className={styles.cardEyebrow}>Online Judges & Practice</span>
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

            {/* Cell 2: Codeforces Specialist */}
            <div className={styles.codeforcesCell}>
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
                    <span className={styles.handleSubtext}>Primary handle</span>
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

            {/* Cell 3: LeetCode Knight */}
            <div className={styles.leetcodeCell}>
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
                    <span className={styles.handleSubtext}>{leetcode.problemsSolved} problems solved</span>
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
                  ) : null}
                </article>
              </Reveal>
            </div>

            {/* Cell 4: SUST Intra-University Contests */}
            <div className={styles.sustCell}>
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

            {/* Cell 5: Practice Archives */}
            <div className={styles.archivesCell}>
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
        </div>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Subsection 3: Technical & Engineering Skills */}
        <div className={styles.subBlock}>
          <div className={styles.subheadRow}>
            <span className={styles.subheadEyebrow}>03 · Technical Stack</span>
            <h3 className={styles.subheadTitle}>Programming languages, systems & tools.</h3>
          </div>

          <div className={styles.skillsGrid}>
            {skillGroups.map((group, i) => (
              <Reveal key={group.label} delay={Math.min(i, 2) as 0 | 1 | 2}>
                <article className={styles.skillCard}>
                  <h4 className={styles.skillGroupLabel}>{group.label}</h4>
                  <div className={styles.skillChips}>
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
