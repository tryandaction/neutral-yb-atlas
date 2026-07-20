import { render, screen } from '@testing-library/react'
import SpeciesComparison from './SpeciesComparison'

it('frames the neutral-atom route against the repeated correction-cycle task', () => {
  render(<SpeciesComparison language="en" />)

  expect(screen.getByRole('heading', { name: 'Platform choice begins with the correction cycle' })).toBeInTheDocument()
  expect(screen.getByText('Superconducting circuits')).toBeInTheDocument()
  expect(screen.getByText('Neutral-atom arrays')).toBeInTheDocument()
  expect(screen.getByRole('table', { name: 'Fixed-task atomic species comparison' })).toBeInTheDocument()
  expect(screen.getByText(/not a universal platform ranking/i)).toBeInTheDocument()
})
