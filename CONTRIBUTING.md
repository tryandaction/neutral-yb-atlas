# Contributing to Neutral Yb Atlas

Neutral Yb Atlas is a public learning resource. Contributions should improve clarity, accuracy, accessibility or source coverage for learners.

## What To Contribute

- Correct a scientific statement, equation, unit, figure label or link.
- Improve a Chinese or English translation while preserving meaning.
- Add a primary paper, authoritative database or stable publisher link to the reading section.
- Improve an interactive explanation when the change makes a physical concept easier to learn.

## Before Opening A Pull Request

1. Open an Issue using the content-correction template, or comment on an existing Issue.
2. Name the affected page, heading or URL anchor.
3. Quote only the minimum text or figure label that needs changing.
4. Include a DOI, arXiv identifier, official database or stable publisher URL for each scientific claim.
5. Do not upload paper PDFs, credentials, private lab data, unpublished results or copyrighted images without redistribution rights.

## Pull Request Checklist

Run the following from `site/` before submitting:

```powershell
npm test -- --run
npm run lint
npm run build
```

Include desktop and mobile screenshots when a visual layout changes. Keep Chinese and English interfaces consistent. Explain whether a value is a teaching example, an established reference value, or a result tied to a specific source.

## Review

Maintainers review scientific scope, source quality, language consistency, accessibility and responsive layout before merging. Merged changes deploy automatically through the public repository workflow.
