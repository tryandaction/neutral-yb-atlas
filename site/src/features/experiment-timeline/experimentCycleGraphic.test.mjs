import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, it } from 'vitest'

const panels = [
  ['yb-cycle-01-reservoir-load.svg', ['scheduled load 2 ms', 'τload = 0.84 ms', '1D reservoir molasses']],
  ['yb-cycle-02-qualify-cool.svg', ['move 0.5 ms', 'LAC 6 ms', 'identification image 4 ms', 'cool 6 ms']],
  ['yb-cycle-03-prepare-handoff.svg', ['prepare ³P₀ 0.7 ms', 'global σ+ 556 nm', 'local 556 + 1539 nm', '×50 each stage']],
  ['yb-cycle-04-compute.svg', ['stationary compute', 'RF nuclear-spin control', '302 nm Rydberg reference', 'reload continues in parallel']],
  ['yb-cycle-05-readout-feedback.svg', ['649 + 770 nm Raman mapping', '400 ns ×8', '497 nm depump', '|0&gt; / |1&gt; / loss']],
]

it('splits the full cycle into five readable, source-qualified SVG panels', () => {
  for (const [filename, evidence] of panels) {
    const path = resolve('assets', filename)
    expect(existsSync(path), `${filename} should exist`).toBe(true)
    if (!existsSync(path)) continue

    const svg = readFileSync(path, 'utf8')
    expect(svg).toContain('viewBox="0 0 760 760"')
    expect(svg).toMatch(/\.body \{ font-size: (?:1[6-9]|[2-9]\d)px;/)
    for (const phrase of evidence) expect(svg).toContain(phrase)
    expect(svg).not.toContain('497 nm Raman')
    expect(svg).not.toMatch(/[（(](?:demonstrated|not demonstrated|candidate)[）)]/i)
  }
})
