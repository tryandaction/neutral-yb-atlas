import type { Language } from '../../types/content'
import './comparison.css'

interface SpeciesComparisonProps { language: Language }

const rows = [
  { label: { zh: '价电子结构', en: 'Valence structure' }, Rb: 'alkali / 1e⁻', Cs: 'alkali / 1e⁻', Sr: 'alkaline-earth / 2e⁻', Yb: 'alkaline-earth-like / 2e⁻' },
  { label: { zh: '典型量子比特', en: 'Typical qubit' }, Rb: 'hyperfine', Cs: 'hyperfine', Sr: 'nuclear / clock', Yb: 'nuclear / clock' },
  { label: { zh: '窄线冷却', en: 'Narrow-line cooling' }, Rb: 'indirect', Cs: 'indirect', Sr: '689 nm', Yb: '556 nm' },
  { label: { zh: 'Rydberg 接口', en: 'Rydberg interface' }, Rb: '2-photon common', Cs: '2-photon common', Sr: 'clock → UV', Yb: '³P₀ → 302 nm' },
  { label: { zh: '错误可检测性', en: 'Error detectability' }, Rb: 'loss / leakage', Cs: 'loss / leakage', Sr: 'multi-manifold', Yb: 'erasure conversion' },
  { label: { zh: '主要工程代价', en: 'Primary engineering cost' }, Rb: 'microwave + lasers', Cs: 'wavelength stack', Sr: 'clock-laser stack', Yb: 'UV + multilevel control' },
]

export default function SpeciesComparison({ language }: SpeciesComparisonProps) {
  return (
    <section className="species-comparison">
      <header><h2>{language === 'zh' ? '物种选择是一组权衡，不是排行榜' : 'Species selection is a trade space, not a ranking'}</h2><p>{language === 'zh' ? '同一维度比较量子比特、冷却、Rydberg 接口、错误结构和工程成本。论文保真度只有在指标约定归一化后才可进入比较。' : 'Compare qubits, cooling, Rydberg interfaces, error structure and engineering cost on common dimensions. Reported fidelities enter only after metric normalization.'}</p></header>
      <div className="species-table" role="table" aria-label={language === 'zh' ? '原子物种比较' : 'Atomic species comparison'}>
        <div className="species-table__head" role="row"><span role="columnheader" /><b role="columnheader">Rb</b><b role="columnheader">Cs</b><b role="columnheader">Sr</b><b className="is-yb" role="columnheader">Yb</b></div>
        {rows.map((row) => <div className="species-table__row" role="row" key={row.label.en}><strong role="rowheader">{row.label[language]}</strong><span role="cell">{row.Rb}</span><span role="cell">{row.Cs}</span><span role="cell">{row.Sr}</span><span className="is-yb" role="cell">{row.Yb}</span></div>)}
      </div>
    </section>
  )
}
