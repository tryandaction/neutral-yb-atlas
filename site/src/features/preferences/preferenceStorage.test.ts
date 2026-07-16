import { LEGACY_WORKSPACE_KEY, loadPreferences } from './preferenceStorage'

it('migrates language and reading mode but discards legacy article edits', () => {
  localStorage.setItem(LEGACY_WORKSPACE_KEY, JSON.stringify({
    version: 1,
    language: 'en',
    mode: 'reference',
    editing: true,
    notes: { general: 'draft' },
    articleOverrides: { state: 'changed' },
    parameterSnapshots: [],
    completedExperimentPhases: [],
  }))

  expect(loadPreferences()).toEqual({ version: 1, language: 'en', mode: 'reference' })
  expect(localStorage.getItem(LEGACY_WORKSPACE_KEY)).toBeNull()
})
