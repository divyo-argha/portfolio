import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Portrait } from "@/components/primitives/Portrait";
import { IconLink } from "@/components/primitives/IconLink";
import { IconMail, IconScholar, IconGithub, IconLinkedin, IconDownload } from "@/components/primitives/Icons";
import { profile } from "@/content/profile";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <Container>
        <div className={styles.grid}>
          <div className={styles.portraitCol}>
            <Portrait src="/media/people/portrait.webp" alt="Argha Pratim Saha" priority />
          </div>

          <div className={styles.identity}>
            <div className={styles.nameBlock}>
              <h1 className={styles.name}>{profile.name}</h1>
              <p className={styles.subtitle}>{profile.subtitle}</p>
              <p className={styles.focusLine}>{profile.focusLine}</p>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>{profile.status}</span>
              </div>
            </div>

            <p className={styles.statement}>{profile.bio}</p>

            <div className={styles.actionRow}>
              <div className={styles.buttonRow}>
                <Link href="/research" className={styles.primaryButton}>
                  <span>View Research</span>
                </Link>

                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cvButton}
                >
                  <IconDownload size={15} />
                  <span>Download CV</span>
                </a>
              </div>

              <div className={styles.linkRow}>
                <IconLink
                  href="https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en"
                  icon={<IconScholar size={16} />}
                >
                  Google Scholar
                </IconLink>
                <IconLink href={`mailto:${profile.email}`} icon={<IconMail size={16} />}>
                  Email
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
        </div>
      </Container>
    </section>
  );
}
