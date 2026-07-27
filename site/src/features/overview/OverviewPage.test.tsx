import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import OverviewPage from './OverviewPage'

it('renders one connected mathematical-to-physical chain with typeset equations', () => {
  render(<OverviewPage language="zh" />)

  expect(screen.getByRole('heading', { name: '中性 Yb 原子计算' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /从什么是计算开始/ })).toHaveAttribute('href', '#causal-atlas')
  expect(screen.getByRole('heading', { name: '从逻辑对象到可信结果' })).toBeInTheDocument()

  const atlas = document.getElementById('causal-atlas') as HTMLElement
  expect(atlas.querySelectorAll('[data-testid="causal-stage"]')).toHaveLength(6)
  expect(atlas.querySelectorAll('.katex')).toHaveLength(7)
  expect(atlas.querySelector('.causal-map__feedback')).toBeInTheDocument()
  expect(atlas.querySelectorAll('.causal-map__formula')).toHaveLength(0)
  expect(screen.queryByRole('heading', { name: '物理故障如何成为逻辑错误' })).not.toBeInTheDocument()
})

it('keeps the English causal atlas free of Chinese copy', () => {
  render(<OverviewPage language="en" />)

  expect(screen.getByRole('heading', { name: 'From logical objects to trustworthy results' })).toBeInTheDocument()
  const atlas = document.getElementById('causal-atlas') as HTMLElement
  const atlasText = atlas.textContent ?? ''
  expect(atlasText).not.toMatch(/[\u3400-\u9fff]/u)
  expect(atlasText).not.toContain('Physical meaning')
  expect(atlasText).not.toContain('Acceptance output')
  expect(atlas.querySelectorAll('.causal-stage > header small')).toHaveLength(0)
})

it('summarizes the complete learning chain in Chinese and English', () => {
  const { rerender } = render(<OverviewPage language="zh" />)

  expect(screen.getByRole('heading', { name: /计算如何落在物理系统中/ })).toBeInTheDocument()
  expect(screen.getByText(/DiVincenzo/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /为什么选择中性原子/ })).toBeInTheDocument()
  expect(screen.getByText(/超导.*离子阱.*光子/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /为什么在中性原子中选择 171Yb/ })).toBeInTheDocument()
  expect(screen.getByText(/Rb.*Cs.*Sr/)).toBeInTheDocument()
  expect(screen.getAllByText(/误报.*漏报/).length).toBeGreaterThanOrEqual(1)

  rerender(<OverviewPage language="en" />)
  expect(screen.getByRole('heading', { name: /How computation is embodied in a physical system/ })).toBeInTheDocument()
  expect(screen.getByText(/superconducting.*trapped-ion.*photonic/i)).toBeInTheDocument()
  expect(screen.getAllByText(/false positives.*false negatives/i).length).toBeGreaterThanOrEqual(1)
})
