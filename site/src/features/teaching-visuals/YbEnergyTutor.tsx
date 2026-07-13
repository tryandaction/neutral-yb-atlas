import { useState } from 'react'
import type { Language } from '../../types/content'
import './teaching-visuals.css'

const transitions = [
  {
    id: '399', color: '#2f6ca3', wavelength: '399 nm', label: { zh: '399 nm 强跃迁', en: '399 nm strong line' }, from: '1S0', to: '1P1',
    role: { zh: '快速减速、一级 MOT 与荧光成像', en: 'Fast slowing, first-stage MOT and fluorescence imaging' },
    principle: { zh: '宽线宽跃迁提供较大散射力，但光子反冲与非闭合分支要求控制曝光时间和偏振。', en: 'A broad transition provides high scattering force, while recoil and non-closed branches constrain exposure and polarization.' },
    hardware: { zh: '399 nm 激光、锁频参考、AOM、MOT 线圈、成像物镜与相机', en: '399 nm laser, frequency reference, AOM, MOT coils, imaging objective and camera' },
    evidence: { zh: '俘获数、散射率、成像保真度、生存率与暗态概率', en: 'Atom number, scattering rate, imaging fidelity, survival and dark-state probability' },
  },
  {
    id: '556', color: '#2d7a57', wavelength: '556 nm', label: { zh: '556 nm 窄线跃迁', en: '556 nm narrow line' }, from: '1S0', to: '3P1',
    role: { zh: '窄线 MOT、亚多普勒冷却与低损伤成像', en: 'Narrow-line MOT, sub-Doppler cooling and low-loss imaging' },
    principle: { zh: '较窄自然线宽降低多普勒温标，并使失谐、磁场梯度和光强对平衡温度更敏感。', en: 'The narrower natural linewidth lowers the Doppler scale and increases sensitivity to detuning, field gradient and intensity.' },
    hardware: { zh: '556 nm 激光、窄线锁频、AOM/EOM、磁场线圈和功率稳定', en: '556 nm laser, narrow-line lock, AOM/EOM, field coils and power stabilization' },
    evidence: { zh: '温度、阱内占据、冷却时间常数、谱线宽度与光移', en: 'Temperature, in-trap occupancy, cooling time constant, linewidth and light shift' },
  },
  {
    id: '578', color: '#b34d34', wavelength: '578 nm', label: { zh: '578 nm 钟跃迁', en: '578 nm clock transition' }, from: '1S0', to: '3P0',
    role: { zh: '超窄线宽相干控制与钟态接口', en: 'Ultranarrow coherent control and clock-state interface' },
    principle: { zh: '1S0–3P0 跃迁把基态与长寿命亚稳态连接，可用于相干映射、态选择和擦除接口，但对激光相噪、磁场与光移校准要求高。', en: 'The 1S0–3P0 transition links the ground and long-lived metastable states for coherent mapping, state selection and erasure interfaces, with stringent phase-noise, field and light-shift calibration.' },
    hardware: { zh: '578 nm 钟激光、超稳腔、相位稳定光路、AOM、磁屏蔽与频率梳', en: '578 nm clock laser, ultrastable cavity, phase-stabilized path, AOM, magnetic shielding and frequency comb' },
    evidence: { zh: 'Rabi/Ramsey 对比度、线宽、相干时间、差分光移与映射保真度', en: 'Rabi/Ramsey contrast, linewidth, coherence time, differential light shift and mapping fidelity' },
  },
  {
    id: '302', color: '#7047a8', wavelength: '≈302 nm', label: { zh: '约 302 nm Rydberg 激发', en: '≈302 nm Rydberg excitation' }, from: '3P0', to: 'Rydberg',
    role: { zh: '把亚稳态量子比特耦合到强相互作用 Rydberg 流形', en: 'Couple metastable qubits to a strongly interacting Rydberg manifold' },
    principle: { zh: '目标 Rydberg 态、偏振和中间态决定耦合、散射与相互作用张量；波长与通道必须按具体方案和原始数据锁定。', en: 'The target Rydberg level, polarization and intermediate states set coupling, scattering and interaction tensors; wavelength and pathway must be locked to the chosen scheme and source data.' },
    hardware: { zh: '紫外激光/倍频链、增强腔、相位锁、光束指向稳定、AOM 与功率监测', en: 'UV laser/conversion chain, enhancement cavity, phase lock, pointing stabilization, AOM and power monitor' },
    evidence: { zh: '单原子 Rabi、寿命、AC Stark 位移、双原子阻塞和方向相关相互作用', en: 'Single-atom Rabi rate, lifetime, AC Stark shift, two-atom blockade and angle-dependent interaction' },
  },
  {
    id: 'ion', color: '#9b5b30', wavelength: 'readout', label: { zh: '自电离/状态选择读出', en: 'Autoionization / selective readout' }, from: 'Rydberg', to: 'Yb+',
    role: { zh: '把特定内部态转换成可检测的损失或离子记录', en: 'Convert selected internal states into detectable loss or ion records' },
    principle: { zh: '状态选择探测可把部分泄漏转成擦除标签，但必须分别标定真阳性、误报、探测延迟和对邻近原子的回作用。', en: 'State-selective detection can convert leakage into erasure labels, but true-positive rate, false positives, latency and spectator back-action must be calibrated separately.' },
    hardware: { zh: '读出激光、脉冲同步、离子/原子成像、阈值分类与时间戳系统', en: 'Readout laser, pulse timing, ion/atom imaging, threshold classifier and timestamping' },
    evidence: { zh: '混淆矩阵、擦除召回率、误报率、邻近站点扰动与再装载代价', en: 'Confusion matrix, erasure recall, false-positive rate, spectator disturbance and reload cost' },
  },
] as const

const levelY: Record<string, number> = { Rydberg: 52, '1P1': 118, '3P1': 190, '3P0': 262, '1S0': 338, 'Yb+': 82 }

export default function YbEnergyTutor({ language }: { language: Language }) {
  const [selectedId, setSelectedId] = useState('578')
  const selected = transitions.find((item) => item.id === selectedId) ?? transitions[0]

  return (
    <section className="teaching-visual energy-tutor" id="yb-energy-tutor">
      <header className="teaching-visual__header">
        <div><span>ATOMIC STRUCTURE / LAB INTERFACE</span><h2>{language === 'zh' ? 'Yb 能级与实验通道教学图' : 'Yb levels and laboratory-channel tutor'}</h2></div>
        <p>{language === 'zh' ? '选择一条跃迁，图中只高亮相关能级和通道；右侧同步显示物理作用、所需硬件与应记录的验收证据。' : 'Select a transition to highlight only its levels and pathway; the panel links physical role, hardware and acceptance evidence.'}</p>
      </header>

      <div className="energy-tutor__workspace">
        <figure className="energy-diagram">
          <svg viewBox="0 0 720 410" role="img" aria-labelledby="energy-title energy-desc">
            <title id="energy-title">{language === 'zh' ? '171Yb 教学能级图' : '171Yb teaching level diagram'}</title>
            <desc id="energy-desc">{language === 'zh' ? '从 1S0、3P0、3P1、1P1 到 Rydberg 和电离读出的实验通道。' : 'Experimental pathways among 1S0, 3P0, 3P1, 1P1, Rydberg and ionization readout.'}</desc>
            <text x="30" y="28" className="energy-diagram__isotope">¹⁷¹Yb · I = 1/2</text>
            {Object.entries(levelY).map(([level, y]) => (
              <g key={level} className={selected.from === level || selected.to === level ? 'is-active' : ''}>
                <line x1={level === 'Yb+' ? 520 : 95} x2={level === 'Yb+' ? 650 : 395} y1={y} y2={y} className="energy-diagram__level" />
                <text x={level === 'Yb+' ? 540 : 28} y={y + 6} className="energy-diagram__label">{level}</text>
              </g>
            ))}
            <text x="405" y="344" className="energy-diagram__state">|0⟩  |1⟩ nuclear-spin basis</text>
            {transitions.filter((item) => item.to !== 'Yb+').map((item, index) => {
              const active = item.id === selected.id
              const x = 150 + index * 68
              return (
                <g key={item.id} className={active ? 'is-active' : ''}>
                  <line x1={x} x2={x} y1={levelY[item.from] - 7} y2={levelY[item.to] + 10} stroke={item.color} className="energy-diagram__transition" markerEnd="url(#arrow)" />
                  <text x={x + 8} y={(levelY[item.from] + levelY[item.to]) / 2} fill={item.color} className="energy-diagram__wavelength">{item.wavelength}</text>
                </g>
              )
            })}
            <defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto"><path d="M0,7 L3.5,0 L7,7" fill="context-stroke" /></marker></defs>
            <path d="M395 52 C470 52 470 82 520 82" fill="none" stroke={transitions[4].color} className={`energy-diagram__ion-path${selected.id === 'ion' ? ' is-active' : ''}`} />
            <text x="492" y="65" fill={transitions[4].color} className="energy-diagram__wavelength">ion / loss flag</text>
            <text x="438" y="392" className="energy-diagram__boundary">{language === 'zh' ? '示意图：目标 Rydberg 态与通道需按具体方案锁定' : 'Schematic: lock the target Rydberg level and pathway to the chosen scheme'}</text>
          </svg>
          <figcaption>{language === 'zh' ? '能量轴非线性；颜色编码实验通道，不代表能级间距比例。' : 'The energy axis is nonlinear; colors encode laboratory channels, not proportional level spacing.'}</figcaption>
        </figure>

        <div className="energy-tutor__controls">
          <div className="transition-list" role="list" aria-label={language === 'zh' ? '跃迁通道' : 'Transition channels'}>
            {transitions.map((item) => (
              <button key={item.id} type="button" aria-pressed={selected.id === item.id} onClick={() => setSelectedId(item.id)} style={{ '--transition-color': item.color } as React.CSSProperties}>
                <i aria-hidden="true" /><span><strong>{item.label[language]}</strong><small>{item.from} → {item.to}</small></span>
              </button>
            ))}
          </div>
          <article className="teaching-card energy-card" aria-live="polite">
            <div className="teaching-card__title"><span style={{ background: selected.color }}>{selected.wavelength}</span><div><small>{selected.from} → {selected.to}</small><h3>{selected.role[language]}</h3></div></div>
            <dl>
              <div><dt>{language === 'zh' ? '底层机制' : 'Mechanism'}</dt><dd>{selected.principle[language]}</dd></div>
              <div><dt>{language === 'zh' ? '实验硬件' : 'Laboratory hardware'}</dt><dd>{selected.hardware[language]}</dd></div>
              <div><dt>{language === 'zh' ? '验收记录' : 'Acceptance record'}</dt><dd>{selected.evidence[language]}</dd></div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  )
}
