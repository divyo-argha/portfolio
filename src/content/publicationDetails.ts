import type { Block, DetailTab } from "./types";

/** Extra body content for each publication's detail page, keyed by slug. */
export const publicationDetails: Record<string, Block[]> = {
  // cyqured has its own bespoke static route at src/app/publications/cyqured/
  // (a dedicated brand microsite, not the shared tab/block template) — its
  // content lives in src/app/publications/cyqured/content.ts instead of here.
  cyqured: [],

  // Content for this publication lives in `publicationTabs` below (Write-up /
  // Poster tabs) instead of a flat block list.
  arsenic: [],

  "ehrsql-primus-text-to-sql": [
    {
      kind: "prose",
      body: [
        "My first research project in NLP and text-to-SQL.",
        "I worked on the EHRSQL 2024 shared task, where the goal was to turn natural-language questions about electronic health records into SQL queries \u2014 exploring how language models could be applied to structured medical data. Our work was published at the Clinical NLP Workshop, co-located with NAACL 2024.",
        "It is where I learned how research actually works: formulating a problem, designing and running experiments, reading the results honestly, and writing up what we found.",
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
      src: "/media/publications/primus/architecture-diagram.webp",
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
        "The model generated valid SQL for many questions, but struggled once questions grew more complex or required a real understanding of the database structure.",
        "That gap is the finding I took away: getting a language model to produce an answer is not the same as getting it to produce a correct one. Performance depended heavily on the data, the prompt, and how the task itself was set up.",
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
    {
      kind: "code",
      heading: "Cite this paper",
      language: "bibtex",
      body: `@inproceedings{joy2024primus,
  title     = {Project {PRIMUS} at {EHRSQL} 2024: Text-to-{SQL} Generation
               using Large Language Models for {EHR} Analysis},
  author    = {Bhowmik Joy, Sourav and Ahmed, Rohan and Saha, Argha Pratim and
               Bhowmik, Partha Sarothi and Das, Utsho and Ahmed, Minhaj},
  booktitle = {Proceedings of the 6th Clinical Natural Language Processing
               Workshop},
  year      = {2024},
  address   = {Mexico City, Mexico},
  publisher = {Association for Computational Linguistics},
  url       = {https://aclanthology.org/2024.clinicalnlp-1.46/},
}`,
    },
  ],
};

/** Publications rendered as multiple tabs instead of one flat block list.
 * Keyed by slug; a publication with no entry here just renders `blocks`
 * from `publicationDetails` above as usual. */
export const publicationTabs: Record<string, DetailTab[]> = {
  arsenic: [
    {
      id: "write-up",
      label: "Write-up",
      blocks: [
        {
          kind: "prose",
          body: [
            "Arsenic contamination in groundwater is a major public health challenge in Bangladesh, often manifesting as visible skin keratosis, hyperpigmentation, and lesions.",
            "We investigated whether deep convolutional transfer learning could reliably classify clinical skin photographs into arsenic-affected versus unaffected cases. Using the ArsenicSkinImageBD dataset, we evaluated and compared five architectures; EfficientNet-B1 performed strongest, reaching 94.69% test accuracy and 0.98 AUC.",
            "The work began as a machine learning coursework project at Shahjalal University of Science and Technology (SUST) and was extended into a full paper, published at IEEE ICCIT 2024.",
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
          compact: true,
          items: [
            {
              src: "/media/publications/arsenic/affected-skin.webp",
              alt: "A palm showing arsenic-affected skin, with visible keratosis and dark spots",
              caption: "Arsenic-affected",
            },
            {
              src: "/media/publications/arsenic/not-affected-skin.webp",
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
          kind: "statGrid",
          heading: "Results",
          columns: 5,
          items: [
            { value: "94.69%", label: "Test Accuracy", highlight: true },
            { value: "94.30%", label: "Precision" },
            { value: "95.45%", label: "Recall" },
            { value: "94.80%", label: "F1 Score" },
            { value: "0.98", label: "AUC" },
          ],
        },
        {
          kind: "gallery",
          heading: "Evaluation: Confusion Matrix & ROC Curves",
          columns: 2,
          items: [
            {
              src: "/media/publications/arsenic/confusion-matrix.webp",
              alt: "Confusion Matrix for EfficientNet-B1 showing 1507 True Positives, 1385 True Negatives, 91 False Positives, and 71 False Negatives",
              caption: "Fig. 5: Confusion matrix on test set (1507 TP, 1385 TN, 91 FP, 71 FN).",
              href: "/media/publications/arsenic/confusion-matrix.webp",
            },
            {
              src: "/media/publications/arsenic/roc-curve-comparison.webp",
              alt: "ROC Curve comparison across EfficientNet-B1, EfficientNet-B0, ResNet-50, MobileNetV2, and VGG-19",
              caption: "Fig. 6: Multi-model ROC comparison (EfficientNet-B1 AUC = 0.98).",
              href: "/media/publications/arsenic/roc-curve-comparison.webp",
            },
          ],
        },
        {
          kind: "prose",
          body: [
            "Empirical evaluation figures generated from the test set. The confusion matrix breaks down the 1,507 true positive and 1,385 true negative predictions against misclassifications, while the multi-model ROC curves highlight EfficientNet-B1's superior sensitivity (95.45% TPR at 6.17% FPR, AUC = 0.98) across operating thresholds.",
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
        {
          kind: "code",
          heading: "Cite this paper",
          language: "bibtex",
          body: `@inproceedings{saha2024arsenic,
  title     = {A Deep Learning Approach to Automate Classification of
               Arsenic-Affected Skin using EfficientNet-B1},
  author    = {Saha, Argha Pratim and Das, Utsho and Rahman, M. Shahidur},
  booktitle = {2024 27th International Conference on Computer and
               Information Technology (ICCIT)},
  year      = {2024},
  publisher = {IEEE},
  doi       = {10.1109/ICCIT64611.2024.11022014},
}`,
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
            `Academic poster designed to visually summarize the dataset, transfer learning pipeline, comparative metrics, and clinical evaluation process. This was presented during our coursework presentation at Shahjalal University of Science and Technology (SUST).`,
          ],
        },
        {
          kind: "figure",
          src: "/papers/iccit-poster.webp",
          alt: "Academic poster for 'A Deep Learning Approach to Automate Classification of Arsenic-Affected Skin using EfficientNet-B1', presented at SUST",
          caption: "Click the poster to open it at full size.",
          href: "/papers/iccit-poster.webp",
        },
      ],
    },
  ],
};
