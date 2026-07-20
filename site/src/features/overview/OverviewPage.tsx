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
    title: { zh: '怎样从能级得到可验收的量子门', en: 'How atomic levels become an accepted quantum gate' },
    claim: { zh: '理论必须把目标幺正映射为可产生的哈密顿量，再把误差项映射为可区分的测量。', en: 'Theory maps a target unitary to a realizable Hamiltonian, then maps error terms to discriminating measurements.' },
    question: { zh: '下一项实验怎样最大程度地区分竞争误差机制？', en: 'Which next measurement best separates competing error mechanisms?' },
  },
  {
    route: 'experiment',
    number: '04',
    title: { zh: '怎样把单次演示变成稳定运行周期', en: 'How a demonstration becomes a stable operating cycle' },
    claim: { zh: '装载、重排、门操作、成像、译码和补原子必须共享时间基准与放行记录。', en: 'Loading, rearrangement, gates, imaging, decoding and replacement must share timing and release records.' },
    question: { zh: '哪个阶段限制当前周期吞吐与可用率？', en: 'Which phase limits present cycle throughput and availability?' },
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
