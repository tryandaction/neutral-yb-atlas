# Neutral Yb Atlas

> This directory contains the website application. Repository scope, licensing and contribution rules are documented in [../README.md](../README.md) and [../CONTRIBUTING.md](../CONTRIBUTING.md).

Neutral Yb Atlas is a bilingual, editable research guide to neutral-ytterbium quantum computing. It connects first-principles quantum mechanics, neutral-atom hardware, Yb atomic structure, Rydberg gates, experimental engineering, theory-to-lab workflows and fault-tolerant architectures.

Neutral Yb Atlas 是一套可编辑的中英双语科研指南，从量子计算底层出发，连接中性原子、Yb 能级、Rydberg 门、实验工程、理论建模与容错架构。

## Features

- Chinese and English content with state-preserving language switching;
- seven linked chapters with 28 bilingual foundation-to-architecture modules;
- KaTeX equations and source-aware evidence records;
- five bilingual interactive teaching diagrams spanning first principles, Yb levels, Rydberg-gate state evolution, the full apparatus pipeline and the research/engineering ecosystem;
- interactive blockade/Rabi teaching models and error budgets;
- seven-phase experiment acceptance workflow with 21 instrument classes and selection guidance;
- normalized Rb/Cs/Sr/Yb comparison;
- chapter-scale gate, waveform and logical-scheduling figures plus a four-view interactive research atlas;
- a complete Yb reference map placed after the interactive energy-level tutor, with full-resolution inspection;
- editable article blocks with per-block restore, confirmed restore-all, local notes, parameter snapshots and JSON import/export;
- static GitHub Pages deployment without a backend.

## Development

```powershell
npm install
npm run dev
```

Quality checks:

```powershell
npm test -- --run
npm run lint
npm run build
```

## Data Boundary

Browser edits are stored in versioned `localStorage` under `neutral-yb-atlas.workspace.v1`. They are not uploaded and do not modify repository source files. Public content contributions should use the normal GitHub pull-request workflow.

Interactive numerical outputs are explicitly labeled as teaching models. Candidate or missing atomic parameters are not promoted to paper-level reproduction claims.

## GitHub Pages

The included workflow builds and deploys `dist/` from `main`. In the GitHub repository settings, select **GitHub Actions** as the Pages source.

## Visual Assets

The source and optimized WebP copies of the Yb energy-level reference map are stored in `assets/`, together with project-owned numerical research figures for blockade diagnostics, control-waveform handoff, response functions, two-atom models and logical scheduling. The dense reference map is intentionally excluded from the first viewport and appears only after the interactive Yb-level tutor.

Core teaching visuals are code-native, bilingual and interactive so labels remain sharp and editable. `docs/image-prompts.md` now defines the teaching-diagram policy; generated photographs or decorative images cannot replace causal diagrams, apparatus maps, formulas, legends or evidence boundaries. No API credential is stored in this project.

## Project Documentation

- `docs/design-spec.md`
- `docs/implementation-plan.md`
- `docs/content-sources.md`
- `docs/image-prompts.md`
- `docs/fidelity-ledger.md`

Code is licensed under Apache-2.0. Project-authored text and figures are licensed under CC BY 4.0; see the repository-root license files for exact boundaries.
