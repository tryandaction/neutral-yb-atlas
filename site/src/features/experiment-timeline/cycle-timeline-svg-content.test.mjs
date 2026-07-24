import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const asset = (name) => readFileSync(`assets/${name}`, 'utf8')

const panels = [
  'yb-cycle-01-reservoir-load.svg',
  'yb-cycle-02-qualify-cool.svg',
  'yb-cycle-03-prepare-handoff.svg',
  'yb-cycle-04-compute.svg',
  'yb-cycle-05-readout-feedback.svg',
].map(asset)

describe('Yb cycle SVG scientific content', () => {
  it('keeps stage navigation at page level instead of repeating it inside every panel', () => {
    const repeatedNavigation = [
      'RESERVOIR / LOAD',
      'QUALIFY / COOL',
      'PREPARE / HANDOFF',
      '>COMPUTE<',
      'READOUT / FEEDBACK',
    ]

    panels.forEach((panel) => {
      repeatedNavigation.forEach((label) => expect(panel).not.toContain(label))
      expect(panel).toContain('REPORTED OPERATING POINT')
    })
  })

  it('states the source-qualified loading and qualification settings', () => {
    const supply = panels[0]
    const qualify = panels[1]

    expect(supply).toContain('two tones, 12 MHz apart')
    expect(supply).toContain('−4.4 Γ₅₅₆')
    expect(supply).toContain('1.68 mW cm⁻² per tone')
    expect(supply).toContain('2.4 mW/trap')

    expect(qualify).toContain('LAC: Δ≈−1.6 Γ₅₅₆; I≈1.2 Iₛₐₜ/tone')
    expect(qualify).toContain('image: Δ≈−2.1 Γ₅₅₆; I≈4.8 Iₛₐₜ/tone')
    expect(qualify).toContain('local 30 Iₛₐₜ; molasses 90 Iₛₐₜ')
  })

  it('states the preparation, gate, and readout calibration scales without inventing powers', () => {
    const prepare = panels[2]
    const compute = panels[3]
    const readout = panels[4]

    expect(prepare).toContain('Δ=10 MHz; Ω₅₅₆/2π=3.6 MHz; Ω₁₅₃₉/2π=2.8 MHz')
    expect(prepare).toContain('1.8 µs period; 50% duty; 900 ns trap-off')
    expect(prepare).toContain('≈280 µm in 0.5 ms')

    expect(compute).toContain('5.0 G; fL=5.70 kHz; tπ=2.0 ms')
    expect(compute).toContain('6 mW at atoms; w₀=10 µm; Ω/2π=1.6 MHz; tπ=330 ns')

    expect(readout).toContain('Δ≈12 GHz; Ω₂γ/2π=1.08 MHz')
    expect(readout).toContain('π-polarized; 400 ns × 8')
    expect(readout).toContain('two components separated by ≈136 MHz')
    expect(readout).toContain('556 nm imaging')
    expect(readout).not.toContain('399 nm imaging')
  })
})
