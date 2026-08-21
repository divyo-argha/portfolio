import type { Block } from "./types";

/** Extra body content for each project's detail page, keyed by slug. */
export const projectDetails: Record<string, Block[]> = {
  "git-user": [
    {
      kind: "prose",
      body: [
        "Working across research and industry projects means juggling several Git identities: a university email for thesis work, a work account for ShellBeeHaken, a personal account for open source. git-user makes switching between them a single command instead of a round of gitconfig editing.",
        "It manages passphrase-encrypted SSH keys per identity, applies gitconfig overrides scoped to a directory, supports commit signing, and installs a pre-commit hook that verifies the active identity matches the intended one before a commit lands. That catches the \"pushed to the wrong account\" mistake before it happens.",
        "Published on npm as git-userhub, it has sustained real, ongoing adoption: 4,555 downloads in the last month alone and 9,795 across 2026 to date.",
      ],
    },
    {
      kind: "findings",
      items: [
        { label: "Language", value: "Go 1.25+" },
        { label: "Distribution", value: "npm (git-userhub)" },
        { label: "Downloads / month", value: "4,555" },
        { label: "Downloads / 2026", value: "9,795" },
      ],
    },
    { kind: "code", language: "bash", body: "npm install -g git-userhub" },
  ],

  autoscriber: [
    {
      kind: "prose",
      body: [
        "Qualitative HCI research on Bengali-speaking participants runs into a gap most transcription tools don't handle well: code-switching between Bengali and English, and a lack of accurate Bangla speaker diarization.",
        "AutoScriber handles audio preprocessing and silence trimming, then transcribes through either local open-source models or cloud APIs, with word-level timestamp sync and export to six formats. It ships as two live deployments, a landing page and a full transcription studio, built on Next.js 16 with a Prisma-backed pipeline and Gemini 2.5 Flash for transcription.",
      ],
    },
    {
      kind: "findings",
      items: [
        { label: "Stack", value: "Next.js 16 · TypeScript · Prisma" },
        { label: "Transcription", value: "Gemini 2.5 Flash" },
        { label: "Runtime", value: "Bun" },
      ],
    },
  ],

  "polaris-vpn": [
    {
      kind: "prose",
      body: [
        "Polaris is a zero-config, self-hosted VPN CLI: point it at any Linux VPS with SSH access and it instantly establishes an encrypted SSH SOCKS5 tunnel to secure web traffic. Bring your own server; no additional server-side configuration required.",
      ],
    },
    {
      kind: "findings",
      items: [
        { label: "Language", value: "Node.js" },
        { label: "Transport", value: "SSH SOCKS5 tunnel" },
        { label: "Model", value: "Bring-your-own-server" },
      ],
    },
  ],

  "claude-user": [
    {
      kind: "prose",
      body: [
        "Running multiple Claude Code accounts side by side, for work, personal projects, and research, usually means repeated logins and logouts. claude-user isolates each account's session so they can run simultaneously across different terminals, switched with a single command or through an interactive TUI.",
      ],
    },
    {
      kind: "findings",
      items: [
        { label: "Language", value: "Rust" },
        { label: "Interface", value: "CLI + interactive TUI" },
      ],
    },
  ],
};
