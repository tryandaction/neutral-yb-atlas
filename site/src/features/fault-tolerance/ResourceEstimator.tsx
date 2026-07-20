import { useMemo, useState } from 'react'
import type { Language } from '../../types/content'
import { assessErasureConversion, estimateResources, type ErasureAssessmentInput, type ResourceEstimateInput } from './model'
import './fault-tolerance.css'

const initialInput: ResourceEstimateInput = {
  physicalError: 0.001,
  threshold: 0.01,
  logicalOperations: 1_000_000,
  failureBudget: 0.01,
}

const initialErasureInput: ErasureAssessmentInput = {
  totalFaultRate: 0.005,
  convertibleFraction: 0.75,
  flagRecall: 0.95,
  falseFlagRate: 0.0002,
  baseCycleUs: 10,
  detectionOverheadUs: 2,
  memoryErrorPerUs: 0.00003,
}

const erasureStatusCopy = {
  candidate: { zh: '条件性优势', en: 'Conditional advantage' },
  'no-conversion': { zh: '没有可定位增益', en: 'No located-information gain' },
  'record-contaminated': { zh: '误报污染记录', en: 'False flags contaminate the record' },
  'overhead-dominated': { zh: '检测开销占主导', en: 'Overhead dominates' },
} as const

function scientific(value: number): string {
  return value.toExponential(1).replace('e-', ' × 10⁻')
}

export default function ResourceEstimator({ language }: { language: Language }) {
  const [input, setInput] = useState(initialInput)
  const [erasureInput, setErasureInput] = useState(initialErasureInput)
  const estimate = useMemo(() => estimateResources(input), [input])
  const erasure = useMemo(() => assessErasureConversion(erasureInput), [erasureInput])
  const update = (key: keyof ResourceEstimateInput, value: number) => setInput((current) => ({ ...current, [key]: value }))
  const updateErasure = (key: keyof ErasureAssessmentInput, value: number) => setErasureInput((current) => ({ ...current, [key]: value }))

  return (
    <section className="resource-estimator" id="resource-estimator" aria-labelledby="resource-estimator-title">
      <header>
        <h2 id="resource-estimator-title">{language === 'zh' ? '从物理错误预算到逻辑资源' : 'From physical-error budget to logical resources'}</h2>
        <p>{language === 'zh' ? '以下关系是模型假设，不是 Yb 装置预测或工程报价。DiVincenzo 准则检查硬件能否实现量子计算；容错还要求把物理错误变成可解码的周期通道。' : 'Read these as model assumptions, not a Yb device prediction or engineering quote. DiVincenzo criteria ask whether hardware can implement quantum computation; fault tolerance additionally requires a decodable cycle channel.'}</p>
      </header>

      <section className="fault-chain" aria-labelledby="fault-chain-title">
        <h3 id="fault-chain-title">{language === 'zh' ? '通用计算之后，还有一条容错链' : 'Universal computation needs a second chain'}</h3>
        <div>
          <article><span>01</span><strong>{language === 'zh' ? '实现条件' : 'implementation criteria'}</strong><p>{language === 'zh' ? '初始化、相干、通用门与读出满足后，硬件才具备进入容错讨论的资格。' : 'Initialization, coherence, universal gates and readout qualify hardware for the fault-tolerance question.'}</p></article>
          <article><span>02</span><strong>{language === 'zh' ? '物理错误' : 'physical fault'}</strong><p>{language === 'zh' ? 'Pauli、泄漏、损失、相关漂移和测量错误必须保留各自定义。' : 'Pauli faults, leakage, loss, correlated drift and measurement errors keep separate definitions.'}</p></article>
          <article><span>03</span><strong>{language === 'zh' ? '解码器可见记录' : 'decoder-visible record'}</strong><p>{language === 'zh' ? '擦除标记只有连同漏报、误报、散射与等待时间写入记录才有价值。' : 'An erasure flag matters only together with false negatives, false positives, scattering and wait time.'}</p></article>
          <article><span>04</span><strong>{language === 'zh' ? '代码与调度' : 'code and schedule'}</strong><p>{language === 'zh' ? '选择码、非 Clifford 资源、并行冲突与译码延迟决定时空开销。' : 'Code choice, non-Clifford resources, parallel conflicts and decoder latency set spacetime overhead.'}</p></article>
          <article><span>05</span><strong>{language === 'zh' ? '可信结果' : 'trustworthy result'}</strong><p>{language === 'zh' ? '逻辑错误、吞吐、可用率与每次成功结果成本必须共同改善。' : 'Logical error, throughput, availability and cost per successful result must improve together.'}</p></article>
        </div>
      </section>

      <section className={`erasure-assessment erasure-assessment--${erasure.status}`} aria-labelledby="erasure-assessment-title">
        <header>
          <div><span>Yb ERROR INFORMATION</span><h3 id="erasure-assessment-title">{language === 'zh' ? '擦除标记何时减少隐藏错误？' : 'When does an erasure flag reduce hidden error?'}</h3></div>
          <output aria-live="polite">{erasureStatusCopy[erasure.status][language]}</output>
        </header>
        <div className="erasure-assessment__controls">
          <NumberControl language={language} id="erasure-total" label={{ zh: '门内总故障率', en: 'Total in-gate fault rate' }} value={erasureInput.totalFaultRate} min={0} max={0.05} step={0.0001} onChange={(value) => updateErasure('totalFaultRate', value)} />
          <NumberControl language={language} id="convertible-fraction" label={{ zh: '可转换比例', en: 'Convertible fraction' }} value={erasureInput.convertibleFraction} min={0} max={1} step={0.01} onChange={(value) => updateErasure('convertibleFraction', value)} />
          <NumberControl language={language} id="flag-recall" label={{ zh: '标记召回率', en: 'Flag recall' }} value={erasureInput.flagRecall} min={0} max={1} step={0.01} onChange={(value) => updateErasure('flagRecall', value)} />
          <NumberControl language={language} id="false-flag-rate" label={{ zh: '误报率', en: 'False-flag rate' }} value={erasureInput.falseFlagRate} min={0} max={0.02} step={0.0001} onChange={(value) => updateErasure('falseFlagRate', value)} />
          <NumberControl language={language} id="detection-overhead" label={{ zh: '检测附加时长', en: 'Detection overhead' }} value={erasureInput.detectionOverheadUs} min={0} max={200} step={1} onChange={(value) => updateErasure('detectionOverheadUs', value)} />
        </div>
        <div className="erasure-assessment__flow" aria-label={language === 'zh' ? '错误信息流' : 'Fault-information flow'}>
          <Metric label={language === 'zh' ? '真实可见擦除' : 'True located erasures'} value={erasure.trueErasureRate} tone="located" />
          <Metric label={language === 'zh' ? '残余隐藏错误' : 'Residual hidden faults'} value={erasure.residualHiddenRate} tone="hidden" />
          <Metric label={language === 'zh' ? '延迟新增存储错误' : 'Latency-added memory faults'} value={erasure.addedMemoryFault} tone="overhead" />
          <Metric label={language === 'zh' ? '标记精确率' : 'Flag precision'} value={erasure.flagPrecision} tone="precision" percent />
        </div>
        <p>{language === 'zh'
          ? '判定只比较“被定位的错误”与“检测新增的隐藏错误和误报”。它不替代具体量子码、相关噪声和译码调度仿真。'
          : 'The verdict compares located faults with hidden faults added by detection and false records. It does not replace code-specific simulation with correlations and decoder scheduling.'}</p>
      </section>

      <div className="resource-estimator__controls">
        <NumberControl language={language} id="physical-error" label={{ zh: '物理操作错误率', en: 'Physical operation error' }} value={input.physicalError} min={0.00001} max={0.05} step={0.0001} onChange={(value) => update('physicalError', value)} />
        <NumberControl language={language} id="threshold" label={{ zh: '假设纠错阈值', en: 'Assumed correction threshold' }} value={input.threshold} min={0.0001} max={0.1} step={0.001} onChange={(value) => update('threshold', value)} />
        <NumberControl language={language} id="logical-operations" label={{ zh: '逻辑操作总数', en: 'Logical operation count' }} value={input.logicalOperations} min={1} max={1_000_000_000_000} step={1000} onChange={(value) => update('logicalOperations', value)} />
        <NumberControl language={language} id="failure-budget" label={{ zh: '允许总失败概率', en: 'Allowed total failure probability' }} value={input.failureBudget} min={0.000001} max={0.5} step={0.001} onChange={(value) => update('failureBudget', value)} />
      </div>

      {estimate.status === 'estimated' ? (
        <div className="resource-estimator__result" aria-live="polite">
          <div><span>{language === 'zh' ? '目标逻辑错误/操作' : 'Target logical error / op'}</span><output>{scientific(estimate.targetLogicalError)}</output></div>
          <div><span>{language === 'zh' ? '最小模型码距' : 'Minimum model distance'}</span><output>{estimate.codeDistance}</output></div>
          <div><span>{language === 'zh' ? '物理比特/逻辑比特' : 'Physical / logical qubit'}</span><output>{estimate.physicalQubitsPerLogical}</output></div>
          <div><span>{language === 'zh' ? '估算逻辑错误' : 'Estimated logical error'}</span><output>{scientific(estimate.logicalError!)}</output></div>
        </div>
      ) : (
        <p className="resource-estimator__warning" role="status">
          {language === 'zh' ? '当前错误率不低于假设阈值，增加码距不能保证逻辑错误持续下降。' : 'The physical error is not below the assumed threshold; increasing code distance cannot guarantee continued logical-error suppression.'}
        </p>
      )}

      <div className="resource-estimator__assumptions">
        <strong>{language === 'zh' ? '模型边界：独立 Pauli 噪声下的表面码式缩放示例' : 'Model boundary: surface-code-style scaling under independent Pauli noise'}</strong>
        <ul>
          <li>pL = 0.1 (p / pth)<sup>(d + 1) / 2</sup></li>
          <li>{language === 'zh' ? '物理比特近似为 2d²/逻辑比特。' : 'Physical-qubit count is approximated as 2d² per logical qubit.'}</li>
          <li>{language === 'zh' ? '未计入相关错误、泄漏处理、路由、魔态工厂、备件和维护。' : 'Correlations, leakage handling, routing, magic-state factories, spares and maintenance are excluded.'}</li>
        </ul>
      </div>

      <div className="scale-cost-logic">
        <section id="scale-chain">
          <h3>{language === 'zh' ? '规模由可执行逻辑时空体积定义' : 'Scale is executable logical spacetime volume'}</h3>
          <div className="scale-cost-logic__sequence">
            {(language === 'zh'
              ? ['有用任务', '逻辑资源', '纠错开销', '控制与读出吞吐', '墙钟时间', '可信结果']
              : ['Useful task', 'Logical resources', 'QEC overhead', 'Control/readout throughput', 'Wall time', 'Trustworthy result']
            ).map((item, index) => <span key={item}>{String(index + 1).padStart(2, '0')}<b>{item}</b></span>)}
          </div>
          <p>{language === 'zh' ? '增加被困原子只有在逻辑错误下降、周期吞吐增长且维护停机受控时才增加有效规模。' : 'Adding trapped atoms increases useful scale only when logical error falls, cycle throughput grows and maintenance downtime remains controlled.'}</p>
        </section>

        <section id="cost-chain">
          <h3>{language === 'zh' ? '成本按一次可信结果归一化' : 'Cost is normalized per trustworthy result'}</h3>
          <div className="scale-cost-logic__formula">C<sub>success</sub> = (C<sub>amortized</sub> + C<sub>opex</sub>T<sub>wall</sub>) / P<sub>success</sub></div>
          <p>{language === 'zh' ? '低原子成本不能抵消长纠错时间、低系统可用率或高失败重试率。最终比较必须针对同一问题、精度和成功标准。' : 'Low atom cost cannot offset long correction time, poor availability or frequent failed repetitions. Final comparison uses the same problem, accuracy and success criterion.'}</p>
        </section>
      </div>
    </section>
  )
}

function Metric({ label, value, tone, percent = false }: { label: string; value: number; tone: string; percent?: boolean }) {
  return <div className={`erasure-metric erasure-metric--${tone}`}><span>{label}</span><strong>{percent ? `${(value * 100).toFixed(1)}%` : value.toExponential(2)}</strong><i style={{ width: `${Math.min(100, Math.max(2, value * (percent ? 100 : 10000)))}%` }} /></div>
}

interface NumberControlProps {
  language: Language
  id: string
  label: { zh: string; en: string }
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}

function NumberControl({ language, id, label, value, min, max, step, onChange }: NumberControlProps) {
  return (
    <label className="resource-number" htmlFor={id}>
      <span>{label[language]}</span>
      <input id={id} type="number" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}
