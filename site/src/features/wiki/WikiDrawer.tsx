import { ArrowLeft, BookOpen, ExternalLink, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Language } from '../../types/content'
import Equation from '../article/Equation'
import { wikiEntries } from './wikiEntries'
import { createWikiIndex, searchWikiEntries } from './wikiIndex'
import { useWiki } from './WikiContext'
import type { WikiCategory, WikiEntry } from './wikiTypes'
import './wiki.css'

const wikiIndex = createWikiIndex(wikiEntries)
const categories: Array<{ id: WikiCategory | 'all'; zh: string; en: string }> = [
  { id: 'all', zh: '全部', en: 'All' },
  { id: 'physics', zh: '原子与动力学', en: 'Physics' },
  { id: 'optics', zh: '激光与光学', en: 'Optics' },
  { id: 'control', zh: '控制与时序', en: 'Control' },
  { id: 'vacuum', zh: '真空系统', en: 'Vacuum' },
  { id: 'measurement', zh: '测量与标定', en: 'Measurement' },
  { id: 'architecture', zh: '错误与架构', en: 'Architecture' },
]

function EntryIndex({ entries, language, onOpen }: { entries: WikiEntry[]; language: Language; onOpen: (id: string) => void }) {
  if (!entries.length) return <p className="wiki-drawer__empty">{language === 'zh' ? '没有匹配词条。请尝试缩写、英文名或物理量。' : 'No matching entry. Try an abbreviation, English term or physical quantity.'}</p>
  return (
    <div className="wiki-index">
      {entries.map((entry) => (
        <button type="button" key={entry.id} aria-label={`${language === 'zh' ? '打开词条' : 'Open entry'}：${entry.term[language]}`} onClick={() => onOpen(entry.id)}>
          <span>{entry.abbreviation ?? entry.term.en}</span>
          <strong>{entry.term[language]}</strong>
          <p>{entry.summary[language]}</p>
        </button>
      ))}
    </div>
  )
}

function EntryReader({ entry, language, onOpen }: { entry: WikiEntry; language: Language; onOpen: (id: string) => void }) {
  return (
    <article className="wiki-entry">
      <header>
        <span>{entry.abbreviation ?? categories.find((item) => item.id === entry.category)?.[language]}</span>
        <h2>{entry.term[language]}</h2>
        <p>{entry.summary[language]}</p>
        <strong>{entry.role[language]}</strong>
      </header>

      <section>
        <h3>{language === 'zh' ? '物理原理' : 'Physical principle'}</h3>
        {entry.principles.map((item) => <div className="wiki-entry__principle" key={item.title.en}><h4>{item.title[language]}</h4><p>{item.body[language]}</p></div>)}
      </section>

      {entry.equations.length ? <section><h3>{language === 'zh' ? '控制方程' : 'Governing equations'}</h3>{entry.equations.map((item) => <div className="wiki-entry__equation" key={item.expression}><Equation source={item.expression} /><p>{item.explanation[language]}</p>{item.symbols?.length ? <dl>{item.symbols.map((symbol) => <div key={symbol.symbol}><dt>{symbol.symbol}</dt><dd>{symbol.meaning[language]}</dd></div>)}</dl> : null}</div>)}</section> : null}

      <section>
        <h3>{language === 'zh' ? '实验工作流' : 'Experimental workflow'}</h3>
        <ol className="wiki-entry__workflow">{entry.workflow.map((item, index) => <li key={item.title.en}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{item.title[language]}</h4><p>{item.action[language]}</p><small>{language === 'zh' ? '交付：' : 'Output: '}{item.output[language]}</small></div></li>)}</ol>
      </section>

      <section>
        <h3>{language === 'zh' ? '选型与验收参数' : 'Selection and acceptance'}</h3>
        <div className="wiki-entry__specs">{entry.specifications.map((item) => <div key={item.parameter.en}><strong>{item.parameter[language]}</strong><p>{item.significance[language]}</p><small>{item.target[language]}</small></div>)}</div>
      </section>

      {entry.comparison?.length ? <section><h3>{language === 'zh' ? '方案对比' : 'Comparison'}</h3><div className="wiki-entry__comparison">{entry.comparison.map((row) => <div key={row.option.en}><strong>{row.option[language]}</strong><p><b>{language === 'zh' ? '优势' : 'Strength'}</b>{row.strengths[language]}</p><p><b>{language === 'zh' ? '限制' : 'Limit'}</b>{row.limitations[language]}</p><small>{row.useWhen[language]}</small></div>)}</div></section> : null}

      <section>
        <h3>{language === 'zh' ? '故障诊断' : 'Diagnostics'}</h3>
        <div className="wiki-entry__diagnostics">{entry.diagnostics.map((item) => <details key={item.symptom.en}><summary>{item.symptom[language]}</summary><p><b>{language === 'zh' ? '可能原因' : 'Likely causes'}</b>{item.causes[language]}</p><p><b>{language === 'zh' ? '检查路径' : 'Checks'}</b>{item.checks[language]}</p></details>)}</div>
      </section>

      <section>
        <h3>{language === 'zh' ? '关联词条' : 'Related entries'}</h3>
        <div className="wiki-entry__related">{entry.related.map((id) => { const related = wikiIndex.byId.get(id); return related ? <button type="button" key={id} aria-label={`${language === 'zh' ? '查看相关词条' : 'Open related entry'}：${related.term[language]}`} onClick={() => onOpen(id)}><span>{related.abbreviation ?? related.term.en}</span>{related.term[language]}</button> : null })}</div>
      </section>

      <section className="wiki-entry__sources">
        <h3>{language === 'zh' ? '来源' : 'Sources'}</h3>
        {entry.sources.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noreferrer"><span>{item.citation}</span><ExternalLink aria-hidden="true" /></a>)}
      </section>
    </article>
  )
}

export default function WikiDrawer({ language }: { language: Language }) {
  const { open, activeId, history, openEntry, closeWiki, goBack, openIndex } = useWiki()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<WikiCategory | 'all'>('all')
  const active = activeId ? wikiIndex.byId.get(activeId) ?? null : null
  const showIndex = !active || Boolean(query.trim())
  const results = useMemo(() => searchWikiEntries(wikiEntries, query, category), [query, category])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeWiki()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, closeWiki])

  if (!open) return null

  const resetToIndex = () => {
    setQuery('')
    setCategory('all')
    openIndex()
  }

  return (
    <div className="wiki-layer">
      <button type="button" className="wiki-layer__backdrop" aria-label={language === 'zh' ? '关闭 Wiki' : 'Close Wiki'} onClick={closeWiki} />
      <aside className="wiki-drawer" role="dialog" aria-modal="true" aria-label={language === 'zh' ? '术语索引' : 'Term index'}>
        <header className="wiki-drawer__toolbar">
          <button type="button" aria-label={history.length ? (language === 'zh' ? '返回上一词条' : 'Back to previous entry') : (language === 'zh' ? '返回 Wiki 索引' : 'Back to Wiki index')} onClick={history.length ? goBack : resetToIndex} disabled={!active && !query}><ArrowLeft aria-hidden="true" /></button>
          <button type="button" className="wiki-drawer__identity" onClick={resetToIndex}><BookOpen aria-hidden="true" /><span>Yb Wiki</span><small>{wikiEntries.length}</small></button>
          <button type="button" aria-label={language === 'zh' ? '关闭 Wiki' : 'Close Wiki'} onClick={closeWiki}><X aria-hidden="true" /></button>
        </header>

        <div className="wiki-drawer__search"><Search aria-hidden="true" /><input type="search" role="searchbox" aria-label={language === 'zh' ? '搜索术语、缩写或原理' : 'Search terms, abbreviations or principles'} placeholder={language === 'zh' ? 'AOD、失谐、Rydberg 阻塞…' : 'AOD, detuning, Rydberg blockade…'} value={query} onChange={(event) => setQuery(event.target.value)} /></div>

        {showIndex ? <><nav className="wiki-drawer__categories" aria-label={language === 'zh' ? 'Wiki 分类' : 'Wiki categories'}>{categories.map((item) => <button type="button" key={item.id} aria-label={`${language === 'zh' ? '筛选' : 'Filter'}：${item[language]}`} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item[language]}</button>)}</nav><div className="wiki-drawer__count">{language === 'zh' ? `${results.length} 个词条` : `${results.length} entries`}</div><EntryIndex entries={results} language={language} onOpen={(id) => { setQuery(''); openEntry(id) }} /></> : active ? <EntryReader entry={active} language={language} onOpen={openEntry} /> : null}
      </aside>
    </div>
  )
}
