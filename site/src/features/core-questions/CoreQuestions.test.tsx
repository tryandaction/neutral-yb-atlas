import { render, screen } from '@testing-library/react'
import { WikiProvider } from '../wiki/WikiProvider'
import ComputationPhysicalMap from './ComputationPhysicalMap'
import ExperimentEngineeringMap from './ExperimentEngineeringMap'
import FaultToleranceScaleMap from './FaultToleranceScaleMap'
import GateImplementationLoop from './GateImplementationLoop'
import YbDecisionMap from './YbDecisionMap'

function renderWithWiki(node: React.ReactNode) {
  return render(<WikiProvider>{node}</WikiProvider>)
}

it('maps computation objects through four compact causal stages', () => {
  const { container } = renderWithWiki(<ComputationPhysicalMap language="en" />)

  expect(screen.getByRole('heading', { name: 'How computation becomes a physical process' })).toBeInTheDocument()
  expect(container.querySelectorAll('.computation-rail__stage')).toHaveLength(4)
  expect(container.querySelectorAll('.computation-rail__formula .katex')).toHaveLength(4)
  expect(container.querySelector('.divincenzo-boundary')).toBeInTheDocument()
  expect(container.querySelector('[role="table"]')).not.toBeInTheDocument()
})

it('shows the two-stage decision for neutral atoms and 171Yb', () => {
  const { container } = renderWithWiki(<YbDecisionMap language="en" />)

  expect(container.querySelector('.yb-selection-tree')).toBeInTheDocument()
  expect(container.querySelectorAll('.yb-selection-stage')).toHaveLength(2)
  expect(container.querySelector('.yb-function-split')).toBeInTheDocument()
  expect(screen.getByText('Yb: two J = 0 storage manifolds')).toBeInTheDocument()
  expect(screen.getByText('¹⁷¹Yb: I = 1/2')).toBeInTheDocument()
  expect(screen.getByText('The ¹⁷¹Yb computation chain')).toBeInTheDocument()
})

it('closes the loop from target gate to measured error channel', () => {
  const { container } = renderWithWiki(<GateImplementationLoop language="en" />)

  expect(container.querySelector('.gate-control-loop')).toBeInTheDocument()
  expect(container.querySelectorAll('.gate-control-loop .katex').length).toBeGreaterThanOrEqual(6)
  expect(container.querySelector('code')).not.toBeInTheDocument()
  expect(container.querySelectorAll('.wiki-term').length).toBeGreaterThan(0)
})

it('separates engineering closure from the detailed apparatus and timing figures', () => {
  const { container } = renderWithWiki(<ExperimentEngineeringMap language="en" />)

  expect(container.querySelector('.engineering-cycle')).toBeInTheDocument()
  expect(container.querySelectorAll('.engineering-cycle__stage')).toHaveLength(4)
  expect(container.querySelector('.engineering-cycle__feedback')).toBeInTheDocument()
  expect(container.querySelector('[role="table"]')).not.toBeInTheDocument()
})

it('connects physical faults to logical scale and trustworthy-result cost', () => {
  const { container } = renderWithWiki(<FaultToleranceScaleMap language="en" />)

  expect(container.querySelector('.fault-channel-funnel')).toBeInTheDocument()
  expect(container.querySelectorAll('.fault-channel-funnel .katex').length).toBeGreaterThanOrEqual(6)
  expect(container.querySelector('code')).not.toBeInTheDocument()
})

it('provides complete English structure labels', () => {
  renderWithWiki(<GateImplementationLoop language="en" />)

  expect(screen.getByRole('heading', { name: 'How a quantum gate moves from theory to experiment' })).toBeInTheDocument()
  expect(screen.getByText('Target unitary')).toBeInTheDocument()
  expect(screen.getByText('Gate channel')).toBeInTheDocument()
})
