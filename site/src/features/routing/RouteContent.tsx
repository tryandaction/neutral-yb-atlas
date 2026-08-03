import { evidenceEntries } from '../../content/evidence'
import { memo } from 'react'
import type { RouteId } from '../../navigation/routes'
import type { Language, ReadingMode } from '../../types/content'
import AtomicMap from '../atomic-map/AtomicMap'
import SpeciesComparison from '../comparison/SpeciesComparison'
import ComputationPhysicalMap from '../core-questions/ComputationPhysicalMap'
import ExperimentEngineeringMap from '../core-questions/ExperimentEngineeringMap'
import FaultToleranceScaleMap from '../core-questions/FaultToleranceScaleMap'
import GateImplementationLoop from '../core-questions/GateImplementationLoop'
import YbDecisionMap from '../core-questions/YbDecisionMap'
import DomainPage from '../domain/DomainPage'
import { domainDefinitions } from '../domain/domainDefinitions'
import EvidenceBrowser from '../evidence/EvidenceBrowser'
import ExperimentCycleTimeline from '../experiment-timeline/ExperimentCycleTimeline'
import ResourceEstimator from '../fault-tolerance/ResourceEstimator'
import OverviewPage from '../overview/OverviewPage'
import ExperimentPipeline from '../teaching-visuals/ExperimentPipeline'
import GateCircuitAtlas from '../teaching-visuals/GateCircuitAtlas'
import RydbergGateTutor from '../teaching-visuals/RydbergGateTutor'
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
  let content
  switch (route) {
    case 'foundations':
      content = <><ComputationPhysicalMap language={language} /><GateCircuitAtlas language={language} scope="foundations" /></>
      break
    case 'yb-platform':
      content = <><YbDecisionMap language={language} /><AtomicMap language={language} /><div id="species-comparison"><SpeciesComparison language={language} /></div></>
      break
    case 'gates-theory':
      content = <><GateImplementationLoop language={language} /><RydbergGateTutor language={language} /><TheoryWorkbench language={language} /></>
      break
    case 'experiment':
      content = <><ExperimentEngineeringMap language={language} /><ExperimentPipeline language={language} /><ExperimentCycleTimeline language={language} /></>
      break
    case 'fault-tolerance':
      content = <><FaultToleranceScaleMap language={language} /><GateCircuitAtlas language={language} scope="fault" /><ResourceEstimator language={language} /></>
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
