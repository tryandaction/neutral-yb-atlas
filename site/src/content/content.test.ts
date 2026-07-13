import { chapters } from './chapters'
import { evidenceEntries } from './evidence'
import { experimentPhases } from './experiment'

it('keeps seven Chinese and English chapters paired', () => {
  expect(chapters).toHaveLength(7)

  for (const chapter of chapters) {
    expect(chapter.title.zh).toBeTruthy()
    expect(chapter.title.en).toBeTruthy()
    expect(chapter.sections.length).toBeGreaterThanOrEqual(4)

    for (const section of chapter.sections) {
      expect(section.title.zh).toBeTruthy()
      expect(section.title.en).toBeTruthy()
      expect(section.body.zh.length).toBeGreaterThan(80)
      expect(section.body.en.length).toBeGreaterThan(100)
    }
  }
})

it('requires a source and unit for confirmed numeric evidence', () => {
  const confirmed = evidenceEntries.filter((entry) =>
    entry.status.startsWith('confirmed'),
  )

  expect(confirmed.length).toBeGreaterThan(4)

  for (const entry of confirmed) {
    expect(entry.source.url).toBeTruthy()
    expect(entry.source.citation).toBeTruthy()
    if (typeof entry.value === 'number') expect(entry.unit).toBeTruthy()
  }
})

it('models a complete ordered experimental lifecycle', () => {
  expect(experimentPhases).toHaveLength(7)
  expect(experimentPhases.map((phase) => phase.order)).toEqual([
    1, 2, 3, 4, 5, 6, 7,
  ])

  for (const phase of experimentPhases) {
    expect(phase.acceptance.length).toBeGreaterThan(0)
    expect(phase.instruments.length).toBeGreaterThanOrEqual(3)
    expect(phase.durationWeeks[0]).toBeLessThanOrEqual(
      phase.durationWeeks[1],
    )
  }
})
