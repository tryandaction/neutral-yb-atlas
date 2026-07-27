import type { Language } from '../../types/content'
import WikiText from '../wiki/WikiText'
import CoreQuestionFrame from './CoreQuestionFrame'
import MapEquation from './MapEquation'
import { computationRows, divincenzoCriteria } from './coreQuestionData'

const stageCopy: Record<string, Record<Language, readonly [string, string]>> = {
  state: {
    zh: ['选择两个可分辨的原子态承载逻辑 |0〉、|1〉。', '检查制备误差与是否泄漏出计算子空间。'],
    en: ['Choose two distinguishable atomic states to carry logical |0> and |1>.', 'Check preparation error and leakage out of the computational subspace.'],
  },
  gate: {
    zh: ['控制场决定 H[u(t)]；它的时间演化必须给出目标幺正矩阵 U(T)。', '用过程重建和条件相位检验目标门，而不是只看一个脉冲参数。'],
    en: ['Controls set H[u(t)]; its time evolution must produce the target unitary U(T).', 'Use process reconstruction and conditional phase to test the gate, not a pulse setting alone.'],
  },
  measurement: {
    zh: ['测量算符把末态映射为可保存、可判读的经典记录 m。', '校准误判、SPAM 与擦除标记，才知道记录能信到什么程度。'],
    en: ['Measurement operators map the final state to a stored, interpretable record m.', 'Calibrate misclassification, SPAM, and erasure flags before trusting that record.'],
  },
  'qec-cycle': {
    zh: ['综合征与擦除记录给出错误类别；译码器据此选择恢复操作。', '最终指标是逻辑错误率 p_L(d)，而不是单个物理门的保真度。'],
    en: ['Syndrome and erasure records identify an error class; a decoder then chooses recovery.', 'The final metric is logical error p_L(d), not the fidelity of one physical gate.'],
  },
} as const

export default function ComputationPhysicalMap({ language }: { language: Language }) {
  return (
    <CoreQuestionFrame
      id="core-computation-map"
      eyebrow={{ zh: '定义、演化与读出', en: 'Definition, evolution, and readout' }}
      title={{ zh: '计算怎样成为物理过程', en: 'How computation becomes a physical process' }}
      thesis={{
        zh: '用原子态表示信息，用可控哈密顿量实现变换，用测量记录判断结果；容错则把这些物理步骤组织成可扩展的逻辑计算。',
        en: 'Atomic states carry information, controlled Hamiltonians implement transformations, and measurement records decide outcomes; fault tolerance organizes these physical steps into scalable logical computation.',
      }}
      conclusion={{
        zh: '关键不是设备清单，而是这条链能否从目标态一直闭合到可量化的逻辑错误率。',
        en: 'The point is not a device list: the chain must close from a target state to a measurable logical error rate.',
      }}
      language={language}
    >
      <div className="computation-physics-map" aria-label={language === 'zh' ? '计算定义到物理实现的映射图' : 'Map from computational definitions to physical realizations'}>
        <ol className="computation-rail">
          {computationRows.map((row, index) => (
            <li className={`computation-rail__stage computation-rail__stage--${row.id}`} key={row.id}>
              <header>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{row.object[language]}</h3>
              </header>
              <div className="computation-rail__formula">
                <MapEquation source={row.definition} label={`${row.object[language]} formula`} />
              </div>
              <div className="computation-rail__copy">
                <p>{stageCopy[row.id][language][0]}</p>
                <p><WikiText text={stageCopy[row.id][language][1]} language={language} /></p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="divincenzo-boundary" aria-label={language === 'zh' ? 'DiVincenzo 处理器必要条件' : 'DiVincenzo processor requirements'}>
          <div><strong>DiVincenzo</strong><span>{language === 'zh' ? '处理器必要条件' : 'processor requirements'}</span></div>
          <ol>
            {divincenzoCriteria.map((criterion, index) => (
              <li key={criterion.en}><span>{String(index + 1).padStart(2, '0')}</span>{criterion[language]}</li>
            ))}
          </ol>
        </aside>
      </div>
    </CoreQuestionFrame>
  )
}
