export type SkillCategory = "languages" | "web" | "analysis";

export type SkillItem = {
  name: string;
  category: SkillCategory;
};

export const categoryMeta: Record<SkillCategory, { label: string }> = {
  languages: { label: "Languages" },
  web: { label: "Web & systems" },
  analysis: { label: "Version Control & writing" },
};

export const skillsList: SkillItem[] = [
  // Languages (6)
  { name: "C/C++", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "Go", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "Java", category: "languages" },

  // Web & systems (8)
  { name: "React", category: "web" },
  { name: "Next.js", category: "web" },
  { name: "Node.js", category: "web" },
  { name: "Express", category: "web" },
  { name: "WebSockets", category: "web" },
  { name: "MySQL", category: "web" },
  { name: "MongoDB", category: "web" },
  { name: "Qdrant", category: "web" },

  // Analysis & writing (3)
  { name: "Python statistical libraries", category: "analysis" },
  { name: "LaTeX", category: "analysis" },
  { name: "Git", category: "analysis" },
];

export const skillGroups = [
  {
    label: "Languages",
    theme: "languages" as const,
    items: ["C/C++", "Python", "Go", "JavaScript", "TypeScript", "Java"],
  },
  {
    label: "Web & systems",
    theme: "web" as const,
    items: ["React", "Next.js", "Node.js", "Express", "WebSockets", "MySQL", "MongoDB", "Qdrant"],
  },
  {
    label: "Version Control & Writing",
    theme: "analysis" as const,
    items: ["LaTeX", "Git"],
  },
];
