# Atomic Rearrangement Cover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved bilingual dynamic cover with physically restrained atom rearrangement and a compact transition into the first-principles learning path.

**Architecture:** Keep deterministic geometry and assignment functions independent from React and Canvas so they are testable. A Canvas component renders transitions, while a hero component owns language, sequencing, controls, and reduced-motion behavior. The existing overview composition and header receive only scoped integration changes.

**Tech Stack:** React 19, TypeScript 6, HTML Canvas 2D, Lucide React, CSS, Vitest, Testing Library.

---

### Task 1: Rearrangement Geometry And Assignment

**Files:**
- Create: `site/src/features/overview/atomicRearrangementModel.ts`
- Create: `site/src/features/overview/atomicRearrangementModel.test.ts`

- [ ] **Step 1: Write failing geometry tests**

Test that `createArrangementTargets(shape, viewport)` returns 81 finite in-bounds points for `random`, `circle`, `grid`, `pairs`, and `cat`; that repeated random generation is deterministic; that paired-column internal spacing is smaller than spacing between pairs; and that `smootherstep(0)`, `smootherstep(1)`, plus its endpoint slope behavior are correct.

- [ ] **Step 2: Run the model test and confirm failure**

Run: `npx vitest run src/features/overview/atomicRearrangementModel.test.ts`

Expected: FAIL because the model module does not exist.

- [ ] **Step 3: Implement focused model functions**

Export these stable contracts:

```ts
export type ArrangementShape = 'random' | 'circle' | 'grid' | 'pairs' | 'cat'
export interface Point { x: number; y: number }
export interface ArrangementViewport { width: number; height: number; mobile: boolean }
export const arrangementSequence: ArrangementShape[]
export function createArrangementTargets(shape: ArrangementShape, viewport: ArrangementViewport): Point[]
export function assignNearestTargets(from: Point[], to: Point[]): number[]
export function smootherstep(value: number): number
```

Use a fixed-seed generator for random loading, three rings for the circle, 9 by 9 targets for grid and pairs, and length-weighted polyline sampling for the cat outline. Assignment must be deterministic and one-to-one.

- [ ] **Step 4: Run the model tests and confirm pass**

Run: `npx vitest run src/features/overview/atomicRearrangementModel.test.ts`

Expected: all model tests PASS.

### Task 2: Bilingual Hero Interaction

**Files:**
- Create: `site/src/features/overview/AtomicRearrangementHero.tsx`
- Create: `site/src/features/overview/AtomicRearrangementHero.test.tsx`

- [ ] **Step 1: Write failing interaction tests**

Render Chinese and English variants. Assert the localized H1, journey link, five shape buttons, initial active label, and localized Canvas description. Click the cat button and assert `aria-pressed="true"` plus the live label `猫形` or `Cat`.

- [ ] **Step 2: Run the hero test and confirm failure**

Run: `npx vitest run src/features/overview/AtomicRearrangementHero.test.tsx`

Expected: FAIL because the hero component does not exist.

- [ ] **Step 3: Implement the semantic hero shell**

Use Lucide `Dices`, `Circle`, `Grid3X3`, `Columns3`, `Cat`, and `ArrowDown`. Keep all visible copy in localized records. Store `activeShape`, schedule the approved sequence, pause after manual selection, and disable automatic sequencing when reduced motion is requested.

- [ ] **Step 4: Run the hero tests and confirm pass**

Run: `npx vitest run src/features/overview/AtomicRearrangementHero.test.tsx`

Expected: all hero tests PASS.

### Task 3: Canvas Rendering

**Files:**
- Create: `site/src/features/overview/AtomicRearrangementCanvas.tsx`
- Modify: `site/src/features/overview/AtomicRearrangementHero.tsx`

- [ ] **Step 1: Add a failing Canvas contract assertion**

Assert the hero renders one Canvas with a localized accessible description and passes the selected arrangement through a stable data attribute for DOM-level verification.

- [ ] **Step 2: Implement Canvas lifecycle**

Use `ResizeObserver`, device-pixel-ratio clamping, `requestAnimationFrame`, and cleanup for observer and animation frame. When `shape` changes, compute current positions, assign targets, and animate with `smootherstep`. Draw faint target sites, short motion trails, Gaussian-style halos, bright atom cores, and paired-column warm accents. Do not register Canvas pointer handlers.

- [ ] **Step 3: Verify component tests**

Run: `npx vitest run src/features/overview/AtomicRearrangementHero.test.tsx`

Expected: PASS without leaked timers or animation handles.

### Task 4: Overview And Header Integration

**Files:**
- Modify: `site/src/features/overview/OverviewPage.tsx`
- Modify: `site/src/features/overview/CausalAtlas.tsx`
- Modify: `site/src/features/overview/OverviewPage.test.tsx`
- Modify: `site/src/components/AppHeader.tsx`
- Modify: `site/src/components/app-header.css`
- Modify: `site/src/components/AppHeader.test.tsx`
- Modify: `site/src/features/overview/overview.css`

- [ ] **Step 1: Update failing integration expectations**

Expect the overview H1 `中性 Yb 原子计算`, the journey link `从什么是计算开始` with `href="#causal-atlas"`, and the existing seven-node causal chain. Expect the overview header to have `app-header--cover`, while research-domain headers retain the default class.

- [ ] **Step 2: Integrate the hero and causal anchor**

Replace `overview-page__opening` with `AtomicRearrangementHero`. Add `id="causal-atlas"` to the causal section. Set the header class from the existing route: `app-header app-header--cover` only when `route === 'overview'`.

- [ ] **Step 3: Implement compact responsive styling**

Set the cover and journey band to occupy the first viewport together. Use a two-column desktop layout and a stacked mobile layout, keep the Canvas full-bleed, ensure the English H1 is narrower than the Chinese H1, and position controls inside safe edges. Add dark header color overrides only under `.app-header--cover`. Preserve current tablet navigation behavior.

- [ ] **Step 4: Run focused integration tests**

Run: `npx vitest run src/features/overview/OverviewPage.test.tsx src/components/AppHeader.test.tsx src/App.test.tsx`

Expected: PASS.

### Task 5: Quality Verification

**Files:**
- Modify only if verification exposes a scoped defect.

- [ ] **Step 1: Run static and automated checks**

Run:

```powershell
npm run lint
npx vitest run --pool=threads --maxWorkers=1
npm run test:public
npm run check:public
$env:VITE_BASE_PATH='/'; npm run build
```

Expected: all commands PASS.

- [ ] **Step 2: Run browser QA**

Verify the overview at 1440 by 1000, 1024 by 900, and 390 by 844. Inspect random, circle, grid, paired columns, and cat states; Chinese and English; reduced motion; journey anchor; header contrast; no clipping, overlap, excessive blank space, or console errors.

- [ ] **Step 3: Compare against the approved concept**

Use the approved concept screenshot and the latest implementation screenshot. Check copy, title wrapping, atom-field scale, shape controls, next-section visibility, dark header integration, and mobile composition. Fix every material mismatch before handoff.

- [ ] **Step 4: Prepare deployment update**

Run `git diff --check` and report the exact changed files. Do not commit or push until the required explicit confirmation is obtained.
