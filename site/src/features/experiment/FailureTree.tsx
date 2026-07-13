import { AlertTriangle } from 'lucide-react'
import type { ExperimentPhase, Language } from '../../types/content'

interface FailureTreeProps {
  language: Language
  phase: ExperimentPhase
}

export default function FailureTree({ language, phase }: FailureTreeProps) {
  return (
    <section className="failure-tree">
      <header><AlertTriangle aria-hidden="true" /><strong>{language === 'zh' ? '失败信号' : 'Failure signals'}</strong></header>
      <ul>{phase.failureSignals.map((signal) => <li key={signal.en}>{signal[language]}</li>)}</ul>
      <p><span>{language === 'zh' ? '诊断顺序' : 'Diagnostic order'}</span>{language === 'zh' ? '先检查上游依赖和记录，再调整本阶段参数。' : 'Check upstream dependencies and records before retuning this phase.'}</p>
    </section>
  )
}
