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
        {section.equation ? <Equation source={section.equation} /> : null}
        {section.takeaway ? <blockquote>{section.takeaway[language]}</blockquote> : null}
      </div>
    </section>
  )
}
