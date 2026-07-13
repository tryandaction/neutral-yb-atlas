import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { WikiContext } from './WikiContext'

export function WikiProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])

  const openEntry = useCallback((id: string) => {
    setOpen(true)
    setActiveId((current) => {
      if (current && current !== id) setHistory((items) => [...items, current])
      return id
    })
  }, [])

  const openIndex = useCallback(() => {
    setOpen(true)
    setActiveId(null)
    setHistory([])
  }, [])

  const closeWiki = useCallback(() => setOpen(false), [])

  const goBack = useCallback(() => {
    setHistory((items) => {
      const previous = items.at(-1) ?? null
      setActiveId(previous)
      return items.slice(0, -1)
    })
  }, [])

  const value = useMemo(() => ({ open, activeId, history, openEntry, closeWiki, goBack, openIndex }), [open, activeId, history, openEntry, closeWiki, goBack, openIndex])

  return <WikiContext.Provider value={value}>{children}</WikiContext.Provider>
}
