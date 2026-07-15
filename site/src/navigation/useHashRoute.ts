import { useEffect, useState } from 'react'
import { parseRoute, type RouteId } from './routes'

function readRoute(): RouteId {
  return parseRoute(window.location.hash)
}

export function useHashRoute(): RouteId {
  const [route, setRoute] = useState<RouteId>(readRoute)

  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}
