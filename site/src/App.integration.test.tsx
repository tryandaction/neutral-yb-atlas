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
  expect(screen.getByRole('heading', { name: '实验装置、周期与放行验收' })).toBeInTheDocument()
}, 30000)

it('exposes the interactive theory-to-experiment research atlas', async () => {
  window.history.replaceState(null, '', '#/evidence')
  render(<App />)

  expect(
    await screen.findByText(
      '理论—实验视觉图谱',
      { selector: 'h2' },
      { timeout: 20000 },
    ),
  ).toBeInTheDocument()
  const defaultTab = screen.getByText('噪声响应', { selector: 'button' })
  expect(defaultTab).toHaveAttribute('role', 'tab')
  expect(defaultTab).toHaveAttribute('aria-selected', 'true')
}, 30000)

it('switches among the chapter-scale research figures in the evidence atlas', async () => {
  window.history.replaceState(null, '', '#/evidence')
  const user = userEvent.setup()
  render(<App />)

  expect(await screen.findByAltText('从实测噪声谱到控制代价', {}, { timeout: 20000 })).toBeInTheDocument()
  await user.click(screen.getByRole('tab', { name: /阻塞模型/ }))
  expect(screen.getByAltText('阻塞比如何进入泄漏与门时间')).toBeInTheDocument()
  await user.click(screen.getByRole('tab', { name: /逻辑调度/ }))
  expect(screen.getByAltText('物理门约束怎样传播到纠错周期')).toBeInTheDocument()
}, 30000)

it('opens the research workspace, saves a note and exports it', async () => {
  window.history.replaceState(null, '', '#/')
  localStorage.clear()
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByLabelText('打开研究工作区'))
  await user.type(screen.getByLabelText('研究笔记'), '检查 302 nm 指向噪声。')
  await user.click(screen.getByRole('button', { name: '导出 JSON' }))

  expect(
    (screen.getByLabelText('工作区 JSON') as HTMLTextAreaElement).value,
  ).toContain('检查 302 nm 指向噪声。')
}, 120000)

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
