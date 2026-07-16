import { BookOpen } from 'lucide-react'
import { routeHref, routes, type RouteId } from '../navigation/routes'
import type { Language, ReadingMode } from '../types/content'
import LanguageSwitch from './LanguageSwitch'
import ModeSwitch from './ModeSwitch'
import './app-header.css'

interface AppHeaderProps {
  language: Language
  mode: ReadingMode
  route: RouteId
  onLanguageChange: (language: Language) => void
  onModeChange: (mode: ReadingMode) => void
  onWikiOpen?: () => void
}

export default function AppHeader({ language, mode, route, onLanguageChange, onModeChange, onWikiOpen }: AppHeaderProps) {
  return (
    <header className={`app-header${route === 'overview' ? ' app-header--cover' : ''}`}>
      <a className="brand" href="#top" aria-label="Neutral Yb Atlas">
        <span className="brand-mark" aria-hidden="true"><i />Yb</span>
        <span className="brand-name">NEUTRAL YB ATLAS</span>
      </a>
      <nav className="primary-nav" aria-label={language === 'zh' ? '主导航' : 'Primary navigation'}>
        {routes.map((item) => <a key={item.id} href={routeHref(item.id)} aria-current={item.id === route ? 'page' : undefined}>{item.label[language]}</a>)}
      </nav>
      <div className="header-tools">
        <ModeSwitch language={language} mode={mode} onChange={onModeChange} />
        <LanguageSwitch language={language} onChange={onLanguageChange} />
        {onWikiOpen ? <button className="icon-button" type="button" aria-label={language === 'zh' ? '打开术语索引' : 'Open research term Wiki'} title={language === 'zh' ? '术语索引' : 'Term index'} onClick={onWikiOpen}><BookOpen aria-hidden="true" /></button> : null}
      </div>
    </header>
  )
}
