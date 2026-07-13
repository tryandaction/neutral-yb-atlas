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

it('filters the evidence registry by status', async () => {
  const user = userEvent.setup()
  render(<EvidenceBrowser language="zh" entries={evidenceEntries} />)
  expect(screen.getByText('完整 Vijkl 相互作用张量')).toBeInTheDocument()

  await user.selectOptions(screen.getByLabelText('证据状态'), 'confirmed')

  expect(screen.queryByText('完整 Vijkl 相互作用张量')).not.toBeInTheDocument()
  expect(screen.getByText('1S0–1P1 成像跃迁')).toBeInTheDocument()
})
