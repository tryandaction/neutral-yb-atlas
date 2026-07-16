import type { LocalizedText } from '../types/content'

export type RouteId = 'overview' | 'foundations' | 'yb-platform' | 'gates-theory' | 'experiment' | 'fault-tolerance' | 'evidence'
export type DomainRouteId = Exclude<RouteId, 'overview'>
export interface RouteDefinition { id: RouteId; slug: string; label: LocalizedText; shortLabel: LocalizedText }

export const routes: RouteDefinition[] = [
  { id: 'overview', slug: '', label: { zh: '总论', en: 'Overview' }, shortLabel: { zh: '总论', en: 'Overview' } },
  { id: 'foundations', slug: 'foundations', label: { zh: '计算原理', en: 'Foundations' }, shortLabel: { zh: '原理', en: 'Principles' } },
  { id: 'yb-platform', slug: 'yb-platform', label: { zh: 'Yb 平台', en: 'Yb platform' }, shortLabel: { zh: 'Yb', en: 'Yb' } },
  { id: 'gates-theory', slug: 'gates-theory', label: { zh: '量子门与理论', en: 'Gates and theory' }, shortLabel: { zh: '量子门', en: 'Gates' } },
  { id: 'experiment', slug: 'experiment', label: { zh: '实验系统', en: 'Experimental systems' }, shortLabel: { zh: '实验', en: 'Systems' } },
  { id: 'fault-tolerance', slug: 'fault-tolerance', label: { zh: '容错与规模', en: 'Fault tolerance' }, shortLabel: { zh: '容错', en: 'QEC' } },
  { id: 'evidence', slug: 'evidence', label: { zh: '延伸阅读', en: 'Further reading' }, shortLabel: { zh: '阅读', en: 'Reading' } },
]

export const contentRoutes: DomainRouteId[] = ['foundations', 'yb-platform', 'gates-theory', 'experiment', 'fault-tolerance', 'evidence']
const routeBySlug = new Map(routes.map((route) => [route.slug, route.id]))
export function parseRoute(hash: string): RouteId { const anchor = hash.replace(/^#/, '').split(/[?#]/, 1)[0].replace(/\/$/, ''); if (!anchor || anchor === '/' || anchor === 'top') return 'overview'; const slug = anchor.startsWith('domain-') ? anchor.slice(7) : anchor.replace(/^\//, ''); return routeBySlug.get(slug) ?? 'overview' }
export function routeSectionId(routeId: RouteId): string { if (routeId === 'overview') return 'top'; const route = routes.find((candidate) => candidate.id === routeId); return `domain-${route?.slug ?? routeId}` }
export function routeHref(routeId: RouteId): string { return `#${routeSectionId(routeId)}` }
