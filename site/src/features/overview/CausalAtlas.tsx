import type { Language, LocalizedText } from '../../types/content'
import Equation from '../article/Equation'

interface CausalAtlasProps {
  language: Language
}

interface CausalStage {
  id: string
  number: string
  title: LocalizedText
  equation: string
  description: LocalizedText
}

const stages: CausalStage[] = [
  {
    id: 'specification',
    number: '01',
    title: { zh: '先定义要计算什么', en: 'Define the computation' },
    equation: String.raw`(\rho_L,\,U_L,\,\{E_m\})`,
    description: {
      zh: '给出输入态、目标变换和判定结果是否正确的条件。',
      en: 'State the input, target transformation, and condition for a correct result.',
    },
  },
  {
    id: 'atomic-dynamics',
    number: '02',
    title: { zh: '把目标写成原子演化', en: 'Realize it with atomic dynamics' },
    equation: String.raw`i\hbar\,\partial_t|\psi(t)\rangle=H[u(t)]|\psi(t)\rangle`,
    description: {
      zh: '选定原子计算子空间，再用控制场构造 H[u(t)]，使 U(T) 接近目标门。',
      en: 'Choose an atomic subspace, then shape H[u(t)] so that U(T) approaches the target gate.',
    },
  },
  {
    id: 'measurement',
    number: '03',
    title: { zh: '把量子态变成记录', en: 'Turn the state into a record' },
    equation: String.raw`p(m)=\operatorname{Tr}(E_m\rho_T)`,
    description: {
      zh: '测量算符将末态映射为经典结果 m；误判、泄漏和擦除都必须进入记录。',
      en: 'Measurement maps the final state to a classical outcome m; misclassification, leakage, and erasure belong in that record.',
    },
  },
  {
    id: 'logical-result',
    number: '04',
    title: { zh: '用纠错得到可信结果', en: 'Protect the result with correction' },
    equation: String.raw`G_L\,p_L(d)\leq\varepsilon_{\mathrm{task}}`,
    description: {
      zh: '综合征和擦除记录进入译码器；任务规模 G_L 反推所需逻辑错误率 p_L(d)。',
      en: 'Syndrome and erasure records enter a decoder; task size G_L sets the required logical error rate p_L(d).',
    },
  },
]

export default function CausalAtlas({ language }: CausalAtlasProps) {
  return (
    <section id="causal-atlas" className="causal-map" aria-labelledby="causal-map-title">
      <header className="causal-map__intro">
        <span>{language === 'zh' ? '计算如何落到物理上' : 'From computation to physics'}</span>
        <h2 id="causal-map-title">
          {language === 'zh' ? '四步看清可验证的量子计算' : 'Four steps to a verifiable quantum computation'}
        </h2>
        <p>
          {language === 'zh'
            ? '每一步都回答一个不可省略的问题：目标是什么、原子如何实现、结果如何读取、错误如何被压到逻辑层。'
            : 'Each step answers one indispensable question: what is the target, how do atoms realize it, how is it read out, and how are errors suppressed logically?'}
        </p>
      </header>

      <ol className="causal-map__flow" aria-label={language === 'zh' ? '从计算定义到逻辑结果的四步关系' : 'Four steps from a computation to a logical result'}>
        {stages.map((stage) => (
          <li key={stage.id} className={`causal-stage causal-stage--${stage.id}`} data-testid="causal-stage">
            <header>
              <span>{stage.number}</span>
              <h3>{stage.title[language]}</h3>
            </header>
            <Equation source={stage.equation} />
            <p>{stage.description[language]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
