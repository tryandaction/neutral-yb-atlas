import { useCallback, useState } from 'react'
import type { Language, ReadingMode } from '../../types/content'
import { loadWorkspace, parseWorkspace, saveWorkspace, serializeWorkspace } from './workspaceStorage'
import type { ParameterSnapshot, WorkspaceState } from './workspaceTypes'

export function useWorkspace() {
  const [workspace, setWorkspaceState] = useState<WorkspaceState>(loadWorkspace)
  const [storageAvailable, setStorageAvailable] = useState(true)

  const setWorkspace = useCallback((update: (current: WorkspaceState) => WorkspaceState) => {
    setWorkspaceState((current) => {
      const next = update(current)
      setStorageAvailable(saveWorkspace(next))
      return next
    })
  }, [])

  const setLanguage = useCallback(
    (language: Language) => setWorkspace((current) => ({ ...current, language })),
    [setWorkspace],
  )

  const setMode = useCallback(
    (mode: ReadingMode) => setWorkspace((current) => ({ ...current, mode })),
    [setWorkspace],
  )

  const setEditing = useCallback(
    (editing: boolean) => setWorkspace((current) => ({ ...current, editing })),
    [setWorkspace],
  )

  const setNote = useCallback(
    (id: string, note: string) =>
      setWorkspace((current) => ({ ...current, notes: { ...current.notes, [id]: note } })),
    [setWorkspace],
  )

  const setArticleOverride = useCallback(
    (id: string, value: string) =>
      setWorkspace((current) => ({
        ...current,
        articleOverrides: { ...current.articleOverrides, [id]: value },
      })),
    [setWorkspace],
  )

  const resetArticleOverride = useCallback(
    (id: string) =>
      setWorkspace((current) => {
        const articleOverrides = { ...current.articleOverrides }
        delete articleOverrides[id]
        return { ...current, articleOverrides }
      }),
    [setWorkspace],
  )

  const resetAllArticleOverrides = useCallback(
    () => setWorkspace((current) => ({ ...current, articleOverrides: {} })),
    [setWorkspace],
  )

  const saveSnapshot = useCallback(
    (snapshot: ParameterSnapshot) =>
      setWorkspace((current) => ({
        ...current,
        parameterSnapshots: [snapshot, ...current.parameterSnapshots],
      })),
    [setWorkspace],
  )

  const toggleExperimentPhase = useCallback(
    (id: string) =>
      setWorkspace((current) => {
        const completed = new Set(current.completedExperimentPhases)
        if (completed.has(id)) completed.delete(id)
        else completed.add(id)
        return { ...current, completedExperimentPhases: [...completed] }
      }),
    [setWorkspace],
  )

  const importWorkspace = useCallback(
    (input: string) => {
      const imported = parseWorkspace(input)
      setWorkspaceState(imported)
      setStorageAvailable(saveWorkspace(imported))
    },
    [],
  )

  return {
    workspace,
    storageAvailable,
    setLanguage,
    setMode,
    setEditing,
    setNote,
    setArticleOverride,
    resetArticleOverride,
    resetAllArticleOverrides,
    saveSnapshot,
    toggleExperimentPhase,
    importWorkspace,
    exportWorkspace: () => serializeWorkspace(workspace),
  }
}
