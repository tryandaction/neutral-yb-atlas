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

it('separates DiVincenzo implementation criteria from the fault-tolerance chain', () => {
  render(<ResourceEstimator language="en" />)

  expect(screen.getByRole('heading', { name: 'Universal computation needs a second chain' })).toBeInTheDocument()
  expect(screen.getByText('decoder-visible record')).toBeInTheDocument()
  expect(screen.getByText(/model assumptions, not a Yb device prediction/i)).toBeInTheDocument()
})

it('makes each fault-tolerance link selectable and explains the selected link', () => {
  render(<ResourceEstimator language="en" />)

  const physicalFault = screen.getByRole('button', { name: 'Fault-tolerance link: physical fault' })
  const trustworthyResult = screen.getByRole('button', { name: 'Fault-tolerance link: trustworthy result' })

  expect(physicalFault).toHaveAttribute('aria-pressed', 'false')
  expect(trustworthyResult).toHaveAttribute('aria-pressed', 'true')

  fireEvent.click(physicalFault)

  expect(physicalFault).toHaveAttribute('aria-pressed', 'true')
  expect(trustworthyResult).toHaveAttribute('aria-pressed', 'false')
  expect(screen.getByRole('heading', { name: 'Physical fault becomes a cycle channel' })).toBeInTheDocument()
  expect(screen.getByText(/A decoder needs the fault type, location, timing and correlation/)).toBeInTheDocument()
})

it('shows when erasure conversion is overwhelmed by detection latency', () => {
  render(<ResourceEstimator language="en" />)

  expect(screen.getByRole('heading', { name: 'When does an erasure flag reduce hidden error?' })).toBeInTheDocument()
  expect(screen.getByText('Conditional advantage')).toBeInTheDocument()

  fireEvent.change(screen.getByLabelText('Detection overhead'), { target: { value: '120' } })

  expect(screen.getByText('Overhead dominates')).toBeInTheDocument()
})
