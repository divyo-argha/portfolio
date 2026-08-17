import type { Block, DetailTab } from "./types";

/** Extra body content for each publication's detail page, keyed by slug. */
export const publicationDetails: Record<string, Block[]> = {
  // Titled shell only — Argha will add board/gameplay photography and card
  // galleries here later. Adding them is a pure data edit: append `gallery`
  // blocks below, drop images in public/media/publications/cyqured/.
  cyqured: [],

  // Content for this publication lives in `publicationTabs` below (Write-up /
  // Poster / Photos tabs) instead of a flat block list.
  "arsenic-classification-efficientnet-b1": [],

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

/** Publications rendered as multiple tabs instead of one flat block list.
 * Keyed by slug; a publication with no entry here just renders `blocks`
 * from `publicationDetails` above as usual. */
export const publicationTabs: Record<string, DetailTab[]> = {
  "arsenic-classification-efficientnet-b1": [
    {
      id: "write-up",
      label: "Write-up",
      blocks: [
        {
          kind: "prose",
          body: [
            "Arsenic contamination is a serious public health problem in Bangladesh. One of its visible effects is the development of skin lesions and other changes in the skin.",
            "In this project, we explored whether deep learning could help classify skin images as arsenic-affected or not affected.",
            "I worked with the ArsenicSkinImageBD dataset and compared several pretrained deep learning models. EfficientNet-B1 gave the best results on our test set.",
            "This was one of my earlier projects in applied machine learning. It gave me experience with medical image data, transfer learning, model comparison, and evaluation.",
          ],
        },
        {
          kind: "prose",
          heading: "The problem",
          body: [
            "Arsenic exposure can change how skin looks. It can cause spots, patches, and lesions like the ones below.",
          ],
        },
        {
          kind: "gallery",
          columns: 2,
          items: [
            {
              src: "/media/publications/arsenic-classification-efficientnet-b1/affected-skin.png",
              alt: "A palm showing arsenic-affected skin, with visible keratosis and dark spots",
              caption: "Arsenic-affected",
            },
            {
              src: "/media/publications/arsenic-classification-efficientnet-b1/not-affected-skin.png",
              alt: "A palm showing skin that is not affected by arsenic",
              caption: "Not affected",
            },
          ],
        },
        {
          kind: "prose",
          body: ["Can a deep learning model tell them apart?"],
        },
        {
          kind: "prose",
          heading: "The data",
          body: [
            "We used the ArsenicSkinImageBD dataset, a set of clinical skin images collected in Bangladesh.",
            "We resized the images to 240 by 240 pixels and used augmentation such as rotation, flipping, shifting, and zooming to add more variation to the training data. The data was split into 70% for training and 30% for validation and testing.",
          ],
        },
        {
          kind: "statGrid",
          columns: 4,
          items: [
            { value: "8,892", label: "Original images" },
            { value: "10,180", label: "After augmentation" },
            { value: "2", label: "Classes" },
            { value: "240 × 240", label: "Input size" },
          ],
        },
        {
          kind: "cardGrid",
          heading: "What I worked on",
          columns: 4,
          items: [
            {
              title: "Data preparation",
              body: "Preparing the skin images and applying preprocessing and augmentation.",
            },
            {
              title: "Transfer learning",
              body: "Fine-tuning pretrained models for the classification task.",
            },
            {
              title: "Model comparison",
              body: "Comparing EfficientNet-B1, EfficientNet-B0, ResNet50, MobileNetV2, and VGG19.",
            },
            {
              title: "Evaluation",
              body: "Looking at accuracy, precision, recall, F1 score, AUC, and the confusion matrix.",
            },
          ],
        },
        {
          kind: "pipeline",
          heading: "The approach",
          steps: [
            { label: "Skin image" },
            { label: "Preprocessing" },
            { label: "Pretrained model", highlight: true },
            { label: "Fine-tuning" },
            { label: "Prediction" },
            { label: "Evaluation" },
          ],
        },
        {
          kind: "prose",
          body: ["We tested five pretrained models. EfficientNet-B1 was the one that performed best on our test set."],
        },
        {
          kind: "barChart",
          heading: "Model comparison",
          unit: "%",
          items: [
            { label: "VGG19", value: 79.65 },
            { label: "MobileNetV2", value: 84.32 },
            { label: "ResNet50", value: 85.88 },
            { label: "EfficientNet-B0", value: 87.28 },
            { label: "EfficientNet-B1", value: 94.69, highlight: true },
          ],
        },
        {
          kind: "prose",
          body: ["EfficientNet-B1 gave the best performance among the models we tested."],
        },
        {
          kind: "heroStat",
          heading: "Results",
          value: "94.69%",
          label: "Test accuracy",
        },
        {
          kind: "statGrid",
          columns: 4,
          items: [
            { value: "94.30%", label: "Precision" },
            { value: "95.45%", label: "Recall" },
            { value: "94.80%", label: "F1 score" },
            { value: "0.98", label: "AUC" },
          ],
        },
        {
          kind: "confusionMatrix",
          heading: "Confusion matrix",
          truePositive: 1507,
          trueNegative: 1385,
          falsePositive: 91,
          falseNegative: 71,
          positiveLabel: "affected",
          negativeLabel: "not affected",
        },
        {
          kind: "prose",
          body: [
            "The model correctly classified most of the test images, but it still made both false positive and false negative predictions.",
          ],
        },
        {
          kind: "prose",
          heading: "What I learned",
          body: [
            "This project taught me much more than how to train a deep learning model.",
            "I learned how much the dataset matters. A model can perform very well on one dataset and still have problems when the data changes.",
            "I also learned that accuracy alone does not tell the whole story. Looking at false positives, false negatives, recall, and other metrics gives a much clearer picture of what the model is actually doing.",
            "Most importantly, this project changed how I think about machine learning research. A strong result is useful, but it is not the same as a system being ready for real-world use.",
          ],
        },
        {
          kind: "cardGrid",
          heading: "Limitations",
          columns: 3,
          items: [
            {
              title: "Limited dataset",
              body: "The model was trained and tested on one dataset, so it may not represent all populations, skin types, lighting conditions, or real-world environments.",
            },
            {
              title: "No external validation",
              body: "We did not test the model on a separate, outside dataset.",
            },
            {
              title: "False negatives",
              body: "The model still missed some affected cases in the test set. In a medical setting, missing an affected case matters.",
            },
          ],
        },
        {
          kind: "prose",
          body: [
            "These limitations are why I see this work as an early research step rather than a finished clinical system.",
          ],
        },
      ],
    },
    {
      id: "poster",
      label: "Poster",
      blocks: [
        {
          kind: "prose",
          body: [
            "This is the poster I prepared on the entire work. It gives a quick visual summary of the project, the data, the models we compared, and the results.",
          ],
        },
        {
          kind: "figure",
          src: "/papers/iccit-poster.png",
          alt: "Conference poster for 'A Deep Learning Approach to Automate Classification of Arsenic-Affected Skin using EfficientNet-B1', presented at ICCIT 2024",
          caption: "Click the poster to open it at full size.",
          href: "/papers/iccit-poster.png",
        },
      ],
    },
    {
      id: "photos",
      label: "Photos",
      blocks: [
        {
          kind: "prose",
          body: [
            "These are placeholder photos for now. I'll swap them for real photos from the conference soon.",
          ],
        },
        {
          kind: "carousel",
          items: [
            {
              src: "/media/people/portrait.jpg",
              alt: "Placeholder photo, to be replaced with a photo from ICCIT 2024",
              caption: "Placeholder — real conference photo coming soon",
            },
            {
              src: "/media/people/portrait-alt.jpg",
              alt: "Placeholder photo, to be replaced with a photo from ICCIT 2024",
              caption: "Placeholder — real conference photo coming soon",
            },
          ],
        },
      ],
    },
  ],
};
