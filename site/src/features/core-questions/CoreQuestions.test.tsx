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

it('maps computation objects to mathematics, physics and acceptance', () => {
  const { container } = renderWithWiki(<ComputationPhysicalMap language="zh" />)

  expect(screen.getByRole('heading', { name: '计算怎样成为物理过程' })).toBeInTheDocument()
  expect(screen.getByText('计算定义')).toBeInTheDocument()
  expect(screen.getByText('数学对象')).toBeInTheDocument()
  expect(container.querySelectorAll('.computation-physics-map .katex').length).toBeGreaterThanOrEqual(4)
  expect(container.querySelector('[role="table"]')).not.toBeInTheDocument()
  expect(screen.getByText(/DiVincenzo/)).toBeInTheDocument()
})

it('shows the two-stage decision for neutral atoms and 171Yb', () => {
  renderWithWiki(<YbDecisionMap language="zh" />)

  expect(screen.getByRole('heading', { name: '为什么选择中性原子中的 ¹⁷¹Yb' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '为什么是中性原子' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '为什么是 ¹⁷¹Yb' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '同一原子的功能分工' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Rydberg 纠缠' })).toBeInTheDocument()
})

it('closes the loop from target gate to measured error channel', () => {
  const { container } = renderWithWiki(<GateImplementationLoop language="zh" />)

  expect(screen.getByRole('heading', { name: '量子门怎样从理论走到实验' })).toBeInTheDocument()
  expect(container.querySelector('.gate-control-loop')).toBeInTheDocument()
  expect(container.querySelectorAll('.gate-control-loop .katex').length).toBeGreaterThanOrEqual(6)
  expect(container.querySelector('code')).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: '查看 Wiki：Rydberg 阻塞' })).toBeInTheDocument()
})

it('separates engineering acceptance logic from the detailed apparatus and timing figures', () => {
  const { container } = renderWithWiki(<ExperimentEngineeringMap language="zh" />)

  expect(screen.getByText('实验系统怎样闭合为可重复周期')).toBeInTheDocument()
  expect(screen.getByText('装置与光路')).toBeInTheDocument()
  expect(screen.getByText('状态与运动')).toBeInTheDocument()
  expect(screen.getByText('控制时序')).toBeInTheDocument()
  expect(screen.getByText('原始记录与判据')).toBeInTheDocument()
  expect(container.querySelector('.engineering-system-loop')).toBeInTheDocument()
  expect(container.querySelector('[role="table"]')).not.toBeInTheDocument()
})

it('connects physical faults to logical scale and trustworthy-result cost', () => {
  const { container } = renderWithWiki(<FaultToleranceScaleMap language="zh" />)

  expect(screen.getByRole('heading', { name: '通用容错怎样转化为规模与成本' })).toBeInTheDocument()
  expect(screen.getByText('条件示例')).toBeInTheDocument()
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
