import { Section } from "@/components/primitives/Section";
import { MethodsStack } from "./MethodsStack";
import styles from "./ResearchSections.module.css";

/**
 * Standalone home for the methods evidence, promoted out of `Research.tsx`
 * (now `ResearchIntro.tsx`) so it reads as its own piece of proof — how the
 * research actually gets done — rather than a subsection of the thesis.
 * `id="methods"` is unchanged so existing `/#methods` links keep resolving.
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
