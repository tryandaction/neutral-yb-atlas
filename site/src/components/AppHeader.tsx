import { BookOpen, GitPullRequest, NotebookTabs, Pencil, X } from 'lucide-react'
import { siteCopy } from '../content/site'
import type { Language, ReadingMode } from '../types/content'
import LanguageSwitch from './LanguageSwitch'
import ModeSwitch from './ModeSwitch'
import './app-header.css'

interface AppHeaderProps {
  language: Language
  mode: ReadingMode
  editing: boolean
  onLanguageChange: (language: Language) => void
  onModeChange: (mode: ReadingMode) => void
  onEditingChange: (editing: boolean) => void
  contributionUrl?: string
  onWikiOpen?: () => void
  onWorkspaceOpen?: () => void
}

export default function AppHeader({
  language,
  mode,
  editing,
  onLanguageChange,
  onModeChange,
  onEditingChange,
  contributionUrl,
  onWikiOpen,
  onWorkspaceOpen,
}: AppHeaderProps) {
  const editLabel = language === 'zh' ? (editing ? '退出编辑' : '编辑正文') : editing ? 'Exit editing' : 'Edit article'

  return (
    <header className="app-header">
      <a className="brand" href="#top" aria-label="Neutral Yb Atlas">
        <span className="brand-mark" aria-hidden="true"><i />Yb</span>
        <span className="brand-name">NEUTRAL YB ATLAS</span>
      </a>

      <nav className="primary-nav" aria-label={language === 'zh' ? '主导航' : 'Primary navigation'}>
        {siteCopy.nav.map((item, index) => (
          <a key={item.en} href={['#foundations', '#yb-platform', '#theory', '#experiment'][index]}>
            {item[language]}
          </a>
        ))}
      </nav>

      <div className="header-tools">
        <ModeSwitch language={language} mode={mode} onChange={onModeChange} />
        <LanguageSwitch language={language} onChange={onLanguageChange} />
        {onWikiOpen ? (
          <button className="icon-button" type="button" aria-label={language === 'zh' ? '打开科研术语 Wiki' : 'Open research term Wiki'} title={language === 'zh' ? '科研术语 Wiki' : 'Research term Wiki'} onClick={onWikiOpen}>
            <BookOpen aria-hidden="true" />
          </button>
        ) : null}
        {onWorkspaceOpen ? (
          <button className="icon-button" type="button" aria-label={language === 'zh' ? '打开研究工作区' : 'Open research workspace'} title={language === 'zh' ? '打开研究工作区' : 'Open research workspace'} onClick={onWorkspaceOpen}>
            <NotebookTabs aria-hidden="true" />
          </button>
        ) : null}
        {contributionUrl ? (
          <a
            className="icon-button"
            href={contributionUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={language === 'zh' ? '提交内容建议' : 'Submit content suggestion'}
            title={language === 'zh' ? '提交内容建议' : 'Submit content suggestion'}
          >
            <GitPullRequest aria-hidden="true" />
          </a>
        ) : null}
        <button
          className={`icon-button${editing ? ' is-active' : ''}`}
          type="button"
          aria-label={editLabel}
          title={editLabel}
          aria-pressed={editing}
          onClick={() => onEditingChange(!editing)}
        >
          {editing ? <X aria-hidden="true" /> : <Pencil aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
