import { chapters } from './chapters'
import { evidenceEntries } from './evidence'
import { experimentPhases } from './experiment'

it('keeps seven Chinese and English chapters paired', () => {
  expect(chapters).toHaveLength(7)

  for (const chapter of chapters) {
    expect(chapter.title.zh).toBeTruthy()
    expect(chapter.title.en).toBeTruthy()
    expect(chapter.sections.length).toBeGreaterThanOrEqual(3)

    for (const section of chapter.sections) {
      const primaryCopy = section.answer ?? section.body
      expect(section.title.zh).toBeTruthy()
      expect(section.title.en).toBeTruthy()
      expect(primaryCopy?.zh.length).toBeGreaterThan(40)
      expect(primaryCopy?.en.length).toBeGreaterThan(60)
    }
  }
})

it('organizes the opening chapters around physical computability and the Yb interface bundle', () => {
  expect(chapters[0].question.zh).toMatch(/抽象规则.*物理能力/)
  expect(chapters[0].sections.some((section) => section.id === 'divincenzo-requirements')).toBe(true)
  expect(chapters[1].question.zh).toMatch(/超导.*离子阱.*光子/)
  expect(chapters[2].question.zh).toMatch(/Rb.*Cs.*Sr/)

  const openingCopy = chapters.slice(0, 3).flatMap((chapter) => chapter.sections.map((section) => (section.answer ?? section.body)?.zh ?? '')).join('\n')
  const divincenzo = chapters[0].sections.find((section) => section.id === 'divincenzo-requirements')!
  expect(divincenzo.reasoning?.map((item) => item.zh).join(' ')).toMatch(/可扩展.*初始化.*相干.*通用门.*测量/)
  expect(openingCopy).toMatch(/超导.*离子阱.*光子.*中性原子/s)
  expect(openingCopy).toMatch(/Rb.*Cs.*Sr.*171Yb/s)
  expect(openingCopy).toMatch(/误报.*漏报.*残余 Pauli.*周期/s)
  expect(openingCopy).not.toMatch(/一次有效 shot 通常依次包含/)
})

it('teaches the five DiVincenzo computation criteria as distinct physical requirements', () => {
  const foundations = chapters.find((chapter) => chapter.id === 'quantum-foundations')!
  const criterion = foundations.sections.find((section) => section.id === 'divincenzo-requirements')!

  expect(criterion.reasoning).toHaveLength(5)
  expect(criterion.reasoning?.map((item) => item.zh).join(' ')).toMatch(/可扩展.*初始化.*相干.*通用门集.*测量/)
  expect(criterion.boundary?.zh).toMatch(/两项.*量子通信/)
  expect(criterion.equation).toBeUndefined()
})

it('derives physical quantum computation in four causal steps', () => {
  const foundations = chapters.find((chapter) => chapter.id === 'quantum-foundations')!

  expect(foundations.sections.map((section) => section.id)).toEqual([
    'what-is-computation',
    'what-quantum-changes',
    'divincenzo-requirements',
    'universal-corrected-fault-tolerant',
  ])
  expect(JSON.stringify(foundations.sections[0].equation)).toContain('y=f(x)')
  expect(JSON.stringify(foundations.sections[1].equation)).toContain('operatorname{Tr}')
  expect(foundations.sections[2].reasoning).toHaveLength(5)
  expect(foundations.sections[3].answer?.zh).toMatch(/通用.*不等于.*容错/)
  expect(JSON.stringify(foundations)).not.toContain('U_{AB}')
})

it('places each chapter equation next to its physical meaning and scope', () => {
  const formulaSections = chapters.flatMap((chapter) => chapter.sections).filter((section) => section.equation)

  expect(formulaSections).not.toHaveLength(0)
  expect(formulaSections.every((section) => typeof section.equation === 'string'
    ? Boolean(section.equationNote?.zh.length && section.equationNote.en.length)
    : Boolean(section.equation?.role.zh.length
      && section.equation.role.en.length
      && section.equation.symbols.length
      && section.equation.assumptions.length))).toBe(true)

  const universality = chapters[0].sections.find((section) => section.id === 'universal-corrected-fault-tolerant')!
  expect(JSON.stringify(universality.equation)).toContain('p_L')
  expect(JSON.stringify(universality)).not.toContain('U_{AB}')
})

it('connects universal fault tolerance to a conditional resource and cost argument', () => {
  const faultTolerance = chapters.find((chapter) => chapter.id === 'fault-tolerance')
  expect(faultTolerance).toBeDefined()

  const copy = faultTolerance!.sections.map((section) => `${section.title.zh}\n${(section.answer ?? section.body)?.zh ?? ''}`).join('\n')
  expect(copy).toMatch(/通用门集.*容错实现/s)
  expect(copy).toMatch(/物理机制.*电路级通道.*解码器.*逻辑错误率/s)
  expect(copy).toMatch(/码距.*逻辑错误/s)
  expect(copy).toMatch(/吞吐.*可用率.*可信结果成本/s)
})

it('keeps platform and species claims comparative rather than absolute', () => {
  const comparativeCopy = chapters.slice(1, 3).flatMap((chapter) => chapter.sections.map((section) => (section.answer ?? section.body)?.zh ?? '')).join('\n')

  expect(comparativeCopy).not.toMatch(/最佳平台|全面优于|天然容错|必然降低/)
  expect(comparativeCopy).toMatch(/固定.*任务|同一.*口径/)
})

it('derives neutral-atom and Yb choices from a fixed task and decoder-visible records', () => {
  const neutralAtoms = chapters.find((chapter) => chapter.id === 'neutral-atoms')!
  const ytterbium = chapters.find((chapter) => chapter.id === 'why-yb')!

  expect(neutralAtoms.sections.map((section) => section.id)).toEqual([
    'fix-the-computational-task',
    'neutral-atom-exchange',
    'platform-decision',
  ])
  expect(ytterbium.sections.map((section) => section.id)).toEqual([
    'compare-the-functional-chain',
    'why-171yb',
    'erasure-information-chain',
  ])
  expect(JSON.stringify(ytterbium)).toMatch(/Rydberg.*计算子空间.*检测.*漏报.*误报.*解码器.*逻辑错误率/s)
})

it('derives an accepted gate from levels, dynamics and discriminating evidence', () => {
  const gates = chapters.find((chapter) => chapter.id === 'gates')!

  expect(gates.sections.map((section) => section.id)).toEqual([
    'levels-to-controls',
    'single-atom-drive',
    'blockade-to-controlled-phase',
    'gate-evidence',
  ])
  expect(JSON.stringify(gates)).toMatch(/能级.*哈密顿量.*阻塞.*条件相位.*真值表.*Bell.*泄漏/s)
  expect(JSON.stringify(gates)).not.toMatch(/理论交付|下一项测量|放行合同/)
})

it('orders the atom cycle and fault-tolerance chain without research-workflow language', () => {
  const experiment = chapters.find((chapter) => chapter.id === 'experiment')!
  const faultTolerance = chapters.find((chapter) => chapter.id === 'fault-tolerance')!

  expect(experiment.sections.map((section) => section.id)).toEqual([
    'prepare-the-array',
    'encode-and-control',
    'measure-decode-reset',
    'repeat-the-cycle',
  ])
  expect(faultTolerance.sections.map((section) => section.id)).toEqual([
    'physical-faults-to-cycle-channel',
    'decoder-record-to-logical-error',
    'distance-scaling',
    'trustworthy-result-cost',
  ])
  expect(JSON.stringify({ experiment, faultTolerance })).not.toMatch(/研究工作站|理论交付|放行合同|下一项研究任务/)
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
