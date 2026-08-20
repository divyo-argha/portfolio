"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@/components/primitives/Icons";
import styles from "./BlockRenderer.module.css";

export function CodeBlock({ body, language }: { body: string; language: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.codeWrap}>
      <button
        type="button"
        onClick={handleCopy}
        className={styles.copyButton}
        aria-label={copied ? "Copied to clipboard" : `Copy ${language} to clipboard`}
      >
        {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
      <pre className={styles.code}>
        <code>{body}</code>
      </pre>
    </div>
  );
}
