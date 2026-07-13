import type { Language, ResearchDetail } from '../../types/content'
import Equation from './Equation'

export default function ResearchLedger({ detail, language }: { detail: ResearchDetail; language: Language }) {
  return (
    <aside className="research-ledger" aria-label={language === 'zh' ? '科研实施账本' : 'Research implementation ledger'}>
      <header>
        <span>{language === 'zh' ? '阶段目标' : 'Milestone'}</span>
        <strong>{detail.milestone[language]}</strong>
      </header>

      <section className="research-ledger__principle">
        <h4>{language === 'zh' ? '底层原理与模型边界' : 'Principle and model boundary'}</h4>
        <p>{detail.principle[language]}</p>
        {detail.equations?.map((item) => <div key={item.expression}><Equation source={item.expression} /><small>{item.explanation[language]}</small></div>)}
      </section>

      <section className="research-ledger__instruments">
        <h4>{language === 'zh' ? '仪器与测量量' : 'Apparatus and observables'}</h4>
        <dl>{detail.instruments.map((item) => <div key={item.name.en}><dt>{item.name[language]}</dt><dd><span>{item.role[language]}</span><small>{language === 'zh' ? '测量：' : 'Measures: '}{item.measures[language]}</small></dd></div>)}</dl>
      </section>

      <section className="research-ledger__procedure">
        <h4>{language === 'zh' ? '操作顺序' : 'Procedure'}</h4>
        <ol>{detail.procedure.map((item, index) => <li key={item.en}><span>{String(index + 1).padStart(2, '0')}</span><p>{item[language]}</p></li>)}</ol>
      </section>

      <section className="research-ledger__outputs">
        <h4>{language === 'zh' ? '必须输出' : 'Required outputs'}</h4>
        <ul>{detail.outputs.map((item) => <li key={item.en}>{item[language]}</li>)}</ul>
      </section>

      <section className="research-ledger__acceptance">
        <h4>{language === 'zh' ? '放行条件' : 'Acceptance criteria'}</h4>
        <ul>{detail.acceptance.map((item) => <li key={item.en}>{item[language]}</li>)}</ul>
      </section>

      {detail.theoryToExperiment ? <footer><span>{language === 'zh' ? '理论 → 实验' : 'Theory → experiment'}</span><p>{detail.theoryToExperiment[language]}</p></footer> : null}
    </aside>
  )
}
