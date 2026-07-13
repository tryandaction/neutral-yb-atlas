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
