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
}, {
  id: 'logical-yb',
  label: { zh: '亚稳态 Yb 擦除逻辑比特', en: 'Metastable-Yb logical qubits' },
  domain: 'architecture' as const,
  value: 'logical erasure experiment',
  status: 'confirmed' as const,
  note: { zh: '把门级擦除检测连接到逻辑编码。', en: 'Connects gate-level erasure detection to logical encoding.' },
  source: { citation: 'Zhang et al., Nature Physics (2026)', url: 'https://example.org/logical-yb' },
  readingTier: 'frontier' as const,
  publicationYear: 2026,
  readingType: { zh: '实验', en: 'Experiment' },
}]

it('presents sources as learner-facing further reading without registry controls', () => {
  render(<EvidenceBrowser language="zh" entries={entries} />)

  expect(screen.getByRole('heading', { name: '延伸阅读与出处' })).toBeInTheDocument()
  expect(screen.getByText('Kaufman et al. (2020)')).toBeInTheDocument()
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  expect(screen.queryByText('Status')).not.toBeInTheDocument()
  expect(screen.queryByText('confirmed')).not.toBeInTheDocument()
})

it('places recent frontier papers before foundational sources and explains their role', () => {
  render(<EvidenceBrowser language="zh" entries={entries} />)

  const frontier = screen.getByRole('heading', { name: '前沿必读' })
  const references = screen.getByRole('heading', { name: '基础框架与参数出处' })

  expect(frontier.compareDocumentPosition(references) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(screen.getByText('2026 · 实验')).toBeInTheDocument()
  expect(screen.getByText('把门级擦除检测连接到逻辑编码。')).toBeInTheDocument()
})
