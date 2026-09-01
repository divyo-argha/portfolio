import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { AccordionRow } from "@/components/primitives/AccordionRow";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import { projects } from "@/content/projects";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <Section id="projects" label="Projects" title="Selected software projects.">
      {/* Anchors for backward compatibility with the old combined "Programming" section. */}
      <span id="engineering" aria-hidden="true" style={{ position: "absolute", top: 0, left: 0 }} />
      <span id="programming" aria-hidden="true" style={{ position: "absolute", top: 0, left: 0 }} />

      <div className={styles.list}>
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
            <AccordionRow
              eyebrow={project.stack[0]}
              title={project.name}
              subtitle={project.tagline}
              meta={project.stack.slice(1, 3).map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            >
              <p>{project.description}</p>

              {project.stats && project.stats.length > 0 ? (
                <div className={styles.stats}>
                  {project.stats.map((stat) => (
                    <div key={stat.label} className={styles.stat}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {project.installCommand ? <code className={styles.install}>{project.installCommand}</code> : null}

              <div className={styles.links}>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <span>{link.label}</span>
                    <IconArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </AccordionRow>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
