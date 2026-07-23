import { Maximize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Language } from '../../types/content'
import WikiText from '../wiki/WikiText'
import { atlasPlates, type AtlasPlate } from './visualAtlasData'
import './experiment-visual-atlas.css'

const lensScale = 2.5

function lensAxisPosition(coordinate: number) {
  const centeredPosition = (50 - coordinate * lensScale) / (1 - lensScale)
  const boundedPosition = Math.min(100, Math.max(0, centeredPosition))
  return `${boundedPosition.toFixed(2)}%`
}

function ImageStage({ plate, selectedId, annotationVisible, language, onSelect, onClear }: {
  plate: AtlasPlate
  selectedId: string
  annotationVisible: boolean
  language: Language
  onSelect: (id: string) => void
  onClear: () => void
}) {
  const selected = plate.hotspots.find((hotspot) => hotspot.id === selectedId) ?? plate.hotspots[0]
  const calloutX = Math.min(94, Math.max(6, selected.x + (selected.x > 52 ? -9 : 9)))
  const calloutY = Math.min(92, Math.max(8, selected.y - 10))

  return (
    <div
      className="visual-atlas__image-stage"
      data-testid="atlas-image-stage"
      style={{ aspectRatio: plate.aspectRatio ?? '1672 / 941' }}
      onClick={onClear}
    >
      <img src={plate.image} alt={plate.alt[language]} loading="lazy" />
      {plate.masks?.map((mask) => (
        <div
          key={mask.id}
          className="visual-atlas__correction-mask"
          data-testid={`atlas-correction-mask-${mask.id}`}
          style={{
            left: `${mask.left}%`,
            top: `${mask.top}%`,
            width: `${mask.width}%`,
            height: `${mask.height}%`,
            background: mask.background,
            color: mask.color ?? 'inherit',
            fontSize: mask.fontSize,
          }}
        >
          {mask.text?.split('\n').map((line) => <span key={line}>{line}</span>)}
        </div>
      ))}
      <div
        className="visual-atlas__hotspot-overlay"
        data-testid="atlas-hotspot-overlay"
        data-coordinate-system="normalized-percent"
        style={{ color: plate.accent }}
      >
        {annotationVisible ? <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id={`atlas-arrow-${plate.id}`} markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="currentColor" />
            </marker>
          </defs>
          <line x1={calloutX} y1={calloutY} x2={selected.x} y2={selected.y} markerEnd={`url(#atlas-arrow-${plate.id})`} vectorEffect="non-scaling-stroke" />
          <ellipse
            data-testid="atlas-hotspot-ring"
            data-hotspot={selected.id}
            cx={selected.x}
            cy={selected.y}
            rx={selected.rx}
            ry={selected.ry}
            vectorEffect="non-scaling-stroke"
          />
        </svg> : null}
        {plate.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            className="visual-atlas__image-target"
            aria-label={`${language === 'zh' ? '图中选择' : 'Select on figure'} ${hotspot.label[language]}`}
            aria-pressed={annotationVisible && hotspot.id === selected.id}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            onClick={(event) => {
              event.stopPropagation()
              onSelect(hotspot.id)
            }}
          />
        ))}
        {annotationVisible ? <span className="visual-atlas__hotspot-index" style={{ left: `${calloutX}%`, top: `${calloutY}%` }} aria-hidden="true">
          {selected.index}
        </span> : null}
      </div>
    </div>
  )
}

export default function ExperimentVisualAtlas({ language }: { language: Language }) {
  const [plateId, setPlateId] = useState(atlasPlates[0].id)
  const [hotspotId, setHotspotId] = useState(atlasPlates[0].hotspots[0].id)
  const [annotationVisible, setAnnotationVisible] = useState(true)
  const [fullOpen, setFullOpen] = useState(false)
  const plate = atlasPlates.find((item) => item.id === plateId) ?? atlasPlates[0]
  const selected = plate.hotspots.find((hotspot) => hotspot.id === hotspotId) ?? plate.hotspots[0]

  useEffect(() => {
    if (!fullOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [fullOpen])

  const selectPlate = (next: AtlasPlate) => {
    setPlateId(next.id)
    setHotspotId(next.hotspots[0].id)
    setAnnotationVisible(true)
  }

  const selectHotspot = (id: string) => {
    setHotspotId(id)
    setAnnotationVisible(true)
  }

  return (
    <section className="visual-atlas" id="experiment-visual-atlas">
      <header className="visual-atlas__header">
        <h2>{language === 'zh' ? '交互实验图谱' : 'Interactive experimental plate atlas'}</h2>
        <p>{language === 'zh'
          ? '八张图版把真实设备、内部结构与操作顺序连接到同一学习路径。点击图中区域，查看它控制的物理过程、可观察信号与理解边界。'
          : 'Eight plates connect real apparatus, internal structure and operating sequence in one learning path. Select a region to inspect its physical role, observable signal and scope.'}</p>
      </header>

      <nav className="visual-atlas__plate-rail" aria-label={language === 'zh' ? '实验图版选择' : 'Experimental plate selection'}>
        {atlasPlates.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-label={`${language === 'zh' ? '打开图版' : 'Open plate'} ${item.title[language]}`}
            aria-pressed={item.id === plate.id}
            onClick={() => selectPlate(item)}
          >
            <span>{item.number}</span>
            <b>{item.shortTitle[language]}</b>
          </button>
        ))}
      </nav>

      <div className="visual-atlas__workspace">
        <figure>
          <ImageStage
            plate={plate}
            selectedId={selected.id}
            annotationVisible={annotationVisible}
            language={language}
            onSelect={selectHotspot}
            onClear={() => setAnnotationVisible(false)}
          />
          <button
            type="button"
            className="visual-atlas__expand"
            aria-label={language === 'zh' ? '全屏查看当前图版' : 'View current plate fullscreen'}
            title={language === 'zh' ? '全屏查看' : 'View fullscreen'}
            onClick={() => setFullOpen(true)}
          >
            <Maximize2 aria-hidden="true" />
          </button>
          {annotationVisible ? <div
            className="visual-atlas__mobile-lens"
            data-testid="atlas-mobile-lens"
            data-focus-x={selected.x}
            data-focus-y={selected.y}
            role="img"
            aria-label={`${language === 'zh' ? '选中区域放大' : 'Selected-region magnification'}: ${selected.label[language]}`}
            style={{
              backgroundImage: `url(${plate.image})`,
              backgroundPosition: `${lensAxisPosition(selected.x)} ${lensAxisPosition(selected.y)}`,
              color: plate.accent,
              aspectRatio: plate.aspectRatio ?? '1672 / 941',
            }}
          >
            <span>{selected.index}</span>
            <b>{selected.label[language]}</b>
          </div> : null}
          <figcaption>{plate.caption[language]}</figcaption>
        </figure>

        <aside className="visual-atlas__inspector" aria-live="polite">
          <div className="visual-atlas__scope"><span>{plate.number}</span><small>{plate.scope[language]}</small></div>
          <h3>{selected.label[language]}</h3>
          <p className="visual-atlas__summary"><WikiText text={selected.summary[language]} language={language} /></p>
          <dl>
            <div><dt>{language === 'zh' ? '操作' : 'Action'}</dt><dd><WikiText text={selected.action[language]} language={language} /></dd></div>
            <div><dt>{language === 'zh' ? '学习线索' : 'Learning clue'}</dt><dd><WikiText text={selected.record[language]} language={language} /></dd></div>
            <div><dt>{language === 'zh' ? '边界' : 'Boundary'}</dt><dd><WikiText text={selected.boundary[language]} language={language} /></dd></div>
          </dl>
          <div className="visual-atlas__hotspot-list">
            {plate.hotspots.map((hotspot) => (
              <button
                type="button"
                key={hotspot.id}
                aria-label={`${language === 'zh' ? '定位' : 'Locate'} ${hotspot.label[language]}`}
                aria-pressed={annotationVisible && hotspot.id === selected.id}
                onClick={() => selectHotspot(hotspot.id)}
              >
                <span>{hotspot.index}</span>{hotspot.label[language]}
              </button>
            ))}
          </div>
        </aside>
      </div>

      {fullOpen && (
        <div className="visual-atlas__lightbox" role="dialog" aria-modal="true" aria-label={language === 'zh' ? '实验图版全屏视图' : 'Experimental plate fullscreen view'}>
          <button type="button" aria-label={language === 'zh' ? '关闭全屏图版' : 'Close fullscreen plate'} onClick={() => setFullOpen(false)}><X aria-hidden="true" /></button>
          <div className="visual-atlas__lightbox-stage">
            <ImageStage
              plate={plate}
              selectedId={selected.id}
              annotationVisible={annotationVisible}
              language={language}
              onSelect={selectHotspot}
              onClear={() => setAnnotationVisible(false)}
            />
          </div>
        </div>
      )}
    </section>
  )
}
