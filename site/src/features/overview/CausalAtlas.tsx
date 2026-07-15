import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { causalNodes } from '../../content/causalAtlas'
import { routeHref, routes } from '../../navigation/routes'
import type { Language } from '../../types/content'

interface CausalAtlasProps {
  language: Language
}

export default function CausalAtlas({ language }: CausalAtlasProps) {
  const [activeId, setActiveId] = useState(causalNodes[0].id)
  const active = causalNodes.find((node) => node.id === activeId) ?? causalNodes[0]
  const destination = routes.find((route) => route.id === active.route)

  return (
    <section id="causal-atlas" className="causal-atlas" aria-labelledby="causal-atlas-title">
      <h2 id="causal-atlas-title">
        {language === 'zh' ? '从有价值的问题倒推物理机器' : 'Derive the physical machine from a valuable problem'}
      </h2>
      <div className="causal-atlas__axis" role="list" aria-label={language === 'zh' ? '计算系统因果链' : 'Computing-system causal chain'}>
        {causalNodes.map((node, index) => (
          <div className="causal-atlas__step" role="listitem" key={node.id}>
            <button type="button" aria-label={node.label[language]} aria-pressed={node.id === active.id} onClick={() => setActiveId(node.id)}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <strong>{node.label[language]}</strong>
            </button>
            {index < causalNodes.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
          </div>
        ))}
      </div>

      <div className="causal-atlas__inspector" aria-live="polite">
        <div>
          <span>{language === 'zh' ? '定义' : 'Definition'}</span>
          <p>{active.definition[language]}</p>
        </div>
        <div>
          <span>{language === 'zh' ? '必要条件' : 'Necessary condition'}</span>
          <p>{active.necessary[language]}</p>
        </div>
        <div>
          <span>{language === 'zh' ? '约束式' : 'Constraint'}</span>
          <p className="causal-atlas__expression">{active.expression[language]}</p>
        </div>
        <div>
          <span>{language === 'zh' ? '失败条件' : 'Failure condition'}</span>
          <p>{active.failure[language]}</p>
        </div>
        <a href={routeHref(active.route)}>
          {language === 'zh' ? `进入${destination?.label.zh ?? ''}` : `Open ${destination?.label.en ?? ''}`}
          <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
