export interface RabiParameters {
  omegaMHz: number
  detuningMHz: number
  timeUs: number
}

export interface ErrorBudgetParameters {
  omegaMHz: number
  interactionMHz: number
  detuningMHz?: number
  temperatureUk: number
  rydbergLifetimeUs: number
  gateTimeUs: number
}

export interface ErrorContribution {
  id: 'blockade' | 'decay' | 'doppler' | 'detuning'
  value: number
  fraction: number
}

export interface WorkbenchParameters extends ErrorBudgetParameters {
  detuningMHz: number
}

export interface TeachingGateObservables {
  maxDoubleExcitation: number
  conditionalPhaseRad: number
  phaseErrorRad: number
  rydbergExposureUs: number
  decayProbability: number
  dopplerRmsKhz: number
  dopplerPhaseRmsRad: number
}

export interface TeachingTrajectoryPoint {
  timeUs: number
  computational: number
  rydberg: number
  doubleRydberg: number
}

const BOLTZMANN_J_PER_K = 1.380649e-23
const YB171_MASS_KG = 171 * 1.66053906660e-27
const RYDBERG_WAVELENGTH_M = 302e-9

function clampProbability(value: number) {
  return Math.min(1, Math.max(0, value))
}

function assertWorkbenchParameters(parameters: WorkbenchParameters) {
  if (parameters.omegaMHz <= 0) throw new Error('omegaMHz must be positive')
  if (parameters.interactionMHz < 0) throw new Error('interactionMHz must be non-negative')
  if (parameters.temperatureUk < 0) throw new Error('temperatureUk must be non-negative')
  if (parameters.rydbergLifetimeUs <= 0) throw new Error('rydbergLifetimeUs must be positive')
  if (parameters.gateTimeUs < 0) throw new Error('gateTimeUs must be non-negative')
}

function dopplerRmsMHz(temperatureUk: number) {
  const velocityRms = Math.sqrt(BOLTZMANN_J_PER_K * temperatureUk * 1e-6 / YB171_MASS_KG)
  return velocityRms / RYDBERG_WAVELENGTH_M / 1e6
}

export function blockadeRatio({ interactionMHz, omegaMHz }: Pick<ErrorBudgetParameters, 'interactionMHz' | 'omegaMHz'>) {
  if (omegaMHz <= 0) throw new Error('omegaMHz must be positive')
  if (interactionMHz < 0) throw new Error('interactionMHz must be non-negative')
  return interactionMHz / omegaMHz
}

export function rabiPopulation({ omegaMHz, detuningMHz, timeUs }: RabiParameters) {
  if (omegaMHz < 0 || timeUs < 0) throw new Error('omegaMHz and timeUs must be non-negative')
  const effectiveMHz = Math.hypot(omegaMHz, detuningMHz)
  if (effectiveMHz === 0) return 0
  const contrast = (omegaMHz / effectiveMHz) ** 2
  return Math.min(1, Math.max(0, contrast * Math.sin(Math.PI * effectiveMHz * timeUs) ** 2))
}

export function buildErrorBudget(parameters: ErrorBudgetParameters): ErrorContribution[] {
  const observables = buildTeachingObservables({ ...parameters, detuningMHz: parameters.detuningMHz ?? 0 })
  const raw = [
    { id: 'blockade' as const, value: observables.maxDoubleExcitation },
    { id: 'decay' as const, value: observables.decayProbability },
    { id: 'doppler' as const, value: clampProbability(observables.dopplerPhaseRmsRad ** 2) },
    { id: 'detuning' as const, value: clampProbability(observables.phaseErrorRad ** 2) },
  ]
  const total = raw.reduce((sum, item) => sum + item.value, 0)
  return raw.map((item) => ({ ...item, fraction: total === 0 ? 0 : item.value / total }))
}

/**
 * Qualitative two-atom blockade model. It exposes parameter trade-offs but
 * deliberately does not infer a device fidelity from experimental data.
 */
export function buildTeachingObservables(parameters: WorkbenchParameters): TeachingGateObservables {
  assertWorkbenchParameters(parameters)
  const trajectory = buildTeachingTrajectory(parameters)
  const dopplerMHz = dopplerRmsMHz(parameters.temperatureUk)
  const dtUs = parameters.gateTimeUs / (trajectory.length - 1)
  const rydbergExposureUs = trajectory.slice(1).reduce((sum, point, index) => {
    const previous = trajectory[index]
    const previousExcitations = previous.rydberg + 2 * previous.doubleRydberg
    const currentExcitations = point.rydberg + 2 * point.doubleRydberg
    return sum + 0.5 * (previousExcitations + currentExcitations) * dtUs
  }, 0)
  const phaseOffsetRad = 2 * Math.PI * parameters.detuningMHz * rydbergExposureUs
  const phaseErrorRad = Math.abs(phaseOffsetRad)
  const dopplerPhaseRmsRad = 2 * Math.PI * dopplerMHz * rydbergExposureUs

  return {
    maxDoubleExcitation: Math.max(...trajectory.map((point) => point.doubleRydberg)),
    conditionalPhaseRad: Math.PI + phaseOffsetRad,
    phaseErrorRad,
    rydbergExposureUs,
    decayProbability: clampProbability(1 - Math.exp(-rydbergExposureUs / parameters.rydbergLifetimeUs)),
    dopplerRmsKhz: dopplerMHz * 1000,
    dopplerPhaseRmsRad,
  }
}

/**
 * Analytical teaching trajectory for a driven pair. The two-level Rabi term is
 * dressed by lifetime and thermal dephasing envelopes; finite blockade assigns
 * a fraction of the excited population to |rr>. It is not a gate simulation.
 */
export function buildTeachingTrajectory(parameters: WorkbenchParameters, samples = 121): TeachingTrajectoryPoint[] {
  assertWorkbenchParameters(parameters)
  if (!Number.isInteger(samples) || samples < 2) throw new Error('samples must be an integer greater than one')

  const ratio = blockadeRatio(parameters)
  const leakage = clampProbability(0.5 / ratio ** 2)
  const thermalMHz = dopplerRmsMHz(parameters.temperatureUk)
  return Array.from({ length: samples }, (_, index) => {
    const timeUs = index / (samples - 1) * parameters.gateTimeUs
    const coherentExcitation = rabiPopulation({
      omegaMHz: parameters.omegaMHz,
      detuningMHz: parameters.detuningMHz,
      timeUs,
    })
    const lifetimeEnvelope = Math.exp(-timeUs / (2 * parameters.rydbergLifetimeUs))
    const thermalEnvelope = Math.exp(-0.5 * (2 * Math.PI * thermalMHz * timeUs) ** 2)
    const excited = clampProbability(coherentExcitation * lifetimeEnvelope * thermalEnvelope)
    const doubleRydberg = excited * leakage
    const rydberg = excited - doubleRydberg
    return { timeUs, computational: 1 - excited, rydberg, doubleRydberg }
  })
}
