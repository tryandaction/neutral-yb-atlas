import { useState } from 'react'
import type { Language } from '../../types/content'
import Equation from '../article/Equation'
import './teaching-visuals.css'

interface PrincipleNode {
  id: string
  branch: 'axiom' | 'information' | 'physics' | 'hardware' | 'system'
  order: string
  title: Record<Language, string>
  short: Record<Language, string>
  question: Record<Language, string>
  relation: string
  meaning: Record<Language, string>
  observable: Record<Language, string>
}

const nodes: PrincipleNode[] = [
  {
    id: 'postulates', branch: 'axiom', order: 'P0',
    title: { zh: '状态、演化与测量公理', en: 'State, evolution and measurement postulates' },
    short: { zh: '量子公理', en: 'Postulates' },
    question: { zh: '系统允许哪些状态、如何演化、如何产生经典记录？', en: 'Which states are allowed, how do they evolve, and how are classical records produced?' },
    relation: String.raw`\rho\succeq0,\quad \mathrm{Tr}\rho=1,\quad p(m)=\mathrm{Tr}(M_m\rho M_m^\dagger)`,
    meaning: { zh: '量子计算的底层不是“同时尝试答案”，而是通过复振幅、幺正干涉和受控测量重塑结果分布。', en: 'Quantum computation does not try all answers at once; it reshapes outcome distributions through complex amplitudes, unitary interference and controlled measurement.' },
    observable: { zh: '制备保真度、测量概率、状态层析与重复实验统计。', en: 'Preparation fidelity, measurement probability, state tomography and repeated-shot statistics.' },
  },
  {
    id: 'qubit', branch: 'information', order: 'P1',
    title: { zh: '量子比特与复合系统', en: 'Qubits and composite systems' },
    short: { zh: '编码与纠缠', en: 'Encoding' },
    question: { zh: '物理自由度怎样变成可计算、可组合的二能级子空间？', en: 'How does a physical degree of freedom become a composable computational two-level subspace?' },
    relation: String.raw`|\psi\rangle=\alpha|0\rangle+\beta|1\rangle,\quad \mathcal H_{AB}=\mathcal H_A\otimes\mathcal H_B`,
    meaning: { zh: '编码必须同时规定计算子空间、泄漏空间、制备与读出接口。纠缠来自张量积结构和不可分解的联合态。', en: 'An encoding specifies the computational subspace, leakage space, preparation and readout. Entanglement follows from tensor-product structure and nonseparable joint states.' },
    observable: { zh: 'Ramsey 对比度、联合奇偶、Bell 保真度、泄漏与损失记录。', en: 'Ramsey contrast, joint parity, Bell fidelity, leakage and loss records.' },
  },
  {
    id: 'control', branch: 'physics', order: 'P2',
    title: { zh: '受驱动力学与量子门', en: 'Driven dynamics and quantum gates' },
    short: { zh: '哈密顿量控制', en: 'Control' },
    question: { zh: '光场和微波如何把目标态沿可预测轨迹送到另一状态？', en: 'How do optical and microwave fields move a target state along a predictable trajectory?' },
    relation: String.raw`H/\hbar=-\Delta|r\rangle\langle r|+\frac{\Omega(t)}{2}\left(e^{i\phi}|r\rangle\langle1|+\mathrm{h.c.}\right)`,
    meaning: { zh: '幅度、失谐、相位和脉冲时序共同定义门。实验波形必须经过链路响应和单位标定后才等于模型输入。', en: 'Amplitude, detuning, phase and timing jointly define a gate. A laboratory waveform equals the model input only after transfer-function and unit calibration.' },
    observable: { zh: 'Rabi/Ramsey 曲线、AC Stark 位移、相位闭合和门真值表。', en: 'Rabi/Ramsey traces, AC Stark shifts, phase closure and gate truth tables.' },
  },
  {
    id: 'open-system', branch: 'physics', order: 'P3',
    title: { zh: '开放系统与误差通道', en: 'Open systems and error channels' },
    short: { zh: '噪声与故障', en: 'Noise' },
    question: { zh: '环境耦合怎样从物理机制传播成逻辑层可见故障？', en: 'How does environmental coupling propagate from a physical mechanism to a logical fault?' },
    relation: String.raw`\dot\rho=-\frac{i}{\hbar}[H,\rho]+\sum_k\mathcal D[L_k]\rho`,
    meaning: { zh: '必须沿“物理机制 → 门级故障 → 电路级通道 → 时空相关 → 解码器信息 → 逻辑错误率”追踪误差，不能把所有失效压成一个保真度。', en: 'Errors must be tracked through physical mechanism → gate-level fault → circuit channel → spatiotemporal correlation → decoder information → logical error rate, rather than compressed into one fidelity.' },
    observable: { zh: '寿命、噪声谱、随机基准、损失/泄漏/擦除标签及相关性。', en: 'Lifetime, noise spectra, randomized benchmarking, loss/leakage/erasure labels and correlations.' },
  },
  {
    id: 'neutral-atoms', branch: 'hardware', order: 'H1',
    title: { zh: '中性原子硬件原语', en: 'Neutral-atom hardware primitives' },
    short: { zh: '冷却、囚禁、重排', en: 'Trap & arrange' },
    question: { zh: '如何把许多相同原子变成可重构、可逐站点测量的阵列？', en: 'How do identical atoms become a reconfigurable, site-resolved array?' },
    relation: String.raw`U(\mathbf r)\propto-\alpha(\omega)I(\mathbf r),\qquad k_BT\ll U_0`,
    meaning: { zh: '激光冷却降低运动能，光偶极势形成光镊，成像给出占据图，AOD/SLM 重排把随机装载转成无缺陷计算寄存器。', en: 'Laser cooling lowers motional energy, dipole potentials form tweezers, imaging yields occupancy, and AOD/SLM rearrangement turns stochastic loading into defect-free registers.' },
    observable: { zh: '温度、阱频、装载率、生存率、重排成功率和站点串扰。', en: 'Temperature, trap frequency, loading, survival, rearrangement yield and site crosstalk.' },
  },
  {
    id: 'yb-platform', branch: 'hardware', order: 'H2',
    title: { zh: '171Yb 原子结构与双电子接口', en: '171Yb structure and two-electron interfaces' },
    short: { zh: 'Yb 平台', en: 'Yb platform' },
    question: { zh: '为什么核自旋、钟态、窄线和 Rydberg 通道可以分工？', en: 'Why can nuclear spin, clock, narrow-line and Rydberg channels divide labor?' },
    relation: String.raw`\{|{}^1S_0,m_I\rangle,|{}^3P_0,m_I\rangle,|r\rangle\}`, 
    meaning: { zh: 'I=1/2 给出最小核自旋子空间；1S0 与 3P0 支持存储和亚稳态接口；3P1/1P1 分别承担窄线冷却与强跃迁成像；Rydberg 态提供可开关相互作用。', en: 'I=1/2 gives a minimal nuclear-spin subspace; 1S0 and 3P0 support storage and metastable interfaces; 3P1/1P1 provide narrow-line cooling and strong imaging; Rydberg states supply switchable interaction.' },
    observable: { zh: '光谱、核自旋相干、钟态寿命、分支比、极化选择定则和 Rydberg 相互作用。', en: 'Spectra, nuclear-spin coherence, clock-state lifetime, branching, polarization selection rules and Rydberg interaction.' },
  },
  {
    id: 'system', branch: 'system', order: 'S1',
    title: { zh: '实验周期、通道表征与容错接口', en: 'Experimental cycles, channel characterization and fault-tolerance interfaces' },
    short: { zh: '系统闭环', en: 'System loop' },
    question: { zh: '组件性能如何进入可重复周期并形成逻辑层证据？', en: 'How does component performance enter a repeated cycle and produce logical-layer evidence?' },
    relation: String.raw`\mathcal E_{\mathrm{cycle}}=\mathcal M\circ\mathcal R\circ\mathcal G\circ\mathcal P`,
    meaning: { zh: '制备、门、移动、测量、复位、补原子和解码必须作为同一周期通道验收。Yb 的擦除接口只有在标签及时、误报受控且解码器使用该信息时才形成系统优势。', en: 'Preparation, gates, motion, measurement, reset, replacement and decoding must be accepted as one cycle channel. Yb erasure interfaces become a system advantage only when labels are timely, false positives are controlled and the decoder uses them.' },
    observable: { zh: '周期时间、并行密度、擦除标签质量、相关故障和逻辑错误率随码距的缩放。', en: 'Cycle time, parallel density, erasure-label quality, correlated faults and logical-error scaling with code distance.' },
  },
]

export default function FirstPrinciplesTree({ language }: { language: Language }) {
  const [selectedId, setSelectedId] = useState('postulates')
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0]

  return (
    <section className="teaching-visual principles-tree" id="first-principles-tree">
      <header className="teaching-visual__header">
        <div><span>FIRST PRINCIPLES / CAUSAL GRAPH</span><h2>{language === 'zh' ? '第一性原理演绎树' : 'First-principles deduction tree'}</h2></div>
        <p>{language === 'zh' ? '选择节点，查看它依赖什么、产生什么实验记录，以及它如何进入下一层。箭头表示论证与验收依赖，不表示时间顺序。' : 'Select a node to inspect its dependencies, laboratory records and handoff to the next layer. Arrows encode reasoning and acceptance dependencies, not chronology.'}</p>
      </header>

      <div className="principles-tree__map" aria-label={language === 'zh' ? '量子计算到 Yb 系统的演绎关系' : 'Deduction from quantum computing to a Yb system'}>
        <div className="principles-tree__spine" aria-hidden="true" />
        {nodes.map((node) => (
          <button key={node.id} type="button" className={`principle-node principle-node--${node.branch}${selected.id === node.id ? ' is-selected' : ''}`} aria-label={node.title[language]} aria-pressed={selected.id === node.id} onClick={() => setSelectedId(node.id)}>
            <span>{node.order}</span><strong>{node.short[language]}</strong><small>{node.question[language]}</small>
          </button>
        ))}
      </div>

      <article className="teaching-card" aria-live="polite">
        <div className="teaching-card__title"><span>{selected.order}</span><div><small>{language === 'zh' ? '当前推导节点' : 'Current deduction node'}</small><h3>{selected.title[language]}</h3></div></div>
        <div className="teaching-card__equation"><Equation source={selected.relation} /></div>
        <dl>
          <div><dt>{language === 'zh' ? '物理含义' : 'Physical meaning'}</dt><dd>{selected.meaning[language]}</dd></div>
          <div><dt>{language === 'zh' ? '实验判据' : 'Experimental evidence'}</dt><dd>{selected.observable[language]}</dd></div>
        </dl>
      </article>
    </section>
  )
}
