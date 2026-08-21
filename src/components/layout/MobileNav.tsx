import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLockScroll } from "@/hooks/useLockScroll";
import { useSectionNav } from "@/hooks/useSectionNav";
import { siteConfig } from "@/lib/site";
import { profile, socialLinks } from "@/content/profile";
import { IconClose, IconMail, IconGithub, IconLinkedin, IconScholar, IconDownload } from "@/components/primitives/Icons";
import styles from "./MobileNav.module.css";

// Closing transition length must match --duration-base in tokens.css — kept
// in sync here since the unmount timer can't read a CSS custom property.
const CLOSE_DURATION_MS = 320;

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "CV (PDF)": IconDownload,
  Email: IconMail,
  "Google Scholar": IconScholar,
  GitHub: IconGithub,
  LinkedIn: IconLinkedin,
};

export function MobileNav({
  open,
  onClose,
  activeSection,
}: {
  open: boolean;
  onClose: () => void;
  activeSection?: string;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const navigateToSection = useSectionNav();
  const [rendered, setRendered] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);
  const [visible, setVisible] = useState(false);
  useLockScroll(rendered);

  // Mount immediately on open (derived during render, not an effect — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
  // Stays mounted for one extra transition after `open` goes false so the
  // panel can slide out instead of vanishing instantly.
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setRendered(true);
  }

  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => {
        setVisible(true);
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        focusable?.[0]?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    // Nothing was ever open, so there's nothing to animate closed — skip
    // scheduling an unmount timer on initial mount.
    if (!rendered) return;

    const frame = requestAnimationFrame(() => setVisible(false));
    const timeout = setTimeout(() => setRendered(false), CLOSE_DURATION_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [open, rendered]);

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    onClose();
    navigateToSection(href);
  }

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  useEffect(() => {
    if (!rendered) return;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [rendered, onClose]);

  if (!rendered) return null;

  // Portalled to <body>: the header has `backdrop-filter`, which creates a
  // new containing block for `position: fixed` descendants in modern
  // browsers — without the portal, this overlay sizes itself against the
  // header's box instead of the viewport.
  return createPortal(
    <div
      className={visible ? `${styles.overlay} ${styles.overlayOpen}` : styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      onClick={handleOverlayClick}
    >
      <div className={styles.panel} ref={panelRef}>
        <div className={styles.panelHeader}>
          <div className={styles.profile}>
            <Image
              src="/media/people/portrait.jpg"
              alt={profile.name}
              width={42}
              height={42}
              className={styles.avatar}
            />
            <div className={styles.profileInfo}>
              <span className={styles.name}>{profile.name}</span>
              <span className={styles.location}>
                <svg
                  className={styles.pinIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  width="12"
                  height="12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className={styles.locationText}>{profile.location}</span>
              </span>
            </div>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close navigation">
            <IconClose size={18} />
          </button>
        </div>

        <div className={styles.statusBanner}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusText}>{profile.status}</span>
        </div>

        <nav className={styles.navWrap}>
          <ul className={styles.list}>
            {siteConfig.navLinks.map((link, index) => {
              const isActive = activeSection === link.href;
              return (
                <li
                  key={link.href}
                  className={styles.item}
                  style={{ transitionDelay: visible ? `${60 + index * 35}ms` : "0ms" }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={[styles.link, isActive ? styles.linkActive : ""].join(" ")}
                  >
                    <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.linkLabel}>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.footer}>
          <div className={styles.footerLabel}>Connect</div>
          <ul className={styles.socials}>
            {socialLinks.map((link) => {
              const Icon = iconMap[link.label];
              return (
                <li key={link.href} className={styles.socialItem}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    {Icon ? <Icon size={16} className={styles.socialIcon} /> : null}
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}
