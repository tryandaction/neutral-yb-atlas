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
    title: { zh: '计算为什么必须落在物理状态上', en: 'Why computation must live in physical states' },
    claim: { zh: '计算要求可区分状态、受控变换、条件动力学和可验证读出。', en: 'Computation requires distinguishable states, controlled transformations, conditional dynamics and verifiable readout.' },
    question: { zh: '一个原子具备哪些条件，才不只是存储器？', en: 'What makes an atom more than a memory element?' },
  },
  {
    route: 'yb-platform',
    number: '02',
    title: { zh: '为什么选择中性原子与 171Yb', en: 'Why neutral atoms and 171Yb' },
    claim: { zh: '核自旋承担稳定存储，电子结构提供冷却、控制、读出和 Rydberg 接口。', en: 'Nuclear spin stores information while electronic structure supplies cooling, control, readout and Rydberg interfaces.' },
    question: { zh: '这种职责分离是否抵消了多波长与多能级复杂度？', en: 'Does this separation of roles outweigh multilevel and multiwavelength complexity?' },
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
    title: { zh: '怎样判断容错、规模与成本真正成立', en: 'When fault tolerance, scale and cost are real' },
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
