import type { ReactNode } from 'react'
import type { Language, LocalizedText } from '../../types/content'
import './coreQuestions.css'

interface CoreQuestionFrameProps {
  id: string
  eyebrow: LocalizedText
  title: LocalizedText
  thesis: LocalizedText
  conclusion: LocalizedText
  language: Language
  children: ReactNode
}

export default function CoreQuestionFrame({ id, eyebrow, title, thesis, conclusion, language, children }: CoreQuestionFrameProps) {
  const titleId = `${id}-title`

  return (
    <section className={`core-question-map core-question-map--${id}`} id={id} aria-labelledby={titleId}>
      <header className="core-question-map__header">
        <span>{eyebrow[language]}</span>
        <h2 id={titleId}>{title[language]}</h2>
        <p>{thesis[language]}</p>
      </header>
      <div className="core-question-map__body">{children}</div>
      <footer className="core-question-map__conclusion">
        <span>{language === 'zh' ? '核心判断' : 'Core judgment'}</span>
        <p>{conclusion[language]}</p>
      </footer>
    </section>
  )
}
