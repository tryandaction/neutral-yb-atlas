import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useActiveSection } from './useActiveSection'

let emitEntries: (entries: IntersectionObserverEntry[]) => void = () => undefined
let emitResize: () => void = () => undefined
let intersectionOptions: IntersectionObserverInit | undefined

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds = [0]

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    emitEntries = (entries) => callback(entries, this)
    intersectionOptions = options
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
  intersectionOptions = undefined
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

it('releases hash-navigation alignment when a pointer selects an in-page outline target', async () => {
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  vi.stubGlobal('ResizeObserver', ResizeObserverMock)
  window.history.replaceState(null, '', '#top')
  document.body.innerHTML = '<main><section id="top"></section><section id="domain-experiment"><div class="domain-opening"></div></section></main>'
  const target = document.getElementById('domain-experiment') as HTMLElement
  const scrollIntoView = vi.fn()
  Object.defineProperty(target, 'scrollIntoView', { configurable: true, value: scrollIntoView })
  renderHook(() => useActiveSection())

  await act(async () => {
    window.location.hash = '#domain-experiment'
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    await new Promise((resolve) => setTimeout(resolve, 40))
  })

  const callsAfterHashNavigation = scrollIntoView.mock.calls.length
  expect(callsAfterHashNavigation).toBeGreaterThan(0)

  window.dispatchEvent(new PointerEvent('pointerdown'))
  await act(async () => {
    emitResize()
    await new Promise((resolve) => setTimeout(resolve, 40))
  })

  expect(scrollIntoView).toHaveBeenCalledTimes(callsAfterHashNavigation)
})

it('tracks a long section even when its visible ratio is below five percent', () => {
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  window.history.replaceState(null, '', '#domain-fault-tolerance')
  document.body.innerHTML = '<section id="domain-experiment"></section><section id="domain-fault-tolerance"></section>'

  const { result } = renderHook(() => useActiveSection())
  const experimentSection = document.getElementById('domain-experiment') as Element

  expect(intersectionOptions?.threshold).toBe(0)

  act(() => {
    emitEntries([
      { target: experimentSection, isIntersecting: true, intersectionRatio: 0.01 } as IntersectionObserverEntry,
    ])
  })

  expect(result.current).toBe('experiment')
})
