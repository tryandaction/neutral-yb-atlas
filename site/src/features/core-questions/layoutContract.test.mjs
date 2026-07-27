import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/features/core-questions/coreQuestions.css', 'utf8')

describe('core question map layout contracts', () => {
  it('gives every computation mapping row the same grid track height', () => {
    expect(css).toMatch(/\.computation-physics-map__paths\s*\{[\s\S]*?display:\s*grid;[\s\S]*?grid-auto-rows:\s*1fr;/)
  })

  it('keeps mapping arrowheads inside a dedicated connector gutter', () => {
    expect(css).toMatch(/\.map-edge\s*\{[\s\S]*?margin:\s*0\s+7px\s+0\s+3px;/)
    expect(css).toMatch(/\.map-edge::after\s*\{[\s\S]*?border-left:\s*6px\s+solid\s+var\(--forest\);/)
    expect(css).not.toMatch(/\.map-edge::after,\s*\n\.engineering-link::after/)
  })

  it('places sequence arrows inside cells instead of on column dividers', () => {
    expect(css).toMatch(/\.gate-step:not\(:last-child\)::after,\s*\n\.fault-funnel__channel > li:not\(:last-child\)::after,\s*\n\.resource-cost-flow li:not\(:last-child\)::after\s*\{[\s\S]*?right:\s*12px;[\s\S]*?content:\s*['"]→['"];/)
    expect(css).not.toMatch(/(?:\.gate-step:not\(:last-child\)::after|\.fault-funnel__channel > li:not\(:last-child\)::after|\.resource-cost-flow li:not\(:last-child\)::after)\s*\{[\s\S]*?right:\s*-/)
  })

  it('uses directional arrowheads for merge and feedback paths', () => {
    expect(css).toMatch(/\.fault-funnel__merge::after\s*\{[\s\S]*?border-top:\s*7px\s+solid\s+var\(--forest\);/)
    expect(css).toMatch(/\.gate-control-loop__feedback::before\s*\{[\s\S]*?border-bottom:\s*7px\s+solid\s+var\(--forest\);/)
  })
})
