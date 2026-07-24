import { render, screen } from '@testing-library/react'
import type { RouteId } from '../../navigation/routes'
import RouteContent from './RouteContent'

function renderRoute(route: RouteId) {
  return render(<RouteContent route={route} language="en" mode="guided" />)
}

it('keeps the Yb reference map and comparison in the platform destination', () => {
  renderRoute('yb-platform')

  expect(document.querySelector('.atomic-reference')).toBeInTheDocument()
  expect(document.querySelector('.species-comparison')).toBeInTheDocument()
})

it('keeps the experimental route focused on teaching visuals without an acceptance workbench', () => {
  renderRoute('experiment')

  expect(document.getElementById('experiment-cycle-timeline')).toBeInTheDocument()
  expect(document.getElementById('experiment-visual-atlas')).toBeInTheDocument()
  expect(document.querySelector('.experiment-workbench')).not.toBeInTheDocument()
})

it('names the final experimental section as an apparatus path rather than a plate atlas', () => {
  renderRoute('experiment')

  expect(screen.getByText('Yb apparatus path')).toBeInTheDocument()
  expect(screen.queryByText('Experimental plate atlas')).not.toBeInTheDocument()
})

it('describes apparatus values through source scope rather than illustrative placeholders', () => {
  renderRoute('experiment')

  expect(screen.getByText('Apparatus-specific values retain their source and scope; compare parameters only after checking the cited protocol.')).toBeInTheDocument()
  expect(screen.queryByText(/Illustrative values are labeled explicitly/)).not.toBeInTheDocument()
})

it('presents source-linked further reading without research registry controls', () => {
  renderRoute('evidence')

  expect(screen.getByRole('heading', { name: 'Further reading and sources', level: 1 })).toBeInTheDocument()
  expect(document.querySelector('.evidence-table')).not.toBeInTheDocument()
})

it('connects fault tolerance to an interactive resource estimate', () => {
  renderRoute('fault-tolerance')

  expect(screen.getByRole('heading', { name: 'How physical faults become the cost of trustworthy computation' })).toBeInTheDocument()
  expect(screen.getByRole('spinbutton', { name: 'Physical operation error' })).toBeInTheDocument()
})

it('keeps the gate route on one causal teaching chain without the legacy delivery contract', () => {
  renderRoute('gates-theory')

  expect(screen.getByRole('heading', { name: 'How atomic structure becomes a measurable entangling gate' })).toBeInTheDocument()
  expect(screen.queryByText(/theory delivery contract/i)).not.toBeInTheDocument()
})
