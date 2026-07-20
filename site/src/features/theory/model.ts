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
  id: 'blockade' | 'decay' | 'doppler' | 'detuning' | 'control'
  value: number
  fraction: number
}

export interface WorkbenchParameters extends ErrorBudgetParameters {
  detuningMHz: number
}

export type OperatingRegion = 'usable' | 'marginal' | 'outside'
export type NextMeasurement = 'pair-spectroscopy' | 'rydberg-lifetime' | 'temperature-scan' | 'control-transfer' | 'detuning-scan'

export interface OperatingPointAnalysis {
  region: OperatingRegion
  dominant: ErrorContribution['id']
  nextMeasurement: NextMeasurement
  totalError: number
  ratio: number
}

export interface TeachingGateObservables {
  doubleExcitation: number
  rydbergExposure: number
  phaseError: number
  gateQuality: number
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
  const ratio = blockadeRatio(parameters)
  const raw = [
    { id: 'blockade' as const, value: 0.5 / ratio ** 2 },
    { id: 'decay' as const, value: 0.5 * parameters.gateTimeUs / parameters.rydbergLifetimeUs },
    { id: 'doppler' as const, value: 0.0012 * (parameters.temperatureUk / 2.9) * (3 / parameters.omegaMHz) ** 2 },
    { id: 'detuning' as const, value: ((parameters.detuningMHz ?? 0) / parameters.omegaMHz) ** 2 },
    { id: 'control' as const, value: 0.00035 * (parameters.omegaMHz / 3) },
  ]
  const total = raw.reduce((sum, item) => sum + item.value, 0)
  return raw.map((item) => ({ ...item, fraction: total === 0 ? 0 : item.value / total }))
}

/**
 * Qualitative two-atom blockade model. It exposes parameter trade-offs but
 * deliberately does not infer a device fidelity from experimental data.
 */
export function buildTeachingObservables(parameters: WorkbenchParameters): TeachingGateObservables {
  const ratio = blockadeRatio(parameters)
  const doubleExcitation = Math.min(1, 0.5 / ratio ** 2)
  const phaseError = Math.min(1, (parameters.detuningMHz / parameters.omegaMHz) ** 2)
  const rydbergExposure = Math.min(1, 0.5 * parameters.gateTimeUs / parameters.rydbergLifetimeUs)
  const motionError = 0.0012 * (parameters.temperatureUk / 2.9) * (3 / parameters.omegaMHz) ** 2
  const controlError = 0.00035 * (parameters.omegaMHz / 3)
  const gateQuality = Math.max(0, 1 - doubleExcitation - phaseError - rydbergExposure - motionError - controlError)
  return { doubleExcitation, rydbergExposure, phaseError, gateQuality }
}

export function analyzeOperatingPoint(parameters: WorkbenchParameters): OperatingPointAnalysis {
  const ratio = blockadeRatio(parameters)
  const budget = buildErrorBudget(parameters)
  const dominant = budget.reduce((largest, item) => item.value > largest.value ? item : largest)
  const totalError = budget.reduce((sum, item) => sum + item.value, 0)
  const nextByError: Record<ErrorContribution['id'], NextMeasurement> = {
    blockade: 'pair-spectroscopy',
    decay: 'rydberg-lifetime',
    doppler: 'temperature-scan',
    detuning: 'detuning-scan',
    control: 'control-transfer',
  }

  if (Math.abs(parameters.detuningMHz) > 1) {
    return { region: 'outside', dominant: dominant.id, nextMeasurement: 'detuning-scan', totalError, ratio }
  }

  const region: OperatingRegion = ratio < 8 || totalError > 0.03
    ? 'outside'
    : totalError > 0.012 || ratio < 10
      ? 'marginal'
      : 'usable'

  return { region, dominant: dominant.id, nextMeasurement: nextByError[dominant.id], totalError, ratio }
}
