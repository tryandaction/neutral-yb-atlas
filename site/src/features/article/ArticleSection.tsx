import type { ArticleSection as ArticleSectionData, Language } from '../../types/content'
import Equation from './Equation'
import WikiText from '../wiki/WikiText'
import './article.css'

interface ArticleSectionProps {
  language: Language
  section: ArticleSectionData
}

export default function ArticleSection({ language, section }: ArticleSectionProps) {
  const isLearningSection = Boolean(
    section.question
    && section.answer
    && section.reasoning
    && section.measurement
    && section.boundary
    && section.sources
    && section.nextQuestion,
  )

  return (
    <section className="article-section" id={section.id}>
      <div className="article-section__index" aria-hidden="true">{section.id.replaceAll('-', ' / ')}</div>
      <div className="article-section__content">
        <div className="article-section__heading">
          <h3>{section.title[language]}</h3>
        </div>
        {isLearningSection ? (
          <>
            <p className="article-section__question">{section.question![language]}</p>
            <p className="article-section__answer"><WikiText text={section.answer![language]} language={language} /></p>
            <ol className="article-section__reasoning" aria-label={language === 'zh' ? '推导步骤' : 'Reasoning steps'}>
              {section.reasoning!.map((step) => <li key={step.en}><WikiText text={step[language]} language={language} /></li>)}
            </ol>
          </>
        ) : section.body ? <p className="editable-block"><WikiText text={section.body[language]} language={language} /></p> : null}
        {section.keyPoints?.length ? (
          <ol className="article-section__key-points" aria-label={language === 'zh' ? '关键条件' : 'Key conditions'}>
            {section.keyPoints.map((point) => (
              <li key={point.title.en}>
                <strong>{point.title[language]}</strong>
                <p>{point.body[language]}</p>
              </li>
            ))}
          </ol>
        ) : null}
        {typeof section.equation === 'string' ? (
          <div className="article-section__equation-block">
            <Equation source={section.equation} />
            {section.equationNote ? (
              <p className="equation-note">
                <strong>{language === 'zh' ? '公式的用途与边界' : 'Use and scope'}</strong>
                {section.equationNote[language]}
              </p>
            ) : null}
          </div>
        ) : null}
        {typeof section.equation === 'object' ? (
          <div className="article-section__equation-block">
            <Equation source={section.equation.expression} />
            <div className="article-section__equation-guide">
              <div><strong>{language === 'zh' ? '公式作用' : 'Why it is here'}</strong><p>{section.equation.role[language]}</p></div>
              <div><strong>{language === 'zh' ? '符号' : 'Symbols'}</strong><ul>{section.equation.symbols.map((item) => <li key={item.en}>{item[language]}</li>)}</ul></div>
              <div><strong>{language === 'zh' ? '假设与边界' : 'Assumptions and limits'}</strong><ul>{section.equation.assumptions.map((item) => <li key={item.en}>{item[language]}</li>)}</ul></div>
            </div>
          </div>
        ) : null}
        {isLearningSection ? (
          <div className="article-section__evidence">
            <div><strong>{language === 'zh' ? '怎样检验' : 'How to test it'}</strong><p>{section.measurement![language]}</p></div>
            <div><strong>{language === 'zh' ? '结论边界' : 'Claim boundary'}</strong><p>{section.boundary![language]}</p></div>
            <div className="article-section__sources"><strong>{language === 'zh' ? '来源' : 'Sources'}</strong>{section.sources!.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer">{source.citation}</a>)}</div>
          </div>
        ) : null}
        {section.takeaway ? <blockquote>{section.takeaway[language]}</blockquote> : null}
        {isLearningSection ? <p className="article-section__next"><strong>{language === 'zh' ? '下一问题' : 'Next question'}</strong>{section.nextQuestion![language]}</p> : null}
      </div>
    </section>
  )
}
