import type { Language } from '../../types/content'
import WikiText from '../wiki/WikiText'
import CoreQuestionFrame from './CoreQuestionFrame'
import MapEquation from './MapEquation'
import { computationRows, divincenzoCriteria } from './coreQuestionData'

const cardLabels = {
  zh: { physical: '原子中的对应对象', acceptance: '如何验收' },
  en: { physical: 'Atomic realization', acceptance: 'Acceptance quantity' },
} as const

export default function ComputationPhysicalMap({ language }: { language: Language }) {
  return (
    <CoreQuestionFrame
      id="core-computation-map"
      eyebrow={{ zh: '定义 · 动力学 · 测量', en: 'DEFINITION · DYNAMICS · MEASUREMENT' }}
      title={{ zh: '计算怎样成为物理过程', en: 'How computation becomes a physical process' }}
      thesis={{
        zh: '计算对象只有在数学定义、物理载体和检验记录逐项对应时，才成为可验证的物理过程。',
        en: 'A computational object becomes a verifiable physical process only when its mathematical definition, carrier and test record correspond term by term.',
      }}
      conclusion={{
        zh: '编码规定状态在哪里，哈密顿量规定状态怎样演化，POVM 规定怎样读出；纠错把这一物理通道压缩为可比较的逻辑错误率。',
        en: 'Encoding locates the state, the Hamiltonian generates its evolution, the POVM defines readout, and error correction compresses the physical channel into a comparable logical error rate.',
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
              <dl>
                <div><dt>{cardLabels[language].physical}</dt><dd>{row.physical[language]}</dd></div>
                <div><dt>{cardLabels[language].acceptance}</dt><dd><WikiText text={row.acceptance[language]} language={language} /></dd></div>
              </dl>
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
