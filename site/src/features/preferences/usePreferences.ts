import { useCallback, useState } from 'react'
import type { Language, ReadingMode } from '../../types/content'
import { loadPreferences, persistPreferences, type Preferences } from './preferenceStorage'

export function usePreferences() {
  const [preferences, setPreferencesState] = useState<Preferences>(loadPreferences)

  const update = useCallback((next: Preferences) => {
    setPreferencesState(next)
    persistPreferences(next)
  }, [])

  return {
    preferences,
    setLanguage: (language: Language) => update({ ...preferences, language }),
    setMode: (mode: ReadingMode) => update({ ...preferences, mode }),
  }
}
