# ¹⁷¹Yb Replacement-Cycle Timeline Design

## Goal

The experimental-cycle figure must show how a continuously supplied reservoir, a mobile tweezer array, a stationary compute array, metastable-qubit preparation, coherent control, spin-resolved readout, and classical replacement decisions are scheduled. It must remain useful as a teaching figure without presenting apparatus-specific pulse lengths as universal constants.

## Primary Evidence

The macrocycle and the preparation/readout microcycles follow Li et al., *Fast, continuous and coherent atom replacement in a neutral atom qubit array* (arXiv:2506.15633, 2025), including its Appendix D and Figs. 2, 3, 4, and 9. The local PDF and the current official arXiv PDF have the same SHA-256 hash (`8EBCA585C075B969BEDDECBE22847660946382484D9F44B5561657C45C8827F2`).

Ma et al., *High-fidelity gates and mid-circuit erasure conversion in an atomic qubit* (Nature 622, 2023), supplies reference control primitives for the metastable encoding: a 2.0 ms nuclear-spin RF pi pulse and a 330 ns resonant Rydberg pi pulse at 302 nm. These values belong to a separately calibrated gate implementation and must not set the horizontal scale of the Li replacement sequence.

## Parameter Ledger

| Quantity | Value shown | Meaning and source boundary |
| --- | ---: | --- |
| Tweezer loading time constant | `τload = 0.84 ms` | Best measured characteristic time in Li Fig. 2; not the scheduled dwell. |
| Scheduled loading window | `2 ms` | Sequence window in Li Figs. 3 and 4. |
| Zone transfer | `0.5 ms` | One move segment in Li Figs. 3 and 4. The paper's introductory `1 ms transport` refers to the wider end-to-end operation. |
| Light-assisted collisions | `6 ms` | Parity projection to suppress multiple occupancy. |
| Identification image | `4 ms` | Non-destructive 556 nm occupancy image. |
| Cooling | `6 ms` | Local 556 nm plus molasses cooling to about 10 µK. |
| Metastable initialization | `0.7 ms` | Preparation of `³P₀, mF=+1/2`. |
| Tweezer modulation | `1.8 µs`, 50% duty | Alternating 900 ns trap-on and trap-off subwindows. |
| Initialization microcycle | four `900 ns` subwindows, `×50` per stage | Global sigma-plus 556 nm pumping and local 556+1539 nm Raman pumping occupy separate trap-off windows. |
| Spin-selective Raman pulse | `400 ns`, `×8` | Simultaneous 649 and 770 nm transfer through `6s7s ³S₁`. |
| State-map/de-pump window | about `15 µs` per spin state | Transfer selected `³P₀` population through `³P₂`, then 497 nm de-pumping to imageable `¹S₀`. |
| Spin image | `4 ms` each | First image identifies `|0⟩`; second image identifies `|1⟩`; two dark results indicate loss. |
| Compute interval | `T`, variable | Stationary-array hold, RF, or independently calibrated entangling operations run while the mobile array reloads. |

## Figure Architecture

The standalone SVG keeps the five semantic stages used by the page controls but no longer depicts them as a strictly serial, universal clock. It uses three vertically separated scales.

### 1. System Cadence

The upper panel contains two parallel tracks:

- **Reservoir/mobile track:** steady reservoir supply, 2 ms mobile-tweezer loading, 0.5 ms zone transfer, 6 ms LAC, 4 ms identification imaging, 6 ms cooling, 0.7 ms metastable preparation, and array handoff.
- **Stationary compute track:** receive initialized atoms, hold or apply calibrated gates for a variable interval `T`, return selected atoms for readout, and consume the measurement record.

Vertical synchronization lines mark handoff, readout, and the next replacement decision. The reservoir molasses is explicitly disabled during fluorescence imaging. Mobile and stationary tweezers are separate lanes; overlap and depth ramps are visible during handoff.

### 2. Optical and Control Lanes

The middle panel aligns enabled intervals for reservoir molasses, mobile 488 nm tweezers, stationary 488 nm tweezers, LAC light, local 556 nm imaging/cooling, global sigma-plus 556 nm pumping, local 556+1539 nm preparation, RF control, optional 302 nm Rydberg control, 649+770 nm state mapping, 497 nm de-pumping, camera exposures, and the classical decision record.

RF and 302 nm are drawn inside the variable compute interval and labelled as independently calibrated primitives. They do not receive durations on the Li macro-axis. Ma 2023 values appear only in a compact reference annotation with its own scale qualifier.

### 3. Microcycles

The lower panel expands two source-specific timing blocks:

- **Metastable preparation:** four 900 ns subwindows. Tweezer-on and trap-off intervals alternate. Global sigma-plus 556 nm optical pumping occupies one trap-off window; local 556 nm and 1539 nm pulses occupy the second trap-off window. Each pumping stage repeats 50 times.
- **Spin-resolved readout:** a 1.8 µs trap-modulated cycle containing the 400 ns simultaneous 649+770 nm Raman pulse and the 497 nm de-pumping interval, repeated eight times. The macro panel then shows the approximately 15 µs mapping window followed by a 4 ms image, repeated for the second spin state.

The microcycle panels label `TRAP ON` and `TRAP OFF` explicitly. A colored pulse always means that the corresponding optical field is enabled; no lane uses inverted pulse semantics.

## Visual Rules

- Visible SVG text remains English, consistent with the workspace figure standard.
- Every wavelength uses one stable color across stage labels, pulse blocks, and legends.
- Durations are printed only when supported by the cited source. Schematic widths are labelled as such.
- No visible evidence-status phrases such as "demonstrated", "not demonstrated", "candidate", or other editorial scaffolding appear in the figure.
- Long labels are split before they reach lane or panel boundaries. Arrowheads terminate before text and card borders.
- The SVG may increase in height, but its existing 1900 px internal width remains stable so the existing horizontal-scroll behavior is preserved.

## Page Integration

`ExperimentCycleTimeline` retains five semantic stage buttons. The selected explanation distinguishes a general operational role from the Li apparatus details, but replaces vague descriptions with the exact parameter ledger above. The figure caption states that three time scales are present and that the Ma gate primitives are reference values rather than segments on the Li macrocycle.

## Verification

- Static tests assert the macro durations, the two distinct initialization stages, the 400 ns Raman pulse, the `×50` and `×8` repetitions, the two 15 µs mapping windows, and the two 4 ms images.
- Negative assertions reject the previous ambiguous phrases `about 1 ms`, `2 × 50`, and any statement that 497 nm is part of the Raman pair.
- XML parsing, source-text bounds checks, and original-size raster review verify SVG integrity and text fit.
- Browser checks at 1440 x 900 and 390 x 844 verify stage interaction, contained horizontal scrolling, and zero document-level horizontal overflow.
