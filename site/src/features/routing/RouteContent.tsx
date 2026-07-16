import { chapters } from '../../content/chapters'
import { evidenceEntries } from '../../content/evidence'
import { memo } from 'react'
import type { RouteId } from '../../navigation/routes'
import type { Language, ReadingMode } from '../../types/content'
import ArticleChapter from '../article/ArticleChapter'
import AtomicMap from '../atomic-map/AtomicMap'
import SpeciesComparison from '../comparison/SpeciesComparison'
import DomainPage from '../domain/DomainPage'
import { domainDefinitions } from '../domain/domainDefinitions'
import EvidenceBrowser from '../evidence/EvidenceBrowser'
import ExperimentVisualAtlas from '../experiment-visual-atlas/ExperimentVisualAtlas'
import ResourceEstimator from '../fault-tolerance/ResourceEstimator'
import OverviewPage from '../overview/OverviewPage'
import ExperimentPipeline from '../teaching-visuals/ExperimentPipeline'
import RydbergGateTutor from '../teaching-visuals/RydbergGateTutor'
import YbEnergyTutor from '../teaching-visuals/YbEnergyTutor'
import TheoryWorkbench from '../theory/TheoryWorkbench'

interface RouteContentProps {
  route: RouteId
  language: Language
  mode: ReadingMode
}

function RouteContent(props: RouteContentProps) {
  const { route, language } = props

  if (route === 'overview') return <OverviewPage language={language} />

  const definition = domainDefinitions[route]
  const article = (chapterIndex: number) => (
    <ArticleChapter
      key={chapters[chapterIndex].id}
      chapter={chapters[chapterIndex]}
      language={language}
    />
  )

  let content
  switch (route) {
    case 'foundations':
      content = <>{article(0)}{article(1)}</>
      break
    case 'yb-platform':
      content = <>{article(2)}<YbEnergyTutor language={language} /><AtomicMap language={language} /><div id="species-comparison"><SpeciesComparison language={language} /></div></>
      break
    case 'gates-theory':
      content = <>{article(3)}<RydbergGateTutor language={language} /><TheoryWorkbench language={language} />{article(5)}</>
      break
    case 'experiment':
      content = <>{article(4)}<ExperimentPipeline language={language} /><ExperimentVisualAtlas language={language} /></>
      break
    case 'fault-tolerance':
      content = <>{article(6)}<ResourceEstimator language={language} /></>
      break
    case 'evidence':
      content = <EvidenceBrowser language={language} entries={evidenceEntries} />
      break
  }

  return (
    <DomainPage
      language={language}
      title={definition.title}
      thesis={definition.thesis}
      outline={definition.outline}
      contextTitle={definition.contextTitle}
      contextItems={definition.contextItems}
    >
      {content}
    </DomainPage>
  )
}

function routeContentPropsAreEqual(previous: RouteContentProps, next: RouteContentProps) {
  return previous.route === next.route
    && previous.language === next.language
    && previous.mode === next.mode
}

export default memo(RouteContent, routeContentPropsAreEqual)
