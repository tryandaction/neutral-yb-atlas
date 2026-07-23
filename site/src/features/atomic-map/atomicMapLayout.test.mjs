import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const domainCss = readFileSync('src/features/domain/domain.css', 'utf8')
const atomicCss = readFileSync('src/features/atomic-map/atomic-map.css', 'utf8')
const atomicComponent = readFileSync('src/features/atomic-map/AtomicMap.tsx', 'utf8')

describe('domain atomic-reference layout', () => {
  it('keeps the complete map inside the center column', () => {
    expect(domainCss).toMatch(/\.domain-main \.atomic-reference\s*\{[\s\S]*padding:\s*56px clamp\(24px, 4vw, 48px\) 64px/)
    expect(atomicCss).toMatch(/\.atomic-reference__body\s*\{[\s\S]*max-width:\s*var\(--max-width\)/)
  })

  it('keeps the complete reference figure free of obsolete hotspot overlays', () => {
    expect(atomicComponent).not.toContain('reference-hotspot')
    expect(atomicCss).not.toContain('.reference-hotspot')
  })
})
