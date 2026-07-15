# Neutral Yb Atlas Layout Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Subagents are intentionally not used because the workspace instructions reserve delegation for explicit user requests.

**Goal:** Replace the single stacked research page with a deep-linkable overview and six focused research destinations while preserving bilingual editing, Wiki, workspace, theory, experiment, and evidence functions.

**Architecture:** Use a small hash-route model so Cloudflare Pages remains static-host friendly without adding a router dependency. `App` owns the active route and workspace state; an overview page owns the causal atlas; a domain workbench composes existing research components by responsibility; a new fault-tolerance estimator exposes model assumptions. Existing content and specialist components are reused rather than duplicated.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS modules by feature, KaTeX through existing equation components.

**Git constraint:** Do not commit or push. The user has not requested Git operations for this implementation round.

---

### Task 1: Add a static-host-safe route model

**Files:**
- Create: `site/src/navigation/routes.ts`
- Create: `site/src/navigation/routes.test.ts`

- [ ] **Step 1: Write the failing route tests**

```ts
import { describe, expect, it } from 'vitest'
import { parseRoute, routeHref } from './routes'

describe('route model', () => {
  it('maps empty and unknown hashes to the overview', () => {
    expect(parseRoute('')).toBe('overview')
    expect(parseRoute('#/unknown')).toBe('overview')
  })

  it('maps deep links to research destinations', () => {
    expect(parseRoute('#/yb-platform')).toBe('yb-platform')
    expect(parseRoute('#/fault-tolerance')).toBe('fault-tolerance')
    expect(routeHref('experiment')).toBe('#/experiment')
  })
})
```

- [ ] **Step 2: Run the tests and verify failure**

Run: `npx vitest run src/navigation/routes.test.ts`

Expected: FAIL because `routes.ts` does not exist.

- [ ] **Step 3: Implement the route model**

Define:

```ts
export type RouteId =
  | 'overview'
  | 'foundations'
  | 'yb-platform'
  | 'gates-theory'
  | 'experiment'
  | 'fault-tolerance'
  | 'evidence'

export interface RouteDefinition {
  id: RouteId
  slug: string
  label: { zh: string; en: string }
  shortLabel: { zh: string; en: string }
}
```

Export `routes`, `parseRoute(hash)`, and `routeHref(id)`. Unknown hashes return `overview`.

- [ ] **Step 4: Run the focused test**

Run: `npx vitest run src/navigation/routes.test.ts`

Expected: PASS.

---

### Task 2: Convert the application shell and header to destination navigation

**Files:**
- Create: `site/src/navigation/useHashRoute.ts`
- Modify: `site/src/App.tsx`
- Modify: `site/src/components/AppHeader.tsx`
- Modify: `site/src/components/app-header.css`
- Modify: `site/src/components/AppHeader.test.tsx`
- Modify: `site/src/App.integration.test.tsx`

- [ ] **Step 1: Add failing tests for active navigation and hash changes**

The header test must render `AppHeader` with `route="yb-platform"` and assert that the Yb link has `aria-current="page"` and `href="#/yb-platform"`.

The integration test must set `window.location.hash = '#/experiment'`, dispatch `HashChangeEvent('hashchange')`, and assert that the experiment destination renders.

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `npx vitest run src/components/AppHeader.test.tsx src/App.integration.test.tsx`

Expected: FAIL because route props and route content do not exist.

- [ ] **Step 3: Implement hash-route state**

`useHashRoute` reads `window.location.hash`, subscribes to `hashchange`, returns a `RouteId`, and removes the listener on cleanup.

`AppContent` passes the active route to `AppHeader` and renders a route-content component instead of the current Hero plus `DeepResearchContent` stack. Wiki and workspace providers remain at application-shell level.

- [ ] **Step 4: Simplify the header**

Show brand, seven destination links, reading mode, language, Wiki, and workspace. Move edit and contribution actions out of the permanent header and into workspace controls. Use `aria-current="page"` for the active route.

At <=1180 px, keep destination links in a second horizontally scrollable row rather than hiding navigation. At <=760 px, hide the long brand name but preserve the current-page navigation row.

- [ ] **Step 5: Run the focused tests**

Run: `npx vitest run src/components/AppHeader.test.tsx src/App.integration.test.tsx`

Expected: PASS.

---

### Task 3: Build the overview causal atlas

**Files:**
- Create: `site/src/content/causalAtlas.ts`
- Create: `site/src/features/overview/CausalAtlas.tsx`
- Create: `site/src/features/overview/OverviewPage.tsx`
- Create: `site/src/features/overview/overview.css`
- Create: `site/src/features/overview/OverviewPage.test.tsx`

- [ ] **Step 1: Write failing interaction and content tests**

Test that the overview renders the Chinese H1, exposes seven causal nodes, initially explains computation, and updates the definition, expression, failure criterion, and destination link after selecting fault tolerance.

- [ ] **Step 2: Run the test and verify failure**

Run: `npx vitest run src/features/overview/OverviewPage.test.tsx`

Expected: FAIL because the overview feature does not exist.

- [ ] **Step 3: Define bilingual causal data**

Each causal node contains:

```ts
interface CausalNode {
  id: string
  label: LocalizedText
  definition: LocalizedText
  necessary: LocalizedText
  expression: LocalizedText
  failure: LocalizedText
  route: RouteId
}
```

Use the sequence problem, algorithm, logical resources, fault tolerance, physical machine, runtime, and cost. Keep the content specific and use no generic learning-goal copy.

- [ ] **Step 4: Implement the first viewport**

Render the H1 and thesis, one horizontal causal axis on desktop, a stable four-field inspector below it, and five full-width domain bands below the fold. The final band owns fault tolerance, scale, and cost. Do not place reference imagery in the first viewport.

- [ ] **Step 5: Implement responsive behavior**

At <=760 px, make the causal axis horizontally scrollable with stable node widths. Keep body copy >=18 px Chinese and do not scale type with viewport width.

- [ ] **Step 6: Run the overview test**

Run: `npx vitest run src/features/overview/OverviewPage.test.tsx`

Expected: PASS.

---

### Task 4: Compose focused domain workbenches

**Files:**
- Create: `site/src/features/domain/DomainPage.tsx`
- Create: `site/src/features/domain/domain.css`
- Create: `site/src/features/domain/domainDefinitions.tsx`
- Create: `site/src/features/domain/DomainPage.test.tsx`
- Create: `site/src/features/routing/RouteContent.tsx`
- Modify: `site/src/App.tsx`

- [ ] **Step 1: Write failing composition tests**

Tests must assert:

- Foundations contains chapters 0 and 1 but not Yb apparatus imagery.
- Yb platform contains chapter 2, `YbEnergyTutor`, `AtomicMap`, and species comparison.
- Gates and theory contains chapters 3 and 5, `RydbergGateTutor`, and `TheoryWorkbench`.
- Experiment contains chapter 4, pipeline, visual atlas, and dependency-aware workbench.
- Evidence contains atlas, ecosystem, and evidence browser.

- [ ] **Step 2: Run the test and verify failure**

Run: `npx vitest run src/features/domain/DomainPage.test.tsx`

Expected: FAIL because domain composition does not exist.

- [ ] **Step 3: Implement the research workbench frame**

`DomainPage` accepts a title, thesis, outline entries, main React content, and contextual inspector content. Desktop grid tracks are `220px minmax(0, 820px) minmax(300px, 360px)`. The main column is not wrapped in a decorative card.

- [ ] **Step 4: Compose destinations from existing components**

Use one `ArticleChapter` helper with the existing workspace editing props. Preserve existing notes, snapshots, and experiment-phase state. Remove `ResearchInterlude` from route composition. Do not duplicate chapter content.

- [ ] **Step 5: Implement responsive workbench behavior**

At <=1180 px, render the outline as a horizontal section index and hide the inspector behind an explicit context button. At <=760 px, use one column and full-width tool panels.

- [ ] **Step 6: Run domain and integration tests**

Run: `npx vitest run src/features/domain/DomainPage.test.tsx src/App.integration.test.tsx`

Expected: PASS.

---

### Task 5: Add fault-tolerance, scale, and cost reasoning

**Files:**
- Create: `site/src/features/fault-tolerance/model.ts`
- Create: `site/src/features/fault-tolerance/model.test.ts`
- Create: `site/src/features/fault-tolerance/ResourceEstimator.tsx`
- Create: `site/src/features/fault-tolerance/ResourceEstimator.test.tsx`
- Create: `site/src/features/fault-tolerance/fault-tolerance.css`
- Modify: `site/src/features/domain/domainDefinitions.tsx`

- [ ] **Step 1: Write failing model tests**

Test a model-labelled estimate using:

```ts
estimateResources({
  physicalError: 0.001,
  threshold: 0.01,
  logicalOperations: 1_000_000,
  failureBudget: 0.01,
})
```

Assert that target logical error is `1e-8`, code distance is an odd integer >=3, estimated physical qubits per logical qubit is positive, and invalid `physicalError >= threshold` returns a below-threshold warning rather than a false estimate.

- [ ] **Step 2: Run the model test and verify failure**

Run: `npx vitest run src/features/fault-tolerance/model.test.ts`

Expected: FAIL because the model does not exist.

- [ ] **Step 3: Implement the estimator model**

Use the explicitly labelled pedagogical scaling law:

`pL = A * (p / pth)^((d + 1) / 2)` with `A = 0.1`.

Select the smallest odd distance satisfying `logicalOperations * pL <= failureBudget`. Estimate physical qubits per logical qubit as `2 * d * d`. Return assumptions with every estimate.

- [ ] **Step 4: Write and implement the UI test**

The UI test changes physical error and logical operation inputs and asserts that code distance and the warning region update. The component must label the result as model-dependent and distinguish trapped atom count from executable logical spacetime volume.

- [ ] **Step 5: Add the fault-tolerance destination**

Compose chapter 6, a physical-to-logical error chain, `ResourceEstimator`, scale bottlenecks, and the cost-per-trustworthy-result expression.

- [ ] **Step 6: Run focused tests**

Run: `npx vitest run src/features/fault-tolerance/model.test.ts src/features/fault-tolerance/ResourceEstimator.test.tsx src/features/domain/DomainPage.test.tsx`

Expected: PASS.

---

### Task 6: Normalize typography and remove obsolete page-stack behavior

**Files:**
- Modify: `site/src/styles/tokens.css`
- Modify: `site/src/styles/global.css`
- Modify: `site/src/features/article/article.css`
- Modify: feature CSS files only where workbench embedding reveals overflow
- Modify or remove from active composition: `site/src/features/deep-content/DeepResearchContent.tsx`

- [ ] **Step 1: Add layout assertions where stable**

Extend component tests to assert semantic headings, navigation labels, context-panel controls, and accessible region names. Avoid testing pixel values in JSDOM.

- [ ] **Step 2: Apply typography rules**

Chinese body copy is 18-19 px at 1.75 line height; English is 17-18 px at approximately 1.7. Equations are >=20 px. Tool labels remain compact but >=12 px. Remove viewport-width font scaling.

- [ ] **Step 3: Remove active use of obsolete stack components**

`Hero`, `KnowledgeMap`, `FirstPrinciplesTree`, and `ResearchInterlude` are no longer mounted by `App`. Keep source files only when another test or reusable feature still depends on them; otherwise delete them and update tests.

- [ ] **Step 4: Run the complete automated suite**

Run:

```powershell
npm run lint
npx vitest run --pool=threads --maxWorkers=1
npm run test:public
npm run check:public
$env:VITE_BASE_PATH='/'; npm run build
```

Expected: all commands exit 0.

---

### Task 7: Browser and visual fidelity verification

**Files:**
- Create temporarily, then remove: browser QA screenshots outside tracked source directories.

- [ ] **Step 1: Start the production preview**

Run: `npm run preview -- --host 127.0.0.1 --port 4175`

- [ ] **Step 2: Verify core routes and interactions**

Use the system Chrome integration first. Verify overview causal selection, every destination link, language switch, reading depth, Wiki term opening, theory slider judgment, experiment phase dependencies, resource estimator updates, workspace opening, and back/forward hash navigation.

- [ ] **Step 3: Capture desktop, tablet, and mobile renders**

Capture 1440x1000, 1024x900, and 390x844. If system Chrome control is unavailable, use Playwright and record that fallback.

- [ ] **Step 4: Inspect screenshots with `view_image`**

Check first-viewport hierarchy, next-section visibility, type scale, container model, image framing, formulas, inspector density, mobile overflow, and control wrapping. Record at least five mismatches and fix every actionable one.

- [ ] **Step 5: Run final verification after visual fixes**

Repeat lint, full tests, build, public checks, and `git diff --check`. Confirm no temporary screenshots or generated build artifacts are tracked.
