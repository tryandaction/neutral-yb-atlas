# Single-Page Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the complete Neutral Yb atlas as one continuous page with anchor navigation, scroll-aware header state and legacy deep-link compatibility.

**Architecture:** Keep existing overview and domain components unchanged as content owners. Add route-to-section helpers and a focused active-section hook, then compose every `RouteContent` instance under the overview in `App`.

**Tech Stack:** React 19, TypeScript, native anchors, IntersectionObserver, Vitest, Testing Library, Vite.

---

### Task 1: Page Anchor Route Model

**Files:**
- Modify: `site/src/navigation/routes.ts`
- Modify: `site/src/navigation/routes.test.ts`

- [ ] **Step 1: Write failing route tests**

Assert that overview resolves to `#top`, domain routes resolve to `#domain-<slug>`, and both new anchors and legacy `#/slug` hashes parse to the same `RouteId`.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run src/navigation/routes.test.ts`

Expected: FAIL because `routeHref('experiment')` still returns `#/experiment` and new anchors are not parsed.

- [ ] **Step 3: Implement anchor helpers**

Export `contentRoutes`, `routeSectionId(routeId)` and update `routeHref` plus `parseRoute`. Keep `RouteId` and route labels unchanged.

- [ ] **Step 4: Verify GREEN**

Run: `npx vitest run src/navigation/routes.test.ts`

Expected: all route model tests PASS.

### Task 2: Scroll-Aware Active Section

**Files:**
- Create: `site/src/navigation/useActiveSection.ts`
- Create: `site/src/navigation/useActiveSection.test.ts`

- [ ] **Step 1: Write failing hook tests**

Render the hook at `#/experiment`, assert the initial route is `experiment`, then dispatch an observer entry for `domain-yb-platform` and assert the active route changes to `yb-platform`.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run src/navigation/useActiveSection.test.ts`

Expected: FAIL because the hook does not exist.

- [ ] **Step 3: Implement the hook**

Initialize from `parseRoute(window.location.hash)`, observe `#top` plus every domain section, choose the intersecting entry with the greatest ratio, and listen for hash changes. When the initial hash uses the legacy `#/slug` format, scroll the matching domain wrapper into view after mount.

- [ ] **Step 4: Verify GREEN**

Run: `npx vitest run src/navigation/useActiveSection.test.ts`

Expected: all hook tests PASS.

### Task 3: Continuous Application Composition

**Files:**
- Modify: `site/src/App.tsx`
- Modify: `site/src/App.integration.test.tsx`
- Modify: `site/src/styles/global.css`

- [ ] **Step 1: Update integration expectations**

At `#/experiment`, assert that both the overview heading and experiment heading exist, that the Yb platform heading also exists, and that the experiment header link points to `#domain-experiment`.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run src/App.integration.test.tsx -t "continuous"`

Expected: FAIL because the app currently renders only the selected route.

- [ ] **Step 3: Compose the page**

Always render `OverviewPage`, then map `contentRoutes` to stable section wrappers containing `RouteContent`. Replace `useHashRoute` with `useActiveSection` for header highlighting. Keep all workspace props and Suspense fallbacks intact.

- [ ] **Step 4: Add wrapper styling**

Give `.single-page-domain` `scroll-margin-top: var(--header-height)` and a stable containment boundary without introducing a decorative card.

- [ ] **Step 5: Verify GREEN**

Run: `npx vitest run src/App.integration.test.tsx src/App.test.tsx src/components/AppHeader.test.tsx`

Expected: all application integration tests PASS.

### Task 4: Navigation Integration

**Files:**
- Modify only if tests expose scoped defects: `site/src/components/AppHeader.tsx`, `site/src/features/overview/OverviewPage.tsx`, `site/src/features/overview/CausalAtlas.tsx`

- [ ] **Step 1: Run navigation-focused tests**

Run: `npx vitest run src/navigation/routes.test.ts src/navigation/useActiveSection.test.ts src/features/overview/OverviewPage.test.tsx src/components/AppHeader.test.tsx`

Expected: header and overview links use page anchors, and active state remains route-driven.

- [ ] **Step 2: Fix only observed integration gaps**

Because all navigation surfaces already call `routeHref`, avoid duplicating anchor logic in components.

### Task 5: Quality And Browser Verification

**Files:**
- Modify only if verification exposes a scoped defect.

- [ ] **Step 1: Run automated checks**

Run:

```powershell
npm run lint
npx vitest run --pool=threads --maxWorkers=1
npm run test:public
npm run check:public
$env:VITE_BASE_PATH='/'; npm run build
git diff --check
```

Expected: every command exits successfully.

- [ ] **Step 2: Run browser QA**

At 1440 by 1000 and 390 by 844, verify cover rendering, all five atom shapes, Chinese and English, header anchor scrolling, active section highlighting, continuous access to all research domains, legacy hash landing, console health and no overlap or horizontal clipping.

- [ ] **Step 3: Prepare deployment**

Report the exact changed files. Do not commit or push without explicit confirmation required by the repository instructions.
