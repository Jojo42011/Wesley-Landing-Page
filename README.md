# Wesley Dulin

A focused real estate landing page and interactive home brief for buyers and sellers across Texas. React, TypeScript, and Vite. Ready to import into Vercel.

## Current scope

This is a working **visual and interaction preview**. The seven step questionnaire opens in a dialog. Choices start blank, advance on selection, and provide a typed Other path. The location answer is free text. Submit opens Wesley's optional Calendly booking widget. There is no backend, email delivery, CRM connection, or analytics tracking for questionnaire answers, so Submit does not deliver them. Calendly booking is separate and sends information entered into Calendly. Form answers stay in React memory and are cleared on refresh. Do not enter real personal information during review.

The media slot is ready for the actual VSL and English captions. Until both are supplied, the black placeholder shows a play icon and an honest availability message when clicked. It is not a personal introduction to Wesley.

The recent sales dialog shows a static selection from Wesley's [HAR sales page](https://www.har.com/realestatepro/sold-by-agent/sa-836365), checked in September 2026. Refresh the entries and date when the source changes.

## Local development

Use Node 22 LTS or a newer supported LTS release.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Vercel

1. Import `Jojo42011/Wesley-Landing-Page` into Vercel.
2. Select the Vite framework preset. The project root is the repository root.
3. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. No environment variables or third party accounts are needed for this preview.

`vercel.json` includes explicit framework settings and basic security headers. All images and fonts are served locally. There is no runtime dependency on Google Fonts or Unsplash.

## Editing

- `src/App.tsx`: landing page and supporting copy.
- `src/components/`: questionnaire, VSL, native dialog, and reusable controls.
- `src/config.ts`: identity, media URLs, answer choices, and typed answer contract.
- `src/landing.css`: compact page design and responsive layouts.
- `src/funnel.css`: questionnaire and dialog styles.
- `public/images/`: architectural inspiration photographs.
- `docs/research.md`: research rationale, source links, and proposed experiments.
- `docs/qa.md`: checks performed and release boundaries.
- `docs/launch.md`: next phase for email, Brivity, and the real VSL.

Customer facing prose contains no hyphens, en dashes, or em dashes. Technical identifiers and URLs use normal syntax.

## Design

Ivory, deep forest green, muted sage, restrained brass accents, Newsreader display type, and Plus Jakarta Sans body copy. A custom architectural D mark gives Dulin Real Estate its own identity without inventing a credential or affiliation. The main action leads into the home brief. The recent sales link opens an on page selection checked against HAR in September 2026. There are no fabricated reviews, awards, scarcity claims, or conversion guarantees.

All agent copy is draft marketing copy for Wesley to approve before launch. Photos are inspiration, not Wesley's listings or verified local properties. See `docs/credits.md`.
