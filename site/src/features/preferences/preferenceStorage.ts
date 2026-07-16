import type { Language, ReadingMode } from '../../types/content'

export interface Preferences {
  version: 1
  language: Language
  mode: ReadingMode
}

export const PREFERENCES_KEY = 'neutral-yb-atlas.preferences.v1'
export const LEGACY_WORKSPACE_KEY = 'neutral-yb-atlas.workspace.v1'

export function createDefaultPreferences(): Preferences {
  return { version: 1, language: 'zh', mode: 'guided' }
}

function parsePreferences(input: string): Preferences | null {
  try {
    const candidate = JSON.parse(input) as Partial<Preferences>
    if (candidate.version !== 1) return null
    if ((candidate.language !== 'zh' && candidate.language !== 'en') || (candidate.mode !== 'guided' && candidate.mode !== 'reference')) return null
    return { version: 1, language: candidate.language, mode: candidate.mode }
  } catch {
    return null
  }
}

function savePreferences(preferences: Preferences) {
  try { window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)) } catch { /* Preferences are optional. */ }
}

export function loadPreferences(): Preferences {
  const stored = parsePreferences(window.localStorage.getItem(PREFERENCES_KEY) ?? '')
  if (stored) return stored

  const migrated = parsePreferences(window.localStorage.getItem(LEGACY_WORKSPACE_KEY) ?? '')
  if (migrated) savePreferences(migrated)
  try { window.localStorage.removeItem(LEGACY_WORKSPACE_KEY) } catch { /* Ignore unavailable storage. */ }
  return migrated ?? createDefaultPreferences()
}

export function persistPreferences(preferences: Preferences) {
  savePreferences(preferences)
}
