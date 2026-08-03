import type { Language } from '../../types/content'

type Scope = 'foundations' | 'fault'

interface GateCircuitAtlasProps {
  language: Language
  scope: Scope
}

const text = {
  foundations: {
    zh: {
      eyebrow: '逻辑门 · 电路 · 物理实现',
      title: '从比特门到可执行计算',
      thesis: '门是在有限个状态分量上施加的可组合变换。经典电路用可逆嵌入保留输入；量子电路还保留相对相位，因此能够以干涉组织计算结果。',
      legend: '标准线路符号',
      wire: '量子线路',
      classical: '经典记录',
      halfTitle: '经典：保留输入的可逆半加器',
      halfBody: '从 (a, b, 0, 0) 出发，两次 CNOT 写入和位 s = a XOR b；Toffoli 门写入进位 c = a AND b。输入 a、b 被保留，这是把不可逆布尔逻辑嵌入可逆演化的关键。',
      bellTitle: '量子：H 与 CNOT 制备 Bell 态',
      bellBody: '先以 H 将 q0 变为叠加态，再以 CNOT 关联两个量子比特。输出不能拆成两个单比特态的乘积：(|00> + |11>)/sqrt(2)。',
      czTitle: '原子接口：CZ 与局域 H 合成 CNOT',
      czBody: '中性原子平台直接提供条件相位 CZ；在目标比特前后施加 H，条件相位就变成条件翻转。具体的 Rydberg 态演化见本页既有 CZ 教学图。',
      atomic: '物理映射',
      atomicBody: '单原子受控哈密顿量产生 H、X、Z 等局域旋转；两原子 Rydberg 相互作用产生 CZ。线路符号规定逻辑动作，能级图与阻塞图说明该动作如何由原子动力学实现。',
    },
    en: {
      eyebrow: 'GATES · CIRCUITS · PHYSICAL IMPLEMENTATION',
      title: 'From bit gates to executable computation',
      thesis: 'A gate is a composable transformation on a finite set of state amplitudes. Reversible classical circuits retain their inputs; quantum circuits additionally retain relative phase, so interference can organize an output distribution.',
      legend: 'Standard circuit notation',
      wire: 'quantum wire',
      classical: 'classical record',
      halfTitle: 'Classical: a reversible half adder',
      halfBody: 'Starting from (a, b, 0, 0), two CNOTs write the sum s = a XOR b and a Toffoli writes the carry c = a AND b. Retaining a and b embeds irreversible Boolean logic in reversible evolution.',
      bellTitle: 'Quantum: H and CNOT prepare a Bell state',
      bellBody: 'H first puts q0 in a superposition; CNOT then correlates the two qubits. The result cannot be factored into two one-qubit states: (|00> + |11>)/sqrt(2).',
      czTitle: 'Atomic interface: CZ plus local H gives CNOT',
      czBody: 'Neutral-atom hardware directly supplies a conditional phase, CZ. Hadamards before and after CZ on the target turn that phase into a conditional flip. The existing CZ tutor gives the Rydberg-state dynamics.',
      atomic: 'Physical mapping',
      atomicBody: 'A controlled one-atom Hamiltonian produces local H, X and Z rotations; a two-atom Rydberg interaction produces CZ. Circuit symbols specify the logical action; the energy-level and blockade figures explain its atomic dynamics.',
    },
  },
  fault: {
    zh: {
      eyebrow: '综合征 · 解码 · 恢复',
      title: '从奇偶校验到恢复决策',
      thesis: '纠错不测量未知逻辑态本身，而是把相邻数据比特的奇偶关系写入辅助比特。综合征给出错误位置，再由经典解码器选择恢复操作。',
      figureTitle: '三比特重复码：两次 Z 基奇偶校验',
      body: '辅助比特 a12 与 a23 初始为 |0>。数据比特作为控制端写入 q1 XOR q2 和 q2 XOR q3，测量辅助比特后才把二值记录送入解码器。',
      limit: '边界：此图只说明三比特重复码如何诊断一个 X 错误；它不保护 Z 错误，也不是完整的容错通用计算周期。',
      decoder: '综合征到恢复',
      noError: '00：未检测到 X 错误',
      x1: '10：对 q1 施加 X',
      x2: '11：对 q2 施加 X',
      x3: '01：对 q3 施加 X',
    },
    en: {
      eyebrow: 'SYNDROME · DECODING · RECOVERY',
      title: 'From parity checks to a correction decision',
      thesis: 'Error correction does not measure the unknown logical state itself. It writes parity relations between data qubits onto ancillas; the syndrome localizes an error and a classical decoder selects recovery.',
      figureTitle: 'Three-qubit repetition code: two Z-basis parity checks',
      body: 'Ancillas a12 and a23 begin in |0>. Data qubits control CNOTs that write q1 XOR q2 and q2 XOR q3; only then are the ancillas measured and the binary records sent to a decoder.',
      limit: 'Boundary: this circuit diagnoses one X error in a three-qubit repetition code. It does not protect Z errors and is not a complete fault-tolerant universal-computing cycle.',
      decoder: 'Syndrome to recovery',
      noError: '00: no X error',
      x1: '10: apply X to q1',
      x2: '11: apply X to q2',
      x3: '01: apply X to q3',
    },
  },
} as const

function GateBox({ x, y, label }: { x: number; y: number; label: string }) {
  return <><rect x={x - 21} y={y - 21} width="42" height="42" rx="2" className="circuit-box" /><text x={x} y={y + 6} textAnchor="middle" className="circuit-gate">{label}</text></>
}

function Control({ x, y, targetY }: { x: number; y: number; targetY: number }) {
  return <><line x1={x} x2={x} y1={y} y2={targetY} className="circuit-link" /><circle cx={x} cy={y} r="6" className="circuit-control" /></>
}

function Target({ x, y }: { x: number; y: number }) {
  return <><circle cx={x} cy={y} r="16" className="circuit-target" /><line x1={x - 9} x2={x + 9} y1={y} y2={y} className="circuit-link" /><line x1={x} x2={x} y1={y - 9} y2={y + 9} className="circuit-link" /></>
}

function Wires({ labels, start = 112, end = 920, ys }: { labels: string[]; start?: number; end?: number; ys: number[] }) {
  return <>{ys.map((y, index) => <g key={labels[index]}><text x="14" y={y + 6} className="circuit-wire-label">{labels[index]}</text><line x1={start} x2={end} y1={y} y2={y} className="circuit-wire" /></g>)}</>
}

function HalfAdderCircuit({ language }: { language: Language }) {
  const labels = language === 'zh' ? ['a', 'b', 's = 0', 'c = 0'] : ['a', 'b', 's = 0', 'c = 0']
  return (
    <svg viewBox="0 0 1000 276" role="img" aria-label="Reversible half-adder circuit" className="circuit-svg">
      <Wires labels={labels} ys={[56, 112, 168, 224]} />
      <text x="264" y="25" textAnchor="middle" className="circuit-step">CNOT a → s</text>
      <Control x={264} y={56} targetY={168} /><Target x={264} y={168} />
      <text x="486" y="25" textAnchor="middle" className="circuit-step">CNOT b → s</text>
      <Control x={486} y={112} targetY={168} /><Target x={486} y={168} />
      <text x="740" y="25" textAnchor="middle" className="circuit-step">CCNOT a,b → c</text>
      <Control x={740} y={56} targetY={224} /><circle cx="740" cy="112" r="6" className="circuit-control" /><Target x={740} y={224} />
      <text x="920" y="60" className="circuit-output">a</text><text x="920" y="116" className="circuit-output">b</text>
      <text x="920" y="172" className="circuit-output">s = a ⊕ b</text><text x="920" y="228" className="circuit-output">c = a · b</text>
    </svg>
  )
}

function BellCircuit() {
  return (
    <svg viewBox="0 0 1000 212" role="img" aria-label="Bell-state preparation circuit" className="circuit-svg">
      <Wires labels={['q0 = |0>', 'q1 = |0>']} ys={[72, 152]} />
      <text x="286" y="34" textAnchor="middle" className="circuit-step">superpose</text><GateBox x={286} y={72} label="H" />
      <text x="574" y="34" textAnchor="middle" className="circuit-step">entangle</text><Control x={574} y={72} targetY={152} /><Target x={574} y={152} />
      <text x="754" y="34" textAnchor="middle" className="circuit-step">measure</text><GateBox x={754} y={72} label="M" /><GateBox x={754} y={152} label="M" />
      <line x1="775" x2="884" y1="72" y2="72" className="circuit-classical" /><line x1="775" x2="884" y1="152" y2="152" className="circuit-classical" />
      <text x="892" y="106" className="circuit-output">00 or 11</text>
    </svg>
  )
}

function CzToCnotCircuit() {
  return (
    <svg viewBox="0 0 1000 182" role="img" aria-label="CZ and local Hadamards implement CNOT" className="circuit-svg">
      <Wires labels={['control', 'target']} ys={[61, 131]} />
      <GateBox x={340} y={131} label="H" />
      <line x1="548" x2="548" y1="61" y2="131" className="circuit-link" /><circle cx="548" cy="61" r="6" className="circuit-control" /><circle cx="548" cy="131" r="6" className="circuit-control" /><text x="570" y="100" className="circuit-gate">CZ</text>
      <GateBox x={736} y={131} label="H" />
      <text x="498" y="25" textAnchor="middle" className="circuit-equation">CNOT = (I ⊗ H) CZ (I ⊗ H)</text>
    </svg>
  )
}

function FaultCircuit() {
  return (
    <svg viewBox="0 0 1000 380" role="img" aria-label="Three-qubit bit-flip syndrome extraction circuit" className="circuit-svg">
      <Wires labels={['q1', 'q2', 'q3', 'a12 = |0>', 'a23 = |0>']} ys={[58, 116, 174, 256, 326]} />
      <text x="278" y="27" textAnchor="middle" className="circuit-step">q1 ⊕ q2 → a12</text>
      <Control x={244} y={58} targetY={256} /><Target x={244} y={256} />
      <Control x={312} y={116} targetY={256} /><Target x={312} y={256} />
      <text x="622" y="27" textAnchor="middle" className="circuit-step">q2 ⊕ q3 → a23</text>
      <Control x={588} y={116} targetY={326} /><Target x={588} y={326} />
      <Control x={656} y={174} targetY={326} /><Target x={656} y={326} />
      <GateBox x={786} y={256} label="M" /><GateBox x={786} y={326} label="M" />
      <line x1="807" x2="920" y1="256" y2="256" className="circuit-classical" /><line x1="807" x2="920" y1="326" y2="326" className="circuit-classical" />
      <text x="926" y="264" className="circuit-output">s12</text><text x="926" y="334" className="circuit-output">s23</text>
    </svg>
  )
}

function SymbolLegend({ language, wire, classical }: { language: Language; wire: string; classical: string }) {
  const symbols = language === 'zh'
    ? [['H', '叠加'], ['X', '翻转'], ['Z', '相位'], ['•⊕', 'CNOT'], ['••', 'CZ'], ['M', '测量']]
    : [['H', 'superpose'], ['X', 'flip'], ['Z', 'phase'], ['•⊕', 'CNOT'], ['••', 'CZ'], ['M', 'measure']]
  return <div className="gate-circuit-atlas__legend" aria-label={language === 'zh' ? '标准量子线路符号' : 'Standard circuit symbols'}>
    <span className="gate-circuit-atlas__wire"><i />{wire}</span>
    {symbols.map(([symbol, label]) => <span key={symbol}><b>{symbol}</b>{label}</span>)}
    <span className="gate-circuit-atlas__wire gate-circuit-atlas__wire--classical"><i />{classical}</span>
  </div>
}

function FoundationAtlas({ language }: { language: Language }) {
  const copy = text.foundations[language]
  return <section className="teaching-visual gate-circuit-atlas" aria-labelledby="gate-circuit-title">
    <header className="teaching-visual__header">
      <div><span>{copy.eyebrow}</span><h2 id="gate-circuit-title">{copy.title}</h2></div>
      <p>{copy.thesis}</p>
    </header>
    <div className="gate-circuit-atlas__inner">
      <h3 className="gate-circuit-atlas__legend-title">{copy.legend}</h3>
      <SymbolLegend language={language} wire={copy.wire} classical={copy.classical} />
      <div className="gate-circuit-atlas__examples">
        <article className="gate-circuit-atlas__example"><div><span>01</span><h3>{copy.halfTitle}</h3><p>{copy.halfBody}</p></div><figure><HalfAdderCircuit language={language} /></figure></article>
        <article className="gate-circuit-atlas__example"><div><span>02</span><h3>{copy.bellTitle}</h3><p>{copy.bellBody}</p></div><figure><BellCircuit /></figure></article>
        <article className="gate-circuit-atlas__example"><div><span>03</span><h3>{copy.czTitle}</h3><p>{copy.czBody}</p></div><figure><CzToCnotCircuit /></figure></article>
      </div>
      <aside className="gate-circuit-atlas__mapping"><strong>{copy.atomic}</strong><p>{copy.atomicBody}</p></aside>
    </div>
  </section>
}

function FaultAtlas({ language }: { language: Language }) {
  const copy = text.fault[language]
  return <section className="teaching-visual gate-circuit-atlas gate-circuit-atlas--fault" aria-labelledby="syndrome-circuit-title">
    <header className="teaching-visual__header"><div><span>{copy.eyebrow}</span><h2 id="syndrome-circuit-title">{copy.title}</h2></div><p>{copy.thesis}</p></header>
    <div className="gate-circuit-atlas__inner">
      <article className="gate-circuit-atlas__fault-figure"><div><span>01</span><h3>{copy.figureTitle}</h3><p>{copy.body}</p></div><figure><FaultCircuit /></figure></article>
      <div className="gate-circuit-atlas__decoder"><h3>{copy.decoder}</h3><p className="gate-circuit-atlas__syndrome">s12 = q1 ⊕ q2 <span>·</span> s23 = q2 ⊕ q3</p><ol><li>{copy.noError}</li><li>{copy.x1}</li><li>{copy.x2}</li><li>{copy.x3}</li></ol></div>
      <p className="gate-circuit-atlas__limit">{copy.limit}</p>
    </div>
  </section>
}

export default function GateCircuitAtlas({ language, scope }: GateCircuitAtlasProps) {
  return scope === 'foundations' ? <FoundationAtlas language={language} /> : <FaultAtlas language={language} />
}
