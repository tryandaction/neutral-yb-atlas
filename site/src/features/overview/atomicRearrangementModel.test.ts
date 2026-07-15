import { describe, expect, it } from 'vitest'
import {
  arrangementSequence,
  assignNearestTargets,
  createArrangementTargets,
  smootherstep,
  type ArrangementShape,
} from './atomicRearrangementModel'

const desktop = { width: 1200, height: 720, mobile: false }
const mobile = { width: 390, height: 650, mobile: true }
const shapes: ArrangementShape[] = ['random', 'circle', 'grid', 'pairs', 'cat']

describe('atomic rearrangement geometry', () => {
  it('keeps the approved choreography order', () => {
    expect(arrangementSequence).toEqual(['random', 'circle', 'grid', 'pairs', 'cat'])
  })

  it.each([desktop, mobile])('creates 81 finite in-bounds targets for every shape', (viewport) => {
    for (const shape of shapes) {
      const targets = createArrangementTargets(shape, viewport)
      expect(targets).toHaveLength(81)
      for (const point of targets) {
        expect(Number.isFinite(point.x)).toBe(true)
        expect(Number.isFinite(point.y)).toBe(true)
        expect(point.x).toBeGreaterThanOrEqual(0)
        expect(point.x).toBeLessThanOrEqual(viewport.width)
        expect(point.y).toBeGreaterThanOrEqual(0)
        expect(point.y).toBeLessThanOrEqual(viewport.height)
      }
    }
  })

  it('uses a deterministic stochastic-loading pattern', () => {
    expect(createArrangementTargets('random', desktop)).toEqual(
      createArrangementTargets('random', desktop),
    )
  })

  it('moves neighboring columns closer while retaining larger gaps between pairs', () => {
    const targets = createArrangementTargets('pairs', desktop)
    const firstRow = targets.slice(0, 9).map((point) => point.x)
    const internalPairGap = firstRow[1] - firstRow[0]
    const betweenPairGap = firstRow[2] - firstRow[1]

    expect(internalPairGap).toBeGreaterThan(0)
    expect(internalPairGap).toBeLessThan(betweenPairGap)
  })
})

describe('rearrangement motion helpers', () => {
  it('assigns every atom to one unique nearby target', () => {
    const assignment = assignNearestTargets(
      [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 }],
      [{ x: 21, y: 0 }, { x: 1, y: 0 }, { x: 11, y: 0 }],
    )

    expect(assignment).toEqual([1, 2, 0])
    expect(new Set(assignment).size).toBe(3)
  })

  it('starts and ends with a flat quintic easing curve', () => {
    expect(smootherstep(0)).toBe(0)
    expect(smootherstep(1)).toBe(1)
    expect(smootherstep(-1)).toBe(0)
    expect(smootherstep(2)).toBe(1)
    expect(smootherstep(0.001)).toBeLessThan(0.00001)
    expect(1 - smootherstep(0.999)).toBeLessThan(0.00001)
  })
})
