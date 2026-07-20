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

  it('collapses side rails before the center column becomes narrower than complex teaching content', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*1560px\)/)
    expect(css).toMatch(/\.domain-main\s*\{[\s\S]*width:\s*min\(100%,\s*1120px\)/)
  })

  it('removes the duplicated Theory navigation inside the domain center column', () => {
    expect(css).toMatch(/\.domain-main \.theory-workbench\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)/)
    expect(css).toMatch(/\.domain-main \.theory-workbench__nav\s*\{[\s\S]*display:\s*none/)
  })

  it('keeps the compact outline touch-scrollable without a native scrollbar', () => {
    expect(css).toMatch(/\.domain-outline\s*\{[\s\S]*scrollbar-width:\s*none/)
    expect(css).toMatch(/\.domain-outline::\-webkit-scrollbar\s*\{[\s\S]*display:\s*none/)
  })
})
