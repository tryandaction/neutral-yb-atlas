import type { ArticleSection as ArticleSectionData, Language } from '../../types/content'
import Equation from './Equation'
import WikiText from '../wiki/WikiText'
import './article.css'

interface ArticleSectionProps {
  language: Language
  section: ArticleSectionData
}

export default function ArticleSection({ language, section }: ArticleSectionProps) {
  return (
    <section className="article-section" id={section.id}>
      <div className="article-section__index" aria-hidden="true">{section.id.replaceAll('-', ' / ')}</div>
      <div className="article-section__content">
        <div className="article-section__heading">
          <h3>{section.title[language]}</h3>
        </div>
        <p className="editable-block"><WikiText text={section.body[language]} language={language} /></p>
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
        {section.equation ? (
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
        {section.takeaway ? <blockquote>{section.takeaway[language]}</blockquote> : null}
      </div>
    </section>
  )
}
