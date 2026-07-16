# Public Contribution Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove dormant browser-side source editing and provide a reviewable GitHub Issue and Pull Request contribution path.

**Architecture:** Runtime state becomes a small local preference store for language and reading mode only. A shared footer links to a GitHub Issue template; GitHub owns identity, submission, discussion, and review. Content changes remain repository Pull Requests and production deployment remains a maintainer action.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, GitHub Issue Forms, Cloudflare Pages.

---

### Task 1: Add a source-controlled contribution endpoint

**Files:**
- Create: `.github/ISSUE_TEMPLATE/content-correction.yml`
- Create: `site/src/features/contribution/contribution.ts`
- Test: `site/src/features/contribution/contribution.test.ts`

- [ ] **Step 1: Write the failing URL test**

```ts
import { contributionIssueUrl } from './contribution'

it('points readers to the repository issue chooser', () => {
  expect(contributionIssueUrl).toBe('https://github.com/tryandaction/neutral-yb-atlas/issues/new/choose')
})
```

- [ ] **Step 2: Run the test to verify failure**

Run: `npx.cmd vitest run src/features/contribution/contribution.test.ts`

Expected: FAIL because `contribution.ts` does not exist.

- [ ] **Step 3: Add the URL module and Issue Form**

```ts
export const contributionIssueUrl = 'https://github.com/tryandaction/neutral-yb-atlas/issues/new/choose'
```

```yaml
name: Content correction
description: Report a correction or a source-backed learning improvement.
title: "[Correction]: "
labels: [content-correction]
body:
  - type: input
    id: location
    attributes: { label: Page or section, placeholder: "https://neutral-yb-atlas.pages.dev/#domain-yb-platform" }
    validations: { required: true }
  - type: textarea
    id: original
    attributes: { label: Current text or figure label }
    validations: { required: true }
  - type: textarea
    id: proposal
    attributes: { label: Proposed revision }
    validations: { required: true }
  - type: textarea
    id: source
    attributes: { label: DOI, arXiv, official database, or stable publisher URL }
    validations: { required: true }
```

- [ ] **Step 4: Run the test to verify success**

Run: `npx.cmd vitest run src/features/contribution/contribution.test.ts`

Expected: PASS.

### Task 2: Add the public contribution command

**Files:**
- Create: `site/src/features/contribution/ContributionFooter.tsx`
- Create: `site/src/features/contribution/contribution.css`
- Test: `site/src/features/contribution/ContributionFooter.test.tsx`
- Modify: `site/src/App.tsx`

- [ ] **Step 1: Write the failing footer test**

```tsx
render(<ContributionFooter language="zh" />)
expect(screen.getByRole('link', { name: '纠错与贡献' })).toHaveAttribute('href', contributionIssueUrl)
expect(screen.getByRole('link', { name: '纠错与贡献' })).toHaveAttribute('target', '_blank')
```

- [ ] **Step 2: Run the test to verify failure**

Run: `npx.cmd vitest run src/features/contribution/ContributionFooter.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the semantic footer**

```tsx
export default function ContributionFooter({ language }: { language: Language }) {
  const copy = language === 'zh'
    ? { heading: '帮助完善学习图谱', body: '发现错误、补充来源或改进解释，请提交可追溯的建议。', action: '纠错与贡献' }
    : { heading: 'Help improve the learning atlas', body: 'Report an error, add a source, or improve an explanation through a traceable suggestion.', action: 'Contribute' }
  return <footer className="contribution-footer"><div><h2>{copy.heading}</h2><p>{copy.body}</p></div><a href={contributionIssueUrl} target="_blank" rel="noreferrer">{copy.action}<ExternalLink aria-hidden="true" /></a></footer>
}
```

Mount `<ContributionFooter language={preferences.language} />` after `</main>` in `App.tsx`. Use a full-width footer band with responsive grid-to-stack styling; do not add a floating card or overlay.

- [ ] **Step 4: Run the test to verify success**

Run: `npx.cmd vitest run src/features/contribution/ContributionFooter.test.tsx`

Expected: PASS.

### Task 3: Replace the legacy workspace with local preferences only

**Files:**
- Create: `site/src/features/preferences/preferenceStorage.ts`
- Create: `site/src/features/preferences/usePreferences.ts`
- Create: `site/src/features/preferences/preferenceStorage.test.ts`
- Modify: `site/src/App.tsx`
- Modify: `site/src/features/routing/RouteContent.tsx`
- Modify: `site/src/features/article/ArticleChapter.tsx`
- Modify: `site/src/features/article/ArticleSection.tsx`
- Modify: `site/src/features/experiment-visual-atlas/ExperimentVisualAtlas.tsx`
- Modify: `site/src/features/theory/TheoryWorkbench.tsx`
- Delete: `site/src/features/workspace/`
- Delete: `site/src/features/article/EditableBlock.tsx`

- [ ] **Step 1: Write failing preference migration tests**

```ts
it('migrates language and reading mode but discards legacy article edits', () => {
  localStorage.setItem('neutral-yb-atlas.workspace.v1', JSON.stringify({ version: 1, language: 'en', mode: 'reference', editing: true, notes: { general: 'draft' }, articleOverrides: { state: 'changed' }, parameterSnapshots: [], completedExperimentPhases: [] }))
  expect(loadPreferences()).toEqual({ version: 1, language: 'en', mode: 'reference' })
  expect(localStorage.getItem('neutral-yb-atlas.workspace.v1')).toBeNull()
})
```

- [ ] **Step 2: Run the preference test to verify failure**

Run: `npx.cmd vitest run src/features/preferences/preferenceStorage.test.ts`

Expected: FAIL because the preferences module does not exist.

- [ ] **Step 3: Implement preference-only state and remove editing props**

```ts
export interface Preferences { version: 1; language: Language; mode: ReadingMode }
export const PREFERENCES_KEY = 'neutral-yb-atlas.preferences.v1'
export function createDefaultPreferences(): Preferences { return { version: 1, language: 'zh', mode: 'guided' } }
```

`App.tsx` imports `usePreferences`, passes only `language` and `mode` to route content, and removes all workspace callbacks. `ArticleSection` always renders `WikiText`; it has no `contentEditable`, override, reset, or editing props. `ExperimentVisualAtlas` removes notes and note callbacks. `TheoryWorkbench` removes snapshot persistence and its save command. Delete the workspace files and their tests after callers are removed.

- [ ] **Step 4: Run focused tests to verify success**

Run: `npx.cmd vitest run src/features/preferences/preferenceStorage.test.ts src/features/article/ArticleSection.test.tsx src/features/routing/RouteContent.test.tsx`

Expected: PASS with no `contenteditable` output or workspace references.

### Task 4: Document the contributor workflow and prevent regressions

**Files:**
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`
- Modify: `site/README.md`
- Modify: `site/src/App.integration.test.tsx`

- [ ] **Step 1: Add failing integration assertions**

```tsx
expect(screen.getByRole('link', { name: '纠错与贡献' })).toHaveAttribute('href', contributionIssueUrl)
expect(document.querySelector('[contenteditable="true"]')).toBeNull()
expect(screen.queryByLabelText(/工作区|workspace/i)).not.toBeInTheDocument()
```

- [ ] **Step 2: Run the integration test to verify failure**

Run: `npx.cmd vitest run src/App.integration.test.tsx`

Expected: FAIL until the footer and workspace removal are complete.

- [ ] **Step 3: Update public documentation**

State that browser sessions cannot edit published text, GitHub Issues collect proposals, Pull Requests carry reviewed source changes, and GitHub login is required only on GitHub. Document that direct browser-to-GitHub writes are intentionally unsupported.

- [ ] **Step 4: Run the integration test to verify success**

Run: `npx.cmd vitest run src/App.integration.test.tsx`

Expected: PASS.

### Task 5: Verify, clean, release

**Files:**
- Delete generated browser artifacts: `.playwright-cli/`, `.wrangler/`, `learning-atlas-mobile.png`

- [ ] **Step 1: Run validation**

Run:

```powershell
cd site
npm.cmd run lint
npm.cmd run build
npm.cmd run check:public
```

Expected: all commands pass.

- [ ] **Step 2: Browser verification**

At `1440x900` and `390x844`, verify that the footer contribution link is reachable, no `contenteditable` element exists, no workspace control exists, and `scrollWidth === clientWidth`.

- [ ] **Step 3: Commit and deploy**

```powershell
git add .github README.md CONTRIBUTING.md site docs/superpowers
git commit -m "feat: add reviewed contribution workflow"
git push origin main
npx.cmd wrangler pages deploy "site/dist" --project-name neutral-yb-atlas --branch main
```

Expected: Pages records a production deployment sourced from the new commit; verify `https://neutral-yb-atlas.pages.dev/`.
