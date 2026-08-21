import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { profile } from "@/content/profile";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link href="#top" className={styles.authorLink}>
              {profile.name}
            </Link>
          </div>

          <div className={styles.right}>
            <span className={styles.copyright}>
              © {currentYear}
            </span>
            <Link href="#top" className={styles.backToTop} aria-label="Back to top of page">
              ↑ Back to top
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
