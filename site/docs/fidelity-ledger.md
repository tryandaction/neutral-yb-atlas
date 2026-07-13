# Fidelity Ledger

## Accepted Direction

- Concept source: `.superpowers/brainstorm/yb-atlas-design-20260711/content/visual-system-v1.html`.
- Product structure: scientific publication + laboratory instrument interface.
- Primary teaching system: layered knowledge entry plus interactive first-principles, Yb-level, gate-state, apparatus and research-ecosystem diagrams.
- Reference asset: detailed 171Yb level and optical-channel map, positioned after the interactive Yb tutor rather than in the first viewport.
- Container model: open bands, rails, tables, timelines and workbench surfaces; no nested card grid.

## Current Comparison

| Check | Concept evidence | Implementation evidence | Status |
| --- | --- | --- | --- |
| First viewport | chapter rail, editorial title and a legible knowledge-system entry | four-layer postulate/physics/hardware/system topology; no dense reference image | Implemented and screenshot-verified |
| Typography | serif scientific headings with readable research controls | 16 px article body, 13–14 px experiment content and 11 px minimum functional labels | Implemented |
| Palette | cold white, graphite, deep green, vermilion, violet, blue, yellow | locked CSS tokens in `tokens.css` | Implemented |
| Container model | open knowledge chain, dark theory band, experiment timeline and editorial figure bands | no nested section cards; tables, rails and full-width media bands preserved | Implemented |
| Teaching visuals | diagrams carry mechanism, labels, formulas, apparatus and evidence rather than decoration | five interactive bilingual tutors plus contextual complete reference map | Implemented and screenshot-verified |
| Interactions | language, modes, editing, parameters, image inspection and experiment state | node selection, state highlighting, per-block restore, confirmed restore-all, local workspace and lightboxes | Tested in DOM and system Chrome |
| Responsive behavior | compact header, single-column controls and readable diagrams | 1440×1000 desktop and 390×844 mobile captures; mobile detail precedes long node lists | Screenshot-verified |
| Motion | restrained state transitions | node/state transitions plus reduced-motion override | Implemented |

## Visual Corrections From System Chrome

- Removed the dense Yb reference map and blockade probe from the first viewport; replaced them with a four-layer causal knowledge entry.
- Moved the complete Yb reference map after the interactive energy-level tutor and retained native-resolution inspection.
- Added interactive first-principles, Yb-transition, Rydberg-CZ, apparatus-pipeline and research-ecosystem teaching diagrams.
- Reordered the mobile first-principles detail before the long node list so a selection produces nearby explanatory feedback.
- Corrected the research-ecosystem background specificity so white labels never render on a light surface.
- Increased article text to 16 px and functional labels to at least 11 px; retained 10 px only for compact indices and JSON code text.
- Added independent gate-mechanism, waveform-handoff and logical-scheduling bands to avoid a long text-only middle and ending.
- Enlarged experiment tables, acceptance criteria, evidence rows and workspace controls without changing their comparison-oriented layouts.

## Known Deviations

- The supplied third-party Image2 service returned an invalid-key response. No credential was written to the project; project-owned scientific figures are used instead.
- The Browser plugin runtime was not callable in this session. The fallback used the installed system Chrome through the DevTools protocol.
- Latest-state captures covered 1440×1000 desktop and 390×844 mobile views. Page identity, meaningful DOM, absence of framework overlays, console health and two state-changing interactions were verified.
- The supplied third-party image endpoint was not used. No credential was written to the project.
