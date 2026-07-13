import { chapters } from '../../content/chapters'
import { evidenceEntries } from '../../content/evidence'
import type { Language, ReadingMode } from '../../types/content'
import type { ParameterSnapshot } from '../workspace/workspaceTypes'
import ArticleChapter from '../article/ArticleChapter'
import SpeciesComparison from '../comparison/SpeciesComparison'
import EvidenceBrowser from '../evidence/EvidenceBrowser'
import ExperimentWorkbench from '../experiment/ExperimentWorkbench'
import KnowledgeMap from '../knowledge-map/KnowledgeMap'
import ResearchAtlas from '../research-atlas/ResearchAtlas'
import ResearchInterlude from '../research-interlude/ResearchInterlude'
import TheoryWorkbench from '../theory/TheoryWorkbench'
import ExperimentPipeline from '../teaching-visuals/ExperimentPipeline'
import FirstPrinciplesTree from '../teaching-visuals/FirstPrinciplesTree'
import ResearchEcosystem from '../teaching-visuals/ResearchEcosystem'
import YbEnergyTutor from '../teaching-visuals/YbEnergyTutor'
import RydbergGateTutor from '../teaching-visuals/RydbergGateTutor'
import AtomicMap from '../atomic-map/AtomicMap'
import ExperimentVisualAtlas from '../experiment-visual-atlas/ExperimentVisualAtlas'

interface DeepResearchContentProps {
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

export default function DeepResearchContent({ language, mode, editing, articleOverrides, notes, completedExperimentPhases, onArticleChange, onArticleReset, onSaveSnapshot, onNoteChange, onToggleExperimentPhase }: DeepResearchContentProps) {
  const article = (chapterIndex: number) => (
    <ArticleChapter
      key={chapters[chapterIndex].id}
      chapter={chapters[chapterIndex]}
      language={language}
      editing={editing}
      overrides={articleOverrides}
      onChange={onArticleChange}
      onReset={onArticleReset}
    />
  )

  return (
    <>
      <KnowledgeMap language={language} mode={mode} />
      <FirstPrinciplesTree language={language} />
      {chapters.slice(0, 3).map((_, index) => article(index))}
      <YbEnergyTutor language={language} />
      <AtomicMap language={language} />
      {article(3)}
      <RydbergGateTutor language={language} />
      <ResearchInterlude kind="mechanism" language={language} />
      <TheoryWorkbench language={language} onSaveSnapshot={onSaveSnapshot} />
      {article(4)}
      <ResearchInterlude kind="waveform" language={language} />
      <ExperimentPipeline language={language} />
      <ExperimentVisualAtlas language={language} notes={notes} onNoteChange={onNoteChange} />
      <ExperimentWorkbench language={language} completedPhases={completedExperimentPhases} onTogglePhase={onToggleExperimentPhase} />
      <SpeciesComparison language={language} />
      {article(5)}
      <ResearchAtlas language={language} />
      <ResearchEcosystem language={language} />
      {article(6)}
      <ResearchInterlude kind="logical" language={language} />
      <EvidenceBrowser language={language} entries={evidenceEntries} />
    </>
  )
}
