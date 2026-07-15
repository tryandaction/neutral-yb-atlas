import { act, renderHook } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { useHashRoute } from './useHashRoute'

afterEach(() => {
  window.history.replaceState(null, '', '#/')
})

it('tracks initial and subsequent hash destinations', () => {
  window.history.replaceState(null, '', '#/yb-platform')
  const { result } = renderHook(() => useHashRoute())

  expect(result.current).toBe('yb-platform')

  act(() => {
    window.location.hash = '#/experiment'
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })

  expect(result.current).toBe('experiment')
})
