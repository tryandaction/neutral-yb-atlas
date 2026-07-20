import type { Language } from '../../types/content'
import './comparison.css'

interface SpeciesComparisonProps { language: Language }

const rows = [
  { label: { zh: '存储编码', en: 'Storage encoding' }, Rb: 'ground hyperfine', Cs: 'ground hyperfine', Sr: 'nuclear / clock', Yb: 'nuclear / clock' },
  { label: { zh: '冷却与装载', en: 'Cooling and loading' }, Rb: 'broad-line stack', Cs: 'broad-line stack', Sr: 'broad + narrow line', Yb: '399 + 556 nm' },
  { label: { zh: '单比特控制', en: 'One-qubit control' }, Rb: 'microwave / Raman', Cs: 'microwave / Raman', Sr: 'clock / nuclear', Yb: 'clock / nuclear' },
  { label: { zh: '纠缠接口', en: 'Entangling interface' }, Rb: 'two-photon Rydberg', Cs: 'two-photon Rydberg', Sr: 'metastable → Rydberg', Yb: '³P₀ → Rydberg UV' },
  { label: { zh: '读出与复位', en: 'Readout and reset' }, Rb: 'cycling / pushout', Cs: 'cycling / pushout', Sr: 'manifold selective', Yb: 'manifold selective' },
  { label: { zh: '故障信息', en: 'Fault information' }, Rb: 'loss / leakage record', Cs: 'loss / leakage record', Sr: 'encoding dependent', Yb: 'measured erasure flag' },
  { label: { zh: '附加系统负担', en: 'Added system burden' }, Rb: 'microwave + Raman', Cs: 'microwave + Raman', Sr: 'clock + UV control', Yb: 'clock + UV + manifold calibration' },
]

const logic = [
  { zh: '先固定任务：比较的是重复纠错周期，而非一条最好看的单次保真度。', en: 'Fix the task first: compare a repeated correction cycle, not a best single-shot fidelity.' },
  { zh: '再比较路径：制备、纠缠、读出/复位、可重排连接、相关噪声与维护同时进入同一周期。', en: 'Then compare paths: preparation, entanglement, readout/reset, reconfigurable connectivity, correlated noise and maintenance share one cycle.' },
  { zh: '最后选择物种：171Yb 的优势是接口可分工；错误标记只有在召回率、误报、残余 Pauli 与周期延迟共同合格时才成为容错优势。', en: 'Then select a species: 171Yb separates interfaces by role; a fault flag becomes a fault-tolerance advantage only with adequate recall, false-positive rate, residual Pauli error and cycle latency.' },
]

const platformRoutes = [
  { name: { zh: '超导电路', en: 'Superconducting circuits' }, trait: { zh: '微纳制造的固定电路；关键检验是布线、读出与低温控制如何支撑完整周期。', en: 'Lithographic fixed circuits; assess how wiring, readout and cryogenic control sustain the complete cycle.' } },
  { name: { zh: '离子阱', en: 'Trapped ions' }, trait: { zh: '库仑耦合与高质量测量；关键检验是串行度、光学接口与循环速度。', en: 'Coulomb-mediated coupling and high-quality measurement; assess seriality, optical interfaces and cycle rate.' } },
  { name: { zh: '光子', en: 'Photonic processors' }, trait: { zh: '飞行量子信息与网络接口；关键检验是源、损耗、探测与资源态开销。', en: 'Flying information and network interfaces; assess sources, loss, detection and resource-state overhead.' } },
  { name: { zh: '中性原子阵列', en: 'Neutral-atom arrays' }, trait: { zh: '相同原子与可重排几何；关键检验是装载、运动、并行门和补原子能否维持周期。', en: 'Identical atoms and reconfigurable geometry; assess whether loading, motion, parallel gates and replacement sustain the cycle.' } },
]

export default function SpeciesComparison({ language }: SpeciesComparisonProps) {
  return (
    <section className="species-comparison">
      <header><h2>{language === 'zh' ? '物种选择是一组受任务约束的权衡' : 'Species choice is a task-constrained trade space'}</h2><p>{language === 'zh' ? '这不是普适平台排名。先固定逻辑任务、编码、并行度与损失口径，再比较不同物种完成同一功能链所需的接口和附加负担。' : 'This is not a universal platform ranking. Fix the logical task, encoding, parallelism and loss convention before comparing the interfaces and added burden required to complete the same functional chain.'}</p></header>
      <section className="platform-routes" aria-labelledby="platform-routes-title">
        <h3 id="platform-routes-title">{language === 'zh' ? '平台选择从重复纠错周期开始' : 'Platform choice begins with the correction cycle'}</h3>
        <div>{platformRoutes.map((route) => <article key={route.name.en}><strong>{route.name[language]}</strong><p>{route.trait[language]}</p></article>)}</div>
      </section>
      <ol className="species-logic" aria-label={language === 'zh' ? '平台选择逻辑' : 'Platform-selection logic'}>
        {logic.map((item, index) => <li key={item.en}><span>{String(index + 1).padStart(2, '0')}</span><p>{item[language]}</p></li>)}
      </ol>
      <div className="species-table" role="table" aria-label={language === 'zh' ? '固定任务原子物种比较' : 'Fixed-task atomic species comparison'}>
        <div className="species-table__head" role="row"><span role="columnheader" /><b role="columnheader">Rb</b><b role="columnheader">Cs</b><b role="columnheader">Sr</b><b className="is-yb" role="columnheader">Yb</b></div>
        {rows.map((row) => <div className="species-table__row" role="row" key={row.label.en}><strong role="rowheader">{row.label[language]}</strong><span role="cell">{row.Rb}</span><span role="cell">{row.Cs}</span><span role="cell">{row.Sr}</span><span className="is-yb" role="cell">{row.Yb}</span></div>)}
      </div>
    </section>
  )
}
