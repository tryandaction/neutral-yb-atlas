import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/features/domain/domain.css', 'utf8')

describe('domain workbench desktop layout', () => {
  it('uses a fluid workbench with bounded side rails', () => {
    expect(css).toMatch(/\.domain-workbench\s*\{[\s\S]*width:\s*100%/)
    expect(css).toMatch(/\.domain-workbench\s*\{[\s\S]*grid-template-columns:\s*clamp\(/)
    expect(css).not.toMatch(/\.domain-workbench\s*\{[\s\S]*width:\s*min\(100%,\s*1510px\)/)
  })

  it('hides the closed context drawer instead of leaving its shadow visible', () => {
    expect(css).toMatch(/\.domain-context\s*\{[\s\S]*visibility:\s*hidden/)
    expect(css).toMatch(/\.domain-context\.is-open\s*\{[\s\S]*visibility:\s*visible/)
  })
})
