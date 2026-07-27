import type { Language } from '../../types/content'
import WikiText from '../wiki/WikiText'
import CoreQuestionFrame from './CoreQuestionFrame'
import { ybRoles } from './coreQuestionData'

const platformAlternatives = {
  zh: [
    ['超导', '门快，但低温互连与布线随规模增长'],
    ['离子阱', '门与测量精确，但门速率和大规模重排受限'],
    ['光子', '传输自然，但确定性相互作用与资源开销困难'],
  ],
  en: [
    ['Superconducting', 'Fast gates; cryogenic wiring and interconnect scale with system size'],
    ['Trapped ions', 'Precise gates and readout; slower gates and large-scale shuttling constrain throughput'],
    ['Photonic', 'Natural transport; deterministic interaction and resource overhead remain difficult'],
  ],
} as const

const speciesAlternatives = {
  zh: [
    ['碱金属', '成熟的基态超精细控制，电子结构较简单'],
    ['Sr', '光钟与亚稳态工具成熟；费米同位素核自旋更大'],
    ['¹⁷¹Yb', 'I=1/2 核自旋、长寿命 ³P₀、多流形选择读出'],
  ],
  en: [
    ['Alkali atoms', 'Mature ground-hyperfine control with simpler electronic structure'],
    ['Sr', 'Mature clock and metastable tools; fermionic isotopes have larger nuclear spin'],
    ['¹⁷¹Yb', 'I=1/2 nuclear spin, long-lived ³P₀ and manifold-selective readout'],
  ],
} as const

export default function YbDecisionMap({ language }: { language: Language }) {
  return (
    <CoreQuestionFrame
      id="core-yb-decision-map"
      eyebrow={{ zh: '任务约束 · 平台选择 · 物种选择', en: 'TASK · PLATFORM · SPECIES' }}
      title={{ zh: '为什么选择中性原子中的 ¹⁷¹Yb', en: 'Why choose ¹⁷¹Yb among neutral atoms' }}
      thesis={{
        zh: '平台选择先比较可扩展连接、并行控制和故障可见性；物种选择再比较能级结构能否把存储、纠缠、冷却和读出分工。',
        en: 'Platform choice first compares scalable connectivity, parallel control and fault visibility; species choice then asks whether the level structure can separate storage, entanglement, cooling and readout.',
      }}
      conclusion={{
        zh: '中性原子提供可重排阵列和 Rydberg 连接；¹⁷¹Yb 的核自旋与多电子流形进一步把计算职责分离，并为泄漏与损失提供可见记录。优势必须以完整纠错周期的净逻辑收益验收。',
        en: 'Neutral atoms provide rearrangeable arrays and Rydberg connectivity. The nuclear spin and multiple electronic manifolds of ¹⁷¹Yb further separate computational duties and expose leakage or loss records; the advantage must be tested by net logical gain over a full correction cycle.',
      }}
      language={language}
    >
      <div className="yb-selection-tree" aria-label={language === 'zh' ? '从计算要求到 171Yb 的选择树' : 'Decision tree from computational requirements to 171Yb'}>
        <div className="yb-selection-tree__root map-node">
          <span>01</span>
          <h3>{language === 'zh' ? '通用容错任务' : 'Universal fault-tolerant task'}</h3>
          <p>{language === 'zh' ? '可编程连接 · 并行门 · 可测量故障 · 可补充阵列' : 'Programmable links · parallel gates · visible faults · replenishable arrays'}</p>
        </div>

        <div className="yb-selection-tree__junction" aria-hidden="true"><i /></div>

        <section className="yb-selection-stage yb-selection-stage--platform">
          <header><span>02</span><h3>{language === 'zh' ? '为什么是中性原子' : 'Why neutral atoms'}</h3></header>
          <div className="yb-selection-stage__alternatives">
            {platformAlternatives[language].map(([name, note]) => <article key={name}><strong>{name}</strong><p>{note}</p></article>)}
          </div>
          <div className="yb-selection-stage__choice">
            <strong>{language === 'zh' ? '保留：中性原子' : 'Retain: neutral atoms'}</strong>
            <p>{language === 'zh' ? '光镊阵列可重排；Rydberg 阻塞把几何邻接变为可编程相互作用；占据和损失可直接成像。' : 'Tweezer arrays are rearrangeable; Rydberg blockade converts geometry into programmable interaction; occupancy and loss are directly imageable.'}</p>
          </div>
        </section>

        <div className="yb-selection-tree__junction" aria-hidden="true"><i /></div>

        <section className="yb-selection-stage yb-selection-stage--species">
          <header><span>03</span><h3>{language === 'zh' ? '为什么是 ¹⁷¹Yb' : 'Why ¹⁷¹Yb'}</h3></header>
          <div className="yb-selection-stage__alternatives">
            {speciesAlternatives[language].map(([name, note], index) => (
              <article className={index === 2 ? 'is-selected' : ''} key={name}><strong>{name}</strong><p>{note}</p></article>
            ))}
          </div>
        </section>

        <div className="yb-function-split">
          <header><span>04</span><h3>{language === 'zh' ? '同一原子的功能分工' : 'Functional separation within one atom'}</h3></header>
          <div>
            {ybRoles.map((item) => (
              <article key={item.id}>
                <span>{item.manifold}</span>
                <h3>{item.role[language]}</h3>
                <p><WikiText text={item.logicalValue[language]} language={language} /></p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </CoreQuestionFrame>
  )
}
