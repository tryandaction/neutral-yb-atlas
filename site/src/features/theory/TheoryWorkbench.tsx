import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import type { Language } from '../../types/content'
import ErrorBudget from './ErrorBudget'
import PopulationChart from './PopulationChart'
import { analyzeOperatingPoint, blockadeRatio, buildErrorBudget, buildTeachingObservables, type NextMeasurement } from './model'
import './theory.css'

const defaults = { omegaMHz: 3, interactionMHz: 45, detuningMHz: 0, temperatureUk: 2.9, rydbergLifetimeUs: 120, gateTimeUs: 1.24 }

const nextMeasurementCopy: Record<NextMeasurement, Record<Language, string>> = {
  'pair-spectroscopy': { zh: '优先执行双原子距离与角度扫描，联合测双原子谱、双激发抑制与条件相位。', en: 'Prioritize a two-atom separation/angle scan with spectra, double-excitation suppression and conditional phase.' },
  'rydberg-lifetime': { zh: '优先测量 Rydberg 寿命与门内布居，区分本征衰变和脉冲驻留时间。', en: 'Prioritize Rydberg lifetime and in-gate population to separate intrinsic decay from pulse dwell time.' },
  'temperature-scan': { zh: '优先交错扫描温度与失谐，检验 Doppler 与运动采样项。', en: 'Prioritize interleaved temperature and detuning scans to test Doppler and motional sampling.' },
  'detuning-scan': { zh: '优先做单原子失谐扫描并锁定 AC Stark、磁场与激光频率基线。', en: 'Prioritize a single-atom detuning scan and lock AC Stark, field and laser-frequency baselines.' },
}

const dominantCopy = {
  blockade: { zh: '有限阻塞', en: 'Finite blockade' },
  decay: { zh: 'Rydberg 衰变', en: 'Rydberg decay' },
  doppler: { zh: 'Doppler / 运动', en: 'Doppler / motion' },
  detuning: { zh: '条件相位失配', en: 'Conditional-phase mismatch' },
} as const

export default function TheoryWorkbench({ language }: { language: Language }) {
  const [parameters, setParameters] = useState(defaults)
  const ratio = blockadeRatio(parameters)
  const budget = buildErrorBudget(parameters)
  const observables = buildTeachingObservables(parameters)
  const analysis = analyzeOperatingPoint(parameters)

  const verdict = analysis.region === 'usable'
    ? { label: { zh: '可用教学工作区', en: 'Usable teaching region' }, tone: 'usable' }
    : analysis.region === 'marginal'
      ? { label: { zh: '边界工作区', en: 'Marginal operating region' }, tone: 'marginal' }
      : analysis.nextMeasurement === 'pair-spectroscopy'
        ? { label: { zh: '超出阻塞工作区', en: 'Outside blockade region' }, tone: 'outside' }
        : { label: { zh: '超出当前工作区', en: 'Outside current region' }, tone: 'outside' }

  const setParameter = (key: keyof typeof parameters, value: number) => setParameters((current) => ({ ...current, [key]: value }))
  return (
    <section className="theory-workbench" id="theory">
      <aside className="theory-workbench__nav">
        <div><span>06 / ACTIVE MODEL</span><h2>{language === 'zh' ? <>两原子<br />阻塞模型</> : <>Two-atom<br />blockade</>}</h2></div>
        <dl className="theory-scope">
          <div><dt>{language === 'zh' ? '回答' : 'Answers'}</dt><dd>{language === 'zh' ? '参数趋势、误差竞争和下一项测量。' : 'Parameter trends, competing errors and the next measurement.'}</dd></div>
          <div><dt>{language === 'zh' ? '不回答' : 'Does not answer'}</dt><dd>{language === 'zh' ? '未锁定 Vijkl 时的 Methods 级门复现。' : 'Methods-level gate reproduction without source-locked Vijkl.'}</dd></div>
        </dl>
        <p><b>{language === 'zh' ? '声明边界' : 'Claim boundary'}</b>{language === 'zh' ? '解析双原子教学模型；Qteach 是已列机制的灵敏度代理，不是实测保真度。' : 'An analytical two-atom teaching model; Qteach is a sensitivity proxy over the listed mechanisms, not measured fidelity.'}</p>
      </aside>

      <div className="theory-workbench__main">
        <header>
          <div><span>H(t) → Prr · εφ · Edecay · EDoppler → Qteach</span><h2>{language === 'zh' ? '从控制参数到可检验的物理趋势' : 'From controls to testable physical trends'}</h2></div>
          <div className="theory-workbench__commands">
            <button type="button" onClick={() => setParameters(defaults)} title={language === 'zh' ? '恢复默认参数' : 'Reset parameters'} aria-label={language === 'zh' ? '恢复默认参数' : 'Reset parameters'}><RotateCcw aria-hidden="true" /></button>
          </div>
        </header>

        <section className={`theory-verdict theory-verdict--${verdict.tone}`} aria-live="polite">
          <div><span>{language === 'zh' ? '当前判断' : 'Current verdict'}</span><strong>{verdict.label[language]}</strong></div>
          <div><span>{language === 'zh' ? '主导误差' : 'Dominant error'}</span><strong>{dominantCopy[analysis.dominant][language]}</strong></div>
          <p>{nextMeasurementCopy[analysis.nextMeasurement][language]}</p>
        </section>

        <div className="theory-workbench__surface">
          <PopulationChart parameters={parameters} language={language} />
          <div className="theory-controls">
            <div className="theory-metrics">
              <div><small>V / Ω</small><strong>{ratio.toFixed(1)}</strong></div>
              <div aria-label={language === 'zh' ? '教学质量代理' : 'Teaching quality proxy'}><small>Q<sub>teach</sub></small><strong>{(observables.teachingQuality * 100).toFixed(2)}%</strong></div>
            </div>
            <div className="theory-observables" aria-label={language === 'zh' ? '模型可观测量' : 'Model observables'}>
              <Observable label={language === 'zh' ? '双激发代理' : 'Double-excitation proxy'} symbol="Prr" value={observables.doubleExcitation} scale={0.04} />
              <Observable label={language === 'zh' ? '相位失配代理' : 'Phase-mismatch proxy'} symbol="εφ" value={observables.phaseMismatch} scale={0.25} />
              <Observable label={language === 'zh' ? '衰变暴露代理' : 'Decay-exposure proxy'} symbol="Edecay" value={observables.decayExposure} scale={0.04} />
              <Observable label={language === 'zh' ? 'Doppler 代理' : 'Doppler proxy'} symbol="ED" value={observables.dopplerSensitivity} scale={0.002} detail={`${observables.dopplerRmsKhz.toFixed(1)} kHz rms`} />
            </div>
            <p className="theory-proxy-note">{language === 'zh' ? 'Qteach = 1 − ΣE，仅汇总图中四项教学代理；不是实测保真度，也不包含 SPAM、激光噪声或完整脉冲误差。' : 'Qteach = 1 − ΣE over the four displayed teaching proxies only; it is not measured fidelity and excludes SPAM, laser noise and full pulse errors.'}</p>
            <h3>{language === 'zh' ? '模型参数' : 'Model parameters'}</h3>
            <Parameter label="Ωmax / 2π" affects="Prr · εφ · ED · trajectory" value={parameters.omegaMHz} min={1} max={8} step={0.1} unit="MHz" onChange={(value) => setParameter('omegaMHz', value)} />
            <Parameter label="V / 2π" affects="Prr · |rr⟩" value={parameters.interactionMHz} min={10} max={100} step={1} unit="MHz" onChange={(value) => setParameter('interactionMHz', value)} />
            <Parameter label="Δ / 2π" affects="εφ · trajectory" value={parameters.detuningMHz} min={-5} max={5} step={0.1} unit="MHz" onChange={(value) => setParameter('detuningMHz', value)} />
            <Parameter label={language === 'zh' ? '温度' : 'Temperature'} affects="ED · envelope" value={parameters.temperatureUk} min={1} max={15} step={0.1} unit="μK" onChange={(value) => setParameter('temperatureUk', value)} />
            <Parameter label={language === 'zh' ? 'Rydberg 寿命' : 'Rydberg lifetime'} affects="Edecay · envelope" value={parameters.rydbergLifetimeUs} min={40} max={250} step={5} unit="μs" onChange={(value) => setParameter('rydbergLifetimeUs', value)} />
            <Parameter label={language === 'zh' ? '门时长' : 'Gate duration'} affects="Edecay · trajectory window" value={parameters.gateTimeUs} min={0.2} max={4} step={0.02} unit="μs" onChange={(value) => setParameter('gateTimeUs', value)} />
          </div>
          <ErrorBudget language={language} budget={budget} />
        </div>

        <section className="theory-contract" aria-label={language === 'zh' ? '理论到实验对应合同' : 'Theory-to-experiment contract'}>
          <header><span>MODEL → LAB</span><h3>{language === 'zh' ? '理论—实验对应合同' : 'Theory-to-experiment contract'}</h3></header>
          <dl>
            <Contract label={{ zh: '理论对象', en: 'Model object' }} value={{ zh: '有效两原子阻塞哈密顿量', en: 'Effective two-atom blockade Hamiltonian' }} language={language} />
            <Contract label={{ zh: '自由参数', en: 'Free parameters' }} value={{ zh: 'Ω、V、Δ、T、τr 与门时长', en: 'Omega, V, Delta, T, Rydberg lifetime and gate time' }} language={language} />
            <Contract label={{ zh: '实验旋钮', en: 'Lab controls' }} value={{ zh: 'UV 功率/频率、原子间距、偏置场、冷却终点', en: 'UV power/frequency, pair spacing, bias field and cooling endpoint' }} language={language} />
            <Contract label={{ zh: '直接观测量', en: 'Direct observables' }} value={{ zh: '单/双原子谱、Rabi、双激发、条件相位、温度', en: 'Single/pair spectra, Rabi, double excitation, conditional phase and temperature' }} language={language} />
            <Contract label={{ zh: '参数反演', en: 'Inference' }} value={{ zh: '联合拟合并保留后验相关；不用重复计数的标量误差', en: 'Joint inference with posterior correlation; no duplicated scalar error terms' }} language={language} />
            <Contract label={{ zh: '放行条件', en: 'Release condition' }} value={{ zh: '留出扫描仍被预测，且阻塞、泄漏和相位同时通过', en: 'Held-out scans remain predicted and blockade, leakage and phase pass together' }} language={language} />
          </dl>
        </section>
      </div>
    </section>
  )
}

function Contract({ label, value, language }: { label: Record<Language, string>; value: Record<Language, string>; language: Language }) {
  return <div><dt>{label[language]}</dt><dd>{value[language]}</dd></div>
}

function Observable({ label, symbol, value, scale, detail }: { label: string; symbol: string; value: number; scale: number; detail?: string }) {
  const width = Math.min(100, Math.max(value > 0 ? 2 : 0, value / scale * 100))
  return (
    <div aria-label={label}>
      <span><b>{symbol}</b>{label}</span>
      <strong>{(value * 100).toFixed(3)}%</strong>
      <i className="theory-observables__track" aria-hidden="true"><i style={{ width: `${width}%` }} /></i>
      {detail && <small>{detail}</small>}
    </div>
  )
}

interface ParameterProps { label: string; affects: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }

function Parameter({ label, affects, value, min, max, step, unit, onChange }: ParameterProps) {
  const id = `parameter-${label.replaceAll(/[^a-zA-Z]/g, '')}`
  return <div className="theory-parameter"><label htmlFor={id}><span>{label}<small>{affects}</small></span><b>{value.toFixed(step < 1 ? 1 : 0)} {unit}</b></label><input id={id} aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></div>
}
