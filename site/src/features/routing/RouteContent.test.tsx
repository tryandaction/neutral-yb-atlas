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

  expect(document.getElementById('experiment-visual-atlas')).toBeInTheDocument()
  expect(document.querySelector('.experiment-workbench')).not.toBeInTheDocument()
})

it('presents source-linked further reading without research registry controls', () => {
  renderRoute('evidence')

  expect(screen.getByRole('heading', { name: 'Further reading and sources', level: 1 })).toBeInTheDocument()
  expect(document.querySelector('.evidence-table')).not.toBeInTheDocument()
})

it('connects fault tolerance to an interactive resource estimate', () => {
  renderRoute('fault-tolerance')

  expect(screen.getByRole('spinbutton', { name: 'Physical operation error' })).toBeInTheDocument()
})
