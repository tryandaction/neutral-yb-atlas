import type { WorkspaceState } from './workspaceTypes'

export const WORKSPACE_KEY = 'neutral-yb-atlas.workspace.v1'

export function createDefaultWorkspace(): WorkspaceState {
  return {
    version: 1,
    language: 'zh',
    mode: 'guided',
    editing: false,
    notes: {},
    articleOverrides: {},
    parameterSnapshots: [],
    completedExperimentPhases: [],
  }
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.values(value).every((item) => typeof item === 'string')
  )
}

export function parseWorkspace(input: string): WorkspaceState {
  const parsed: unknown = JSON.parse(input)

  if (typeof parsed !== 'object' || parsed === null || !('version' in parsed)) {
    throw new Error('Invalid workspace payload')
  }

  if (parsed.version !== 1) throw new Error('Unsupported workspace version')

  const candidate = parsed as Partial<WorkspaceState>
  if (
    (candidate.language !== 'zh' && candidate.language !== 'en') ||
    (candidate.mode !== 'guided' && candidate.mode !== 'reference') ||
    typeof candidate.editing !== 'boolean' ||
    !isStringRecord(candidate.notes) ||
    !isStringRecord(candidate.articleOverrides) ||
    !Array.isArray(candidate.parameterSnapshots) ||
    !Array.isArray(candidate.completedExperimentPhases)
  ) {
    throw new Error('Invalid workspace payload')
  }

  return candidate as WorkspaceState
}

export function serializeWorkspace(workspace: WorkspaceState): string {
  return JSON.stringify(workspace)
}

export function loadWorkspace(): WorkspaceState {
  try {
    const raw = window.localStorage.getItem(WORKSPACE_KEY)
    if (!raw) return createDefaultWorkspace()

    const parsed = parseWorkspace(raw)
    const accidentalEdit = parsed.articleOverrides['inverse-problem']
    const isKnownAccidentalEdit =
      accidentalEdit?.startsWith('理论首先把可测谱线') &&
      accidentalEdit.endsWith('模型最有价值的输出通常是下一项最能区分=')

    if (!isKnownAccidentalEdit) return parsed

    const articleOverrides = { ...parsed.articleOverrides }
    delete articleOverrides['inverse-problem']
    const repaired = { ...parsed, articleOverrides }
    window.localStorage.setItem(WORKSPACE_KEY, serializeWorkspace(repaired))
    return repaired
  } catch {
    return createDefaultWorkspace()
  }
}

export function saveWorkspace(workspace: WorkspaceState): boolean {
  try {
    window.localStorage.setItem(WORKSPACE_KEY, serializeWorkspace(workspace))
    return true
  } catch {
    return false
  }
}
