import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "git-user",
    name: "git-user",
    tagline: "One command to rule all your Git identities.",
    description:
      "A cross-platform Go tool for switching between multiple Git identities and encrypted SSH keys. Handles gitconfig overrides, passphrase-protected SSH keys, commit signing, and ships a pre-commit verification hook so you never push as the wrong person again. Published on npm as git-userhub.",
    stack: ["Go 1.25+", "JavaScript", "npm"],
    featured: true,
    installCommand: "npm install -g git-userhub",
    stats: [
      { label: "npm downloads / mo", value: "4,555" },
      { label: "npm downloads / 2026", value: "9,795" },
      { label: "GitHub stars", value: "6" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/divyo-argha/git-user" },
      { label: "npm", href: "https://www.npmjs.com/package/git-userhub" },
      { label: "pkg.go.dev", href: "https://pkg.go.dev/github.com/divyo-argha/git-user" },
    ],
  },
  {
    slug: "autoscriber",
    name: "AutoScriber",
    tagline: "AI-powered Bangla audio transcription for qualitative researchers.",
    description:
      "A transcription pipeline built for qualitative HCI researchers working with Bengali interviews. Handles audio preprocessing, silence trimming, speaker diarization, and word-level sync, exporting to six formats through both local open-source models and cloud APIs. Two live deployments: a landing page and a full transcription studio.",
    stack: ["Next.js 16", "TypeScript", "Prisma", "Gemini 2.5 Flash", "Bun"],
    links: [
      { label: "GitHub", href: "https://github.com/divyo-argha/AutoScriber" },
      { label: "Landing page", href: "https://autoscriber.vercel.app/" },
      { label: "Studio", href: "https://autoscriber-studio.vercel.app/" },
    ],
  },
  {
    slug: "polaris-vpn",
    name: "polaris-vpn",
    tagline: "Zero-config, self-hosted VPN CLI over an encrypted SSH tunnel.",
    description:
      "A lightweight, zero-config, self-hosted VPN CLI built in Node.js. It instantly establishes an encrypted SSH SOCKS5 tunnel through any Linux VPS to secure web traffic — bring any standard server with SSH access, no extra server configuration required.",
    stack: ["Node.js", "JavaScript", "SSH / SOCKS5"],
    links: [{ label: "GitHub", href: "https://github.com/divyo-argha/polaris-vpn" }],
  },
  {
    slug: "claude-user",
    name: "claude-user",
    tagline: "One command to switch Claude Code accounts.",
    description:
      "A Rust CLI and interactive TUI for running and switching between multiple isolated Claude Code / agent accounts in different terminals, without repeated logins and logouts.",
    stack: ["Rust", "TUI"],
    links: [{ label: "GitHub", href: "https://github.com/divyo-argha/claude-user" }],
  },
];
