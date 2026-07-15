import { useMemo, useState } from 'react'
import type { Language } from '../../types/content'
import { estimateResources, type ResourceEstimateInput } from './model'
import './fault-tolerance.css'

const initialInput: ResourceEstimateInput = {
  physicalError: 0.001,
  threshold: 0.01,
  logicalOperations: 1_000_000,
  failureBudget: 0.01,
}

function scientific(value: number): string {
  return value.toExponential(1).replace('e-', ' × 10⁻')
}

export default function ResourceEstimator({ language }: { language: Language }) {
  const [input, setInput] = useState(initialInput)
  const estimate = useMemo(() => estimateResources(input), [input])
  const update = (key: keyof ResourceEstimateInput, value: number) => setInput((current) => ({ ...current, [key]: value }))

  return (
    <section className="resource-estimator" id="resource-estimator" aria-labelledby="resource-estimator-title">
      <header>
        <h2 id="resource-estimator-title">{language === 'zh' ? '从物理错误预算到逻辑资源' : 'From physical-error budget to logical resources'}</h2>
        <p>{language === 'zh' ? '这是用于理解缩放关系的教学近似，不是特定 Yb 装置的工程报价。改变任一输入都会重新计算最小奇数码距。' : 'This is a pedagogical scaling approximation, not an engineering quote for a specific Yb machine. Every input updates the minimum odd code distance.'}</p>
      </header>

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
        <strong>{language === 'zh' ? '模型边界' : 'Model boundary'}</strong>
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
