import type { Chapter } from '../../types/content'

const erasureSource = { id: 'wu-2022', citation: 'Wu et al., Erasure conversion for fault-tolerant quantum computing in alkaline earth Rydberg atom arrays (2022)', url: 'https://doi.org/10.1038/s41467-022-32094-6' }
const logicalSource = { id: 'fault-tolerant-neutral-atoms-2025', citation: 'A fault-tolerant neutral-atom architecture for universal quantum computation (2025)', url: 'https://doi.org/10.1038/s41586-025-09848-5' }

export const faultToleranceChapter: Chapter = {
  id: 'fault-tolerance',
  number: 7,
  title: { zh: '怎样从物理故障得到可信计算成本', en: 'How physical faults become the cost of trustworthy computation' },
  shortTitle: { zh: '容错与规模', en: 'Fault tolerance' },
  question: { zh: '物理机制怎样经过周期通道、综合征和解码形成逻辑错误，并最终决定规模、时间和成本？', en: 'How do physical mechanisms pass through cycle channels, syndromes and decoding to form logical error and determine scale, time and cost?' },
  sections: [
    {
      id: 'physical-faults-to-cycle-channel',
      title: { zh: '组件误差必须成为周期通道', en: 'Component errors must become a cycle channel' },
      question: { zh: '为什么一组门保真度不能直接预测纠错性能？', en: 'Why can a set of gate fidelities not directly predict QEC performance?' },
      answer: { zh: '通用门集只说明控制可被编译；容错实现还必须把物理机制映射为带类型、位置、时间和相关性的门级故障，再由并行门、移动、测量与复位组成电路级通道。解码器需要这一完整结构，而不是平均误差。', en: 'A universal gate set only says that control can be compiled. Fault-tolerant implementation must additionally map physical mechanisms to gate faults with type, location, time and correlation, then compose parallel gates, motion, measurement and reset into a circuit-level channel. A decoder needs this complete structure rather than a mean error.' },
      reasoning: [
        { zh: '激光相噪、Doppler、衰变、光移、串扰和原子损失通过不同耦合进入哈密顿量或跳跃过程，产生相干偏差、Pauli 故障、泄漏或擦除。', en: 'Laser phase noise, Doppler shifts, decay, light shifts, crosstalk and atom loss enter Hamiltonian or jump processes differently, producing coherent bias, Pauli faults, leakage or erasure.' },
        { zh: '同一平均错误率可对应不同传播：相干过旋可随深度积累，泄漏可在被检测前污染后续门，擦除则向解码器提供位置。', en: 'One mean error can propagate differently: coherent overrotation accumulates with depth, leakage contaminates later gates before detection, and erasure supplies a location to the decoder.' },
        { zh: '共享激光、慢漂、AOD 多音和移动调度产生跨站点或跨周期相关；独立同分布噪声只能作为经过数据检验的近似。', en: 'Shared lasers, slow drift, AOD tones and motion schedules create spatial or temporal correlations; iid noise is an approximation requiring data.' },
        { zh: '周期通道还包含测量混淆、标签漏报/误报、复位失败和等待时间，因为这些过程改变综合征记录及下一轮初态。', en: 'The cycle channel also contains measurement confusion, missed/false flags, reset failure and wait time because these processes change the syndrome record and next-cycle state.' },
      ],
      measurement: { zh: '在不同并行密度、阵列方向、等待时间和周期序号下测条件协方差、泄漏寿命、标签混淆和重复门增长，建立带经典记录的通道。', en: 'Across parallel density, array orientation, wait time and cycle index, measure conditional covariance, leakage lifetime, flag confusion and repeated-gate growth to build a channel with classical records.' },
      boundary: { zh: '将所有故障 Pauli 化或独立化是模型选择，不是实验事实；结论必须说明哪些相关性、泄漏和损失被保留。', en: 'Pauli-twirling or independent faults are model choices, not experimental facts; conclusions state which correlations, leakage and loss are retained.' },
      sources: [erasureSource],
      nextQuestion: { zh: '综合征和错误标签怎样被解码器转成逻辑判定？', en: 'How does a decoder turn syndromes and fault flags into a logical decision?' },
    },
    {
      id: 'decoder-record-to-logical-error',
      title: { zh: '解码器只利用记录中实际存在的信息', en: 'A decoder can use only information present in the record' },
      question: { zh: '物理错误何时成为一次逻辑失败？', en: 'When does a physical fault become a logical failure?' },
      answer: { zh: '综合征、擦除位置和时间戳进入解码器，解码器给出恢复或 Pauli frame；真实故障与推断恢复的组合若实现非平凡逻辑算符，就记为逻辑错误率。', en: 'Syndromes, erasure locations and timestamps enter the decoder, which returns recovery or a Pauli frame; a logical error occurs when true faults combined with inferred recovery implement a nontrivial logical operator.' },
      reasoning: [
        { zh: '综合征不直接给出唯一故障，只限制与测量结果相容的故障集合；解码器根据噪声模型和记录质量选择恢复。', en: 'A syndrome does not identify a unique fault; it constrains compatible faults, and the decoder chooses recovery using the noise model and record quality.' },
        { zh: '擦除位置缩小候选集合，因此可提高可纠正错误率；若标签漏报、误报或延迟未写入模型，模拟器会获得实验中不存在的完美信息。', en: 'Erasure locations shrink the candidate set and can raise correctable error rates; omitting missed flags, false flags or latency gives the simulation perfect information absent in experiment.' },
        { zh: '恢复通常记录为 Pauli frame，不必立即施加物理门；逻辑判定必须把 frame、测量基和最终读出使用同一约定。', en: 'Recovery is often tracked as a Pauli frame rather than a physical gate; logical scoring uses one convention for frame, measurement basis and final readout.' },
        { zh: '逻辑错误率由多次完整周期统计，分母包括检测失败和未完成运行；后选择的逻辑态保真度不能替代。', en: 'Logical error is estimated over repeated complete cycles with detection failures and unfinished runs in the denominator; postselected logical-state fidelity is not a substitute.' },
      ],
      measurement: { zh: '保存逐周期综合征、擦除标签、时间戳、解码输出和已知注入故障；用独立测试集检查校准、逻辑失败和解码延迟。', en: 'Retain cycle-resolved syndromes, erasure flags, timestamps, decoder output and known injected faults; use held-out data to test calibration, logical failures and latency.' },
      boundary: { zh: '逻辑错误率属于“周期通道 + 代码 + 调度 + 解码器”的组合，不能归因于单个物理组件。', en: 'Logical error belongs to the combination of cycle channel, code, schedule and decoder; it cannot be assigned to one component alone.' },
      sources: [erasureSource, logicalSource],
      nextQuestion: { zh: '怎样证明增加编码规模确实提高可靠性？', en: 'How can increasing code size be shown to improve reliability?' },
    },
    {
      id: 'distance-scaling',
      title: { zh: '码距缩放是容错收益的核心检验', en: 'Code-distance scaling is the central fault-tolerance test' },
      question: { zh: '什么时候更多物理量子比特会产生更可靠的逻辑量子比特？', en: 'When do more physical qubits produce a more reliable logical qubit?' },
      answer: { zh: '在相同物理周期通道、解码规则和样本口径下，码距增加必须持续降低每周期或每逻辑门错误；若逻辑错误饱和或上升，额外物理资源尚未形成容错收益。', en: 'Under the same physical cycle channel, decoder rule and sample convention, increasing code distance must keep lowering error per cycle or logical gate; saturation or increase means added physical resources have not yielded fault-tolerant benefit.' },
      reasoning: [
        { zh: '码距 d 表示实现非平凡逻辑算符所需的最小故障链长度，但具体可纠正能力取决于代码、边界、测量轮数和故障类型。', en: 'Code distance d is the minimum fault-chain weight of a nontrivial logical operator, while correctability depends on code, boundaries, measurement rounds and fault type.' },
        { zh: '阈值不是硬件常数，而是给定噪声模型、纠错电路和解码器下，不同码距曲线发生缩放改变的区域。', en: 'A threshold is not a hardware constant; it is the scaling transition among distances for a particular noise model, correction circuit and decoder.' },
        { zh: '擦除偏置可改变阈值和低于阈值的下降斜率，但收益随残余 Pauli 错误、标签质量、相关性和时序改变。', en: 'Erasure bias can change threshold and below-threshold slope, but benefit depends on residual Pauli faults, flag quality, correlations and timing.' },
        { zh: '跨码距比较必须使用相同物理参数和保留规则；若较大代码只因删除更多失败样本而变好，就没有证明缩放。', en: 'Distance comparisons use the same physical parameters and retention rules; a larger code that improves only by discarding more failed shots does not demonstrate scaling.' },
      ],
      equation: {
        expression: String.raw`p_L(d+2)<p_L(d)\quad\text{at fixed }\mathcal E_{\mathrm{cycle}},\ \text{schedule and decoder}`, 
        role: { zh: '给出不依赖某个经验拟合系数的直接缩放判据。', en: 'States a direct scaling test without relying on a particular empirical prefactor.' },
        symbols: [{ zh: 'pL 是固定口径下每周期或每逻辑门错误率，d 是码距。', en: 'pL is logical error per cycle or logical gate under a fixed convention, and d is code distance.' }],
        assumptions: [{ zh: '各码距使用同一周期通道、调度、解码器版本和样本保留规则。', en: 'All distances use the same cycle channel, schedule, decoder version and retention rule.' }],
      },
      measurement: { zh: '至少比较多个码距和综合征轮数，给出置信区间、探测事件密度、解码延迟、未完成样本和错误类型消融。', en: 'Compare multiple distances and syndrome rounds, reporting confidence intervals, detection-event density, decoder latency, unfinished shots and fault-type ablations.' },
      boundary: { zh: '教学资源估算中的表面码经验式只说明趋势，不是 Yb 装置预测；相关错误、泄漏、路由和非 Clifford 资源会改变结果。', en: 'A surface-code-style teaching formula illustrates a trend and is not a Yb-device prediction; correlations, leakage, routing and non-Clifford resources change the result.' },
      sources: [logicalSource],
      nextQuestion: { zh: '达到目标逻辑错误后，还需要多少时间和系统资源才能得到一次可信结果？', en: 'After reaching target logical error, how much time and system resource produce one trustworthy result?' },
    },
    {
      id: 'trustworthy-result-cost',
      title: { zh: '规模与成本由完整逻辑任务定义', en: 'Scale and cost are defined by the complete logical task' },
      question: { zh: '为什么物理原子数不是量子计算规模的充分指标？', en: 'Why is physical atom count not a sufficient measure of quantum-computing scale?' },
      answer: { zh: '码距、非 Clifford 资源和调度先决定吞吐与可用率；再把维护停机、失败重试和验证开销计入，才能得到每个可信结果成本。有效规模因此是期限内可执行并通过验证的逻辑时空体积。', en: 'Code distance, non-Clifford resources and scheduling first determine throughput and availability. Maintenance downtime, failed retries and verification overhead then determine cost per trustworthy result. Useful scale is therefore the verified logical spacetime volume executable within a deadline.' },
      reasoning: [
        { zh: '算法先决定逻辑量子比特、逻辑门数、非 Clifford 资源和目标成功概率；量子码与编译再把它们转换为物理操作。', en: 'The algorithm fixes logical qubits, logical gates, non-Clifford resources and target success; code and compilation then translate these into physical operations.' },
        { zh: '周期时间由最慢的门、移动、测量、解码或复位路径决定，并行冲突会增加逻辑深度。', en: 'Cycle time is set by the slowest gate, motion, measurement, decode or reset path, and parallel conflicts add logical depth.' },
        { zh: '可用率包含装载、锁定、校准、故障恢复和维护停机；只统计设备运行时段会低估墙钟成本。', en: 'Availability includes loading, locking, calibration, recovery and maintenance downtime; counting only active device time underestimates wall-clock cost.' },
        { zh: '一次可信结果成本按成功概率归一化。较低原子单价或更多并行站点若伴随更高失败率和重试次数，不一定降低总成本。', en: 'Cost per trustworthy result is normalized by success probability. Lower atom cost or more parallel sites need not lower total cost if failure and repetition increase.' },
      ],
      measurement: { zh: '针对同一问题、精度和成功标准，端到端记录逻辑资源、总墙钟时间、能源与设备使用、停机、失败类别和重试次数。', en: 'For the same problem, accuracy and success standard, record logical resources, total wall time, energy and equipment use, downtime, failure classes and repetitions end to end.' },
      boundary: { zh: '当前页面只提供关系清晰的教学估算；没有完整装置参数、调度和运维数据时，不给出特定 Yb 机器的成本数字。', en: 'This page provides a transparent teaching estimate only; without full device, schedule and operations data it does not quote cost for a specific Yb machine.' },
      sources: [logicalSource],
      nextQuestion: { zh: '哪些原始论文和数据库分别支持这些定义、模型与实验结论？', en: 'Which primary papers and databases support these definitions, models and experimental claims?' },
    },
  ],
}
