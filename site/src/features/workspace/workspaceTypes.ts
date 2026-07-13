import type { Language, ReadingMode } from '../../types/content'

export interface ParameterSnapshot {
  id: string
  name: string
  createdAt: string
  modelId: string
  values: Record<string, number>
  note: string
}

export interface WorkspaceState {
  version: 1
  language: Language
  mode: ReadingMode
  editing: boolean
  notes: Record<string, string>
  articleOverrides: Record<string, string>
  parameterSnapshots: ParameterSnapshot[]
  completedExperimentPhases: string[]
}
