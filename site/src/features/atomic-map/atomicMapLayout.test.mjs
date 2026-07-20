import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const domainCss = readFileSync('src/features/domain/domain.css', 'utf8')
const atomicCss = readFileSync('src/features/atomic-map/atomic-map.css', 'utf8')
const atomicComponent = readFileSync('src/features/atomic-map/AtomicMap.tsx', 'utf8')

describe('domain atomic-reference layout', () => {
  it('keeps the complete map and channel list inside the center column', () => {
    expect(domainCss).toMatch(/\.domain-main \.atomic-reference\s*\{[\s\S]*padding:\s*56px clamp\(24px, 4vw, 48px\) 64px/)
    expect(domainCss).toMatch(/\.domain-main \.atomic-reference__body\s*\{[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\)/)
  })

  it('clamps hotspot callouts inside the image stage on narrow screens', () => {
    expect(atomicComponent).toContain("'--hotspot-label-x'")
    expect(atomicCss).toMatch(/\.reference-hotspot-callout\s*\{[\s\S]*left:\s*clamp\(/)
  })
})
