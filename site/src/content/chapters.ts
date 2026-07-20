import type { Chapter } from '../types/content'
import { researchDetails } from './researchDetails'

export const chapters: Chapter[] = [
  {
    id: 'quantum-foundations',
    number: 1,
    title: { zh: '物理状态如何成为可验证的量子计算', en: 'How physical states become verifiable quantum computation' },
    shortTitle: { zh: '量子信息', en: 'Quantum information' },
    question: { zh: '从“可表示状态”到“可扩展计算”，每一层必须满足什么物理条件？', en: 'What physical condition is added at each step from representable states to scalable computation?' },
    sections: [
      {
        id: 'state-measurement',
        title: { zh: '计算从可区分状态开始', en: 'Computation starts with distinguishable states' },
        body: {
          zh: '任何计算都先需要可区分状态、可重复制备和明确读出。量子态用密度算符描述全部可实施测量的概率；量子比特还必须同时规定计算态、泄漏态和原子损失后的真空态。只有当同一测量协议能给出带混淆矩阵的稳定记录，|0⟩ 与 |1⟩ 才是实验意义上的计算符号，而不只是能级标签。',
          en: 'Every computation first needs distinguishable states, repeatable preparation and a defined readout. A density operator predicts all allowed measurement statistics, while a physical qubit must specify computational, leakage and vacuum outcomes. |0> and |1> become laboratory symbols only when one measurement protocol returns stable records with a calibrated confusion matrix, rather than merely naming two energy levels.',
        },
        equation: String.raw`|\psi\rangle=\alpha|0\rangle+\beta|1\rangle,\qquad |\alpha|^2+|\beta|^2=1`,
        research: researchDetails['state-measurement'],
      },
      {
        id: 'unitary-gates',
        title: { zh: '计算还需要可组合变换', en: 'Computation also needs composable transformations' },
        body: {
          zh: '可区分状态还不构成计算；系统必须实现可组合变换。硬件执行的是由幅度、频率、相位和时序决定的 H(t)，抽象量子门只是传播子在计算子空间中的目标作用。实验必须测旋转角、相位闭合、漂移和泄漏；一次 Rabi 峰值不能证明多个操作串联后仍实现目标幺正。',
          en: 'Distinguishable states do not yet constitute computation; the system must implement composable transformations. Hardware realizes H(t) through amplitude, frequency, phase and timing, while an abstract gate specifies only the target action inside the computational subspace. Experiments must measure rotation angle, phase closure, drift and leakage because one Rabi maximum does not prove that operations still compose to the target unitary.',
        },
        equation: String.raw`U(T)=\mathcal{T}\exp\!\left[-\frac{i}{\hbar}\int_0^T H(t)\,dt\right]`,
      },
      {
        id: 'entanglement-error-correction',
        title: { zh: '多比特计算需要条件动力学', en: 'Multiqubit computation needs conditional dynamics' },
        body: {
          zh: '可区分状态和可组合单体变换仍不足以产生多比特量子计算；还需要一个不能分解为单体操作乘积的联合传播子。状态依赖相互作用产生条件动力学，把一个量子比特的信息写入另一个的相位，从而形成纠缠。验收必须覆盖条件谱移、相干条件相位、Bell 奇偶以及门后返回计算子空间，不能用经典真值表替代纠缠证据。',
          en: 'Distinguishable states and composable single-body transformations do not yet provide multiqubit quantum computation. The device also needs a joint propagator that cannot factor into independent operations. A state-dependent interaction writes one qubit’s information into another qubit’s phase and creates entanglement. Acceptance must cover conditional shifts, coherent phase, Bell parity and return to the computational subspace rather than substitute a classical truth table for entanglement evidence.',
        },
      },
      {
        id: 'computation-stack',
        title: { zh: '最终对象是可重复的周期通道', en: 'The final object is a repeatable cycle channel' },
        body: {
          zh: '有用的硬件必须把制备、门、移动、测量、复位、经典反馈和必要的补原子组合为可重复周期。每层都把参数和误差传给下一层：波形经过硬件传递函数成为原子面控制，原子响应经过分类器成为经典记录，条件化记录再进入解码器。最关键的问题不是某个组件是否达到最高保真度，而是哪一项机制主导完整周期的逻辑代价。',
          en: 'Useful hardware composes preparation, gates, motion, measurement, reset, classical feedback and atom replacement into a repeatable cycle. Waveforms pass through hardware transfer functions to become atom-plane controls, atomic responses pass through classifiers to become classical records, and conditional records enter a decoder. The decisive question is not which component has the highest fidelity, but which mechanism dominates the logical cost of the complete cycle.',
        },
      },
    ],
  },
  {
    id: 'neutral-atoms',
    number: 2,
    title: { zh: '中性原子计算的底层机制', en: 'Mechanisms of neutral-atom computing' },
    shortTitle: { zh: '中性原子', en: 'Neutral atoms' },
    question: { zh: '原子为什么能够计算，中性原子怎样按需打开相互作用？', en: 'Why can atoms compute, and how do neutral atoms switch interactions on demand?' },
    sections: [
      {
        id: 'cool-trap-image',
        title: { zh: '从天然能级到可寻址站点', en: 'From natural spectra to addressable sites' },
        body: {
          zh: '同一同位素的原子具有天然一致的内部态谱，因此不需要逐器件制造量子比特；站点差异主要来自局部光场、磁场和运动。激光冷却把速度分布压入可俘获范围，远失谐光镊定义独立站点，成像给出占据记录，AOD/SLM 再把随机装载映射为目标几何。原子的一致性只有在这些工程不均匀被逐站点标定后才真正可用。',
          en: 'Atoms of one isotope share a naturally identical internal-state spectrum, so qubits need not be fabricated device by device; site differences mainly come from local optical, magnetic and motional environments. Laser cooling compresses the velocity distribution, far-detuned tweezers define sites, imaging returns occupancy and AOD/SLM control maps stochastic loading to a target geometry. Atomic identity becomes useful only after those engineering inhomogeneities are calibrated site by site.',
        },
        research: researchDetails['cool-trap-image'],
      },
      {
        id: 'rydberg-interaction',
        title: { zh: 'Rydberg 相互作用与阻塞', en: 'Rydberg interaction and blockade' },
        body: {
          zh: '中性原子基态相互作用弱，适合长时间隔离，却不足以快速纠缠。短暂激发到高主量子数 Rydberg 态后，强偶极相互作用移动双激发能级；当 V/ℏ 大于有效驱动带宽时，第二次激发被抑制并产生状态依赖相位。这种“弱耦合存储、强耦合执行门”是中性原子计算的核心开关，但 V 依赖距离、角度和多通道原子结构，不能只用一个阻塞半径概括。',
          en: 'Weak ground-state interactions isolate neutral atoms well but cannot generate fast entanglement. Brief excitation to a high-principal-quantum-number Rydberg state shifts the double-excitation level; when V/hbar exceeds the effective drive bandwidth, the second excitation is suppressed and a state-dependent phase emerges. This weak-storage/strong-gate switch is central, but V depends on distance, angle and multichannel structure rather than one universal blockade radius.',
        },
        equation: String.raw`V(R)=\frac{C_6}{R^6},\qquad R_b=\left(\frac{|C_6|}{\hbar\Omega}\right)^{1/6}`,
      },
      {
        id: 'reconfigurable-connectivity',
        title: { zh: '可重构连接的价值与代价', en: 'Value and cost of reconfigurable connectivity' },
        body: {
          zh: '光镊几何可在周期之间改变，使物理邻接服务于门调度和量子码，而不是由固体布线固定。移动同时改变运动布居、相位和碰撞风险；多音 AOD 还会引入站点相关功率与互调。连接性只有在目标填充率、重排时间、移动后温度、损失和并行串扰被放入同一数据集时才能评价，不能只统计最终阵列是否填满。',
          en: 'Tweezer geometry can change between cycles so physical adjacency serves gate schedules and codes rather than fixed wiring. Motion also changes motional occupation, phase and collision risk, while multitone AOD drive introduces site-dependent power and intermodulation. Connectivity is meaningful only when target filling, rearrangement time, post-motion temperature, loss and parallel crosstalk are measured in one dataset.',
        },
      },
      {
        id: 'shot-cycle',
        title: { zh: '关键问题：阵列能否形成稳定周期', en: 'Key question: can the array sustain a stable cycle?' },
        body: {
          zh: '能俘获、能重排和能做一次门并不等于能计算。平台必须在重复周期中保持站点坐标、温度、相位参考、分类器和校准版本一致，并把损失、补原子和反馈时延纳入通道。最关键的问题是：增加阵列规模或并行密度后，哪一种相关故障首先破坏周期稳定性，以及测量记录能否定位它。',
          en: 'Trapping, rearranging and running one gate do not yet constitute computation. Repeated cycles must preserve site coordinates, temperature, phase reference, classifier and calibration versions while including loss, replacement and feedback latency in the channel. The key question is which correlated fault first breaks cycle stability as array size or parallel density grows, and whether the measurement record can localize it.',
        },
      },
    ],
  },
  {
    id: 'why-yb',
    number: 3,
    title: { zh: '为什么中性原子路线选择 171Yb', en: 'Why choose 171Yb within the neutral-atom route' },
    shortTitle: { zh: 'Yb 平台', en: 'Yb platform' },
    question: { zh: '在固定的纠错周期任务下，171Yb 的接口组合解决什么约束，又引入什么代价？', en: 'For a fixed correction-cycle task, which constraints does the 171Yb interface bundle solve, and what costs does it add?' },
    sections: [
      {
        id: 'two-electron-structure',
        title: { zh: '双价电子结构', en: 'Two-valence-electron structure' },
        body: {
          zh: '选择 171Yb 的根本理由不是某一项指标绝对最高，而是一组可分工的原子接口。I=1/2 给出最小核自旋二能级子空间；1S0、3P0、3P1、1P1 与 Rydberg 流形分别支持存储/运输、亚稳映射、窄线冷却、强跃迁成像和条件相互作用。接口组合减少单一跃迁承担的冲突任务，同时增加波长链、偏振、多能级耦合和 UV 交付的工程复杂度。',
          en: 'The fundamental case for 171Yb is not one universally superior metric but a set of atomic interfaces that can divide labor. I=1/2 gives a minimal nuclear-spin two-level space; the 1S0, 3P0, 3P1, 1P1 and Rydberg manifolds support storage/transport, metastable mapping, narrow-line cooling, strong-transition imaging and conditional interaction. This interface bundle reduces conflicting demands on one transition while increasing wavelength, polarization, multilevel and UV-delivery complexity.',
        },
      },
      {
        id: 'qubit-encodings',
        title: { zh: '两类核自旋量子比特', en: 'Two nuclear-spin qubit encodings' },
        body: {
          zh: '地态编码使用 1S0 的两个核自旋投影，适合低磁敏感存储和运输；亚稳态编码或映射把量子信息接入 3P0，并通过状态选择跃迁连接 Rydberg 门和部分错误标记。选择不应由寿命单独决定，而应比较映射误差、差分光移、门接口、泄漏可见性和周期时延。系统可以在存储流形与操作流形之间切换，但每次映射都必须进入通道预算。',
          en: 'A ground-state encoding uses the two nuclear-spin projections of 1S0 for low-magnetic-sensitivity storage and transport. A metastable encoding or mapping connects information through 3P0 to Rydberg gates and state-selective fault flags. Lifetime alone does not decide between them; mapping error, differential light shift, gate interface, leakage visibility and cycle latency must be compared. Every transfer between storage and operation manifolds belongs in the channel budget.',
        },
        research: researchDetails['qubit-encodings'],
      },
      {
        id: 'species-comparison',
        title: { zh: '与 Rb、Cs、Sr 的归一化比较', en: 'Normalized comparison with Rb, Cs and Sr' },
        body: {
          zh: '物种比较必须固定任务、编码和指标约定。Rb/Cs 的单价电子结构与成熟双光子 Rydberg 路线降低部分激光和控制门槛；Sr/Yb 的双电子结构增加钟态、核自旋和状态选择接口，也增加窄线、超稳与紫外系统。比较应同时列出存储相干、门时间、损失/泄漏定义、成像反作用、可检测错误和维护成本；未归一化的文献保真度不能构成物种排名。',
          en: 'Species comparisons must fix task, encoding and metric conventions. The single-valence-electron structure and mature two-photon Rydberg routes of Rb/Cs lower some laser and control barriers. The two-electron structure of Sr/Yb adds clock, nuclear-spin and state-selective interfaces while requiring narrow-line, ultrastable and ultraviolet systems. Storage coherence, gate time, loss/leakage definitions, imaging backaction, visible faults and maintenance cost must be compared together.',
        },
      },
      {
        id: 'isotope-strategy',
        title: { zh: '同位素选择是一项系统设计', en: 'Isotope choice is a system-design decision' },
        body: {
          zh: '171Yb 的 I=1/2 直接匹配二能级核自旋编码；174Yb 无核自旋，谱结构更简单，可用于真空、MOT、光镊和成像的早期调试。迁移同位素不是更换炉料后继续运行：同位素位移、光抽运、磁场、偏振、装载和碰撞动力学都要重新标定。偶同位素可降低基础设施调试复杂度，但量子比特放行必须在 171Yb 上重新建立完整证据。',
          en: 'The I=1/2 structure of 171Yb directly matches a two-level nuclear-spin encoding. Spinless 174Yb has a simpler spectrum and can commission vacuum, MOT, tweezers and imaging. Isotope migration is not a source refill followed by continued operation: isotope shifts, optical pumping, field, polarization, loading and collision dynamics require new calibration. Even isotopes simplify infrastructure bring-up, but qubit acceptance must be rebuilt on 171Yb.',
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
