import { Maximize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import energyDiagram from '../../../assets/yb-energy-levels-reference.svg'
import type { Language } from '../../types/content'
import './atomic-map.css'

type LocalizedText = Record<Language, string>

type ReferenceHotspot = {
  id: string
  wavelength: string
  label: LocalizedText
  name: LocalizedText
  role: LocalizedText
  mechanism: LocalizedText
  x: number
  y: number
  rx: number
  ry: number
  labelX: number
  labelY: number
  color: string
}

const hotspots: ReferenceHotspot[] = [
  {
    id: '399',
    wavelength: '399 nm',
    label: { zh: '399 nm 强跃迁', en: '399 nm strong transition' },
    name: { zh: '强跃迁', en: 'Strong transition' },
    role: { zh: '主冷却、一级 MOT 与荧光成像', en: 'Primary cooling, first-stage MOT and fluorescence imaging' },
    mechanism: {
      zh: '宽线宽允许较大的散射力和捕获速度；代价是 Doppler 极限较高，通常需再切换到 556 nm 窄线冷却。',
      en: 'Its broad linewidth provides high scattering force and capture velocity; the higher Doppler limit motivates a later switch to 556 nm narrow-line cooling.',
    },
    x: 16,
    y: 40.5,
    rx: 3,
    ry: 15,
    labelX: 8,
    labelY: 34,
    color: '#176f8f',
  },
  {
    id: '556',
    wavelength: '556 nm',
    label: { zh: '556 nm 窄线跃迁', en: '556 nm narrow transition' },
    name: { zh: '窄线跃迁', en: 'Narrow transition' },
    role: { zh: '窄线 MOT、亚多普勒冷却与低损伤成像', en: 'Narrow-line MOT, sub-Doppler cooling and low-loss imaging' },
    mechanism: {
      zh: '较窄的天然线宽降低平衡温度并提升频率选择性，是从热原子源进入可装载光镊温区的关键接口。',
      en: 'The narrower natural linewidth lowers the equilibrium temperature and improves spectral selectivity, bridging the thermal source to tweezer loading.',
    },
    x: 24.9,
    y: 44.6,
    rx: 3,
    ry: 11,
    labelX: 17,
    labelY: 52,
    color: '#33865b',
  },
  {
    id: '578',
    wavelength: '578 nm',
    label: { zh: '578 nm 钟跃迁', en: '578 nm clock transition' },
    name: { zh: '钟跃迁', en: 'Clock transition' },
    role: { zh: '核自旋计算基、钟态映射与相干控制', en: 'Nuclear-spin qubits, clock-state mapping and coherent control' },
    mechanism: {
      zh: '超窄钟跃迁把长寿命亚稳态接入计算空间；磁场、光移和激光相位噪声必须在同一误差预算中处理。',
      en: 'The ultranarrow clock transition connects a long-lived metastable state to the computational manifold; magnetic, light-shift and laser phase noise share one error budget.',
    },
    x: 26.9,
    y: 48.6,
    rx: 3,
    ry: 7,
    labelX: 35,
    labelY: 50,
    color: '#8a4d82',
  },
  {
    id: '302',
    wavelength: '≈302 nm',
    label: { zh: '约 302 nm Rydberg 通道', en: 'Approx. 302 nm Rydberg channel' },
    name: { zh: 'Rydberg 通道', en: 'Rydberg channel' },
    role: { zh: '亚稳态到 Rydberg 流形的相互作用门接口', en: 'Interaction-gate interface from the metastable state to the Rydberg manifold' },
    mechanism: {
      zh: '紫外耦合把单原子控制转化为强偶极相互作用；门保真度由阻塞强度、散射、Doppler 相位和脉冲整形共同决定。',
      en: 'UV coupling converts single-atom control into strong dipolar interactions; blockade, scattering, Doppler phase and pulse shaping jointly set gate fidelity.',
    },
    x: 53.8,
    y: 29.1,
    rx: 3.5,
    ry: 13,
    labelX: 69,
    labelY: 47,
    color: '#7354a2',
  },
  {
    id: '369',
    wavelength: '369.5 nm',
    label: { zh: '369.5 nm 自电离读出', en: '369.5 nm autoionization readout' },
    name: { zh: '自电离读出', en: 'Autoionization readout' },
    role: { zh: '自电离读出与擦除标签', en: 'Autoionization readout and erasure tagging' },
    mechanism: {
      zh: '先将目标内态选择性映射到可电离通道，再用离子或原子损失信号读取；它可把部分未知错误转化为已知位置的擦除。',
      en: 'A target internal state is selectively mapped to an ionizable channel and read through ion or atom-loss signals, converting some unknown errors into located erasures.',
    },
    x: 53.1,
    y: 11.5,
    rx: 4,
    ry: 6,
    labelX: 69,
    labelY: 24,
    color: '#b9503c',
  },
]

export default function AtomicMap({ language }: { language: Language }) {
  const [fullMapOpen, setFullMapOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('578')
  const selected = hotspots.find((hotspot) => hotspot.id === selectedId) ?? hotspots[2]
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
            ? '先使用上方交互教学图理解通道，再在此核对完整关系。选择右侧波长，图中圈选和箭头会定位到对应物理区域。'
            : 'Use the interactive tutor above to understand each channel, then cross-check the complete map here. Select a wavelength to locate its physical region with a ring and arrow.'}
        </p>
      </header>

      <div className="atomic-reference__body">
        <figure>
          <div className="atomic-reference__image-stage">
            <img src={energyDiagram} alt={imageAlt} loading="lazy" />
            <div
              className="reference-hotspot-overlay"
              data-testid="reference-hotspot-overlay"
              data-coordinate-system="normalized-percent"
              style={{ color: selected.color }}
            >
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <marker id="reference-arrowhead" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5 Z" fill="currentColor" />
                  </marker>
                </defs>
                <line
                  className="reference-hotspot-arrow"
                  x1={selected.labelX}
                  y1={selected.labelY}
                  x2={selected.x}
                  y2={selected.y}
                  markerEnd="url(#reference-arrowhead)"
                  vectorEffect="non-scaling-stroke"
                />
                <ellipse
                  className="reference-hotspot-ring"
                  data-testid="reference-hotspot-ring"
                  data-hotspot={selected.id}
                  cx={selected.x}
                  cy={selected.y}
                  rx={selected.rx}
                  ry={selected.ry}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {hotspots.map((hotspot) => (
                <button
                  type="button"
                  key={hotspot.id}
                  className="reference-hotspot-target"
                  aria-label={`${language === 'zh' ? '图中选择' : 'Select on figure'} ${hotspot.label[language]}`}
                  aria-pressed={selected.id === hotspot.id}
                  onClick={() => setSelectedId(hotspot.id)}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                />
              ))}
              <div
                className="reference-hotspot-callout"
                style={{
                  '--hotspot-label-x': `${selected.labelX}%`,
                  top: `${selected.labelY}%`,
             } as CSSProperties & Record<'--hotspot-label-x', string>}
                aria-hidden="true"
              >
                <b>{selected.wavelength}</b>
                <span>{selected.label[language]}</span>
              </div>
            </div>
          </div>
          <figcaption>
            {language === 'zh'
              ? '热点坐标按原图归一化标定；图片等比缩放时，圈选区域和箭头保持与物理对象对齐。'
              : 'Hotspots are calibrated in normalized source-image coordinates, keeping rings and arrows aligned under proportional scaling.'}
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

        <aside aria-label={language === 'zh' ? '参考图阅读顺序' : 'Reference-map reading order'}>
          <h3>{language === 'zh' ? '选择通道并定位' : 'Select and locate a channel'}</h3>
          <ol>
            {hotspots.map((hotspot) => (
              <li key={hotspot.id}>
                <button
                  type="button"
                  className="atomic-reference__channel"
                  aria-label={`${language === 'zh' ? '定位' : 'Locate'} ${hotspot.label[language]}`}
                  aria-pressed={selected.id === hotspot.id}
                  onClick={() => setSelectedId(hotspot.id)}
                >
                  <b>{hotspot.wavelength}</b>
                  <span>{hotspot.name[language]}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="atomic-reference__detail" aria-live="polite">
            <small>{language === 'zh' ? '实验职责' : 'Experimental role'}</small>
            <strong>{selected.role[language]}</strong>
            <p>{selected.mechanism[language]}</p>
          </div>
        </aside>
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
