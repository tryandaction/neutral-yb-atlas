# Neutral Yb Atlas

Neutral Yb Atlas 是面向中性镱原子量子计算的双语、可交互科研指南，连接第一性原理、Yb 原子结构、Rydberg 门、实验工程、误差分析和容错架构。

Neutral Yb Atlas is a bilingual, interactive research guide connecting first-principles quantum mechanics, neutral-Yb hardware, Rydberg gates, laboratory engineering, error analysis and fault-tolerant architectures.

## Repository

```text
site/                  React + TypeScript website
knowledge/concepts/    Research notes and one reference image
knowledge/index.json   Content status and provenance registry
scripts/               Public-boundary checks
```

`Categorized Papers` and all locally collected paper PDFs are intentionally excluded from this repository.

## Local Development

```powershell
cd site
npm ci
npm run dev
```

Quality checks:

```powershell
npm run test:public
npm run check:public
npm test -- --run
npm run lint
npm run build
```

## Content Status

- `draft`: public working note; sources or scientific review may be incomplete.
- `reviewed`: core definitions and claims have authoritative sources.
- `verified`: parameters, boundaries and recent claims have been checked against primary sources.

All imported Concept notes begin as `draft`. See [knowledge/index.json](knowledge/index.json) for the current status.

## Contributing

Corrections to formulas, experimental parameters, translations, diagrams and code are welcome through GitHub Issues and Pull Requests. Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

Browser editing remains local to the reader. It does not directly change the public repository or bypass review.

## License

- Code and build configuration: [Apache License 2.0](LICENSE).
- Project-authored text and figures: [CC BY 4.0](LICENSE-CONTENT.md).
- Third-party material remains under its original terms and is not covered unless explicitly stated.

