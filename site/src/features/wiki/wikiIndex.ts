import type { WikiCategory, WikiEntry, WikiTextSegment } from './wikiTypes'

const hyphenPattern = /[‐‑‒–—−]/g

export function normalizeWikiAlias(value: string) {
  return value
    .normalize('NFKC')
    .replace(hyphenPattern, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('en-US')
}

function entryAliases(entry: WikiEntry) {
  return [...new Set([
    entry.abbreviation,
    entry.term.zh,
    entry.term.en,
    ...entry.aliases,
  ].filter((value): value is string => Boolean(value?.trim())))]
}

export function createWikiIndex(entries: WikiEntry[]) {
  const byId = new Map<string, WikiEntry>()
  const byAlias = new Map<string, WikiEntry>()

  entries.forEach((entry) => {
    byId.set(entry.id, entry)
    entryAliases(entry).forEach((alias) => byAlias.set(normalizeWikiAlias(alias), entry))
  })

  return { byId, byAlias }
}

function isLatinAlias(alias: string) {
  return /[A-Za-z]/.test(alias) && !/[\u3400-\u9fff]/u.test(alias)
}

function isLatinWordCharacter(value: string | undefined) {
  return value ? /[A-Za-z0-9_]/.test(value) : false
}

function aliasPattern(alias: string) {
  return alias
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/[-‐‑‒–—−]/g, '[-‐‑‒–—−]')
    .replace(/\s+/g, '\\s+')
}

export function segmentWikiText(text: string, entries: WikiEntry[]): WikiTextSegment[] {
  const candidates = entries
    .flatMap((entry) => entryAliases(entry).map((alias) => ({
      alias,
      entryId: entry.id,
      latin: isLatinAlias(alias),
      matcher: new RegExp(`^${aliasPattern(alias)}`, 'iu'),
    })))
    .sort((a, b) => b.alias.length - a.alias.length)

  const segments: WikiTextSegment[] = []
  let plain = ''
  let cursor = 0

  const flushPlain = () => {
    if (!plain) return
    segments.push({ type: 'text', value: plain })
    plain = ''
  }

  while (cursor < text.length) {
    const remainder = text.slice(cursor)
    const match = candidates.find((candidate) => {
      const found = remainder.match(candidate.matcher)?.[0]
      if (!found) return false
      if (!candidate.latin) return true
      return !isLatinWordCharacter(text[cursor - 1]) && !isLatinWordCharacter(text[cursor + found.length])
    })

    if (!match) {
      plain += text[cursor]
      cursor += 1
      continue
    }

    const matchedValue = remainder.match(match.matcher)?.[0]
    if (!matchedValue) continue
    flushPlain()
    segments.push({ type: 'term', value: matchedValue, entryId: match.entryId })
    cursor += matchedValue.length
  }

  flushPlain()
  return segments
}

export function searchWikiEntries(
  entries: WikiEntry[],
  query: string,
  category?: WikiCategory | 'all',
) {
  const normalizedQuery = normalizeWikiAlias(query)

  return entries.filter((entry) => {
    if (category && category !== 'all' && entry.category !== category) return false
    if (!normalizedQuery) return true

    const haystack = normalizeWikiAlias([
      entry.term.zh,
      entry.term.en,
      entry.abbreviation,
      ...entry.aliases,
      entry.summary.zh,
      entry.summary.en,
      entry.role.zh,
      entry.role.en,
    ].filter(Boolean).join(' '))

    return normalizedQuery.split(' ').every((token) => haystack.includes(token))
  })
}
