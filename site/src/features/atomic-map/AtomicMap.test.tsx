import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AtomicMap from './AtomicMap'

it('renders the contextual Yb reference map without the former hero blockade controls', () => {
  render(<AtomicMap language="en" />)

  expect(screen.getByRole('heading', { name: 'Complete 171Yb level reference map' })).toBeInTheDocument()
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

it('presents the complete energy map without hotspot controls or selection rings', () => {
  render(<AtomicMap language="zh" />)

  expect(screen.queryByTestId('reference-hotspot-overlay')).not.toBeInTheDocument()
  expect(screen.queryByTestId('reference-hotspot-ring')).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /^定位/ })).not.toBeInTheDocument()
  expect(screen.queryByText('选择通道并定位')).not.toBeInTheDocument()
})
