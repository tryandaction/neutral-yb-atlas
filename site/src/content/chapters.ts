import type { Chapter } from '../types/content'
import { researchDetails } from './researchDetails'
import { foundationsChapter } from './learning/foundations'
import { neutralAtomsChapter } from './learning/neutralAtoms'
import { ytterbiumChapter } from './learning/ytterbium'

const legacyChapters: Chapter[] = [
  {
    id: 'quantum-foundations',
    number: 1,
    title: { zh: '计算如何落在物理系统中', en: 'How computation is embodied in a physical system' },
    shortTitle: { zh: '量子信息', en: 'Quantum information' },
    question: { zh: '从输入—输出规则到 DiVincenzo 物理实现准则，再到可重复纠错周期，缺一项会怎样？', en: 'What fails between an input-output rule, the DiVincenzo implementation criteria and a repeatable error-correction cycle when one condition is missing?' },
    sections: [
      {
        id: 'state-measurement',
        title: { zh: '计算是可验证的状态变换', en: 'Computation is a verifiable state transformation' },
        body: {
          zh: '计算首先规定一个可重复的输入—输出实验：制备某个编码状态，施加控制，再按预先定义的测量规则产生经典记录。量子态可以是纯态，也可以是混态；实验真正比较的是给定状态下各测量结果的概率，而不是“是否存在两个能级”。因此计算空间、泄漏态和原子损失后的真空态必须一起进入结果分类。若只保留成功样本，任何损失或泄漏都会被后选择移出统计量，保真度就不再描述实际计算过程。',
          en: 'Computation first specifies a repeatable input-output experiment: prepare an encoded state, apply controls and generate a classical record under a predeclared measurement rule. A quantum state may be pure or mixed; the laboratory compares probabilities of measurement outcomes, not the mere existence of two energy levels. The computational space, leakage states and vacuum after atom loss must therefore all enter the outcome classifier. If only successful shots are retained, loss and leakage leave the statistic through postselection and the reported fidelity no longer describes the computation.',
        },
        equation: String.raw`p(m|\rho)=\operatorname{Tr}(E_m\rho),\qquad \sum_m E_m=\mathbb I`,
        equationNote: {
          zh: '该式把“输出可判定”写成可检验对象：ρ 是制备后、测量前的密度算符；{E_m} 是包含计算态、泄漏和真空结果的 POVM；p(m|ρ) 是重复实验中结果 m 的概率。它不假设状态纯净，也不描述门如何实现。',
          en: 'This writes decidable output as a testable object: rho is the density operator before measurement; {E_m} is a POVM that includes computational, leakage and vacuum outcomes; p(m|rho) is the repeated-trial probability of result m. It assumes neither a pure state nor a gate implementation.',
        },
        research: researchDetails['state-measurement'],
      },
      {
        id: 'divincenzo-criteria',
        title: { zh: 'DiVincenzo 准则检查物理接口', en: 'The DiVincenzo criteria test the physical interfaces' },
        body: {
          zh: 'DiVincenzo 将“能否计算”落实为五项处理器条件；原文另列两项量子通信条件，本图谱在这里讨论的是单台量子处理器必须同时具备的五项。它们不是评分表：缺少任一项，其他四项的最佳指标也不能组成可执行的通用计算。它们更不是容错阈值或平台排名。对原子阵列而言，证据必须来自同一可重复周期中的状态定义、制备、控制和读出记录，而不能由不同实验日的单项最佳数字拼接。',
          en: 'DiVincenzo turns the question of computability into five processor requirements; the original paper separately gives two requirements for quantum communication, while this atlas treats the five required for one quantum processor. They are not a scorecard: without any one of them, the best values of the other four do not compose into executable universal computation. They are neither a fault-tolerance threshold nor a platform ranking. For an atom array, evidence must come from state definition, preparation, control and readout records within one repeatable cycle, not from isolated best numbers on different days.',
        },
        keyPoints: [
          {
            title: { zh: '可扩展且可表征的量子比特', en: 'Scalable, well-characterized qubits' },
            body: { zh: '必须给出计算子空间、泄漏与损失结果、站点差异和串扰的定义；“原子相同”不能替代这些表征。', en: 'Define the computational space, leakage and loss outcomes, site variation and crosstalk; atomic identity does not replace characterization.' },
          },
          {
            title: { zh: '初始化到简单基准态', en: 'Initialization to a fiducial state' },
            body: { zh: '制备应把阵列带到已知输入，并报告残余占据、误分类和复位失败；否则算法输入本身不确定。', en: 'Preparation must create a known input and report residual population, misclassification and reset failure; otherwise the algorithm begins from an unknown state.' },
          },
          {
            title: { zh: '相关相干时间长于操作时间', en: 'Relevant coherence exceeds operation time' },
            body: { zh: '比较对象是完整门、测量、移动和反馈周期中的退相干，而不是脱离控制条件的一条 T2 数字。', en: 'Compare decoherence over complete gates, measurement, motion and feedback, rather than one T2 value detached from operating conditions.' },
          },
          {
            title: { zh: '通用门集', en: 'A universal gate set' },
            body: { zh: '任意单比特控制还不够；必须有可组合的纠缠门，并验证相位、泄漏和重复门误差。', en: 'Arbitrary single-qubit control is insufficient; a composable entangling gate is required, with phase, leakage and repeated-gate error verified.' },
          },
          {
            title: { zh: '指定量子比特的测量', en: 'Qubit-specific measurement' },
            body: { zh: '读出必须把目标量子比特映射为可校准记录；纠错还会额外要求中途测量、复位和经典反馈的时序。', en: 'Readout must map each target qubit to a calibrated record; QEC additionally imposes timing requirements on mid-circuit measurement, reset and classical feedback.' },
          },
        ],
      },
      {
        id: 'entanglement-error-correction',
        title: { zh: '通用性需要条件动力学', en: 'Universality requires conditional dynamics' },
        body: {
          zh: '第四项准则中的“通用门集”有一个不可替代的多体条件：任意单比特旋转仍可写成各比特的独立演化，不能产生纠缠。两原子门必须通过状态依赖相互作用使联合传播子不可分解，从而把一个比特的信息写进另一个比特的相位。真值表只检验布居映射；条件相位、Bell 奇偶、计算子空间泄漏和重复门增长才检验相干的双体作用。通用性说明算法可编译，容错实现还要限制单个故障在纠错完成前的传播。',
          en: 'The universal-gate requirement contains an irreducible many-body condition: arbitrary single-qubit rotations still factor into independent evolutions and cannot create entanglement. A two-atom gate must use a state-dependent interaction so that the joint propagator cannot factor, writing one qubit into another qubit phase. A truth table tests population mapping only; conditional phase, Bell parity, computational-subspace leakage and repeated-gate growth test coherent two-body action. Universality makes algorithms compilable; fault tolerance additionally limits how one fault spreads before correction.',
        },
        equation: String.raw`U_{AB}\ne U_A\otimes U_B`,
        equationNote: {
          zh: 'UAB 是两量子比特在一次门后的联合传播子；U_A 与 U_B 是各自的单比特传播子。联合演化若能写成 U_A⊗U_B，就没有产生纠缠；不可分解并不自动证明门正确，但它给出纠缠门必须满足的结构条件。条件相位和奇偶测量再检验该条件是否以目标方式实现。',
          en: 'UAB is the joint two-qubit propagator after one gate, while U_A and U_B are the single-qubit propagators. If joint evolution factors as U_A tensor U_B, it cannot create entanglement; non-factorization does not itself prove a correct gate, but it is the structural requirement for one. Conditional-phase and parity measurements then test whether that condition is realized as intended.',
        },
      },
      {
        id: 'computation-stack',
        title: { zh: '可扩展性由重复纠错周期决定', en: 'Scalability is decided by the repeated correction cycle' },
        body: {
          zh: 'DiVincenzo 准则仍不足以证明可扩展容错。硬件必须把制备、通用门、移动、测量、复位、经典反馈和必要的补原子组合为重复纠错周期；波形成为原子控制，物理故障成为电路级通道，测量记录进入解码器，最终才得到逻辑错误率。只有当增加码距能持续压低每周期逻辑错误，并且周期时间与资源开销仍可承受时，“更多物理量子比特”才转化为“更可靠的计算”。',
          en: 'The DiVincenzo criteria alone do not establish scalable fault tolerance. Hardware must compose preparation, a universal gate set, motion, measurement, reset, classical feedback and atom replacement into repeated correction cycles. Waveforms become atomic controls, physical faults become a circuit-level channel, measurement records enter a decoder, and only then does a logical error rate emerge. More physical qubits become more reliable computation only when increasing code distance continues to suppress logical error per cycle at tolerable cycle time and resource overhead.',
        },
      },
    ],
  },
  {
    id: 'neutral-atoms',
    number: 2,
    title: { zh: '为什么选择中性原子', en: 'Why choose neutral atoms' },
    shortTitle: { zh: '中性原子', en: 'Neutral atoms' },
    question: { zh: '在同一纠错任务下，中性原子相对超导、离子阱和光子路线解决了什么，又把代价移到了哪里？', en: 'For the same correction task, what do neutral atoms gain over superconducting, trapped-ion and photonic routes, and where do they move the cost?' },
    sections: [
      {
        id: 'cool-trap-image',
        title: { zh: '先固定比较任务', en: 'Fix the task before comparing platforms' },
        body: {
          zh: '平台比较必须固定算法规模、逻辑错误目标、量子码、门集和墙钟时间，再比较完成同一任务所需的物理量子比特、纠错周期、控制带宽与维护资源。超导、离子阱、光子和中性原子的论文保真度常采用不同的损失、SPAM 与后选择口径，不能直接排成榜单。真正的判据是完整周期能否提供初始化、相干、通用控制、测量、复位和译码记录，并在扩码后降低每次逻辑操作的失败概率。',
          en: 'A platform comparison must fix algorithm size, target logical error, code, gate set and wall-clock deadline, then compare physical qubits, correction cycles, control bandwidth and maintenance required for that same task. Published fidelities for superconducting, trapped-ion, photonic and neutral-atom systems often use different conventions for loss, SPAM and postselection, so they do not form a ranking. The relevant test is whether the full cycle supplies initialization, coherence, universal control, measurement, reset and decoder records while lowering failure per logical operation as the code grows.',
        },
      },
      {
        id: 'rydberg-interaction',
        title: { zh: '中性原子的核心交换：静置隔离，按需耦合', en: 'The neutral-atom exchange: isolated storage, switched coupling' },
        body: {
          zh: '同一同位素的原子不需要逐器件制造，光镊阵列可用成像与重排得到规则几何。基态原子相互作用弱，利于存储；短暂激发到 Rydberg 态后，强相互作用把双激发推离共振并产生条件相位，实现“静置时隔离、门期间耦合”。阵列几何还能在算法阶段之间改变连接关系。代价是随机装载、原子损失、运动加热、激光相位与强度不均匀，以及 Rydberg 态衰变都进入纠错周期；天然相同的原子并不等于天然相同的站点控制。',
          en: 'Atoms of one isotope need not be fabricated device by device, and imaging plus rearrangement can produce regular tweezer geometries. Ground-state atoms interact weakly for storage; brief Rydberg excitation shifts the doubly excited state and generates a conditional phase, giving isolation while idle and coupling during a gate. Array geometry can also change between algorithmic stages. The exchange is stochastic loading, atom loss, motional heating, laser phase and intensity inhomogeneity, and Rydberg decay inside the correction cycle. Identical atoms do not imply identical site controls.',
        },
        equation: String.raw`V(R)=\frac{C_6}{R^6},\qquad R_b=\left(\frac{|C_6|}{\hbar\Omega}\right)^{1/6}`,
        equationNote: {
          zh: 'V(R) 是两原子同时进入目标 Rydberg 态时、相距 R 所产生的范德瓦耳斯能移；C6 是该选定原子态与角动量通道的色散系数。Rb 由 |V|=ℏΩ 定义，Ω 是有效 Rydberg 驱动角频率。该近似要求远离 Förster 共振并忽略角度、多通道与运动平均；实际门需用双原子谱测得的 V(R,θ) 校验。',
          en: 'V(R) is the van der Waals energy shift when two atoms separated by R occupy the selected Rydberg state; C6 belongs to that atomic state and angular channel. Rb is defined by |V| = hbar Omega, with Omega the effective Rydberg-drive angular frequency. This approximation assumes detuning from Förster resonances and neglects angular, multichannel and motional averaging; an actual gate requires pair-spectroscopy data for V(R,theta).',
        },
        research: researchDetails['cool-trap-image'],
      },
      {
        id: 'reconfigurable-connectivity',
        title: { zh: '其他路线把难题放在不同位置', en: 'Other platforms place the difficulty elsewhere' },
        body: {
          zh: '超导电路提供快速门和芯片级控制，但固定耦合图、低温布线、频率拥挤与器件离散性随规模进入系统预算。离子阱以长相干和高保真控制见长，共享运动模带来强连接性，但门速率、链长模式拥挤和跨区运输限制吞吐。光子适合传输、室温传播和模块互连，却必须用测量、复用或非线性资源弥补确定性两比特相互作用与长寿命存储的不足。中性原子位于这些交换之间：它以光学装载、移动和 Rydberg 控制复杂度换取阵列规模、可重构连接与并行全局操作。',
          en: 'Superconducting circuits offer fast gates and chip-level control, while fixed coupling graphs, cryogenic wiring, frequency crowding and device variation enter the scaling budget. Trapped ions combine long coherence with high-fidelity control and strong connectivity through shared motion, but gate rate, mode crowding in long chains and inter-zone transport constrain throughput. Photons suit transmission, room-temperature propagation and modular links, while measurement, multiplexing or nonlinear resources must supply deterministic entanglement and long-lived storage. Neutral atoms occupy a different exchange: optical loading, motion and Rydberg-control complexity buy array size, reconfigurable connectivity and parallel global operations.',
        },
      },
      {
        id: 'shot-cycle',
        title: { zh: '中性原子优势是任务相关的', en: 'The neutral-atom advantage is task dependent' },
        body: {
          zh: '当目标量子码能利用移动连接、区分存储区与纠缠区、并用并行脉冲作用于整个逻辑块时，中性原子的物理布局可减少路由与控制线开销；当重排、成像或补原子拉长综合征周期，存储误差和停机时间会抵消这种收益。因此应在固定任务与同一损失口径下比较每逻辑门的原子数、纠错轮数、周期时间和可用率。平台排序不能脱离任务；结论只对给定约束下的系统设计成立。',
          en: 'When a code can exploit transport connectivity, separate storage and entangling zones, and apply parallel pulses across logical blocks, neutral-atom geometry can reduce routing and control-line overhead. When rearrangement, imaging or replacement lengthens syndrome cycles, memory error and downtime can erase that gain. Comparisons must therefore hold the task and loss convention fixed while reporting atoms per logical gate, correction rounds, cycle time and availability. There is no task-independent best platform, only a system design that wins under stated constraints.',
        },
      },
    ],
  },
  {
    id: 'why-yb',
    number: 3,
    title: { zh: '为什么在中性原子中选择 171Yb', en: 'Why choose 171Yb among neutral atoms' },
    shortTitle: { zh: 'Yb 平台', en: 'Yb platform' },
    question: { zh: '在相同编码与纠错周期口径下，171Yb 相对 Rb、Cs 和 Sr 的接口组合何时产生净收益？', en: 'Under the same encoding and correction-cycle conventions, when does the 171Yb interface bundle yield a net benefit over Rb, Cs and Sr?' },
    sections: [
      {
        id: 'two-electron-structure',
        title: { zh: '先比较功能链，而不是元素名称', en: 'Compare the functional chain, not element names' },
        body: {
          zh: '原子物种必须在同一编码、阵列间距、门并行度、损失定义和纠错周期下比较。功能链依次要求装载与冷却、低噪声存储、单比特控制、Rydberg 纠缠、局域读出、复位和故障标记；某条跃迁的线宽或一次门保真度不能代表整条链。选择 171Yb 的论据不是“镱原子更好”，而是它能否以可接受的激光、偏振和标定复杂度，把互相冲突的存储、门与读出任务分配给不同电子流形。',
          en: 'Atomic species must be compared at fixed encoding, array spacing, gate parallelism, loss convention and correction cycle. The functional chain requires loading and cooling, quiet storage, single-qubit control, Rydberg entanglement, local readout, reset and fault flags. One transition linewidth or one gate fidelity cannot represent the chain. The case for 171Yb is not that ytterbium is generically better, but that distinct electronic manifolds may divide conflicting storage, gate and readout duties at acceptable laser, polarization and calibration complexity.',
        },
        research: researchDetails['qubit-encodings'],
      },
      {
        id: 'qubit-encodings',
        title: { zh: 'Rb 与 Cs：成熟的碱金属路线', en: 'Rb and Cs: mature alkali routes' },
        body: {
          zh: '87Rb 与 133Cs 通常把量子比特编码在基态超精细“钟”态，并通过成熟的微波、Raman 与双光子 Rydberg 工具链完成控制。优势是器件、波长和实验经验丰富，且超精细态直接提供长寿命存储；限制是同一单价电子结构承担冷却、读出、存储和门接口，非计算态泄漏与 Rydberg 衰变未必自动留下可区分标记。Rb 与 Cs 之间仍要按散射、Rydberg 缺陷、激光可达性和目标门方案逐项选择，不能用“碱金属”一项概括。',
          en: '87Rb and 133Cs commonly encode qubits in ground-state hyperfine clock states and use mature microwave, Raman and two-photon Rydberg toolchains. Components, wavelengths and experimental practice are well developed, and hyperfine states supply long-lived storage. The same single-valence-electron structure, however, carries cooling, readout, storage and gate interfaces, while leakage and Rydberg decay need not leave an automatically distinguishable flag. Rb and Cs must still be selected by scattering, Rydberg defects, laser access and the target gate scheme rather than treated as one generic alkali option.',
        },
      },
      {
        id: 'species-comparison',
        title: { zh: 'Sr 与 Yb：双电子结构提供职责分离', en: 'Sr and Yb: two-electron structure separates roles' },
        body: {
          zh: 'Sr 与 Yb 的 1S0 基态、3P0 亚稳钟态、3P1 窄线态和 1P1 强跃迁可分别承担存储、相干映射、冷却与成像。费米同位素再提供核自旋子空间，使电子角动量为零的流形可降低一阶电子磁矩敏感性。171Yb 的 I=1/2 给出最小的两投影核自旋空间，减少旁路超精细态；87Sr 的 I=9/2 提供更大的核自旋流形，可支持更丰富编码，也增加光抽运和泄漏管理。Yb 是否优于 Sr 取决于目标编码、Rydberg 通道、可用激光和错误标记协议。',
          en: 'In Sr and Yb, the 1S0 ground state, metastable 3P0 clock state, narrow 3P1 line and strong 1P1 transition can divide storage, coherent mapping, cooling and imaging. Fermionic isotopes add a nuclear-spin subspace, while zero electronic angular momentum in the clock manifolds suppresses first-order electronic magnetic sensitivity. 171Yb has I=1/2 and a minimal pair of nuclear-spin projections, reducing spectator hyperfine states. 87Sr has I=9/2, enabling richer encodings but adding optical-pumping and leakage-management structure. Whether Yb beats Sr depends on encoding, Rydberg route, available lasers and fault-flag protocol.',
        },
      },
      {
        id: 'isotope-strategy',
        title: { zh: '171Yb 的纠错优势是条件命题', en: 'The 171Yb QEC advantage is conditional' },
        body: {
          zh: '171Yb 可把量子信息存入 1S0 或 3P0 的核自旋投影，并利用流形选择性检测把部分衰变或泄漏转成已知位置的擦除。已知位置错误通常比未知 Pauli 错误更易被量子码纠正，但净收益只在四个条件同时成立时出现：可标记错误占比足够高，误报与漏报足够低，未标记的残余 Pauli 及相关错误受控，检测与复位增加的散射和周期时延小于解码收益。Yb 提供的是重塑错误通道的接口，容错性仍须由完整周期的逻辑错误率验证。',
          en: '171Yb can store information in nuclear-spin projections of 1S0 or 3P0 and use manifold-selective detection to convert some decay or leakage into located erasures. Located faults are generally easier for a code to correct than unknown Pauli faults, but a net gain requires four conditions: a sufficiently large flaggable fraction, low false positives and false negatives, controlled residual Pauli and correlated errors, and detection plus reset scattering and cycle latency smaller than the decoding benefit. Yb supplies an interface for reshaping the error channel, not intrinsic fault tolerance; the claim must be validated by logical error per complete cycle.',
        },
        research: researchDetails['erasure-conversion'],
      },
    ],
  },
  {
    id: 'gates',
    number: 4,
    title: { zh: '从原子能级到量子门', en: 'From atomic levels to quantum gates' },
    shortTitle: { zh: 'Rydberg 门', en: 'Rydberg gates' },
    question: { zh: '如何把光场相位变成受控的两比特相位？', en: 'How does optical phase become a controlled two-qubit phase?' },
    sections: [
      {
        id: 'single-atom-hamiltonian',
        title: { zh: '旋转框架中的单原子模型', en: 'Single-atom model in the rotating frame' },
        body: {
          zh: '选定计算态与 Rydberg 态后，激光振幅、相位和失谐决定旋转框架中的有效哈密顿量。Rabi 频率包含电场振幅、跃迁偶极矩和角动量系数，因此同一个激光功率不能跨跃迁直接比较。旋转波近似丢弃快速反旋项，其有效性由载频与耦合、失谐的尺度分离决定；强驱动或多能级近简并时必须回到更完整模型。',
          en: 'After choosing a computational state and a Rydberg state, laser amplitude, phase and detuning determine the effective rotating-frame Hamiltonian. The Rabi frequency contains electric-field amplitude, transition dipole matrix elements and angular coefficients, so equal optical power is not directly comparable across transitions. The rotating-wave approximation removes rapidly oscillating counter-rotating terms and is controlled by scale separation between carrier frequency, coupling and detuning; strong drive or nearby multilevel structure requires a larger model.',
        },
        equation: String.raw`H_1/\hbar=\frac{\Omega(t)}{2}\left(e^{i\phi(t)}|r\rangle\langle1|+\mathrm{h.c.}\right)-\Delta(t)|r\rangle\langle r|`,
        equationNote: {
          zh: '这是旋转波近似和旋转框架下的两能级有效哈密顿量：|1⟩ 是被耦合的计算态，|r⟩ 是指定 Rydberg 态；Ω(t)、φ(t)、Δ(t) 分别是原子面 Rabi 角频率、驱动相位与失谐。它用于把可校准的光学波形映射到单原子传播子；强驱动、邻近多能级或快速相位调制时必须扩大模型。',
          en: 'This is the two-level effective Hamiltonian in a rotating frame and rotating-wave approximation: |1> is the coupled computational state, |r> the selected Rydberg state, and Omega(t), phi(t), Delta(t) are atom-plane Rabi angular frequency, drive phase and detuning. It maps calibrated optical waveforms to a one-atom propagator; strong drive, nearby multilevel structure or rapid phase modulation require a larger model.',
        },
      },
      {
        id: 'controlled-phase',
        title: { zh: '阻塞条件相位', en: 'Blockade controlled phase' },
        body: {
          zh: '两原子同时被驱动时，单激发对称态以增强的 Rabi 频率参与演化，而双 Rydberg 态被相互作用能移推离共振。门的目标不是简单阻止双激发，而是让四个计算基态在门末回到计算子空间并积累正确的相对相位。传统 π–2π–π 序列给出直观图像，现代高保真门通常连续调制相位、振幅或失谐以减少 Rydberg 占据和参数敏感性。',
          en: 'When two atoms are driven, the symmetric singly excited state evolves with an enhanced Rabi frequency while the doubly excited Rydberg state is shifted out of resonance by interactions. The gate objective is not merely to prevent double excitation, but to return all four computational basis states to the computational subspace with the correct relative phase. The conventional pi–2pi–pi sequence is intuitive; modern high-fidelity gates often shape phase, amplitude or detuning continuously to reduce Rydberg population and parameter sensitivity.',
        },
        equation: String.raw`H=H_1^{(a)}+H_1^{(b)}+\hbar V|rr\rangle\langle rr|`,
        equationNote: {
          zh: 'Ha 与 Hb 是两颗原子各自的受驱动哈密顿量；最后一项只在 |rr⟩ 双激发态上加入相互作用能 ℏV。阻塞门依赖 |V| 显著大于驱动带宽，使双激发失谐并留下可控条件相位。该最小模型不包含自发辐射、Doppler、旁观态或空间相关噪声；这些必须以主方程或电路级通道补入。',
          en: 'Ha and Hb are the driven Hamiltonians of the two atoms, while the final term adds interaction energy hbar V only to the double excitation |rr>. A blockade gate relies on |V| being large compared with the drive bandwidth so double excitation is detuned and a controlled phase remains. This minimal model omits spontaneous emission, Doppler shifts, spectator states and spatially correlated noise, which must enter through a master equation or circuit-level channel.',
        },
        research: researchDetails['controlled-phase'],
      },
      {
        id: 'gate-metrics',
        title: { zh: '门指标必须锁定定义', en: 'Gate metrics require locked definitions' },
        body: {
          zh: '平均门保真度、Bell 态保真度、随机基准测试结果和条件于存活的保真度并不等价。实验报告必须说明损失是否计入错误、泄漏如何处理、单比特相位是否事后修正以及 SPAM 是否扣除。理论模型也应从同一个通道同时输出计算子空间保真度、泄漏、损失和条件相位，否则不同脉冲或平台间的比较会产生系统性偏差。',
          en: 'Average gate fidelity, Bell-state fidelity, randomized-benchmarking results and survival-conditioned fidelity are not equivalent. Reports must state whether atom loss counts as error, how leakage is treated, whether local phases are corrected and whether SPAM is removed. A theoretical model should output computational fidelity, leakage, loss and conditional phase from the same channel; otherwise pulse and platform comparisons acquire systematic bias.',
        },
      },
      {
        id: 'gate-acceptance-suite',
        title: { zh: '双比特门的分层验收', en: 'Layered acceptance of a two-qubit gate' },
        body: {
          zh: '门验收应从单原子 Rabi 与失谐扫描开始，再检查双原子阻塞、受控相位、Bell 态和重复门序列。真值表定位布居错误，Ramsey 型序列恢复条件相位，Bell 奇偶振荡检验纠缠，相互交错随机基准或循环基准估计平均通道误差；同时必须单列损失、泄漏、擦除标记和 SPAM。跨天、跨站点和不同并行密度的重复结果，通常比单次最佳数据更能说明门是否可用于系统。',
          en: 'Gate acceptance should begin with single-atom Rabi and detuning scans, then proceed through two-atom blockade, conditional phase, Bell-state preparation and repeated-gate sequences. Truth tables locate population errors, Ramsey-type sequences recover conditional phase, Bell parity oscillations test entanglement, and interleaved randomized or cycle benchmarking estimates average channel error. Loss, leakage, erasure flags and SPAM must remain separate. Repetition across days, sites and parallel-gate densities is usually more informative for system readiness than one best data set.',
        },
      },
    ],
  },
  {
    id: 'experiment',
    number: 5,
    title: { zh: '从真空系统到门标定', en: 'From vacuum system to gate calibration' },
    shortTitle: { zh: '实验系统', en: 'Experiment' },
    question: { zh: '哪些工程闭环决定一个 Yb 阵列能否稳定运行？', en: 'Which engineering loops determine stable Yb-array operation?' },
    sections: [
      {
        id: 'vacuum-laser',
        title: { zh: '真空、原子源与激光基础设施', en: 'Vacuum, atom source and laser infrastructure' },
        body: {
          zh: '实验从超高真空、可控 Yb 原子通量和稳定磁场开始。真空设计必须兼顾泵速、烘烤、光学通道和未来维护；原子炉温度与准直决定装载速率和污染负担。399、556、578 与紫外 Rydberg 光路具有完全不同的线宽、功率和材料要求，因此锁频、倍频、光纤传输和安全联锁应作为独立子系统验收，而不是在原子装载后一次调通。',
          en: 'The experiment begins with ultrahigh vacuum, controlled Yb flux and a stable magnetic environment. Vacuum design must balance pumping speed, bakeout, optical access and maintainability; oven temperature and collimation set both loading rate and contamination. The 399, 556, 578 nm and ultraviolet Rydberg paths have very different linewidth, power and material requirements, so frequency locks, conversion stages, fiber delivery and safety interlocks should be accepted as separate subsystems rather than debugged only after atom loading.',
        },
        research: researchDetails['vacuum-laser'],
      },
      {
        id: 'control-calibration',
        title: { zh: '控制、同步与校准链', en: 'Control, timing and calibration chain' },
        body: {
          zh: '相机、AOD、AOM、EOM、微波、线圈和激光脉冲必须共享可追溯时钟。FPGA 或实时控制器负责确定性触发，AWG 提供模拟波形，软件层管理扫描、元数据和反馈。校准顺序应从光功率与频率到光阱深度、温度、磁场、Rabi 频率、AC Stark、串扰和两原子相互作用逐级推进；跳过前级会把漂移错误错误归因于门脉冲。',
          en: 'Cameras, AODs, AOMs, EOMs, microwaves, coils and laser pulses must share a traceable timing reference. An FPGA or real-time controller provides deterministic triggers, an AWG supplies analog waveforms, and software manages scans, metadata and feedback. Calibration should proceed from optical power and frequency through trap depth, temperature, magnetic field, Rabi rate, AC Stark shift, crosstalk and two-atom interaction. Skipping an upstream layer misattributes drift to the gate pulse.',
        },
        research: researchDetails['control-calibration'],
      },
      {
        id: 'acceptance-operations',
        title: { zh: '验收指标与运行周期', en: 'Acceptance metrics and operating cycle' },
        body: {
          zh: '每个子系统都需要可记录的通过条件，例如基压与寿命、锁频 Allan 偏差、陷阱频率、成像保真度、重排成功率、相干时间和门误差分解。完整周期包括装载、成像、重排、冷却、制备、门、读出和补原子，任何单次高保真结果若不能在该周期中重复都不足以支撑系统结论。建设周期应以依赖范围表达，而不承诺脱离采购与加工条件的固定日期。',
          en: 'Every subsystem needs a recorded acceptance criterion: base pressure and lifetime, lock Allan deviation, trap frequency, imaging fidelity, rearrangement success, coherence time and decomposed gate error. A full cycle includes loading, imaging, rearrangement, cooling, preparation, gates, readout and replacement. A single high-fidelity result that cannot repeat inside this cycle does not establish system performance. Build schedules should be expressed as dependency ranges rather than fixed dates detached from procurement and fabrication constraints.',
        },
      },
      {
        id: 'operations-calendar',
        title: { zh: '从建设周期到日常运行', en: 'From build schedule to daily operations' },
        body: {
          zh: '实验室周期应区分基础设施建设、子系统验收、原子联调、门标定和连续运行。每天记录锁频余量、功率、原子数、温度与成像直方图；每周复测波前、磁场、Rabi 均匀性和时序延迟；真空开腔、UV 光路维护或软件升级后执行完整回归。所有数据必须关联参数版本、代码版本、设备序列号和环境状态。安全联锁、备件、校准服务与供应周期同样属于实验设计，而不是项目后期的行政附录。',
          en: 'Laboratory planning should distinguish infrastructure construction, subsystem acceptance, atom-level integration, gate calibration and sustained operation. Daily records should include lock margin, optical power, atom number, temperature and imaging histograms; weekly checks should revisit wavefronts, magnetic fields, Rabi uniformity and timing latency; vacuum access, UV-path service or software upgrades should trigger a full regression. Every data set must link parameter, code and device versions with environmental state. Safety interlocks, spares, calibration services and lead times are part of experimental design rather than late administrative details.',
        },
      },
    ],
  },
  {
    id: 'theory-experiment-loop',
    number: 6,
    title: { zh: '理论如何服务实验落地', en: 'How theory enables experimental delivery' },
    shortTitle: { zh: '理论闭环', en: 'Theory loop' },
    question: { zh: '怎样使模型成为可证伪的实验工具，而不是拟合装饰？', en: 'How does a model become a falsifiable laboratory tool rather than decorative fitting?' },
    sections: [
      {
        id: 'model-hierarchy',
        title: { zh: '分层模型与参数锁定', en: 'Model hierarchy and parameter locking' },
        body: {
          zh: '有效两能级模型用于解释脉冲面积和相位，多能级单原子模型处理选择定则与旁路耦合，两原子张量模型描述 Rydberg 相互作用，Lindblad 或随机模型加入开放系统效应。每提高一层，所需参数和可验证观测都必须增加。不能用候选耦合系数和缺失的 Vijkl 张量做 Methods 级复现；此时正确输出是灵敏度范围和缺失数据清单。',
          en: 'An effective two-level model explains pulse area and phase, a multilevel single-atom model treats selection rules and spectator coupling, a two-atom tensor model describes Rydberg interactions, and Lindblad or stochastic models add open-system effects. Every increase in model level must bring additional parameters and observables. Candidate coupling coefficients and a missing Vijkl tensor cannot support a Methods-level reproduction; the correct output is a sensitivity envelope and a missing-data register.',
        },
      },
      {
        id: 'inverse-problem',
        title: { zh: '从测量反演到误差预算', en: 'From inverse problems to error budgets' },
        body: {
          zh: '理论首先把可测谱线、Rabi/Ramsey 曲线、温度、寿命和关联数据映射为哈密顿量与噪声参数，再预测尚未测量的工作区间。误差预算必须避免重复计数：Doppler 既改变相干传播子，也可能通过平均形成退相干；原子损失、泄漏和探测失败也应按实验判据区分。模型最有价值的输出通常是下一项最能区分假设的测量，而不是单个最优拟合值。',
          en: 'Theory first maps measured spectra, Rabi and Ramsey traces, temperature, lifetime and correlation data into Hamiltonian and noise parameters, then predicts unmeasured operating regimes. Error budgets must avoid double counting: Doppler shifts alter coherent propagation and ensemble averaging can look like dephasing; loss, leakage and detection failure must also follow experimental decision rules. The most valuable model output is often the next measurement that best discriminates hypotheses, not a single best-fit value.',
        },
        research: researchDetails['inverse-problem'],
      },
      {
        id: 'robust-control',
        title: { zh: '鲁棒控制与实验约束', en: 'Robust control under laboratory constraints' },
        body: {
          zh: '最优控制不只是让无噪声传播子接近 CZ。目标函数还要惩罚泄漏、带宽、幅度、相位跳变、光功率和噪声谱重叠，并在温度、失谐、Rabi 不均匀与相互作用波动上评估分布。可实现脉冲必须保存完整优化轨迹、硬件滤波后的波形和失败候选；否则实验无法判断性能来自物理鲁棒性还是数值偶然。',
          en: 'Optimal control is more than matching a noiseless propagator to CZ. The objective must penalize leakage, bandwidth, amplitude, phase discontinuity, optical power and overlap with measured noise spectra, while evaluating distributions of temperature, detuning, Rabi inhomogeneity and interaction variation. An implementable pulse must retain optimization history, hardware-filtered waveforms and informative failures; otherwise the laboratory cannot distinguish physical robustness from numerical accident.',
        },
        equation: String.raw`\mathcal{J}=1-F+\lambda_LP_{\rm leak}+\lambda_S\!\int|\dot u|^2dt+\lambda_R\!\int S(\omega)R(\omega)d\omega`,
        equationNote: {
          zh: 'J 是用于脉冲优化的目标函数，不是实验测得的门误差。F 是相对于目标门的过程保真度或经明确选择的等价指标；Pleak 是规定终态集合外的泄漏概率；u(t) 是控制波形；S(ω) 与 R(ω) 分别是实测噪声谱和控制滤波响应；λL、λS、λR 是无量纲权重。该式只有在保真度定义、硬件带宽和噪声谱均被锁定后才能比较候选脉冲。',
          en: 'J is a pulse-optimization objective, not an experimentally measured gate error. F is process fidelity to the target gate or a declared equivalent metric; Pleak is probability outside a specified final-state set; u(t) is the control waveform; S(omega) and R(omega) are the measured noise spectrum and control filter response; lambdaL, lambdaS and lambdaR are dimensionless weights. Candidate pulses are comparable only after the fidelity convention, hardware bandwidth and noise spectrum are fixed.',
        },
      },
      {
        id: 'theory-delivery-contract',
        title: { zh: '理论工作的可交付合同', en: 'The delivery contract for theory' },
        body: {
          zh: '能服务实验的理论交付物至少包括：带来源与单位的参数表、明确基底和近似的可执行模型、与原始数据对应的拟合脚本、参数不确定度传播、可观测量预测、敏感度排序以及下一项判别性测量。模型版本必须说明哪些量已由独立实验锁定、哪些来自联合拟合、哪些只是候选值。理论组还应提供硬件约束下的波形、允许的校准漂移和失效判据，使实验组能够复现、拒绝或更新结论。',
          en: 'Theory that serves an experiment should deliver at least a parameter table with sources and units, an executable model with explicit basis and approximations, fit scripts linked to raw data, propagated parameter uncertainty, observable predictions, ranked sensitivities and the next discriminating measurement. Each model version must state which quantities are independently locked, jointly fitted or merely candidate values. The theory team should also provide hardware-constrained waveforms, allowed calibration drift and failure criteria so the laboratory can reproduce, reject or update the conclusions.',
        },
      },
    ],
  },
  {
    id: 'fault-tolerance',
    number: 7,
    title: { zh: '通用容错如何转化为规模与成本', en: 'How universal fault tolerance becomes scale and cost' },
    shortTitle: { zh: '容错路线', en: 'Fault tolerance' },
    question: { zh: '什么证据能把通用门集、纠错周期、逻辑缩放和低成本可信结果连成同一结论？', en: 'What evidence connects a universal gate set, correction cycles, logical scaling and low cost per trustworthy result?' },
    sections: [
      {
        id: 'erasure-conversion',
        title: { zh: '通用计算不等于容错计算', en: 'Universal computation is not fault-tolerant computation' },
        body: {
          zh: '通用门集保证任意目标幺正可被逼近，却没有限制故障如何传播。容错实现必须把量子信息编码到多个物理量子比特，使单点故障经过制备、门、测量和反馈后仍落在量子码可纠正范围内；非 Clifford 逻辑还需要容错注入、传态或等价资源，不能只统计 Clifford 稳定子循环。阈值定理给出的是条件性缩放：在指定噪声、码和调度下，物理错误低于相应阈值时，增加编码资源才可能持续压低逻辑错误。',
          en: 'A universal gate set can approximate any target unitary but does not constrain fault propagation. A fault-tolerant implementation encodes information across physical qubits so that one fault through preparation, gates, measurement and feedback remains within the code capacity. Non-Clifford logic also requires fault-tolerant injection, teleportation or an equivalent resource; Clifford stabilizer cycles alone are not universal execution. Threshold theorems give conditional scaling: for a specified noise model, code and schedule, additional encoding can keep suppressing logical error only when physical noise is below the corresponding threshold.',
        },
      },
      {
        id: 'channel-bridge',
        title: { zh: '从物理机制到逻辑错误率', en: 'From physical mechanism to logical error rate' },
        body: {
          zh: '论证链必须保持可追溯：物理机制产生门级故障，门级故障在综合征电路中形成带时空相关的电路级通道，测量与标记构成解码器记录，解码器输出恢复操作或 Pauli 帧，重复实验才给出每周期或每逻辑门的逻辑错误率。总保真度会混合 Pauli、相干偏置、泄漏、擦除和原子损失，不能直接输入阈值结论。通道映射还必须保留误报、漏报、串扰和条件化口径，否则模拟得到的是另一个系统。',
          en: 'The argument must remain traceable: a physical mechanism produces gate-level faults; those faults form a spatiotemporally correlated circuit-level channel in the syndrome circuit; measurements and flags form the decoder record; the decoder returns a recovery or Pauli frame; repeated trials finally yield logical error per cycle or logical gate. Aggregate fidelity mixes Pauli error, coherent bias, leakage, erasure and atom loss and cannot directly support a threshold claim. Channel mapping must also preserve false positives, false negatives, crosstalk and conditioning conventions, or the simulation describes a different machine.',
        },
        equation: String.raw`\mathcal{N}=(1-p_e-p_p-p_l)\mathcal{I}+p_e\mathcal{E}_{e}+p_p\mathcal{E}_{p}+p_l\mathcal{E}_{l}`,
        equationNote: {
          zh: 'N 是一次门或一次周期交给电路模拟器的有效量子通道；I 表示无故障演化，Ee、Ep、El 分别表示已标记擦除、计算子空间内 Pauli 类故障和泄漏/损失后的条件通道，pe、pp、pl 是与这些定义一致的概率。它是便于说明的混合模型：若故障具有相干偏置、时间相关或标签混淆，就必须扩展为带经典记录和时空相关的条件通道。',
          en: 'N is the effective quantum channel supplied to a circuit simulation for one gate or one cycle. I denotes fault-free evolution; Ee, Ep and El denote flagged erasure, in-subspace Pauli-like fault and leakage/loss conditional channels, with pe, pp and pl probabilities under those definitions. This is an explanatory mixture model: coherent bias, temporal correlation or flag confusion requires a conditional channel with classical records and spatiotemporal correlations.',
        },
      },
      {
        id: 'open-challenges',
        title: { zh: '用码距缩放验证容错收益', en: 'Validate fault-tolerance gains by code-distance scaling' },
        body: {
          zh: '最小证据不是一次经过后选择的逻辑态保真度，而是在相同电路语义和噪声条件下，码距 d 增加时逻辑错误率按模型预期下降。实验需同时报告综合征轮数、探测事件、解码延迟和未完成样本；若更大码只因舍弃更多样本而变好，或相关错误使抑制在某个距离后饱和，就尚未得到可扩展容错。对 Yb，还应分别扫描擦除率、残余 Pauli 率和标记质量，确认收益来自解码器使用了位置记录，而不是数据筛选。',
          en: 'The minimum evidence is not one postselected logical-state fidelity but a decrease in logical error as code distance d grows under the same circuit semantics and noise conditions. Experiments must report syndrome rounds, detection events, decoder latency and unfinished shots. If a larger code improves only by discarding more samples, or correlated faults saturate suppression beyond some distance, scalable fault tolerance has not been shown. For Yb, erasure rate, residual Pauli rate and flag quality should be varied separately to verify that the decoder gains from location information rather than data selection.',
        },
      },
      {
        id: 'hardware-code-codesign',
        title: { zh: '规模最终由可信结果成本定义', en: 'Scale is ultimately cost per trustworthy result' },
        body: {
          zh: '物理原子数不是规模，能在期限内完成的逻辑时空体积才是规模。资源估算必须把码距、逻辑量子比特、非 Clifford 资源、路由与重排、综合征周期、实时译码、补原子和校准停机放入同一模型。吞吐由并行逻辑操作与周期时间决定，可用率由装载、故障恢复和维护决定；可信结果成本还要除以算法成功概率。只有当新增原子同时降低逻辑失败、提高有效吞吐，且没有以更低可用率抵消收益时，Yb 的错误标记和可重构阵列才构成低成本通用容错路线。',
          en: 'Physical atom count is not scale; executable logical spacetime volume within a deadline is scale. A resource estimate must combine code distance, logical qubits, non-Clifford resources, routing and rearrangement, syndrome-cycle time, real-time decoding, atom replacement and calibration downtime. Throughput follows parallel logical operations and cycle time; availability follows loading, recovery and maintenance; cost per trustworthy result must also divide by algorithm success probability. Yb fault flags and reconfigurable arrays form a low-cost route to universal fault tolerance only when added atoms reduce logical failure and raise effective throughput without an offsetting loss of availability.',
        },
      },
    ],
  },
]

export const chapters: Chapter[] = [
  foundationsChapter,
  neutralAtomsChapter,
  ytterbiumChapter,
  ...legacyChapters.slice(3),
]
