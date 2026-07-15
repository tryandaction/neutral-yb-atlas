# Single-Page Atlas Design

## Goal

Keep the approved atomic rearrangement cover while restoring the atlas as one continuous reading surface. Scrolling must reveal every research domain, and navigation actions must move within the page instead of replacing the rendered page.

## Information Architecture

The page order is fixed:

1. Atomic rearrangement cover and causal overview
2. Computing foundations
3. Yb platform
4. Gates and theory
5. Experimental system
6. Fault tolerance and scale
7. Evidence library

`OverviewPage` continues to own the cover, causal atlas and domain summary bands. `App` renders that overview once, then renders the six existing domain routes in the order above. `RouteContent` and every existing research component remain the single source of truth for domain content.

## Navigation

- `routeHref(route)` returns a page anchor: `#top` for overview and `#domain-<slug>` for a research domain.
- The header, causal inspector and domain summary links all reuse `routeHref`, so every entry point gains the same behavior.
- Each domain is wrapped by a section with its stable anchor ID and sticky-header scroll margin.
- An IntersectionObserver reports the dominant visible domain to the header so its active state follows reading position.
- Legacy hashes such as `#/experiment` remain parseable and scroll to the corresponding single-page section on load.
- Reduced-motion preferences disable smooth scrolling through CSS.

## Loading And Performance

`OverviewPage` remains a separate lazy chunk. `RouteContent` remains one lazy chunk and is loaded once, then instantiated for each research domain. No data or runtime dependency is duplicated. Existing large media remains managed by Vite asset imports.

## Responsive Behavior

The current domain layouts remain intact inside their section wrappers. Sticky outlines and contextual panels stay scoped to each `DomainPage`. On mobile, the existing horizontal domain outline and contextual drawer behavior remains unchanged.

## Accessibility

- Navigation uses real anchor links and native browser focus/navigation semantics.
- Section IDs are unique and stable.
- The active header link uses `aria-current="page"` based on the visible section.
- Legacy deep links do not hide other content.
- All existing Wiki, workspace, article editing and interactive research tools remain available.

## Acceptance

- One document contains the overview and all six research domains.
- Scrolling down reaches every domain without a route-level page replacement.
- Header and summary links point to page anchors.
- Clicking a link scrolls to the requested domain.
- The active header destination follows the visible domain.
- `#/experiment` and other old deep links still land on the matching section.
- Chinese and English, Wiki, workspace, editing and all research interactions continue to pass their tests.
