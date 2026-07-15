import { describe, expect, it } from 'vitest'
import { parseRoute, routeHref } from './routes'

describe('route model', () => {
  it('maps empty and unknown hashes to the overview', () => {
    expect(parseRoute('')).toBe('overview')
    expect(parseRoute('#top')).toBe('overview')
    expect(parseRoute('#/unknown')).toBe('overview')
  })

  it('maps page anchors and legacy deep links to research destinations', () => {
    expect(parseRoute('#/yb-platform')).toBe('yb-platform')
    expect(parseRoute('#/fault-tolerance')).toBe('fault-tolerance')
    expect(parseRoute('#domain-yb-platform')).toBe('yb-platform')
    expect(parseRoute('#domain-fault-tolerance')).toBe('fault-tolerance')
    expect(routeHref('overview')).toBe('#top')
    expect(routeHref('experiment')).toBe('#domain-experiment')
  })
})
