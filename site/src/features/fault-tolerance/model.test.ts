import { describe, expect, it } from 'vitest'
import { estimateResources } from './model'

describe('fault-tolerance resource estimate', () => {
  it('selects the smallest odd distance that satisfies the total failure budget', () => {
    const estimate = estimateResources({
      physicalError: 0.001,
      threshold: 0.01,
      logicalOperations: 1_000_000,
      failureBudget: 0.01,
    })

    expect(estimate.status).toBe('estimated')
    expect(estimate.targetLogicalError).toBeCloseTo(1e-8)
    expect(estimate.codeDistance).toBe(13)
    expect(estimate.physicalQubitsPerLogical).toBe(338)
    expect(estimate.logicalError).toBeLessThanOrEqual(estimate.targetLogicalError!)
  })

  it('refuses an estimate when physical error is not below threshold', () => {
    const estimate = estimateResources({
      physicalError: 0.01,
      threshold: 0.01,
      logicalOperations: 10_000,
      failureBudget: 0.01,
    })

    expect(estimate.status).toBe('above-threshold')
    expect(estimate.codeDistance).toBeNull()
    expect(estimate.physicalQubitsPerLogical).toBeNull()
  })
})
