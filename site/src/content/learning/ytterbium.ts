import type { Chapter } from '../../types/content'

const jenkinsSource = { id: 'jenkins-2022', citation: 'Jenkins et al., Ytterbium Nuclear-Spin Qubits in an Optical Tweezer Array (2022)', url: 'https://doi.org/10.1103/PRXQuantum.3.020315' }
const wuSource = { id: 'wu-2022', citation: 'Wu et al., Erasure conversion for fault-tolerant quantum computing in alkaline earth Rydberg atom arrays (2022)', url: 'https://doi.org/10.1038/s41467-022-32094-6' }
const maSource = { id: 'ma-2023', citation: 'Ma et al., High-fidelity gates and mid-circuit erasure conversion in an atomic qubit (2023)', url: 'https://doi.org/10.1038/s41586-023-06438-1' }
const logicalYbSource = { id: 'yb-logical-2026', citation: 'Logical qubits with erasure conversion using metastable neutral atoms, Nature Physics (2026)', url: 'https://doi.org/10.1038/s41567-026-03309-0' }

export const ytterbiumChapter: Chapter = {
  id: 'why-yb',
  number: 3,
  title: { zh: '为什么在中性原子中选择 171Yb', en: 'Why choose 171Yb among neutral atoms' },
  shortTitle: { zh: 'Yb 选择', en: 'Why Yb' },
  question: { zh: '在同一编码与纠错周期口径下，171Yb 相对 Rb、Cs 和 Sr 的接口组合何时产生净逻辑收益？', en: 'Under the same encoding and correction-cycle convention, when does the 171Yb interface bundle yield net logical benefit over Rb, Cs and Sr?' },
  sections: [
    {
      id: 'compare-the-functional-chain',
      title: { zh: '比较完整功能链，而不是元素名称', en: 'Compare the full functional chain, not element names' },
      question: { zh: '原子物种应该按什么共同口径比较？', en: 'Which common frame should compare atomic species?' },
      answer: { zh: 'Rb、Cs、Sr 和 171Yb 必须按同一装载、存储、单比特控制、纠缠、读出、复位与故障标记链比较，不能用一条跃迁或一次门代表整个平台。', en: 'Rb, Cs, Sr and 171Yb must be compared along the same loading, storage, one-qubit control, entanglement, readout, reset and fault-flag chain; one transition or gate cannot represent a platform.' },
      reasoning: [
        { zh: 'Rb 与 Cs 的碱金属超精细编码拥有成熟的微波、Raman 和双光子 Rydberg 工具链，但存储、冷却、读出和门主要共享单价电子结构。', en: 'Rb and Cs hyperfine encodings have mature microwave, Raman and two-photon Rydberg toolchains, while storage, cooling, readout and gates largely share one valence-electron structure.' },
        { zh: 'Sr 与 Yb 的两价电子结构增加窄线冷却、钟态和流形选择接口，使不同任务可以分配给不同电子态，同时增加钟激光、紫外光和多能级标定。', en: 'The two-valence-electron structure of Sr and Yb adds narrow-line cooling, clock states and manifold-selective interfaces, separating duties across electronic states while adding clock-laser, ultraviolet and multilevel calibration.' },
        { zh: '物种选择必须固定量子比特编码和门方案。同一元素采用基态核自旋、亚稳态核自旋或钟态编码时，噪声和读出接口并不相同。', en: 'Species selection must fix qubit encoding and gate protocol. Ground nuclear-spin, metastable nuclear-spin and clock-state encodings in the same element expose different noise and readout interfaces.' },
        { zh: '有效结论来自完整周期：一种物种在存储或门上的收益，可能被装载、复位、检测时延或额外光学系统抵消。', en: 'A valid conclusion comes from the complete cycle: gains in storage or gates can be offset by loading, reset, detection latency or added optical systems.' },
      ],
      measurement: { zh: '在相同阵列间距、并行度、损失定义和逻辑任务下，逐项记录制备、门、读出、复位和维护时间与错误通道。', en: 'At fixed array spacing, parallelism, loss convention and logical task, record preparation, gate, readout, reset and maintenance time and channels separately.' },
      boundary: { zh: '“碱金属”或“碱土类原子”只描述电子结构类别，不自动决定门保真度、可扩展性或容错性能。', en: '“Alkali” and “alkaline-earth-like” classify electronic structure; they do not determine gate fidelity, scalability or fault tolerance automatically.' },
      sources: [jenkinsSource, maSource],
      nextQuestion: { zh: '171Yb 的具体能级结构怎样分担这些互相冲突的任务？', en: 'How does the level structure of 171Yb divide these conflicting duties?' },
    },
    {
      id: 'why-171yb',
      title: { zh: '最小核自旋与多个电子流形分工', en: 'A minimal nuclear spin with multiple electronic manifolds' },
      question: { zh: '171Yb 的物理结构提供了哪些可组合接口？', en: 'Which composable interfaces does 171Yb provide?' },
      answer: { zh: '171Yb 的 I=1/2 核自旋提供二能级信息载体，两价电子结构再用基态、亚稳 3P0、窄线激发态和 Rydberg 态分别承担冷却、存储、门与检测。', en: 'The I=1/2 nuclear spin of 171Yb provides a two-level information carrier, while its two-valence-electron structure assigns cooling, storage, gates and detection across the ground, metastable 3P0, narrow-line and Rydberg manifolds.' },
      reasoning: [
        { zh: 'I=1/2 只有两个核自旋投影，减少同一超精细流形内的旁观磁子能级；量子比特仍需具体定义在哪个电子流形中。', en: 'I=1/2 supplies only two nuclear-spin projections, reducing spectator Zeeman levels in one hyperfine manifold; the electronic manifold hosting the qubit must still be specified.' },
        { zh: '1S0 基态和长寿命 3P0 亚稳态均可承载核自旋信息；它们对光场、磁场、寿命和可用跃迁的响应不同。', en: 'Both the 1S0 ground state and long-lived 3P0 metastable state can carry nuclear-spin information, with different optical, magnetic, lifetime and transition interfaces.' },
        { zh: '399 nm 强跃迁适合俘获和荧光，556 nm 窄线适合进一步冷却，578 nm 钟跃迁连接基态与亚稳态，约 302 nm 通道把 3P0 耦合到目标 Rydberg 态。', en: 'The strong 399 nm line supports capture and fluorescence, the 556 nm narrow line supports further cooling, the 578 nm clock line connects ground and metastable states, and an approximately 302 nm route couples 3P0 to a selected Rydberg state.' },
        { zh: '职责分离只有在相干映射、偏振纯度、磁场稳定、紫外控制和流形选择检测能够共同标定时才有意义。', en: 'Duty separation is useful only when coherent mapping, polarization purity, field stability, ultraviolet control and manifold-selective detection can be calibrated together.' },
      ],
      equation: {
        expression: String.raw`|0\rangle=|{}^3P_0,m_F=-\tfrac12\rangle,\qquad |1\rangle=|{}^3P_0,m_F=+\tfrac12\rangle`,
        role: { zh: '明确亚稳态核自旋编码；只有先锁定编码，才能讨论门故障落在计算子空间内还是外。', en: 'Defines the metastable nuclear-spin encoding; only after fixing the encoding can gate faults be classified as inside or outside the computational subspace.' },
        symbols: [
          { zh: '3P0 是长寿命亚稳电子态，mF 是总角动量在偏置磁场方向的投影。', en: '3P0 is a long-lived metastable electronic state and mF is the projection of total angular momentum along the bias field.' },
        ],
        assumptions: [
          { zh: '这是 Ma 等实验和 Wu 等方案采用的亚稳态编码，不代表所有 Yb 量子比特实现。', en: 'This is the metastable encoding used by the Ma experiment and Wu proposal, not every Yb-qubit implementation.' },
        ],
      },
      measurement: { zh: '分别标定两核自旋态的制备、相干、映射和读出混淆矩阵，并测量基态、亚稳态和 Rydberg 流形之间的非目标转移。', en: 'Calibrate preparation, coherence, mapping and readout confusion matrices for both nuclear-spin states, and measure unintended transfer among ground, metastable and Rydberg manifolds.' },
      boundary: { zh: '多流形结构既提供错误信息，也增加校准自由度。只有系统级收益超过这些额外误差和时间开销时，才构成选择 Yb 的理由。', en: 'Multiple manifolds provide fault information and add calibration degrees of freedom. They justify Yb only when system benefit exceeds the added error and time overhead.' },
      sources: [jenkinsSource, maSource],
      nextQuestion: { zh: '门故障离开这一计算子空间后，怎样被转化为解码器可用的信息？', en: 'When a gate fault leaves this subspace, how does it become information usable by a decoder?' },
    },
    {
      id: 'erasure-information-chain',
      title: { zh: '擦除转换把部分未知故障变成已知位置', en: 'Erasure conversion turns some hidden faults into known locations' },
      question: { zh: '为什么检测到错误位置可能比单纯降低平均错误率更有价值？', en: 'Why can locating an error be more valuable than lowering only the mean error rate?' },
      answer: { zh: 'Rydberg 故障若使原子离开计算子空间，流形选择检测可把它标记为擦除；但只有把误报、漏报、残余 Pauli 错误与检测周期代价交给解码器后仍降低逻辑错误率，标记才形成净收益。', en: 'If a Rydberg fault moves an atom outside the computational subspace, manifold-selective detection can flag an erasure; the flag yields net benefit only if logical error still falls after false flags, missed flags, residual Pauli faults and detection-cycle cost enter the decoder.' },
      reasoning: [
        { zh: 'Rydberg 门中的自发衰变可把 3P0 核自旋量子比特带到计算子空间内的错误态，也可带到基态或其他非计算流形。两类故障对后续电路的传播不同。', en: 'Spontaneous decay during a Rydberg gate can produce an erroneous state inside the 3P0 qubit subspace or transfer population to ground and other non-computational manifolds. These faults propagate differently.' },
        { zh: '流形选择检测询问原子是否仍在亚稳计算子空间，而不读取保留下来的核自旋逻辑值。阳性记录把故障位置加入经典侧信息。', en: 'Manifold-selective detection asks whether the atom remains in the metastable computational subspace without reading the retained nuclear-spin value. A positive result adds a fault location to the classical record.' },
        { zh: '检测不是完美的：漏报把真实擦除留作隐藏错误，误报占用纠错能力并可能触发不必要复位，探测光还会扰动旁观原子。', en: 'Detection is imperfect: missed flags leave true erasures hidden, false flags consume correction capacity and may trigger unnecessary reset, and probe light can disturb spectator atoms.' },
        { zh: '解码器把综合征与擦除位置联合使用。位置已知缩小了可能故障集合，但残余 Pauli 错误、标签时间和空间相关性仍必须保留。', en: 'The decoder combines syndromes with erasure locations. Known locations reduce the candidate fault set, while residual Pauli error and temporal/spatial flag correlations must remain.' },
        { zh: '理论方案、物理门实验和逻辑编码实验回答不同层级：理论预测条件收益，2023 实验测门与检测，2026 实验检验擦除记录怎样进入小型逻辑码。', en: 'Theory, physical-gate experiments and logical-code experiments answer different levels: theory predicts conditional benefit, the 2023 experiment measures gates and detection, and the 2026 experiment tests erasure records in small logical codes.' },
      ],
      equation: {
        expression: String.raw`r=P(F=1|E=1),\qquad q=P(F=1|E=0)`,
        role: { zh: '用召回率 r 和误报率 q 定义检测记录质量，避免把“可检测”当成完美擦除标签。', en: 'Defines flag quality through recall r and false-positive rate q, preventing “detectable” from being treated as a perfect erasure label.' },
        symbols: [
          { zh: 'E=1 表示按预先定义发生可标记的出空间故障，F=1 表示检测器报告该位置。', en: 'E=1 denotes a pre-defined flaggable out-of-subspace fault; F=1 denotes a detector report at that location.' },
        ],
        assumptions: [
          { zh: 'E 与 F 的类别必须通过独立制备的基准数据标定，并保留邻近原子回作用。', en: 'E and F classes require independently prepared calibration data and must retain spectator back-action.' },
          { zh: 'r 和 q 不能单独决定逻辑收益；还需周期通道、码、调度和解码器。', en: 'r and q alone do not determine logical benefit; the cycle channel, code, schedule and decoder are also required.' },
        ],
      },
      measurement: { zh: '构建真实状态与检测标签的联合混淆矩阵，比较无标签、理想标签和实测标签下跨码距的逻辑错误率，并计入检测与复位时长。', en: 'Build the joint confusion matrix between true state and flag, then compare logical error across distances for no flags, ideal flags and measured flags, including detection and reset time.' },
      boundary: { zh: '擦除意味着错误位置已知，不意味着状态已修复。Wu 等给出模型阈值，Ma 等验证门级转换；逻辑收益必须由具体码和完整周期验证。', en: 'An erasure means the location is known, not that the state is repaired. Wu et al. provide model thresholds and Ma et al. validate gate-level conversion; logical benefit requires a specific code and complete cycle.' },
      sources: [wuSource, maSource, logicalYbSource],
      nextQuestion: { zh: '这些原子能级和激光通道怎样实际产生一套条件相位门？', en: 'How do these atomic levels and laser channels actually produce a conditional-phase gate?' },
    },
  ],
}
