import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExperimentPipeline from './ExperimentPipeline'
import FirstPrinciplesTree from './FirstPrinciplesTree'
import ResearchEcosystem from './ResearchEcosystem'
import RydbergGateTutor from './RydbergGateTutor'
import YbEnergyTutor from './YbEnergyTutor'

it('switches first-principles lenses and follows the physical-carrier deduction', async () => {
  const user = userEvent.setup()
  render(<FirstPrinciplesTree language="zh" />)

  expect(screen.getByRole('heading', { name: '第一性原理演绎树' })).toBeInTheDocument()
  await user.click(screen.getByText('从物理载体出发', { selector: 'span' }).closest('button')!)
  await user.click(screen.getByText('按需相互作用', { selector: 'strong' }).closest('button')!)
  expect(screen.getByRole('heading', { name: '弱耦合存储，强耦合执行门' })).toBeInTheDocument()
  expect(screen.getByText(/基态近似独立.*Rydberg/)).toBeInTheDocument()
  expect(screen.getByText(/双原子谱.*条件相位/)).toBeInTheDocument()
})

it('links each Yb transition to its role, observable and laboratory hardware', async () => {
  const user = userEvent.setup()
  render(<YbEnergyTutor language="zh" />)

  expect(screen.getByRole('heading', { name: 'Yb 能级与实验通道教学图' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: /171Yb 教学能级图/ })).toHaveAttribute('viewBox', '0 0 720 410')
  await user.click(screen.getByRole('button', { name: /578 nm 钟跃迁/ }))
  expect(screen.getByText('超窄线宽相干控制与钟态接口')).toBeInTheDocument()
  expect(screen.getByText(/超稳腔|钟激光/)).toBeInTheDocument()
})

it('steps through blockade, conditional phase and return to the computational subspace', async () => {
  const user = userEvent.setup()
  render(<RydbergGateTutor language="zh" />)

  expect(screen.getByRole('heading', { name: 'Rydberg 阻塞 CZ 的逐步教学图' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /03 条件相位/ }))
  expect(screen.getByRole('heading', { name: '条件相位累积' })).toBeInTheDocument()
  expect(screen.getByText(/V.*Ω.*有限阻塞/)).toBeInTheDocument()
})

it('steps through the full apparatus pipeline and exposes acceptance evidence', async () => {
  const user = userEvent.setup()
  render(<ExperimentPipeline language="zh" />)

  expect(screen.getByRole('heading', { name: '从原子炉到逻辑测量的实验全流程' })).toBeInTheDocument()
  expect(screen.getByLabelText(/Equation: P=Q/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '操作序列' })).toBeInTheDocument()
  expect(screen.getByText(/分区烘烤并记录温度、压力和 RGA/)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Rydberg 门/ }))
  expect(screen.getByRole('heading', { name: 'Rydberg 光谱、阻塞与纠缠门' })).toBeInTheDocument()
  expect(screen.getByText(/单原子 Rabi.*双原子阻塞.*Bell/)).toBeInTheDocument()
  expect(screen.getByText(/门末返回计算子空间/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /04.*重排/ }))
  expect(screen.getByLabelText(/Equation:.*S_x/)).toBeInTheDocument()
  expect(screen.getByText(/移动后立即复核成像与温度/)).toBeInTheDocument()
})

it('maps research domains to concrete handoff artifacts', async () => {
  const user = userEvent.setup()
  render(<ResearchEcosystem language="zh" />)

  expect(screen.getByRole('heading', { name: 'Yb 中性原子计算科研生态图' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /理论与数值建模/ }))
  expect(screen.getByText(/哈密顿量版本|误差预算|波形文件/)).toBeInTheDocument()
})
