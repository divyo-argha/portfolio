import { Container } from "@/components/primitives/Container";
import { Portrait } from "@/components/primitives/Portrait";
import { IconLink } from "@/components/primitives/IconLink";
import { StatPair } from "@/components/primitives/StatPair";
import { IconMail, IconScholar, IconGithub, IconLinkedin } from "@/components/primitives/Icons";
import { profile, atAGlance } from "@/content/profile";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <Container>
        <div className={styles.grid}>
          <div className={styles.portraitCol}>
            <Portrait src="/media/portrait.jpg" alt="Argha Pratim Saha" priority />
          </div>

          <div className={styles.identity}>
            <p className={styles.positioning}>{profile.positioning}</p>
            <h1 className={styles.name}>{profile.name}</h1>
            <p className={styles.statement}>{profile.researchStatement}</p>

            <div className={styles.linkRow}>
              <IconLink href={`mailto:${profile.email}`} icon={<IconMail size={16} />}>
                {profile.email}
              </IconLink>
              <IconLink
                href="https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en"
                icon={<IconScholar size={16} />}
              >
                Google Scholar
              </IconLink>
              <IconLink href="https://github.com/divyo-argha" icon={<IconGithub size={16} />}>
                GitHub
              </IconLink>
              <IconLink
                href="https://www.linkedin.com/in/argha-pratim-saha-a25b502b5/"
                icon={<IconLinkedin size={16} />}
              >
                LinkedIn
              </IconLink>
            </div>
          </div>
        </div>

        <div className={styles.glance}>
          {atAGlance.map((item) => (
            <StatPair key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </Container>
    </section>
  );
}
