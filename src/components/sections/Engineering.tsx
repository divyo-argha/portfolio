import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { ProjectFeatureCard } from "./ProjectFeatureCard";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/content/projects";
import styles from "./Engineering.module.css";

export function Engineering() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project.slug !== featured.slug);

  return (
    <Section id="engineering" label="Engineering" title="Selected software projects.">
      <Reveal>
        <ProjectFeatureCard project={featured} />
      </Reveal>
      <div className={styles.grid}>
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i + 1, 3) as 1 | 2 | 3}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
