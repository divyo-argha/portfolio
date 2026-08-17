# Content checklist

Assets referenced by the site that don't exist yet. Everything renders with a
graceful placeholder until these are added — nothing is broken, but these are
the highest-leverage additions before applying.

## Missing assets

| What | Where it goes | Used by |
|---|---|---|
| Portrait photo | `public/media/portrait.jpg` | `src/components/primitives/PortraitPlaceholder.tsx` → swap for `next/image` |
| CyQured board / gameplay photos | `public/media/cyqured/*.jpg` | Append `figure`/`gallery` blocks to `cyqured` in `src/content/publicationDetails.ts` |
| CV PDF | `public/cv.pdf` | Linked from the contact section (`src/components/sections/ContactBand.tsx`) |

## Adding the CyQured gallery later

`src/content/publicationDetails.ts` currently ships `cyqured: []` (titled
shell, per plan). To add the board/card/gameplay photography:

```ts
cyqured: [
  { kind: "prose", body: ["..."] },
  {
    kind: "gallery",
    columns: 3,
    items: [
      { src: "/media/cyqured/board.jpg", alt: "CyQured tabletop board" },
      { src: "/media/cyqured/cards.jpg", alt: "STRIDE threat cards" },
      { src: "/media/cyqured/gameplay.jpg", alt: "Gameplay session" },
    ],
  },
],
```

No component changes needed — `BlockRenderer` already handles both block
kinds.

## Known CV discrepancies (not fixed here — this is a website, not the CV)

- Publications section has a placeholder line: `GOOGLE SCHOLAR LINK DITE HOBE SHOBGULA te`.
- git-user downloads are understated in the LaTeX CV ("3,000 in the first
  month"); actual is 4,555/month and 9,795 across 2026 — the site uses the
  accurate figures.
- English proficiency line is an empty bracket.
