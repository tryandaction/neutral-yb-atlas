import { Download, Upload } from 'lucide-react'
import { useState } from 'react'
import type { Language } from '../../types/content'

interface ExportImportControlsProps {
  language: Language
  onExport: () => string
  onImport: (value: string) => void
}

export default function ExportImportControls({ language, onExport, onImport }: ExportImportControlsProps) {
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')

  const importPayload = () => {
    try {
      onImport(payload)
      setError('')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Invalid workspace payload')
    }
  }

  return (
    <section className="transfer-controls">
      <div className="transfer-controls__commands">
        <button type="button" onClick={() => setPayload(onExport())}><Download aria-hidden="true" />{language === 'zh' ? '导出 JSON' : 'Export JSON'}</button>
        <button type="button" onClick={importPayload}><Upload aria-hidden="true" />{language === 'zh' ? '导入 JSON' : 'Import JSON'}</button>
      </div>
      <label htmlFor="workspace-json">{language === 'zh' ? '工作区 JSON' : 'Workspace JSON'}</label>
      <textarea id="workspace-json" aria-label={language === 'zh' ? '工作区 JSON' : 'Workspace JSON'} value={payload} onChange={(event) => setPayload(event.target.value)} spellCheck={false} />
      {error ? <p role="alert">{error}</p> : null}
    </section>
  )
}
