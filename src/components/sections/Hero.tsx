import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Portrait } from "@/components/primitives/Portrait";
import { IconLink } from "@/components/primitives/IconLink";
import { IconMail, IconScholar, IconGithub, IconLinkedin, IconDownload } from "@/components/primitives/Icons";
import { profile, venueCredentials } from "@/content/profile";
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
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>{profile.status}</span>
              </div>
            </div>

            <p className={styles.statement}>{profile.bio}</p>

            <div className={styles.actionRow}>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cvButton}
              >
                <IconDownload size={15} />
                <span>Curriculum Vitae (PDF)</span>
              </a>

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

        {/* The published record, above the fold. Previously a reader had to
            scroll past two prose sections before learning any of this. */}
        <nav className={styles.credentials} aria-label="Published work">
          <span className={styles.credentialsLabel}>Published at</span>
          <ul className={styles.credentialsList}>
            {venueCredentials.map((credential) => (
              <li key={credential.venue}>
                {/* Text only. The venue logos are a wide conference banner, a
                    cartoon mascot and a dense wordmark; shrunk to a 22px chip
                    they read as noise. They have room to work on the
                    publication cards below. */}
                <Link href={credential.href} className={styles.credential}>
                  <span className={styles.credentialVenue}>{credential.venue}</span>
                  {credential.note ? (
                    <span className={styles.credentialNote}>{credential.note}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
