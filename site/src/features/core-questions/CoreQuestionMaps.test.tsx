import { render } from '@testing-library/react'
import { wikiEntries } from '../wiki/wikiEntries'
import { normalizeWikiAlias } from '../wiki/wikiIndex'
import { WikiProvider } from '../wiki/WikiProvider'
import ComputationPhysicalMap from './ComputationPhysicalMap'
import ExperimentEngineeringMap from './ExperimentEngineeringMap'
import FaultToleranceScaleMap from './FaultToleranceScaleMap'
import GateImplementationLoop from './GateImplementationLoop'
import YbDecisionMap from './YbDecisionMap'

it('renders the computation correspondence as a compact causal rail with typeset mathematics', () => {
  const { container } = render(<ComputationPhysicalMap language="en" />)

  expect(container.querySelector('.computation-physics-map')).toBeInTheDocument()
  expect(container.querySelectorAll('.computation-rail > li')).toHaveLength(4)
  expect(container.querySelector('.computation-physics-map__labels')).not.toBeInTheDocument()
  expect(container.querySelectorAll('.computation-physics-map .katex').length).toBeGreaterThanOrEqual(4)
  expect(container.querySelector('[role="table"]')).not.toBeInTheDocument()
})

it('uses a decision tree, a control loop, an engineering loop and a fault funnel instead of tables', () => {
  const views = [
    { component: <YbDecisionMap language="en" />, selector: '.yb-selection-tree' },
    { component: <GateImplementationLoop language="en" />, selector: '.gate-control-loop' },
    { component: <ExperimentEngineeringMap language="en" />, selector: '.engineering-cycle' },
    { component: <FaultToleranceScaleMap language="en" />, selector: '.fault-channel-funnel' },
  ]

  views.forEach(({ component, selector }) => {
    const { container, unmount } = render(component)
    expect(container.querySelector(selector)).toBeInTheDocument()
    expect(container.querySelector('[role="table"]')).not.toBeInTheDocument()
    unmount()
  })
})

it('typesets gate and fault-tolerance equations instead of exposing formula source as code text', () => {
  const gate = render(<GateImplementationLoop language="en" />)
  expect(gate.container.querySelectorAll('.katex').length).toBeGreaterThanOrEqual(6)
  expect(gate.container.querySelector('code')).not.toBeInTheDocument()
  gate.unmount()

  const fault = render(<FaultToleranceScaleMap language="en" />)
  expect(fault.container.querySelectorAll('.katex').length).toBeGreaterThanOrEqual(6)
  expect(fault.container.querySelector('code')).not.toBeInTheDocument()
})

it('only makes exact Wiki terms, abbreviations or aliases clickable', () => {
  const views = [
    <ComputationPhysicalMap language="en" />,
    <YbDecisionMap language="en" />,
    <GateImplementationLoop language="en" />,
    <ExperimentEngineeringMap language="en" />,
    <FaultToleranceScaleMap language="en" />,
  ]
  const mismatches: Array<{ text: string; target: string }> = []

  views.forEach((view) => {
    const { container, unmount } = render(<WikiProvider>{view}</WikiProvider>)

    container.querySelectorAll<HTMLButtonElement>('.wiki-term').forEach((button) => {
      const target = button.getAttribute('title')?.replace(/ · Wiki$/, '') ?? ''
      const entry = wikiEntries.find((candidate) => candidate.term.en === target)
      const allowedLabels = entry
        ? [entry.term.en, entry.term.zh, entry.abbreviation, ...entry.aliases]
            .filter((label): label is string => Boolean(label))
            .map(normalizeWikiAlias)
        : []
      const text = button.textContent?.trim() ?? ''

      if (!allowedLabels.includes(normalizeWikiAlias(text))) mismatches.push({ text, target })
    })

    unmount()
  })

  expect(mismatches).toEqual([])
})
