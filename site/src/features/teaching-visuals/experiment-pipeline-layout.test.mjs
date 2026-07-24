import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/features/teaching-visuals/teaching-visuals.css', 'utf8')

describe('experiment pipeline responsive layout', () => {
  it('uses a compact horizontal stage rail on phones', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*720px\)[\s\S]*\.pipeline-track\s*\{[\s\S]*display:\s*flex[\s\S]*overflow-x:\s*auto/)
    expect(css).toMatch(/@media\s*\(max-width:\s*720px\)[\s\S]*\.pipeline-track button\s*\{[\s\S]*flex:\s*0\s+0\s+154px/)
  })
})
