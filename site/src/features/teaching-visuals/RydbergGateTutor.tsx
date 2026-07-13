import { useState } from 'react'
import type { Language } from '../../types/content'
import Equation from '../article/Equation'
import './teaching-visuals.css'

const steps = [
  {
    id: 'prepare', order: '01', short: { zh: '制备', en: 'Prepare' }, title: { zh: '定义计算基与脉冲参考', en: 'Define the computational basis and pulse reference' },
    state: '|c,t⟩ ∈ {|00⟩,|01⟩,|10⟩,|11⟩}', equation: String.raw`|\psi_0\rangle=\sum_{c,t\in\{0,1\}}a_{ct}|ct\rangle`,
    mechanism: { zh: '先分别锁定每个原子的 |1⟩↔|r⟩ Rabi 频率、失谐、相位和光移。两原子门不能从未校准的单原子耦合直接开始。', en: 'First lock each atom’s |1⟩↔|r⟩ Rabi rate, detuning, phase and light shift. A two-atom gate cannot begin from uncalibrated single-atom coupling.' },
    check: { zh: '单原子 Rabi、Ramsey、空间均匀性、关光后回到计算子空间的概率。', en: 'Single-atom Rabi, Ramsey, spatial uniformity and return probability after the light is removed.' },
  },
  {
    id: 'blockade', order: '02', short: { zh: '建立阻塞', en: 'Blockade' }, title: { zh: '控制原子进入 Rydberg 态并移动目标共振', en: 'Excite the control atom and shift the target resonance' },
    state: '|r1⟩ ↔ |rr⟩ detuned by V', equation: String.raw`H_{rr}/\hbar=V|rr\rangle\langle rr|+\frac{\Omega}{2}(|r1\rangle\langle rr|+\mathrm{h.c.})`,
    mechanism: { zh: '控制原子处于 |r⟩ 时，双激发 |rr⟩ 被相互作用 V 移出共振。只有 V 远大于有效驱动和噪声展宽时，目标激发才被抑制。', en: 'When the control is in |r⟩, interaction V shifts |rr⟩ off resonance. Target excitation is suppressed only when V exceeds the effective drive and noise-broadened linewidth.' },
    check: { zh: '双原子谱、|rr⟩ 布居上限、距离与角度扫描、阻塞半径以及目标原子残余 Rabi。', en: 'Two-atom spectra, |rr⟩ population bound, distance/angle scans, blockade radius and residual target Rabi oscillation.' },
  },
  {
    id: 'phase', order: '03', short: { zh: '条件相位', en: 'Conditional phase' }, title: { zh: '条件相位累积', en: 'Conditional phase accumulation' },
    state: '|11⟩ → e^{iφ11}|11⟩', equation: String.raw`\phi_{CZ}=\phi_{11}-\phi_{10}-\phi_{01}+\phi_{00}=\pi\ (\mathrm{mod}\ 2\pi)`,
    mechanism: { zh: 'V/Ω 决定阻塞强度，但有限阻塞仍产生双激发泄漏与相位偏差；Doppler、AC Stark 位移、激光相噪和脉冲边沿同时改变条件相位。', en: 'V/Ω sets blockade strength, but finite blockade still produces double-excitation leakage and phase error; Doppler shifts, AC Stark shifts, laser phase noise and pulse edges also alter the conditional phase.' },
    check: { zh: '用 Ramsey 型条件相位扫描恢复 φCZ，并同步记录损失、泄漏和无条件单比特相位。', en: 'Recover φCZ with a Ramsey-style conditional-phase scan while recording loss, leakage and unconditional single-qubit phases.' },
  },
  {
    id: 'return', order: '04', short: { zh: '解激发', en: 'Return' }, title: { zh: '回到计算子空间并重构门通道', en: 'Return to the computational subspace and reconstruct the gate channel' },
    state: 'UCZ = diag(1,1,1,-1)', equation: String.raw`\mathcal E_{CZ}(\rho)=U_{CZ}\rho U_{CZ}^{\dagger}+\mathcal E_{\mathrm{leak}}+\mathcal E_{\mathrm{loss}}+\cdots`,
    mechanism: { zh: '解激发不是结束：必须检查残余 Rydberg 布居、运动加热、原子损失和相干相位，并把可见擦除与隐藏 Pauli 故障分开。', en: 'De-excitation is not the endpoint: residual Rydberg population, motional heating, atom loss and coherent phase must be checked, with visible erasures separated from hidden Pauli faults.' },
    check: { zh: '真值表、Bell 奇偶振荡、重复门序列、随机/循环基准，以及按损失、泄漏、擦除和 SPAM 分解的结果。', en: 'Truth table, Bell parity oscillation, repeated gates, randomized/cycle benchmarking and results partitioned by loss, leakage, erasure and SPAM.' },
  },
] as const

export default function RydbergGateTutor({ language }: { language: Language }) {
  const [selectedId, setSelectedId] = useState('prepare')
  const selected = steps.find((step) => step.id === selectedId) ?? steps[0]

  return (
    <section className="teaching-visual gate-tutor" id="rydberg-gate-tutor">
      <header className="teaching-visual__header">
        <div><span>GATE / STATE EVOLUTION</span><h2>{language === 'zh' ? 'Rydberg 阻塞 CZ 的逐步教学图' : 'Step-by-step Rydberg-blockade CZ tutor'}</h2></div>
        <p>{language === 'zh' ? '门不是一条抽象箭头。选择步骤，观察计算态、Rydberg 态、相互作用位移和实验验收怎样对应。' : 'A gate is not an abstract arrow. Select a step to connect computational states, Rydberg excitation, interaction shift and laboratory acceptance.'}</p>
      </header>

      <div className="gate-tutor__workspace">
        <div className="gate-step-list" role="list" aria-label={language === 'zh' ? '阻塞门步骤' : 'Blockade-gate steps'}>
          {steps.map((step) => (
            <button key={step.id} type="button" aria-label={`${step.order} ${step.short[language]}`} aria-pressed={selected.id === step.id} onClick={() => setSelectedId(step.id)}>
              <span>{step.order}</span><strong>{step.short[language]}</strong><small>{step.state}</small>
            </button>
          ))}
        </div>

        <figure className="gate-schematic" data-step={selected.id}>
          <svg viewBox="0 0 820 390" role="img" aria-labelledby="gate-title gate-desc">
            <title id="gate-title">{language === 'zh' ? '双原子 Rydberg 阻塞门状态图' : 'Two-atom Rydberg blockade state diagram'}</title>
            <desc id="gate-desc">{language === 'zh' ? '控制原子和目标原子的计算态、Rydberg 态、激光驱动与相互作用位移。' : 'Computational and Rydberg levels, laser drives and interaction shift for control and target atoms.'}</desc>
            <text x="166" y="34" className="gate-schematic__atom-label">{language === 'zh' ? '控制原子 c' : 'control atom c'}</text>
            <text x="570" y="34" className="gate-schematic__atom-label">{language === 'zh' ? '目标原子 t' : 'target atom t'}</text>
            <line x1="100" x2="330" y1="282" y2="282" className="gate-schematic__level" /><text x="65" y="288">|1⟩</text>
            <line x1="500" x2="730" y1="282" y2="282" className="gate-schematic__level" /><text x="742" y="288">|1⟩</text>
            <line x1="100" x2="330" y1="104" y2="104" className="gate-schematic__level is-rydberg" /><text x="65" y="110">|r⟩</text>
            <line x1="500" x2="730" y1="104" y2="104" className="gate-schematic__level is-rydberg" /><text x="742" y="110">|r⟩</text>
            <path d="M215 268 L215 120" className="gate-schematic__drive control-drive" /><path d="M615 268 L615 120" className="gate-schematic__drive target-drive" />
            <text x="226" y="198" className="gate-schematic__omega">Ωc(t)</text><text x="626" y="198" className="gate-schematic__omega">Ωt(t)</text>
            <path d="M330 104 C395 55 435 55 500 104" className="gate-schematic__interaction" />
            <text x="394" y="66" className="gate-schematic__v">V(R,θ)</text>
            <circle cx="215" cy={selected.id === 'blockade' || selected.id === 'phase' ? 104 : 282} r="14" className="gate-schematic__atom control-atom" />
            <circle cx="615" cy="282" r="14" className="gate-schematic__atom target-atom" />
            <text x="350" y="344" className="gate-schematic__state">{selected.state}</text>
          </svg>
          <figcaption>{language === 'zh' ? '能级与脉冲示意，不按真实能量和时间比例绘制。V 的数值与方向依赖必须由目标 Rydberg 态和几何锁定。' : 'Schematic levels and pulses are not to energy or time scale. Lock the value and angular dependence of V to the target Rydberg state and geometry.'}</figcaption>
        </figure>
      </div>

      <article className="teaching-card gate-card" aria-live="polite">
        <div className="teaching-card__title"><span>{selected.order}</span><div><small>{selected.state}</small><h3>{selected.title[language]}</h3></div></div>
        <div className="teaching-card__equation"><Equation source={selected.equation} /></div>
        <dl>
          <div><dt>{language === 'zh' ? '物理机制' : 'Mechanism'}</dt><dd>{selected.mechanism[language]}</dd></div>
          <div><dt>{language === 'zh' ? '实验验收' : 'Acceptance'}</dt><dd>{selected.check[language]}</dd></div>
        </dl>
      </article>
    </section>
  )
}
