import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import AppHeader from './AppHeader'

it('emits language and edit changes from explicit controls', async () => {
  const user = userEvent.setup()
  const onLanguageChange = vi.fn()
  const onEditingChange = vi.fn()

  render(
    <AppHeader
      language="zh"
      mode="guided"
      editing={false}
      onLanguageChange={onLanguageChange}
      onModeChange={vi.fn()}
      onEditingChange={onEditingChange}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'English' }))
  await user.click(screen.getByRole('button', { name: '编辑正文' }))

  expect(onLanguageChange).toHaveBeenCalledWith('en')
  expect(onEditingChange).toHaveBeenCalledWith(true)
})

it('emits reference mode from the segmented control', async () => {
  const user = userEvent.setup()
  const onModeChange = vi.fn()

  render(
    <AppHeader
      language="zh"
      mode="guided"
      editing={false}
      onLanguageChange={vi.fn()}
      onModeChange={onModeChange}
      onEditingChange={vi.fn()}
    />,
  )

  await user.click(screen.getByRole('button', { name: '研究索引' }))

  expect(onModeChange).toHaveBeenCalledWith('reference')
})

it('shows a contribution link only when a repository URL is configured', () => {
  const baseProps = {
    language: 'zh' as const,
    mode: 'guided' as const,
    editing: false,
    onLanguageChange: vi.fn(),
    onModeChange: vi.fn(),
    onEditingChange: vi.fn(),
  }

  const { rerender } = render(
    <AppHeader
      {...baseProps}
      contributionUrl="https://github.com/example/neutral-yb-atlas/issues/new?template=content.yml"
    />,
  )

  const link = screen.getByRole('link', { name: '提交内容建议' })
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('rel', 'noreferrer')
  expect(link).toHaveAttribute('href', 'https://github.com/example/neutral-yb-atlas/issues/new?template=content.yml')

  rerender(<AppHeader {...baseProps} />)
  expect(screen.queryByRole('link', { name: '提交内容建议' })).not.toBeInTheDocument()
})
