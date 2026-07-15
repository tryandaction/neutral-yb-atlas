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

const prefactor = 0.1
const maximumDistance = 99

function logicalErrorAtDistance(physicalError: number, threshold: number, distance: number): number {
  return prefactor * Math.pow(physicalError / threshold, (distance + 1) / 2)
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
