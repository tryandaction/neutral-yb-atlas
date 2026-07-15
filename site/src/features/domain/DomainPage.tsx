import { PanelRightOpen, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import type { Language, LocalizedText } from '../../types/content'
import type { DomainOutlineItem } from './domainDefinitions'
import './domain.css'

interface DomainPageProps {
  language: Language
  title: LocalizedText
  thesis: LocalizedText
  outline: DomainOutlineItem[]
  contextTitle: LocalizedText
  contextItems: LocalizedText[]
  children: ReactNode
}

export default function DomainPage({ language, title, thesis, outline, contextTitle, contextItems, children }: DomainPageProps) {
  const [contextOpen, setContextOpen] = useState(false)
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="domain-page">
      <header className="domain-opening">
        <h1>{title[language]}</h1>
        <p>{thesis[language]}</p>
        <button type="button" className="domain-context-trigger" onClick={() => setContextOpen(true)}>
          <PanelRightOpen aria-hidden="true" />
          {language === 'zh' ? '打开上下文' : 'Open context'}
        </button>
      </header>

      <div className="domain-workbench">
        <nav className="domain-outline" aria-label={language === 'zh' ? '本页目录' : 'Page outline'}>
          <strong>{language === 'zh' ? '本页目录' : 'On this page'}</strong>
          {outline.map((item, index) => (
            <button type="button" key={item.id} onClick={() => scrollTo(item.id)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label[language]}
            </button>
          ))}
        </nav>

        <div className="domain-main">{children}</div>

        <aside className={`domain-context${contextOpen ? ' is-open' : ''}`} aria-label={contextTitle[language]}>
          <button type="button" className="domain-context-close" aria-label={language === 'zh' ? '关闭上下文' : 'Close context'} onClick={() => setContextOpen(false)}>
            <X aria-hidden="true" />
          </button>
          <strong>{contextTitle[language]}</strong>
          <ol>
            {contextItems.map((item) => <li key={item.en}>{item[language]}</li>)}
          </ol>
        </aside>
      </div>
    </div>
  )
}
