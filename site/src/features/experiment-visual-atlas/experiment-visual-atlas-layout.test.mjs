import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/features/experiment-visual-atlas/experiment-visual-atlas.css', 'utf8')

describe('apparatus journey layout', () => {
  it('keeps the apparatus heading below the sticky site header when outline navigation targets it', () => {
    expect(css).toMatch(/\.visual-atlas\s*\{[\s\S]*scroll-margin-top:\s*calc\(var\(--header-height\)\s*\+\s*16px\)/)
  })

  it('uses one compact three-column stage selector on phones without a second scrollbar', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*560px\)[\s\S]*\.visual-atlas__toolbar\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)/)
    expect(css).toMatch(/@media\s*\(max-width:\s*560px\)[\s\S]*\.visual-atlas__stage-nav\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/)
    expect(css).toMatch(/@media\s*\(max-width:\s*560px\)[\s\S]*\.visual-atlas__step-controls\s*\{[\s\S]*display:\s*none/)
  })
})
