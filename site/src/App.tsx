import { lazy, Suspense, useState } from 'react'
import AppHeader from './components/AppHeader'
import WorkspaceDrawer from './features/workspace/WorkspaceDrawer'
import { useWorkspace } from './features/workspace/useWorkspace'
import { useWiki } from './features/wiki/WikiContext'
import { WikiProvider } from './features/wiki/WikiProvider'
import { contentRoutes, routeSectionId } from './navigation/routes'
import { useActiveSection } from './navigation/useActiveSection'

const RouteContent = lazy(() => import('./features/routing/RouteContent'))
const OverviewPage = lazy(() => import('./features/overview/OverviewPage'))
const WikiDrawer = lazy(() => import('./features/wiki/WikiDrawer'))
const repositoryUrl = import.meta.env.VITE_REPOSITORY_URL?.trim().replace(/\/$/, '')
const contributionUrl = repositoryUrl ? `${repositoryUrl}/issues/new?template=content.yml` : undefined
function AppContent() {
  const workspaceApi = useWorkspace()
  const wiki = useWiki()
  const { workspace } = workspaceApi
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const activeRoute = useActiveSection()

  return (
    <div className="app-shell">
      <AppHeader
        language={workspace.language}
        mode={workspace.mode}
        route={activeRoute}
        onLanguageChange={workspaceApi.setLanguage}
        onModeChange={workspaceApi.setMode}
        onWikiOpen={wiki.openIndex}
        onWorkspaceOpen={() => setWorkspaceOpen(true)}
      />
      <main>
        <section id={routeSectionId('overview')} className="single-page-domain single-page-domain--overview">
          <Suspense fallback={<div className="deep-content-loading" aria-live="polite">{workspace.language === 'zh' ? '正在载入总论…' : 'Loading overview…'}</div>}>
            <OverviewPage language={workspace.language} />
          </Suspense>
        </section>
        {contentRoutes.map((route) => (
          <section id={routeSectionId(route)} className="single-page-domain" key={route}>
            <Suspense fallback={<div className="deep-content-loading" aria-live="polite">{workspace.language === 'zh' ? '正在载入研究域…' : 'Loading research domain…'}</div>}>
              <RouteContent
                route={route}
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
          </section>
        ))}
      </main>
      <WorkspaceDrawer language={workspace.language} open={workspaceOpen} workspace={workspace} storageAvailable={workspaceApi.storageAvailable} editing={workspace.editing} contributionUrl={contributionUrl} onClose={() => setWorkspaceOpen(false)} onEditingChange={workspaceApi.setEditing} onNoteChange={workspaceApi.setNote} onExport={workspaceApi.exportWorkspace} onImport={workspaceApi.importWorkspace} onResetAllArticleOverrides={workspaceApi.resetAllArticleOverrides} />
      {wiki.open ? <Suspense fallback={null}><WikiDrawer language={workspace.language} /></Suspense> : null}
    </div>
  )
}

export default function App() {
  return <WikiProvider><AppContent /></WikiProvider>
}
