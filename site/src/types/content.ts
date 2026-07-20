export type Language = 'zh' | 'en'
export type ReadingMode = 'guided' | 'reference'

export interface LocalizedText {
  zh: string
  en: string
}

export interface ArticleKeyPoint {
  title: LocalizedText
  body: LocalizedText
}

export interface ResearchEquation {
  expression: string
  explanation: LocalizedText
}

export interface ResearchInstrument {
  name: LocalizedText
  role: LocalizedText
  measures: LocalizedText
}

export interface ResearchDetail {
  principle: LocalizedText
  equations?: ResearchEquation[]
  instruments: ResearchInstrument[]
  procedure: LocalizedText[]
  outputs: LocalizedText[]
  milestone: LocalizedText
  acceptance: LocalizedText[]
  theoryToExperiment?: LocalizedText
}

export interface ArticleSection {
  id: string
  title: LocalizedText
  body: LocalizedText
  keyPoints?: ArticleKeyPoint[]
  equation?: string
  equationNote?: LocalizedText
  takeaway?: LocalizedText
  research?: ResearchDetail
}

export interface Chapter {
  id: string
  number: number
  title: LocalizedText
  shortTitle: LocalizedText
  question: LocalizedText
  sections: ArticleSection[]
}

export type EvidenceStatus =
  | 'confirmed'
  | 'confirmed_from_official_source_data'
  | 'derived_confirmed'
  | 'candidate'
  | 'candidate_digitized'
  | 'missing'
  | 'unavailable'

export interface EvidenceSource {
  citation: string
  url: string
}

export interface EvidenceEntry {
  id: string
  label: LocalizedText
  domain: 'atomic' | 'gate' | 'experiment' | 'architecture'
  value: number | string
  unit?: string
  status: EvidenceStatus
  note: LocalizedText
  source: EvidenceSource
}

export interface InstrumentEntry {
  id: string
  name: LocalizedText
  role: LocalizedText
  selection: LocalizedText
}

export interface ExperimentPhase {
  id: string
  order: number
  title: LocalizedText
  objective: LocalizedText
  durationWeeks: [number, number]
  dependencies: string[]
  instruments: InstrumentEntry[]
  acceptance: LocalizedText[]
  failureSignals: LocalizedText[]
}
