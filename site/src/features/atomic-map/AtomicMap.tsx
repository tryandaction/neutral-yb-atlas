import { Maximize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import energyDiagram from '../../../assets/yb-energy-levels-reference.svg'
import type { Language } from '../../types/content'
import './atomic-map.css'

export default function AtomicMap({ language }: { language: Language }) {
  const [fullMapOpen, setFullMapOpen] = useState(false)
  const imageAlt = language === 'zh' ? '171Yb 能级与光学通道图' : '171Yb level and optical-channel map'

  useEffect(() => {
    if (!fullMapOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullMapOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [fullMapOpen])

  return (
    <section className="atomic-reference" id="yb-complete-reference-map">
      <header>
        <div>
          <span>REFERENCE / COMPLETE MAP</span>
          <h2>{language === 'zh' ? '完整 171Yb 能级参考图' : 'Complete 171Yb level reference map'}</h2>
        </div>
        <p>
          {language === 'zh'
            ? '本图集中核对 171Yb 能级、Raman 控制、Rydberg 接口以及衰变—再泵浦—擦除检测关系；可使用左上角按钮查看完整大图。'
            : 'Use this reference to cross-check the 171Yb levels, Raman control, Rydberg interface, and decay–repump–erasure sequence; open the full view from the upper-left control.'}
        </p>
      </header>

      <div className="atomic-reference__body">
        <figure>
          <div className="atomic-reference__image-stage">
            <img src={energyDiagram} alt={imageAlt} loading="lazy" />
          </div>
          <figcaption>
            {language === 'zh'
              ? '主图给出能级与计算接口；下部流程单独说明 Rydberg 衰变、770 nm 再泵浦与擦除检测的实验含义。'
              : 'The main panel maps levels to computational interfaces; the lower sequence separates Rydberg decay, 770 nm repumping and erasure detection.'}
          </figcaption>
        </figure>
        <button
          type="button"
          className="atomic-reference__expand"
          aria-label={language === 'zh' ? '查看完整能级图' : 'View full energy-level map'}
          title={language === 'zh' ? '查看完整能级图' : 'View full energy-level map'}
          onClick={() => setFullMapOpen(true)}
        >
          <Maximize2 aria-hidden="true" />
        </button>

      </div>

      {fullMapOpen && (
        <div
          className="atomic-reference__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={language === 'zh' ? '完整能级图视图' : 'Full energy-level map view'}
        >
          <button
            type="button"
            aria-label={language === 'zh' ? '关闭完整能级图' : 'Close full energy-level map'}
            title={language === 'zh' ? '关闭' : 'Close'}
            onClick={() => setFullMapOpen(false)}
          >
            <X aria-hidden="true" />
          </button>
          <img src={energyDiagram} alt={imageAlt} />
        </div>
      )}
    </section>
  )
}
