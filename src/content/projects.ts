import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "git-user",
    name: "git-user",
    tagline: "Scoped Git configuration and encrypted SSH credential management for multi-identity workflows.",
    description:
      "A cross-platform CLI tool built in Go for managing isolated Git identities, passphrase-encrypted SSH keys, and commit signing across academic, work, and personal repositories. Includes a pre-commit verification hook to prevent identity leakage before pushing. Published on npm as git-userhub.",
    stack: ["Go 1.25+", "JavaScript", "npm"],
    featured: true,
    installCommand: "npm install -g git-userhub",
    stats: [
      { label: "npm downloads / mo", value: "4,555" },
      { label: "npm downloads / 2026", value: "9,795" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/divyo-argha/git-user" },
      { label: "npm", href: "https://www.npmjs.com/package/git-userhub" },
      { label: "pkg.go.dev", href: "https://pkg.go.dev/github.com/divyo-argha/git-user" },
    ],
    logo: { src: "/media/gu_logo.webp", alt: "git-user logo", width: 120, height: 120 },
  },
  {
    slug: "autoscriber",
    name: "AutoScriber",
    tagline: "Automated transcription and speaker diarization for Bengali qualitative HCI research.",
    description:
      "A specialized transcription pipeline built for qualitative HCI researchers working with Bengali interviews. Handles audio preprocessing, silence trimming, speaker diarization, and word-level sync, exporting to six formats through both local open-source models and cloud APIs. Two live deployments: a landing page and a full transcription studio.",
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
    minor: true,
    tagline: "Zero-config, self-hosted VPN CLI over an encrypted SSH tunnel.",
    description:
      "A lightweight, zero-config, self-hosted VPN CLI built in Node.js. It instantly establishes an encrypted SSH SOCKS5 tunnel through any Linux VPS to secure web traffic, using any standard server you already have SSH access to, with no extra configuration.",
    stack: ["Node.js", "JavaScript", "SSH / SOCKS5"],
    links: [{ label: "GitHub", href: "https://github.com/divyo-argha/polaris-vpn" }],
  },
  {
    slug: "claude-user",
    name: "claude-user",
    minor: true,
    tagline: "Session isolation and terminal switching CLI for multiple AI agent accounts.",
    description:
      "A Rust CLI and interactive TUI for running and switching between multiple isolated Claude Code and developer accounts across terminals without credential collision.",
    stack: ["Rust", "TUI"],
    links: [{ label: "GitHub", href: "https://github.com/divyo-argha/claude-user" }],
  },
];
