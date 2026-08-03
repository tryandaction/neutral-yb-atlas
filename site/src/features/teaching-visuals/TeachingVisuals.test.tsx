import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExperimentPipeline from './ExperimentPipeline'
import FirstPrinciplesTree from './FirstPrinciplesTree'
import GateCircuitAtlas from './GateCircuitAtlas'
import ResearchEcosystem from './ResearchEcosystem'
import RydbergGateTutor from './RydbergGateTutor'
import YbEnergyTutor from './YbEnergyTutor'

it('renders the English gate grammar with standard circuit examples', () => {
  render(<GateCircuitAtlas language="en" scope="foundations" />)

  expect(screen.getByRole('heading', { name: 'From bit gates to executable computation' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Reversible half-adder circuit' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Bell-state preparation circuit' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'CZ and local Hadamards implement CNOT' })).toBeInTheDocument()
  expect(screen.getByText('CNOT = (I ⊗ H) CZ (I ⊗ H)')).toBeInTheDocument()
})

it('renders the Chinese circuit atlas without falling back to English copy', () => {
  render(<GateCircuitAtlas language="zh" scope="foundations" />)

  expect(screen.getByRole('heading', { name: '从比特门到可执行计算' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '经典：保留输入的可逆半加器' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '量子：H 与 CNOT 制备 Bell 态' })).toBeInTheDocument()
})

it('renders the English syndrome-extraction circuit and decoder lookup', () => {
  render(<GateCircuitAtlas language="en" scope="fault" />)

  expect(screen.getByRole('heading', { name: 'From parity checks to a correction decision' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Three-qubit bit-flip syndrome extraction circuit' })).toBeInTheDocument()
  expect(screen.getByText(/s12 = q1 ⊕ q2/)).toBeInTheDocument()
  expect(screen.getByText('00: no X error')).toBeInTheDocument()
})

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

it.skip('legacy step selector was intentionally replaced by a fixed mechanism map', async () => {
  const user = userEvent.setup()
  render(<RydbergGateTutor language="zh" />)

  expect(screen.getByRole('heading', { name: 'Rydberg 阻塞 CZ 的逐步教学图' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /03 条件相位/ }))
  expect(screen.getByRole('heading', { name: '条件相位累积' })).toBeInTheDocument()
  expect(screen.getByText(/V.*Ω.*有限阻塞/)).toBeInTheDocument()
})

it.skip('superseded static Rydberg atlas', () => {
  render(<RydbergGateTutor language="en" />)

  expect(screen.getByRole('heading', { name: 'From a switchable interaction to a two-qubit logic gate' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'The Förster defect selects R^-3 or R^-6 behavior' })).toBeInTheDocument()
  expect(screen.getByText(/10\^12 contrast/)).toBeInTheDocument()
  expect(screen.getByText(/diag\(1, -1, -1, -1\)/)).toBeInTheDocument()
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
})

it.skip('superseded Rydberg mechanism-map interaction', async () => {
  const user = userEvent.setup()
  render(<RydbergGateTutor language="en" />)

  expect(screen.getByRole('heading', { name: 'Rydberg blockade: from interaction switch to CZ' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: /Blockade changes the path/ })).toBeInTheDocument()
  expect(screen.getByText(/three-pulse sequence first gives diag/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /Pair-state shift/ }))
  expect(screen.getByRole('img', { name: /Dipole coupling shifts/ })).toBeInTheDocument()
  expect(screen.getByText(/Saffman Fig. 9/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /Blockade sequence/ }))
  expect(screen.getByRole('img', { name: /Blockade changes the path/ })).toBeInTheDocument()
})

it.skip('superseded abstract blockade timeline', async () => {
  const user = userEvent.setup()
  render(<RydbergGateTutor language="en" />)

  expect(screen.getByRole('heading', { name: 'Rydberg-blockade CZ: trace one input state' })).toBeInTheDocument()
  expect(screen.getByText('|rr⟩ detuned by B: blocked')).toBeInTheDocument()
  expect(screen.getByText('Raw blockade sequence')).toBeInTheDocument()
  expect(screen.getByText('Compensate the two known local Z phases')).toBeInTheDocument()

  const zeroOne = screen.getByRole('button', { name: /\|01⟩/ })
  await user.click(zeroOne)
  expect(zeroOne).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByText('resonant 2π: phase −1')).toBeInTheDocument()
  expect(screen.getByText(/target \|1⟩ completes a 2π loop/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /\|10⟩/ }))
  expect(screen.getAllByText('−i|r0⟩')).toHaveLength(2)
  expect(screen.getByText(/two control π pulses together leave a −1 phase/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /\|00⟩/ }))
  expect(screen.getByText('Neither qubit has a driven |1⟩ component')).toBeInTheDocument()
})

it('contrasts blocked and unblocked |11> pair-state dynamics', async () => {
  const user = userEvent.setup()
  render(<RydbergGateTutor language="en" />)

  expect(screen.getByRole('heading', { name: 'How Rydberg blockade produces CZ' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'What does blockade change?' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Rydberg pair-state dynamics for input |11> with blockade' })).toBeInTheDocument()
  expect(screen.getByText(/Interaction energy B moves \|rr> off resonance/)).toBeInTheDocument()

  const noBlockade = screen.getByRole('button', { name: 'Without blockade' })
  await user.click(noBlockade)
  expect(noBlockade).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('img', { name: 'Rydberg pair-state dynamics for input |11> without blockade' })).toBeInTheDocument()
  expect(screen.getAllByText(/two-atom evolution factorizes/)).toHaveLength(1)

  const zeroOne = screen.getByRole('button', { name: /\|01⟩/ })
  await user.click(zeroOne)
  expect(zeroOne).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('img', { name: 'Rydberg pair-state dynamics for input |01>' })).toBeInTheDocument()
  expect(screen.getByText(/target atom follows the one-atom/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /\|10⟩/ }))
  expect(screen.getByRole('img', { name: 'Rydberg pair-state dynamics for input |10>' })).toBeInTheDocument()
  expect(screen.getByText(/control atom follows the one-atom/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /\|00⟩/ }))
  expect(screen.getByRole('img', { name: 'Rydberg pair-state dynamics for input |00>' })).toBeInTheDocument()
  expect(screen.getByText(/no \|1> component driven by the gate light/)).toBeInTheDocument()
})

it('steps through the full apparatus pipeline and exposes acceptance evidence', async () => {
  const user = userEvent.setup()
  render(<ExperimentPipeline language="zh" />)

  expect(screen.getByRole('heading', { name: '从原子炉到逻辑测量的实验全流程' })).toBeInTheDocument()
  expect(screen.getByLabelText(/Equation: P=Q/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '操作序列' })).toBeInTheDocument()
  expect(screen.getByText(/分区烘烤并记录温度、压力和 RGA/)).toBeInTheDocument()
  expect(screen.queryByText('理论任务')).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Rydberg 门/ }))
  expect(screen.getByRole('heading', { name: 'Rydberg 光谱、阻塞与纠缠门' })).toBeInTheDocument()
  expect(screen.getByText(/单原子 Rabi.*双原子阻塞.*Bell/)).toBeInTheDocument()
  expect(screen.getByText(/门末返回计算子空间/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /04.*重排/ }))
  expect(screen.getByLabelText(/Equation:.*S_x/)).toBeInTheDocument()
  expect(screen.getByText(/移动后立即复核成像与温度/)).toBeInTheDocument()
})

it('uses the complete experimental apparatus image as the pipeline visual', () => {
  render(<ExperimentPipeline language="en" />)

  expect(screen.getByAltText('Complete 171Yb apparatus path from atomic source to a reloadable computation array')).toBeInTheDocument()
  expect(document.querySelector('.apparatus-schematic')).not.toBeInTheDocument()
})

it('positions the apparatus image and explanation together when a stage is selected', async () => {
  const user = userEvent.setup()
  render(<ExperimentPipeline language="en" />)

  const viewport = screen.getByTestId('pipeline-apparatus-viewport')
  Object.defineProperty(viewport, 'scrollWidth', { configurable: true, value: 2400 })
  Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 800 })
  const scrollTo = vi.fn()
  viewport.scrollTo = scrollTo

  await user.click(screen.getByRole('button', { name: /Rydberg gate/ }))

  expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth', left: expect.any(Number) }))
  expect(screen.getByRole('heading', { name: 'Rydberg spectroscopy, blockade and entangling gates' })).toBeInTheDocument()
})

it('maps research domains to concrete handoff artifacts', async () => {
  const user = userEvent.setup()
  render(<ResearchEcosystem language="zh" />)

  expect(screen.getByRole('heading', { name: 'Yb 中性原子计算科研生态图' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /理论与数值建模/ }))
  expect(screen.getByText(/哈密顿量版本|误差预算|波形文件/)).toBeInTheDocument()
})
