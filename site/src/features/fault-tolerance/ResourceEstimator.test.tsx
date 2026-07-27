import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import ResourceEstimator from './ResourceEstimator'

it('updates the resource judgment when the physical error crosses threshold', () => {
  render(<ResourceEstimator language="zh" />)

  expect(screen.getByRole('heading', { name: '从物理错误预算到逻辑资源' })).toBeInTheDocument()
  expect(screen.getByText('13', { selector: 'output' })).toBeInTheDocument()
  expect(screen.getByText('338', { selector: 'output' })).toBeInTheDocument()

  fireEvent.change(screen.getByLabelText('物理操作错误率'), { target: { value: '0.01' } })

  expect(screen.getByText('当前错误率不低于假设阈值，增加码距不能保证逻辑错误持续下降。')).toBeInTheDocument()
  expect(screen.queryByText('13', { selector: 'output' })).not.toBeInTheDocument()
})

it('keeps the estimator focused on calculations instead of repeating the conceptual map', () => {
  render(<ResourceEstimator language="en" />)

  expect(screen.getByText(/model assumptions, not a Yb device prediction/i)).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Universal computation needs a second chain' })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /Fault-tolerance link:/ })).not.toBeInTheDocument()
  expect(document.querySelector('.fault-chain')).toBeNull()
})

it('shows when erasure conversion is overwhelmed by detection latency', () => {
  render(<ResourceEstimator language="en" />)

  expect(screen.getByRole('heading', { name: 'When does an erasure flag reduce hidden error?' })).toBeInTheDocument()
  expect(screen.getByText('Conditional advantage')).toBeInTheDocument()

  fireEvent.change(screen.getByLabelText('Detection overhead'), { target: { value: '120' } })

  expect(screen.getByText('Overhead dominates')).toBeInTheDocument()
})
