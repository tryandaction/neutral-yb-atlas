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
    title: { zh: '物理状态如何成为可验证的计算', en: 'How physical states become verifiable computation' },
    claim: { zh: '从初始化、可区分状态和读出开始，再到可组合演化、纠缠门与重复纠错周期；每一步都要留下可检验记录。', en: 'Initialization, distinguishable states and readout come first; composable evolution, entangling gates and repeated correction cycles make the computation testable.' },
    question: { zh: '哪些物理条件把“能级”变成可扩展计算的量子比特？', en: 'Which physical conditions turn energy levels into scalable computational qubits?' },
  },
  {
    route: 'yb-platform',
    number: '02',
    title: { zh: '为什么用中性原子，再为什么是 171Yb', en: 'Why neutral atoms, then why 171Yb' },
    claim: { zh: '先以重复纠错周期比较硬件路径，再以存储、门、读出与错误标记的接口组合比较原子物种。', en: 'Compare hardware paths against a repeated correction cycle first, then compare atomic species by their storage, gate, readout and fault-flag interfaces.' },
    question: { zh: 'Yb 的职责分离何时会变成逻辑层优势，又在哪些工程代价下失效？', en: 'When does Yb role separation become a logical advantage, and when do its engineering costs erase it?' },
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
    title: { zh: '怎样判断通用容错、规模与成本真正成立', en: 'When universal fault tolerance, scale and cost are real' },
    claim: { zh: '规模由可执行逻辑时空体积定义，成本按一次可信结果归一化。', en: 'Scale is executable logical spacetime volume; cost is normalized per trustworthy result.' },
    question: { zh: '增加原子后，逻辑错误、吞吐和单位结果成本是否同时改善？', en: 'Do logical error, throughput and cost per result improve together as atoms are added?' },
  },
]

export default function OverviewPage({ language }: OverviewPageProps) {
  return (
    <div className="overview-page">
      <AtomicRearrangementHero language={language} />

      <CausalAtlas language={language} />

      <section className="overview-domains" aria-label={language === 'zh' ? '五个研究域' : 'Five research domains'}>
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
                {language === 'zh' ? '进入研究域' : 'Open research domain'}
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
