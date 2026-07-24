import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExperimentVisualAtlas from './ExperimentVisualAtlas'

it('presents one source-linked apparatus journey without legacy hotspot controls', () => {
  render(<ExperimentVisualAtlas language="en" />)

  expect(screen.getByRole('heading', { name: 'From Yb atomic beam to a reloadable computation array' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Complete 171Yb apparatus path from atomic source to a reloadable computation array' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Li et al. (2025)' })).toHaveAttribute('href', 'https://arxiv.org/abs/2506.15633')
  expect(screen.getByRole('link', { name: 'Ma et al. (2023)' })).toHaveAttribute('href', 'https://doi.org/10.1038/s41586-023-06438-1')

  expect(screen.queryByTestId('atlas-hotspot-overlay')).not.toBeInTheDocument()
  expect(screen.queryByTestId('atlas-mobile-lens')).not.toBeInTheDocument()
  expect(screen.queryByText('Interactive experimental plate atlas')).not.toBeInTheDocument()
})

it('moves the apparatus rail to a selected stage group', async () => {
  const user = userEvent.setup()
  render(<ExperimentVisualAtlas language="en" />)

  const scroller = screen.getByTestId('apparatus-scroll-viewport')
  Object.defineProperty(scroller, 'scrollWidth', { configurable: true, value: 2400 })
  Object.defineProperty(scroller, 'clientWidth', { configurable: true, value: 800 })
  const scrollTo = vi.fn()
  scroller.scrollTo = scrollTo

  await user.click(screen.getByRole('button', { name: 'Open stages 04 to 06: transfer and narrow-line cooling' }))

  expect(scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', left: 800 })
})

it('updates the visible stage group as the rail scrolls', () => {
  render(<ExperimentVisualAtlas language="en" />)

  const scroller = screen.getByTestId('apparatus-scroll-viewport')
  Object.defineProperty(scroller, 'scrollWidth', { configurable: true, value: 2400 })
  Object.defineProperty(scroller, 'clientWidth', { configurable: true, value: 800 })
  Object.defineProperty(scroller, 'scrollLeft', { configurable: true, value: 1600 })

  fireEvent.scroll(scroller)

  expect(screen.getByRole('button', { name: 'Open stages 07 to 09: reservoir, tweezers and computation' })).toHaveAttribute('aria-pressed', 'true')
})
