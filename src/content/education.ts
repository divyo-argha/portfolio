export type UniversityEducation = {
  institution: string;
  degree: string;
  field: string;
  location: string;
  dates: string;
  result: string;
  logo: { src: string; alt: string; width: number; height: number };
  thesis: {
    title: string;
    authors: { name: string; you?: boolean }[];
    supervisors: string[];
    summary: string;
  };
  highlights: string[];
  coursework: string[];
};

export type SecondaryEducation = {
  level: "college" | "school";
  institution: string;
  exam: string;
  group: string;
  location: string;
  result: string;
  logo: { src: string; alt: string; width: number; height: number };
};

export const education = {
  university: {
    institution: "Shahjalal University of Science and Technology (SUST)",
    degree: "B.Sc. (Engg.) in Computer Science and Engineering",
    field: "Computer Science & Engineering",
    location: "Sylhet, Bangladesh",
    dates: "Feb 2020 – Jul 2025",
    result: "CGPA 3.71 / 4.00",
    logo: {
      src: "/media/institutions/sust.png",
      alt: "SUST logo",
      width: 120,
      height: 120,
    },
    thesis: {
      title: "CyQured: Design, Development, and Empirical Evaluation of a Tabletop Game for Personal Cybersecurity Education",
      authors: [
        { name: "Argha Pratim Saha", you: true },
        { name: "Utsho Das" },
      ],
      supervisors: ["Dr. Md Sadek Ferdous", "Dr. Farida Chowdhury", "Md Masum"],
      summary:
        "Designed and evaluated a tabletop serious game mapping the STRIDE threat framework onto smart-home scenarios. Conducted pre/post knowledge testing with 50 participants, analysed using linear mixed-effects models (Accepted at USENIX SOUPS 2026).",
    },
    highlights: [
      "Published and accepted research during undergraduate studies at USENIX SOUPS 2026, ICCIT 2024, and NAACL 2024 (CLNLP).",
      "Completed 160+ credits in core computing systems, mathematical foundations, and intelligent systems.",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Software Engineering",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Artificial Intelligence",
      "Cryptography & Network Security",
      "Distributed Systems",
      "Theory of Computation",
      "Discrete Mathematics",
    ],
  } as UniversityEducation,
  secondary: [
    {
      level: "college",
      institution: "BCIC College",
      exam: "Higher Secondary Certificate (HSC)",
      group: "Science",
      location: "Dhaka, Bangladesh",
      result: "GPA 5.00 / 5.00",
      logo: {
        src: "/media/institutions/bcic.jpeg",
        alt: "BCIC College logo",
        width: 80,
        height: 80,
      },
    },
    {
      level: "school",
      institution: "BCIC School",
      exam: "Secondary School Certificate (SSC)",
      group: "Science",
      location: "Dhaka, Bangladesh",
      result: "GPA 5.00 / 5.00",
      logo: {
        src: "/media/institutions/bcic.jpeg",
        alt: "BCIC School logo",
        width: 80,
        height: 80,
      },
    },
  ] as SecondaryEducation[],
};
