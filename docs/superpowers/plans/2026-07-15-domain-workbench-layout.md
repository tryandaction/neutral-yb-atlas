# Domain Workbench Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the domain-page workbench use the available wide-screen canvas while retaining existing responsive navigation.

**Architecture:** The change is isolated to `DomainPage` layout CSS. A regression test asserts the desktop workbench no longer carries a fixed maximum width and uses fluid grid rails; rendered browser checks validate the visual result at three viewports.

**Tech Stack:** React 19, TypeScript, Vitest, CSS Grid, Vite.

---

### Task 1: Add a desktop layout regression test

**Files:**
- Create: `site/src/features/domain/domainLayout.test.mjs`
- Test: `site/src/features/domain/domainLayout.test.mjs`

- [ ] **Step 1: Write the failing test**

```ts
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/features/domain/domain.css', 'utf8')

describe('domain workbench desktop layout', () => {
  it('uses a fluid workbench with bounded side rails', () => {
    expect(css).toMatch(/\.domain-workbench\s*\{[\s\S]*width:\s*100%/)
    expect(css).toMatch(/grid-template-columns:\s*clamp\(/)
    expect(css).not.toMatch(/\.domain-workbench\s*\{[\s\S]*width:\s*min\(100%,\s*1510px\)/)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm.cmd test -- domainLayout.test.mjs --run`
Expected: FAIL because `.domain-workbench` still uses `width: min(100%, 1510px)`.

### Task 2: Make the desktop grid fluid

**Files:**
- Modify: `site/src/features/domain/domain.css:31-39`
- Test: `site/src/features/domain/domainLayout.test.mjs`

- [ ] **Step 1: Replace the fixed desktop tracks**

```css
.domain-workbench {
  width: 100%;
  display: grid;
  grid-template-columns: clamp(200px, 13vw, 260px) minmax(0, 1fr) clamp(300px, 18vw, 380px);
}
```

- [ ] **Step 2: Run the regression test**

Run: `npm.cmd test -- domainLayout.test.mjs --run`
Expected: PASS with one test passing.

### Task 3: Verify rendered layout and production output

**Files:**
- Verify: `site/src/features/domain/domain.css`

- [ ] **Step 1: Run static checks**

Run: `npm.cmd test -- --run && npm.cmd run lint && npm.cmd run build`
Expected: all tests pass, lint exits 0, and Vite build exits 0.

- [ ] **Step 2: Capture desktop and mobile browser screenshots**

Run a local Vite server and inspect `/#domain-foundations` at 2048px, 1440px, and 390px widths.
Expected: no horizontal overflow, overlap, blank side gutters, or framework errors.

- [ ] **Step 3: Commit and deploy after explicit approval**

Run: `git add site/src/features/domain/domain.css site/src/features/domain/domainLayout.test.mjs docs/superpowers/specs/2026-07-15-domain-workbench-layout-design.md docs/superpowers/plans/2026-07-15-domain-workbench-layout.md && git commit -m "fix: make domain layouts fluid on wide screens" && git push origin main && npx.cmd wrangler pages deploy site/dist --project-name neutral-yb-atlas --branch main`
Expected: GitHub main and the Cloudflare Pages primary URL serve the verified build.
