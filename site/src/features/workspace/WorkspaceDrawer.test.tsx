import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { createDefaultWorkspace } from './workspaceStorage'
import WorkspaceDrawer from './WorkspaceDrawer'

it('requires a second confirmation before restoring all article blocks', () => {
  const onResetAllArticleOverrides = vi.fn()
  render(
    <WorkspaceDrawer
      language="zh"
      open
      workspace={{ ...createDefaultWorkspace(), articleOverrides: { 'inverse-problem': '误编辑' } }}
      storageAvailable
      onClose={() => undefined}
      onNoteChange={() => undefined}
      onExport={() => '{}'}
      onImport={() => undefined}
      onResetAllArticleOverrides={onResetAllArticleOverrides}
    />,
  )

  fireEvent.click(screen.getByRole('button', { name: '恢复全部默认正文' }))
  expect(onResetAllArticleOverrides).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: '确认恢复全部正文' }))
  expect(onResetAllArticleOverrides).toHaveBeenCalledOnce()
})

it('owns article editing and contribution actions outside the global header', () => {
  const onEditingChange = vi.fn()
  const contributionUrl = 'https://github.com/example/neutral-yb-atlas/issues/new?template=content.yml'
  render(
    <WorkspaceDrawer
      language="zh"
      open
      workspace={createDefaultWorkspace()}
      storageAvailable
      editing={false}
      contributionUrl={contributionUrl}
      onClose={() => undefined}
      onEditingChange={onEditingChange}
      onNoteChange={() => undefined}
      onExport={() => '{}'}
      onImport={() => undefined}
      onResetAllArticleOverrides={() => undefined}
    />,
  )

  fireEvent.click(screen.getByRole('button', { name: '编辑正文' }))

  expect(onEditingChange).toHaveBeenCalledWith(true)
  expect(screen.getByRole('link', { name: '提交内容建议' })).toHaveAttribute('href', contributionUrl)
})
