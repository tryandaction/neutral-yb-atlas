import { Save, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import type { Language } from '../../types/content'
import type { ParameterSnapshot } from '../workspace/workspaceTypes'
import ErrorBudget from './ErrorBudget'
import PopulationChart from './PopulationChart'
import { blockadeRatio, buildErrorBudget } from './model'
import './theory.css'

interface TheoryWorkbenchProps {
  language: Language
  onSaveSnapshot: (snapshot: ParameterSnapshot) => void
}

const defaults = { omegaMHz: 3, interactionMHz: 45, detuningMHz: 0, temperatureUk: 2.9, rydbergLifetimeUs: 120, gateTimeUs: 1.24 }

export default function TheoryWorkbench({ language, onSaveSnapshot }: TheoryWorkbenchProps) {
  const [parameters, setParameters] = useState(defaults)
  const ratio = blockadeRatio(parameters)
  const budget = buildErrorBudget(parameters)
  const totalError = budget.reduce((sum, item) => sum + item.value, 0)

  const setParameter = (key: keyof typeof parameters, value: number) => setParameters((current) => ({ ...current, [key]: value }))
  const save = () => onSaveSnapshot({
    id: `blockade-${Date.now()}`,
    name: `V/Omega ${ratio.toFixed(1)}`,
    createdAt: new Date().toISOString(),
    modelId: 'two-level-blockade-teaching-v1',
    values: parameters,
    note: 'Teaching model; not a paper-level reproduction.',
  })

  return (
    <section className="theory-workbench" id="theory">
      <aside className="theory-workbench__nav">
        <div><span>06 / THEORY</span><h2>Hamiltonian<br />Workbench</h2></div>
        <nav aria-label={language === 'zh' ? '理论模型' : 'Theory models'}>
          <button className="is-selected" type="button"><span>01</span>{language === 'zh' ? '两原子阻塞' : 'Two-atom blockade'}</button>
          <button type="button"><span>02</span>{language === 'zh' ? '脉冲序列' : 'Pulse sequence'}</button>
          <button type="button"><span>03</span>{language === 'zh' ? '开放系统噪声' : 'Open-system noise'}</button>
          <button type="button"><span>04</span>{language === 'zh' ? '逻辑通道' : 'Logical channel'}</button>
        </nav>
        <p><b>{language === 'zh' ? '声明边界' : 'Claim boundary'}</b>{language === 'zh' ? '公式正确、参数可调的教学模型。完整 Vijkl 张量缺失时不支持 Methods 级复现。' : 'A correct, adjustable teaching model. A Methods-level reproduction requires the full Vijkl tensor.'}</p>
      </aside>

      <div className="theory-workbench__main">
        <header>
          <div><span>H(t) → U(T) → Favg · Pleak · εdecay · εDoppler</span><h2>{language === 'zh' ? '从哈密顿量到可测保真度' : 'From Hamiltonian to measured fidelity'}</h2></div>
          <div className="theory-workbench__commands">
            <button type="button" onClick={() => setParameters(defaults)} title={language === 'zh' ? '恢复默认参数' : 'Reset parameters'} aria-label={language === 'zh' ? '恢复默认参数' : 'Reset parameters'}><RotateCcw aria-hidden="true" /></button>
            <button type="button" onClick={save} title={language === 'zh' ? '保存参数快照' : 'Save parameter snapshot'} aria-label={language === 'zh' ? '保存参数快照' : 'Save parameter snapshot'}><Save aria-hidden="true" /></button>
          </div>
        </header>

        <div className="theory-workbench__surface">
          <PopulationChart omegaMHz={parameters.omegaMHz} detuningMHz={parameters.detuningMHz} gateTimeUs={parameters.gateTimeUs} />
          <div className="theory-controls">
            <div className="theory-metrics"><div><small>V / Ω</small><strong>{ratio.toFixed(1)}</strong></div><div><small>1 − F (est.)</small><strong>{totalError.toExponential(2)}</strong></div></div>
            <h3>{language === 'zh' ? '模型参数' : 'Model parameters'}</h3>
            <Parameter label="Ωmax / 2π" value={parameters.omegaMHz} min={1} max={8} step={0.1} unit="MHz" onChange={(value) => setParameter('omegaMHz', value)} />
            <Parameter label="V / 2π" value={parameters.interactionMHz} min={10} max={100} step={1} unit="MHz" onChange={(value) => setParameter('interactionMHz', value)} />
            <Parameter label="Δ / 2π" value={parameters.detuningMHz} min={-5} max={5} step={0.1} unit="MHz" onChange={(value) => setParameter('detuningMHz', value)} />
            <Parameter label={language === 'zh' ? '温度' : 'Temperature'} value={parameters.temperatureUk} min={1} max={15} step={0.1} unit="μK" onChange={(value) => setParameter('temperatureUk', value)} />
          </div>
          <ErrorBudget language={language} budget={budget} />
        </div>
      </div>
    </section>
  )
}

interface ParameterProps { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }

function Parameter({ label, value, min, max, step, unit, onChange }: ParameterProps) {
  const id = `parameter-${label.replaceAll(/[^a-zA-Z]/g, '')}`
  return <div className="theory-parameter"><label htmlFor={id}><span>{label}</span><b>{value.toFixed(step < 1 ? 1 : 0)} {unit}</b></label><input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></div>
}
