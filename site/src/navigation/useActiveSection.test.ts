import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useActiveSection } from './useActiveSection'

let emitEntries: (entries: IntersectionObserverEntry[]) => void = () => undefined
let emitResize: () => void = () => undefined

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds = [0]

  constructor(callback: IntersectionObserverCallback) {
    emitEntries = (entries) => callback(entries, this)
  }

  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn(() => [])
  unobserve = vi.fn()
}

class ResizeObserverMock implements ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    emitResize = () => callback([], this)
  }

  disconnect = vi.fn()
  observe = vi.fn()
  unobserve = vi.fn()
}

afterEach(() => {
  vi.unstubAllGlobals()
  document.body.replaceChildren()
  window.history.replaceState(null, '', '#top')
})

it('starts from a legacy deep link and follows the most visible page section', () => {
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  window.history.replaceState(null, '', '#/experiment')
  document.body.innerHTML = '<section id="top"></section><section id="domain-yb-platform"></section><section id="domain-experiment"></section>'

  const { result } = renderHook(() => useActiveSection())

  expect(result.current).toBe('experiment')

  const ybSection = document.getElementById('domain-yb-platform') as Element
  act(() => {
    emitEntries([
      { target: ybSection, isIntersecting: true, intersectionRatio: 0.72 } as IntersectionObserverEntry,
    ])
  })

  expect(result.current).toBe('yb-platform')
})

it('realigns an anchor when continuous page content changes layout', async () => {
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  vi.stubGlobal('ResizeObserver', ResizeObserverMock)
  window.history.replaceState(null, '', '#top')
  document.body.innerHTML = '<main><section id="top"></section><section id="domain-experiment"><div class="domain-opening"></div></section></main>'
  const target = document.getElementById('domain-experiment') as HTMLElement
  const scrollIntoView = vi.fn()
  Object.defineProperty(target, 'scrollIntoView', { configurable: true, value: scrollIntoView })
  renderHook(() => useActiveSection())

  act(() => {
    window.location.hash = '#domain-experiment'
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })

  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })

  act(() => emitResize())

  await waitFor(() => {
    expect(scrollIntoView).toHaveBeenLastCalledWith({ behavior: 'auto', block: 'start' })
  })
})
