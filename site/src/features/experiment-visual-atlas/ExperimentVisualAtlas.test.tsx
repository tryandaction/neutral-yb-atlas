import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExperimentVisualAtlas from './ExperimentVisualAtlas'

it('publishes only audited teaching plates and switches the selected apparatus view', async () => {
  const user = userEvent.setup()
  render(<ExperimentVisualAtlas language="en" />)

  expect(screen.getByRole('heading', { name: 'Interactive experimental plate atlas' })).toBeInTheDocument()
  expect(screen.getAllByRole('button', { name: /^Open plate/ })).toHaveLength(8)
  expect(screen.getByRole('img', { name: 'Ytterbium source and UHV teaching plate' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Open plate 302 nm Rydberg generation, shaping, delivery and measurement' }))
  expect(screen.getByRole('img', { name: '302 nm Rydberg generation and delivery teaching plate' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Open plate Clock, waveform and real-time data chain' }))
  expect(screen.getByRole('img', { name: 'Neutral-atom timing and real-time data-chain teaching plate' })).toBeInTheDocument()
}, 20000)

it('uses normalized hotspots, applies deterministic audit masks and updates the mobile lens', async () => {
  const user = userEvent.setup()
  render(<ExperimentVisualAtlas language="zh" />)

  await user.click(screen.getByRole('button', { name: '打开图版 多波长激光基础设施' }))
  expect(screen.getByTestId('atlas-correction-mask-extinction')).toHaveTextContent('消光比：本机测量')

  await user.click(screen.getByRole('button', { name: '定位 556 nm 窄线光路' }))
  expect(screen.getByTestId('atlas-hotspot-overlay')).toHaveAttribute('data-coordinate-system', 'normalized-percent')
  expect(screen.getByTestId('atlas-hotspot-ring')).toHaveAttribute('data-hotspot', '556-path')
  expect(screen.getByTestId('atlas-mobile-lens')).toHaveAttribute('data-focus-x', '55')
  expect(screen.getByTestId('atlas-mobile-lens')).toHaveAttribute('data-focus-y', '53')

  await user.click(screen.getByRole('button', { name: '打开图版 302 nm Rydberg 光：生成、整形、交付与测量' }))
  expect(screen.getByTestId('atlas-correction-mask-uv-fiber-term')).toHaveTextContent('使用抗光致暗化 UV 光纤')

  await user.click(screen.getByRole('button', { name: '打开图版 时钟、波形与实时数据链' }))
  expect(screen.queryByTestId('atlas-correction-mask-scope-map')).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: '定位 公共参考时钟与时间基准' }))
  expect(screen.getByTestId('atlas-mobile-lens')).toHaveAttribute('data-focus-x', '20')
  expect(screen.getByTestId('atlas-mobile-lens')).toHaveAttribute('data-focus-y', '13')
  expect(screen.getByTestId('atlas-mobile-lens')).toHaveStyle({ backgroundPosition: '0% 0%' })

  await user.click(screen.getByRole('button', { name: '定位 每-shot 数据契约' }))
  expect(screen.getByTestId('atlas-mobile-lens')).toHaveAttribute('data-focus-x', '50')
  expect(screen.getByTestId('atlas-mobile-lens')).toHaveAttribute('data-focus-y', '93')
  expect(screen.getByTestId('atlas-mobile-lens')).toHaveStyle({ backgroundPosition: '50% 100%' })
}, 20000)

it('preserves the native aspect ratio of the square control and data-chain plate', async () => {
  const user = userEvent.setup()
  render(<ExperimentVisualAtlas language="en" />)

  await user.click(screen.getByRole('button', { name: 'Open plate Clock, waveform and real-time data chain' }))

  expect(screen.getByRole('img', { name: 'Neutral-atom timing and real-time data-chain teaching plate' }).parentElement)
    .toHaveStyle({ aspectRatio: '1254 / 1254' })
})

it('dismisses the image annotation on blank space and restores it from a hotspot', async () => {
  const user = userEvent.setup()
  render(<ExperimentVisualAtlas language="en" />)

  expect(screen.getByTestId('atlas-hotspot-ring')).toHaveAttribute('data-hotspot', 'oven')

  await user.click(screen.getByTestId('atlas-image-stage'))
  expect(screen.queryByTestId('atlas-hotspot-ring')).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Select on figure Yb oven and atomic beam' }))
  expect(screen.getByTestId('atlas-hotspot-ring')).toHaveAttribute('data-hotspot', 'oven')
})
