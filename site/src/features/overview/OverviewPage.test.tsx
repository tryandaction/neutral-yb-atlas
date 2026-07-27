import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import OverviewPage from './OverviewPage'

it('renders a concise four-step computation overview with typeset equations', () => {
  render(<OverviewPage language="zh" />)

  expect(screen.getByRole('link', { name: /从什么是计算开始/ })).toHaveAttribute('href', '#causal-atlas')

  const atlas = document.getElementById('causal-atlas') as HTMLElement
  expect(atlas.querySelectorAll('[data-testid="causal-stage"]')).toHaveLength(4)
  expect(atlas.querySelectorAll('.katex')).toHaveLength(4)
  expect(atlas.querySelector('.causal-map__feedback')).not.toBeInTheDocument()
})

it('keeps the English overview free of Chinese copy and generic acceptance labels', () => {
  render(<OverviewPage language="en" />)

  expect(screen.getByRole('heading', { name: 'Four steps to a verifiable quantum computation' })).toBeInTheDocument()
  const atlas = document.getElementById('causal-atlas') as HTMLElement
  const atlasText = atlas.textContent ?? ''
  expect(atlasText).not.toMatch(/[\u3400-\u9fff]/u)
  expect(atlasText).not.toContain('Acceptance quantity')
  expect(atlasText).not.toContain('Physical realization')
})

it('summarizes the complete learning chain in Chinese and English', () => {
  const { rerender } = render(<OverviewPage language="zh" />)

  expect(screen.getByText(/DiVincenzo/)).toBeInTheDocument()
  expect(screen.getByText(/Rb.*Cs.*Sr/)).toBeInTheDocument()
  expect(screen.getAllByText(/误报.*漏报/).length).toBeGreaterThanOrEqual(1)

  rerender(<OverviewPage language="en" />)
  expect(screen.getByText(/superconducting.*trapped-ion.*photonic/i)).toBeInTheDocument()
  expect(screen.getAllByText(/false positives.*false negatives/i).length).toBeGreaterThanOrEqual(1)
})
