import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import AppHeader from './AppHeader'

const baseProps = {
  language: 'zh' as const,
  mode: 'guided' as const,
  route: 'yb-platform' as const,
  onLanguageChange: vi.fn(),
  onModeChange: vi.fn(),
}

it('marks the active research destination and exposes deep links', () => {
  render(<AppHeader {...baseProps} />)

  expect(screen.getByRole('banner')).not.toHaveClass('app-header--cover')
  expect(screen.getByRole('link', { name: 'Yb 平台' })).toHaveAttribute('href', '#domain-yb-platform')
  expect(screen.getByRole('link', { name: 'Yb 平台' })).toHaveAttribute('aria-current', 'page')
  expect(screen.getByRole('link', { name: '容错与规模' })).toHaveAttribute('href', '#domain-fault-tolerance')
})

it('uses the dark cover treatment only on the overview route', () => {
  render(<AppHeader {...baseProps} route="overview" />)

  expect(screen.getByRole('banner')).toHaveClass('app-header', 'app-header--cover')
})

it('emits language and reading-depth changes from explicit controls', async () => {
  const user = userEvent.setup()
  const onLanguageChange = vi.fn()
  const onModeChange = vi.fn()

  render(
    <AppHeader
      {...baseProps}
      onLanguageChange={onLanguageChange}
      onModeChange={onModeChange}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'English' }))
  await user.click(screen.getByRole('button', { name: '研究索引' }))

  expect(onLanguageChange).toHaveBeenCalledWith('en')
  expect(onModeChange).toHaveBeenCalledWith('reference')
})

it('keeps Wiki and workspace as the only contextual header actions', async () => {
  const user = userEvent.setup()
  const onWikiOpen = vi.fn()
  const onWorkspaceOpen = vi.fn()

  render(
    <AppHeader
      {...baseProps}
      onWikiOpen={onWikiOpen}
      onWorkspaceOpen={onWorkspaceOpen}
    />,
  )

  await user.click(screen.getByRole('button', { name: '打开科研术语 Wiki' }))
  await user.click(screen.getByRole('button', { name: '打开研究工作区' }))

  expect(onWikiOpen).toHaveBeenCalledOnce()
  expect(onWorkspaceOpen).toHaveBeenCalledOnce()
  expect(screen.queryByRole('button', { name: '编辑正文' })).not.toBeInTheDocument()
  expect(screen.queryByRole('link', { name: '提交内容建议' })).not.toBeInTheDocument()
})
