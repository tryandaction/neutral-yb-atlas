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
  expect(document.querySelector('.energy-tutor')).not.toBeInTheDocument()
  expect(document.querySelectorAll('img[alt*="171Yb"]')).toHaveLength(1)
})

it('replaces the foundations chapters with one visible computation map', () => {
  renderRoute('foundations')

  expect(screen.getByRole('heading', { name: 'How computation becomes a physical process' })).toBeInTheDocument()
  expect(document.querySelectorAll('.core-question-map')).toHaveLength(1)
  expect(document.querySelector('.article-chapter')).not.toBeInTheDocument()
})

it('keeps the experimental route focused on teaching visuals without an acceptance workbench', () => {
  renderRoute('experiment')

  expect(document.getElementById('experiment-cycle-timeline')).toBeInTheDocument()
  expect(document.querySelector('.pipeline-apparatus')).toBeInTheDocument()
  expect(document.querySelectorAll('img[alt*="171Yb"]').length).toBe(1)
  expect(document.querySelector('.experiment-workbench')).not.toBeInTheDocument()
  expect(document.querySelectorAll('.core-question-map')).toHaveLength(1)
  expect(document.querySelector('.article-chapter')).not.toBeInTheDocument()
})

it('keeps the experimental outline focused on the integrated apparatus path', () => {
  renderRoute('experiment')

  expect(screen.getByText('How apparatus changes atomic states')).toBeInTheDocument()
  expect(screen.queryByText('Yb apparatus path')).not.toBeInTheDocument()
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

  expect(screen.getByRole('heading', { name: 'How universal fault tolerance becomes scale and cost', level: 2 })).toBeInTheDocument()
  expect(screen.getByRole('spinbutton', { name: 'Physical operation error' })).toBeInTheDocument()
  expect(document.querySelectorAll('.core-question-map')).toHaveLength(1)
  expect(document.querySelector('.article-chapter')).not.toBeInTheDocument()
})

it('keeps the gate route on one causal teaching chain without the legacy delivery contract', () => {
  renderRoute('gates-theory')

  expect(screen.getByRole('heading', { name: 'How a quantum gate moves from theory to experiment' })).toBeInTheDocument()
  expect(screen.queryByText(/theory delivery contract/i)).not.toBeInTheDocument()
  expect(document.querySelectorAll('.core-question-map')).toHaveLength(1)
  expect(document.querySelector('.article-chapter')).not.toBeInTheDocument()
})

it('places the Yb decision map before the approved reference visuals', () => {
  renderRoute('yb-platform')

  expect(screen.getByRole('heading', { name: 'Why choose ¹⁷¹Yb among neutral atoms' })).toBeInTheDocument()
  expect(document.querySelectorAll('.core-question-map')).toHaveLength(1)
  expect(document.querySelector('.article-chapter')).not.toBeInTheDocument()
  expect(document.querySelector('.atomic-reference')).toBeInTheDocument()
})
