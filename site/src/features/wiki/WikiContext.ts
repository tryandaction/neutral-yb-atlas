import { createContext, useContext } from 'react'

export interface WikiContextValue {
  open: boolean
  activeId: string | null
  history: string[]
  openEntry: (id: string) => void
  closeWiki: () => void
  goBack: () => void
  openIndex: () => void
}

export const WikiContext = createContext<WikiContextValue | null>(null)

export function useWiki() {
  const value = useContext(WikiContext)
  if (!value) throw new Error('useWiki must be used within WikiProvider')
  return value
}

export function useOptionalWiki() {
  return useContext(WikiContext)
}
