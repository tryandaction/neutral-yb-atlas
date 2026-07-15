import { useEffect, useState } from 'react'
import { contentRoutes, parseRoute, routeSectionId, type RouteId } from './routes'

function routeFromLocation() {
  return parseRoute(window.location.hash)
}

function waitForDomainContent(target: HTMLElement, route: RouteId) {
  if (route === 'overview' || target.querySelector('.domain-opening')) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      if (!target.querySelector('.domain-opening')) return
      observer.disconnect()
      resolve()
    })
    observer.observe(target, { childList: true, subtree: true })
  })
}

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
}

async function scrollWithoutMotion(target: HTMLElement) {
  const root = document.documentElement
  const previousBehavior = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  target.scrollIntoView({ behavior: 'auto', block: 'start' })
  await nextFrame()
  root.style.scrollBehavior = previousBehavior
}

export function useActiveSection(): RouteId {
  const [activeRoute, setActiveRoute] = useState<RouteId>(routeFromLocation)

  useEffect(() => {
    let navigationVersion = 0
    let pinnedTarget: HTMLElement | null = null
    let correctionFrame = 0

    const alignAfterLayoutSettles = async (target: HTMLElement, route: RouteId, version: number) => {
      await waitForDomainContent(target, route)
      await nextFrame()
      if (version !== navigationVersion) return
      pinnedTarget = target
    }

    const releasePinnedTarget = () => {
      pinnedTarget = null
    }

    const handleHashChange = () => {
      const route = routeFromLocation()
      setActiveRoute(route)
      const target = document.getElementById(routeSectionId(route))
      if (typeof target?.scrollIntoView === 'function') {
        pinnedTarget = target
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const version = ++navigationVersion
        void alignAfterLayoutSettles(target, route, version)
      }
    }

    if (window.location.hash.startsWith('#/')) {
      requestAnimationFrame(handleHashChange)
    }

    window.addEventListener('hashchange', handleHashChange)

    if (typeof IntersectionObserver === 'undefined') {
      return () => window.removeEventListener('hashchange', handleHashChange)
    }

    const routeIds: RouteId[] = ['overview', ...contentRoutes]
    const routeByElement = new Map<Element, RouteId>()
    for (const route of routeIds) {
      const element = document.getElementById(routeSectionId(route))
      if (element) routeByElement.set(element, route)
    }

    const observer = new IntersectionObserver((entries) => {
      const mostVisible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]
      const route = mostVisible ? routeByElement.get(mostVisible.target) : undefined
      if (route) setActiveRoute(route)
    }, {
      rootMargin: '-18% 0px -55% 0px',
      threshold: [0.05, 0.2, 0.4, 0.6, 0.8],
    })

    for (const element of routeByElement.keys()) observer.observe(element)

    const layoutObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      if (!pinnedTarget || correctionFrame) return
      correctionFrame = requestAnimationFrame(() => {
        correctionFrame = 0
        if (pinnedTarget) void scrollWithoutMotion(pinnedTarget)
      })
    })
    const main = document.querySelector('main')
    if (main) layoutObserver?.observe(main)

    window.addEventListener('wheel', releasePinnedTarget, { passive: true })
    window.addEventListener('touchstart', releasePinnedTarget, { passive: true })
    window.addEventListener('keydown', releasePinnedTarget)

    return () => {
      navigationVersion += 1
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('wheel', releasePinnedTarget)
      window.removeEventListener('touchstart', releasePinnedTarget)
      window.removeEventListener('keydown', releasePinnedTarget)
      observer.disconnect()
      layoutObserver?.disconnect()
      cancelAnimationFrame(correctionFrame)
    }
  }, [])

  return activeRoute
}
