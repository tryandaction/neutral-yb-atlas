# Contributing to Neutral Yb Atlas

Neutral Yb Atlas is a public learning resource. Contributions should improve clarity, accuracy, accessibility or source coverage for learners.

## What To Contribute

- Correct a scientific statement, equation, unit, figure label or link.
- Improve a Chinese or English translation while preserving meaning.
- Add a primary paper, authoritative database or stable publisher link to the reading section.
- Improve an interactive explanation when the change makes a physical concept easier to learn.

## Before Opening A Pull Request

1. Select **纠错与贡献 / Contribute** in the website footer, or open an Issue directly. Both paths lead to the GitHub Issue form; the website never changes published text or writes to GitHub.
2. Name the affected page, heading or URL anchor.
3. Quote only the minimum text or figure label that needs changing.
4. Include a DOI, arXiv identifier, official database or stable publisher URL for each scientific claim.
5. Do not upload paper PDFs, credentials, private lab data, unpublished results or copyrighted images without redistribution rights.

GitHub sign-in is required only when submitting an Issue or Pull Request on GitHub. The public website has no write-capable token, OAuth flow, or direct publishing action.

## Pull Request Checklist

Run the following from `site/` before submitting:

```powershell
npm test -- --run
npm run lint
npm run build
```

Include desktop and mobile screenshots when a visual layout changes. Keep Chinese and English interfaces consistent. Explain whether a value is a teaching example, an established reference value, or a result tied to a specific source.

## Review

Maintainers review scientific scope, source quality, language consistency, accessibility and responsive layout before merging. Merged changes deploy through the public repository workflow. When the repository integration does not trigger Pages, a maintainer deploys the same verified `site/dist` build manually.
