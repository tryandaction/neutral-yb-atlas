import { wikiEntries } from './wikiEntries'
import { validateWikiEntries } from './wikiValidation'
import type { WikiEntry } from './wikiTypes'

it('publishes a substantial, internally connected bilingual registry', () => {
  expect(wikiEntries.length).toBeGreaterThanOrEqual(24)
  expect(validateWikiEntries(wikiEntries)).toEqual([])
})

it('gives AOD a complete experiment-facing treatment rather than a glossary stub', () => {
  const aod = wikiEntries.find((entry) => entry.id === 'aod')

  expect(aod?.equations.length).toBeGreaterThanOrEqual(1)
  expect(aod?.workflow.length).toBeGreaterThanOrEqual(4)
  expect(aod?.specifications.length).toBeGreaterThanOrEqual(4)
  expect(aod?.comparison?.some((row) => row.option.en.includes('SLM'))).toBe(true)
  expect(aod?.diagnostics.length).toBeGreaterThanOrEqual(2)
  expect(aod?.related).toContain('slm')
})

it('reports duplicate IDs, alias collisions, broken relations and empty bilingual fields', () => {
  const template = wikiEntries[0]
  const broken: WikiEntry[] = [
    template,
    {
      ...template,
      term: { zh: '', en: template.term.en },
      related: ['not-present'],
      sources: [],
    },
    {
      ...template,
      id: 'alias-collision',
      term: { zh: '别名冲突测试', en: 'Alias collision test' },
      aliases: [template.aliases[0]],
      related: [],
    },
  ]

  const errors = validateWikiEntries(broken).join('\n')
  expect(errors).toContain(`duplicate id: ${template.id}`)
  expect(errors).toContain('duplicate alias:')
  expect(errors).toContain(`missing bilingual term: ${template.id}`)
  expect(errors).toContain(`missing source: ${template.id}`)
  expect(errors).toContain(`${template.id} -> not-present`)
})
