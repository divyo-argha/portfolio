import type { Link } from "./types";

export const profile = {
  name: "Argha Pratim Saha",
  subtitle: "Computer Science · Research · SUST",
  status: "Open to PhD opportunities for Fall 2027",
  positioning: "Computer Science · Research · SUST",
  bio: "I’m a Computer Science graduate from Shahjalal University of Science and Technology (SUST). I enjoy working on problems where computing systems meet people and the environments in which they are used. My work so far has taken me across security, human-centered computing, and machine learning.",
  location: "Dhaka, Bangladesh",
  email: "arghastm@gmail.com",
  phone: "+880 1521 200978",
  applyingFor: "Applying for PhD positions, Fall 2027 intake",
  cgpa: "3.71 / 4.00",
  university: "Shahjalal University of Science and Technology (SUST)",
  researchIntro:
    "My research interests have developed across security, human-centered computing, and applied machine learning. I am particularly interested in problems where the design of a technical system cannot be separated from the people, environments, and constraints surrounding it.",
  openDirections:
    "My interests are not limited to a single application area. I am open to exploring related questions in areas such as IoT and network security, trustworthy AI, intelligent systems, computer vision, and interactive technologies, particularly where they connect with my existing background in computing and security.",
} as const;

export const socialLinks: Link[] = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en" },
  { label: "GitHub", href: "https://github.com/divyo-argha" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/argha-pratim-saha-a25b502b5/" },
];

export const pillars = [
  {
    title: "Security, Privacy & Human-Centered Security",
    body: "My primary research experience is in usable security, security education, and empirical HCI. I am interested in how people understand security and privacy mechanisms, how their expectations and prior knowledge shape their decisions, and how security interventions can be designed and evaluated for real-world use.",
  },
  {
    title: "Applied Machine Learning & Intelligent Systems",
    body: "I have also worked with machine learning and computational approaches to practical problems, including medical image classification. These experiences have given me a foundation in data-driven systems and an interest in applying intelligent methods to new research problems.",
  },
  {
    title: "Human-Centered Computing & Empirical Research",
    body: "I am interested in understanding how people interact with and make sense of computing systems. My research experience includes qualitative user studies, interviews, thematic analysis, and quantitative evaluation of user knowledge, usability, workload, and learning.",
  },
] as const;
