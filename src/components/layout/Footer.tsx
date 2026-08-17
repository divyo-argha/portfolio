import { Container } from "@/components/primitives/Container";
import { socialLinks } from "@/content/profile";
import styles from "./Footer.module.css";

const LAST_UPDATED = "August 2026";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.row}>
          <p className={styles.meta}>
            Argha Pratim Saha &middot; Dhaka, Bangladesh &middot; Last updated {LAST_UPDATED}
          </p>
          <ul className={styles.links}>
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
