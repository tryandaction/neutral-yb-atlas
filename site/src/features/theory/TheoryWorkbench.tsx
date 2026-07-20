import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import type { Language } from '../../types/content'
import ErrorBudget from './ErrorBudget'
import PopulationChart from './PopulationChart'
import { blockadeRatio, buildErrorBudget, buildTeachingObservables } from './model'
import './theory.css'

const defaults = {
  omegaMHz: 3,
  interactionMHz: 45,
  detuningMHz: 0,
  temperatureUk: 2.9,
  rydbergLifetimeUs: 120,
  gateTimeUs: 1.24,
}

export default function TheoryWorkbench({ language }: { language: Language }) {
  const [parameters, setParameters] = useState(defaults)
  const ratio = blockadeRatio(parameters)
  const budget = buildErrorBudget(parameters)
  const observables = buildTeachingObservables(parameters)
  const setParameter = (key: keyof typeof parameters, value: number) => setParameters((current) => ({ ...current, [key]: value }))

  return (
    <section className="theory-workbench" id="theory">
      <aside className="theory-workbench__nav">
        <div><span>GATE MODEL</span><h2>{language === 'zh' ? <>两原子<br />阻塞动力学</> : <>Two-atom<br />blockade dynamics</>}</h2></div>
        <dl className="theory-scope">
          <div><dt>{language === 'zh' ? '模型回答' : 'The model answers'}</dt><dd>{language === 'zh' ? '控制量怎样改变布居、相位、Rydberg 暴露、衰变与 Doppler 尺度。' : 'How controls change populations, phase, Rydberg exposure, decay and the Doppler scale.'}</dd></div>
          <div><dt>{language === 'zh' ? '模型不回答' : 'The model does not answer'}</dt><dd>{language === 'zh' ? '特定装置的门保真度、完整多能级传播或实验校准值。' : 'Device gate fidelity, full multilevel propagation or experimental calibration.'}</dd></div>
        </dl>
        <p><b>{language === 'zh' ? '适用边界' : 'Scope'}</b>{language === 'zh' ? '有限阻塞、两能级 Rabi 包络和一阶相位暴露的教学近似。所有输出都是具名物理量，不合成为保真度。' : 'A teaching approximation combining finite blockade, a two-level Rabi envelope and first-order phase exposure. Outputs are named physical quantities and are not combined into fidelity.'}</p>
      </aside>

      <div className="theory-workbench__main">
        <header>
          <div><span>Ω · V · Δ · t<sub>g</sub> · τ<sub>r</sub> · T → P<sub>rr</sub> · φ · ∫P<sub>r</sub>dt · P<sub>decay</sub></span><h2>{language === 'zh' ? '每个参数怎样改变可观察结果' : 'How each parameter changes an observable'}</h2></div>
          <div className="theory-workbench__commands">
            <button type="button" onClick={() => setParameters(defaults)} title={language === 'zh' ? '恢复默认参数' : 'Reset parameters'} aria-label={language === 'zh' ? '恢复默认参数' : 'Reset parameters'}><RotateCcw aria-hidden="true" /></button>
          </div>
        </header>

        <div className="theory-workbench__surface">
          <PopulationChart parameters={parameters} language={language} />
          <div className="theory-controls">
            <div className="theory-metrics">
              <div><small>V / Ω</small><strong>{ratio.toFixed(1)}</strong></div>
              <div><small>{language === 'zh' ? '目标条件相位' : 'Target conditional phase'}</small><strong>π rad</strong></div>
            </div>

            <div className="theory-observables" aria-label={language === 'zh' ? '模型物理输出' : 'Model physical outputs'}>
              <Observable label={language === 'zh' ? '最大双激发概率' : 'Maximum double excitation'} symbol="max Prr" value={`${(observables.maxDoubleExcitation * 100).toFixed(3)}%`} scale={observables.maxDoubleExcitation} scaleMax={0.04} />
              <Observable label={language === 'zh' ? '条件相位' : 'Conditional phase'} symbol="φcond" value={`${observables.conditionalPhaseRad.toFixed(3)} rad`} scale={Math.min(1, Math.abs(observables.conditionalPhaseRad) / (2 * Math.PI))} scaleMax={1} />
              <Observable label={language === 'zh' ? '相位误差幅度' : 'Phase error magnitude'} symbol="|δφ|" value={`${observables.phaseErrorRad.toFixed(3)} rad`} scale={observables.phaseErrorRad} scaleMax={Math.PI} />
              <Observable label={language === 'zh' ? 'Rydberg 暴露' : 'Rydberg exposure'} symbol="∫Pr dt" value={`${observables.rydbergExposureUs.toFixed(3)} μs`} scale={observables.rydbergExposureUs} scaleMax={parameters.gateTimeUs} />
              <Observable label={language === 'zh' ? '衰变概率' : 'Decay probability'} symbol="Pdecay" value={`${(observables.decayProbability * 100).toFixed(3)}%`} scale={observables.decayProbability} scaleMax={0.04} />
              <Observable label={language === 'zh' ? 'Doppler 频移尺度' : 'Doppler frequency scale'} symbol="σD" value={`${observables.dopplerRmsKhz.toFixed(1)} kHz rms`} scale={observables.dopplerRmsKhz} scaleMax={100} />
            </div>
            <p className="theory-proxy-note">{language === 'zh' ? '相位模型采用 δφ = 2πΔ∫Prdt；衰变采用 1 − exp(−∫Prdt/τr)。它们用于展示依赖关系，不代替完整主方程、脉冲标定或门层析。' : 'The phase model uses delta phi = 2 pi Delta integral Pr dt; decay uses 1 - exp(-integral Pr dt / tau_r). These show parameter dependence and do not replace a full master equation, pulse calibration or gate tomography.'}</p>

            <h3>{language === 'zh' ? '模型参数' : 'Model parameters'}</h3>
            <Parameter label="Ωmax / 2π" affects="population · exposure" value={parameters.omegaMHz} min={1} max={8} step={0.1} unit="MHz" onChange={(value) => setParameter('omegaMHz', value)} />
            <Parameter label="V / 2π" affects="max Prr" value={parameters.interactionMHz} min={10} max={100} step={1} unit="MHz" onChange={(value) => setParameter('interactionMHz', value)} />
            <Parameter label="Δ / 2π" affects="φcond · |δφ|" value={parameters.detuningMHz} min={-5} max={5} step={0.1} unit="MHz" onChange={(value) => setParameter('detuningMHz', value)} />
            <Parameter label={language === 'zh' ? '温度' : 'Temperature'} affects="σD · trajectory" value={parameters.temperatureUk} min={1} max={15} step={0.1} unit="μK" onChange={(value) => setParameter('temperatureUk', value)} />
            <Parameter label={language === 'zh' ? 'Rydberg 寿命' : 'Rydberg lifetime'} affects="Pdecay" value={parameters.rydbergLifetimeUs} min={40} max={250} step={5} unit="μs" onChange={(value) => setParameter('rydbergLifetimeUs', value)} />
            <Parameter label={language === 'zh' ? '门时长' : 'Gate duration'} affects="exposure · phase · decay" value={parameters.gateTimeUs} min={0.2} max={4} step={0.02} unit="μs" onChange={(value) => setParameter('gateTimeUs', value)} />
          </div>
          <ErrorBudget language={language} budget={budget} />
        </div>
      </div>
    </section>
  )
}

function Observable({ label, symbol, value, scale, scaleMax }: { label: string; symbol: string; value: string; scale: number; scaleMax: number }) {
  const width = Math.min(100, Math.max(scale > 0 ? 2 : 0, scale / scaleMax * 100))
  return (
    <div aria-label={label}>
      <span><b>{symbol}</b>{label}</span>
      <strong>{value}</strong>
      <i className="theory-observables__track" aria-hidden="true"><i style={{ width: `${width}%` }} /></i>
    </div>
  )
}

interface ParameterProps { label: string; affects: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }

function Parameter({ label, affects, value, min, max, step, unit, onChange }: ParameterProps) {
  const id = `parameter-${label.replaceAll(/[^a-zA-Z]/g, '')}`
  return <div className="theory-parameter"><label htmlFor={id}><span>{label}<small>{affects}</small></span><b>{value.toFixed(step < 1 ? 1 : 0)} {unit}</b></label><input id={id} aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></div>
}
