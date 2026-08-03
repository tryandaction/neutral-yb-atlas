import type { Language } from '../../types/content'
import WikiText from '../wiki/WikiText'
import CoreQuestionFrame from './CoreQuestionFrame'
import { ybRoles } from './coreQuestionData'

const platformAlternatives = {
  zh: [
    ['超导', '门很快；低温布线、封装与互连随系统规模共同增长。'],
    ['囚禁离子', '门与测量精确；门速率和大规模搬运限制吞吐。'],
    ['光子', '传输自然；确定性相互作用和资源开销仍是核心约束。'],
  ],
  en: [
    ['Superconducting', 'Fast gates; cryogenic wiring, packaging and interconnect grow with system size.'],
    ['Trapped ions', 'Precise gates and readout; gate speed and large-scale transport constrain throughput.'],
    ['Photonic', 'Natural transport; deterministic interaction and resource overhead remain central constraints.'],
  ],
} as const

const ybComparedWithAlkali = {
  zh: [
    ['Rb / Cs：单价电子超精细比特', '成熟的微波、Raman 与 Rydberg 工具链。磁不敏感“钟”比特可以抑制磁噪声；但存储、冷却、读出和门主要共享同一价电子结构。'],
    ['Yb：两个 J = 0 存储流形', '6s² ¹S₀ 与 6s6p ³P₀ 中电子角动量为零；一阶电子 Zeeman 磁矩消失，残余敏感性主要来自核自旋及实际光场、磁场误差。'],
    ['Yb：按需开启相互作用的接口', '399 nm 用于俘获/荧光，556 nm 用于窄线冷却或 Raman 中介，578 nm 连接钟态，约 302 nm 从 ³P₀ 选择性耦合 Rydberg 态。'],
  ],
  en: [
    ['Rb / Cs: single-valence-electron hyperfine qubits', 'Mature microwave, Raman and Rydberg toolchains. Magnetically insensitive clock qubits can suppress field noise, but storage, cooling, readout and gates mostly share one valence-electron structure.'],
    ['Yb: two J = 0 storage manifolds', 'In 6s² ¹S₀ and 6s6p ³P₀ the electronic angular momentum vanishes. The first-order electronic Zeeman moment is absent; residual sensitivity comes from nuclear spin and practical field or light errors.'],
    ['Yb: an on-demand interaction interface', '399 nm supports capture and fluorescence; 556 nm supports narrow-line cooling or a Raman intermediary; 578 nm connects the clock states; about 302 nm selectively couples ³P₀ to a Rydberg state.'],
  ],
} as const

const isotopeAlternatives = {
  zh: [
    ['偶 A 同位素：I = 0', '在 J = 0 流形中只有 mF = 0，不提供核自旋双态。仍可采用电子态编码，但不是最直接的核自旋量子比特。'],
    ['¹⁷³Yb：I = 5/2', '有六个核自旋投影，适合研究 qudit；同时增加光抽运、谱选择和旁观 mF 分支的复杂度。'],
    ['¹⁷¹Yb：I = 1/2', '在 ¹S₀ 或 ³P₀ 的 J = 0 流形中，F = I = 1/2，仅有 mF = ±1/2 两个投影；恰好形成最小核自旋双态。'],
  ],
  en: [
    ['Even-A isotopes: I = 0', 'A J = 0 manifold has only mF = 0 and supplies no nuclear-spin doublet. Electronic encodings remain possible, but not the most direct nuclear-spin qubit.'],
    ['¹⁷³Yb: I = 5/2', 'Six nuclear-spin projections enable qudit research, while adding optical-pumping, spectral-selection and spectator-mF complexity.'],
    ['¹⁷¹Yb: I = 1/2', 'In a J = 0 ¹S₀ or ³P₀ manifold, F = I = 1/2 and only mF = ±1/2 remain: exactly the smallest nuclear-spin doublet.'],
  ],
} as const

export default function YbDecisionMap({ language }: { language: Language }) {
  const zh = language === 'zh'

  return (
    <CoreQuestionFrame
      id="core-yb-decision-map"
      eyebrow={{ zh: '平台选择 · 原子结构 · 同位素选择', en: 'PLATFORM · ATOMIC STRUCTURE · ISOTOPE' }}
      title={{ zh: '为什么选择中性原子中的 ¹⁷¹Yb', en: 'Why choose ¹⁷¹Yb among neutral atoms' }}
      thesis={{
        zh: '选择的关键不是一条跃迁或一次门，而是能否让信息平时存放在安静的流形中、需要纠缠时再映射到强相互作用的辅助态，并把结果可靠地读出。',
        en: 'The question is not one transition or one gate. A useful atom stores information in a quiet manifold, maps it to a strongly interacting auxiliary state only when needed, and returns a reliable record.',
      }}
      conclusion={{
        zh: '¹⁷¹Yb 的根本价值是职责分离：J = 0 流形承载核自旋信息；钟态完成相干映射；Rydberg 态只在门期间提供强两体相互作用；冷却与读出使用另一组可校准接口。',
        en: 'The central value of ¹⁷¹Yb is functional separation: J = 0 manifolds carry nuclear-spin information; the clock state provides coherent mapping; a Rydberg state supplies strong two-body interaction only during a gate; cooling and readout use separately calibrated interfaces.',
      }}
      language={language}
    >
      <div className="yb-selection-tree" aria-label={zh ? '从计算需要到 171Yb 的选择逻辑' : 'Selection logic from computational requirements to 171Yb'}>
        <div className="yb-selection-tree__root map-node">
          <span>01</span>
          <h3>{zh ? '计算需要的原子角色' : 'Atomic roles required by computation'}</h3>
          <p>{zh ? '安静存储 · 可控单比特演化 · 条件两体相位 · 可分辨读出' : 'Quiet storage · controlled one-qubit evolution · conditional two-body phase · distinguishable readout'}</p>
        </div>

        <div className="yb-selection-tree__junction" aria-hidden="true"><i /></div>

        <section className="yb-selection-stage yb-selection-stage--platform">
          <header><span>02</span><h3>{zh ? '为什么选中性原子' : 'Why neutral atoms'}</h3></header>
          <div className="yb-selection-stage__alternatives">
            {platformAlternatives[language].map(([name, note]) => <article key={name}><strong>{name}</strong><p>{note}</p></article>)}
          </div>
          <div className="yb-selection-stage__choice">
            <strong>{zh ? '保留：中性原子阵列' : 'Retain: neutral-atom arrays'}</strong>
            <p>{zh ? '光镊阵列可重排；Rydberg 阻塞把几何邻接转换为可编程相互作用；单原子占据和损失可直接成像。' : 'Tweezer arrays are rearrangeable; Rydberg blockade turns geometric adjacency into programmable interaction; single-atom occupancy and loss can be imaged directly.'}</p>
          </div>
        </section>

        <div className="yb-selection-tree__junction" aria-hidden="true"><i /></div>

        <section className="yb-selection-stage yb-selection-stage--species">
          <header><span>03</span><h3>{zh ? '为什么先选 Yb，再选 ¹⁷¹Yb' : 'Why first Yb, then ¹⁷¹Yb'}</h3></header>
          <div className="yb-selection-stage__alternatives">
            {ybComparedWithAlkali[language].map(([name, note], index) => (
              <article className={index === 1 ? 'is-selected' : ''} key={name}><strong>{name}</strong><p>{note}</p></article>
            ))}
          </div>
          <div className="yb-selection-stage__choice">
            <strong>{zh ? 'Yb 的结论：将存储与门接口分开' : 'Yb conclusion: separate storage from the gate interface'}</strong>
            <p>{zh ? '这不是声称碱金属不能长相干，而是 Yb 可将不同噪声与光学任务分配到不同电子流形，并以额外激光和标定复杂度为代价。' : 'This does not claim that alkalis cannot be coherent. Yb instead assigns different noise and optical tasks to different electronic manifolds, at the cost of additional lasers and calibration.'}</p>
          </div>
          <div className="yb-selection-stage__alternatives yb-selection-stage__alternatives--isotopes">
            {isotopeAlternatives[language].map(([name, note], index) => (
              <article className={index === 2 ? 'is-selected' : ''} key={name}><strong>{name}</strong><p>{note}</p></article>
            ))}
          </div>
          <div className="yb-selection-stage__choice">
            <strong>{zh ? '¹⁷¹Yb 的计算链' : 'The ¹⁷¹Yb computation chain'}</strong>
            <p>{zh ? 'J = 0 核自旋双态存储 → 钟跃迁映射到 ³P₀ → 约 302 nm 选择性驱动 |1⟩↔|r⟩ → B|rr⟩⟨rr| 产生条件相位 → 返回并读出。' : 'J = 0 nuclear-spin doublet stores information → clock transfer reaches ³P₀ → about 302 nm selectively drives |1⟩↔|r⟩ → B|rr⟩⟨rr| generates a conditional phase → return and read out.'}</p>
          </div>
        </section>

        <div className="yb-function-split">
          <header><span>04</span><h3>{zh ? '同一原子的接口分工' : 'Interfaces divided within one atom'}</h3></header>
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
