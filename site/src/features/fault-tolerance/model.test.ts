import { describe, expect, it } from 'vitest'
import { assessErasureConversion, estimateResources } from './model'

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

describe('conditional erasure-conversion assessment', () => {
  it('separates located erasures from residual hidden faults', () => {
    const assessment = assessErasureConversion({
      totalFaultRate: 0.01,
      convertibleFraction: 0.8,
      flagRecall: 0.95,
      falseFlagRate: 0.0002,
      baseCycleUs: 10,
      detectionOverheadUs: 2,
      memoryErrorPerUs: 0.00001,
    })

    expect(assessment.trueErasureRate).toBeCloseTo(0.0076)
    expect(assessment.residualHiddenRate).toBeCloseTo(0.0024)
    expect(assessment.addedMemoryFault).toBeCloseTo(0.00002)
    expect(assessment.status).toBe('candidate')
  })

  it('rejects a claimed advantage when detection latency adds more hidden error than it locates', () => {
    const assessment = assessErasureConversion({
      totalFaultRate: 0.001,
      convertibleFraction: 0.2,
      flagRecall: 0.5,
      falseFlagRate: 0,
      baseCycleUs: 10,
      detectionOverheadUs: 20,
      memoryErrorPerUs: 0.00001,
    })

    expect(assessment.status).toBe('overhead-dominated')
    expect(assessment.effectiveHiddenRate).toBeGreaterThanOrEqual(assessment.totalFaultRate)
  })
})
