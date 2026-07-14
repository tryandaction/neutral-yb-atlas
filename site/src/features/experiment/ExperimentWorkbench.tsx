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
  const phaseById = new Map(experimentPhases.map((item) => [item.id, item]))
  const missingDependencies = phase.dependencies.filter((id) => !completed.has(id))
  const dependencyNames = phase.dependencies.map((id) => phaseById.get(id)?.title[language] ?? id)
  const missingNames = missingDependencies.map((id) => phaseById.get(id)?.title[language] ?? id)
  const isComplete = completed.has(phase.id)
  const isBlocked = missingDependencies.length > 0 && !isComplete
  const gate = isComplete
    ? {
        tone: 'released',
        label: language === 'zh' ? '已放行' : 'Released',
        detail: language === 'zh' ? '完成记录已写入本地工作区；进入下游前仍应保留本阶段原始数据与配置版本。' : 'Completion is stored locally; retain this phase’s raw data and configuration version before downstream work.',
      }
    : isBlocked
      ? {
          tone: 'blocked',
          label: language === 'zh' ? '依赖阻塞' : 'Blocked by dependencies',
          detail: `${language === 'zh' ? '尚缺：' : 'Missing: '}${missingNames.join(language === 'zh' ? '、' : ', ')}`,
        }
      : {
          tone: 'ready',
          label: language === 'zh' ? '依赖已满足，等待验收' : 'Dependencies met; awaiting acceptance',
          detail: language === 'zh' ? `证据缺口：${phase.acceptance[0].zh}` : `Evidence required: ${phase.acceptance[0].en}`,
        }

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
            <small>{item.durationWeeks[0]}–{item.durationWeeks[1]} {language === 'zh' ? '周' : 'weeks'}</small>
          </button>
        ))}
      </div>

      <div className="experiment-detail">
        <div className="experiment-detail__summary">
          <div><span>PHASE 0{phase.order}</span><h3>{phase.title[language]}</h3><p>{phase.objective[language]}</p></div>
          <button type="button" className={isComplete ? 'is-complete' : ''} disabled={isBlocked} aria-label={`${isComplete ? (language === 'zh' ? '取消完成' : 'Mark incomplete') : (language === 'zh' ? '完成' : 'Complete')} ${phase.title[language]}`} onClick={() => onTogglePhase(phase.id)}>
            <Check aria-hidden="true" />{isComplete ? (language === 'zh' ? '已完成' : 'Completed') : (language === 'zh' ? '标记完成' : 'Mark complete')}
          </button>
        </div>
        <div className="experiment-detail__dependencies"><b>{language === 'zh' ? '前置依赖' : 'Dependencies'}</b><span>{dependencyNames.length ? dependencyNames.join(' → ') : (language === 'zh' ? '基础设施起点' : 'Infrastructure starting point')}</span></div>
        <section className={`experiment-gate experiment-gate--${gate.tone}`} aria-live="polite">
          <span>{language === 'zh' ? '阶段闸门' : 'Phase gate'}</span><strong>{gate.label}</strong><p>{gate.detail}</p>
        </section>
        <InstrumentTable language={language} instruments={phase.instruments} />
        <div className="experiment-detail__bottom">
          <section className="acceptance-list"><h4>{language === 'zh' ? '通过条件' : 'Acceptance'}</h4><ul>{phase.acceptance.map((item) => <li key={item.en}>{item[language]}</li>)}</ul></section>
          <FailureTree language={language} phase={phase} />
        </div>
      </div>
    </section>
  )
}
