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
    publicationSlug: string;
  };
};

export type SecondaryEducation = {
  institution: string;
  location: string;
  logo: { src: string; alt: string; width: number; height: number };
  exams: {
    /** Spelled-out stage name — the local abbreviation alone means nothing to
     * a reader outside Bangladesh. */
    stage: string;
    /** Local certificate abbreviation, shown in parentheses after the stage. */
    abbr: string;
    group: string;
    result: string;
  }[];
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
    // Deliberately thin: the abstract, methods, and results live on the
    // publication page. This block carries only what that page does not —
    // the thesis author order and who supervised it.
    thesis: {
      title: "CyQured: Design, Development, and Empirical Evaluation of a Tabletop Game for Personal Cybersecurity Education",
      authors: [{ name: "Argha Pratim Saha", you: true }, { name: "Utsho Das" }],
      supervisors: ["Dr. Md Sadek Ferdous", "Dr. Farida Chowdhury", "Md Masum"],
      publicationSlug: "cyqured",
    },
  } as UniversityEducation,
  secondary: {
    institution: "BCIC School & College",
    location: "Dhaka, Bangladesh",
    logo: {
      src: "/media/institutions/bcic.jpeg",
      alt: "BCIC School & College logo",
      width: 80,
      height: 80,
    },
    exams: [
      { stage: "Higher Secondary", abbr: "HSC", group: "Science", result: "GPA 5.00 / 5.00" },
      { stage: "Secondary", abbr: "SSC", group: "Science", result: "GPA 5.00 / 5.00" },
    ],
  } as SecondaryEducation,
};
