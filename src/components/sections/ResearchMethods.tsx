import { Section } from "@/components/primitives/Section";
import { MethodsStack } from "./MethodsStack";
import styles from "./ResearchSections.module.css";

/**
 * Standalone home for the methods evidence, rendered on `/research` (see
 * `src/app/research/page.tsx`) alongside `ResearchIntro` and
 * `FutureDirections` — the narrative depth that used to live on the homepage
 * before it moved to its own page. `id="methods"` gives `ResearchGlance`'s
 * "Methods" tile a `/research#methods` anchor to land on.
 */
export function ResearchMethods() {
  return (
    <Section
      id="methods"
      label="Research Methods"
      title="Empirical study methods & evaluation."
      lede="Every method below is directly attached to the published study or manuscript that employed it, with its sample size and measurement protocols."
    >
      <div className={styles.container}>
        <div className={styles.subBlock}>
          <MethodsStack />
        </div>
      </div>
    </Section>
  );
}
