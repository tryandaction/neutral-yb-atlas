import { ExternalLink } from 'lucide-react'
import type { EvidenceEntry, Language } from '../../types/content'

interface CitationListProps {
  language: Language
  entries: EvidenceEntry[]
}

export default function CitationList({ language, entries }: CitationListProps) {
  return (
    <ol className="citation-list">
      {entries.map((entry) => (
        <li key={entry.id}>
          <a href={entry.source.url} target="_blank" rel="noreferrer">
            <span>{entry.label[language]} · {entry.source.citation}</span>
            <ExternalLink aria-hidden="true" />
          </a>
        </li>
      ))}
    </ol>
  )
}
