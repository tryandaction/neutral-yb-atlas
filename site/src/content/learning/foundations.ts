import type { Chapter } from '../../types/content'

const divincenzoSource = {
  id: 'divincenzo-2000',
  citation: 'DiVincenzo, The Physical Implementation of Quantum Computation (2000)',
  url: 'https://arxiv.org/abs/quant-ph/0002077',
}

export const foundationsChapter: Chapter = {
  id: 'quantum-foundations',
  number: 1,
  title: { zh: '计算怎样成为物理过程', en: 'How computation becomes a physical process' },
  shortTitle: { zh: '计算基础', en: 'Foundations' },
  question: {
    zh: '一套抽象规则必须获得哪些物理能力，才能成为可运行、可验证并可扩展的量子计算？',
    en: 'Which physical capabilities turn an abstract rule into an executable, verifiable and scalable quantum computation?',
  },
  sections: [
    {
      id: 'what-is-computation',
      title: { zh: '先定义任务，再讨论机器', en: 'Define the task before discussing the machine' },
      question: { zh: '什么条件使一个物理过程构成计算？', en: 'When does a physical process count as a computation?' },
      answer: {
        zh: '计算是一套可重复执行并可独立验证的输入—输出关系；物理机器负责表示输入、执行允许变换并留下可判定记录。',
        en: 'A computation is a repeatable, independently verifiable input-output relation; a physical machine represents the input, performs allowed transformations and leaves a decidable record.',
      },
      reasoning: [
        { zh: '任务先给出允许输入的集合 X、允许输出的集合 Y，以及判断输出是否正确的规则；没有验收条件，就无法区分计算结果与任意物理变化。', en: 'A task first specifies an input set X, an output set Y and a rule for deciding whether an output is correct; without acceptance, a computation cannot be distinguished from an arbitrary physical change.' },
        { zh: '编码把抽象输入 x 映射到可制备的物理状态。编码必须稳定且可区分，否则相同输入不能重复建立，或不同输入会被机器混淆。', en: 'Encoding maps an abstract input x to a preparable physical state. It must be stable and distinguishable, or equal inputs cannot be reproduced and different inputs become confused.' },
        { zh: '控制按照算法规定改变物理状态。控制是否复杂并不重要；关键是它与任务规则相符，并能在误差预算内重复。', en: 'Control changes the physical state according to the algorithm. Complexity alone is irrelevant; the transformation must implement the rule and repeat within a declared error budget.' },
        { zh: '读出把末态变成经典记录 y，验收程序再比较 y 与任务要求。输出若不能被独立检查，机器就没有给出可证实的计算答案。', en: 'Readout turns the final state into a classical record y, which an acceptance procedure compares with the task. If the output cannot be checked independently, the machine has not produced a verifiable answer.' },
      ],
      equation: {
        expression: String.raw`x\in X,\qquad y=f(x)\in Y`,
        role: { zh: '定义确定性任务的输入、规则和输出；概率任务则用条件分布 p(y|x) 代替单值函数。', en: 'Defines the input, rule and output of a deterministic task; a probabilistic task replaces the single-valued function with a conditional distribution p(y|x).' },
        symbols: [
          { zh: 'X 与 Y 分别是允许输入和输出的集合。', en: 'X and Y are the allowed input and output sets.' },
          { zh: 'f 是任务规定的关系，不是机器内部动力学本身。', en: 'f is the task-level rule, not the machine dynamics themselves.' },
        ],
        assumptions: [
          { zh: '输入、输出和验收规则在运行前已经确定。', en: 'Input, output and acceptance rules are fixed before execution.' },
          { zh: '该式不假设经典或量子实现。', en: 'The expression assumes neither a classical nor a quantum implementation.' },
        ],
      },
      measurement: { zh: '对同一输入重复运行，保存全部输出并按预先定义的成功条件统计；失败、超时和无输出也必须计入。', en: 'Repeat the same input, retain every outcome and score it with a predeclared success rule; failures, timeouts and missing outputs must also be counted.' },
      boundary: { zh: '这是计算任务的定义，不是量子优势判据。复杂的物理演化若没有可检验输出，仍不能构成有用计算。', en: 'This defines a computational task, not quantum advantage. Complicated dynamics without a testable output still do not constitute useful computation.' },
      sources: [divincenzoSource],
      nextQuestion: { zh: '量子物理为状态、控制和输出增加了什么结构？', en: 'What structure does quantum physics add to states, controls and outputs?' },
    },
    {
      id: 'what-quantum-changes',
      title: { zh: '量子结构改变状态怎样组合', en: 'Quantum structure changes how states compose' },
      question: { zh: '量子计算与一般物理计算的区别在哪里？', en: 'What distinguishes quantum computation from a general physical computation?' },
      answer: {
        zh: '量子计算用密度算符、张量积状态空间和量子通道组织信息，最后仍须通过测量得到经典结果分布。',
        en: 'Quantum computation organizes information with density operators, tensor-product state spaces and quantum channels, but still ends in a classical outcome distribution obtained by measurement.',
      },
      reasoning: [
        { zh: '量子态 ρ 汇总对所有允许测量结果的概率预测；叠加振幅包含相位，因此不同演化路径可以相干相加或抵消。', en: 'A quantum state rho summarizes probabilities for all allowed measurements; superposition amplitudes carry phase, so alternative paths can add or cancel coherently.' },
        { zh: '多体系统的状态空间按张量积组合。该结构允许纠缠相关性，它不能被各子系统各自的局域状态完整描述。', en: 'Composite systems use a tensor-product state space. This permits entangled correlations that cannot be specified by separate local states alone.' },
        { zh: '制备、门和噪声统一由量子通道描述。理想封闭系统的幺正演化只是量子通道的一类，实际硬件还包含退相干、泄漏和损失。', en: 'Preparation, gates and noise are described by quantum channels. Unitary evolution of an ideal closed system is one class of channel; hardware also includes decoherence, leakage and loss.' },
        { zh: '测量把量子状态映射为经典结果 m。单次结果通常不是确定的，算法承诺体现在重复运行所得分布是否满足成功条件。', en: 'Measurement maps a quantum state to a classical outcome m. A single result is generally not deterministic; the algorithmic promise is tested on the repeated outcome distribution.' },
      ],
      equation: {
        expression: String.raw`p(m|\rho)=\operatorname{Tr}(E_m\rho),\qquad E_m\succeq0,\quad\sum_m E_m=\mathbb I`,
        role: { zh: 'Born 规则把测量前的量子态映射为可观察的经典结果概率。', en: 'The Born rule maps the pre-measurement quantum state to probabilities of observable classical outcomes.' },
        symbols: [
          { zh: 'ρ 是测量前的密度算符，满足 ρ≥0 且 Trρ=1。', en: 'rho is the pre-measurement density operator with rho >= 0 and Tr rho = 1.' },
          { zh: '{Eₘ} 是 POVM；每个 Eₘ 对应一个结果类别，包括需要时的泄漏或真空结果。', en: '{E_m} is a POVM; each E_m represents an outcome class, including leakage or vacuum when required.' },
        ],
        assumptions: [
          { zh: '结果类别在分析前定义，不能事后删除失败样本。', en: 'Outcome classes are defined before analysis; failed shots cannot be removed afterwards.' },
          { zh: '该式说明读出统计，不说明门如何产生 ρ。', en: 'The equation describes readout statistics, not how a gate produces rho.' },
        ],
      },
      measurement: { zh: '制备已知基准态并重复测量，估计完整结果分布与混淆矩阵；改变测量基可检验相位相干和纠缠相关。', en: 'Prepare known reference states and estimate the complete outcome distribution and confusion matrix; changing measurement basis tests phase coherence and entangled correlations.' },
      boundary: { zh: '叠加或纠缠本身不保证计算加速。优势必须针对具体问题、算法、资源和经典基线证明。', en: 'Superposition or entanglement alone does not guarantee computational speedup. Advantage must be established for a specific problem, algorithm, resource accounting and classical baseline.' },
      sources: [divincenzoSource],
      nextQuestion: { zh: '怎样判断一个真实硬件是否具备完整的量子处理器接口？', en: 'How can we tell whether real hardware supplies a complete quantum-processor interface?' },
    },
    {
      id: 'divincenzo-requirements',
      title: { zh: 'DiVincenzo 准则检查处理器是否完整', en: 'The DiVincenzo requirements test processor completeness' },
      question: { zh: '抽象量子计算落到硬件时，哪五项能力必须同时存在？', en: 'Which five capabilities must coexist when abstract quantum computation becomes hardware?' },
      answer: {
        zh: '五项准则分别保证信息有稳定载体、输入可知、相干能存活、控制具有通用性且输出可读；缺少任一接口都不能形成完整处理器。',
        en: 'The five requirements provide a stable carrier, known input, surviving coherence, universal control and readable output; without any one interface there is no complete processor.',
      },
      reasoning: [
        { zh: '可扩展且可表征的量子比特：必须定义计算子空间、非计算态、站点差异和串扰。若规模增加后这些对象不再可辨，算法寄存器本身就失去含义；原子阵列用站点分辨谱、泄漏和真空分类检验。', en: 'Scalable, characterized qubits: define the computational subspace, non-computational states, site variation and crosstalk. If these cease to be identifiable with scale, the algorithmic register loses meaning; atom arrays test them with site-resolved spectra and leakage/vacuum classification.' },
        { zh: '初始化到简单基准态：每次运行必须从已知输入开始。残余布居、空位或复位失败若未记录，会与门误差混合；原子平台用装载、重排、光抽运和制备混淆矩阵检验。', en: 'Initialization to a fiducial state: every run must begin from a known input. Unrecorded residual population, vacancies or reset failures mix with gate error; atom platforms test loading, rearrangement, optical pumping and preparation confusion matrices.' },
        { zh: '相关相干时间长于操作时间：相位信息必须在所需控制序列内存活。单独的最佳 T₂ 不足以证明这一点；应在相同陷阱、移动、驱动和测量条件下比较完整周期。', en: 'Relevant coherence longer than operation time: phase information must survive the required control sequence. A best-case T2 alone is insufficient; comparison must use the same trapping, motion, drive and measurement conditions as the cycle.' },
        { zh: '通用门集：局域控制必须与至少一种可验证的纠缠门组合，否则只能实现受限动力学。原子阵列需要同时测单比特控制、条件相位、Bell 相关、泄漏和重复门增长。', en: 'A universal gate set: local control must combine with at least one verified entangling gate, or dynamics remain restricted. Atom arrays must jointly test one-qubit control, conditional phase, Bell correlations, leakage and repeated-gate growth.' },
        { zh: '指定量子比特测量：输出必须对应明确站点和结果类别。没有局域读出就不能取得算法答案或纠错综合征；原子平台需报告 SPAM、损失、泄漏、旁观原子回作用和中途测量时延。', en: 'Qubit-specific measurement: an output must correspond to a definite site and outcome class. Without local readout there is no algorithmic answer or QEC syndrome; atom platforms report SPAM, loss, leakage, spectator back-action and mid-circuit latency.' },
      ],
      measurement: { zh: '在同一可重复运行周期中联合报告编码、制备、相干、单/双比特门和站点读出，避免把不同日期或不同损失口径的最佳数字拼成“满足准则”。', en: 'Report encoding, preparation, coherence, one/two-qubit gates and site readout within one repeatable cycle, rather than assembling best numbers from different dates or loss conventions.' },
      boundary: { zh: '原文另列两项量子通信条件。五项处理器准则是必要条件，不是充分的容错证明，也不为平台排序。', en: 'The original paper adds two requirements for quantum communication. The five processor requirements are necessary conditions, not sufficient proof of fault tolerance and not a platform ranking.' },
      sources: [divincenzoSource],
      nextQuestion: { zh: '具备通用控制后，为什么物理错误仍会阻止大规模计算？', en: 'Once universal control exists, why do physical faults still prevent large computations?' },
    },
    {
      id: 'universal-corrected-fault-tolerant',
      title: { zh: '通用、纠错与容错回答不同问题', en: 'Universality, correction and fault tolerance answer different questions' },
      question: { zh: '为什么通用量子处理器还不是可靠量子计算机？', en: 'Why is a universal quantum processor not yet a reliable quantum computer?' },
      answer: {
        zh: '通用计算不等于容错计算：通用门集只保证目标电路可编译；纠错需要冗余与综合征，容错还必须限制纠错电路自身故障的传播。',
        en: 'Universal computation is not fault-tolerant computation: a universal gate set only makes target circuits compilable; QEC adds redundancy and syndromes, while fault tolerance also limits propagation of faults inside the correction circuit.',
      },
      reasoning: [
        { zh: '任意单比特控制只能改变各比特的局域状态；再加入一种能产生纠缠的双比特门，才可以把一般量子电路编译为硬件操作。', en: 'Arbitrary one-qubit control changes local states; adding an entangling two-qubit gate makes general quantum circuits compilable into hardware operations.' },
        { zh: '通用性不限制误差。随着门数增加，退相干、控制偏差、泄漏和损失不断累积，深电路的成功概率会下降。', en: 'Universality does not constrain error. Decoherence, control bias, leakage and loss accumulate with gate count, reducing deep-circuit success.' },
        { zh: '量子纠错把一个逻辑态冗余编码到多个物理比特，并测量不泄露逻辑信息的综合征，从记录中推断可能故障。', en: 'Quantum error correction redundantly encodes one logical state across physical qubits and measures syndromes that reveal faults without revealing logical information.' },
        { zh: '容错电路还要保证一次故障不会在纠错完成前扩散为超出码能力的多比特错误；制备、门、测量、复位和反馈都进入这一要求。', en: 'A fault-tolerant circuit also prevents one fault from spreading into more errors than the code can handle before correction; preparation, gates, measurement, reset and feedback all enter this requirement.' },
        { zh: '可扩展证据来自码距增加时逻辑错误持续下降，而不是一次后选择的高保真结果。周期时间、未完成样本和额外资源必须同时报告。', en: 'Scalable evidence is continued logical-error suppression with increasing code distance, not one high-fidelity postselected result. Cycle time, unfinished shots and added resources must be reported together.' },
      ],
      equation: {
        expression: String.raw`p_L(d+2)<p_L(d)\quad\text{for the same }\mathcal E_{\mathrm{cycle}}`,
        role: { zh: '给出最小的缩放判据：在相同周期通道与调度下，增加码距应降低逻辑错误率。', en: 'States the minimal scaling test: under the same cycle channel and schedule, increasing code distance should lower logical error.' },
        symbols: [
          { zh: 'pL(d) 是码距 d 下每周期或每逻辑操作的错误率，口径必须固定。', en: 'pL(d) is logical error per cycle or logical operation at distance d, with a fixed convention.' },
          { zh: 'Ecycle 是包含门、测量、复位、损失、标签和相关性的周期通道。', en: 'E_cycle is the cycle channel including gates, measurement, reset, loss, flags and correlations.' },
        ],
        assumptions: [
          { zh: '各码距使用同一噪声条件、解码语义和样本保留规则。', en: 'All distances use the same noise conditions, decoder semantics and sample-retention rule.' },
          { zh: '该不等式是实验判据，不指定某种量子码的解析缩放公式。', en: 'This inequality is an experimental test, not an analytic scaling law for a particular code.' },
        ],
      },
      measurement: { zh: '在多个码距和综合征轮数上重复同一逻辑存储或门，保存全部探测事件、解码结果、未完成样本与时间开销。', en: 'Repeat the same logical memory or gate across code distances and syndrome rounds, retaining all detection events, decoder outcomes, unfinished shots and timing overhead.' },
      boundary: { zh: 'DiVincenzo 准则判断硬件接口是否完整；阈值与逻辑缩放取决于具体周期通道、量子码、调度和解码器。', en: 'The DiVincenzo requirements test hardware completeness; thresholds and logical scaling depend on the actual cycle channel, code, schedule and decoder.' },
      sources: [divincenzoSource],
      nextQuestion: { zh: '在相同逻辑任务下，中性原子把系统难题放在了哪里？', en: 'For the same logical task, where do neutral atoms place the system difficulty?' },
    },
  ],
}
