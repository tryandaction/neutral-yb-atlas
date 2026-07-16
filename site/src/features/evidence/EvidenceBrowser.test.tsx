import { render, screen } from '@testing-library/react'
import EvidenceBrowser from './EvidenceBrowser'

const entries = [{
  id: 'clock',
  label: { zh: '578 nm 钟跃迁', en: '578 nm clock transition' },
  domain: 'atomic' as const,
  value: 578.4,
  unit: 'nm',
  status: 'confirmed' as const,
  note: { zh: '连接基态与钟态。', en: 'Connects ground and clock states.' },
  source: { citation: 'Kaufman et al. (2020)', url: 'https://example.com' },
}]

it('presents sources as learner-facing further reading without registry controls', () => {
  render(<EvidenceBrowser language="zh" entries={entries} />)

  expect(screen.getByRole('heading', { name: '延伸阅读与出处' })).toBeInTheDocument()
  expect(screen.getByText('Kaufman et al. (2020)')).toBeInTheDocument()
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  expect(screen.queryByText('Status')).not.toBeInTheDocument()
  expect(screen.queryByText('confirmed')).not.toBeInTheDocument()
})
