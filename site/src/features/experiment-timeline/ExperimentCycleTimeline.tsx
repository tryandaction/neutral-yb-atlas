import { useState } from 'react'
import cycleTimelineGraphic from '../../../assets/yb-replacement-cycle-timeline.svg'
import type { Language } from '../../types/content'
import { cycleStages } from './cycleTimelineData'
import './experiment-cycle-timeline.css'

export default function ExperimentCycleTimeline({ language }: { language: Language }) {
  const [selectedId, setSelectedId] = useState('supply')
  const selectedIndex = cycleStages.findIndex((stage) => stage.id === selectedId)
  const selected = cycleStages[selectedIndex] ?? cycleStages[0]

  return (
    <section className="experiment-cycle-timeline" id="experiment-cycle-timeline">
      <header>
        <div><span>CONTROL / TIMING / RECORD</span><h2>{language === 'zh' ? '一次 ¹⁷¹Yb 原子替换与计算周期' : 'One 171Yb replacement and compute cycle'}</h2></div>
        <p>{language === 'zh' ? '按三种时间尺度读图：毫秒级宏观调度、900 ns 关阱微周期，以及独立标定的门操作时间。储备区补原子与静态阵列计算并行运行；图中宽度仅表示先后和并行关系，标注数值才是论文给出的时长。' : 'Read three distinct time scales: the millisecond macrocycle schedule, 900 ns trap-off microcycles, and independently calibrated gate times. Reservoir replenishment and stationary-array computation run in parallel; widths encode order and concurrency, while printed values carry the reported durations.'}</p>
      </header>

      <nav aria-label={language === 'zh' ? '实验周期阶段' : 'Experimental cycle stages'}>
        {cycleStages.map((stage, index) => <button key={stage.id} type="button" aria-label={`${language === 'zh' ? '选择周期阶段：' : 'Select cycle stage: '}${stage.title[language]}`} aria-pressed={stage.id === selected.id} onClick={() => setSelectedId(stage.id)}><span>{String(index + 1).padStart(2, '0')}</span>{stage.short[language]}</button>)}
      </nav>

      <figure>
        <img src={cycleTimelineGraphic} alt={language === 'zh' ? '¹⁷¹Yb 原子替换实验周期的光场时序图：横轴为相对时间，纵轴为各光场和反馈通道。' : 'Optical timing diagram for a 171Yb replacement-aware experimental cycle, with relative time on the horizontal axis and optical or feedback channels on the vertical axis.'} />
        <figcaption>{language === 'zh' ? '上部给出可并行的宏观周期，中下部展开 ³P₀ 制备与自旋分辨读出的关阱微周期。实色条表示光场或控制通道开启，虚线把亮/暗分类结果送入下一轮补原子队列。RF π 脉冲与 302 nm Rydberg π 脉冲仅作为独立标定参照，不属于 Li et al. (2025) 的替换序列。' : 'The upper panel gives the concurrent macrocycle; the lower panels expand the trap-off microcycles for ³P₀ preparation and spin-resolved readout. Solid bars mark enabled fields or controls, and the dashed path sends the bright/dark classification into the next replacement queue. RF and 302 nm Rydberg π pulses are independent calibration references, not steps in the Li et al. (2025) replacement sequence.'}</figcaption>
      </figure>

      <article aria-live="polite">
        <span>{String(selectedIndex + 1).padStart(2, '0')} / 05</span><h3>{selected.title[language]}</h3><p>{selected.generic[language]}</p><div><small>{language === 'zh' ? 'Li et al. (2025) 实现实例' : 'Li et al. (2025) implementation example'}</small><p>{selected.implementation[language]}</p></div>
        <a href="https://arxiv.org/abs/2506.15633" target="_blank" rel="noreferrer">Li et al. (2025), Fast, continuous and coherent atom replacement in a neutral atom qubit array</a>
      </article>
    </section>
  )
}
