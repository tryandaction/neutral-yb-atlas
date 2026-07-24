# Yb Cycle Parameter Panels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace repeated stage ribbons with source-qualified optical operating points in the five Yb cycle SVG panels.

**Architecture:** Keep the React component and horizontal rail unchanged. Treat each SVG as a self-contained scientific plate; validate its visible text with a Node test so scientific labels and prohibited legacy text are regression-tested.

**Tech Stack:** React 19, TypeScript, SVG, Vitest, Node test scripts.

---

### Task 1: SVG content contract

**Files:**
- Create: `site/src/features/experiment-timeline/cycle-timeline-svg-content.test.mjs`

- [ ] Write a Node test that loads all five SVG files, rejects duplicated stage-ribbon labels, requires `REPORTED OPERATING POINT`, and checks the stage-specific parameter strings from the approved design.
- [ ] Run `npx vitest run src/features/experiment-timeline/cycle-timeline-svg-content.test.mjs` from `site/` and confirm failures identify the repeated ribbons and missing operating points.

### Task 2: Scientific panel content

**Files:**
- Modify: `site/assets/yb-cycle-01-reservoir-load.svg`
- Modify: `site/assets/yb-cycle-02-qualify-cool.svg`
- Modify: `site/assets/yb-cycle-03-prepare-handoff.svg`
- Modify: `site/assets/yb-cycle-04-compute.svg`
- Modify: `site/assets/yb-cycle-05-readout-feedback.svg`

- [ ] Remove the five-cell ribbon from each SVG without changing the 760 by 760 view box.
- [ ] Add one compact source-qualified operating-point band per panel.
- [ ] Replace generic lane labels with the exact durations, detunings, intensities, powers, polarizations, and Rabi frequencies specified in the design.
- [ ] Correct readout imaging from 399 nm to local 556 nm.
- [ ] Run the SVG content test and confirm it passes.

### Task 3: Web regression and visual verification

**Files:**
- Modify only if necessary: `site/src/features/experiment-timeline/ExperimentCycleTimeline.test.tsx`

- [ ] Run the focused Vitest suite for `ExperimentCycleTimeline`.
- [ ] Run the complete Vitest suite, lint, and production build.
- [ ] Inspect all five panels at desktop and mobile widths; confirm no text clipping, overlap, or page-level overflow.
- [ ] Defer `git commit`, `git push`, and production deployment until the user gives the required explicit dangerous-operation confirmation.
