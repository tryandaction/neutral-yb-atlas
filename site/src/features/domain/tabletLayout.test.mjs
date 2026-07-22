import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const comparisonCss = readFileSync('src/features/comparison/comparison.css', 'utf8')
const faultToleranceCss = readFileSync('src/features/fault-tolerance/fault-tolerance.css', 'utf8')

describe('tablet-density layout', () => {
  it('reflows platform comparisons before four cards become cramped', () => {
    expect(comparisonCss).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*\.platform-routes\s*>\s*div[\s\S]*grid-template-columns:\s*repeat\(2/)
  })

  it('reflows fault chains before five teaching steps become cramped', () => {
    expect(faultToleranceCss).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*\.fault-chain__steps\s*\{[\s\S]*grid-template-columns:\s*repeat\(2/)
  })

  it('keeps the six-step scale sequence visible without horizontal scrolling on phones', () => {
    expect(faultToleranceCss).toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*\.scale-cost-logic__sequence\s*\{[\s\S]*grid-template-columns:\s*repeat\(2/)
    expect(faultToleranceCss).not.toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*\.scale-cost-logic__sequence\s*\{[\s\S]*overflow-x:\s*auto/)
  })
})
