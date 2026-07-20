export interface ResourceEstimateInput {
  physicalError: number
  threshold: number
  logicalOperations: number
  failureBudget: number
}

export interface ResourceEstimate {
  status: 'estimated' | 'above-threshold'
  targetLogicalError: number
  logicalError: number | null
  codeDistance: number | null
  physicalQubitsPerLogical: number | null
  assumptions: string[]
}

export interface ErasureAssessmentInput {
  totalFaultRate: number
  convertibleFraction: number
  flagRecall: number
  falseFlagRate: number
  baseCycleUs: number
  detectionOverheadUs: number
  memoryErrorPerUs: number
}

export interface ErasureAssessment {
  status: 'candidate' | 'no-conversion' | 'record-contaminated' | 'overhead-dominated'
  totalFaultRate: number
  trueErasureRate: number
  residualHiddenRate: number
  falseFlagRate: number
  flagPrecision: number
  addedMemoryFault: number
  effectiveHiddenRate: number
  cycleStretch: number
}

const prefactor = 0.1
const maximumDistance = 99

function logicalErrorAtDistance(physicalError: number, threshold: number, distance: number): number {
  return prefactor * Math.pow(physicalError / threshold, (distance + 1) / 2)
}

export function assessErasureConversion(input: ErasureAssessmentInput): ErasureAssessment {
  const rates = [input.totalFaultRate, input.falseFlagRate, input.memoryErrorPerUs]
  const fractions = [input.convertibleFraction, input.flagRecall]
  if (rates.some((value) => value < 0) || fractions.some((value) => value < 0 || value > 1)) {
    throw new Error('rates must be non-negative and fractions must lie in [0, 1]')
  }
  if (input.baseCycleUs <= 0 || input.detectionOverheadUs < 0) {
    throw new Error('cycle durations must be physical')
  }

  const trueErasureRate = input.totalFaultRate * input.convertibleFraction * input.flagRecall
  const residualHiddenRate = input.totalFaultRate - trueErasureRate
  const addedMemoryFault = input.detectionOverheadUs * input.memoryErrorPerUs
  const effectiveHiddenRate = residualHiddenRate + addedMemoryFault
  const totalFlags = trueErasureRate + input.falseFlagRate
  const flagPrecision = totalFlags === 0 ? 0 : trueErasureRate / totalFlags
  const cycleStretch = (input.baseCycleUs + input.detectionOverheadUs) / input.baseCycleUs

  const status: ErasureAssessment['status'] = trueErasureRate === 0
    ? 'no-conversion'
    : effectiveHiddenRate >= input.totalFaultRate
      ? 'overhead-dominated'
      : input.falseFlagRate >= trueErasureRate
        ? 'record-contaminated'
        : 'candidate'

  return {
    status,
    totalFaultRate: input.totalFaultRate,
    trueErasureRate,
    residualHiddenRate,
    falseFlagRate: input.falseFlagRate,
    flagPrecision,
    addedMemoryFault,
    effectiveHiddenRate,
    cycleStretch,
  }
}

export function estimateResources(input: ResourceEstimateInput): ResourceEstimate {
  const targetLogicalError = input.failureBudget / input.logicalOperations
  const assumptions = [
    'Pedagogical threshold scaling: pL = 0.1 (p / pth)^((d + 1) / 2).',
    'Physical-qubit estimate: 2 d^2 per logical qubit.',
    'Correlated faults, leakage handling, routing, factories and maintenance are not included.',
  ]

  if (input.physicalError >= input.threshold) {
    return {
      status: 'above-threshold',
      targetLogicalError,
      logicalError: null,
      codeDistance: null,
      physicalQubitsPerLogical: null,
      assumptions,
    }
  }

  for (let distance = 3; distance <= maximumDistance; distance += 2) {
    const logicalError = Number(logicalErrorAtDistance(input.physicalError, input.threshold, distance).toPrecision(12))
    if (logicalError <= targetLogicalError) {
      return {
        status: 'estimated',
        targetLogicalError,
        logicalError,
        codeDistance: distance,
        physicalQubitsPerLogical: 2 * distance * distance,
        assumptions,
      }
    }
  }

  return {
    status: 'above-threshold',
    targetLogicalError,
    logicalError: null,
    codeDistance: null,
    physicalQubitsPerLogical: null,
    assumptions,
  }
}
