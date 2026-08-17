import type { Link } from "./types";

export const profile = {
  name: "Argha Pratim Saha",
  positioning: "PhD applicant · Usable security & privacy",
  researchStatement:
    "Usable security and privacy; security education and mental models; qualitative and mixed-methods HCI. I study the gap between how security and privacy mechanisms are designed to work and how people actually understand and use them.",
  location: "Dhaka, Bangladesh",
  email: "arghastm@gmail.com",
  phone: "+880 1521 200978",
  applyingFor: "Applying for PhD positions, Fall 2027 intake",
  cgpa: "3.71 / 4.00",
  university: "Shahjalal University of Science and Technology (SUST)",
} as const;

export const socialLinks: Link[] = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en" },
  { label: "GitHub", href: "https://github.com/divyo-argha" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/argha-pratim-saha-a25b502b5/" },
];

export const pillars = [
  {
    title: "Usable security & privacy",
    body: "Closing the gap between how security mechanisms are designed to work and how people actually understand and use them.",
  },
  {
    title: "Security education & mental models",
    body: "Building interventions and evaluation methods that don't assume prior security knowledge.",
  },
  {
    title: "Qualitative & mixed-methods HCI",
    body: "Semi-structured interviews, thematic analysis, and pre/post knowledge testing analysed with mixed-effects models.",
  },
] as const;

export const atAGlance = [
  { label: "SOUPS 2026", value: "Accepted" },
  { label: "Publications", value: "3" },
  { label: "RA", value: "BRAC University" },
  { label: "CGPA", value: profile.cgpa },
] as const;
