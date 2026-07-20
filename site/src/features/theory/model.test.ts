import {
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

it('returns named physical observables without synthesizing a quality score', () => {
  const observables = buildTeachingObservables(baseline)

  expect(observables).toEqual(expect.objectContaining({
    maxDoubleExcitation: expect.any(Number),
    conditionalPhaseRad: expect.any(Number),
    phaseErrorRad: expect.any(Number),
    rydbergExposureUs: expect.any(Number),
    decayProbability: expect.any(Number),
    dopplerRmsKhz: expect.any(Number),
  }))
  expect(observables).not.toHaveProperty('teachingQuality')
  expect(buildTeachingObservables({ ...baseline, interactionMHz: 90 }).maxDoubleExcitation)
    .toBeLessThan(observables.maxDoubleExcitation)
  expect(buildTeachingObservables({ ...baseline, rydbergLifetimeUs: 60 }).decayProbability)
    .toBeGreaterThan(observables.decayProbability)
})

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

it('connects detuning to conditional phase error', () => {
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

  expect(detuned.phaseErrorRad).toBeGreaterThan(resonant.phaseErrorRad)
  expect(detuned.conditionalPhaseRad).not.toBe(resonant.conditionalPhaseRad)
})

it.each([
  ['omegaMHz', 4, 'maxDoubleExcitation'],
  ['interactionMHz', 60, 'maxDoubleExcitation'],
  ['detuningMHz', 0.8, 'phaseErrorRad'],
  ['temperatureUk', 10, 'dopplerRmsKhz'],
  ['rydbergLifetimeUs', 60, 'decayProbability'],
  ['gateTimeUs', 2.2, 'rydbergExposureUs'],
] as const)('maps %s to a visible teaching observable', (parameter, value, observable) => {
  const reference = buildTeachingObservables(baseline)
  const changed = buildTeachingObservables({ ...baseline, [parameter]: value })

  expect(changed[observable]).not.toBe(reference[observable])
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

it('keeps physical probabilities bounded', () => {
  const observables = buildTeachingObservables(baseline)

  expect(observables.maxDoubleExcitation).toBeGreaterThanOrEqual(0)
  expect(observables.maxDoubleExcitation).toBeLessThanOrEqual(1)
  expect(observables.decayProbability).toBeGreaterThanOrEqual(0)
  expect(observables.decayProbability).toBeLessThanOrEqual(1)
})
