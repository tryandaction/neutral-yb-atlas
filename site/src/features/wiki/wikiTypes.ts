import type { LocalizedText } from '../../types/content'

export type WikiCategory = 'physics' | 'optics' | 'control' | 'vacuum' | 'measurement' | 'architecture'

export interface WikiSection {
  title: LocalizedText
  body: LocalizedText
}

export interface WikiSymbol {
  symbol: string
  meaning: LocalizedText
}

export interface WikiEquation {
  expression: string
  explanation: LocalizedText
  symbols?: WikiSymbol[]
}

export interface WikiStep {
  title: LocalizedText
  action: LocalizedText
  output: LocalizedText
}

export interface WikiSpecification {
  parameter: LocalizedText
  significance: LocalizedText
  target: LocalizedText
}

export interface WikiComparisonRow {
  option: LocalizedText
  strengths: LocalizedText
  limitations: LocalizedText
  useWhen: LocalizedText
}

export interface WikiDiagnostic {
  symptom: LocalizedText
  causes: LocalizedText
  checks: LocalizedText
}

export interface WikiSource {
  citation: string
  url: string
}

export interface WikiEntry {
  id: string
  term: LocalizedText
  abbreviation?: string
  aliases: string[]
  category: WikiCategory
  summary: LocalizedText
  role: LocalizedText
  principles: WikiSection[]
  equations: WikiEquation[]
  workflow: WikiStep[]
  specifications: WikiSpecification[]
  comparison?: WikiComparisonRow[]
  diagnostics: WikiDiagnostic[]
  related: string[]
  sources: WikiSource[]
}

export interface WikiTextSegment {
  type: 'text' | 'term'
  value: string
  entryId?: string
}
