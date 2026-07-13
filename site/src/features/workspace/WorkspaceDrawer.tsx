import { useState } from 'react'
import { X, Database, FlaskConical, RotateCcw } from 'lucide-react'
import type { Language } from '../../types/content'
import type { WorkspaceState } from './workspaceTypes'
import ExportImportControls from './ExportImportControls'
import './workspace.css'

interface WorkspaceDrawerProps {
  language: Language
  open: boolean
  workspace: WorkspaceState
  storageAvailable: boolean
  onClose: () => void
  onNoteChange: (id: string, value: string) => void
  onExport: () => string
  onImport: (value: string) => void
  onResetAllArticleOverrides: () => void
}

export default function WorkspaceDrawer({ language, open, workspace, storageAvailable, onClose, onNoteChange, onExport, onImport, onResetAllArticleOverrides }: WorkspaceDrawerProps) {
  const [confirmReset, setConfirmReset] = useState(false)
  if (!open) return null

  return (
    <div className="workspace-layer" role="presentation">
      <button className="workspace-layer__backdrop" type="button" aria-label={language === 'zh' ? '关闭研究工作区' : 'Close research workspace'} onClick={onClose} />
      <aside className="workspace-drawer" aria-label={language === 'zh' ? '研究工作区' : 'Research workspace'}>
        <header>
          <div><span>LOCAL RESEARCH WORKSPACE</span><h2>{language === 'zh' ? '研究工作区' : 'Research workspace'}</h2></div>
          <button type="button" aria-label={language === 'zh' ? '关闭研究工作区' : 'Close research workspace'} onClick={onClose}><X aria-hidden="true" /></button>
        </header>

        <div className={`workspace-storage${storageAvailable ? '' : ' is-offline'}`}>
          <Database aria-hidden="true" />
          <div><strong>{storageAvailable ? (language === 'zh' ? '本地保存正常' : 'Local storage active') : (language === 'zh' ? '仅当前会话' : 'Session only')}</strong><span>{language === 'zh' ? '内容保存在此浏览器，不会自动上传。' : 'Data stays in this browser and is never uploaded automatically.'}</span></div>
        </div>

        <section className="workspace-notes">
          <label htmlFor="research-note">{language === 'zh' ? '研究笔记' : 'Research notes'}</label>
          <textarea id="research-note" aria-label={language === 'zh' ? '研究笔记' : 'Research notes'} value={workspace.notes.general ?? ''} onChange={(event) => onNoteChange('general', event.target.value)} placeholder={language === 'zh' ? '记录假设、待核参数和实验观察…' : 'Record hypotheses, parameters to verify and laboratory observations…'} />
        </section>

        <section className="snapshot-list">
          <header><FlaskConical aria-hidden="true" /><strong>{language === 'zh' ? '参数快照' : 'Parameter snapshots'}</strong><span>{workspace.parameterSnapshots.length}</span></header>
          {workspace.parameterSnapshots.length ? workspace.parameterSnapshots.map((snapshot) => <article key={snapshot.id}><div><strong>{snapshot.name}</strong><span>{snapshot.modelId}</span></div><time>{new Date(snapshot.createdAt).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')}</time></article>) : <p>{language === 'zh' ? '在理论工作台保存参数后，将显示在这里。' : 'Snapshots saved in the theory workbench will appear here.'}</p>}
        </section>

        {Object.keys(workspace.articleOverrides).length ? (
          <section className="workspace-restore">
            <div>
              <RotateCcw aria-hidden="true" />
              <div>
                <strong>{language === 'zh' ? '正文覆盖' : 'Article overrides'}</strong>
                <span>{language === 'zh' ? `${Object.keys(workspace.articleOverrides).length} 个正文块已修改` : `${Object.keys(workspace.articleOverrides).length} article blocks modified`}</span>
              </div>
            </div>
            <button type="button" onClick={() => {
              if (!confirmReset) {
                setConfirmReset(true)
                return
              }
              onResetAllArticleOverrides()
              setConfirmReset(false)
            }}>
              {confirmReset
                ? (language === 'zh' ? '确认恢复全部正文' : 'Confirm restoring all text')
                : (language === 'zh' ? '恢复全部默认正文' : 'Restore all default text')}
            </button>
          </section>
        ) : null}

        <ExportImportControls language={language} onExport={onExport} onImport={onImport} />
      </aside>
    </div>
  )
}
