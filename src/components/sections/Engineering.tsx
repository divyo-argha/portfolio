import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/content/projects";
import styles from "./Engineering.module.css";

export function Engineering() {
  return (
    <Section id="engineering" label="Engineering" title="Selected software projects.">
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
