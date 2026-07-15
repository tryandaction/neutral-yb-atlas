export type ArrangementShape = 'random' | 'circle' | 'grid' | 'pairs' | 'cat'

export interface Point {
  x: number
  y: number
}

export interface ArrangementViewport {
  width: number
  height: number
  mobile: boolean
}

interface ArrangementRegion {
  centerX: number
  centerY: number
  spanX: number
  spanY: number
}

export const arrangementSequence: ArrangementShape[] = ['random', 'circle', 'grid', 'pairs', 'cat']

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value))
}

function regionFor({ width, height, mobile }: ArrangementViewport): ArrangementRegion {
  if (mobile) {
    return {
      centerX: width * 0.5,
      centerY: height * 0.67,
      spanX: Math.min(width * 0.78, 330),
      spanY: Math.min(height * 0.42, 280),
    }
  }

  return {
    centerX: width * 0.72,
    centerY: height * 0.52,
    spanX: Math.min(width * 0.47, 560),
    spanY: Math.min(height * 0.68, 440),
  }
}

function seededRandom(seed = 171) {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

function randomTargets(region: ArrangementRegion): Point[] {
  const random = seededRandom()
  const available: Point[] = []

  for (let row = 0; row < 11; row += 1) {
    for (let column = 0; column < 11; column += 1) {
      available.push({
        x: region.centerX + (column - 5) * region.spanX / 11 + (random() - 0.5) * 2.2,
        y: region.centerY + (row - 5) * region.spanY / 11 + (random() - 0.5) * 2.2,
      })
    }
  }

  for (let index = available.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[available[index], available[swapIndex]] = [available[swapIndex], available[index]]
  }

  return available.slice(0, 81)
}

function circleTargets(region: ArrangementRegion): Point[] {
  const targets: Point[] = []
  const rings = [
    { count: 40, scale: 0.48, offset: 0 },
    { count: 28, scale: 0.31, offset: 0.08 },
    { count: 13, scale: 0.14, offset: 0.16 },
  ]

  for (const ring of rings) {
    for (let index = 0; index < ring.count; index += 1) {
      const angle = -Math.PI / 2 + index / ring.count * Math.PI * 2 + ring.offset
      targets.push({
        x: region.centerX + Math.cos(angle) * region.spanX * ring.scale,
        y: region.centerY + Math.sin(angle) * region.spanY * ring.scale,
      })
    }
  }

  return targets
}

function gridTargets(region: ArrangementRegion, paired: boolean): Point[] {
  const targets: Point[] = []
  const gap = Math.min(region.spanX / 10, region.spanY / 10)
  const pairedColumns = [-3.9, -3.2, -1.9, -1.2, 0.1, 0.8, 2.1, 2.8, 4.1]

  for (let row = 0; row < 9; row += 1) {
    for (let column = 0; column < 9; column += 1) {
      const xUnit = paired ? pairedColumns[column] : column - 4
      targets.push({
        x: region.centerX + xUnit * gap,
        y: region.centerY + (row - 4) * gap,
      })
    }
  }

  return targets
}

function samplePolyline(vertices: Array<[number, number]>, count: number): Array<[number, number]> {
  const lengths: number[] = []
  let totalLength = 0

  for (let index = 0; index < vertices.length - 1; index += 1) {
    const length = Math.hypot(
      vertices[index + 1][0] - vertices[index][0],
      vertices[index + 1][1] - vertices[index][1],
    )
    lengths.push(length)
    totalLength += length
  }

  return Array.from({ length: count }, (_, pointIndex) => {
    let distance = pointIndex / count * totalLength
    let segment = 0
    while (distance > lengths[segment] && segment < lengths.length - 1) {
      distance -= lengths[segment]
      segment += 1
    }
    const progress = distance / lengths[segment]
    return [
      vertices[segment][0] + (vertices[segment + 1][0] - vertices[segment][0]) * progress,
      vertices[segment][1] + (vertices[segment + 1][1] - vertices[segment][1]) * progress,
    ]
  })
}

function catTargets(region: ArrangementRegion): Point[] {
  const outline: Array<[number, number]> = [
    [-0.42, 0.18], [-0.38, -0.17], [-0.46, -0.48], [-0.18, -0.34],
    [0, -0.43], [0.18, -0.34], [0.46, -0.48], [0.38, -0.17],
    [0.42, 0.18], [0.28, 0.4], [0, 0.49], [-0.28, 0.4], [-0.42, 0.18],
  ]
  const normalized = samplePolyline(outline, 52)

  for (const eyeX of [-0.16, 0.16]) {
    for (let index = 0; index < 8; index += 1) {
      const angle = index / 8 * Math.PI * 2
      normalized.push([eyeX + Math.cos(angle) * 0.055, 0.07 + Math.sin(angle) * 0.035])
    }
  }

  normalized.push([0, 0.18], [-0.045, 0.23], [0, 0.25], [0.045, 0.23], [0, 0.3])
  const whiskers: Array<[number, number, number, number]> = [
    [-0.08, 0.24, -0.34, 0.19], [-0.08, 0.27, -0.36, 0.29],
    [0.08, 0.24, 0.34, 0.19], [0.08, 0.27, 0.36, 0.29],
  ]
  for (const [startX, startY, endX, endY] of whiskers) {
    normalized.push([startX, startY], [endX, endY])
  }

  return normalized.map(([x, y]) => ({
    x: region.centerX + x * region.spanX,
    y: region.centerY + y * region.spanY,
  }))
}

export function createArrangementTargets(shape: ArrangementShape, viewport: ArrangementViewport): Point[] {
  const region = regionFor(viewport)
  if (shape === 'circle') return circleTargets(region)
  if (shape === 'grid') return gridTargets(region, false)
  if (shape === 'pairs') return gridTargets(region, true)
  if (shape === 'cat') return catTargets(region)
  return randomTargets(region)
}

export function assignNearestTargets(from: Point[], to: Point[]): number[] {
  if (from.length !== to.length) throw new Error('Source and target arrays must have equal length')

  const remainingSources = new Set(from.map((_, index) => index))
  const remainingTargets = new Set(to.map((_, index) => index))
  const assignment = new Array<number>(from.length)

  while (remainingSources.size > 0) {
    let nearestSource = -1
    let nearestTarget = -1
    let nearestDistance = Number.POSITIVE_INFINITY

    for (const sourceIndex of remainingSources) {
      for (const targetIndex of remainingTargets) {
        const deltaX = from[sourceIndex].x - to[targetIndex].x
        const deltaY = from[sourceIndex].y - to[targetIndex].y
        const distance = deltaX * deltaX + deltaY * deltaY
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestSource = sourceIndex
          nearestTarget = targetIndex
        }
      }
    }

    assignment[nearestSource] = nearestTarget
    remainingSources.delete(nearestSource)
    remainingTargets.delete(nearestTarget)
  }

  return assignment
}

export function smootherstep(value: number) {
  const progress = clamp(value)
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10)
}
