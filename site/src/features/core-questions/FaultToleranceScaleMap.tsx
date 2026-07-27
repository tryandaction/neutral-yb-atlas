import type { Language } from '../../types/content'
import WikiText from '../wiki/WikiText'
import CoreQuestionFrame from './CoreQuestionFrame'
import MapEquation from './MapEquation'
import { faultChainNodes, faultConditions, resourceChainNodes } from './coreQuestionData'

const physicalFaults = {
  zh: ['码内 Pauli / 相干偏差', '泄漏', '原子损失 / 占据失败', '时空相关故障'],
  en: ['In-code Pauli / coherent bias', 'Leakage', 'Atom loss / occupancy failure', 'Spatiotemporal correlations'],
} as const

export default function FaultToleranceScaleMap({ language }: { language: Language }) {
  return (
    <CoreQuestionFrame
      id="core-fault-scale-map"
      eyebrow={{ zh: '物理通道 · 解码 · 逻辑预算 · 成本', en: 'PHYSICAL CHANNEL · DECODING · LOGICAL BUDGET · COST' }}
      title={{ zh: '通用容错怎样转化为规模与成本', en: 'How universal fault tolerance becomes scale and cost' }}
      thesis={{
        zh: '容错不是把物理错误率换成一个更小数字，而是把物理故障、可见记录、译码恢复和残余逻辑通道连接成可重复的缩放关系。',
        en: 'Fault tolerance does not merely replace a physical error rate with a smaller number; it connects physical faults, visible records, decoder recovery and the residual logical channel into a repeatable scaling relation.',
      }}
      conclusion={{
        zh: '阈下运行且增加码距能持续压低逻辑错误，才构成容错；任务逻辑预算进一步决定码距、原子数、运行时间与每个可信结果的成本。',
        en: 'Fault tolerance requires below-threshold operation and sustained logical suppression with increasing distance. The task-level logical budget then fixes code distance, atom count, runtime and cost per trustworthy result.',
      }}
      language={language}
    >
      <div className="fault-channel-funnel" aria-label={language === 'zh' ? '从物理故障到逻辑预算的容错结构图' : 'Fault-tolerance map from physical faults to a logical budget'}>
        <div className="fault-sources">
          <header><span>01</span><h3>{language === 'zh' ? '故障进入电路的位置' : 'Where faults enter the circuit'}</h3></header>
          <ul>{physicalFaults[language].map((fault) => <li key={fault}>{fault}</li>)}</ul>
        </div>

        <i className="fault-funnel__merge" aria-hidden="true" />

        <ol className="fault-funnel__channel">
          {faultChainNodes.map((node, index) => (
            <li key={node.id}>
              <span>{String(index + 2).padStart(2, '0')}</span>
              <h3><WikiText text={node.title[language]} language={language} /></h3>
              {node.formula ? <MapEquation source={node.formula} /> : null}
              <p>{node.detail[language]}</p>
            </li>
          ))}
        </ol>

        <div className="fault-conditions" aria-label={language === 'zh' ? '容错必要关系' : 'Necessary fault-tolerance relations'}>
          {faultConditions.map((condition, index) => (
            <div key={condition}><span>{String(index + 1).padStart(2, '0')}</span><MapEquation source={condition} /></div>
          ))}
        </div>

        <div className="fault-budget-example">
          <span>{language === 'zh' ? '条件示例' : 'Conditional example'}</span>
          <MapEquation source={String.raw`G_L=10^8,\quad \varepsilon_{\mathrm{task}}=10^{-2}\quad\Longrightarrow\quad p_L\leq10^{-10}`} />
          <p>{language === 'zh'
            ? '这只是任务预算换算，不是平台实测值。物理错误率 p=10⁻³ 只有在具体码与噪声模型满足 pₜₕ=10⁻² 时才属于阈下运行；所需码距必须由该模型或实测缩放曲线确定。'
            : 'This converts a task budget; it is not a measured platform result. A physical rate p=10⁻³ is below threshold only for a specified code and noise model with pₜₕ=10⁻²; the required distance must come from that model or a measured scaling curve.'}</p>
        </div>

        <section className="resource-cost-flow">
          <header><span>{language === 'zh' ? '由任务预算反推资源' : 'Resource back-propagation from the task budget'}</span></header>
          <ol>
            {resourceChainNodes.map((node) => (
              <li key={node.id}><h3>{node.title[language]}</h3>{node.formula ? <MapEquation source={node.formula} /> : null}<p>{node.detail[language]}</p></li>
            ))}
          </ol>
          <div className="resource-cost-flow__result">
            <MapEquation source={String.raw`C_{\mathrm{result}}=\frac{C_{\mathrm{amortized}}+C_{\mathrm{opex}}T_{\mathrm{wall}}}{P_{\mathrm{success}}}`} />
            <p>{language === 'zh' ? '成本只按满足同一正确性与精度标准的成功结果归一化。' : 'Cost is normalized only by successful results meeting the same correctness and accuracy criterion.'}</p>
          </div>
        </section>
      </div>
    </CoreQuestionFrame>
  )
}
