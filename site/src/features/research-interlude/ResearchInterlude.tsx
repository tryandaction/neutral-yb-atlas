import gateDurationEvidence from '../../../assets/gate-duration-evidence.png'
import gateMechanismDiagnostics from '../../../assets/gate-mechanism-diagnostics.png'
import logicalChannelSchedule from '../../../assets/logical-channel-schedule.png'
import type { Language } from '../../types/content'
import './research-interlude.css'

type InterludeKind = 'logical' | 'mechanism' | 'waveform'

interface ResearchInterludeProps {
  kind: InterludeKind
  language: Language
}

const entries = {
  mechanism: {
    image: gateMechanismDiagnostics,
    id: 'gate-mechanism-figure',
    alt: { zh: '阻塞门机制诊断', en: 'Blockade-gate mechanism diagnostics' },
    label: 'GATE / MECHANISM DIAGNOSTICS',
    title: { zh: '阻塞不是单一数值，而是三条可测的失效曲线', en: 'Blockade is not one number but three measurable failure curves' },
    body: {
      zh: '从左到右，图中把有限阻塞下的泄漏、绝热斜坡条件与 dressing 散射代价放进同一推理框架。它的作用不是给出可直接引用的最终指标，而是规定实验应扫描哪些变量、理论应返回哪些灵敏度。',
      en: 'From left to right, this diagnostic places finite-blockade leakage, adiabatic-ramp conditions and dressing-scattering cost in one reasoning frame. It is not a final number to quote; it defines which variables the experiment must scan and which sensitivities theory must return.',
    },
    details: [
      { zh: '输入', en: 'Input', zhValue: '相互作用、驱动、衰减与斜坡时间', enValue: 'Interaction, drive, decay and ramp time' },
      { zh: '输出', en: 'Output', zhValue: '安全工作区与失效边界', enValue: 'Safe operating region and failure boundary' },
      { zh: '证据状态', en: 'Evidence status', zhValue: '模型诊断；需由原子数据锁定', enValue: 'Model diagnostic; must be locked by atom data' },
    ],
  },
  waveform: {
    image: gateDurationEvidence,
    id: 'gate-waveform-figure',
    alt: { zh: '门时长与源波形证据', en: 'Gate-duration and source-waveform evidence' },
    label: 'CONTROL / WAVEFORM HANDOFF',
    title: { zh: '一条可下发的门波形，必须同时锁定时间、幅度与相位', en: 'A deployable gate waveform must lock time, amplitude and phase together' },
    body: {
      zh: '左图保留源波形与锁定时长，右图把 Rabi 频率映射到理想门时长候选。实验接收的不是论文中的图像，而是经过硬件滤波、单位校准、时钟对齐并附带失效条件的波形文件。',
      en: 'The left panel retains a source waveform and locked duration; the right maps Rabi rate to ideal gate-duration candidates. The laboratory receives neither a paper image nor an abstract pulse, but a hardware-filtered, unit-calibrated, clock-aligned waveform with explicit failure conditions.',
    },
    details: [
      { zh: '输入', en: 'Input', zhValue: '锁定频率、AWG 采样与链路响应', enValue: 'Locked frequency, AWG sampling and chain response' },
      { zh: '输出', en: 'Output', zhValue: '可复现的波形与门时长窗口', enValue: 'Reproducible waveform and gate-duration window' },
      { zh: '验收', en: 'Acceptance', zhValue: '滤波后原子响应与预测一致', enValue: 'Filtered atomic response agrees with prediction' },
    ],
  },
  logical: {
    image: logicalChannelSchedule,
    id: 'logical-channel-figure',
    alt: { zh: '逻辑门通道与调度代价', en: 'Logical gate-channel and schedule cost' },
    label: 'CHANNEL / SCHEDULE / LOGICAL LAYER',
    title: { zh: '物理门一旦进入调度，误差与时间必须同时结算', en: 'Once physical gates enter a schedule, error and time must be costed together' },
    body: {
      zh: '这组结构比较把门通道风险和风险—时间乘积放在同一横轴上。它用于检查链式、环形与稀疏高连接调度的相对趋势；曲线是脚手架模型，不能替代由真实门通道、移动时间和相关噪声驱动的逻辑仿真。',
      en: 'This structural comparison places gate-channel risk and the risk–time product on a shared size axis. It tests relative trends for chain, ring and sparse high-connectivity schedules. The curves are a scaffold model, not a substitute for logical simulation driven by measured gate channels, motion time and correlated noise.',
    },
    details: [
      { zh: '输入', en: 'Input', zhValue: '门通道、并行冲突与周期时间', enValue: 'Gate channels, parallel conflicts and cycle time' },
      { zh: '输出', en: 'Output', zhValue: '轮次风险与调度代价趋势', enValue: 'Round-risk and schedule-cost trends' },
      { zh: '边界', en: 'Boundary', zhValue: '仅作结构比较，不作阈值外推', enValue: 'Structural comparison only; no threshold extrapolation' },
    ],
  },
} as const

export default function ResearchInterlude({ kind, language }: ResearchInterludeProps) {
  const entry = entries[kind]

  return (
    <section className={`research-interlude research-interlude--${kind}`} id={entry.id}>
      <div className="research-interlude__copy">
        <span>{entry.label}</span>
        <h2>{entry.title[language]}</h2>
        <p>{entry.body[language]}</p>
        <dl>
          {entry.details.map((detail) => (
            <div key={detail.en}>
              <dt>{detail[language]}</dt>
              <dd>{language === 'zh' ? detail.zhValue : detail.enValue}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figure>
        <img src={entry.image} alt={entry.alt[language]} loading="lazy" />
        <figcaption>
          {language === 'zh'
            ? '工作区数值研究输出；用于方法与验收设计，不替代源锁定实验参数。'
            : 'Workspace numerical output for method and acceptance design; not a substitute for source-locked experimental parameters.'}
        </figcaption>
      </figure>
    </section>
  )
}
