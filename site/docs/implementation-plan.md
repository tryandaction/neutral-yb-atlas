# Neutral Yb Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual, editable, evidence-aware research website that teaches neutral-Yb quantum computing from first principles and supports practical theory and experiment workflows.

**Architecture:** A static React + TypeScript + Vite application separates bilingual scientific content, interactive physical models, experiment workflows, and versioned browser persistence into focused modules. The app uses code-native text, formulas, controls and diagrams, while project-owned raster assets provide strong visual depth. It builds without a backend and supports GitHub Pages subpaths.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, KaTeX, Lucide React, Recharts, CSS, localStorage.

---

### Task 1: Project scaffold and verification baseline

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `eslint.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`

- [ ] **Step 1: Add a failing smoke test**

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the bilingual atlas shell', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: '中性镱原子计算的理论与实验基础' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and confirm the missing `App` failure**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because `src/App.tsx` does not exist.

- [ ] **Step 3: Add the minimal app and toolchain configuration**

Create a Vite React entry point, configure `vitest` with `jsdom`, and add scripts for `dev`, `build`, `lint`, `test`, and `preview`.

- [ ] **Step 4: Install dependencies and verify the baseline**

Run: `npm install`

Run: `npm test -- --run src/App.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: Vite production build completes in `dist/`.

### Task 2: Shared types, bilingual content and evidence registry

**Files:**
- Create: `src/types/content.ts`
- Create: `src/content/site.ts`
- Create: `src/content/chapters.ts`
- Create: `src/content/experiment.ts`
- Create: `src/content/evidence.ts`
- Create: `src/content/content.test.ts`

- [ ] **Step 1: Test language parity and evidence integrity**

```ts
import { chapters } from './chapters'
import { evidenceEntries } from './evidence'

it('keeps Chinese and English content paired', () => {
  for (const chapter of chapters) {
    expect(chapter.title.zh).toBeTruthy()
    expect(chapter.title.en).toBeTruthy()
    expect(chapter.sections.length).toBeGreaterThan(1)
  }
})

it('requires a source and unit for confirmed numeric evidence', () => {
  for (const entry of evidenceEntries.filter(item => item.status.startsWith('confirmed'))) {
    expect(entry.source).toBeTruthy()
    if (typeof entry.value === 'number') expect(entry.unit).toBeTruthy()
  }
})
```

- [ ] **Step 2: Verify tests fail before the content modules exist**

Run: `npm test -- --run src/content/content.test.ts`

Expected: FAIL with module-not-found errors.

- [ ] **Step 3: Implement typed bilingual content**

Define `LocalizedText`, `Chapter`, `ArticleSection`, `EvidenceStatus`, `EvidenceEntry`, `ExperimentPhase`, and `InstrumentEntry`. Populate seven chapters with concise but substantive theory, equations, experimental consequences, misconceptions, and open questions.

- [ ] **Step 4: Verify content integrity**

Run: `npm test -- --run src/content/content.test.ts`

Expected: PASS.

### Task 3: Versioned local workspace and import/export

**Files:**
- Create: `src/features/workspace/workspaceTypes.ts`
- Create: `src/features/workspace/workspaceStorage.ts`
- Create: `src/features/workspace/useWorkspace.ts`
- Create: `src/features/workspace/workspaceStorage.test.ts`

- [ ] **Step 1: Test persistence, invalid import rejection and version migration**

```ts
import { createDefaultWorkspace, parseWorkspace, serializeWorkspace } from './workspaceStorage'

it('round-trips a workspace export', () => {
  const source = createDefaultWorkspace()
  expect(parseWorkspace(serializeWorkspace(source))).toEqual(source)
})

it('rejects unknown workspace versions', () => {
  expect(() => parseWorkspace('{"version":99}')).toThrow('Unsupported workspace version')
})
```

- [ ] **Step 2: Run the failing storage tests**

Run: `npm test -- --run src/features/workspace/workspaceStorage.test.ts`

Expected: FAIL because the storage adapter is missing.

- [ ] **Step 3: Implement the versioned storage adapter and hook**

Use the key `neutral-yb-atlas.workspace.v1`. Store language, mode, notes, article overrides, parameter snapshots and completed experiment phases. Fall back to memory when localStorage throws.

- [ ] **Step 4: Verify storage behavior**

Run: `npm test -- --run src/features/workspace/workspaceStorage.test.ts`

Expected: PASS.

### Task 4: Design system and app shell

**Files:**
- Create: `src/App.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/components/AppHeader.tsx`
- Create: `src/components/ModeSwitch.tsx`
- Create: `src/components/LanguageSwitch.tsx`
- Create: `src/components/SectionRail.tsx`
- Create: `src/components/AppHeader.test.tsx`

- [ ] **Step 1: Test language, mode and edit controls**

```tsx
render(<AppHeader language="zh" mode="guided" editing={false} onLanguageChange={onLanguageChange} onModeChange={onModeChange} onEditingChange={onEditingChange} />)
await user.click(screen.getByRole('button', { name: 'English' }))
expect(onLanguageChange).toHaveBeenCalledWith('en')
```

- [ ] **Step 2: Verify the header tests fail**

Run: `npm test -- --run src/components/AppHeader.test.tsx`

Expected: FAIL because the components are missing.

- [ ] **Step 3: Implement the design system and shell**

Use the accepted cold-white, graphite, deep-green, vermilion, violet, blue and yellow tokens. Keep radii at 4 px, use open bands and rails rather than nested cards, and define explicit typography for all controls.

- [ ] **Step 4: Verify controls and shell**

Run: `npm test -- --run src/components/AppHeader.test.tsx`

Expected: PASS.

### Task 5: Visual assets and immersive first viewport

**Files:**
- Create: `assets/yb-energy-levels-reference.png`
- Create when API key is available: `assets/hero-yb-optical-tweezer.png`
- Create when API key is available: `assets/experimental-platform.png`
- Create: `src/features/hero/Hero.tsx`
- Create: `src/features/atomic-map/AtomicMap.tsx`
- Create: `src/features/atomic-map/AtomicMap.test.tsx`
- Create: `src/features/hero/hero.css`

- [ ] **Step 1: Copy the user-provided reference image into project assets**

Source: `C:/universe/MyStudy/atom/Concept/Yb原子计算原理图-能级与光参数.png`

Destination: `assets/yb-energy-levels-reference.png`

- [ ] **Step 2: Generate image2 project assets when `OPENAI_API_KEY` is present**

Run the bundled CLI with `gpt-image-2`, `--quality high`, `--size 2048x1152`, and exact project prompts. Do not include text, logos or watermarks in generated images.

- [ ] **Step 3: Test physical parameter rendering**

```tsx
render(<AtomicMap language="en" omegaMHz={3} interactionMHz={45} />)
expect(screen.getByText('15.0')).toBeInTheDocument()
expect(screen.getByText('302 nm')).toBeInTheDocument()
```

- [ ] **Step 4: Implement the first viewport and atomic map**

Use a full-bleed image-led right side, code-native title and controls, the supplied energy diagram as a detailed downstream asset, and an SVG overlay only for responsive labels and interaction.

- [ ] **Step 5: Verify atomic-map tests**

Run: `npm test -- --run src/features/atomic-map/AtomicMap.test.tsx`

Expected: PASS.

### Task 6: Knowledge map and editable article system

**Files:**
- Create: `src/features/knowledge-map/KnowledgeMap.tsx`
- Create: `src/features/article/ArticleSection.tsx`
- Create: `src/features/article/Equation.tsx`
- Create: `src/features/article/CitationList.tsx`
- Create: `src/features/article/EditableBlock.tsx`
- Create: `src/features/article/ArticleSection.test.tsx`
- Create: `src/features/article/article.css`

- [ ] **Step 1: Test bilingual rendering, formula output and editing**

Render an article section in Chinese, switch to English, enable editing, update a block, and assert the workspace callback receives the stable block ID.

- [ ] **Step 2: Confirm the article test fails**

Run: `npm test -- --run src/features/article/ArticleSection.test.tsx`

Expected: FAIL because the article components are missing.

- [ ] **Step 3: Implement the knowledge map and article renderer**

Render KaTeX formulas from trusted project content. Use `contentEditable` only for explicit edit mode, sanitize imported overrides as plain text, and keep citations as code-native links.

- [ ] **Step 4: Verify article behavior**

Run: `npm test -- --run src/features/article/ArticleSection.test.tsx`

Expected: PASS.

### Task 7: Theory workbench

**Files:**
- Create: `src/features/theory/model.ts`
- Create: `src/features/theory/model.test.ts`
- Create: `src/features/theory/TheoryWorkbench.tsx`
- Create: `src/features/theory/PopulationChart.tsx`
- Create: `src/features/theory/ErrorBudget.tsx`
- Create: `src/features/theory/theory.css`

- [ ] **Step 1: Test blockade ratio, effective population and parameter bounds**

```ts
expect(blockadeRatio({ interactionMHz: 45, omegaMHz: 3 })).toBe(15)
expect(() => blockadeRatio({ interactionMHz: 45, omegaMHz: 0 })).toThrow('omegaMHz must be positive')
```

- [ ] **Step 2: Run the failing model test**

Run: `npm test -- --run src/features/theory/model.test.ts`

Expected: FAIL because model functions are missing.

- [ ] **Step 3: Implement deterministic teaching models**

Implement Rabi populations, a blockade suppression estimate, decay/Doppler teaching estimates and error-budget normalization. Label every output `teaching_model` and avoid paper-level claims.

- [ ] **Step 4: Build the interactive workbench**

Add sliders and numeric inputs with stable ranges and units. Update the chart, ratio and error bars immediately. Provide reset and snapshot commands with Lucide icons and tooltips.

- [ ] **Step 5: Verify the model and workbench**

Run: `npm test -- --run src/features/theory/model.test.ts`

Expected: PASS.

### Task 8: Experiment workbench, comparison and evidence browser

**Files:**
- Create: `src/features/experiment/ExperimentWorkbench.tsx`
- Create: `src/features/experiment/InstrumentTable.tsx`
- Create: `src/features/experiment/FailureTree.tsx`
- Create: `src/features/comparison/SpeciesComparison.tsx`
- Create: `src/features/evidence/EvidenceBrowser.tsx`
- Create: `src/features/experiment/ExperimentWorkbench.test.tsx`
- Create: `src/features/experiment/experiment.css`

- [ ] **Step 1: Test experiment phase completion and evidence filtering**

Render phase 1, mark it complete, and assert the workspace receives `vacuum-source`. Filter evidence by `confirmed` and assert candidate rows disappear.

- [ ] **Step 2: Verify the feature test fails**

Run: `npm test -- --run src/features/experiment/ExperimentWorkbench.test.tsx`

Expected: FAIL because experiment components are missing.

- [ ] **Step 3: Implement experiment and comparison surfaces**

Use an open horizontal timeline on desktop, stacked dependency rows on mobile, a dense instrument table, and a normalized Rb/Cs/Sr/Yb comparison. Include selection criteria rather than volatile pricing.

- [ ] **Step 4: Implement evidence filtering**

Filter by status, domain and query. Visually separate confirmed, derived, candidate and missing data without relying on color alone.

- [ ] **Step 5: Verify experiment behavior**

Run: `npm test -- --run src/features/experiment/ExperimentWorkbench.test.tsx`

Expected: PASS.

### Task 9: Notes, export/import and responsive completion

**Files:**
- Create: `src/features/workspace/WorkspaceDrawer.tsx`
- Create: `src/features/workspace/ExportImportControls.tsx`
- Create: `src/features/workspace/workspace.css`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`
- Create: `src/App.integration.test.tsx`

- [ ] **Step 1: Test the complete local workflow**

Switch language, edit a paragraph, save a parameter snapshot, export JSON, import it into a fresh workspace, and verify the state is restored.

- [ ] **Step 2: Run the failing integration test**

Run: `npm test -- --run src/App.integration.test.tsx`

Expected: FAIL until the drawer and import/export controls exist.

- [ ] **Step 3: Implement workspace UI and responsive states**

Use a right drawer on desktop and full-screen sheet on mobile. Preserve scroll position during language changes. Add stable mobile dimensions for header, controls, charts and tables.

- [ ] **Step 4: Verify the workflow**

Run: `npm test -- --run src/App.integration.test.tsx`

Expected: PASS.

### Task 10: GitHub Pages, documentation and final QA

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`
- Create: `docs/content-sources.md`
- Create: `docs/fidelity-ledger.md`
- Modify: `vite.config.ts`

- [ ] **Step 1: Configure base-path-safe assets and deployment**

Use relative asset imports and a configurable Vite `base`. The workflow runs install, tests, lint and build, then deploys `dist/` with GitHub Pages official actions.

- [ ] **Step 2: Run automated verification**

Run: `npm test -- --run`

Expected: all tests pass.

Run: `npm run lint`

Expected: no lint errors.

Run: `npm run build`

Expected: production build succeeds.

- [ ] **Step 3: Run browser verification when local browser access is permitted**

Check desktop 1440×900, tablet 1024×768 and mobile 390×844. Exercise language switching, edit mode, parameter updates, notes, export/import, evidence filtering and experiment completion.

- [ ] **Step 4: Complete the fidelity ledger**

Compare the accepted visual concept and current implementation at the same viewport. Record at least five checks: first viewport balance, typography, palette, generated asset treatment, workbench density, responsive behavior and motion.

- [ ] **Step 5: Remove temporary QA artifacts and hand off**

Keep project assets and documentation; remove unused generated variants and transient screenshots.

