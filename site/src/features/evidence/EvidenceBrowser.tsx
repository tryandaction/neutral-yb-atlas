import type { EvidenceEntry, Language } from '../../types/content'
import './evidence.css'

interface EvidenceBrowserProps { language: Language; entries: EvidenceEntry[] }

const domainLabels: Record<EvidenceEntry['domain'], Record<Language, string>> = {
  atomic: { zh: '原子与能级', en: 'Atoms and levels' },
  gate: { zh: '量子门与相互作用', en: 'Gates and interactions' },
  experiment: { zh: '实验系统', en: 'Experimental systems' },
  architecture: { zh: '容错与架构', en: 'Fault tolerance and architecture' },
}

function ReadingItem({ entry, language, index }: { entry: EvidenceEntry; language: Language; index?: number }) {
  const metadata = entry.publicationYear && entry.readingType
    ? `${entry.publicationYear} · ${entry.readingType[language]}`
    : `${entry.value}${entry.unit ? ` ${entry.unit}` : ''}`

  return (
    <li>
      {index !== undefined && <span className="reading-list__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
      <div className="reading-list__summary">
        <h4>{entry.label[language]}</h4>
        <p>{entry.note[language]}</p>
      </div>
      <div className="reading-list__source">
        <span>{metadata}</span>
        <a href={entry.source.url} target="_blank" rel="noreferrer">{entry.source.citation}</a>
      </div>
    </li>
  )
}

export default function EvidenceBrowser({ language, entries }: EvidenceBrowserProps) {
  const frontier = entries
    .filter((entry) => entry.readingTier === 'frontier')
    .sort((a, b) => (b.publicationYear ?? 0) - (a.publicationYear ?? 0))
  const references = entries.filter((entry) => entry.readingTier !== 'frontier')
  const groups = (Object.keys(domainLabels) as EvidenceEntry['domain'][])
    .map((domain) => ({ domain, entries: references.filter((entry) => entry.domain === domain) }))
    .filter((group) => group.entries.length)

  return (
    <section className="evidence-browser" id="evidence">
      <header>
        <div><h2>{language === 'zh' ? '延伸阅读与出处' : 'Further reading and sources'}</h2></div>
        <p>{language === 'zh' ? '先读直接推进中性原子容错与 Yb-171 控制的近期成果，再按正文中的具体概念、数值和物理过程回到基础论文与权威数据库。' : 'Start with recent work that directly advances neutral-atom fault tolerance and Yb-171 control, then use the foundational papers and authoritative databases to trace specific concepts, values and processes from the lessons.'}</p>
      </header>
      <div className="reading-list">
        {frontier.length > 0 && (
          <section className="reading-list__frontier" aria-labelledby="reading-frontier">
            <header>
              <div>
                <span>{language === 'zh' ? '推荐顺序' : 'Recommended order'}</span>
                <h3 id="reading-frontier">{language === 'zh' ? '前沿必读' : 'Frontier papers'}</h3>
              </div>
              <p>{language === 'zh' ? '优先覆盖逻辑纠错、Yb 多流形相干接口、高保真门与深电路补原子。预印本会单独标明，不与同行评审结果等同。' : 'Prioritizes logical error correction, coherent interfaces across Yb manifolds, high-fidelity gates and atom replacement for deep circuits. Preprints are explicitly distinguished from peer-reviewed results.'}</p>
            </header>
            <ol>
              {frontier.map((entry, index) => <ReadingItem key={entry.id} entry={entry} language={language} index={index} />)}
            </ol>
          </section>
        )}
        <header className="reading-list__reference-header">
          <h3>{language === 'zh' ? '基础框架与参数出处' : 'Foundations and parameter sources'}</h3>
          <p>{language === 'zh' ? '用于核对准则、能级、跃迁、门模型与实验边界；年份较早不代表失效，但阅读目的与前沿结果不同。' : 'Use these to verify criteria, levels, transitions, gate models and experimental boundaries. Older dates do not make them obsolete, but their role differs from frontier results.'}</p>
        </header>
        {groups.map((group) => (
          <section key={group.domain} className="reading-list__group" aria-labelledby={`reading-${group.domain}`}>
            <h3 id={`reading-${group.domain}`}>{domainLabels[group.domain][language]}</h3>
            <ol>
              {group.entries.map((entry) => <ReadingItem key={entry.id} entry={entry} language={language} />)}
            </ol>
          </section>
        ))}
      </div>
    </section>
  )
}
