import {
  analyzeOperatingPoint,
  blockadeRatio,
  buildErrorBudget,
  buildTeachingObservables,
  buildTeachingTrajectory,
  rabiPopulation,
  type WorkbenchParameters,
} from './model'

const baseline: WorkbenchParameters = {
  omegaMHz: 3,
  interactionMHz: 45,
  detuningMHz: 0.25,
  temperatureUk: 2.9,
  rydbergLifetimeUs: 120,
  gateTimeUs: 1.24,
}

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

it('connects detuning to visible phase mismatch and reduced teaching quality', () => {
  const resonant = buildTeachingObservables({
    omegaMHz: 3,
    interactionMHz: 45,
    detuningMHz: 0,
    temperatureUk: 2.9,
    rydbergLifetimeUs: 120,
    gateTimeUs: 1.24,
  })
  const detuned = buildTeachingObservables({
    omegaMHz: 3,
    interactionMHz: 45,
    detuningMHz: 2,
    temperatureUk: 2.9,
    rydbergLifetimeUs: 120,
    gateTimeUs: 1.24,
  })

  expect(detuned.phaseMismatch).toBeGreaterThan(resonant.phaseMismatch)
  expect(detuned.teachingQuality).toBeLessThan(resonant.teachingQuality)
  expect(detuned.doubleExcitation).toBeCloseTo(resonant.doubleExcitation)
})

it.each([
  ['omegaMHz', 4, 'doubleExcitation'],
  ['interactionMHz', 60, 'doubleExcitation'],
  ['detuningMHz', 0.8, 'phaseMismatch'],
  ['temperatureUk', 10, 'dopplerSensitivity'],
  ['rydbergLifetimeUs', 60, 'decayExposure'],
  ['gateTimeUs', 2.2, 'decayExposure'],
] as const)('maps %s to a visible teaching observable', (parameter, value, observable) => {
  const reference = buildTeachingObservables(baseline)
  const changed = buildTeachingObservables({ ...baseline, [parameter]: value })

  expect(changed[observable]).not.toBe(reference[observable])
  expect(changed.teachingQuality).not.toBe(reference.teachingQuality)
})

it('defines teaching quality as a bounded proxy rather than measured fidelity', () => {
  const observables = buildTeachingObservables(baseline)
  const modeledLoss = observables.doubleExcitation
    + observables.phaseMismatch
    + observables.decayExposure
    + observables.dopplerSensitivity

  expect(observables.teachingQuality).toBeCloseTo(Math.max(0, 1 - modeledLoss))
  expect(observables.teachingQuality).toBeGreaterThanOrEqual(0)
  expect(observables.teachingQuality).toBeLessThanOrEqual(1)
})

it('builds a bounded trajectory whose endpoint and pair leakage respond to the model', () => {
  const weakBlockade = buildTeachingTrajectory({ ...baseline, interactionMHz: 18 }, 41)
  const strongBlockade = buildTeachingTrajectory({ ...baseline, interactionMHz: 80 }, 41)

  expect(weakBlockade).toHaveLength(41)
  expect(weakBlockade.at(-1)?.timeUs).toBeCloseTo(baseline.gateTimeUs)
  expect(weakBlockade.every((point) =>
    [point.computational, point.rydberg, point.doubleRydberg].every((population) => population >= 0 && population <= 1),
  )).toBe(true)
  expect(Math.max(...strongBlockade.map((point) => point.doubleRydberg)))
    .toBeLessThan(Math.max(...weakBlockade.map((point) => point.doubleRydberg)))
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
