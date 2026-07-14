import { analyzeOperatingPoint, blockadeRatio, buildErrorBudget, rabiPopulation } from './model'

it('computes the blockade ratio and rejects non-physical drive', () => {
  expect(blockadeRatio({ interactionMHz: 45, omegaMHz: 3 })).toBe(15)
  expect(() => blockadeRatio({ interactionMHz: 45, omegaMHz: 0 })).toThrow(
    'omegaMHz must be positive',
  )
})

it('keeps resonant Rabi population inside the probability interval', () => {
  const values = Array.from({ length: 101 }, (_, index) =>
    rabiPopulation({ omegaMHz: 3, detuningMHz: 0, timeUs: index / 100 }),
  )

  expect(Math.min(...values)).toBeGreaterThanOrEqual(0)
  expect(Math.max(...values)).toBeLessThanOrEqual(1)
})

it('returns a normalized teaching error budget', () => {
  const budget = buildErrorBudget({
    omegaMHz: 3,
    interactionMHz: 45,
    temperatureUk: 2.9,
    rydbergLifetimeUs: 120,
    gateTimeUs: 1.24,
  })

  expect(budget.every((item) => item.value >= 0)).toBe(true)
  expect(budget.reduce((sum, item) => sum + item.fraction, 0)).toBeCloseTo(1)
})

it('identifies the dominant error and classifies the operating region', () => {
  const baseline = analyzeOperatingPoint({
    omegaMHz: 3,
    interactionMHz: 45,
    detuningMHz: 0,
    temperatureUk: 2.9,
    rydbergLifetimeUs: 120,
    gateTimeUs: 1.24,
  })
  const weakBlockade = analyzeOperatingPoint({
    omegaMHz: 8,
    interactionMHz: 10,
    detuningMHz: 0,
    temperatureUk: 2.9,
    rydbergLifetimeUs: 120,
    gateTimeUs: 1.24,
  })

  expect(baseline.region).toBe('usable')
  expect(baseline.dominant).toBe('decay')
  expect(weakBlockade.region).toBe('outside')
  expect(weakBlockade.dominant).toBe('blockade')
  expect(weakBlockade.nextMeasurement).toBe('pair-spectroscopy')
})
