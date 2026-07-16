import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const domainCss = readFileSync('src/features/domain/domain.css', 'utf8')

describe('domain atomic-reference layout', () => {
  it('keeps the complete map and channel list inside the center column', () => {
    expect(domainCss).toMatch(/\.domain-main \.atomic-reference\s*\{[\s\S]*padding:\s*56px clamp\(24px, 4vw, 48px\) 64px/)
    expect(domainCss).toMatch(/\.domain-main \.atomic-reference__body\s*\{[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\)/)
  })
})
