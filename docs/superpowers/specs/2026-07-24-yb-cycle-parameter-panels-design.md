# Yb Cycle Parameter Panels Design

## Scope

Refine the five horizontally scrollable experimental-cycle SVG panels. Keep the existing page-level five-stage selector and panel order. Do not modify the apparatus overview, the energy-level reference, or unrelated domain content.

## Information hierarchy

- The page navigation names the five stages once.
- Each SVG keeps only its own domain label, title, and `NN / 05` index.
- The duplicated five-cell stage ribbon is replaced by a compact `REPORTED OPERATING POINT` band.
- Pulse lanes show the field, duration, and action. The operating-point band carries wavelength, detuning, normalized intensity or optical power, polarization, Rabi frequency, and trap conditions where the cited paper reports them.

## Parameter policy

All values are apparatus-specific examples, not universal Yb requirements.

1. Reservoir loading: Li et al. (2025), 556 nm two-tone 1D molasses at 8.5 G, tone spacing 12 MHz, each tone detuned by `-4.4 Gamma_556`, `4 I_sat,mol = 1.68 mW cm^-2`; 488 nm tweezers use 2.4 mW/trap for loading and transport, with `U0/h = 1.94 MHz` in the loading data.
2. Qualification: Li et al. Fig. 8 operating points are read approximately and marked with `~`: LAC near `Delta = -1.6 Gamma_556`, `I = 1.2 I_sat/tone`; imaging near `Delta = -2.1 Gamma_556`, `I = 4.8 I_sat/tone`. The cooling pulse is 6 ms at `+2.0 MHz`, with local and molasses intensities of `30` and `90 I_sat,556`, respectively.
3. Preparation and handoff: 1.8 us modulation period, 50% duty cycle and 900 ns trap-off windows; local 556 nm and global 1539 nm Raman pumping use 10 MHz single-photon detuning and single-photon Rabi frequencies of 3.6 and 2.8 MHz. Each optical-pumping stage repeats 50 times. Mobile transport is about 280 um in 0.5 ms. No unreported optical power is inferred.
4. Computation: Ma et al. (2023) supplies separate calibration scales: RF at 5.70 kHz in 5.0 G with a 2.0 ms pi pulse; 302 nm Rydberg excitation uses 6 mW at the atoms, 10 um waist, `Omega/2pi = 1.6 MHz`, and a 330 ns pi pulse. These values do not set the Li replacement-panel width.
5. Readout: Li et al. (2025) uses simultaneous pi-polarized 649 and 770 nm fields, about 12 GHz detuning from `6s7s 3S1`, `Omega_2ph/2pi = 1.08 MHz`, 400 ns pulses repeated eight times, and 22 MHz spin-state separation at 8.5 G. The 497 nm depump addresses two components separated by about 136 MHz. Ground-state images use the local 556 nm imaging beam, not 399 nm.

## Visual constraints

- Preserve the 760 by 760 view box and the existing horizontal rail.
- Keep all text inside the view box with a minimum 20 px margin.
- Use one parameter band per panel and no nested cards.
- Keep scientific symbols readable at the current 760 px panel width.
- Preserve `<title>`, `<desc>`, `role="img"`, and descriptive HTML `alt` text.

## Acceptance

- No SVG contains the duplicated labels `RESERVOIR / LOAD`, `QUALIFY / COOL`, `PREPARE / HANDOFF`, `COMPUTE`, or `READOUT / FEEDBACK`.
- Every panel contains a `REPORTED OPERATING POINT` label and source-qualified values.
- The readout panel contains `556 nm imaging` and does not contain `399 nm imaging`.
- Tests, lint, production build, and desktop/mobile visual checks pass.
