# Domain Workbench Layout Design

## Goal

Remove the large unused gutters on wide domain pages without changing research content or navigation behavior.

## Layout Rules

- The domain workbench spans the available page width instead of stopping at a fixed 1510px maximum.
- The outline and context rails retain bounded, readable widths through `clamp()`.
- The center column consumes the remaining width and remains eligible to shrink with `minmax(0, 1fr)`.
- At 1180px and below, retain the existing single-column workbench, horizontal outline, and context drawer.
- At 760px and below, retain the existing single-column article treatment and padding.
- A closed context drawer must not expose its shadow or receive pointer interaction.

## Acceptance

- A 2048px desktop viewport has no large blank gutters outside the workbench.
- The domain page has no horizontal document overflow at desktop, laptop, or mobile viewports.
- A closed mobile context drawer is visually and interactively hidden.
- The existing outline navigation and context drawer remain reachable.
