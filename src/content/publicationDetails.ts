import type { Block } from "./types";

/** Extra body content for each publication's detail page, keyed by slug. */
export const publicationDetails: Record<string, Block[]> = {
  // Titled shell only — Argha will add board/gameplay photography and card
  // galleries here later. Adding them is a pure data edit: append `gallery`
  // blocks below, drop images in public/media/publications/cyqured/.
  cyqured: [],

  "arsenic-classification-efficientnet-b1": [
    {
      kind: "prose",
      body: [
        "Arsenic contamination in groundwater remains a major public health issue in Bangladesh, and skin lesions are often the earliest visible sign of chronic exposure. Manual screening by dermatologists is accurate but doesn't scale to the population at risk.",
        "This work fine-tunes an EfficientNet-B1 classifier on clinical photographs to automate detection of arsenic-affected skin, aiming for a lightweight model that could plausibly run in low-resource clinical settings.",
      ],
    },
    {
      kind: "findings",
      items: [
        { label: "Architecture", value: "EfficientNet-B1" },
        { label: "Venue", value: "ICCIT 2024" },
        { label: "Focus", value: "Clinical image classification" },
      ],
    },
  ],

  "ehrsql-primus-text-to-sql": [
    {
      kind: "prose",
      body: [
        "My first research project in NLP and text-to-SQL.",
        "This was one of my first experiences with research. I worked on the EHRSQL 2024 shared task, where the goal was to turn natural-language questions about electronic health records into SQL queries.",
        "At the time I was still learning how research works, exploring NLP, language models, and how they could be used with structured medical data. Our work was later published at the Clinical NLP Workshop, co-located with NAACL 2024.",
        "This project isn't where I ended up in research, but it's where I started. It taught me how to work on a research problem, run experiments, look at results, and write about what we found.",
      ],
    },
    {
      kind: "prose",
      heading: "What was the problem?",
      body: [
        "Medical data is usually stored in databases, and getting useful information out of them means writing SQL. But a doctor or researcher shouldn't need to know SQL just to ask a question.",
        "The idea behind the shared task was simple: can a system take a question written in plain language and turn it into the SQL needed to answer it, automatically and reliably enough to trust in a clinical setting?",
      ],
    },
    {
      kind: "figure",
      src: "/media/publications/primus/architecture-diagram.png",
      alt: "General text-to-SQL system architecture: a database's table schema and a natural-language question are combined into a prompt for an LLM, which produces a SQL query that's run against the database to produce a result.",
      caption: "The general shape of a text-to-SQL system: schema and question in, query and result out.",
    },
    {
      kind: "figure",
      heading: "How did it work?",
      src: "/media/publications/primus/pipeline-overview.webp",
      alt: "Project PRIMUS pipeline: a natural-language question and the EHRSQL 2024 dataset feed into Defog's SQLCoder text-to-SQL model, which generates a SQL query that is then evaluated against the gold-standard query, with a worked example below.",
      caption: "Question and schema in, SQLCoder generates the query, the result is scored against the gold-standard SQL.",
    },
    {
      kind: "cardGrid",
      heading: "What did I do?",
      columns: 4,
      items: [
        {
          title: "Model exploration",
          body: "Explored how Defog's SQLCoder model could be applied to the shared task.",
        },
        {
          title: "Data and experiments",
          body: "Worked with the EHRSQL 2024 dataset and ran experiments on the task.",
        },
        {
          title: "Evaluation",
          body: "Compared the generated SQL against the expected queries and looked at where the system failed.",
        },
        {
          title: "Research writing",
          body: "Helped document the approach, experiments, and results in the final paper.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "What did we find?",
      body: [
        "The results weren't as strong as we'd hoped. The model could generate valid SQL for some questions, but struggled once questions got more complex or required a real understanding of the database structure.",
        "That was a useful thing to learn from a first research project: getting a language model to produce an answer isn't the same as getting it to produce a correct one. Performance turned out to depend heavily on the data, the prompt, and how the task itself was set up.",
      ],
    },
    {
      kind: "cardGrid",
      heading: "What I learned",
      columns: 3,
      items: [
        {
          title: "Research is iterative",
          body: "The first approach doesn't always work. We had to test things, look at the results, and understand what went wrong.",
        },
        {
          title: "Results matter more than expectations",
          body: "A model can seem promising, but the experiments are what tell you whether it actually works.",
        },
        {
          title: "Research is more than code",
          body: "Reading papers, understanding a problem, designing experiments, evaluating results, and writing are all part of it.",
        },
      ],
    },
  ],
};
