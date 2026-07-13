import { useState } from 'react'
import type { Language } from '../../types/content'
import './teaching-visuals.css'

const domains = [
  { id: 'atomic-data', lane: 'evidence', title: { zh: '原子数据与基础测量', en: 'Atomic data and foundation measurements' }, short: { zh: '原子数据', en: 'Atomic data' }, input: { zh: '能级、寿命、极化率、分支比、超精细与相互作用张量', en: 'Levels, lifetimes, polarizabilities, branching, hyperfine structure and interaction tensors' }, output: { zh: '带单位、适用态、误差和证据等级的参数注册表', en: 'Parameter registry with units, applicable states, uncertainty and evidence level' }, decision: { zh: '缺失参数是否主导模型不确定度？若是，优先设计测量。', en: 'Does a missing parameter dominate model uncertainty? If yes, design the measurement first.' } },
  { id: 'theory', lane: 'model', title: { zh: '理论与数值建模', en: 'Theory and numerical modeling' }, short: { zh: '理论建模', en: 'Theory' }, input: { zh: '原子参数、实验波形、噪声谱、几何、测量判据和硬件响应', en: 'Atomic parameters, waveforms, noise spectra, geometry, decision rules and hardware response' }, output: { zh: '哈密顿量版本、灵敏度、误差预算、可执行波形文件与下一项区分性测量', en: 'Hamiltonian version, sensitivities, error budget, executable waveform files and the next discriminating measurement' }, decision: { zh: '模型是否能在未参与拟合的数据上预测？不能则回到参数或结构识别。', en: 'Does the model predict held-out data? If not, return to parameter or structure identification.' } },
  { id: 'laser', lane: 'hardware', title: { zh: '激光、光学与真空工程', en: 'Laser, optical and vacuum engineering' }, short: { zh: '物理硬件', en: 'Physical hardware' }, input: { zh: '波长、线宽、功率、相位、NA、压力、热与振动预算', en: 'Wavelength, linewidth, power, phase, NA, pressure, thermal and vibration budgets' }, output: { zh: '稳定光场、原子通量、成像链路、传递函数和维护 SOP', en: 'Stable fields, atomic flux, imaging chain, transfer functions and service SOPs' }, decision: { zh: '性能能否跨天、跨站点和不同并行密度保持？', en: 'Does performance hold across days, sites and parallel density?' } },
  { id: 'control', lane: 'hardware', title: { zh: '控制电子学与实时软件', en: 'Control electronics and real-time software' }, short: { zh: '控制软件', en: 'Control' }, input: { zh: '实验序列、波形、触发、反馈时限、设备状态和安全联锁', en: 'Sequences, waveforms, triggers, feedback deadlines, device state and safety interlocks' }, output: { zh: '统一时钟、可追踪序列、波形哈希、事件日志和反馈动作', en: 'Unified clock, traceable sequence, waveform hashes, event logs and feedback actions' }, decision: { zh: '每次实验结果能否追溯到实际下发波形和设备状态？', en: 'Can every shot be traced to the delivered waveform and device state?' } },
  { id: 'experiment', lane: 'integration', title: { zh: '实验集成与统计验收', en: 'Experimental integration and statistical acceptance' }, short: { zh: '实验验收', en: 'Experiment' }, input: { zh: '子系统能力、校准、漂移记录、模型预测和验收协议', en: 'Subsystem capability, calibration, drift logs, model predictions and acceptance protocol' }, output: { zh: '原始数据、拟合后验、通道表征、失败分类和可复现实验包', en: 'Raw data, fit posterior, channel characterization, failure classes and reproducible experiment package' }, decision: { zh: '改进来自真实物理变化，还是筛选、条件化或 SPAM 变化？', en: 'Does an improvement come from physics, or from selection, conditioning or changed SPAM?' } },
  { id: 'qec', lane: 'system', title: { zh: '架构、调度与量子纠错', en: 'Architecture, scheduling and quantum error correction' }, short: { zh: '逻辑系统', en: 'Logical system' }, input: { zh: '条件门通道、损失/擦除标签、移动时间、串扰和资源冲突', en: 'Conditional gate channels, loss/erasure labels, motion time, crosstalk and resource conflicts' }, output: { zh: '周期通道、解码接口、资源估算、逻辑错误率和扩展瓶颈', en: 'Cycle channels, decoder interface, resource estimate, logical error rate and scaling bottleneck' }, decision: { zh: '组件优势是否在完整周期和解码器中仍然成立？', en: 'Does the component advantage survive the full cycle and decoder?' } },
  { id: 'supply', lane: 'ecosystem', title: { zh: '供应链、制造与科研设施', en: 'Supply chain, manufacturing and research infrastructure' }, short: { zh: '工程生态', en: 'Engineering ecosystem' }, input: { zh: '紫外光源、镀膜、真空加工、高 NA 物镜、电子学、计算与安全规范', en: 'UV sources, coatings, vacuum fabrication, high-NA objectives, electronics, compute and safety standards' }, output: { zh: '交付周期、替代件、可维护性、校准服务、风险清单和人才结构', en: 'Lead times, alternates, maintainability, calibration service, risk register and workforce structure' }, decision: { zh: '关键单点故障是否有备件、替代路线和重新验收计划？', en: 'Do critical single points have spares, alternate routes and re-acceptance plans?' } },
] as const

export default function ResearchEcosystem({ language }: { language: Language }) {
  const [selectedId, setSelectedId] = useState('theory')
  const selected = domains.find((domain) => domain.id === selectedId) ?? domains[0]

  return (
    <section className="teaching-visual research-ecosystem" id="research-ecosystem">
      <header className="teaching-visual__header">
        <div><span>RESEARCH / ENGINEERING ECOSYSTEM</span><h2>{language === 'zh' ? 'Yb 中性原子计算科研生态图' : 'Yb neutral-atom research ecosystem'}</h2></div>
        <p>{language === 'zh' ? '科研链条不是“理论写完交给实验”。它是参数、模型、硬件、数据与架构之间带验收条件的闭环。选择节点查看标准交付物。' : 'The research chain is not “theory finishes and hands off to experiment.” It is an acceptance-driven loop among parameters, models, hardware, data and architecture.'}</p>
      </header>

      <div className="ecosystem-map">
        <svg viewBox="0 0 1000 420" role="img" aria-label={language === 'zh' ? '科研与产业协作关系连线' : 'Research and engineering collaboration links'}>
          <path d="M110 105 C250 105 240 205 380 205 S520 105 650 105 S790 205 900 205" />
          <path d="M110 305 C250 305 240 205 380 205 S520 305 650 305 S790 205 900 205" />
          <path d="M380 205 C380 75 650 75 650 105" />
          <path d="M650 305 C650 390 210 390 110 305" />
        </svg>
        <div className="ecosystem-map__nodes">
          {domains.map((domain) => (
            <button key={domain.id} type="button" data-lane={domain.lane} aria-label={domain.title[language]} aria-pressed={selected.id === domain.id} onClick={() => setSelectedId(domain.id)}>
              <small>{domain.lane.toUpperCase()}</small><strong>{domain.short[language]}</strong>
            </button>
          ))}
        </div>
      </div>

      <article className="teaching-card ecosystem-card" aria-live="polite">
        <div className="teaching-card__title"><span>{selected.lane.toUpperCase()}</span><div><small>{language === 'zh' ? '当前协作节点' : 'Current collaboration node'}</small><h3>{selected.title[language]}</h3></div></div>
        <dl>
          <div><dt>{language === 'zh' ? '必须接收' : 'Required inputs'}</dt><dd>{selected.input[language]}</dd></div>
          <div><dt>{language === 'zh' ? '标准交付物' : 'Standard handoff'}</dt><dd>{selected.output[language]}</dd></div>
          <div><dt>{language === 'zh' ? '放行问题' : 'Release question'}</dt><dd>{selected.decision[language]}</dd></div>
        </dl>
      </article>
    </section>
  )
}
