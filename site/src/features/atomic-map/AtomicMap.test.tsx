import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AtomicMap from './AtomicMap'

it('renders the contextual Yb reference map without the former hero blockade controls', () => {
  render(<AtomicMap language="en" />)

  expect(screen.getByRole('heading', { name: 'Complete 171Yb level reference map' })).toBeInTheDocument()
  expect(screen.getByText(/302 nm/)).toBeInTheDocument()
  expect(screen.getByText('556 nm')).toBeInTheDocument()
  expect(screen.getByRole('img', { name: '171Yb level and optical-channel map' })).toBeInTheDocument()
  expect(screen.queryByText('Blockade probe')).not.toBeInTheDocument()
})

it('opens and closes the full energy-level map', async () => {
  const user = userEvent.setup()
  render(<AtomicMap language="en" />)

  await user.click(screen.getByLabelText('View full energy-level map'))
  expect(screen.getByLabelText('Full energy-level map view')).toBeInTheDocument()

  await user.click(screen.getByLabelText('Close full energy-level map'))
  expect(screen.queryByLabelText('Full energy-level map view')).not.toBeInTheDocument()
})

it('uses normalized image coordinates to move the teaching ring and arrow precisely', async () => {
  const user = userEvent.setup()
  render(<AtomicMap language="zh" />)

  expect(screen.getAllByRole('button', { name: /^定位/ })).toHaveLength(5)
  await user.click(screen.getByRole('button', { name: '定位 399 nm 强跃迁' }))

  const overlay = screen.getByTestId('reference-hotspot-overlay')
  const ring = screen.getByTestId('reference-hotspot-ring')
  expect(overlay).toHaveAttribute('data-coordinate-system', 'normalized-percent')
  expect(ring).toHaveAttribute('data-hotspot', '399')
  expect(screen.getByTestId('reference-mobile-lens')).toHaveAttribute('data-focus-x', '16')
  expect(screen.getByTestId('reference-mobile-lens')).toHaveAttribute('data-focus-y', '40.5')
  expect(screen.getByText('主冷却、一级 MOT 与荧光成像')).toBeInTheDocument()
})
