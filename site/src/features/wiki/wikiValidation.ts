import { normalizeWikiAlias } from './wikiIndex'
import type { WikiEntry } from './wikiTypes'

function hasLocalizedText(value: { zh: string; en: string } | undefined) {
  return Boolean(value?.zh.trim() && value.en.trim())
}

export function validateWikiEntries(entries: WikiEntry[]) {
  const errors: string[] = []
  const ids = new Set<string>()
  const aliases = new Map<string, string>()

  entries.forEach((entry) => {
    if (ids.has(entry.id)) errors.push(`duplicate id: ${entry.id}`)
    ids.add(entry.id)

    if (!hasLocalizedText(entry.term)) errors.push(`missing bilingual term: ${entry.id}`)
    if (!hasLocalizedText(entry.summary)) errors.push(`missing bilingual summary: ${entry.id}`)
    if (!hasLocalizedText(entry.role)) errors.push(`missing bilingual role: ${entry.id}`)
    if (!entry.principles.length) errors.push(`missing principle: ${entry.id}`)
    if (!entry.sources.length) errors.push(`missing source: ${entry.id}`)

    const candidateAliases = [entry.abbreviation, entry.term.zh, entry.term.en, ...entry.aliases]
      .filter((value): value is string => Boolean(value?.trim()))
    candidateAliases.forEach((alias) => {
      const normalized = normalizeWikiAlias(alias)
      const owner = aliases.get(normalized)
      if (owner && owner !== entry.id) errors.push(`duplicate alias: ${alias} (${owner}, ${entry.id})`)
      aliases.set(normalized, entry.id)
    })
  })

  entries.forEach((entry) => {
    entry.related.forEach((relatedId) => {
      if (!ids.has(relatedId)) errors.push(`missing related id: ${entry.id} -> ${relatedId}`)
    })
  })

  return errors
}
