# Yb Energy Levels SVG Implementation Plan

> **For agentic workers:** Execute inline in this session. Do not create commits or branches unless the user requests them.

**Goal:** Replace the generated bitmap reference map with a deterministic, editable SVG that reproduces the approved physics content and repump workflow.

**Architecture:** A Node.js generator owns all coordinates, labels, colors, and scientific data, then writes a standalone SVG asset. The React reference map imports the SVG and uses normalized hotspot coordinates calibrated to the new geometry.

**Tech Stack:** Node.js ESM, SVG 1.1, React/Vite asset imports, Vitest.

---

### Task 1: Deterministic SVG generator

**Files:**
- Create: `scripts/generate-yb-energy-levels-svg.mjs`
- Create: `site/assets/yb-energy-levels-reference.svg`

- [ ] Define reusable SVG helpers for text, cards, arrows, and multiline labels.
- [ ] Encode the verified main energy levels, optical transitions, nuclear-spin states, and parameter cards.
- [ ] Encode the two-stage Rydberg decay and 770 nm repump workflow with the correct level ordering `3S1 > 3P2 > 3P1 > 3P0 > 1S0`.
- [ ] Encode the distinct population statistics `51% / 19% / 30%` and gate-error statistics `56% / 33%`.
- [ ] Run `node scripts/generate-yb-energy-levels-svg.mjs` and verify that the SVG is regenerated deterministically.

### Task 2: Application integration

**Files:**
- Modify: `site/src/features/atomic-map/AtomicMap.tsx`
- Modify: `site/src/features/atomic-map/atomic-map.css`
- Modify: `site/src/features/atomic-map/AtomicMap.test.tsx`

- [ ] Change the asset import from WebP to SVG.
- [ ] Replace the five hotspot coordinates with positions calibrated to the new SVG.
- [ ] Update the mobile-lens aspect ratio to the SVG viewBox.
- [ ] Update tests to assert the new normalized coordinates and SVG asset behavior.

### Task 3: Verification

- [ ] Render the SVG to a raster preview and inspect it for nonblank output, readable text, correct arrow endpoints, and no overlaps.
- [ ] Run the focused AtomicMap test.
- [ ] Run the site build.
- [ ] Review `git diff` and confirm only the intended files changed.
