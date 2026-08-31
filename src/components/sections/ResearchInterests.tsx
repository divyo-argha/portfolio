import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { futureDirections, pillars } from "@/content/profile";
import { methodGroups } from "@/content/skills";
import sharedStyles from "./ResearchSections.module.css";
import styles from "./ResearchInterests.module.css";

// The four forward-looking directions plus the one pillar not already
// covered by them ("Applied machine learning" — the human-centered pillar
// is what futureDirections.items already describe in more specific terms).
const INTEREST_TAGS = [...futureDirections.items.map((item) => item.title), pillars[1].title];

const METHOD_TAGS = Array.from(new Set(methodGroups.flatMap((group) => group.methods)));

/**
 * Replaces the old `ResearchGlance` (four evidence tiles) and
 * `ResearchMethods` (a full per-study methods breakdown) with one compact
 * read: what the work is about, in tags, plus the methods behind it, also in
 * tags — rather than two separate heavy sections repeating context already
 * established by `Publications` and `OngoingWork` above.
 */
export function ResearchInterests() {
  return (
    <Section id="interests" label="Research interests" title="What ties the work together.">
      <span id="methods" aria-hidden="true" style={{ position: "relative", top: "-5rem", display: "block" }} />
      <div className={sharedStyles.subBlock}>
        <Reveal>
          <p className={sharedStyles.statementText}>{futureDirections.unifyingThread}</p>
        </Reveal>

        <Reveal delay={1}>
          <ul className={styles.tagRow}>
            {INTEREST_TAGS.map((tag) => (
              <li key={tag}>
                <Chip>{tag}</Chip>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={2}>
          <div>
            <span className={sharedStyles.cardEyebrow}>Methods I use</span>
            <ul className={styles.methodRow}>
              {METHOD_TAGS.map((tag) => (
                <li key={tag}>
                  <Chip>{tag}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
