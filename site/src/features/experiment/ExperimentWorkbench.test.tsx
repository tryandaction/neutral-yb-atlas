import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { evidenceEntries } from '../../content/evidence'
import EvidenceBrowser from '../evidence/EvidenceBrowser'
import ExperimentWorkbench from './ExperimentWorkbench'

it('emits the selected experiment phase completion', async () => {
  const user = userEvent.setup()
  const onTogglePhase = vi.fn()
  render(<ExperimentWorkbench language="zh" completedPhases={[]} onTogglePhase={onTogglePhase} />)

  await user.click(screen.getByRole('button', { name: '完成 真空与原子源' }))

  expect(onTogglePhase).toHaveBeenCalledWith('vacuum-source')
})

it('blocks a phase until its declared dependencies are complete', async () => {
  const user = userEvent.setup()
  const onTogglePhase = vi.fn()
  const { rerender } = render(<ExperimentWorkbench language="zh" completedPhases={[]} onTogglePhase={onTogglePhase} />)

  await user.click(screen.getByRole('button', { name: /阵列生成与重排/ }))
  expect(screen.getByText('依赖阻塞')).toBeInTheDocument()
  expect(screen.getByText(/尚缺：冷却、MOT 与光镊装载/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '完成 阵列生成与重排' })).toBeDisabled()

  rerender(<ExperimentWorkbench language="zh" completedPhases={['cooling-loading']} onTogglePhase={onTogglePhase} />)
  expect(screen.getByText('依赖已满足，等待验收')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '完成 阵列生成与重排' })).toBeEnabled()
})

it('filters the evidence registry by status', async () => {
  const user = userEvent.setup()
  render(<EvidenceBrowser language="zh" entries={evidenceEntries} />)
  expect(screen.getByText('完整 Vijkl 相互作用张量')).toBeInTheDocument()

  await user.selectOptions(screen.getByLabelText('证据状态'), 'confirmed')

  expect(screen.queryByText('完整 Vijkl 相互作用张量')).not.toBeInTheDocument()
  expect(screen.getByText('1S0–1P1 成像跃迁')).toBeInTheDocument()
})
