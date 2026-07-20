import { ArrowRight } from 'lucide-react'
import { routeHref, type RouteId } from '../../navigation/routes'
import type { Language, LocalizedText } from '../../types/content'
import AtomicRearrangementHero from './AtomicRearrangementHero'
import CausalAtlas from './CausalAtlas'
import './overview.css'

interface OverviewPageProps {
  language: Language
}

interface DomainBand {
  route: RouteId
  number: string
  title: LocalizedText
  claim: LocalizedText
  question: LocalizedText
}

const domainBands: DomainBand[] = [
  {
    route: 'foundations',
    number: '01',
    title: { zh: '计算如何落在物理系统中', en: 'How computation is embodied in a physical system' },
    claim: { zh: '计算是可验证的输入—输出状态变换；DiVincenzo 准则把它落实为状态空间、初始化、相干、通用门和测量五类物理接口。', en: 'Computation is a verifiable input-output state transformation; the DiVincenzo criteria realize it through state space, initialization, coherence, universal gates and measurement.' },
    question: { zh: '这些必要接口能否在同一重复纠错周期内同时成立？', en: 'Can these necessary interfaces coexist in one repeated correction cycle?' },
  },
  {
    route: 'yb-platform',
    number: '02',
    title: { zh: '为什么选择中性原子，再为什么在中性原子中选择 171Yb', en: 'Why choose neutral atoms, then 171Yb among them' },
    claim: { zh: '先在相同任务下比较超导、离子阱、光子与中性原子的周期代价，再以 Rb、Cs、Sr 和 171Yb 的存储、门、读出与错误标记接口比较原子物种。', en: 'First compare superconducting, trapped-ion, photonic and neutral-atom cycle costs for the same task; then compare Rb, Cs, Sr and 171Yb through storage, gate, readout and fault-flag interfaces.' },
    question: { zh: '擦除标记在计入误报、漏报、残余 Pauli 错误与检测时延后，是否仍降低逻辑错误？', en: 'Do erasure flags still reduce logical error after false positives, false negatives, residual Pauli faults and detection latency are included?' },
  },
  {
    route: 'gates-theory',
    number: '03',
    title: { zh: '怎样从原子结构得到可验证的纠缠门', en: 'How atomic structure becomes a measurable entangling gate' },
    claim: { zh: '能级与选择定则确定可驱动通道，双原子哈密顿量把 Rydberg 阻塞转成条件相位；布居、相位、泄漏与损失必须分别测量。', en: 'Levels and selection rules determine accessible drives, while a two-atom Hamiltonian turns Rydberg blockade into conditional phase; population, phase, leakage and loss must be measured separately.' },
    question: { zh: '观测到的偏差来自有限阻塞、衰变、Doppler 相移，还是控制失配？', en: 'Does an observed deviation come from finite blockade, decay, Doppler phase or control mismatch?' },
  },
  {
    route: 'experiment',
    number: '04',
    title: { zh: '一个原子阵列怎样完成可重复计算周期', en: 'How an atomic array completes a repeatable computation cycle' },
    claim: { zh: '随机装载先经成像与重排变成目标阵列，再依次完成编码、相干控制、纠缠、测量、解码、复位和补原子；前一阶段的输出就是后一阶段的物理初态。', en: 'Stochastic loading becomes a target array through imaging and rearrangement, followed by encoding, coherent control, entanglement, measurement, decoding, reset and replacement; each stage physically prepares the next.' },
    question: { zh: '每个周期结束后，计算子空间、原子占据和经典错误记录是否都已更新？', en: 'At cycle end, have the computational subspace, atom occupancy and classical fault record all been updated?' },
  },
  {
    route: 'fault-tolerance',
    number: '05',
    title: { zh: '通用容错如何转化为规模与成本', en: 'How universal fault tolerance becomes scale and cost' },
    claim: { zh: '物理故障经电路级通道、解码器和码距缩放形成逻辑错误率；规模由可执行逻辑时空体积定义，成本按一次可信结果归一化。', en: 'Physical faults pass through a circuit-level channel, decoder and code-distance scaling to produce logical error; scale is executable logical spacetime volume and cost is normalized per trustworthy result.' },
    question: { zh: '增加原子后，逻辑错误、吞吐、可用率和单位可信结果成本是否同时改善？', en: 'Do logical error, throughput, availability and cost per trustworthy result improve together as atoms are added?' },
  },
]

export default function OverviewPage({ language }: OverviewPageProps) {
  return (
    <div className="overview-page">
      <AtomicRearrangementHero language={language} />

      <CausalAtlas language={language} />

      <section className="overview-domains" aria-label={language === 'zh' ? '五个学习章节' : 'Five learning chapters'}>
        {domainBands.map((band) => (
          <article className="overview-domain" key={band.route}>
            <span>{band.number}</span>
            <div>
              <h2>{band.title[language]}</h2>
              <p>{band.claim[language]}</p>
            </div>
            <div>
              <strong>{language === 'zh' ? '判定问题' : 'Decision question'}</strong>
              <p>{band.question[language]}</p>
              <a href={routeHref(band.route)}>
                {language === 'zh' ? '进入学习章节' : 'Open learning chapter'}
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
