# Atomic Rearrangement Cover Design

## Goal

Replace the overview page's static opening with a bilingual, full-bleed dynamic cover that makes neutral-atom computation immediately visible: a finite set of trapped atoms is rearranged through random loading, a circle, a square array, paired neighboring columns, and a cat silhouette before the reader enters the first-principles learning path.

## Approved Visual Direction

- Preserve the dark green-black "atomic lattice dive" direction approved in the browser concept.
- Remove the scanning line entirely.
- Use a real-time Canvas scene rather than a decorative background image.
- Keep all headings, navigation, labels, and controls as HTML so Chinese and English remain selectable and accessible.
- Integrate the existing site header with the cover by applying a dark overview-page variant instead of rendering a second navigation bar inside the hero.
- Keep the first viewport dense: the copy occupies roughly 38% of the width, the active atom field roughly 52%, and the next chapter band remains visible at the bottom.

## Content And Typography

Chinese:

- H1: `中性 Yb 原子计算`, arranged as two compact lines.
- Supporting sentence: `从可控物理状态出发，沿着量子门、实验系统与容错架构，抵达一次可信计算。`
- Journey entry: `从什么是计算开始`.

English:

- H1: `Neutral Yb Atomic Computing`, constrained to two or three balanced lines rather than one long line.
- Supporting sentence: `Begin with controllable physical states, then follow gates, experimental systems and fault tolerance toward one trustworthy computation.`
- Journey entry: `Begin with what computation is`.

Display type remains serif; UI chrome, controls, and explanatory text remain sans serif. No eyebrow, learning objective, decorative badge, or repeated explanatory copy is added.

## Rearrangement Choreography

The scene contains exactly 81 atoms. It cycles through:

1. `random`: 81 occupied sites sampled deterministically from an 11 by 11 loading lattice.
2. `circle`: three concentric rings containing 40, 28, and 13 atoms.
3. `grid`: a 9 by 9 square array.
4. `pairs`: the same 9 by 9 array with neighboring column pairs shifted closer, representing a temporary interaction schedule.
5. `cat`: a sampled cat-head outline with two eyes, nose, mouth, and whiskers.

Every shape change uses a deterministic minimum-distance assignment from current atoms to target sites. Position follows a quintic smootherstep curve with zero initial and final velocity. Duration scales with the longest assigned path and is bounded so transitions remain legible. Target trap sites remain faintly visible. Moving atoms gain only a short velocity-aligned trail and a slightly broader tweezer halo; there are no long light streaks, bouncing, elastic overshoot, or free-space drifting.

During `pairs`, alternating columns use a restrained warm core to distinguish the temporarily coupled columns. This is an interaction cue, not a claim that the atom species changes.

## Controls And Motion

- The sequence advances automatically after each transition and a short observation hold.
- Five icon buttons allow direct selection of random, circle, grid, paired columns, and cat.
- Manual selection pauses automatic advance long enough to inspect the chosen arrangement.
- Pointer movement may produce subtle scene parallax, but it must not alter atom trajectories.
- Scrolling down slightly reduces the cover's visual intensity and reveals the first-principles causal atlas without a hard scene change.
- `prefers-reduced-motion: reduce` disables automatic cycling and renders the square grid; manual controls update arrangements without animated movement.

## Responsive Layout

Desktop places copy on the left and the atom field on the right. Tablet narrows the copy and keeps controls inside the safe lower-right area. Mobile places copy in the upper portion and the atom field below it, with controls centered above the journey band. The title, supporting sentence, active shape label, controls, and atoms must remain inside the viewport with no horizontal clipping.

The cover height is calculated so the journey entry band is visible in the first viewport after the sticky header. The cover must not create a large empty region between the copy and the atoms.

## Accessibility

- Canvas has a localized accessible description.
- Shape buttons have localized `aria-label`, `title`, and `aria-pressed` state.
- The active arrangement label uses `aria-live="polite"`.
- The journey band is a real anchor to `#causal-atlas`.
- The Canvas is decorative to pointer input; all required interaction remains available through buttons.
- Focus styles and keyboard order remain native.

## Architecture

- `atomicRearrangementModel.ts`: shape target generation, assignment, and interpolation math.
- `AtomicRearrangementCanvas.tsx`: Canvas lifecycle, drawing, resize behavior, and transitions.
- `AtomicRearrangementHero.tsx`: bilingual content, automatic sequence, manual controls, reduced-motion behavior, and journey link.
- `OverviewPage.tsx`: composition only.
- `AppHeader.tsx`: adds an overview-specific visual variant through the existing `route` prop.

No new runtime dependency is required.

## Acceptance

- All five shapes contain 81 in-bounds targets at desktop and mobile dimensions.
- Paired-column spacing is visibly smaller inside a pair than between pairs.
- Chinese and English layouts remain readable without covering the atom field.
- The next chapter band is visible in the initial desktop and mobile viewport.
- Shape controls update the active label and pressed state.
- Reduced motion produces a stable, non-cycling scene.
- Existing causal atlas, domain links, Wiki, workspace, and deep routes continue to work.
