import { lazy, Suspense } from 'react'
import AppHeader from './components/AppHeader'
import ContributionFooter from './features/contribution/ContributionFooter'
import { usePreferences } from './features/preferences/usePreferences'
import { useWiki } from './features/wiki/WikiContext'
import { WikiProvider } from './features/wiki/WikiProvider'
import { contentRoutes, routeSectionId } from './navigation/routes'
import { useActiveSection } from './navigation/useActiveSection'

const RouteContent = lazy(() => import('./features/routing/RouteContent'))
const OverviewPage = lazy(() => import('./features/overview/OverviewPage'))
const WikiDrawer = lazy(() => import('./features/wiki/WikiDrawer'))

function AppContent() {
  const preferencesApi = usePreferences()
  const wiki = useWiki()
  const { preferences } = preferencesApi
  const activeRoute = useActiveSection()

  return (
    <div className="app-shell">
      <AppHeader language={preferences.language} mode={preferences.mode} route={activeRoute} onLanguageChange={preferencesApi.setLanguage} onModeChange={preferencesApi.setMode} onWikiOpen={wiki.openIndex} />
      <main>
        <section id={routeSectionId('overview')} className="single-page-domain single-page-domain--overview"><Suspense fallback={<div className="deep-content-loading">Loading overview...</div>}><OverviewPage language={preferences.language} /></Suspense></section>
        {contentRoutes.map((route) => <section id={routeSectionId(route)} className="single-page-domain" key={route}><Suspense fallback={<div className="deep-content-loading">Loading learning path...</div>}><RouteContent route={route} language={preferences.language} mode={preferences.mode} /></Suspense></section>)}
      </main>
      <ContributionFooter language={preferences.language} />
      {wiki.open ? <Suspense fallback={null}><WikiDrawer language={preferences.language} /></Suspense> : null}
    </div>
  )
}

export default function App() { return <WikiProvider><AppContent /></WikiProvider> }
