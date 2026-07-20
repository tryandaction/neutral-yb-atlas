import type { Chapter } from '../../types/content'

const neutralAtomReview = {
  id: 'browaeys-lahaye-2020',
  citation: 'Browaeys and Lahaye, Many-body physics with individually controlled Rydberg atoms (2020)',
  url: 'https://doi.org/10.1038/s41567-019-0733-z',
}

const logicalProcessor = {
  id: 'bluvstein-2024',
  citation: 'Bluvstein et al., Logical quantum processor based on reconfigurable atom arrays, Nature 626 (2024)',
  url: 'https://doi.org/10.1038/s41586-023-06927-3',
}

export const neutralAtomsChapter: Chapter = {
  id: 'neutral-atoms',
  number: 2,
  title: { zh: '为什么考虑中性原子', en: 'Why consider neutral atoms' },
  shortTitle: { zh: '中性原子', en: 'Neutral atoms' },
  question: { zh: '在相同逻辑任务下，中性原子相对超导、离子阱和光子路线解决什么约束，又把代价移到哪里？', en: 'For the same logical task, which constraints do neutral atoms relieve relative to superconducting, trapped-ion and photonic routes, and where do they move the cost?' },
  sections: [
    {
      id: 'fix-the-computational-task',
      title: { zh: '比较平台之前先固定任务', en: 'Fix the task before comparing platforms' },
      question: { zh: '不同硬件怎样进行有意义的比较？', en: 'How can unlike hardware platforms be compared meaningfully?' },
      answer: { zh: '先固定算法、逻辑错误目标、量子码、完成期限和损失口径，再比较完成同一任务所需的物理资源与时间。', en: 'Fix the algorithm, logical-error target, code, deadline and loss convention first, then compare the physical resources and time required for the same task.' },
      reasoning: [
        { zh: '逻辑任务规定逻辑量子比特数、非 Clifford 资源、测量与反馈需求以及允许失败概率；这些量决定硬件真正要执行的电路，而不是实验展示的单个门。', en: 'The logical task fixes logical qubits, non-Clifford resources, measurement/feedforward requirements and allowed failure; these define the circuit the hardware must execute, not one demonstration gate.' },
        { zh: '量子码与编译决定连接、并行度、综合征轮数和路由需求。同一物理门指标放入不同代码或调度后，可以产生完全不同的逻辑成本。', en: 'Code and compilation determine connectivity, parallelism, syndrome rounds and routing. The same physical-gate metric can produce very different logical cost under different codes and schedules.' },
        { zh: '损失、泄漏、SPAM、后选择与未完成样本必须采用同一口径；否则一个平台删除的样本可能被另一个平台计为失败。', en: 'Loss, leakage, SPAM, postselection and unfinished shots require one convention; otherwise samples removed by one platform may count as failures on another.' },
        { zh: '最终比较量应包含物理比特、周期时间、有效吞吐、控制与维护资源、可用率和达到目标成功概率所需的重复次数。', en: 'Final comparison includes physical qubits, cycle time, useful throughput, control and maintenance resources, availability and repetitions needed to reach the target success probability.' },
      ],
      measurement: { zh: '为同一逻辑电路生成平台特定编译和时序表，使用同一失败定义统计墙钟时间、资源峰值和成功率。', en: 'Compile and schedule the same logical circuit for each platform, then score wall-clock time, peak resources and success under one failure definition.' },
      boundary: { zh: '论文中的单项最高保真度不能直接形成平台排名；结论只对已声明任务、误差模型和时间约束成立。', en: 'Best published component fidelities do not form a platform ranking; conclusions apply only to the declared task, error model and timing constraints.' },
      sources: [logicalProcessor],
      nextQuestion: { zh: '在这一固定任务中，中性原子的物理接口提供了什么交换？', en: 'Within that fixed task, what exchange do neutral-atom interfaces provide?' },
    },
    {
      id: 'neutral-atom-exchange',
      title: { zh: '静置时隔离，门期间耦合', en: 'Isolation while idle, coupling during a gate' },
      question: { zh: '中性原子如何同时获得长时间存储和双比特相互作用？', en: 'How do neutral atoms combine long-lived storage with two-qubit interaction?' },
      answer: { zh: '基态原子在光镊中近似独立存储；门操作短暂激发 Rydberg 态，以强状态依赖相互作用产生条件相位。', en: 'Ground-state atoms store approximately independently in tweezers; a gate briefly excites Rydberg states so a strong state-dependent interaction produces conditional phase.' },
      reasoning: [
        { zh: '同一同位素的原子共享内部能级结构，不需要逐器件制造；实际站点差异主要来自陷阱深度、光场、磁场和成像条件。', en: 'Atoms of one isotope share an internal spectrum and need no device-by-device fabrication; practical site variation comes from trap depth, optical fields, magnetic fields and imaging.' },
        { zh: '远离 Rydberg 激发时，选定基态或亚稳态之间的相互作用很弱，利于保存单比特相干，但也意味着必须主动开启纠缠接口。', en: 'Away from Rydberg excitation, selected ground or metastable states interact weakly, which protects one-qubit coherence but requires an actively switched entangling interface.' },
        { zh: '激光把参与门的原子耦合到 Rydberg 态；双激发态的相互作用能移改变共振条件和积累相位，从而实现阻塞或其他条件门协议。', en: 'Lasers couple gate atoms to Rydberg states; the interaction shift of the doubly excited state changes resonance and accumulated phase, enabling blockade or related conditional-gate protocols.' },
        { zh: '光镊可移动原子并重排几何，使连接关系由时序而非固定布线定义；移动同时引入加热、相位积累、调度冲突和额外周期时间。', en: 'Tweezers move atoms and reconfigure geometry, so connectivity is scheduled rather than hard-wired; motion also adds heating, phase accumulation, scheduling conflicts and cycle time.' },
      ],
      equation: {
        expression: String.raw`V(R)\simeq\frac{C_6}{R^6},\qquad |V(R_b)|=\hbar\Omega`,
        role: { zh: '连接原子间距、Rydberg 相互作用和阻塞尺度，说明几何为什么直接进入门设计。', en: 'Connects atom separation, Rydberg interaction and blockade scale, showing why geometry enters gate design directly.' },
        symbols: [
          { zh: 'R 是原子间距，C₆ 是选定 Rydberg 态和角动量通道的色散系数。', en: 'R is atom separation and C6 is the dispersion coefficient for the selected Rydberg state and angular channel.' },
          { zh: 'Ω 是有效驱动角频率，Rb 由相互作用能移与驱动能标相等定义。', en: 'Omega is the effective drive angular frequency; Rb is defined where interaction shift equals the drive energy scale.' },
        ],
        assumptions: [
          { zh: '范德瓦耳斯形式要求远离 Förster 共振，并忽略多通道混合和角向依赖。', en: 'The van der Waals form assumes operation away from Förster resonances and neglects multichannel mixing and angular dependence.' },
          { zh: 'Rb 是设计尺度，不是门保真度；有限温度、脉冲带宽和邻近原子仍需进入模型。', en: 'Rb is a design scale, not gate fidelity; finite temperature, pulse bandwidth and spectators still enter the model.' },
        ],
      },
      measurement: { zh: '扫描双原子距离和角度，同时测双原子谱、双激发概率与条件相位，以验证所用 V(R) 而非只引用理论 C₆。', en: 'Scan pair separation and angle while measuring pair spectra, double excitation and conditional phase, validating the operative V(R) rather than quoting a theoretical C6 alone.' },
      boundary: { zh: '天然相同的原子不等于天然均匀的控制；站点光场、串扰和并行脉冲必须随阵列规模重新表征。', en: 'Identical atoms do not imply uniform control; site fields, crosstalk and parallel pulses must be re-characterized as the array grows.' },
      sources: [neutralAtomReview],
      nextQuestion: { zh: '这种隔离、耦合和移动组合在什么任务中值得付出光学控制代价？', en: 'For which tasks is this combination of isolation, coupling and motion worth its optical-control cost?' },
    },
    {
      id: 'platform-decision',
      title: { zh: '平台优势是任务条件下的系统结论', en: 'Platform advantage is a task-conditioned system result' },
      question: { zh: '中性原子相对其他路线的决定性条件是什么？', en: 'Which conditions make neutral atoms preferable to other routes?' },
      answer: { zh: '超导、离子阱、光子和中性原子把连接、速度、存储、读出与维护代价放在不同位置；中性原子只在可重构并行度的收益超过装载、移动、光学控制和损失代价时占优。', en: 'Superconducting, trapped-ion, photonic and neutral-atom systems place connectivity, speed, storage, readout and maintenance costs differently; neutral atoms win only when reconfigurable parallelism outweighs loading, motion, optical-control and loss costs.' },
      reasoning: [
        { zh: '超导电路提供快速门和芯片集成，但固定耦合图、频率拥挤、低温布线和器件离散性进入扩展预算。', en: 'Superconducting circuits provide fast gates and chip integration, while fixed coupling graphs, frequency crowding, cryogenic wiring and device variation enter scaling.' },
        { zh: '离子阱提供长相干、高质量读出和共享运动模连接，但长链模式拥挤、门速率和跨区运输限制完整周期吞吐。', en: 'Trapped ions provide long coherence, high-quality readout and shared-mode connectivity, while long-chain mode crowding, gate rate and inter-zone transport limit cycle throughput.' },
        { zh: '光子天然适合传输和模块互连，但损耗、概率性纠缠、资源态生成与长寿命存储决定重复开销。', en: 'Photons naturally support transmission and modular links, while loss, probabilistic entanglement, resource-state generation and long-lived storage determine repetition cost.' },
        { zh: '中性原子提供大阵列、移动连接和全局并行操作，但随机装载、成像、补原子、运动加热和共享激光噪声必须进入同一纠错周期。', en: 'Neutral atoms provide large arrays, transport connectivity and global parallel operations, while stochastic loading, imaging, replacement, motional heating and shared-laser noise enter the same correction cycle.' },
      ],
      measurement: { zh: '比较同一逻辑块在各平台上的调度，报告每逻辑操作的物理资源、周期数、墙钟时间、可用率与全部失败样本。', en: 'Schedule the same logical block on each platform and report physical resources, cycles, wall-clock time, availability and all failed shots per logical operation.' },
      boundary: { zh: '该比较不是普适平台排名，也不从当前器件规模外推长期成本；它给出的是在固定任务和显式假设下的选择方法。', en: 'This is not a universal platform ranking and does not extrapolate long-term cost from current device size; it is a selection method under a fixed task and explicit assumptions.' },
      sources: [logicalProcessor, neutralAtomReview],
      nextQuestion: { zh: '进入中性原子路线后，为什么还要在 Rb、Cs、Sr 与 Yb 之间选择？', en: 'Once the neutral-atom route is chosen, why choose among Rb, Cs, Sr and Yb?' },
    },
  ],
}
