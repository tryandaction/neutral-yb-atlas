import type { Chapter } from '../types/content'
import { researchDetails } from './researchDetails'

export const chapters: Chapter[] = [
  {
    id: 'quantum-foundations',
    number: 1,
    title: { zh: '量子计算的物理底层', en: 'Physical foundations of quantum computing' },
    shortTitle: { zh: '量子信息', en: 'Quantum information' },
    question: { zh: '计算为何能够由受控的量子演化实现？', en: 'How can controlled quantum evolution perform computation?' },
    sections: [
      {
        id: 'state-measurement',
        title: { zh: '状态、振幅与测量', en: 'States, amplitudes and measurement' },
        body: {
          zh: '量子态不是未知经典变量的清单，而是对所有可实施测量给出概率预测的数学对象。纯态以 Hilbert 空间中的归一化向量表示，复振幅的相对相位决定干涉；测量把连续演化连接到离散实验记录。密度矩阵进一步描述统计混合、部分系统和开放系统，因此也是实验层保真度与噪声模型的共同语言。',
          en: 'A quantum state is not a list of hidden classical values. It is the mathematical object that predicts the outcome statistics of every allowed measurement. Pure states are normalized vectors in Hilbert space, and relative phases of complex amplitudes control interference. Measurement connects continuous evolution to discrete laboratory records, while density matrices describe mixtures, subsystems and open dynamics, providing the common language for experimental fidelity and noise.',
        },
        equation: String.raw`|\psi\rangle=\alpha|0\rangle+\beta|1\rangle,\qquad |\alpha|^2+|\beta|^2=1`,
        research: researchDetails['state-measurement'],
      },
      {
        id: 'unitary-gates',
        title: { zh: '幺正演化与量子门', en: 'Unitary evolution and quantum gates' },
        body: {
          zh: '封闭系统由哈密顿量生成幺正演化。门模型把连续控制离散化为单比特旋转和纠缠门，但真实硬件始终实现一个随时间变化的哈密顿量，而不是抽象矩阵本身。量子算法的物理落地问题因此是：选择可寻址的两能级子空间，设计控制场，使实际传播子在计算子空间内逼近目标门，同时压制泄漏和环境耦合。',
          en: 'A Hamiltonian generates unitary evolution in a closed system. The gate model discretizes continuous control into single-qubit rotations and entangling operations, but hardware always implements a time-dependent Hamiltonian rather than an abstract matrix. Physical realization therefore means choosing an addressable two-level subspace and designing controls so that the actual propagator approaches the target gate inside the computational subspace while suppressing leakage and environmental coupling.',
        },
        equation: String.raw`U(T)=\mathcal{T}\exp\!\left[-\frac{i}{\hbar}\int_0^T H(t)\,dt\right]`,
      },
      {
        id: 'entanglement-error-correction',
        title: { zh: '纠缠、噪声与纠错', en: 'Entanglement, noise and error correction' },
        body: {
          zh: '量子加速来自受控干涉与纠缠结构，而不是同时读取所有计算分支。任何平台都必须面对退相干、控制误差、泄漏和损失。量子纠错通过冗余编码与综合征测量把连续物理误差投影为可处理的信息；真正有价值的硬件指标不仅是物理门保真度，还包括错误是否可探测、是否有偏置、测量是否能在计算中途进行以及连接结构是否支持低开销综合征提取。',
          en: 'Quantum advantage comes from controlled interference and entanglement structure, not from reading every computational branch at once. Every platform faces decoherence, control errors, leakage and loss. Quantum error correction uses redundant encoding and syndrome measurement to turn continuous physical faults into actionable information. Consequently, useful hardware metrics extend beyond physical gate fidelity to error detectability, bias, mid-circuit measurement and whether connectivity supports low-overhead syndrome extraction.',
        },
      },
      {
        id: 'computation-stack',
        title: { zh: '从算法到底层控制栈', en: 'From algorithms to the physical control stack' },
        body: {
          zh: '量子计算的“底层”不是某一种粒子，而是一条可验证的翻译链：算法给出逻辑操作，编译器把它分解到原生门与测量，控制系统把门变成幅度、相位、频率和时序波形，量子系统按哈密顿量与环境耦合演化，探测器再把结果变成带置信度的经典记录。任何一层的约定都会向下传播，例如门的相位规范决定脉冲目标，读出的条件化规则决定保真度定义。理解量子硬件，就是能沿这条链双向追踪假设、参数和误差。',
          en: 'The bottom layer of quantum computing is not a particular particle but a verifiable translation chain. Algorithms specify logical operations; compilers decompose them into native gates and measurements; control systems turn those operations into amplitude, phase, frequency and timing waveforms; the device evolves under a Hamiltonian and environmental coupling; detectors return classical records with quantified confidence. Conventions propagate through every layer: gate-phase definitions set pulse targets, while readout conditioning sets fidelity definitions. Understanding hardware means tracing assumptions, parameters and errors in both directions across this stack.',
        },
      },
    ],
  },
  {
    id: 'neutral-atoms',
    number: 2,
    title: { zh: '中性原子计算的底层机制', en: 'Mechanisms of neutral-atom computing' },
    shortTitle: { zh: '中性原子', en: 'Neutral atoms' },
    question: { zh: '怎样把自然原子变成可编程、可扩展的量子寄存器？', en: 'How do natural atoms become a programmable and scalable register?' },
    sections: [
      {
        id: 'cool-trap-image',
        title: { zh: '冷却、俘获与成像', en: 'Cooling, trapping and imaging' },
        body: {
          zh: '激光冷却利用速度相关的光子散射降低原子动能，磁光阱完成预冷和空间压缩，远失谐聚焦光产生偶极势并形成单原子光镊。随机装载通常留下缺陷，因此相机首先识别占据分布，再由 AOD 或 SLM 生成的可移动陷阱重排原子。成像并非附属环节：它同时决定装载判据、状态读出、损失识别和实验反馈速度。',
          en: 'Laser cooling reduces kinetic energy through velocity-dependent photon scattering. A magneto-optical trap provides precooling and spatial compression, while tightly focused far-detuned light creates dipole potentials for single-atom tweezers. Stochastic loading leaves defects, so a camera first resolves occupancy and movable traps produced by an AOD or SLM rearrange the atoms. Imaging is not auxiliary: it defines loading decisions, state readout, loss detection and the latency of experimental feedback.',
        },
        research: researchDetails['cool-trap-image'],
      },
      {
        id: 'rydberg-interaction',
        title: { zh: 'Rydberg 相互作用与阻塞', en: 'Rydberg interaction and blockade' },
        body: {
          zh: '高主量子数 Rydberg 态具有很大的极化率和原子间相互作用。若双激发态的相互作用能移大于激光耦合带宽，第二个原子的共振激发被抑制，这就是 Rydberg blockade。它把微米尺度上原本几乎独立的中性原子转化为快速条件动力学。阻塞半径不是固定材料参数，而取决于 C6、Rabi 频率、角向耦合和所选 Rydberg 流形。',
          en: 'High-principal-quantum-number Rydberg states have enormous polarizability and strong interatomic interactions. When the interaction shift of the doubly excited state exceeds the laser-coupling bandwidth, resonant excitation of a second atom is suppressed: the Rydberg blockade. It converts otherwise weakly interacting neutral atoms separated by micrometres into fast conditional dynamics. The blockade radius is not a fixed material constant; it depends on C6, Rabi frequency, angular coupling and the chosen Rydberg manifold.',
        },
        equation: String.raw`V(R)=\frac{C_6}{R^6},\qquad R_b=\left(\frac{|C_6|}{\hbar\Omega}\right)^{1/6}`,
      },
      {
        id: 'reconfigurable-connectivity',
        title: { zh: '可重构连接的价值与代价', en: 'Value and cost of reconfigurable connectivity' },
        body: {
          zh: '光镊阵列可以在门周期之间改变几何结构，使物理邻接关系服务于算法或纠错码，而不是完全由芯片布线固定。这种连接性有利于并行门、非局域综合征和 qLDPC 调度，但移动会引入加热、相位积累、碰撞风险和额外时间。评估架构时必须把门误差、移动误差、并行度、测量时延和补原子策略放在同一个周期预算中。',
          en: 'Optical-tweezer arrays can change geometry between gate cycles, allowing physical adjacency to serve an algorithm or error-correcting code rather than fixed wiring. This connectivity benefits parallel gates, nonlocal syndromes and qLDPC schedules, but motion introduces heating, phase accumulation, collision risk and latency. Architecture assessment must therefore place gate error, transport error, parallelism, measurement latency and atom replacement in one cycle-level budget.',
        },
      },
      {
        id: 'shot-cycle',
        title: { zh: '一次实验循环的真实结构', en: 'Anatomy of a complete experimental shot' },
        body: {
          zh: '一次有效 shot 通常依次包含原子源预热、MOT 装载、窄线冷却、光镊转移、第一次成像、缺陷重排、基态冷却、量子态制备、门序列、末态或中电路读出以及必要的补原子。相机曝光、数据传输、占据分类和 FPGA 决策属于物理循环的一部分，不能只统计相干门时间。工程优化的目标是稳定吞吐率：既要减少单次循环时间，也要控制重排损失、温升、误分类和重新装载概率。',
          en: 'A useful experimental shot typically includes source warm-up, MOT loading, narrow-line cooling, tweezer transfer, a first image, defect rearrangement, ground-state cooling, state preparation, the gate sequence, final or mid-circuit readout and atom replacement when needed. Camera exposure, data transfer, occupancy classification and FPGA decisions are part of the physical cycle; coherent gate time alone is not the runtime. Engineering therefore optimizes stable throughput by reducing cycle time while controlling rearrangement loss, heating, misclassification and reload probability.',
        },
      },
    ],
  },
  {
    id: 'why-yb',
    number: 3,
    title: { zh: '为什么选择镱原子', en: 'Why ytterbium' },
    shortTitle: { zh: 'Yb 平台', en: 'Yb platform' },
    question: { zh: 'Yb 提供的是更高保真度，还是更有价值的错误结构？', en: 'Does Yb offer higher fidelity, or a more useful error structure?' },
    sections: [
      {
        id: 'two-electron-structure',
        title: { zh: '双价电子结构', en: 'Two-valence-electron structure' },
        body: {
          zh: 'Yb 的两个价电子产生 1S0 基态、3P0 钟态、3P1 窄线态和 1P1 强跃迁。它们分别承担稳定存储、长寿命量子比特、窄线冷却和快速成像等不同职责。与碱金属相比，接口更丰富但激光系统也更复杂；与 Sr 相比，171Yb 的核自旋 I=1/2 提供最小而清晰的核自旋子空间，有利于定义量子比特和追踪选择定则。',
          en: 'The two valence electrons of Yb produce the 1S0 ground state, the 3P0 clock state, the narrow 3P1 state and the strong 1P1 transition. They support distinct roles including stable storage, metastable qubits, narrow-line cooling and fast imaging. Compared with alkali atoms the interface is richer but the laser system is more complex; compared with Sr, 171Yb has nuclear spin I=1/2, giving a minimal and clean nuclear-spin subspace for qubit definition and selection-rule bookkeeping.',
        },
      },
      {
        id: 'qubit-encodings',
        title: { zh: '两类核自旋量子比特', en: 'Two nuclear-spin qubit encodings' },
        body: {
          zh: '地态方案把 1S0 的两个核自旋投影作为计算基，天然减小电子磁矩带来的磁敏感性；亚稳态方案把量子信息放入 3P0，并利用不同跃迁把部分衰变或泄漏事件转化为可探测擦除。两者不是简单优劣关系：地态更适合长寿命存储与运输，亚稳态提供更直接的门和擦除接口，实际架构可以在两个流形之间映射量子信息。',
          en: 'A ground-state encoding uses the two nuclear-spin projections of 1S0 as the computational basis, naturally reducing sensitivity to electronic magnetic moments. A metastable encoding stores information in 3P0 and uses state-selective transitions to convert portions of decay or leakage into detectable erasures. Neither encoding strictly dominates: the ground state favors long storage and transport, while the metastable manifold offers direct gate and erasure interfaces, and an architecture may coherently map information between them.',
        },
        research: researchDetails['qubit-encodings'],
      },
      {
        id: 'species-comparison',
        title: { zh: '与 Rb、Cs、Sr 的归一化比较', en: 'Normalized comparison with Rb, Cs and Sr' },
        body: {
          zh: '碱金属平台拥有成熟的微波控制与 Rydberg 门经验，Sr/Yb 则提供钟态、窄线冷却和多流形读出。比较不能只排列论文中的最好保真度，因为门定义、是否计入损失、原子间距、并行度和 SPAM 处理常不相同。更可靠的比较维度是：量子比特寿命、门时间、可检测错误比例、读出破坏性、重排成本、所需波长和控制系统复杂度。',
          en: 'Alkali platforms offer mature microwave control and extensive Rydberg-gate experience, whereas Sr and Yb provide clock states, narrow-line cooling and multi-manifold readout. A list of best reported fidelities is misleading because gate definitions, loss treatment, spacing, parallelism and SPAM conventions differ. More defensible dimensions are qubit lifetime, gate time, detectable-error fraction, readout destructiveness, rearrangement cost, required wavelengths and control-system complexity.',
        },
      },
      {
        id: 'isotope-strategy',
        title: { zh: '同位素选择是一项系统设计', en: 'Isotope choice is a system-design decision' },
        body: {
          zh: '¹⁷¹Yb 的核自旋 I=1/2 提供紧凑的两态编码，并可利用 ³P₀ 亚稳态分离存储、门和探测通道；偶同位素如 ¹⁷⁴Yb 没有核自旋，内部结构更简单，适合先验收冷却、光镊和 Rydberg 光谱。实验路线可先用偶同位素降低调试维度，再迁移到 ¹⁷¹Yb，但必须重新标定超精细选择规则、磁场响应、光抽运和散射分支。天然丰度、同位素纯度、炉温与装载通量也会进入总体周期和成本。',
          en: 'The nuclear spin I=1/2 of 171Yb provides a compact two-state encoding, while the metastable 3P0 state can separate storage, gate and detection channels. Even isotopes such as 174Yb have no nuclear spin and simpler internal structure, making them useful for accepting cooling, tweezer and Rydberg spectroscopy subsystems first. A program may debug with an even isotope and then migrate to 171Yb, but hyperfine selection rules, magnetic response, optical pumping and scattering branches must all be recalibrated. Natural abundance, isotope purity, oven temperature and loading flux also enter project schedule and cost.',
        },
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
      },
      {
        id: 'controlled-phase',
        title: { zh: '阻塞条件相位', en: 'Blockade controlled phase' },
        body: {
          zh: '两原子同时被驱动时，单激发对称态以增强的 Rabi 频率参与演化，而双 Rydberg 态被相互作用能移推离共振。门的目标不是简单阻止双激发，而是让四个计算基态在门末回到计算子空间并积累正确的相对相位。传统 π–2π–π 序列给出直观图像，现代高保真门通常连续调制相位、振幅或失谐以减少 Rydberg 占据和参数敏感性。',
          en: 'When two atoms are driven, the symmetric singly excited state evolves with an enhanced Rabi frequency while the doubly excited Rydberg state is shifted out of resonance by interactions. The gate objective is not merely to prevent double excitation, but to return all four computational basis states to the computational subspace with the correct relative phase. The conventional pi–2pi–pi sequence is intuitive; modern high-fidelity gates often shape phase, amplitude or detuning continuously to reduce Rydberg population and parameter sensitivity.',
        },
        equation: String.raw`H=H_1^{(a)}+H_1^{(b)}+\hbar V|rr\rangle\langle rr|`,
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
    title: { zh: '从物理量子比特到容错架构', en: 'From physical qubits to fault-tolerant architecture' },
    shortTitle: { zh: '容错路线', en: 'Fault tolerance' },
    question: { zh: 'Yb 的可检测错误能否转化为逻辑层优势？', en: 'Can detectable Yb errors become a logical-layer advantage?' },
    sections: [
      {
        id: 'erasure-conversion',
        title: { zh: '擦除转换', en: 'Erasure conversion' },
        body: {
          zh: '若物理过程把部分衰变或泄漏映射到计算子空间外的可探测状态，错误位置就可以被标记为擦除。已知位置的擦除通常比未知 Pauli 错误更容易纠正，但检测本身会增加时间、散射、误报和漏报。评价擦除方案必须同时报告擦除率、残余 Pauli 率、检测保真度和检查周期，而不是只强调被标记错误的比例。',
          en: 'If physical dynamics map some decay or leakage events into detectable states outside the computational subspace, their locations can be marked as erasures. Located erasures are generally easier to correct than unknown Pauli faults, but detection adds time, scattering, false positives and false negatives. An erasure scheme must report erasure rate, residual Pauli rate, detection fidelity and check duration together rather than highlighting only the labeled fraction.',
        },
        research: researchDetails['erasure-conversion'],
      },
      {
        id: 'channel-bridge',
        title: { zh: '从门误差到逻辑通道', en: 'From gate error to logical channel' },
        body: {
          zh: '逻辑模拟需要的不只是一个总保真度，而是可追溯的擦除、Pauli、泄漏、衰变、Doppler 和损失概率，以及它们在时间和空间上的相关性。通道映射必须沿用门模型的损失与条件化约定。只有在这些输入稳定后，表面码或 qLDPC 的阈值、距离和调度比较才具有物理意义；候选门参数只能用于方法开发，不能产生架构优势结论。',
          en: 'Logical simulation needs more than one aggregate fidelity. It requires traceable erasure, Pauli, leakage, decay, Doppler and loss probabilities, including temporal and spatial correlations. Channel mapping must preserve the gate model’s conventions for loss and conditioning. Surface-code or qLDPC threshold, distance and schedule comparisons become physical only after these inputs stabilize; candidate gate parameters are suitable for method development, not architecture-advantage claims.',
        },
        equation: String.raw`\mathcal{N}=(1-p_e-p_p-p_l)\mathcal{I}+p_e\mathcal{E}_{e}+p_p\mathcal{E}_{p}+p_l\mathcal{E}_{l}`,
      },
      {
        id: 'open-challenges',
        title: { zh: '前沿问题与停止条件', en: 'Open problems and stopping conditions' },
        body: {
          zh: '关键挑战包括 Yb Rydberg 相互作用张量与旁路耦合的源锁定、紫外激光噪声、并行门串扰、移动中的核自旋相干、中电路读出开销、连续补原子和低温高数值孔径系统。研究路线需要停止条件：当模型受缺失参数限制时先获取数据，当局部优化饱和时更换目标或模型，当逻辑输入不稳定时暂停阈值外推。',
          en: 'Key challenges include source-locking Yb Rydberg interaction tensors and spectator couplings, ultraviolet laser noise, parallel-gate crosstalk, nuclear-spin coherence during motion, mid-circuit readout overhead, continuous atom replacement and cryogenic high-NA systems. A research roadmap needs stopping conditions: acquire data when missing parameters dominate, change the objective or model when local optimization saturates, and pause threshold extrapolation while logical-channel inputs remain unstable.',
        },
      },
      {
        id: 'hardware-code-codesign',
        title: { zh: '硬件、调度与量子码共设计', en: 'Co-design across hardware, schedules and codes' },
        body: {
          zh: 'Yb 的架构价值取决于错误结构能否被量子码和调度真正利用。擦除检测若增加过多散射或延迟，可能抵消已知错误位置的优势；可移动阵列若需要过多串行路径，也会拉长综合征周期并积累存储误差。因此应把实验测得的通道、门距离约束、并行冲突、重排时间和补原子策略输入解码与资源模拟，输出逻辑错误率、周期时间、原子开销和维护占空比。只有这一闭环稳定后，平台间比较才具有工程意义。',
          en: 'The architectural value of Yb depends on whether its error structure can actually be exploited by codes and schedules. Erasure detection may lose its located-error advantage if it adds excessive scattering or latency; mobile arrays may lengthen syndrome cycles and accumulate memory error when routes serialize. Measured channels, gate-distance constraints, parallel conflicts, rearrangement time and atom-replacement policy should therefore feed decoder and resource simulations that return logical error rate, cycle time, atom overhead and maintenance duty cycle. Platform comparisons become engineering claims only after this loop is stable.',
        },
      },
    ],
  },
]
