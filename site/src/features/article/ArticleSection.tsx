import type { ArticleSection as ArticleSectionData, Language } from '../../types/content'
import { RotateCcw } from 'lucide-react'
import EditableBlock from './EditableBlock'
import Equation from './Equation'
import ResearchLedger from './ResearchLedger'
import WikiText from '../wiki/WikiText'
import './article.css'

interface ArticleSectionProps {
  language: Language
  section: ArticleSectionData
  editing: boolean
  override?: string
  onChange: (id: string, value: string) => void
  onReset?: (id: string) => void
}

export default function ArticleSection({ language, section, editing, override, onChange, onReset }: ArticleSectionProps) {
  const resetLabel = language === 'zh'
    ? `恢复“${section.title.zh}”默认正文`
    : `Restore default text for “${section.title.en}”`

  return (
    <section className="article-section" id={section.id}>
      <div className="article-section__index" aria-hidden="true">{section.id.replaceAll('-', ' / ')}</div>
      <div className="article-section__content">
        <div className="article-section__heading">
          <h3>{section.title[language]}</h3>
          {editing && override !== undefined && onReset ? (
            <button type="button" aria-label={resetLabel} title={resetLabel} onClick={() => onReset(section.id)}>
              <RotateCcw aria-hidden="true" />
              <span>{language === 'zh' ? '恢复本段' : 'Restore block'}</span>
            </button>
          ) : null}
        </div>
        {editing ? (
          <EditableBlock
            value={override ?? section.body[language]}
            editing
            label={`${language === 'zh' ? '编辑' : 'Edit'} ${section.title[language]}`}
            onChange={(value) => onChange(section.id, value)}
          />
        ) : <p className="editable-block"><WikiText text={override ?? section.body[language]} language={language} /></p>}
        {section.equation ? <Equation source={section.equation} /> : null}
        {section.takeaway ? <blockquote>{section.takeaway[language]}</blockquote> : null}
        {section.research ? <ResearchLedger detail={section.research} language={language} /> : null}
      </div>
    </section>
  )
}
