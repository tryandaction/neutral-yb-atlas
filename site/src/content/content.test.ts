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
  expect(chapters[0].question.zh).toContain('DiVincenzo')
  expect(chapters[1].question.zh).toMatch(/超导.*离子阱.*光子/)
  expect(chapters[2].question.zh).toMatch(/Rb.*Cs.*Sr/)

  const openingCopy = chapters.slice(0, 3).flatMap((chapter) => chapter.sections.map((section) => section.body.zh)).join('\n')
  const divincenzo = chapters[0].sections.find((section) => section.id === 'divincenzo-criteria')!
  expect(divincenzo.keyPoints?.map((point) => point.title.zh).join(' ')).toMatch(/可扩展.*初始化.*相干.*通用门.*测量/)
  expect(openingCopy).toMatch(/超导.*离子阱.*光子.*中性原子/s)
  expect(openingCopy).toMatch(/Rb.*Cs.*Sr.*171Yb/s)
  expect(openingCopy).toMatch(/误报.*漏报.*残余 Pauli.*周期/s)
  expect(openingCopy).not.toMatch(/一次有效 shot 通常依次包含/)
})

it('teaches the five DiVincenzo computation criteria as distinct physical requirements', () => {
  const foundations = chapters.find((chapter) => chapter.id === 'quantum-foundations')!
  const criterion = foundations.sections.find((section) => section.id === 'divincenzo-criteria') as typeof foundations.sections[number] & {
    keyPoints?: Array<{ title: { zh: string; en: string }; body: { zh: string; en: string } }>
  }

  expect(criterion.keyPoints).toHaveLength(5)
  expect(criterion.keyPoints?.map((item) => item.title.zh).join(' ')).toMatch(/可扩展.*初始化.*相干.*通用门集.*测量/)
  expect(criterion.body.zh).toMatch(/两项.*量子通信/)
  expect(criterion.equation).toBeUndefined()
})

it('places each chapter equation next to its physical meaning and scope', () => {
  const formulaSections = chapters.flatMap((chapter) => chapter.sections).filter((section) => section.equation)

  expect(formulaSections).not.toHaveLength(0)
  expect(formulaSections.every((section) => {
    const explained = section as typeof section & { equationNote?: { zh: string; en: string } }
    return explained.equationNote?.zh.length && explained.equationNote.en.length
  })).toBe(true)

  const universality = chapters[0].sections.find((section) => section.id === 'entanglement-error-correction') as typeof chapters[number]['sections'][number] & {
    equationNote?: { zh: string; en: string }
  }
  expect(universality.equation).toContain('U_{AB}')
  expect(universality.equationNote?.zh).toMatch(/U_A.*U_B.*不可分解/)
})

it('connects universal fault tolerance to a conditional resource and cost argument', () => {
  const faultTolerance = chapters.find((chapter) => chapter.id === 'fault-tolerance')
  expect(faultTolerance).toBeDefined()

  const copy = faultTolerance!.sections.map((section) => `${section.title.zh}\n${section.body.zh}`).join('\n')
  expect(copy).toMatch(/通用门集.*容错实现/s)
  expect(copy).toMatch(/物理机制.*电路级通道.*解码器.*逻辑错误率/s)
  expect(copy).toMatch(/码距.*逻辑错误/s)
  expect(copy).toMatch(/吞吐.*可用率.*可信结果成本/s)
})

it('keeps platform and species claims comparative rather than absolute', () => {
  const comparativeCopy = chapters.slice(1, 3).flatMap((chapter) => chapter.sections.map((section) => section.body.zh)).join('\n')

  expect(comparativeCopy).not.toMatch(/最佳平台|全面优于|天然容错|必然降低/)
  expect(comparativeCopy).toMatch(/固定.*任务|同一.*口径/)
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
