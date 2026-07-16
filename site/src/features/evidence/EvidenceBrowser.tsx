import type { EvidenceEntry, Language } from '../../types/content'
import './evidence.css'

interface EvidenceBrowserProps { language: Language; entries: EvidenceEntry[] }

const domainLabels: Record<EvidenceEntry['domain'], Record<Language, string>> = {
  atomic: { zh: '原子与能级', en: 'Atoms and levels' },
  gate: { zh: '量子门与相互作用', en: 'Gates and interactions' },
  experiment: { zh: '实验系统', en: 'Experimental systems' },
  architecture: { zh: '容错与架构', en: 'Fault tolerance and architecture' },
}

export default function EvidenceBrowser({ language, entries }: EvidenceBrowserProps) {
  const groups = (Object.keys(domainLabels) as EvidenceEntry['domain'][])
    .map((domain) => ({ domain, entries: entries.filter((entry) => entry.domain === domain) }))
    .filter((group) => group.entries.length)

  return (
    <section className="evidence-browser" id="evidence">
      <header>
        <div><h2>{language === 'zh' ? '延伸阅读与出处' : 'Further reading and sources'}</h2></div>
        <p>{language === 'zh' ? '每一条阅读都对应页面中的一个概念、数值或物理过程。先理解正文，再按需要回到原始论文和权威数据库。' : 'Each entry traces a concept, value or physical process used in the atlas. Read the lesson first, then follow the original paper or authoritative database when needed.'}</p>
      </header>
      <div className="reading-list">
        {groups.map((group) => (
          <section key={group.domain} className="reading-list__group" aria-labelledby={`reading-${group.domain}`}>
            <h3 id={`reading-${group.domain}`}>{domainLabels[group.domain][language]}</h3>
            <ol>
              {group.entries.map((entry) => (
                <li key={entry.id}>
                  <div>
                    <h4>{entry.label[language]}</h4>
                    <p>{entry.note[language]}</p>
                  </div>
                  <div className="reading-list__source">
                    <span>{entry.value}{entry.unit ? ` ${entry.unit}` : ''}</span>
                    <a href={entry.source.url} target="_blank" rel="noreferrer">{entry.source.citation}</a>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </section>
  )
}
