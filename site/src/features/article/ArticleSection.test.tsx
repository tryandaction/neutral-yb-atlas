import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
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

it('renders localized article content and a KaTeX equation without an implementation ledger', () => {
  const { container } = render(
    <ArticleSection language="en" section={section} editing={false} onChange={() => undefined} />,
  )

  expect(screen.getByRole('heading', { name: 'Rabi dynamics' })).toBeInTheDocument()
  expect(screen.getByText(section.body.en)).toBeInTheDocument()
  expect(container.querySelector('.katex')).toBeInTheDocument()
  expect(screen.queryByRole('complementary', { name: 'Research implementation ledger' })).not.toBeInTheDocument()
  expect(screen.queryByText('Repeatable pi pulse')).not.toBeInTheDocument()
})

it('emits edited plain text on blur', () => {
  const onChange = vi.fn()
  render(<ArticleSection language="zh" section={section} editing onChange={onChange} />)
  const editor = screen.getByRole('textbox', { name: '编辑 Rabi 动力学' })

  editor.textContent = '更新后的正文'
  fireEvent.blur(editor)

  expect(onChange).toHaveBeenCalledWith('rabi-model', '更新后的正文')
})

it('offers a block-level restore action only when an override exists', () => {
  const onReset = vi.fn()
  const { rerender } = render(
    <ArticleSection
      language="zh"
      section={section}
      editing
      override="误编辑内容"
      onChange={() => undefined}
      onReset={onReset}
    />,
  )

  fireEvent.click(screen.getByRole('button', { name: '恢复“Rabi 动力学”默认正文' }))
  expect(onReset).toHaveBeenCalledWith('rabi-model')

  rerender(
    <ArticleSection
      language="zh"
      section={section}
      editing
      onChange={() => undefined}
      onReset={onReset}
    />,
  )
  expect(screen.queryByRole('button', { name: '恢复“Rabi 动力学”默认正文' })).not.toBeInTheDocument()
})
