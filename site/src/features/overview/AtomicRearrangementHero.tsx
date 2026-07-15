import { ArrowDown, Cat, Circle, Columns3, Dices, Grid3X3 } from 'lucide-react'
import { useEffect, useRef, useState, type ComponentType } from 'react'
import type { Language } from '../../types/content'
import AtomicRearrangementCanvas from './AtomicRearrangementCanvas'
import { arrangementSequence, type ArrangementShape } from './atomicRearrangementModel'

interface AtomicRearrangementHeroProps {
  language: Language
}

interface ShapeOption {
  id: ArrangementShape
  icon: ComponentType<{ 'aria-hidden'?: boolean }>
  label: Record<Language, string>
}

interface CoverCopy {
  title: string
  titleLines: [string, string]
  body: string
  journey: string
  description: string
  scene: string
}

const shapeOptions: ShapeOption[] = [
  { id: 'random', icon: Dices, label: { zh: '随机装载', en: 'Random loading' } },
  { id: 'circle', icon: Circle, label: { zh: '圆阵', en: 'Circle' } },
  { id: 'grid', icon: Grid3X3, label: { zh: '方阵', en: 'Square array' } },
  { id: 'pairs', icon: Columns3, label: { zh: '相邻列配对', en: 'Paired columns' } },
  { id: 'cat', icon: Cat, label: { zh: '猫形', en: 'Cat' } },
]

const copy: Record<Language, CoverCopy> = {
  zh: {
    title: '中性 Yb 原子计算',
    titleLines: ['中性 Yb', '原子计算'],
    body: '从可控物理状态出发，沿着量子门、实验系统与容错架构，抵达一次可信计算。',
    journey: '从什么是计算开始',
    description: '81 个镱原子在光镊阵列中重排为随机装载、圆阵、方阵、相邻列配对与猫形。',
    scene: '原子重排序列',
  },
  en: {
    title: 'Neutral Yb Atomic Computing',
    titleLines: ['Neutral Yb', 'Atomic Computing'],
    body: 'Begin with controllable physical states, then follow gates, experimental systems and fault tolerance toward one trustworthy computation.',
    journey: 'Begin with what computation is',
    description: '81 ytterbium atoms rearrange through random loading, a circle, a square array, paired columns and a cat silhouette.',
    scene: 'Atomic rearrangement sequence',
  },
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
}

export default function AtomicRearrangementHero({ language }: AtomicRearrangementHeroProps) {
  const [activeShape, setActiveShape] = useState<ArrangementShape>(() => prefersReducedMotion() ? 'grid' : 'random')
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion)
  const pausedCyclesRef = useRef(0)
  const text = copy[language]
  const activeOption = shapeOptions.find((option) => option.id === activeShape) ?? shapeOptions[0]

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => {
      setReducedMotion(media.matches)
      if (media.matches) setActiveShape('grid')
    }
    media.addEventListener('change', updatePreference)
    return () => media.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const interval = window.setInterval(() => {
      if (pausedCyclesRef.current > 0) {
        pausedCyclesRef.current -= 1
        return
      }
      setActiveShape((current) => {
        const currentIndex = arrangementSequence.indexOf(current)
        return arrangementSequence[(currentIndex + 1) % arrangementSequence.length]
      })
    }, 5800)
    return () => window.clearInterval(interval)
  }, [reducedMotion])

  const selectShape = (shape: ArrangementShape) => {
    pausedCyclesRef.current = 3
    setActiveShape(shape)
  }

  return (
    <section className={`atomic-cover atomic-cover--${language}`} aria-labelledby="atomic-cover-title">
      <div className="atomic-cover__ambient" aria-hidden="true" />
      <div className="atomic-cover__copy">
        <h1 id="atomic-cover-title" aria-label={text.title}>
          <span className="atomic-cover__title-line" aria-hidden="true">{text.titleLines[0]}</span>
          {' '}
          <span className="atomic-cover__title-line" aria-hidden="true">{text.titleLines[1]}</span>
        </h1>
        <p>{text.body}</p>
      </div>

      <div className="atomic-cover__scene" aria-label={text.scene}>
        <AtomicRearrangementCanvas
          shape={activeShape}
          reducedMotion={reducedMotion}
          description={text.description}
        />
        <div className="atomic-cover__status">
          <span>{String(arrangementSequence.indexOf(activeShape) + 1).padStart(2, '0')} / 05</span>
          <strong aria-live="polite">{activeOption.label[language]}</strong>
        </div>
        <div className="atomic-cover__controls">
          {shapeOptions.map((option) => {
            const Icon = option.icon
            const label = option.label[language]
            return (
              <button
                key={option.id}
                type="button"
                aria-label={label}
                aria-pressed={option.id === activeShape}
                title={label}
                onClick={() => selectShape(option.id)}
              >
                <Icon aria-hidden={true} />
              </button>
            )
          })}
        </div>
      </div>

      <a className="atomic-cover__journey" href="#causal-atlas">
        <span>{text.journey}</span>
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  )
}
