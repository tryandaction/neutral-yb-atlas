import { chapters } from '../../content/chapters'
import { evidenceEntries } from '../../content/evidence'
import { memo } from 'react'
import type { RouteId } from '../../navigation/routes'
import type { Language, ReadingMode } from '../../types/content'
import type { ParameterSnapshot } from '../workspace/workspaceTypes'
import ArticleChapter from '../article/ArticleChapter'
import AtomicMap from '../atomic-map/AtomicMap'
import SpeciesComparison from '../comparison/SpeciesComparison'
import DomainPage from '../domain/DomainPage'
import { domainDefinitions } from '../domain/domainDefinitions'
import EvidenceBrowser from '../evidence/EvidenceBrowser'
import ExperimentWorkbench from '../experiment/ExperimentWorkbench'
import ExperimentVisualAtlas from '../experiment-visual-atlas/ExperimentVisualAtlas'
import ResourceEstimator from '../fault-tolerance/ResourceEstimator'
import OverviewPage from '../overview/OverviewPage'
import ResearchAtlas from '../research-atlas/ResearchAtlas'
import ExperimentPipeline from '../teaching-visuals/ExperimentPipeline'
import ResearchEcosystem from '../teaching-visuals/ResearchEcosystem'
import RydbergGateTutor from '../teaching-visuals/RydbergGateTutor'
import YbEnergyTutor from '../teaching-visuals/YbEnergyTutor'
import TheoryWorkbench from '../theory/TheoryWorkbench'

interface RouteContentProps {
  route: RouteId
  language: Language
  mode: ReadingMode
  editing: boolean
  articleOverrides: Record<string, string>
  notes: Record<string, string>
  completedExperimentPhases: string[]
  onArticleChange: (id: string, value: string) => void
  onArticleReset: (id: string) => void
  onSaveSnapshot: (snapshot: ParameterSnapshot) => void
  onNoteChange: (id: string, value: string) => void
  onToggleExperimentPhase: (id: string) => void
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
      editing={props.editing}
      overrides={props.articleOverrides}
      onChange={props.onArticleChange}
      onReset={props.onArticleReset}
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
      content = <>{article(3)}<RydbergGateTutor language={language} /><TheoryWorkbench language={language} onSaveSnapshot={props.onSaveSnapshot} />{article(5)}</>
      break
    case 'experiment':
      content = <>{article(4)}<ExperimentPipeline language={language} /><ExperimentVisualAtlas language={language} notes={props.notes} onNoteChange={props.onNoteChange} /><div id="experiment-workbench"><ExperimentWorkbench language={language} completedPhases={props.completedExperimentPhases} onTogglePhase={props.onToggleExperimentPhase} /></div></>
      break
    case 'fault-tolerance':
      content = <>{article(6)}<ResourceEstimator language={language} /></>
      break
    case 'evidence':
      content = <><ResearchAtlas language={language} /><ResearchEcosystem language={language} /><EvidenceBrowser language={language} entries={evidenceEntries} /></>
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

function equalDomainNotes(previous: Record<string, string>, next: Record<string, string>) {
  const previousKeys = Object.keys(previous).filter((key) => key !== 'general')
  const nextKeys = Object.keys(next).filter((key) => key !== 'general')
  return previousKeys.length === nextKeys.length
    && previousKeys.every((key) => previous[key] === next[key])
}

function routeContentPropsAreEqual(previous: RouteContentProps, next: RouteContentProps) {
  return previous.route === next.route
    && previous.language === next.language
    && previous.mode === next.mode
    && previous.editing === next.editing
    && previous.articleOverrides === next.articleOverrides
    && previous.completedExperimentPhases === next.completedExperimentPhases
    && previous.onArticleChange === next.onArticleChange
    && previous.onArticleReset === next.onArticleReset
    && previous.onSaveSnapshot === next.onSaveSnapshot
    && previous.onNoteChange === next.onNoteChange
    && previous.onToggleExperimentPhase === next.onToggleExperimentPhase
    && (previous.route !== 'experiment' || equalDomainNotes(previous.notes, next.notes))
}

export default memo(RouteContent, routeContentPropsAreEqual)
