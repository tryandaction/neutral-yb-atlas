# Causal Learning Content Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Neutral Yb Atlas as a continuous causal learning path from verifiable computation through DiVincenzo requirements, neutral atoms, $^{171}\mathrm{Yb}$, gate physics, experimental cycles and fault-tolerant cost.

**Architecture:** Split the large chapter data file into domain-owned bilingual modules that implement one strict `LearningSection` contract. Keep rendering generic and physics-free. Refactor the two-atom workbench into a pure teaching-observable model whose controls update named observables without synthesizing a fidelity or research verdict.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Vitest, Testing Library, KaTeX, Recharts, CSS.

---

## File Structure

- Create `site/src/content/learning/foundations.ts`: computation, quantum structure, DiVincenzo and universality/QEC.
- Create `site/src/content/learning/neutralAtoms.ts`: fixed-task platform comparison.
- Create `site/src/content/learning/ytterbium.ts`: species comparison and erasure-conversion chain.
- Create `site/src/content/learning/gates.ts`: levels, Hamiltonians, controlled phase and measurement evidence.
- Create `site/src/content/learning/experiment.ts`: one complete atom-cycle narrative.
- Create `site/src/content/learning/faultTolerance.ts`: channel hierarchy, logical scaling and cost.
- Modify `site/src/content/chapters.ts`: aggregate the six domain modules and retain stable chapter IDs.
- Modify `site/src/types/content.ts`: replace free-form article fields with the causal learning contract.
- Modify `site/src/features/article/ArticleSection.tsx`: render the contract in fixed pedagogical order.
- Modify `site/src/features/article/article.css`: responsive layout for reasoning, equations and evidence.
- Modify `site/src/content/evidence.ts`: add exact primary sources and claim boundaries.
- Modify `site/src/features/domain/domainDefinitions.ts`: align domain theses, outlines and side context.
- Modify `site/src/features/overview/OverviewPage.tsx`: summarize the causal route without duplicating prose.
- Modify `site/src/features/theory/model.ts`: remove synthetic quality and research-decision outputs.
- Modify `site/src/features/theory/TheoryWorkbench.tsx`: show only named physical observables and assumptions.
- Modify `site/src/features/theory/ErrorBudget.tsx`: label each term as a teaching approximation.
- Modify `site/src/features/teaching-visuals/ExperimentPipeline.tsx`: replace research workflow language with atom-state learning steps.
- Modify `site/src/features/fault-tolerance/ResourceEstimator.tsx`: distinguish model assumptions from device predictions.
- Modify associated tests next to each module.

### Task 1: Enforce the Causal Learning Contract

**Files:**
- Modify: `site/src/types/content.ts`
- Modify: `site/src/features/article/ArticleSection.tsx`
- Modify: `site/src/features/article/article.css`
- Test: `site/src/features/article/ArticleSection.test.tsx`

- [ ] **Step 1: Write the failing renderer test**

Add a section fixture containing `question`, `answer`, three `reasoning` steps, an equation object, `measurement`, `boundary`, `sources` and `nextQuestion`. Assert their headings and ordered rendering:

```tsx
expect(screen.getByText('Why is a physical output required?')).toBeInTheDocument()
expect(screen.getByText('A computation must end in an independently testable record.')).toBeInTheDocument()
expect(screen.getAllByRole('listitem')).toHaveLength(3)
expect(screen.getByText('What quantum structure changes this map?')).toBeInTheDocument()
expect(screen.getByRole('link', { name: /DiVincenzo/ })).toHaveAttribute('href', expect.stringContaining('quant-ph/0002077'))
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx.cmd vitest run src/features/article/ArticleSection.test.tsx --maxWorkers=1`

Expected: FAIL because `ArticleSection` does not accept or render the causal fields.

- [ ] **Step 3: Introduce exact content types**

```ts
export interface LearningEquation {
  expression: string
  role: LocalizedText
  symbols: LocalizedText[]
  assumptions: LocalizedText[]
}

export interface LearningSource {
  id: string
  citation: string
  url: string
}

export interface ArticleSection {
  id: string
  title: LocalizedText
  question: LocalizedText
  answer: LocalizedText
  reasoning: LocalizedText[]
  equation?: LearningEquation
  measurement: LocalizedText
  boundary: LocalizedText
  sources: LearningSource[]
  nextQuestion: LocalizedText
}
```

- [ ] **Step 4: Render the fixed sequence**

`ArticleSection` renders the localized question, direct answer, numbered reasoning list, optional KaTeX equation with role/symbols/assumptions, measurement, boundary, source links and next question. `WikiText` remains available inside prose; no research ledger or editable class is rendered.

- [ ] **Step 5: Add responsive CSS and verify GREEN**

Use one reading column, a two-column equation explanation above 760 px and one column below it. Run the renderer test and expect PASS.

- [ ] **Step 6: Commit**

```powershell
git add "site/src/types/content.ts" "site/src/features/article/ArticleSection.tsx" "site/src/features/article/article.css" "site/src/features/article/ArticleSection.test.tsx"
git commit -m "refactor: enforce causal learning sections"
```

### Task 2: Rebuild Computation Foundations

**Files:**
- Create: `site/src/content/learning/foundations.ts`
- Modify: `site/src/content/chapters.ts`
- Modify: `site/src/content/content.test.ts`

- [ ] **Step 1: Write failing content tests**

Assert four sections in this exact order:

```ts
expect(foundations.sections.map((section) => section.id)).toEqual([
  'what-is-computation',
  'what-quantum-changes',
  'divincenzo-requirements',
  'universal-corrected-fault-tolerant',
])
expect(foundations.sections[0].equation?.expression).toContain('y=f(x)')
expect(foundations.sections[1].equation?.expression).toContain('operatorname{Tr}')
expect(foundations.sections[2].reasoning).toHaveLength(5)
expect(foundations.sections[3].answer.zh).toMatch(/通用.*不等于.*容错/)
expect(JSON.stringify(foundations)).not.toContain('U_{AB}')
```

- [ ] **Step 2: Verify RED**

Run: `npx.cmd vitest run src/content/content.test.ts --maxWorkers=1`.

Expected: FAIL on IDs and the old isolated propagator formula.

- [ ] **Step 3: Implement the four-section causal chapter**

Create complete bilingual objects with these direct answers:

```ts
const answers = {
  computation: {
    zh: '计算是一套可重复执行并可独立验证的输入—输出关系；物理机器负责表示输入、执行允许变换并留下可判定记录。',
    en: 'A computation is a repeatable, independently verifiable input-output relation; a physical machine represents the input, performs allowed transformations and leaves a decidable record.',
  },
  quantum: {
    zh: '量子计算用密度算符、张量积状态空间和量子通道组织信息，最后仍须通过测量得到经典结果分布。',
    en: 'Quantum computation organizes information with density operators, tensor-product state spaces and quantum channels, but still ends in a classical outcome distribution obtained by measurement.',
  },
  divincenzo: {
    zh: '五项准则分别保证信息有稳定载体、输入可知、相干能存活、控制具有通用性且输出可读；缺少任一接口都不能形成完整处理器。',
    en: 'The five requirements provide a stable carrier, known input, surviving coherence, universal control and readable output; without any one interface there is no complete processor.',
  },
  faultTolerance: {
    zh: '通用门集只保证目标电路可编译；纠错需要冗余与综合征，容错还必须限制纠错电路自身故障的传播。',
    en: 'A universal gate set only makes target circuits compilable; QEC adds redundancy and syndromes, while fault tolerance also limits propagation of faults inside the correction circuit.',
  },
}
```

Each DiVincenzo reasoning item states requirement, failure mode, neutral-atom realization and measurable evidence. The Born rule appears only in `what-quantum-changes`.

- [ ] **Step 4: Aggregate through `chapters.ts` and verify GREEN**

`chapters.ts` imports and exports the new domain chapter without duplicating its content. Run content tests and expect PASS.

- [ ] **Step 5: Commit**

```powershell
git add "site/src/content/learning/foundations.ts" "site/src/content/chapters.ts" "site/src/content/content.test.ts"
git commit -m "feat: rebuild computation foundations"
```

### Task 3: Rebuild Neutral-Atom and Ytterbium Selection Logic

**Files:**
- Create: `site/src/content/learning/neutralAtoms.ts`
- Create: `site/src/content/learning/ytterbium.ts`
- Modify: `site/src/features/comparison/SpeciesComparison.tsx`
- Modify: `site/src/features/comparison/comparison.css`
- Modify: `site/src/content/evidence.ts`
- Test: `site/src/features/comparison/SpeciesComparison.test.tsx`
- Test: `site/src/content/content.test.ts`

- [ ] **Step 1: Write failing comparison tests**

```ts
expect(neutralAtoms.sections.map((section) => section.id)).toEqual([
  'fix-the-computational-task',
  'neutral-atom-exchange',
  'platform-decision',
])
expect(ytterbium.sections.map((section) => section.id)).toEqual([
  'compare-the-functional-chain',
  'why-171yb',
  'erasure-information-chain',
])
expect(screen.getByRole('table')).toHaveAccessibleName(/fixed task/i)
expect(screen.getByText(/not a universal platform ranking/i)).toBeInTheDocument()
```

- [ ] **Step 2: Verify RED**

Run content and comparison tests. Expected: FAIL because the comparison remains trait-led and lacks the new IDs and accessible decision frame.

- [ ] **Step 3: Implement fixed-task platform reasoning**

The neutral-atom module fixes logical qubits, circuit depth, target failure, deadline, code and loss convention before comparing storage, connectivity, parallelism, cycle time, records and maintenance. Its conclusion explicitly states that neutral atoms exchange optical loading/motion/control complexity for identical carriers, reconfigurable geometry and switched Rydberg coupling.

- [ ] **Step 4: Implement the Yb functional chain**

Compare Rb, Cs, Sr and $^{171}\mathrm{Yb}$ under the same rows: loading/cooling, storage encoding, one-qubit control, entangling route, readout/reset and fault flag. The erasure section uses this exact causal record:

```ts
const erasureChain = [
  'Rydberg gate fault',
  'decay inside or outside the computational subspace',
  'manifold-selective detection',
  'true flag / missed flag / false flag / back-action',
  'located circuit record',
  'decoder update',
  'logical error rate',
]
```

- [ ] **Step 5: Add primary evidence**

Add stable evidence IDs for DiVincenzo 2000, Wu et al. 2022, Ma et al. 2023, Bluvstein et al. Nature 626 (2024), the 2025 universal fault-tolerant neutral-atom architecture and the 2026 metastable-Yb logical-qubit experiment. Label theory, physical-gate experiment and logical-code experiment separately.

- [ ] **Step 6: Verify and commit**

Run content and comparison tests, then commit the two content modules, evidence and comparison UI.

### Task 4: Replace the Gate Workbench with Named Physical Observables

**Files:**
- Create: `site/src/content/learning/gates.ts`
- Modify: `site/src/features/theory/model.ts`
- Modify: `site/src/features/theory/model.test.ts`
- Modify: `site/src/features/theory/TheoryWorkbench.tsx`
- Modify: `site/src/features/theory/ErrorBudget.tsx`
- Modify: `site/src/features/theory/theory.css`
- Modify: `site/src/features/theory/TheoryWorkbench.test.tsx`

- [ ] **Step 1: Write failing model tests**

```ts
expect(buildTeachingObservables(defaults)).toEqual(expect.objectContaining({
  maxDoubleExcitation: expect.any(Number),
  conditionalPhaseRad: expect.any(Number),
  phaseErrorRad: expect.any(Number),
  rydbergExposureUs: expect.any(Number),
  decayProbability: expect.any(Number),
  dopplerRmsKhz: expect.any(Number),
}))
expect(buildTeachingObservables(defaults)).not.toHaveProperty('teachingQuality')
expect(buildTeachingObservables({ ...defaults, interactionMHz: 90 }).maxDoubleExcitation)
  .toBeLessThan(buildTeachingObservables(defaults).maxDoubleExcitation)
expect(buildTeachingObservables({ ...defaults, rydbergLifetimeUs: 60 }).decayProbability)
  .toBeGreaterThan(buildTeachingObservables(defaults).decayProbability)
```

- [ ] **Step 2: Verify RED**

Run model tests. Expected: FAIL on renamed observables and removed `teachingQuality`.

- [ ] **Step 3: Implement observable-only model**

Return bounded probabilities and explicit units. Compute blockade leakage from the declared finite-blockade approximation, Doppler RMS from $k_BT/m$, Rydberg exposure from the trajectory integral and decay probability from `1 - exp(-exposure/lifetime)`. Conditional phase is the integrated interaction-dependent phase in the declared effective model; label it a teaching approximation.

- [ ] **Step 4: Rewrite the UI**

Remove `Qteach`, `usable/marginal/outside`, dominant-error verdict, next-measurement advice, “workbench” and “theory delivery contract”. Render parameter controls beside a population/phase plot and six named outputs. Each output includes definition, unit and model boundary.

- [ ] **Step 5: Verify interaction behavior**

Testing Library changes each slider and asserts a visible named output changes. Assert no text matches `Qteach|工作区|下一项测量|放行条件|delivery contract`.

- [ ] **Step 6: Commit**

Commit the gate content module, pure model, UI, CSS and tests.

### Task 5: Rewrite Experiment and Fault-Tolerance Learning Domains

**Files:**
- Create: `site/src/content/learning/experiment.ts`
- Create: `site/src/content/learning/faultTolerance.ts`
- Modify: `site/src/features/teaching-visuals/ExperimentPipeline.tsx`
- Modify: `site/src/features/fault-tolerance/ResourceEstimator.tsx`
- Modify: `site/src/features/fault-tolerance/ResourceEstimator.test.tsx`
- Modify: `site/src/content/content.test.ts`

- [ ] **Step 1: Write failing terminology and hierarchy tests**

```ts
const visibleCopy = JSON.stringify({ experiment, faultTolerance })
expect(visibleCopy).not.toMatch(/研究工作站|理论交付|放行合同|下一项研究任务/)
expect(faultTolerance.sections.map((section) => section.id)).toEqual([
  'physical-faults-to-cycle-channel',
  'decoder-record-to-logical-error',
  'distance-scaling',
  'trustworthy-result-cost',
])
```

- [ ] **Step 2: Verify RED**

Run targeted content and resource-estimator tests. Expected: FAIL on legacy terminology and section IDs.

- [ ] **Step 3: Implement the atom-cycle narrative**

Order the experiment path as source/vacuum, slowing/cooling, tweezer loading, imaging/rearrangement, state preparation, one/two-qubit gates, mid-circuit detection, decoding/reset/replacement. Each step states atomic state change, apparatus control, observable signal and downstream failure effect.

- [ ] **Step 4: Implement the fault hierarchy**

Use `physical mechanism -> gate-level conditional channel -> correlated cycle channel -> syndrome/erasure record -> decoder -> logical error -> scaling -> cost`. Resource-estimator copy must state independent-noise assumptions and omitted routing, factories, correlations, leakage treatment and maintenance.

- [ ] **Step 5: Verify and commit**

Run targeted tests and commit both content modules plus teaching components.

### Task 6: Integrate Domains and Overview without Duplication

**Files:**
- Modify: `site/src/content/chapters.ts`
- Modify: `site/src/features/routing/RouteContent.tsx`
- Modify: `site/src/features/domain/domainDefinitions.ts`
- Modify: `site/src/features/overview/OverviewPage.tsx`
- Modify: `site/src/features/routing/RouteContent.test.tsx`
- Modify: `site/src/features/overview/OverviewPage.test.tsx`

- [ ] **Step 1: Write failing integration tests**

Assert the single page renders domain headings in causal order, navigation anchors remain stable and overview cards contain only one direct answer plus one next question. Assert research-workflow components are absent from the routed learning path.

- [ ] **Step 2: Verify RED**

Run routing and overview tests. Expected: FAIL until the new modules and outlines are wired.

- [ ] **Step 3: Integrate the six modules**

Aggregate domain chapters in `chapters.ts`, update route composition and align outline IDs. Keep `AtomicRearrangementHero`, `YbEnergyTutor`, `AtomicMap`, `ExperimentVisualAtlas`, Wiki and evidence browsing. Route the rewritten comparison, gate model, atom cycle and resource estimator exactly once.

- [ ] **Step 4: Update overview summaries**

Use this high-level path only: computation -> physical processor -> neutral atoms -> Yb information-bearing faults -> gates and measurements -> cycle and logical cost. Do not repeat equations or section paragraphs.

- [ ] **Step 5: Verify and commit**

Run route, overview and app integration tests; commit integration changes.

### Task 7: Full Verification and Production Deployment

**Files:**
- Modify only if verification reveals a defect in files already in scope.
- Temporary artifacts: `site/.playwright-cli/` must remain untracked and excluded from commits.

- [ ] **Step 1: Run automated verification**

Run:

```powershell
npx.cmd vitest run --maxWorkers=1
npm.cmd run lint
npm.cmd run build
npm.cmd run test:public
git diff --check
```

Expected: all tests pass, build and lint exit 0, public checks pass, and no whitespace errors.

- [ ] **Step 2: Run desktop and mobile browser QA**

Start Vite preview on an unused port. Check Chinese and English at 1440x1100, 1024x900, 768x1024 and 390x844. Verify no overlap, clipped equations, hidden source links, abnormal blank bands or control-induced layout shifts. Change every gate-model control and confirm named outputs visibly update. Confirm console has zero errors.

- [ ] **Step 3: Verify sources and public content**

Open each newly added primary-source link, verify the cited claim type and confirm no local paper/PDF enters the public manifest.

- [ ] **Step 4: Commit final QA fixes**

Stage only scoped source, tests and docs. Exclude `.playwright-cli`, logs and screenshots. Commit with `fix: complete causal learning content rebuild` only if QA required changes after the task commits.

- [ ] **Step 5: Push and deploy**

Push `main`, wait for Git integration, and verify `https://neutral-yb-atlas.pages.dev/` serves the new asset hash. If automatic Pages deployment does not update, run:

```powershell
npx.cmd wrangler whoami
npx.cmd wrangler pages deploy "dist" --project-name "neutral-yb-atlas"
```

- [ ] **Step 6: Verify production content**

Confirm the production bundle contains the new section IDs `what-is-computation`, `divincenzo-requirements`, `erasure-information-chain` and no visible `Qteach` or research-workstation terminology.
