import { lazy, Suspense } from 'react'
import AppHeader from './components/AppHeader'
import { useWorkspace } from './features/workspace/useWorkspace'
import { useWiki } from './features/wiki/WikiContext'
import { WikiProvider } from './features/wiki/WikiProvider'
import { contentRoutes, routeSectionId } from './navigation/routes'
import { useActiveSection } from './navigation/useActiveSection'

const RouteContent = lazy(() => import('./features/routing/RouteContent'))
const OverviewPage = lazy(() => import('./features/overview/OverviewPage'))
const WikiDrawer = lazy(() => import('./features/wiki/WikiDrawer'))

function AppContent() {
  const workspaceApi = useWorkspace()
  const wiki = useWiki()
  const { workspace } = workspaceApi
  const activeRoute = useActiveSection()

  return (
    <div className="app-shell">
      <AppHeader language={workspace.language} mode={workspace.mode} route={activeRoute} onLanguageChange={workspaceApi.setLanguage} onModeChange={workspaceApi.setMode} onWikiOpen={wiki.openIndex} />
      <main>
        <section id={routeSectionId('overview')} className="single-page-domain single-page-domain--overview"><Suspense fallback={<div className="deep-content-loading">Loading overview...</div>}><OverviewPage language={workspace.language} /></Suspense></section>
        {contentRoutes.map((route) => <section id={routeSectionId(route)} className="single-page-domain" key={route}><Suspense fallback={<div className="deep-content-loading">Loading learning path...</div>}><RouteContent route={route} language={workspace.language} mode={workspace.mode} editing={workspace.editing} articleOverrides={workspace.articleOverrides} notes={workspace.notes} completedExperimentPhases={workspace.completedExperimentPhases} onArticleChange={workspaceApi.setArticleOverride} onArticleReset={workspaceApi.resetArticleOverride} onSaveSnapshot={workspaceApi.saveSnapshot} onNoteChange={workspaceApi.setNote} onToggleExperimentPhase={workspaceApi.toggleExperimentPhase} /></Suspense></section>)}
      </main>
      {wiki.open ? <Suspense fallback={null}><WikiDrawer language={workspace.language} /></Suspense> : null}
    </div>
  )
}

export default function App() { return <WikiProvider><AppContent /></WikiProvider> }
