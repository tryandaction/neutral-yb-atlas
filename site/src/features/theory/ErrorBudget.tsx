import type { Language } from '../../types/content'
import type { ErrorContribution } from './model'

interface ErrorBudgetProps {
  language: Language
  budget: ErrorContribution[]
}

const labels = {
  blockade: { zh: '有限阻塞', en: 'Finite blockade' },
  decay: { zh: 'Rydberg 衰变', en: 'Rydberg decay' },
  doppler: { zh: 'Doppler', en: 'Doppler' },
  detuning: { zh: '条件相位失配', en: 'Conditional-phase mismatch' },
}

export default function ErrorBudget({ language, budget }: ErrorBudgetProps) {
  return (
    <div className="error-budget">
      <div className="error-budget__header"><strong>{language === 'zh' ? '近似误差尺度' : 'Approximate error scales'}</strong><span>TEACHING MODEL · NOT FIDELITY</span></div>
      {budget.map((item) => (
        <div className="error-budget__row" key={item.id}>
          <div><span>{labels[item.id][language]}</span><b>{item.value.toExponential(2)}</b></div>
          <div className="error-budget__track"><i style={{ width: `${Math.max(2, item.fraction * 100)}%` }} /></div>
        </div>
      ))}
    </div>
  )
}
