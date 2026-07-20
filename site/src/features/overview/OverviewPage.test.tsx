import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import OverviewPage from './OverviewPage'

it('derives the machine from a valuable computation and exposes each causal condition', async () => {
  const user = userEvent.setup()
  render(<OverviewPage language="zh" />)

  expect(screen.getByRole('heading', { name: '中性 Yb 原子计算' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /从什么是计算开始/ })).toHaveAttribute('href', '#causal-atlas')
  expect(screen.getAllByRole('button', { name: /计算目标|量子算法|逻辑资源|容错计算|物理机器|运行时间|可信结果成本/ })).toHaveLength(7)
  expect(screen.getByText('把表示输入的物理状态，按给定规则变成可验证的输出状态。')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: '容错计算' }))

  expect(screen.getByText('G_L × p_L ≤ ε')).toBeInTheDocument()
  expect(screen.getByText('若物理错误不低于阈值，增加编码规模不会持续压低逻辑错误。')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '进入容错与规模' })).toHaveAttribute('href', '#domain-fault-tolerance')
})

it('summarizes the complete learning chain in Chinese and English', () => {
  const { rerender } = render(<OverviewPage language="zh" />)

  expect(screen.getByRole('heading', { name: /计算如何落在物理系统中/ })).toBeInTheDocument()
  expect(screen.getByText(/DiVincenzo/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /为什么选择中性原子/ })).toBeInTheDocument()
  expect(screen.getByText(/超导.*离子阱.*光子/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /为什么在中性原子中选择 171Yb/ })).toBeInTheDocument()
  expect(screen.getByText(/Rb.*Cs.*Sr/)).toBeInTheDocument()
  expect(screen.getByText(/误报.*漏报/)).toBeInTheDocument()

  rerender(<OverviewPage language="en" />)
  expect(screen.getByRole('heading', { name: /How computation is embodied in a physical system/ })).toBeInTheDocument()
  expect(screen.getByText(/superconducting.*trapped-ion.*photonic/i)).toBeInTheDocument()
  expect(screen.getByText(/false positives.*false negatives/i)).toBeInTheDocument()
})
