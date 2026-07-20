import { render, screen, within } from '@testing-library/react'
import type { ArticleSection as ArticleSectionData } from '../../types/content'
import ArticleSection from './ArticleSection'

const section: ArticleSectionData = {
  id: 'rabi-model',
  title: { zh: 'Rabi 动力学', en: 'Rabi dynamics' },
  body: {
    zh: '共振驱动在计算态与激发态之间产生相干振荡。',
    en: 'Resonant driving creates coherent oscillation between computational and excited states.',
  },
  equation: String.raw`P_r(t)=\sin^2(\Omega t/2)`,
  research: {
    principle: { zh: '旋转框架哈密顿量把场幅、相位和失谐映射为 Bloch 球旋转。', en: 'The rotating-frame Hamiltonian maps field amplitude, phase and detuning to Bloch-sphere rotation.' },
    equations: [{ expression: String.raw`H/\hbar=\Omega\sigma_x/2-\Delta\sigma_z/2`, explanation: { zh: 'Ω 控制横向旋转，Δ 控制轴倾斜。', en: 'Omega sets transverse rotation and detuning tilts the axis.' } }],
    instruments: [{ name: { zh: 'AWG 与光电二极管', en: 'AWG and photodiode' }, role: { zh: '产生并监测脉冲', en: 'Generate and monitor pulses' }, measures: { zh: '幅度、延迟和过冲', en: 'Amplitude, delay and overshoot' } }],
    procedure: [{ zh: '低功率扫描共振中心。', en: 'Scan the resonance center at low power.' }, { zh: '固定失谐并扫描脉冲时间。', en: 'Fix detuning and scan pulse duration.' }],
    outputs: [{ zh: 'Rabi 频率及置信区间。', en: 'Rabi frequency with confidence interval.' }],
    milestone: { zh: '可重复的 π 脉冲', en: 'Repeatable pi pulse' },
    acceptance: [{ zh: '跨站点 Rabi 偏差低于项目预算。', en: 'Site Rabi spread remains below the project budget.' }],
    theoryToExperiment: { zh: '理论交付完整脉冲模型和下一项区分性扫描。', en: 'Theory delivers the complete pulse model and next discriminating scan.' },
  },
}

const explainedSection = {
  ...section,
  equationNote: {
    zh: '该式给出共振两能级近似下的激发态布居；Omega 是 Rabi 角频率，t 是脉冲时长，忽略衰减与失谐。',
    en: 'This gives excited-state population in the resonant two-level approximation; Omega is the Rabi angular frequency and t is pulse duration, while decay and detuning are omitted.',
  },
} as ArticleSectionData

const causalSection = {
  id: 'physical-output',
  title: { zh: '物理输出', en: 'Physical output' },
  question: { zh: '为什么计算必须产生物理输出？', en: 'Why is a physical output required?' },
  answer: {
    zh: '计算必须以可独立检验的记录结束。',
    en: 'A computation must end in an independently testable record.',
  },
  reasoning: [
    { zh: '输入必须由物理状态表示。', en: 'An input must be represented by a physical state.' },
    { zh: '允许操作必须改变这一表示。', en: 'Allowed operations must transform that representation.' },
    { zh: '输出记录必须支持预先定义的验收。', en: 'The output record must support a predeclared acceptance test.' },
  ],
  equation: {
    expression: String.raw`y=f(x)`,
    role: { zh: '定义确定性输入—输出规则。', en: 'Defines a deterministic input-output rule.' },
    symbols: [{ zh: 'x 是输入，y 是输出。', en: 'x is the input and y is the output.' }],
    assumptions: [{ zh: '规则与验收条件预先给定。', en: 'The rule and acceptance criterion are fixed in advance.' }],
  },
  measurement: {
    zh: '重复输入并检查记录是否满足验收条件。',
    en: 'Repeat the input and test whether the record satisfies the acceptance criterion.',
  },
  boundary: {
    zh: '这里定义计算，不假设量子动力学。',
    en: 'This defines computation without assuming quantum dynamics.',
  },
  sources: [{
    id: 'divincenzo-2000',
    citation: 'DiVincenzo, The Physical Implementation of Quantum Computation (2000)',
    url: 'https://arxiv.org/abs/quant-ph/0002077',
  }],
  nextQuestion: {
    zh: '量子结构怎样改变这一映射？',
    en: 'What quantum structure changes this map?',
  },
} as unknown as ArticleSectionData

it('renders localized article content and a KaTeX equation without an implementation ledger', () => {
  const { container } = render(
    <ArticleSection language="en" section={section} />,
  )

  expect(screen.getByRole('heading', { name: 'Rabi dynamics' })).toBeInTheDocument()
  expect(screen.getByText(section.body!.en)).toBeInTheDocument()
  expect(container.querySelector('.katex')).toBeInTheDocument()
  expect(screen.queryByRole('complementary', { name: 'Research implementation ledger' })).not.toBeInTheDocument()
  expect(screen.queryByText('Repeatable pi pulse')).not.toBeInTheDocument()
  expect(container.querySelector('[contenteditable="true"]')).toBeNull()
}, 20000)

it('renders the physical interpretation directly below an equation', () => {
  render(<ArticleSection language="en" section={explainedSection} />)

  expect(screen.getByText(/resonant two-level approximation/)).toBeInTheDocument()
  expect(screen.getByText(/decay and detuning are omitted/)).toBeInTheDocument()
})

it('renders one causal learning section in pedagogical order', () => {
  render(<ArticleSection language="en" section={causalSection} />)

  expect(screen.getByText('Why is a physical output required?')).toBeInTheDocument()
  expect(screen.getByText('A computation must end in an independently testable record.')).toBeInTheDocument()
  expect(within(screen.getByRole('list', { name: 'Reasoning steps' })).getAllByRole('listitem')).toHaveLength(3)
  expect(screen.getByText('What quantum structure changes this map?')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /DiVincenzo/ })).toHaveAttribute(
    'href',
    expect.stringContaining('quant-ph/0002077'),
  )
})
