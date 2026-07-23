import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import ExperimentCycleTimeline from './ExperimentCycleTimeline'

it('renders the source-qualified Yb cycle with five selectable stages and separated time scales', async () => {
  const user = userEvent.setup()
  const scrollIntoView = vi.fn()
  Element.prototype.scrollIntoView = scrollIntoView
  render(<ExperimentCycleTimeline language="en" />)

  expect(screen.getByRole('heading', { name: 'One 171Yb replacement and compute cycle' })).toBeInTheDocument()
  expect(screen.getAllByRole('img', { name: /Experimental cycle panel/ })).toHaveLength(5)
  expect(screen.getAllByRole('button', { name: /^Select cycle stage:/ })).toHaveLength(5)
  expect(screen.getByText(/millisecond macrocycle schedule, 900 ns trap-off microcycles, and independently calibrated gate times/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Li et al\. \(2025\), Fast, continuous/ })).toHaveAttribute('href', 'https://arxiv.org/abs/2506.15633')

  await user.click(screen.getByRole('button', { name: 'Select cycle stage: Loading and single-atom selection' }))
  expect(screen.getByText(/scheduled loading dwell is 2 ms, while the fitted loading time constant is 0\.84 ms/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Select cycle stage: Preparation and coherent computation' }))
  expect(screen.getByText(/global σ\+ 556 nm optical pumping first polarizes/)).toBeInTheDocument()
  expect(screen.getByText(/local 556 \+ 1539 nm Raman pumping then transfers/)).toBeInTheDocument()
  expect(screen.getByText(/two stages occupy distinct 900 ns trap-off windows/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Select cycle stage: State-selective readout and feedback' }))
  expect(screen.getByRole('button', { name: 'Select cycle stage: State-selective readout and feedback' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByText(/Readout is a state-selective mapping, an imageable-state conversion, and an outcome record/)).toBeInTheDocument()
  expect(screen.getByText(/simultaneous 649 and 770 nm Raman pulse lasts 400 ns and is repeated eight times; 497 nm performs the subsequent depumping/)).toBeInTheDocument()
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  expect(document.getElementById('cycle-panel-readout')).toBeInTheDocument()
})
