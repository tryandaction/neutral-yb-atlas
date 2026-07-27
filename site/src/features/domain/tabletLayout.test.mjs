import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const comparisonCss = readFileSync('src/features/comparison/comparison.css', 'utf8')
const faultToleranceCss = readFileSync('src/features/fault-tolerance/fault-tolerance.css', 'utf8')

describe('tablet-density layout', () => {
  it('reflows platform comparisons before four cards become cramped', () => {
    expect(comparisonCss).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*\.platform-routes\s*>\s*div[\s\S]*grid-template-columns:\s*repeat\(2/)
  })

  it('reflows the five erasure inputs before they become cramped', () => {
    expect(faultToleranceCss).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*\.erasure-assessment__controls\s*\{[\s\S]*grid-template-columns:\s*repeat\(2/)
    expect(faultToleranceCss).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*\.erasure-assessment__controls \.resource-number:nth-child\(5\)[\s\S]*grid-column:\s*1\s*\/\s*-1/)
  })

  it('stacks estimator controls, results and assumptions on phones', () => {
    expect(faultToleranceCss).toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*\.resource-estimator__controls,[\s\S]*\.resource-estimator__result,[\s\S]*\.resource-estimator__assumptions\s*\{[\s\S]*grid-template-columns:\s*1fr/)
    expect(faultToleranceCss).toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*\.erasure-assessment__controls,[\s\S]*\.erasure-assessment__flow\s*\{\s*grid-template-columns:\s*1fr/)
  })
})
