import { Check, Circle } from 'lucide-react'
import { useState } from 'react'
import { experimentPhases } from '../../content/experiment'
import type { Language } from '../../types/content'
import FailureTree from './FailureTree'
import InstrumentTable from './InstrumentTable'
import './experiment.css'

interface ExperimentWorkbenchProps {
  language: Language
  completedPhases: string[]
  onTogglePhase: (id: string) => void
}

export default function ExperimentWorkbench({ language, completedPhases, onTogglePhase }: ExperimentWorkbenchProps) {
  const [selectedId, setSelectedId] = useState(experimentPhases[0].id)
  const phase = experimentPhases.find((item) => item.id === selectedId) ?? experimentPhases[0]
  const completed = new Set(completedPhases)

  return (
    <section className="experiment-workbench" id="experiment">
      <header className="experiment-workbench__header">
        <div><span>EXPERIMENT / ACCEPTANCE CHAIN</span><h2>{language === 'zh' ? '实验不是器件清单，而是一条验收链' : 'An experiment is an acceptance chain, not a parts list'}</h2></div>
        <p>{language === 'zh' ? '每个阶段绑定依赖、工具、选型维度、通过条件和失败信号。周期是工程范围，不是脱离采购条件的承诺。' : 'Every phase binds dependencies, tools, selection dimensions, acceptance criteria and failure signals. Durations are engineering ranges, not procurement-independent promises.'}</p>
      </header>

      <div className="experiment-timeline">
        {experimentPhases.map((item) => (
          <button key={item.id} type="button" className={`${item.id === selectedId ? 'is-selected' : ''}${completed.has(item.id) ? ' is-complete' : ''}`} onClick={() => setSelectedId(item.id)}>
            <span>0{item.order}</span>
            <i>{completed.has(item.id) ? <Check aria-hidden="true" /> : <Circle aria-hidden="true" />}</i>
            <strong>{item.title[language]}</strong>
            <small>{item.durationWeeks[0]}–{item.durationWeeks[1]} weeks</small>
          </button>
        ))}
      </div>

      <div className="experiment-detail">
        <div className="experiment-detail__summary">
          <div><span>PHASE 0{phase.order}</span><h3>{phase.title[language]}</h3><p>{phase.objective[language]}</p></div>
          <button type="button" className={completed.has(phase.id) ? 'is-complete' : ''} aria-label={`${completed.has(phase.id) ? (language === 'zh' ? '取消完成' : 'Mark incomplete') : (language === 'zh' ? '完成' : 'Complete')} ${phase.title[language]}`} onClick={() => onTogglePhase(phase.id)}>
            <Check aria-hidden="true" />{completed.has(phase.id) ? (language === 'zh' ? '已完成' : 'Completed') : (language === 'zh' ? '标记完成' : 'Mark complete')}
          </button>
        </div>
        <div className="experiment-detail__dependencies"><b>{language === 'zh' ? '前置依赖' : 'Dependencies'}</b><span>{phase.dependencies.length ? phase.dependencies.join(' → ') : (language === 'zh' ? '基础设施起点' : 'Infrastructure starting point')}</span></div>
        <InstrumentTable language={language} instruments={phase.instruments} />
        <div className="experiment-detail__bottom">
          <section className="acceptance-list"><h4>{language === 'zh' ? '通过条件' : 'Acceptance'}</h4><ul>{phase.acceptance.map((item) => <li key={item.en}>{item[language]}</li>)}</ul></section>
          <FailureTree language={language} phase={phase} />
        </div>
      </div>
    </section>
  )
}
