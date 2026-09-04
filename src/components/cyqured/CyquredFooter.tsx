"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconArrowUpRight, IconMail } from "@/components/primitives/Icons";
import styles from "./CyquredFooter.module.css";

const TOPICS = [
  "Research Collaboration",
  "Rules & Mechanics Feedback",
  "Classroom & Educational Use",
  "General Inquiry / Playtesting",
] as const;

export function CyquredFooter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !message) return;

    const subject = encodeURIComponent(`[CyQured Inquiry] ${topic} - ${name || "Visitor"}`);
    const bodyContent = `Sender: ${name || "Anonymous"} (${email})\nTopic: ${topic}\n\nInquiry / Feedback:\n${message}\n\n--\nSent via CyQured Microsite (https://divyo-argha.github.io/cyqured)`;
    const mailtoUrl = `mailto:arghapratimsaha00@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  }

  function handleCopy() {
    const fullText = `Sender: ${name || "Anonymous"} (${email})\nTopic: ${topic}\n\n${message}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <footer className={styles.footer} aria-label="CyQured Microsite Footer">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Interactive Inquiries & Contact Section */}
        <section className={styles.inquiryCard} aria-labelledby="inquiry-heading">
          <div className={styles.inquiryGrid}>
            <div className={styles.inquiryIntro}>
              <span className={styles.inquiryEyebrow}>
                <span className={styles.eyebrowDot} />
                Get in Touch with the Team
              </span>
              <h2 id="inquiry-heading" className={styles.inquiryTitle}>
                Inquire or Share Feedback on CyQured
              </h2>
              <p className={styles.inquiryDesc}>
                Whether you are an educator interested in adopting CyQured for a course, a researcher asking about our SOUPS 2026 study dataset, or a player with rule feedback, send us a note below.
              </p>

              <div className={styles.directEmailBlock}>
                <span className={styles.directEmailLabel}>Direct Research Contact:</span>
                <a
                  href="mailto:arghapratimsaha00@gmail.com"
                  className={styles.directEmailLink}
                  title="Email research team"
                >
                  <IconMail size={16} />
                  <span>arghapratimsaha00@gmail.com</span>
                </a>
              </div>

              <div className={styles.institutionBadges}>
                <div className={styles.instBadge}>
                  <Image
                    src="/media/institutions/sust.webp"
                    alt="SUST logo"
                    width={18}
                    height={18}
                    className={styles.instLogo}
                  />
                  <span>SUST CSE</span>
                </div>
                <div className={styles.instBadge}>
                  <Image
                    src="/media/institutions/bracu.webp"
                    alt="BRAC University logo"
                    width={18}
                    height={18}
                    className={styles.instLogo}
                  />
                  <span>BRAC University</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formWrap}>
              {submitted ? (
                <div className={styles.submittedAlert} role="status">
                  <strong>Opening your email client...</strong>
                  <span>
                    A pre-filled email draft has been generated. If your email application did not launch automatically:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={styles.submittedAction}
                  >
                    {copied ? "✓ Copied to clipboard!" : "Click here to copy your message text to clipboard"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className={styles.submittedAction}
                  >
                    ← Edit or send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="inquiry-name" className={styles.label}>
                        Your Name (Optional)
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. Alex Morgan"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="inquiry-email" className={styles.label}>
                        Your Email *
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@university.edu"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="inquiry-topic" className={styles.label}>
                      Area of Interest
                    </label>
                    <select
                      id="inquiry-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className={styles.select}
                    >
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="inquiry-message" className={styles.label}>
                      Your Query or Feedback *
                    </label>
                    <textarea
                      id="inquiry-message"
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your question, classroom interest, or thoughts..."
                      className={styles.textarea}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <span>Send Query</span>
                    <IconArrowUpRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Multi-column Navigation Grid */}
        <div className={styles.navGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/cyqured" className={styles.brandLogoLink} aria-label="CyQured Home">
              <Image
                src="/media/publications/cyqured/cyqured-logo.webp"
                alt="CyQured"
                width={140}
                height={46}
                className={styles.brandLogo}
              />
            </Link>
            <p className={styles.brandDesc}>
              A tangible tabletop cybersecurity board game modeling a 16-device smart home, published at USENIX SOUPS 2026.
            </p>
          </div>

          {/* Game Microsite Navigation */}
          <div className={styles.navCol}>
            <h3 className={styles.colHeading}>Game Microsite</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/cyqured" className={styles.linkItem}>
                  Game Overview
                </Link>
              </li>
              <li>
                <Link href="/cyqured/assets" className={styles.linkItem}>
                  Cards &amp; Board Assets
                </Link>
              </li>
              <li>
                <Link href="/cyqured/mechanics" className={styles.linkItem}>
                  Rules &amp; Mechanics
                </Link>
              </li>
              <li>
                <Link href="/cyqured/publication" className={styles.linkItem}>
                  SOUPS 2026 Paper Tab
                </Link>
              </li>
            </ul>
          </div>

          {/* Research & Publications */}
          <div className={styles.navCol}>
            <h3 className={styles.colHeading}>Research &amp; Data</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/publications/cyqured" className={styles.linkItem}>
                  Study Overview &amp; SUS Analysis
                </Link>
              </li>
              <li>
                <a
                  href="https://www.usenix.org/system/files/soups2026-das.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[styles.linkItem, styles.linkItemExternal].join(" ")}
                >
                  <span>Manuscript (PDF)</span>
                  <IconArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.usenix.org/conference/soups2026/presentation/das"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[styles.linkItem, styles.linkItemExternal].join(" ")}
                >
                  <span>USENIX Presentation</span>
                  <IconArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Research Team Credits */}
          <div className={styles.navCol}>
            <h3 className={styles.colHeading}>Research Team</h3>
            <div className={styles.teamList}>
              <span> <Link href="/" className={styles.authorLink} title="Visit portfolio">Argha Pratim Saha*</Link>, Utsho Das*,</span>
              <span>Md Sadek Ferdous, Md Masum, Farida Chowdhury</span>
              <span style={{ fontSize: "0.76rem", color: "#638690", marginTop: "0.25rem" }}>
                *Equal contribution · SUST &amp; BRAC University
              </span>
            </div>

            <Link href="/" className={styles.portfolioBridgeLink} title="Visit Argha's Academic Portfolio">
              <span>Argha&apos;s Portfolio &amp; Other Work</span>
              <IconArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            CyQured © 2026. Published at the 22nd USENIX Symposium on Usable Privacy and Security (SOUPS 2026).
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className={styles.backToTopBtn}
            aria-label="Back to top"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
