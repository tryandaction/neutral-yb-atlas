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

it('organizes the opening chapters around physical computability and the Yb interface bundle', () => {
  expect(chapters[0].question.zh).toBe('从“可表示状态”到“可扩展计算”，每一层必须满足什么物理条件？')
  expect(chapters[1].question.zh).toBe('原子为什么能够计算，中性原子怎样按需打开相互作用？')
  expect(chapters[2].question.zh).toBe('在固定的纠错周期任务下，171Yb 的接口组合解决什么约束，又引入什么代价？')

  const openingCopy = chapters.slice(0, 3).flatMap((chapter) => chapter.sections.map((section) => section.body.zh)).join('\n')
  expect(openingCopy).toMatch(/可区分状态.*可组合变换.*条件动力学/s)
  expect(openingCopy).toMatch(/同一同位素.*天然一致的内部态谱/)
  expect(openingCopy).toMatch(/接口组合.*工程复杂度/)
  expect(openingCopy).not.toMatch(/一次有效 shot 通常依次包含/)
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
