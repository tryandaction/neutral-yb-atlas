import { useState } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { chapters } from '../../content/chapters'
import type { Language, ReadingMode } from '../../types/content'
import './knowledge-map.css'

interface KnowledgeNodeMeta {
  id: string
  symbol: string
  area: Record<Language, string>
  input: Record<Language, string>
  output: Record<Language, string>
  feedback: Record<Language, string>
}

const nodeMeta: KnowledgeNodeMeta[] = [
  {
    id: 'quantum-foundations', symbol: '|ψ⟩', area: { zh: '公理与信息', en: 'Postulates & information' },
    input: { zh: 'Hilbert 空间、复振幅、Born 规则与张量积', en: 'Hilbert space, complex amplitudes, the Born rule and tensor products' },
    output: { zh: '计算基、目标幺正、测量记录与错误通道语言', en: 'Computational basis, target unitaries, measurement records and error-channel language' },
    feedback: { zh: '实验可观测量检验状态、门与测量模型', en: 'Laboratory observables test state, gate and measurement models' },
  },
  {
    id: 'neutral-atoms', symbol: 'U(r)', area: { zh: '物理载体', en: 'Physical carrier' },
    input: { zh: '光与物质相互作用、冷却、偶极势和成像', en: 'Light–matter interaction, cooling, dipole potentials and imaging' },
    output: { zh: '可寻址光镊阵列、占据图、重排能力与 Rydberg 阻塞', en: 'Addressable tweezer arrays, occupancy maps, rearrangement and Rydberg blockade' },
    feedback: { zh: '温度、阱频、生存和装载数据约束硬件模型', en: 'Temperature, trap frequency, survival and loading constrain the hardware model' },
  },
  {
    id: 'why-yb', symbol: 'I=½', area: { zh: '原子接口', en: 'Atomic interface' },
    input: { zh: '同位素、1S0/3P0/3P1/1P1 能级与选择定则', en: 'Isotopes, 1S0/3P0/3P1/1P1 levels and selection rules' },
    output: { zh: '核自旋编码、钟态映射、窄线冷却和擦除探测接口', en: 'Nuclear-spin encoding, clock mapping, narrow-line cooling and erasure interfaces' },
    feedback: { zh: '光谱、寿命和分支测量锁定原子参数', en: 'Spectroscopy, lifetime and branching measurements lock atomic parameters' },
  },
  {
    id: 'gates', symbol: 'C₆/R⁶', area: { zh: '条件动力学', en: 'Conditional dynamics' },
    input: { zh: '量子比特编码、Rabi 驱动、Rydberg 相互作用和脉冲约束', en: 'Qubit encoding, Rabi drive, Rydberg interaction and pulse constraints' },
    output: { zh: '条件相位、CZ 通道、泄漏、损失与擦除记录', en: 'Conditional phase, CZ channel, leakage, loss and erasure records' },
    feedback: { zh: '单原子与双原子验收决定模型层级和下一轮波形', en: 'Single- and two-atom acceptance sets the model level and next waveform' },
  },
  {
    id: 'experiment', symbol: 'x(t)', area: { zh: '工程与测量', en: 'Engineering & measurement' },
    input: { zh: '真空、激光、光学、时序、波形和理论验收协议', en: 'Vacuum, lasers, optics, timing, waveforms and theory-defined acceptance protocols' },
    output: { zh: '带时间戳的原始数据、标定、通道表征和失败分类', en: 'Timestamped raw data, calibrations, channel characterization and failure classes' },
    feedback: { zh: '测量 → 参数后验 → 新波形 → 交叉验证', en: 'Measurement → parameter posterior → new waveform → cross-validation' },
  },
  {
    id: 'theory-experiment-loop', symbol: 'ℒρ', area: { zh: '模型与反演', en: 'Model & inference' },
    input: { zh: '原子参数、实验波形、噪声谱、几何和测量判据', en: 'Atomic parameters, experimental waveforms, spectra, geometry and decision rules' },
    output: { zh: '哈密顿量、误差预算、灵敏度、硬件可执行波形与判别性测量', en: 'Hamiltonian, error budget, sensitivities, hardware-ready waveforms and discriminating measurements' },
    feedback: { zh: '实验数据 → 参数反演 → 可证伪预测', en: 'Experimental data → parameter inference → falsifiable prediction' },
  },
  {
    id: 'fault-tolerance', symbol: 'pL', area: { zh: '系统与逻辑层', en: 'System & logical layer' },
    input: { zh: '条件门通道、擦除标签、相关故障、调度时间和补原子策略', en: 'Conditional gate channels, erasure labels, correlated faults, schedule time and atom replacement' },
    output: { zh: '周期通道、解码接口、逻辑错误率、资源和扩展瓶颈', en: 'Cycle channel, decoder interface, logical error rate, resources and scaling bottlenecks' },
    feedback: { zh: '逻辑灵敏度反向确定最值得改进的物理参数', en: 'Logical sensitivity identifies the physical parameter most worth improving' },
  },
]

const chapterById = new Map(chapters.map((chapter) => [chapter.id, chapter]))

export default function KnowledgeMap({ language, mode }: { language: Language; mode: ReadingMode }) {
  const [selectedId, setSelectedId] = useState('quantum-foundations')
  const selectedMeta = nodeMeta.find((item) => item.id === selectedId) ?? nodeMeta[0]
  const selectedChapter = chapterById.get(selectedMeta.id) ?? chapters[0]
  const selectedAnchor = selectedMeta.id === 'why-yb' ? 'yb-platform' : selectedMeta.id

  return (
    <section className="knowledge-map" id="knowledge-map">
      <header className="knowledge-map__header">
        <div><span>KNOWLEDGE GRAPH / DEPENDENCIES</span><h2>{language === 'zh' ? 'Yb 中性原子计算交互知识图谱' : 'Interactive knowledge graph for Yb neutral-atom computing'}</h2></div>
        <p>{language === 'zh' ? '连线表示参数、模型和验收证据的依赖。主链把公理翻译为硬件，反馈回路把实验数据送回理论，再由逻辑层决定下一项物理改进。' : 'Edges encode dependencies among parameters, models and acceptance evidence. The main chain translates postulates into hardware; feedback returns experimental data to theory, while the logical layer prioritizes the next physical improvement.'}</p>
      </header>

      <div className="knowledge-graph" data-mode={mode}>
        <svg viewBox="0 0 1200 430" role="img" aria-label={language === 'zh' ? '七个知识节点的有向依赖和反馈回路' : 'Directed dependencies and feedback loops among seven knowledge nodes'}>
          <defs><marker id="knowledge-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" /></marker></defs>
          <path d="M180 82 H315" markerEnd="url(#knowledge-arrow)" /><path d="M455 82 H590" markerEnd="url(#knowledge-arrow)" /><path d="M730 82 H865" markerEnd="url(#knowledge-arrow)" />
          <path d="M960 132 C920 230 805 270 720 286" markerEnd="url(#knowledge-arrow)" />
          <path d="M645 315 H535" markerEnd="url(#knowledge-arrow)" /><path d="M535 338 H645" markerEnd="url(#knowledge-arrow)" />
          <path d="M795 315 H1010" markerEnd="url(#knowledge-arrow)" /><path d="M430 315 C315 270 220 180 155 132" markerEnd="url(#knowledge-arrow)" />
          <text x="215" y="66">encode</text><text x="485" y="66">specialize</text><text x="760" y="66">control</text>
          <text x="785" y="232">measure</text><text x="555" y="298">fit</text><text x="555" y="365">predict</text><text x="875" y="298">compose</text><text x="250" y="248">prioritize</text>
        </svg>

        <div className="knowledge-graph__nodes">
          {nodeMeta.map((meta, index) => {
            const chapter = chapterById.get(meta.id) ?? chapters[index]
            return (
              <button key={meta.id} type="button" data-node={meta.id} aria-label={`${language === 'zh' ? '节点' : 'Node'} ${String(chapter.number).padStart(2, '0')} ${chapter.shortTitle[language]}`} aria-pressed={selectedMeta.id === meta.id} onClick={() => setSelectedId(meta.id)}>
                <span>{String(chapter.number).padStart(2, '0')} · {meta.symbol}</span>
                <strong>{chapter.shortTitle[language]}</strong>
                <small>{meta.area[language]}</small>
              </button>
            )
          })}
        </div>
      </div>

      <article className="knowledge-detail" aria-live="polite">
        <header><span>{String(selectedChapter.number).padStart(2, '0')} / {selectedMeta.symbol}</span><div><small>{selectedMeta.area[language]}</small><h3>{selectedChapter.title[language]}</h3><p>{selectedChapter.question[language]}</p></div></header>
        <dl>
          <div><dt>{language === 'zh' ? '前置输入' : 'Required input'}</dt><dd>{selectedMeta.input[language]}</dd></div>
          <div><dt>{language === 'zh' ? '标准输出' : 'Standard output'}</dt><dd>{selectedMeta.output[language]}</dd></div>
          <div><dt>{language === 'zh' ? '反馈回路' : 'Feedback loop'}</dt><dd>{selectedMeta.feedback[language]}</dd></div>
        </dl>
        <a href={`#${selectedAnchor}`} aria-label={`${language === 'zh' ? '进入' : 'Open'}${selectedChapter.shortTitle[language]}${language === 'zh' ? '章节' : ' chapter'}`}>
          {language === 'zh' ? `进入${selectedChapter.shortTitle.zh}章节` : `Open ${selectedChapter.shortTitle.en} chapter`}<ArrowDownRight aria-hidden="true" />
        </a>
      </article>
    </section>
  )
}
