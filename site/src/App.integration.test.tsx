import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

it('renders the causal overview at the root destination', async () => {
  window.history.replaceState(null, '', '#/')
  render(<App />)

  expect(await screen.findByRole('heading', { name: '中性 Yb 原子计算' }, { timeout: 20000 })).toBeInTheDocument()
})

it('renders a continuous atlas and lands legacy deep links on their page section', async () => {
  window.history.replaceState(null, '', '#/experiment')
  render(<App />)

  expect(await screen.findByRole('heading', { name: '中性 Yb 原子计算' }, { timeout: 20000 })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '实验系统' })).toHaveAttribute('aria-current', 'page')
  expect(screen.getByRole('link', { name: '实验系统' })).toHaveAttribute('href', '#domain-experiment')
  expect(await screen.findByRole('heading', { name: '中性原子与 171Yb 平台' }, { timeout: 20000 })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '实验系统：从装置到可观察的物理过程' })).toBeInTheDocument()
}, 30000)

it('provides further reading grouped by learning topic', async () => {
  window.history.replaceState(null, '', '#/evidence')
  render(<App />)

  expect(await screen.findByRole('heading', { name: '延伸阅读与出处', level: 1 }, { timeout: 20000 })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '原子与能级' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Ytterbium Nuclear-Spin Qubits/ })).toBeInTheDocument()
  expect(document.querySelector('.evidence-table')).not.toBeInTheDocument()
}, 30000)

it('does not expose a research workspace', async () => {
  window.history.replaceState(null, '', '#/')
  render(<App />)

  await screen.findByRole('heading', { name: '中性 Yb 原子计算' }, { timeout: 20000 })
  expect(screen.queryByLabelText('打开研究工作区')).not.toBeInTheDocument()
  expect(document.querySelector('.workspace-drawer')).not.toBeInTheDocument()
}, 30000)

it('places the complete reference map after the interactive Yb energy tutor', async () => {
  window.history.replaceState(null, '', '#/yb-platform')
  render(<App />)

  const tutor = await screen.findByRole('heading', { name: 'Yb 能级与实验通道教学图' }, { timeout: 20000 })
  const reference = screen.getByRole('heading', { name: '完整 171Yb 能级参考图' })
  expect(tutor.compareDocumentPosition(reference) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
}, 30000)

it('opens contextual Wiki entries from the loaded research content', async () => {
  window.history.replaceState(null, '', '#/experiment')
  const user = userEvent.setup()
  render(<App />)

  await screen.findByRole('heading', { name: '从原子炉到逻辑测量的实验全流程' }, { timeout: 20000 })
  const experimentDomain = within(document.getElementById('domain-experiment') as HTMLElement)
  await user.click(experimentDomain.getByRole('button', { name: /^04重排$/ }))
  await user.click(experimentDomain.getAllByRole('button', { name: '查看 Wiki：声光偏转器' })[0])

  expect(await screen.findByRole('heading', { name: '声光偏转器' }, { timeout: 30000 })).toBeInTheDocument()
}, 90000)
