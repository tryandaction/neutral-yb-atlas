import { Fragment } from 'react'
import type { Language } from '../../types/content'
import { wikiEntries } from './wikiEntries'
import { createWikiIndex, segmentWikiText } from './wikiIndex'
import { useOptionalWiki } from './WikiContext'

const wikiIndex = createWikiIndex(wikiEntries)

export function WikiTerm({ id, children, language }: { id: string; children?: string; language: Language }) {
  const wiki = useOptionalWiki()
  const entry = wikiIndex.byId.get(id)
  if (!entry || !wiki) return <>{children ?? id}</>

  return (
    <button
      type="button"
      className="wiki-term"
      aria-label={`${language === 'zh' ? '查看 Wiki' : 'Open Wiki'}：${entry.term[language]}`}
      title={`${entry.term[language]} · Wiki`}
      onClick={() => wiki.openEntry(id)}
    >
      {children ?? entry.abbreviation ?? entry.term[language]}
    </button>
  )
}

export default function WikiText({ text, language, disabled = false }: { text: string; language: Language; disabled?: boolean }) {
  const wiki = useOptionalWiki()
  if (disabled || !wiki) return <>{text}</>

  const linked = new Set<string>()
  return (
    <>
      {segmentWikiText(text, wikiEntries).map((segment, index) => {
        if (segment.type === 'text' || !segment.entryId || linked.has(segment.entryId)) {
          return <Fragment key={`${index}-${segment.value}`}>{segment.value}</Fragment>
        }
        linked.add(segment.entryId)
        const entry = wikiIndex.byId.get(segment.entryId)
        if (!entry) return <Fragment key={`${index}-${segment.value}`}>{segment.value}</Fragment>
        return (
          <button
            key={`${index}-${segment.value}`}
            type="button"
            className="wiki-term"
            aria-label={`${language === 'zh' ? '查看 Wiki' : 'Open Wiki'}：${entry.term[language]}`}
            title={`${entry.term[language]} · Wiki`}
            onClick={() => wiki.openEntry(entry.id)}
          >
            {segment.value}
          </button>
        )
      })}
    </>
  )
}
