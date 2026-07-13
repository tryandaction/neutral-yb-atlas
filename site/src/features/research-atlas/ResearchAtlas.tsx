import { Maximize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import blockadeModel from '../../../assets/research-blockade-model.png'
import logicalSchedule from '../../../assets/research-logical-schedule.png'
import noiseResponse from '../../../assets/research-noise-response.png'
import pulseOptimization from '../../../assets/research-pulse-optimization.png'
import type { Language } from '../../types/content'
import './research-atlas.css'

interface ResearchAtlasProps {
  language: Language
}

const figures = [
  {
    id: 'noise',
    image: noiseResponse,
    tab: { zh: '噪声响应', en: 'Noise response' },
    title: { zh: '从实测噪声谱到控制代价', en: 'From measured noise spectra to control cost' },
    description: {
      zh: '把激光频率、强度与运动噪声写成谱密度，再与控制脉冲的响应函数重叠。图中曲线是方法学示例，用来说明如何把“稳定激光”转化为可优化、可验收的频域指标。',
      en: 'Represent laser-frequency, intensity and motional noise as spectral densities, then overlap them with the control response. These curves are methodological examples showing how “stable lasers” becomes an optimizable and testable frequency-domain requirement.',
    },
    question: { zh: '实验要交付什么？', en: 'What must the experiment deliver?' },
    answer: { zh: '带单位、带校准链和不确定度的 PSD，而不是单个线宽。', en: 'A calibrated PSD with units and uncertainty, not one linewidth number.' },
  },
  {
    id: 'blockade',
    image: blockadeModel,
    tab: { zh: '阻塞模型', en: 'Blockade model' },
    title: { zh: '阻塞比如何进入泄漏与门时间', en: 'How blockade ratio sets leakage and gate time' },
    description: {
      zh: '双原子全基模型把有限阻塞、Rydberg 占据和门时长放在同一参数扫描中。它是选择原子间距、Rabi 频率和脉冲形状的第一层筛选器，但不能替代真实多通道相互作用张量。',
      en: 'A full-basis two-atom model scans finite blockade, Rydberg population and gate duration together. It is the first filter for spacing, Rabi rate and pulse shape, but it cannot replace a source-locked multichannel interaction tensor.',
    },
    question: { zh: '理论要交付什么？', en: 'What must theory deliver?' },
    answer: { zh: '工作区间、灵敏度和失效边界，而不是孤立最优点。', en: 'Operating regions, sensitivities and failure boundaries, not an isolated optimum.' },
  },
  {
    id: 'pulse',
    image: pulseOptimization,
    tab: { zh: '脉冲优化', en: 'Pulse optimization' },
    title: { zh: '从目标门到可下发波形', en: 'From target gate to deployable waveform' },
    description: {
      zh: '优化历史、相位控制和幅度包络必须一起保存。硬件带宽、采样率、相位连续性和功率上限要在优化中显式出现，随后用 AWG 输出和原子响应完成闭环验证。',
      en: 'Optimization history, phase control and amplitude envelope must be retained together. Hardware bandwidth, sample rate, phase continuity and power limits belong inside the objective, followed by closed-loop verification with AWG output and atomic response.',
    },
    question: { zh: '什么时候可以下发？', en: 'When is it deployable?' },
    answer: { zh: '滤波后波形仍通过分布鲁棒性与泄漏验收。', en: 'When the filtered waveform still passes robustness and leakage acceptance.' },
  },
  {
    id: 'logical',
    image: logicalSchedule,
    tab: { zh: '逻辑调度', en: 'Logical scheduling' },
    title: { zh: '物理门约束怎样传播到纠错周期', en: 'How physical-gate constraints propagate to QEC cycles' },
    description: {
      zh: '门距离、冲突着色层数与校验度共同决定周期时间和吞吐。逻辑层不能只读取平均门保真度，还需要位置已知的擦除、相关错误、移动时间、测量延迟与并行串扰。',
      en: 'Gate distance, conflict-color layers and check degree jointly set cycle time and throughput. The logical layer needs more than average gate fidelity: it also needs located erasures, correlations, motion time, measurement latency and parallel crosstalk.',
    },
    question: { zh: '架构结论何时可信？', en: 'When is an architecture claim credible?' },
    answer: { zh: '通道定义和调度输入均由实验基线锁定之后。', en: 'After channel definitions and schedule inputs are locked to experimental baselines.' },
  },
] as const

export default function ResearchAtlas({ language }: ResearchAtlasProps) {
  const [selectedId, setSelectedId] = useState<(typeof figures)[number]['id']>('noise')
  const [zoomOpen, setZoomOpen] = useState(false)
  const selected = figures.find((figure) => figure.id === selectedId) ?? figures[0]

  useEffect(() => {
    if (!zoomOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setZoomOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [zoomOpen])

  return (
    <section className="research-atlas" id="research-atlas">
      <header className="research-atlas__header">
        <span>MODEL / MEASUREMENT / DECISION</span>
        <h2>{language === 'zh' ? '理论—实验视觉图谱' : 'Theory–experiment visual atlas'}</h2>
        <p>
          {language === 'zh'
            ? '四类工作区产物展示从物理模型到实验决策、再到逻辑架构的证据链。点击切换，图像保留原始坐标与诊断结构。'
            : 'Four workspace artifacts expose the evidence chain from physical models to experimental decisions and logical architecture. Switch views while preserving the original axes and diagnostic structure.'}
        </p>
      </header>

      <div className="research-atlas__tabs" role="tablist" aria-label={language === 'zh' ? '科研图谱类别' : 'Research atlas category'}>
        {figures.map((figure, index) => (
          <button
            key={figure.id}
            type="button"
            role="tab"
            id={`atlas-tab-${figure.id}`}
            aria-controls={`atlas-panel-${figure.id}`}
            aria-selected={selected.id === figure.id}
            tabIndex={selected.id === figure.id ? 0 : -1}
            onClick={() => {
              setSelectedId(figure.id)
              setZoomOpen(false)
            }}
          >
            <span>0{index + 1}</span>
            {figure.tab[language]}
          </button>
        ))}
      </div>

      <div className="research-atlas__panel" role="tabpanel" id={`atlas-panel-${selected.id}`} aria-labelledby={`atlas-tab-${selected.id}`}>
        <figure>
          <img src={selected.image} alt={selected.title[language]} loading="lazy" />
          <button
            type="button"
            className="research-atlas__zoom"
            aria-label={language === 'zh' ? '放大当前科研图' : 'Enlarge current research figure'}
            title={language === 'zh' ? '放大科研图' : 'Enlarge figure'}
            onClick={() => setZoomOpen(true)}
          >
            <Maximize2 aria-hidden="true" />
          </button>
          <figcaption>{language === 'zh' ? '工作区数值研究输出 · 诊断图，不作为源锁定实验数据' : 'Workspace numerical output · diagnostic figure, not source-locked experimental data'}</figcaption>
        </figure>
        <aside>
          <span>{selected.tab[language]}</span>
          <h3>{selected.title[language]}</h3>
          <p>{selected.description[language]}</p>
          <div>
            <b>{selected.question[language]}</b>
            <strong>{selected.answer[language]}</strong>
          </div>
        </aside>
      </div>

      {zoomOpen && (
        <div className="research-atlas__lightbox" role="dialog" aria-modal="true" aria-label={language === 'zh' ? '科研图放大视图' : 'Enlarged research figure'}>
          <button
            type="button"
            aria-label={language === 'zh' ? '关闭放大视图' : 'Close enlarged view'}
            title={language === 'zh' ? '关闭' : 'Close'}
            onClick={() => setZoomOpen(false)}
          >
            <X aria-hidden="true" />
          </button>
          <img src={selected.image} alt={selected.title[language]} />
          <p>{selected.title[language]}</p>
        </div>
      )}
    </section>
  )
}
