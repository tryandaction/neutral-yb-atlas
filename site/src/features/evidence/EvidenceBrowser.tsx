import { useDeferredValue, useState } from 'react'
import type { EvidenceEntry, EvidenceStatus, Language } from '../../types/content'
import './evidence.css'

interface EvidenceBrowserProps { language: Language; entries: EvidenceEntry[] }

const statusLabels: Record<EvidenceStatus, string> = {
  confirmed: 'confirmed', confirmed_from_official_source_data: 'source data', derived_confirmed: 'derived', candidate: 'candidate', candidate_digitized: 'digitized', missing: 'missing', unavailable: 'unavailable',
}

export default function EvidenceBrowser({ language, entries }: EvidenceBrowserProps) {
  const [status, setStatus] = useState<EvidenceStatus | 'all'>('all')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())
  const filtered = entries.filter((entry) => (status === 'all' || entry.status === status) && (!deferredQuery || `${entry.label.zh} ${entry.label.en} ${entry.note.zh} ${entry.note.en}`.toLowerCase().includes(deferredQuery)))

  return (
    <section className="evidence-browser" id="evidence">
      <header><div><span>EVIDENCE REGISTRY</span><h2>{language === 'zh' ? '每个数字都应知道自己从哪里来' : 'Every number should know where it came from'}</h2></div><p>{language === 'zh' ? '确认值、派生值、候选值和缺失项使用不同声明边界。筛选不会改变来源记录。' : 'Confirmed, derived, candidate and missing values carry distinct claim boundaries. Filtering never changes provenance.'}</p></header>
      <div className="evidence-browser__tools"><label><span>{language === 'zh' ? '搜索' : 'Search'}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === 'zh' ? '波长、门、仪器…' : 'wavelength, gate, instrument…'} /></label><label><span>{language === 'zh' ? '证据状态' : 'Evidence status'}</span><select aria-label={language === 'zh' ? '证据状态' : 'Evidence status'} value={status} onChange={(event) => setStatus(event.target.value as EvidenceStatus | 'all')}><option value="all">{language === 'zh' ? '全部' : 'All'}</option><option value="confirmed">confirmed</option><option value="confirmed_from_official_source_data">source data</option><option value="derived_confirmed">derived</option><option value="candidate">candidate</option><option value="missing">missing</option></select></label></div>
      <div className="evidence-table" role="table">
        <div className="evidence-table__head" role="row"><span role="columnheader">{language === 'zh' ? '参数 / 结论' : 'Parameter / claim'}</span><span role="columnheader">{language === 'zh' ? '值' : 'Value'}</span><span role="columnheader">Status</span><span role="columnheader">{language === 'zh' ? '来源与边界' : 'Source and boundary'}</span></div>
        {filtered.map((entry) => <div className="evidence-table__row" role="row" key={entry.id}><strong role="cell">{entry.label[language]}</strong><span role="cell" className="evidence-value">{entry.value} {entry.unit}</span><span role="cell"><i data-status={entry.status}>{statusLabels[entry.status]}</i></span><span role="cell"><a href={entry.source.url} target="_blank" rel="noreferrer">{entry.source.citation}</a><small>{entry.note[language]}</small></span></div>)}
      </div>
    </section>
  )
}
