import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import AppHeader from './AppHeader'

const baseProps = {
  language: 'en' as const,
  mode: 'guided' as const,
  route: 'yb-platform' as const,
  onLanguageChange: vi.fn(),
  onModeChange: vi.fn(),
}

it('marks the active learning destination', () => {
  render(<AppHeader {...baseProps} />)
  expect(screen.getByRole('link', { name: 'Yb platform' })).toHaveAttribute('href', '#domain-yb-platform')
  expect(screen.getByRole('link', { name: 'Yb platform' })).toHaveAttribute('aria-current', 'page')
})

it('uses the dark cover treatment only on the overview route', () => {
  render(<AppHeader {...baseProps} route="overview" />)
  expect(screen.getByRole('banner')).toHaveClass('app-header--cover')
})

it('keeps the term index and omits research workspace controls', async () => {
  const user = userEvent.setup()
  const onWikiOpen = vi.fn()
  render(<AppHeader {...baseProps} onWikiOpen={onWikiOpen} />)

  await user.click(screen.getByRole('button', { name: 'Open research term Wiki' }))
  expect(onWikiOpen).toHaveBeenCalledOnce()
  expect(screen.queryByRole('button', { name: 'Open research workspace' })).not.toBeInTheDocument()
})
