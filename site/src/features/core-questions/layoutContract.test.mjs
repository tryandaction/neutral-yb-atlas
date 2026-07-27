import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/features/core-questions/coreQuestions.css', 'utf8')

describe('core question map layout contracts', () => {
  it('uses a direct four-stage causal rail without reserving columns for arrows', () => {
    expect(css).toMatch(/\.computation-rail\s*\{[\s\S]*?grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);/)
    expect(css).toMatch(/\.computation-rail > li:not\(:last-child\)::after\s*\{[\s\S]*?right:\s*-16px;/)
    expect(css).not.toMatch(/\.computation-path\s*\{[\s\S]*?28px/)
  })

  it('draws the engineering flow as one ordered four-stage cycle', () => {
    expect(css).toMatch(/\.engineering-cycle__track\s*\{[\s\S]*?grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);/)
    expect(css).toMatch(/\.engineering-cycle__feedback\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto\s+minmax\(0,\s*1fr\);/)
  })

  it('keeps secondary sequence arrows contained within their cards', () => {
    expect(css).toMatch(/\.gate-step:not\(:last-child\)::after,\s*\n\.fault-funnel__channel > li:not\(:last-child\)::after,\s*\n\.resource-cost-flow li:not\(:last-child\)::after\s*\{[\s\S]*?right:\s*12px;[\s\S]*?content:\s*['"]→['"];/)
  })

  it('uses directional arrowheads for merge and feedback paths', () => {
    expect(css).toMatch(/\.fault-funnel__merge::after\s*\{[\s\S]*?border-top:\s*7px\s+solid\s+var\(--forest\);/)
    expect(css).toMatch(/\.gate-control-loop__feedback::before\s*\{[\s\S]*?border-bottom:\s*7px\s+solid\s+var\(--forest\);/)
  })
})
