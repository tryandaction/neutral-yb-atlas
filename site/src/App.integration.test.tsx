import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

it('exposes the interactive theory-to-experiment research atlas', async () => {
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

it('places chapter-scale research figures in the reading flow', async () => {
  render(<App />)

  expect(
    await screen.findByAltText('阻塞门机制诊断', {}, { timeout: 20000 }),
  ).toBeInTheDocument()
  expect(screen.getByAltText('门时长与源波形证据')).toBeInTheDocument()
  expect(screen.getByAltText('逻辑门通道与调度代价')).toBeInTheDocument()
}, 30000)

it('opens the research workspace, saves a note and exports it', async () => {
  localStorage.clear()
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByLabelText('打开研究工作区'))
  await user.type(screen.getByLabelText('研究笔记'), '检查 302 nm 指向噪声。')
  await user.click(screen.getByRole('button', { name: '导出 JSON' }))

  expect(
    (screen.getByLabelText('工作区 JSON') as HTMLTextAreaElement).value,
  ).toContain('检查 302 nm 指向噪声。')
}, 30000)

it('places the five interactive teaching diagrams in the research path', async () => {
  render(<App />)

  expect(await screen.findByRole('heading', { name: '第一性原理演绎树' }, { timeout: 20000 })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Yb 能级与实验通道教学图' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Rydberg 阻塞 CZ 的逐步教学图' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '从原子炉到逻辑测量的实验全流程' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Yb 中性原子计算科研生态图' })).toBeInTheDocument()
}, 30000)

it('places the complete reference map after the interactive Yb energy tutor', async () => {
  render(<App />)

  const tutor = await screen.findByRole('heading', { name: 'Yb 能级与实验通道教学图' }, { timeout: 20000 })
  const reference = screen.getByRole('heading', { name: '完整 171Yb 能级参考图' })
  expect(tutor.compareDocumentPosition(reference) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
}, 30000)

it('opens contextual Wiki entries from the loaded research content', async () => {
  const user = userEvent.setup()
  const { container } = render(<App />)

  await screen.findByText('理论—实验视觉图谱', { selector: 'h2' }, { timeout: 20000 })
  const term = container.querySelector<HTMLButtonElement>('button[aria-label="查看 Wiki：声光偏转器"]')
  expect(term).not.toBeNull()
  await user.click(term!)

  expect(await screen.findByText('声光布拉格衍射', {}, { timeout: 10000 })).toBeInTheDocument()
}, 30000)
