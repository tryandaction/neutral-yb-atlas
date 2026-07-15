# Neutral Yb Atlas information architecture redesign

## Purpose

Neutral Yb Atlas is a bilingual research knowledge application for readers entering neutral-atom quantum computing and for researchers who need a compact map from physical principles to laboratory acceptance. The interface must teach one causal argument before exposing apparatus detail:

`valuable problem -> quantum algorithm -> logical resources -> fault tolerance -> physical machine -> time and cost`

The site must not present every component as an equally important block in one continuous page.

## Product structure

The application has seven primary destinations:

- `/`: overview and first-principles causal atlas.
- `/foundations`: computation, quantum computation, atomic carriers, and switchable interaction.
- `/yb-platform`: neutral atoms, isotope selection, Yb structure, energy levels, and species comparison.
- `/gates-theory`: target Hamiltonians, single- and two-qubit gates, error mechanisms, and theory-to-experiment contracts.
- `/experiment`: apparatus, instruments, timing, calibration, operating phases, and acceptance criteria.
- `/fault-tolerance`: circuit channels, erasure conversion, QEC, scale, throughput, and cost.
- `/evidence`: figures, papers, parameter records, and evidence provenance.

Wiki entries remain globally available as a contextual drawer and support direct deep links.

## Global shell

The sticky header is 64 px high on desktop and contains:

- Brand at the left.
- Primary destinations in the center.
- Language, reading depth, Wiki, and workspace controls at the right.

Editing, import/export, contribution, and note controls belong in the workspace drawer. They must not compete with primary navigation.

## Overview page

The first viewport is an active knowledge surface rather than a marketing hero.

Allowed visible copy:

- H1: `中性 Yb 原子计算：从物理原理到容错系统` / `Neutral-Yb computing: from physical principles to fault-tolerant systems`.
- Thesis: computation is a controlled transformation of physical states; machine value is determined by the time and cost of obtaining a trustworthy result.
- Primary causal chain: problem, algorithm, logical resources, fault tolerance, physical machine, time and cost.

Selecting a causal node updates one stable explanation region with:

- Definition.
- Necessary condition.
- Governing expression.
- Failure criterion.
- Link to the relevant research domain.

The bottom of the first viewport reveals the beginning of the foundations section. The page must not show a reference energy-level image, apparatus poster, fake metric, badge, or decorative illustration above the fold.

Below the first viewport, five full-width chapter bands introduce the five research domains. Each band contains one claim, one principal visual, one decision question, and one destination link. They are not a card grid.

## Research-domain layout

Wide desktop uses a three-column research workbench:

- 220 px chapter rail.
- 680-840 px primary argument column.
- 320-380 px contextual inspector.

The primary column uses a repeated reasoning sequence only where it is technically meaningful:

`claim -> derivation -> equation/model -> experimental test -> failure meaning`

The contextual inspector shows the active Wiki entry, variable definitions, evidence, parameter provenance, or laboratory acceptance condition. It is a functional panel rather than a decorative card.

At widths below 1180 px, the chapter rail becomes a horizontal chapter selector and the inspector becomes an on-demand drawer. Below 760 px the page is single-column and Wiki, outline, and workspace open as full-screen sheets.

## Domain responsibilities

### Foundations

Sequence:

`computation -> quantum computation -> atomic state carrier -> multiqubit conditional dynamics -> neutral-atom switchable interaction`

This page owns the first-principles causal argument. It does not contain Yb apparatus details.

### Yb platform

Sequence:

`neutral-atom requirements -> isotope decision -> nuclear-spin storage -> electronic interfaces -> energy-level channels -> comparison with Rb/Cs/Sr`

The supplied Yb energy-level reference image and the interactive energy-level tutor belong here.

### Gates and theory

Sequence:

`target operation -> target Hamiltonian -> control waveform -> measured observable -> inverse problem -> error budget -> next experiment`

The theory workbench must return an operating judgment, dominant error, and next discriminating measurement. It must not present sliders without an experimental decision.

### Experiment

Sequence:

`source/vacuum -> laser infrastructure -> cooling/loading -> tweezer/rearrangement -> gate delivery -> imaging -> real-time feedback -> release criteria`

Generated apparatus plates, the experiment pipeline, hotspot atlas, instrument table, and phase checklist are ordered by the actual experimental lifecycle. Each phase exposes prerequisites and acceptance evidence.

### Fault tolerance, scale, and cost

Sequence:

`physical mechanism -> gate fault -> circuit channel -> syndrome record -> decoder information -> logical error -> resource overhead -> runtime and cost`

This page includes a model-labelled resource estimator. Inputs may include physical error, threshold assumption, logical operation count, and total failure budget. Outputs must state that code distance and physical overhead are architecture- and noise-model-dependent.

The principal scale metric is executable logical spacetime volume, not trapped atom count. The principal cost metric is cost per trustworthy result, not cost per atom.

### Evidence

Research figures, evidence entries, paper links, and parameter records share one searchable library. Research ecosystem diagrams are navigation aids inside this library, not standalone narrative interruptions.

## Information depth

Content has three layers:

1. Main claim: readable without opening a panel.
2. Derivation and experiment: equations, diagrams, parameter dependencies, and acceptance logic.
3. Wiki and evidence: terminology, comparisons, failure modes, citations, and provenance.

Learning and research modes change depth, not the argument or section order. The bilingual versions share identical information architecture.

## Images and diagrams

- Photographic or generated images explain apparatus, spatial arrangement, beam paths, and engineering environments.
- Code-native interactive diagrams explain causal relations, energy-level selection, Hamiltonians, gate states, and QEC flow.
- An image and an interactive diagram must not duplicate the same teaching function.
- Teaching images use stable aspect ratios and occupy at least 70% of the primary content width on desktop.
- Image labels needed for interaction remain code-native whenever possible.

Image hotspots use normalized coordinates. Selecting a hotspot renders a precise ring, leader, or arrow and opens its explanation. Editing mode may expose a calibration overlay for moving hotspots and recording coordinates.

## Wiki and workspace

Wiki terms use a restrained inline marker. The desktop Wiki drawer is approximately 460 px wide and contains:

- One-sentence definition.
- Operating principle.
- Role in neutral-atom computing.
- Controlled quantities and parameters.
- Comparison with adjacent technologies.
- Failure modes and measurements.
- Related chapters and evidence.

Workspace controls editing, notes, snapshots, import/export, and contribution links. Editing controls appear only while editing is active.

## Visual system

- Background: true white.
- Primary structure color: deep ink/forest.
- Accent: restrained vermilion.
- Scientific channel colors are reserved for wavelengths, states, and semantic data.
- No decorative gradients, glowing orbs, pill collections, nested cards, or marketing-style feature grids.
- Panels use square or <= 8 px corners, thin rules, and minimal elevation.
- Chinese body copy is 18-19 px with approximately 1.75 line height.
- English body copy is 17-18 px with approximately 1.7 line height.
- Display headings are limited to the overview and domain openings; compact tools use compact typography.
- Equations render at no less than 20 px and may horizontally scroll on mobile.

## Motion

Motion is limited to causal-node transitions, inspector changes, hotspot focus, and drawer movement. It must explain state and respect `prefers-reduced-motion`.

## Existing component consolidation

- Merge `KnowledgeMap` and `FirstPrinciplesTree` into one causal atlas.
- Place `YbEnergyTutor` and `AtomicMap` in the Yb platform domain.
- Order `ExperimentPipeline`, `ExperimentVisualAtlas`, and `ExperimentWorkbench` as one laboratory lifecycle.
- Consolidate `ResearchAtlas`, `ResearchEcosystem`, and `EvidenceBrowser` into the evidence destination.
- Remove standalone `ResearchInterlude` separators; place their media with the mechanism they explain.

## Acceptance criteria

- The first viewport presents one causal argument and previews the next section.
- Every primary navigation item opens a distinct destination and is deep-linkable.
- No domain page is a raw stack of all existing components.
- Body text, equations, figure labels, and controls remain readable at 1440 px, 1024 px, and 390 px widths.
- Wiki terms preserve reading position and support deep links.
- Images have precise, tested hotspot overlays where interaction is used.
- Theory controls produce an experimental decision.
- Experiment phases enforce dependencies.
- Fault-tolerance estimates expose assumptions and do not imply universal overhead values.
- Chinese and English versions preserve the same causal structure.
