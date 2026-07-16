# Neutral Yb Atlas

Neutral Yb Atlas is a bilingual learning atlas for neutral-ytterbium quantum computing. It connects quantum foundations, Yb atomic structure, Rydberg gates, experimental systems and fault-tolerant architectures through guided explanations, interactive diagrams and source-linked reading.

## Website

Visit the atlas at [neutral-yb-atlas.pages.dev](https://neutral-yb-atlas.pages.dev/).

## Repository

```text
site/        React + TypeScript learning atlas
knowledge/   Source material and content metadata
scripts/     Public-boundary checks
```

## Contributing

Public improvements are welcome. Use a GitHub Issue to report a correction or start a discussion, then open a Pull Request for an approved change. Each scientific correction must identify the page or section, quote the minimal affected statement, and include a DOI, arXiv record, official database or stable publisher URL.

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow, source requirements, translation guidance and local checks. The website does not accept browser-side edits, research notes, parameter snapshots or private data.

## Local Development

```powershell
cd site
npm ci
npm run dev
```

```powershell
npm test -- --run
npm run lint
npm run build
```

## License

- Code and build configuration: [Apache License 2.0](LICENSE).
- Project-authored text and figures: [CC BY 4.0](LICENSE-CONTENT.md).
- Third-party material remains under its original terms.
