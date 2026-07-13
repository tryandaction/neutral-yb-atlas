import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import KnowledgeMap from './KnowledgeMap'

it('exposes chapter dependencies, outputs and the theory-experiment feedback loop', async () => {
  const user = userEvent.setup()
  render(<KnowledgeMap language="zh" mode="guided" />)

  expect(screen.getByRole('heading', { name: 'Yb 中性原子计算交互知识图谱' })).toBeInTheDocument()
  expect(screen.getAllByRole('button', { name: /节点/ })).toHaveLength(7)

  await user.click(screen.getByRole('button', { name: '节点 06 理论闭环' }))
  expect(screen.getByRole('heading', { name: '理论如何服务实验落地' })).toBeInTheDocument()
  expect(screen.getByText('实验数据 → 参数反演 → 可证伪预测')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '进入理论闭环章节' })).toHaveAttribute('href', '#theory-experiment-loop')
})
