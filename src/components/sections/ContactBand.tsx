import { IconDownload, IconGithub, IconLinkedin, IconMail, IconScholar } from "@/components/primitives/Icons";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { Portrait } from "@/components/primitives/Portrait";
import { profile } from "@/content/profile";
import styles from "./ContactBand.module.css";

export function ContactBand() {
  return (
    <section id="contact" className={styles.band} aria-labelledby="contact-heading">
      <Container>
        <div className={styles.layout}>
          <Reveal>
            <div>
              <p className={styles.eyebrow}>Contact</p>
              <h2 id="contact-heading" className={styles.title}>
                {profile.applyingFor}
              </h2>

              <div className={styles.actions}>
                <a href={`mailto:${profile.email}`} className={styles.primary}>
                  <IconMail size={16} />
                  {profile.email}
                </a>
                <a href="/cv.pdf" className={styles.secondary}>
                  <IconDownload size={16} />
                  Download CV
                </a>
              </div>

              <div className={styles.socials}>
                <a href="https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                  <IconScholar size={16} /> Scholar
                </a>
                <a href="https://github.com/divyo-argha" target="_blank" rel="noopener noreferrer">
                  <IconGithub size={16} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/argha-pratim-saha-a25b502b5/" target="_blank" rel="noopener noreferrer">
                  <IconLinkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className={styles.photoCol}>
              <Portrait src="/media/portrait-alt.jpg" alt="Argha Pratim Saha, outdoors" mirrored />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
