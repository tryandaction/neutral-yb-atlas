import type { Chapter } from '../../types/content'

const coolingSource = { id: 'burgers-2018', citation: 'Burgers et al., Narrow-Line Cooling and Imaging of Ytterbium Atoms in an Optical Tweezer Array (2018)', url: 'https://arxiv.org/abs/1806.04625' }
const qubitSource = { id: 'jenkins-2022', citation: 'Jenkins et al., Ytterbium Nuclear-Spin Qubits in an Optical Tweezer Array (2022)', url: 'https://doi.org/10.1103/PRXQuantum.3.020315' }
const gateSource = { id: 'ma-2023', citation: 'Ma et al., High-fidelity gates and mid-circuit erasure conversion in an atomic qubit (2023)', url: 'https://doi.org/10.1038/s41586-023-06438-1' }
const logicalSource = { id: 'bluvstein-2024', citation: 'Bluvstein et al., Logical quantum processor based on reconfigurable atom arrays, Nature 626 (2024)', url: 'https://doi.org/10.1038/s41586-023-06927-3' }
const replacementSource = { id: 'li-2025', citation: 'Li et al., Fast, continuous and coherent atom replacement in a neutral atom qubit array (2025)', url: 'https://arxiv.org/abs/2506.15633' }

export const experimentChapter: Chapter = {
  id: 'experiment',
  number: 5,
  title: { zh: '怎样完成一次可重复的原子计算周期', en: 'How one repeatable atomic-computation cycle works' },
  shortTitle: { zh: '实验周期', en: 'Atom cycle' },
  question: { zh: '原子从进入真空系统到形成量子比特、执行门、产生记录并重新开始，状态和错误怎样逐步传递？', en: 'From entering vacuum to becoming a qubit, executing gates, producing records and starting again, how do atomic states and faults propagate?' },
  sections: [
    {
      id: 'prepare-the-array',
      title: { zh: '从原子束到确定占据的阵列', en: 'From an atomic beam to an occupancy-known array' },
      question: { zh: '怎样把热原子转化为位置已知、可继续计算的单原子阵列？', en: 'How are thermal atoms turned into a site-known single-atom array ready for computation?' },
      answer: { zh: '真空和减速提供可捕获原子通量，两级冷却降低速度，光镊随机装载单原子；成像识别占据后，移动光镊把已占据站点重排成目标几何。', en: 'Vacuum and slowing provide capturable flux, two-stage cooling reduces velocity, and tweezers load single atoms stochastically; imaging identifies occupancy and moving tweezers rearrange occupied sites into the target geometry.' },
      reasoning: [
        { zh: '原子炉温度决定 Yb 蒸气压与束流；差分抽气和背景气体决定科学腔压力与碰撞寿命，因此真空故障表现为装载率或保持寿命变化。', en: 'Oven temperature sets Yb vapor pressure and flux; differential pumping and background gas set science-cell pressure and collision lifetime, so vacuum faults appear in loading or survival.' },
        { zh: '399 nm 宽线 MOT 提供捕获速度，556 nm 窄线 MOT 进一步降低温度；末态温度和云位置决定进入微米光镊的概率。', en: 'A broad 399 nm MOT provides capture range and a narrow 556 nm MOT lowers temperature; final temperature and cloud position set transfer probability into micron-scale tweezers.' },
        { zh: '单原子装载通常随机，首次成像把每个站点分类为占据、空位或不确定；分类混淆直接影响后续路径规划。', en: 'Single-atom loading is usually stochastic. First imaging classifies each site as occupied, empty or uncertain, and classification confusion directly affects path planning.' },
        { zh: '重排把已占据原子移动到目标站点。移动时间、轨迹加速度和路径冲突决定加热、损失和周期时长，移动后必须再次确认占据。', en: 'Rearrangement moves occupied atoms to target sites. Duration, acceleration and path conflicts determine heating, loss and cycle time, so occupancy is checked again after motion.' },
      ],
      measurement: { zh: '保存压力、原子通量、MOT 数目与温度、逐站点装载概率、原始成像帧、分类混淆矩阵、移动路径和移动后生存率。', en: 'Retain pressure, atomic flux, MOT number and temperature, site loading probabilities, raw images, classification confusion, motion paths and post-motion survival.' },
      boundary: { zh: '最终填充率不能单独描述制备质量；同样填充率可对应不同分类错误、移动损失、温升和准备时间。', en: 'Final filling alone does not describe preparation quality; the same filling can hide different classification errors, motion loss, heating and preparation time.' },
      sources: [coolingSource],
      nextQuestion: { zh: '怎样把这些原子制备为相位可控的计算基并执行门？', en: 'How are these atoms prepared in a phase-controlled computational basis and gated?' },
    },
    {
      id: 'encode-and-control',
      title: { zh: '从占据阵列到受控量子寄存器', en: 'From an occupied array to a controlled quantum register' },
      question: { zh: '原子什么时候真正成为可操控的量子比特？', en: 'When does an atom become a controllable qubit?' },
      answer: { zh: '只有在计算基、初态、相位参考和非计算态分类都被标定后，已占据原子才成为量子比特；单比特与 Rydberg 门随后按共享时钟执行。', en: 'An occupied atom becomes a qubit only after its computational basis, initial state, phase reference and non-computational classes are calibrated; one-qubit and Rydberg gates then run on a shared clock.' },
      reasoning: [
        { zh: '光抽运与相干映射把原子放入指定核自旋态；残余布居、空位和流形错误必须在制备混淆矩阵中分开。', en: 'Optical pumping and coherent mapping place atoms in a selected nuclear-spin state; residual population, vacancies and manifold errors remain separate in the preparation confusion matrix.' },
        { zh: '单比特控制建立 Rabi 频率、失谐和相位参考；跨站点强度、光移和磁场差异决定同一全局脉冲是否实现同一旋转。', en: 'One-qubit control establishes Rabi frequency, detuning and phase reference; site variation in intensity, light shift and field determines whether one global pulse realizes one rotation.' },
        { zh: '纠缠门把选定原子短暂耦合到 Rydberg 态。有限阻塞、运动、衰变和相位噪声形成门级条件通道，而非一个可随意相加的误差数字。', en: 'Entangling gates briefly couple selected atoms to Rydberg states. Finite blockade, motion, decay and phase noise form a gate-level conditional channel rather than freely additive scalar errors.' },
        { zh: '所有波形必须共享时间基准；重排后的站点映射、激光选择和门调度若不同步，会把控制施加到错误原子。', en: 'All waveforms share one time base; if post-rearrangement site maps, laser addressing and gate schedules disagree, control is applied to the wrong atoms.' },
      ],
      measurement: { zh: '联合记录制备混淆矩阵、Rabi/Ramsey、站点光移、门真值表、条件相位、泄漏、损失和实际下发波形。', en: 'Jointly record preparation confusion, Rabi/Ramsey, site light shifts, gate truth table, conditional phase, leakage, loss and delivered waveforms.' },
      boundary: { zh: '控制器设定值不是原子参数；Ω、Δ、相位和 V 必须由原子响应反演，并随并行密度和阵列几何复核。', en: 'Controller settings are not atomic parameters; Omega, Delta, phase and V are inferred from atomic response and rechecked against parallel density and geometry.' },
      sources: [qubitSource, gateSource],
      nextQuestion: { zh: '门结束后，怎样把量子状态转成解码器可用的记录并恢复阵列？', en: 'After gates, how does the state become a decoder record and how is the array restored?' },
    },
    {
      id: 'measure-decode-reset',
      title: { zh: '测量、解码、复位形成闭环', en: 'Measurement, decoding and reset close the loop' },
      question: { zh: '一次测量怎样影响同一计算中的后续操作？', en: 'How does one measurement affect later operations in the same computation?' },
      answer: { zh: '状态选择成像产生站点结果与故障标签，实时系统把它们转换为综合征记录，解码器更新恢复或 Pauli frame，随后对测量过或丢失的原子复位、移动或补充。', en: 'State-selective imaging produces site outcomes and fault flags; real-time processing forms syndrome records, the decoder updates a recovery or Pauli frame, and measured or lost atoms are reset, moved or replaced.' },
      reasoning: [
        { zh: '测量分类至少区分计算态结果、泄漏流形、原子损失和不确定事件；将损失当作暗态会污染综合征。', en: 'Measurement classification separates computational outcomes, leakage manifolds, atom loss and uncertain events; treating loss as a dark state contaminates syndromes.' },
        { zh: '中途测量必须限制对存储原子的散射、光移和热效应；局域测量的空间选择性和回作用共同决定可否在电路中使用。', en: 'Mid-circuit measurement limits scattering, light shifts and heating on stored atoms; spatial selectivity and back-action jointly determine circuit usability.' },
        { zh: '图像处理、标签关联和解码有有限延迟。等待期间的存储误差以及错误时间戳必须进入周期通道。', en: 'Image processing, flag association and decoding have finite latency. Memory error during waiting and timestamp mistakes enter the cycle channel.' },
        { zh: '复位和补原子改变下一周期的占据与映射；反馈动作必须与逻辑帧、物理站点和新的调度保持一致。', en: 'Reset and replacement change occupancy and mapping for the next cycle; feedback must remain consistent with the logical frame, physical sites and revised schedule.' },
      ],
      measurement: { zh: '端到端测量标签混淆矩阵、旁观原子回作用、曝光到反馈延迟、解码输出、复位成功率和补原子时间。', en: 'Measure end-to-end flag confusion, spectator back-action, exposure-to-feedback latency, decoder output, reset success and replacement time.' },
      boundary: { zh: '高读出保真度不保证高质量中途测量；后者还要求低回作用、可接受延迟和与解码器一致的完整结果分类。', en: 'High readout fidelity does not guarantee good mid-circuit measurement; the latter also requires low back-action, acceptable latency and decoder-consistent outcome classes.' },
      sources: [gateSource, logicalSource],
      nextQuestion: { zh: '这些步骤能否在长时间运行中以稳定口径重复？', en: 'Can these steps repeat with stable definitions over long operation?' },
    },
    {
      id: 'repeat-the-cycle',
      title: { zh: '可扩展实验的单位是完整周期', en: 'The complete cycle is the unit of scalable operation' },
      question: { zh: '为什么一次成功演示不足以证明系统可运行？', en: 'Why does one successful demonstration not establish an operating system?' },
      answer: { zh: '装载、重排、制备、门、测量、解码、复位和补原子必须连续重复，并用同一时间基准和结果口径统计；最慢或最不稳定的步骤决定长期吞吐与可用率。', en: 'Loading, rearrangement, preparation, gates, measurement, decoding, reset and replacement must repeat continuously under one clock and outcome convention; the slowest or least stable step sets long-run throughput and availability.' },
      reasoning: [
        { zh: '每周期保留完整事件流，把空位、失败分类、超时、控制异常和未完成样本计入分母，避免后选择制造虚假稳定性。', en: 'Each cycle retains a complete event stream, counting vacancies, classification failures, timeouts, control exceptions and unfinished shots to avoid postselected stability.' },
        { zh: '漂移监控必须连接到原子可观测量而非只监控仪器设定；频率、功率、磁场或焦点变化应能定位到受影响的周期和站点。', en: 'Drift monitoring connects to atomic observables rather than controller settings alone; frequency, power, field or focus changes must map to affected cycles and sites.' },
        { zh: '维护、重新锁定和再装载造成停机。有效吞吐按总墙钟时间计算，而不是只按成功电路的脉冲时长。', en: 'Maintenance, relocking and reloading create downtime. Useful throughput uses total wall-clock time, not pulse duration of successful circuits alone.' },
        { zh: '周期记录最终生成电路级条件通道，成为纠错模拟和逻辑错误分析的输入。组件最佳值不能替代这一端到端对象。', en: 'Cycle records define a circuit-level conditional channel for QEC simulation and logical-error analysis. Component best cases cannot replace this end-to-end object.' },
      ],
      measurement: { zh: '连续运行并报告周期时间分布、成功率、停机分类、漂移相关性、站点热图和完整样本保留规则。', en: 'Run continuously and report cycle-time distribution, success rate, downtime classes, drift correlations, site maps and the complete sample-retention rule.' },
      boundary: { zh: '周期稳定性是进入逻辑评估的必要条件，但仍不等同于逻辑错误随码距下降；后者还需要具体量子码和解码器。', en: 'Cycle stability is required for logical evaluation but is not itself code-distance suppression; that also needs a particular code and decoder.' },
      sources: [logicalSource, replacementSource],
      nextQuestion: { zh: '完整周期中的物理故障怎样转化为逻辑错误率？', en: 'How do physical faults in the complete cycle become a logical error rate?' },
    },
  ],
}
