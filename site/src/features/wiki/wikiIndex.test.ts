import type { WikiEntry } from './wikiTypes'
import { createWikiIndex, normalizeWikiAlias, searchWikiEntries, segmentWikiText } from './wikiIndex'

const entry = (id: string, zh: string, en: string, aliases: string[]): WikiEntry => ({
  id,
  term: { zh, en },
  abbreviation: aliases[0],
  aliases,
  category: 'optics',
  summary: { zh: `${zh}摘要`, en: `${en} summary` },
  role: { zh: `${zh}作用`, en: `${en} role` },
  principles: [{ title: { zh: '原理', en: 'Principle' }, body: { zh: '正文', en: 'Body' } }],
  equations: [],
  workflow: [],
  specifications: [],
  diagnostics: [],
  related: [],
  sources: [{ citation: 'Source', url: 'https://example.org' }],
})

const entries = [
  entry('aod', '声光偏转器', 'Acousto-optic deflector', ['AOD', '声光偏转器', 'acousto-optic deflector']),
  entry('high-na', '高数值孔径物镜', 'High-NA objective', ['高 NA 物镜', 'high-NA objective', 'objective']),
  entry('na', '数值孔径', 'Numerical aperture', ['NA', '数值孔径', 'numerical aperture']),
]

it('normalizes Latin aliases without changing Chinese terms', () => {
  expect(normalizeWikiAlias('  High‑NA   Objective ')).toBe('high-na objective')
  expect(normalizeWikiAlias('声光偏转器')).toBe('声光偏转器')
})

it('indexes IDs and bilingual aliases case-insensitively', () => {
  const index = createWikiIndex(entries)

  expect(index.byId.get('aod')?.term.zh).toBe('声光偏转器')
  expect(index.byAlias.get('aod')?.id).toBe('aod')
  expect(index.byAlias.get('声光偏转器')?.id).toBe('aod')
  expect(index.byAlias.get('high-na objective')?.id).toBe('high-na')
})

it('segments longest terms first and preserves all punctuation and spaces', () => {
  const input = '高 NA 物镜由 AOD 扫描；AODized 不是缩写，NA 决定收集角。'
  const segments = segmentWikiText(input, entries)

  expect(segments.filter((item) => item.type === 'term').map((item) => [item.value, item.entryId])).toEqual([
    ['高 NA 物镜', 'high-na'],
    ['AOD', 'aod'],
    ['NA', 'na'],
  ])
  expect(segments.map((item) => item.value).join('')).toBe(input)
})

it('searches terms, aliases and summaries in either language', () => {
  expect(searchWikiEntries(entries, '声光').map((item) => item.id)).toEqual(['aod'])
  expect(searchWikiEntries(entries, 'objective').map((item) => item.id)).toEqual(['high-na'])
  expect(searchWikiEntries(entries, 'AOD SUMMARY').map((item) => item.id)).toEqual(['aod'])
})
