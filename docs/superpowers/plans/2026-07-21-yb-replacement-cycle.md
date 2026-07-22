# ¹⁷¹Yb Replacement-Cycle Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the schematic five-stage strip with a source-qualified, multi-scale timing figure that resolves the Li 2025 replacement macrocycle, preparation microcycle, and spin-readout microcycle.

**Architecture:** Keep the existing React feature and five stage buttons. Update the standalone SVG directly, strengthen static content tests, and revise the bilingual stage explanations so the Li macrocycle and independently calibrated gate primitives remain separate.

**Tech Stack:** SVG, React, TypeScript, Vitest, Node test runner, Vite, Playwright/Chrome rendering.

---

### Task 1: Lock the evidence contract with failing tests

**Files:**
- Modify: `site/src/features/experiment-timeline/experimentCycleGraphic.test.mjs`
- Modify: `site/src/features/experiment-timeline/ExperimentCycleTimeline.test.tsx`

- [ ] Assert that the SVG contains `scheduled load 2 ms`, `τload = 0.84 ms`, `move 0.5 ms`, `LAC 6 ms`, `identification image 4 ms`, `cool 6 ms`, and `prepare ³P₀ 0.7 ms`.
- [ ] Assert separate initialization labels for `global σ+ 556 nm` and `local 556 + 1539 nm`, four `900 ns` subwindows, and `×50 each stage`.
- [ ] Assert readout labels for `649 + 770 nm Raman`, `400 ns`, `×8`, `497 nm depump`, two `map + depump 15 µs` windows, and two `image 4 ms` windows.
- [ ] Add negative assertions for `about 1 ms`, `2 × 50`, `497 nm Raman`, and visible evidence-status wording.
- [ ] Run `npm.cmd run test -- --run src/features/experiment-timeline/experimentCycleGraphic.test.mjs src/features/experiment-timeline/ExperimentCycleTimeline.test.tsx` and verify failures identify the old SVG content.

### Task 2: Rebuild the macrocycle as parallel tracks

**Files:**
- Modify: `site/assets/yb-replacement-cycle-timeline.svg`

- [ ] Preserve the 1900 px viewBox width and increase height only as required for legibility.
- [ ] Retain five semantic stage bands while drawing reservoir/mobile and stationary-compute tracks separately.
- [ ] Add the exact scheduled windows from the parameter ledger and distinguish `τload = 0.84 ms` from the 2 ms loading dwell.
- [ ] Align mobile/stationary tweezer overlap ramps at handoff and place the compute interval `T` in parallel with the next mobile-array reload.
- [ ] Show molasses OFF during both fluorescence images and route the camera record into the next replacement decision.
- [ ] Parse the file as XML and run the static test to verify the macrocycle assertions pass.

### Task 3: Expand the preparation and readout microcycles

**Files:**
- Modify: `site/assets/yb-replacement-cycle-timeline.svg`

- [ ] Draw four 900 ns preparation subwindows with explicit `TRAP ON` and `TRAP OFF` labels.
- [ ] Place global sigma-plus 556 nm and local 556+1539 nm in different trap-off windows and label `×50 each stage`.
- [ ] Draw the readout trap-modulation cycle with simultaneous 649+770 nm, a 400 ns pulse label, 497 nm de-pumping, and `×8`.
- [ ] Connect the readout microcycle to two macro `map + depump 15 µs → image 4 ms` branches and the `|0⟩ / |1⟩ / loss` classifier.
- [ ] Run the static SVG test and confirm all microcycle assertions pass.

### Task 4: Update the bilingual teaching layer

**Files:**
- Modify: `site/src/features/experiment-timeline/cycleTimelineData.ts`
- Modify: `site/src/features/experiment-timeline/ExperimentCycleTimeline.tsx`
- Test: `site/src/features/experiment-timeline/ExperimentCycleTimeline.test.tsx`

- [ ] Replace generic stage prose with the exact source-qualified distinctions in the parameter ledger.
- [ ] State that the mobile reload chain and stationary compute interval run concurrently.
- [ ] Explain that the two images classify `|0⟩`, `|1⟩`, and loss from their ordered bright/dark record.
- [ ] Revise the caption to identify the macro, preparation, and readout time scales and keep Ma 2023 gate timings off the Li macro-axis.
- [ ] Run the component and route tests and verify stage selection still updates `aria-pressed` and the detail panel.

### Task 5: Verify source, layout, and production output

**Files:**
- Verify: `site/assets/yb-replacement-cycle-timeline.svg`
- Verify: `site/dist/` through the build command only

- [ ] Run `node --test scripts/check-public.test.mjs` only if the public-file test is configured for this asset; otherwise record that it is not applicable.
- [ ] Run `npm.cmd run lint` and expect exit code 0.
- [ ] Run `npm.cmd run build` and expect the hashed replacement-cycle SVG in `dist/assets/`.
- [ ] Render the SVG at its native dimensions and inspect every lane label, pulse, arrow, and panel boundary.
- [ ] Start a production preview and verify 1440 x 900 and 390 x 844 viewports with no document-level horizontal overflow.
- [ ] Remove only the temporary PDF text, rendered PDF pages, and SVG screenshots created by this task. Preserve all source PDFs and unrelated workspace files.
