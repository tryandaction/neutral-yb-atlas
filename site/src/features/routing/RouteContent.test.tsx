import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import type { RouteId } from '../../navigation/routes'
import RouteContent from './RouteContent'

const props = {
  language: 'zh' as const,
  mode: 'guided' as const,
  editing: false,
  articleOverrides: {},
  notes: {},
  completedExperimentPhases: [],
  onArticleChange: vi.fn(),
  onArticleReset: vi.fn(),
  onSaveSnapshot: vi.fn(),
  onNoteChange: vi.fn(),
  onToggleExperimentPhase: vi.fn(),
}

function renderRoute(route: RouteId) {
  return render(<RouteContent {...props} route={route} />)
}

it('keeps Yb structure and comparison in the Yb platform destination', () => {
  renderRoute('yb-platform')

  expect(screen.getByRole('heading', { name: '为什么选择镱原子' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Yb 能级与实验通道教学图' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '完整 171Yb 能级参考图' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '物种选择是一组权衡，不是排行榜' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: '实验不是器件清单，而是一条验收链' })).not.toBeInTheDocument()
})

it('orders apparatus teaching and acceptance in the experiment destination', () => {
  renderRoute('experiment')

  expect(screen.getByRole('heading', { name: '从真空系统到门标定' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '从原子炉到逻辑测量的实验全流程' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '交互实验图谱' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '实验不是器件清单，而是一条验收链' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: '为什么选择镱原子' })).not.toBeInTheDocument()
})

it('consolidates research figures and provenance in the evidence destination', () => {
  renderRoute('evidence')

  expect(screen.getByRole('heading', { name: '理论—实验视觉图谱' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Yb 中性原子计算科研生态图' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '每个数字都应知道自己从哪里来' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: '从真空系统到门标定' })).not.toBeInTheDocument()
})

it('connects fault tolerance to scale and cost in one destination', () => {
  renderRoute('fault-tolerance')

  expect(screen.getByRole('heading', { name: '从物理量子比特到容错架构' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '从物理错误预算到逻辑资源' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '规模由可执行逻辑时空体积定义' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '成本按一次可信结果归一化' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Yb 能级与实验通道教学图' })).not.toBeInTheDocument()
})
