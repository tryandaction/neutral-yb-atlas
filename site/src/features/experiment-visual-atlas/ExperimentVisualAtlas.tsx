import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import apparatusImage from '../../assets/teaching-generated/yb-reloadable-apparatus.png'
import type { Language } from '../../types/content'
import './experiment-visual-atlas.css'

const stageGroups = [
  {
    range: '01–03',
    zh: '原子束与预冷',
    en: 'atomic beam and precooling',
  },
  {
    range: '04–06',
    zh: '转移与窄线冷却',
    en: 'transfer and narrow-line cooling',
  },
  {
    range: '07–09',
    zh: '储备池、光镊与计算',
    en: 'reservoir, tweezers and computation',
  },
] as const

const copy = {
  zh: {
    title: '从 Yb 原子束到可持续补充的计算阵列',
    introduction: '原子流从宽线减速、窄线冷却和腔增强输运进入科学腔，再由移动光镊完成装载、成像、转移与阵列补充。图中实验参数按装置来源分别标注。',
    imageAlt: '从原子源到可持续补充计算阵列的完整 171Yb 实验装置链',
    viewportLabel: '171Yb 实验装置全流程横向图',
    stageNavigation: '实验阶段定位',
    previous: '查看上一组实验阶段',
    next: '查看下一组实验阶段',
    openPrefix: '打开阶段',
    captionLead: '装载、冷却、输运与连续补充参数来自',
    captionBridge: '；亚稳态量子比特 Rydberg 门接口来自',
    captionTail: '。阵列重排在图中作为处理器级扩展，不作为 Li 等人装置已经演示的结果。',
  },
  en: {
    title: 'From Yb atomic beam to a reloadable computation array',
    introduction: 'The atomic flow passes through broad-line slowing, narrow-line cooling and cavity-enhanced transport before mobile tweezers load, image, transfer and replenish the science-chamber array. Apparatus-specific values retain separate source attribution.',
    imageAlt: 'Complete 171Yb apparatus path from atomic source to a reloadable computation array',
    viewportLabel: 'Complete horizontal view of the 171Yb experimental apparatus',
    stageNavigation: 'Experimental stage navigation',
    previous: 'View the previous experimental stage group',
    next: 'View the next experimental stage group',
    openPrefix: 'Open stages',
    captionLead: 'Loading, cooling, transport and replacement parameters follow',
    captionBridge: '; the metastable-qubit Rydberg gate interface follows',
    captionTail: '. Array rearrangement is shown as a processor-level extension, not as a demonstrated result of the Li et al. apparatus.',
  },
} as const

export default function ExperimentVisualAtlas({ language }: { language: Language }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [activeGroup, setActiveGroup] = useState(0)
  const text = copy[language]

  const moveToGroup = (index: number) => {
    const viewport = viewportRef.current
    if (!viewport) return

    const nextIndex = Math.min(stageGroups.length - 1, Math.max(0, index))
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
    const left = maxScroll * nextIndex / (stageGroups.length - 1)
    viewport.scrollTo({ behavior: 'smooth', left })
    setActiveGroup(nextIndex)
  }

  const trackVisibleGroup = () => {
    const viewport = viewportRef.current
    if (!viewport) return

    const maxScroll = viewport.scrollWidth - viewport.clientWidth
    if (maxScroll <= 0) {
      setActiveGroup(0)
      return
    }

    const nextIndex = Math.round((viewport.scrollLeft / maxScroll) * (stageGroups.length - 1))
    setActiveGroup(Math.min(stageGroups.length - 1, Math.max(0, nextIndex)))
  }

  return (
    <section className="visual-atlas" id="experiment-visual-atlas">
      <header className="visual-atlas__header">
        <h2>{text.title}</h2>
        <p>{text.introduction}</p>
      </header>

      <div className="visual-atlas__toolbar">
        <nav className="visual-atlas__stage-nav" aria-label={text.stageNavigation}>
          {stageGroups.map((group, index) => (
            <button
              key={group.range}
              type="button"
              aria-label={`${text.openPrefix} ${group.range.replace('–', ' to ')}: ${group[language]}`}
              aria-pressed={activeGroup === index}
              onClick={() => moveToGroup(index)}
            >
              <span>{group.range}</span>
              <b>{group[language]}</b>
            </button>
          ))}
        </nav>

        <div className="visual-atlas__step-controls">
          <button
            type="button"
            aria-label={text.previous}
            title={text.previous}
            disabled={activeGroup === 0}
            onClick={() => moveToGroup(activeGroup - 1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={text.next}
            title={text.next}
            disabled={activeGroup === stageGroups.length - 1}
            onClick={() => moveToGroup(activeGroup + 1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <figure className="visual-atlas__figure">
        <div
          ref={viewportRef}
          className="visual-atlas__viewport"
          data-testid="apparatus-scroll-viewport"
          role="region"
          aria-label={text.viewportLabel}
          tabIndex={0}
          onScroll={trackVisibleGroup}
        >
          <img src={apparatusImage} alt={text.imageAlt} width="2172" height="724" loading="lazy" draggable="false" />
        </div>
        <figcaption>
          {text.captionLead}{' '}
          <a href="https://arxiv.org/abs/2506.15633" target="_blank" rel="noreferrer">Li et al. (2025)</a>
          {text.captionBridge}{' '}
          <a href="https://doi.org/10.1038/s41586-023-06438-1" target="_blank" rel="noreferrer">Ma et al. (2023)</a>
          {text.captionTail}
        </figcaption>
      </figure>
    </section>
  )
}
