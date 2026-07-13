import { lazy, Suspense, useState } from 'react'
import AppHeader from './components/AppHeader'
import Hero from './features/hero/Hero'
import WorkspaceDrawer from './features/workspace/WorkspaceDrawer'
import { useWorkspace } from './features/workspace/useWorkspace'
import { useWiki } from './features/wiki/WikiContext'
import { WikiProvider } from './features/wiki/WikiProvider'

const DeepResearchContent = lazy(() => import('./features/deep-content/DeepResearchContent'))
const WikiDrawer = lazy(() => import('./features/wiki/WikiDrawer'))
const repositoryUrl = import.meta.env.VITE_REPOSITORY_URL?.trim().replace(/\/$/, '')
const contributionUrl = repositoryUrl ? `${repositoryUrl}/issues/new?template=content.yml` : undefined

function AppContent() {
  const workspaceApi = useWorkspace()
  const wiki = useWiki()
  const { workspace } = workspaceApi
  const [workspaceOpen, setWorkspaceOpen] = useState(false)

  return (
    <div className="app-shell" id="top">
      <AppHeader
        language={workspace.language}
        mode={workspace.mode}
        editing={workspace.editing}
        onLanguageChange={workspaceApi.setLanguage}
        onModeChange={workspaceApi.setMode}
        onEditingChange={workspaceApi.setEditing}
        contributionUrl={contributionUrl}
        onWikiOpen={wiki.openIndex}
        onWorkspaceOpen={() => setWorkspaceOpen(true)}
      />
      <main>
        <Hero language={workspace.language} mode={workspace.mode} />
        <Suspense fallback={<div className="deep-content-loading" aria-live="polite">{workspace.language === 'zh' ? '正在载入研究内容…' : 'Loading research content…'}</div>}>
          <DeepResearchContent
            language={workspace.language}
            mode={workspace.mode}
            editing={workspace.editing}
            articleOverrides={workspace.articleOverrides}
            notes={workspace.notes}
            completedExperimentPhases={workspace.completedExperimentPhases}
            onArticleChange={workspaceApi.setArticleOverride}
            onArticleReset={workspaceApi.resetArticleOverride}
            onSaveSnapshot={workspaceApi.saveSnapshot}
            onNoteChange={workspaceApi.setNote}
            onToggleExperimentPhase={workspaceApi.toggleExperimentPhase}
          />
        </Suspense>
      </main>
      <WorkspaceDrawer language={workspace.language} open={workspaceOpen} workspace={workspace} storageAvailable={workspaceApi.storageAvailable} onClose={() => setWorkspaceOpen(false)} onNoteChange={workspaceApi.setNote} onExport={workspaceApi.exportWorkspace} onImport={workspaceApi.importWorkspace} onResetAllArticleOverrides={workspaceApi.resetAllArticleOverrides} />
      {wiki.open ? <Suspense fallback={null}><WikiDrawer language={workspace.language} /></Suspense> : null}
    </div>
  )
}

export default function App() {
  return <WikiProvider><AppContent /></WikiProvider>
}
