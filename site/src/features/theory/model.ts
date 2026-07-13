export interface RabiParameters {
  omegaMHz: number
  detuningMHz: number
  timeUs: number
}

export interface ErrorBudgetParameters {
  omegaMHz: number
  interactionMHz: number
  temperatureUk: number
  rydbergLifetimeUs: number
  gateTimeUs: number
}

export interface ErrorContribution {
  id: 'blockade' | 'decay' | 'doppler' | 'control'
  value: number
  fraction: number
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
    { id: 'control' as const, value: 0.00035 * (parameters.omegaMHz / 3) },
  ]
  const total = raw.reduce((sum, item) => sum + item.value, 0)
  return raw.map((item) => ({ ...item, fraction: total === 0 ? 0 : item.value / total }))
}
