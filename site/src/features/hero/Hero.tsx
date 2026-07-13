import { siteCopy } from '../../content/site'
import type { Language, ReadingMode } from '../../types/content'
import SectionRail from '../../components/SectionRail'
import './hero.css'

interface HeroProps {
  language: Language
  mode: ReadingMode
}

export default function Hero({ language, mode }: HeroProps) {
  const layers = [
    { order: '01', title: { zh: '公理层', en: 'Postulates' }, body: { zh: '状态、测量、幺正演化、复合系统', en: 'State, measurement, unitary evolution, composite systems' }, href: '#first-principles-tree' },
    { order: '02', title: { zh: '物理层', en: 'Physics' }, body: { zh: '原子结构、光与物质、开放系统', en: 'Atomic structure, light–matter interaction, open systems' }, href: '#neutral-atoms' },
    { order: '03', title: { zh: '器件层', en: 'Hardware' }, body: { zh: '光镊、Yb 能级、Rydberg 门、读出', en: 'Tweezers, Yb levels, Rydberg gates, readout' }, href: '#yb-energy-tutor' },
    { order: '04', title: { zh: '系统层', en: 'System' }, body: { zh: '实验周期、通道表征、调度与 QEC', en: 'Experiment cycles, channel characterization, scheduling and QEC' }, href: '#experiment-pipeline-tutor' },
  ] as const

  return (
    <section className="hero" id="foundations" data-reading-mode={mode}>
      <SectionRail number={1} label={language === 'zh' ? '从第一性原理到物理量子比特' : 'From first principles to physical qubits'} />
      <div className="hero__stage">
        <div className="hero__copy">
          <h1>{siteCopy.title[language]}</h1>
          <p className="hero__deck">{siteCopy.description[language]}</p>
          <div className="hero__actions">
            <a className="command-link is-primary" href="#first-principles-tree">
              {language === 'zh' ? '从第一性原理开始' : 'Start from first principles'}
              <span aria-hidden="true">↓</span>
            </a>
            <a className="command-link" href="#research-ecosystem">
              {language === 'zh' ? '查看科研全景' : 'View research ecosystem'}
            </a>
          </div>
        </div>

        <nav className="hero-topology" aria-label={language === 'zh' ? '四层知识体系' : 'Four-layer knowledge system'}>
          <header><span>{language === 'zh' ? '知识依赖主轴' : 'Knowledge dependency axis'}</span><strong>{language === 'zh' ? '先建立因果结构，再进入参数与实验细节' : 'Establish causal structure before parameters and apparatus'}</strong></header>
          <div>
            {layers.map((layer) => (
              <a key={layer.order} href={layer.href}>
                <span>{layer.order}</span>
                <strong>{layer.title[language]}</strong>
                <small>{layer.body[language]}</small>
                <i aria-hidden="true">→</i>
              </a>
            ))}
          </div>
        </nav>

        <div className="hero__routes">
          <div><b>G</b><span>{language === 'zh' ? '学习路径：从公理、物理到系统验收' : 'Guided path: postulates, physics and system acceptance'}</span></div>
          <div><b>R</b><span>{language === 'zh' ? '研究索引：直接检索参数、仪器与证据' : 'Research index: query parameters, instruments and evidence'}</span></div>
        </div>
      </div>
    </section>
  )
}
