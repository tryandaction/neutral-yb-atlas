import { useState } from 'react'
import type { Language } from '../../types/content'
import './teaching-visuals.css'

type Copy = { zh: string; en: string }
type InputKey = '00' | '01' | '10' | '11'
type GateCase = { input: InputKey; title: Copy; summary: Copy }

const selectCopy = (language: Language, value: Copy) => value[language]

const gateCases: GateCase[] = [
  { input: '00', title: { zh: '无光耦合', en: 'No optical coupling' }, summary: { zh: '|00⟩ 不含被门光驱动的 |1⟩ 成分。', en: '|00> contains no |1> component driven by the gate light.' } },
  { input: '01', title: { zh: '目标原子回路', en: 'Target-atom loop' }, summary: { zh: '只有目标原子经历 |1⟩↔|r⟩ 的单原子闭合演化。', en: 'Only the target atom follows the one-atom |1>↔|r> loop.' } },
  { input: '10', title: { zh: '控制原子回路', en: 'Control-atom loop' }, summary: { zh: '只有控制原子经历 |1⟩↔|r⟩ 的单原子闭合演化。', en: 'Only the control atom follows the one-atom |1>↔|r> loop.' } },
  { input: '11', title: { zh: '双原子相互作用通道', en: 'Pair-interaction channel' }, summary: { zh: '两个原子同时可被驱动；阻塞只在这一分支改变演化。', en: 'Both atoms can be driven; blockade changes only this branch.' } },
]

function PulseEnvelope({ language }: { language: Language }) {
  return (
    <div className="cz-gate__pulse-envelope">
      <div>
        <span>{selectCopy(language, { zh: '同一束全局门光', en: 'One global gate field' })}</span>
        <strong>{selectCopy(language, { zh: '302 nm 整形 Rydberg 脉冲', en: 'Shaped 302 nm Rydberg pulse' })}</strong>
      </div>
      <svg viewBox="0 0 260 48" aria-hidden="true"><path d="M4 40 C35 40 42 8 70 8 S106 40 132 28 S166 8 190 18 S221 40 256 13" /></svg>
      <code>Ω(t)e<sup>iφ(t)</sup></code>
    </div>
  )
}

function PairStateDiagram({ input, language, blockadeEnabled }: { input: InputKey; language: Language; blockadeEnabled: boolean }) {
  const singleBranch = input === '01' || input === '10'
  const pairBranch = input === '11'
  const singleLabel = input === '01' ? '|01⟩' : '|10⟩'
  const rLabel = input === '01' ? '|0r⟩' : '|r0⟩'
  const gateMode = blockadeEnabled ? selectCopy(language, { zh: '有阻塞', en: 'with blockade' }) : selectCopy(language, { zh: '无阻塞', en: 'without blockade' })

  return (
    <figure className="cz-gate__figure">
      <div className="cz-gate__figure-head">
        <span>{selectCopy(language, { zh: '选择输入态；只有 |11⟩ 会进入双原子相互作用通道。', en: 'Choose an input; only |11> enters the two-atom interaction channel.' })}</span>
        <strong>{pairBranch ? `${selectCopy(language, { zh: '输入 |11⟩，', en: 'Input |11>, ' })}${gateMode}` : selectCopy(language, { zh: `输入 |${input}⟩`, en: `Input |${input}>` })}</strong>
      </div>
      <PulseEnvelope language={language} />
      <svg className="cz-gate__diagram cz-gate__diagram--pair" viewBox="0 0 1000 330" role="img" aria-label={selectCopy(language, {
        zh: `输入 |${input}⟩${pairBranch ? `，${gateMode}` : ''}的 Rydberg 成对态演化`,
        en: `Rydberg pair-state dynamics for input |${input}>${pairBranch ? ` ${gateMode}` : ''}`,
      })}>
        <defs>
          <marker id="cz-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8Z" fill="#6951c7" /></marker>
          <marker id="cz-arrow-muted" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8Z" fill="#a7b5b0" /></marker>
        </defs>
        <text x="64" y="44" className="cz-svg__atom-label">{selectCopy(language, { zh: '所选计算分支', en: 'Selected computational branch' })}</text>
        <line x1="64" x2="322" y1="248" y2="248" className="cz-svg__logic-line" />
        <text x="193" y="238" textAnchor="middle" className="cz-svg__pair-label">|{input}⟩</text>
        <circle cx="193" cy="248" r="9" className="cz-svg__population" />
        {input !== '00' && <line x1="332" x2="484" y1="248" y2="248" className="cz-svg__entry-path" />}

        {input === '00' && <>
          <line x1="438" x2="886" y1="248" y2="248" className="cz-svg__muted-path" />
          <text x="662" y="174" textAnchor="middle" className="cz-svg__note">{selectCopy(language, { zh: '|00⟩ 不含可被门光耦合的 |1⟩。', en: '|00> contains no |1> component that the gate light can couple.' })}</text>
        </>}

        {singleBranch && <>
          <line x1="522" x2="808" y1="108" y2="108" className="cz-svg__rydberg-line" />
          <line x1="522" x2="808" y1="248" y2="248" className="cz-svg__logic-line" />
          <text x="666" y="95" textAnchor="middle" className="cz-svg__pair-label">{rLabel}</text>
          <text x="666" y="238" textAnchor="middle" className="cz-svg__pair-label">{singleLabel}</text>
          <line x1="666" x2="666" y1="230" y2="126" markerEnd="url(#cz-arrow)" className="cz-svg__arrow" />
          <line x1="694" x2="694" y1="126" y2="230" markerEnd="url(#cz-arrow)" className="cz-svg__arrow" />
          <text x="713" y="176" className="cz-svg__pulse-label">Ω(t), φ(t)</text>
        </>}

        {pairBranch && blockadeEnabled && <>
          <line x1="505" x2="795" y1="164" y2="164" className="cz-svg__rydberg-line" />
          <line x1="505" x2="795" y1="248" y2="248" className="cz-svg__logic-line" />
          <line x1="505" x2="795" y1="74" y2="74" className="cz-svg__pair-line" />
          <text x="650" y="154" textAnchor="middle" className="cz-svg__pair-label">|W⟩ = (|r1⟩ + |1r⟩)/√2</text>
          <text x="650" y="238" textAnchor="middle" className="cz-svg__pair-label">|11⟩</text>
          <text x="650" y="61" textAnchor="middle" className="cz-svg__pair-label">|rr⟩</text>
          <line x1="622" x2="622" y1="230" y2="182" markerEnd="url(#cz-arrow)" className="cz-svg__arrow" />
          <line x1="650" x2="650" y1="182" y2="230" markerEnd="url(#cz-arrow)" className="cz-svg__arrow" />
          <text x="670" y="207" className="cz-svg__pulse-label">√2 Ω(t)</text>
          <line x1="622" x2="622" y1="146" y2="92" markerEnd="url(#cz-arrow-muted)" className="cz-svg__arrow cz-svg__arrow--blocked" />
          <text x="640" y="114" className="cz-svg__blocked-label">{selectCopy(language, { zh: 'B/ℏ 使其失谐', en: 'detuned by B/ℏ' })}</text>
          <line x1="812" x2="812" y1="74" y2="104" className="cz-svg__shift" />
          <text x="825" y="96" className="cz-svg__shift-label">B</text>
          <text x="650" y="306" textAnchor="middle" className="cz-svg__blocked-note">{selectCopy(language, { zh: '|rr⟩ 被移出共振：|11⟩ 走不同闭合路径。', en: '|rr> is shifted off resonance: |11> follows a different closed path.' })}</text>
        </>}

        {pairBranch && !blockadeEnabled && <>
          <line x1="505" x2="795" y1="74" y2="74" className="cz-svg__rydberg-line" />
          <text x="650" y="61" textAnchor="middle" className="cz-svg__pair-label">|rr⟩</text>
          <line x1="505" x2="795" y1="248" y2="248" className="cz-svg__logic-line" />
          <text x="650" y="238" textAnchor="middle" className="cz-svg__pair-label">|11⟩</text>
          <line x1="525" x2="650" y1="164" y2="164" className="cz-svg__rydberg-line" />
          <line x1="650" x2="775" y1="164" y2="164" className="cz-svg__rydberg-line" />
          <text x="585" y="154" textAnchor="middle" className="cz-svg__pair-label">|r1⟩</text>
          <text x="715" y="154" textAnchor="middle" className="cz-svg__pair-label">|1r⟩</text>
          <line x1="585" x2="585" y1="230" y2="182" markerEnd="url(#cz-arrow)" className="cz-svg__arrow" />
          <line x1="715" x2="715" y1="230" y2="182" markerEnd="url(#cz-arrow)" className="cz-svg__arrow" />
          <line x1="585" x2="585" y1="146" y2="92" markerEnd="url(#cz-arrow)" className="cz-svg__arrow" />
          <line x1="715" x2="715" y1="146" y2="92" markerEnd="url(#cz-arrow)" className="cz-svg__arrow" />
          <text x="585" y="207" textAnchor="middle" className="cz-svg__pulse-label">Ω(t)</text>
          <text x="715" y="207" textAnchor="middle" className="cz-svg__pulse-label">Ω(t)</text>
          <text x="650" y="306" textAnchor="middle" className="cz-svg__note">{selectCopy(language, { zh: '无阻塞：两个原子独立经历 |1⟩↔|r⟩，图中不引入 |W⟩ 或 √2Ω(t)。', en: 'Without blockade: each atom follows its own |1>↔|r> path; no |W> or √2Ω(t) is used in this product-state view.' })}</text>
        </>}
      </svg>
      <figcaption>{selectCopy(language, {
        zh: '图中只画门期间实际耦合的成对态；门末 Rydberg 布居必须回到计算空间。',
        en: 'The diagram draws only the pair states coupled during the gate; Rydberg population must return to the computational space at the end.',
      })}</figcaption>
    </figure>
  )
}

function BlockadeReadout({ language, blockadeEnabled, onChange }: { language: Language; blockadeEnabled: boolean; onChange: (enabled: boolean) => void }) {
  const enabled = selectCopy(language, { zh: '有阻塞', en: 'With blockade' })
  const disabled = selectCopy(language, { zh: '无阻塞', en: 'Without blockade' })
  return (
    <section className="cz-gate__blockade-readout" aria-labelledby="cz-blockade-readout-title">
      <div className="cz-gate__blockade-readout-head">
        <h3 id="cz-blockade-readout-title">{selectCopy(language, { zh: '阻塞改变了什么？', en: 'What does blockade change?' })}</h3>
        <div role="group" aria-label={selectCopy(language, { zh: '切换阻塞条件', en: 'Toggle blockade condition' })}>
          <button type="button" aria-pressed={!blockadeEnabled} onClick={() => onChange(false)}>{disabled}</button>
          <button type="button" aria-pressed={blockadeEnabled} onClick={() => onChange(true)}>{enabled}</button>
        </div>
      </div>
      <p>{blockadeEnabled
        ? selectCopy(language, { zh: '相互作用能 B 将 |rr⟩ 移出共振。|11⟩ 因而不同于 |01⟩、|10⟩；校正局域相位后，留下条件相位 γ = π，即 CZ。', en: 'Interaction energy B moves |rr> off resonance. The |11> path then differs from |01> and |10>; after local phase calibration, the conditional phase is γ = π: CZ.' })
        : selectCopy(language, { zh: '|rr⟩ 未移位，双原子演化分解为两个单原子演化；图中用乘积态路径表示，不引入 |W⟩ 或 √2Ω(t)。|11⟩ 只积累局域相位，γ = 0，不能产生纠缠。', en: '|rr> is unshifted, so the two-atom evolution factorizes into one-atom evolutions; the diagram uses product-state paths, not |W> or √2Ω(t). |11> acquires only local phases, γ = 0, and cannot entangle.' })}</p>
    </section>
  )
}

export default function RydbergGateTutor({ language }: { language: Language }) {
  const [selectedInput, setSelectedInput] = useState<InputKey>('11')
  const [blockadeEnabled, setBlockadeEnabled] = useState(true)
  const selected = gateCases.find((item) => item.input === selectedInput) ?? gateCases[3]

  return (
    <section className="teaching-visual gate-tutor" id="rydberg-gate-tutor">
      <header className="teaching-visual__header">
        <div><span>RYDBERG / TWO-QUBIT GATE</span><h2>{selectCopy(language, { zh: 'Rydberg 阻塞如何产生 CZ', en: 'How Rydberg blockade produces CZ' })}</h2></div>
        <p>{selectCopy(language, { zh: '同一束门光驱动四个计算分支；只有 |11⟩ 能进入双原子相互作用通道。', en: 'One gate field drives all four computational branches; only |11> reaches the two-atom interaction channel.' })}</p>
      </header>

      <div className="cz-gate">
        <div className="cz-gate__inputs" role="group" aria-label={selectCopy(language, { zh: '选择输入计算基态', en: 'Choose an input computational basis state' })}>
          {gateCases.map((item) => <button key={item.input} type="button" aria-pressed={item.input === selected.input} onClick={() => setSelectedInput(item.input)}><span>|{item.input}⟩</span><small>{selectCopy(language, item.title)}</small></button>)}
        </div>
        {selected.input === '11' && <BlockadeReadout language={language} blockadeEnabled={blockadeEnabled} onChange={setBlockadeEnabled} />}
        <PairStateDiagram input={selected.input} language={language} blockadeEnabled={blockadeEnabled} />
        <div className="cz-gate__explanation"><span>{selectCopy(language, { zh: `分支 |${selected.input}⟩`, en: `Branch |${selected.input}>` })}</span><p>{selectCopy(language, selected.summary)}</p></div>
      </div>

      <footer className="gate-tutor__source">
        <strong>{selectCopy(language, { zh: '实现依据：', en: 'Implementation basis: ' })}</strong>
        <a href="https://doi.org/10.1103/PhysRevX.15.011009" target="_blank" rel="noreferrer">Peper <em>et al.</em>, <em>Spectroscopy and Modeling of <sup>171</sup>Yb Rydberg States for High-Fidelity Two-Qubit Gates</em>, Phys. Rev. X 15, 011009 (2025)</a>
      </footer>
    </section>
  )
}
