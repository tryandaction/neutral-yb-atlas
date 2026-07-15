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
