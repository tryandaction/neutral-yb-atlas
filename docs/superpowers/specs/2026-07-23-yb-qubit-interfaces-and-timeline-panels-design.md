# Yb Qubit Interfaces And Timeline Panels Design

## Goal

Remove the ambiguity between ground-manifold and metastable-manifold single-qubit control in the Yb energy-level reference, redraw the Rydberg decay and repump explanation as an energy-level process, and replace the dense monolithic timing figure with five readable stage panels in a horizontal learning sequence.

## Evidence Boundary

- Muniz et al. (2025): local ground-manifold gates use two focused 556 nm Raman beams coupling the `6s2 1S0, mF=+/-1/2` qubit through virtual `6s6p 3P1, F'=1/2`; the reported single-photon detuning is about -5 GHz and the two-photon Rabi rate is about `2pi x 7 kHz`.
- Jenkins et al. (2022): ground-manifold nuclear-spin control is demonstrated on the `1S0 <-> 3P1` system; direct metastable control through `3P0 <-> 3D1` or `3P0 <-> 3S1`, including a 649 nm route through `3S1`, is an architecture path proposed in the paper and must not be labeled as the demonstrated ground-state gate.
- Ma et al. (2023): the shown metastable qubit is `|0m>, |1m> in 6s6p 3P0`; global magnetic RF drives nuclear-spin rotations and 302 nm couples `|1m>` to the Rydberg state for the blockade gate.
- A ground-manifold architecture reaches the same Rydberg interface only after state-selective 578.4 nm shelving into `3P0`; the figure must show this mapping explicitly.
- Ma et al. (2023) decay numbers are measured populations after preparing `|r>` and waiting about 400 microseconds: about 25% in `1S0`, 10% in `3P0`, 35% in `3P2`, and 30% unaccounted. After 770 nm repumping of `3P2` through `6s7s 3S1`, measured totals are 51% in `1S0`, 19% in `3P0`, and about 30% unaccounted. These are not universal branching ratios and not gate-error fractions.

## Energy-Level Figure

The upper energy ladder remains unchanged. The former `encoding A / encoding B` cards are removed because a manifold does not determine a unique one-qubit-control implementation. Their area contains one generic Raman Lambda diagram and four compact physical instantiations:

1. `1S0 nuclear spin`: two 556 nm fields couple the `mF=+/-1/2` states through virtual `3P1, F'=1/2`; `Delta/2pi ~= -5 GHz` and `Omega_2ph/2pi ~= 7 kHz` are the Muniz et al. (2025) experimental values. Direct magnetic control is labeled `RF at omega_Z`; the figure does not call this kilohertz-scale nuclear-Zeeman drive microwave control.
2. `3P0 nuclear spin`: two 649 nm fields use `6s7s 3S1` as the virtual intermediate. The route is attributed to Jenkins et al. (2022) as a proposed local-control implementation, without invented detuning or Rabi parameters.
3. `3P2 hyperfine qubit`: two 770 nm fields couple through `6s7s 3S1, F'=3/2, mF'=-3/2`. `Delta_QB/2pi = +20 GHz`, `Omega_QB/2pi = 2 MHz`, and `B = 10 G` are explicitly labeled as the simulated operating point of the 2026 dual-metastable architecture, not an experimental benchmark.
4. `3P0 <-> 3P2 cross-manifold mapping`: 649 and 770 nm fields share `6s7s 3S1` as the intermediate. `Delta/2pi ~= 12 GHz`, `Omega_2ph/2pi = 1.08 MHz`, and `B = 8.5 G` are the Li et al. (2025) experimental state-mapping values; the row is not labeled as a randomized-benchmarked universal gate.

The generic Lambda diagram labels `|0>`, `|1>`, virtual `|e>`, single-photon detuning `Delta`, two-photon detuning `delta`, and the two optical fields. The main 302 nm arrow carries the separate two-qubit statement: the computational basis is the `3P0, mF=+/-1/2` pair and 302 nm couples the selected `|1>` state to `|r>`.

## Decay And Repump Figure

The lower band becomes a single left-to-right energy-flow diagram rather than four unrelated cards:

- source level `|r> = 6s59s 3S1`;
- black spontaneous-decay branches to `1S0`, `3P0`, `3P2`, and an explicitly non-level bucket for unaccounted/loss/leakage outcomes;
- orange 770 nm excitation from `3P2` to `6s7s 3S1`;
- black spontaneous decay from the repump intermediate to final `1S0` and `3P0` populations;
- blue 399 nm imaging arrow from `1S0` to the fluorescence record;
- a separate gate-level note reports 56% single-qubit and 33% CZ error conversion without visually connecting those numbers to the 51/19/30 population totals.

## Timeline Figure Sequence

The existing content is distributed across five assets with a common visual grammar and repeated stage-position strip:

1. `yb-cycle-01-reservoir-load.svg`: upstream source, reservoir molasses, scheduled 2 ms loading, fitted `tau_load = 0.84 ms`, mobile tweezer capture.
2. `yb-cycle-02-qualify-cool.svg`: 0.5 ms move, 6 ms LAC, 4 ms identification image, 6 ms cooling to about 10 microkelvin.
3. `yb-cycle-03-prepare-handoff.svg`: 0.7 ms metastable preparation, four 900 ns subwindows, distinct global sigma+ 556 nm and local 556+1539 nm stages, 50 cycles per stage, array handoff.
4. `yb-cycle-04-compute.svg`: stationary-array hold, RF control, independently calibrated 302 nm gate reference, and concurrent reservoir/mobile-array reload.
5. `yb-cycle-05-readout-feedback.svg`: 649+770 nm Raman mapping, 400 ns pulse repeated eight times, 497 nm depump, two 15 microsecond map/depump blocks, two 4 ms images, and the `|0> / |1> / loss` classifier feeding the replacement queue.

Each asset uses a `760 x 760` or similarly compact viewBox with body text no smaller than 15 px. Durations are printed values; horizontal widths remain schematic.

## Web Interaction

- The five existing stage buttons remain the only primary navigation.
- Clicking a button updates the explanatory article and calls `scrollIntoView` on its matching panel.
- The panel rail uses horizontal overflow, scroll snap, a stable gap, and no page-level horizontal overflow.
- Each panel has its own bilingual accessible name and visible stage number. The images themselves retain English technical text, consistent with the workspace figure-language rule.
- Desktop shows approximately one full panel plus a hint of the next. Mobile shows one panel at a readable fixed width and supports touch scrolling.

## Acceptance

- The labels `encoding A` and `encoding B` do not appear.
- The single generic Lambda diagram is followed by four source-qualified parameter rows without duplicated explanatory prose.
- `556+556`, `649+649`, `770+770`, and `649+770 nm` are tied to the correct lower states and virtual intermediate.
- The 649 nm route is labeled proposed, the 770 nm route is labeled simulated, and the 649+770 nm row is labeled experimental state mapping.
- The two-qubit statement assigns both computational states to `3P0` and couples only the selected `|1>` state to `|r>` at 302 nm.
- Decay arrows and repump arrows follow energy order and do not overlap labels.
- All five timing assets exist, retain every previously tested parameter, and render at readable scale.
- Stage-button interaction scrolls to the matching panel.
- Desktop and mobile screenshots show no overlap, clipping, or page-level horizontal overflow.
