# Contributing to Neutral Yb Atlas

感谢你帮助改进 Neutral Yb Atlas。仓库接受代码、公式、实验参数、双语文本、教学图和知识笔记方面的贡献。

## Workflow

1. Fork the repository and create a focused branch.
2. Change one coherent topic per Pull Request.
3. Add primary or authoritative sources for new scientific claims.
4. Run all checks listed below.
5. Complete the Pull Request checklist and respond to review comments.

Direct changes to `main` are not the contribution path. Public content is updated only after automated checks and maintainer review.

## Scientific Status

Every file under `knowledge/concepts/` must have exactly one entry in `knowledge/index.json`.

- `draft`: a working note. Empty `sources` is allowed, but the content must not be presented as verified.
- `reviewed`: core definitions, formulas and numerical claims require at least one authoritative source.
- `verified`: important parameters, experimental boundaries and recent claims require primary sources and a review date.

Do not raise a status without explaining the evidence in the Pull Request. Use DOI, arXiv, official documentation or stable publisher links where possible.

## Content Rules

- Keep equations dimensionally consistent and define symbols near first use.
- Distinguish atomic constants, literature apparatus examples, derived values and local engineering targets.
- Keep Chinese and English interfaces consistent when changing visible website text.
- Record the origin, license and scientific review boundary of every new image.
- Do not submit paper PDFs, archives, private datasets, credentials or material with unclear redistribution rights.
- Do not add content copied from a source without quotation, attribution and license compatibility.

## Required Checks

Run from `site/`:

```powershell
npm run test:public
npm run check:public
npm test -- --run
npm run lint
npm run build
```

For visual changes, include desktop and mobile screenshots and state which viewport sizes were checked.

## Reporting Security or Privacy Problems

Do not post credentials, private paths or personal information in a public Issue. Once the GitHub repository is created, use GitHub private vulnerability reporting when available; otherwise contact the repository maintainer privately before publishing details.

## Review

Maintainers review scientific evidence, licensing, bilingual consistency, tests and visual regressions. A passing automated check is necessary but does not replace scientific review.

