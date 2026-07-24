import type { RouteId } from '../../navigation/routes'
import type { LocalizedText } from '../../types/content'

export interface DomainOutlineItem {
  id: string
  label: LocalizedText
}

export interface DomainDefinition {
  title: LocalizedText
  thesis: LocalizedText
  outline: DomainOutlineItem[]
  contextTitle: LocalizedText
  contextItems: LocalizedText[]
}

export const domainDefinitions: Record<Exclude<RouteId, 'overview'>, DomainDefinition> = {
  foundations: {
    title: { zh: '从计算定义到物理实现', en: 'From computation to physical implementation' },
    thesis: {
      zh: '先用可检验的测量统计定义计算，再逐项检查 DiVincenzo 五项处理器条件；只有在此基础上，才能在固定纠错任务下比较中性原子与其他硬件路线。',
      en: 'Define computation through testable measurement statistics, then examine the five DiVincenzo processor conditions one by one; only then compare neutral atoms with other hardware routes under a fixed correction task.',
    },
    outline: [
      { id: 'quantum-foundations', label: { zh: '计算与物理实现准则', en: 'Computation and implementation criteria' } },
      { id: 'neutral-atoms', label: { zh: '为什么选择中性原子', en: 'Why choose neutral atoms' } },
    ],
    contextTitle: { zh: '判定框架', en: 'Decision frame' },
    contextItems: [
      { zh: '状态空间、初始化、相干、通用门和测量是否在同一周期内成立？', en: 'Do state space, initialization, coherence, universal gates and measurement coexist in one cycle?' },
      { zh: '平台比较是否固定了算法、量子码、损失定义和墙钟时间？', en: 'Does the platform comparison fix algorithm, code, loss convention and wall-clock time?' },
      { zh: '增加物理资源后，每逻辑操作的失败概率是否下降？', en: 'Does failure per logical operation fall when physical resources increase?' },
    ],
  },
  'yb-platform': {
    title: { zh: '为什么在中性原子中选择 171Yb', en: 'Why choose 171Yb among neutral atoms' },
    thesis: {
      zh: '171Yb 以最小核自旋空间承载信息，以多电子流形分配冷却、门和读出；只有当错误标记的解码收益超过检测与复位开销时，这种职责分离才成为纠错优势。',
      en: '171Yb stores information in a minimal nuclear-spin space and divides cooling, gates and readout across electronic manifolds; this separation becomes a QEC advantage only when decoder gains from fault flags exceed detection and reset overhead.',
    },
    outline: [
      { id: 'yb-platform', label: { zh: 'Rb、Cs、Sr 与 Yb', en: 'Rb, Cs, Sr and Yb' } },
      { id: 'yb-energy-tutor', label: { zh: '能级与实验通道', en: 'Levels and laboratory channels' } },
      { id: 'yb-complete-reference-map', label: { zh: '完整参考图', en: 'Complete reference map' } },
      { id: 'species-comparison', label: { zh: '物种比较', en: 'Species comparison' } },
    ],
    contextTitle: { zh: '平台判定', en: 'Platform test' },
    contextItems: [
      { zh: '物种比较是否采用相同编码、门并行度和损失口径？', en: 'Does the species comparison use the same encoding, gate parallelism and loss convention?' },
      { zh: '核自旋存储、Rydberg 门与流形选择读出能否分别标定？', en: 'Can nuclear-spin storage, Rydberg gates and manifold-selective readout be calibrated separately?' },
      { zh: '误报、漏报、残余 Pauli 与检测时延是否仍给出净逻辑收益？', en: 'Do false flags, missed flags, residual Pauli error and detection latency still leave a net logical gain?' },
    ],
  },
  'gates-theory': {
    title: { zh: '量子门与理论—实验闭环', en: 'Quantum gates and the theory–experiment loop' },
    thesis: {
      zh: '门设计从目标幺正开始，以可产生的哈密顿量为中介，以能够区分误差机制的测量结束。',
      en: 'Gate design starts from a target unitary, passes through a realizable Hamiltonian and ends with measurements that discriminate error mechanisms.',
    },
    outline: [
      { id: 'gates', label: { zh: '从能级到量子门', en: 'From levels to gates' } },
      { id: 'rydberg-gate-tutor', label: { zh: 'Rydberg 阻塞门', en: 'Rydberg blockade gate' } },
      { id: 'theory', label: { zh: '可测模型', en: 'Measurable model' } },
    ],
    contextTitle: { zh: '门的证据链', en: 'Gate evidence chain' },
    contextItems: [
      { zh: '先从原子态与选择定则确定可用控制，再写出驱动哈密顿量。', en: 'Start from atomic states and selection rules, then write the driven Hamiltonian.' },
      { zh: '分别观察布居、条件相位、泄漏和损失，避免把不同机制压成一个分数。', en: 'Observe population, conditional phase, leakage and loss separately instead of compressing mechanisms into one score.' },
      { zh: '比较模型与测量时明确近似和适用范围，不把代理量称为门保真度。', en: 'State approximations and scope when comparing model and measurement; do not call a proxy gate fidelity.' },
    ],
  },
  experiment: {
    title: { zh: '实验循环：原子状态怎样被准备、控制和读出', en: 'Experimental cycle: how atomic states are prepared, controlled and read' },
    thesis: {
      zh: '沿着原子真正经历的顺序，把装载、重排、编码、门、成像、解码与复位连接为一个可重复周期；每一步都用可观测量说明状态怎样改变。',
      en: 'Follow the order experienced by the atoms, connecting loading, rearrangement, encoding, gates, imaging, decoding and reset into a repeatable cycle; each step explains the state change through observables.',
    },
    outline: [
      { id: 'experiment', label: { zh: '原子计算周期', en: 'Atomic computation cycle' } },
      { id: 'experiment-pipeline-tutor', label: { zh: '装置如何改变原子状态', en: 'How apparatus changes atomic states' } },
      { id: 'experiment-cycle-timeline', label: { zh: '光场怎样构成一个周期', en: 'How optical fields form one cycle' } },
      { id: 'experiment-visual-atlas', label: { zh: 'Yb 实验装置全链路', en: 'Yb apparatus path' } },
    ],
    contextTitle: { zh: '学习提示', en: 'Learning prompts' },
    contextItems: [
      { zh: '先问原子在这一步处于什么状态，再问哪个装置改变了哪个哈密顿量参数。', en: 'First identify the atomic state, then ask which apparatus changes which Hamiltonian parameter.' },
      { zh: '把控制时序、原子响应与最终测量并排理解，避免只记设备名称。', en: 'Read control timing, atomic response and final measurement together instead of memorizing component names.' },
      { zh: '装置特定参数均保留来源与适用范围；只有核对所引实验协议后，才比较不同系统的参数。', en: 'Apparatus-specific values retain their source and scope; compare parameters only after checking the cited protocol.' },
    ],
  },
  'fault-tolerance': {
    title: { zh: '通用容错如何转化为规模与成本', en: 'How universal fault tolerance becomes scale and cost' },
    thesis: {
      zh: '通用门集只是起点；物理通道必须经过容错电路与解码形成可缩放的逻辑错误率，并与吞吐、可用率共同决定一次可信结果的成本。',
      en: 'A universal gate set is only the start; physical channels must pass through fault-tolerant circuits and decoding to produce a scalable logical error rate, which combines with throughput and availability to determine cost per trustworthy result.',
    },
    outline: [
      { id: 'fault-tolerance', label: { zh: '从通用门集到逻辑错误', en: 'Universal gates to logical error' } },
      { id: 'resource-estimator', label: { zh: '资源估算', en: 'Resource estimate' } },
      { id: 'scale-chain', label: { zh: '规模与吞吐', en: 'Scale and throughput' } },
      { id: 'cost-chain', label: { zh: '可信结果成本', en: 'Cost per trustworthy result' } },
    ],
    contextTitle: { zh: '容错判据', en: 'Fault-tolerance test' },
    contextItems: [
      { zh: '物理机制是否映射为带时空相关和标记质量的电路级通道？', en: 'Are physical mechanisms mapped to a circuit-level channel with correlations and flag quality?' },
      { zh: '相同噪声条件下，增加码距是否持续降低逻辑错误？', en: 'Under the same noise conditions, does increasing code distance keep lowering logical error?' },
      { zh: '非 Clifford 资源、译码、维护和失败重试是否计入可信结果成本？', en: 'Do non-Clifford resources, decoding, maintenance and failed retries enter cost per trustworthy result?' },
    ],
  },
  evidence: {
    title: { zh: '延伸阅读与出处', en: 'Further reading and sources' },
    thesis: {
      zh: '按学习主题回到原始论文、综述和权威数据库，区分教学概念、实验结果与可查证的出处。',
      en: 'Return to original papers, reviews and authoritative databases by learning topic, distinguishing teaching concepts, experimental results and traceable sources.',
    },
    outline: [
      { id: 'evidence', label: { zh: '按主题阅读', en: 'Read by topic' } },
    ],
    contextTitle: { zh: '阅读方法', en: 'How to read' },
    contextItems: [
      { zh: '先读综述建立问题框架，再回到原始论文核对具体结论。', en: 'Use reviews to establish the question, then return to original papers for specific claims.' },
      { zh: '阅读参数时同时确认定义、实验条件和测量方法。', en: 'When reading a parameter, check its definition, experimental conditions and measurement method together.' },
      { zh: '本页链接用于追溯来源，不替代完整论文与补充材料。', en: 'Links on this page provide traceability; they do not replace the full paper and supplementary material.' },
    ],
  },
}
