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
    title: { zh: '计算与物理实现', en: 'Computation and physical implementation' },
    thesis: {
      zh: '状态、门和测量只有同时具备数学定义、物理实现与验收量，才构成可验证计算。',
      en: 'States, gates and measurements form verifiable computation only when mathematical definitions, physical implementations and acceptance quantities agree.',
    },
    outline: [
      { id: 'core-computation-map', label: { zh: '计算怎样成为物理过程', en: 'Computation as a physical process' } },
    ],
    contextTitle: { zh: '判定框架', en: 'Decision frame' },
    contextItems: [
      { zh: '状态空间、初始化、相干、通用门和测量是否在同一周期内成立？', en: 'Do state space, initialization, coherence, universal gates and measurement coexist in one cycle?' },
      { zh: '平台比较是否固定了算法、量子码、损失定义和墙钟时间？', en: 'Does the platform comparison fix algorithm, code, loss convention and wall-clock time?' },
      { zh: '增加物理资源后，每逻辑操作的失败概率是否下降？', en: 'Does failure per logical operation fall when physical resources increase?' },
    ],
  },
  'yb-platform': {
    title: { zh: '¹⁷¹Yb 中性原子平台', en: 'The ¹⁷¹Yb neutral-atom platform' },
    thesis: {
      zh: '平台价值取决于核自旋存储与多电子流形控制的职责分离能否降低完整周期的逻辑错误。',
      en: 'Platform value depends on whether separating nuclear-spin storage from multi-manifold control lowers full-cycle logical error.',
    },
    outline: [
      { id: 'core-yb-decision-map', label: { zh: '中性原子与 ¹⁷¹Yb 决策', en: 'Neutral atoms and ¹⁷¹Yb decision' } },
      { id: 'yb-complete-reference-map', label: { zh: '能级、控制与读出', en: 'Levels, control and readout' } },
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
    title: { zh: '量子门：理论与实验', en: 'Quantum gates: theory and experiment' },
    thesis: {
      zh: '门设计从目标幺正开始，以可产生的哈密顿量为中介，以能够区分误差机制的测量结束。',
      en: 'Gate design starts from a target unitary, passes through a realizable Hamiltonian and ends with measurements that discriminate error mechanisms.',
    },
    outline: [
      { id: 'core-gate-loop', label: { zh: '理论到实验闭环', en: 'Theory-to-experiment loop' } },
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
    title: { zh: '实验系统与工程闭环', en: 'Experimental systems and engineering closure' },
    thesis: {
      zh: '装置、时序与控制记录必须通过共同的原子端验收量闭合为可重复周期。',
      en: 'Apparatus, timing and control records must close through shared at-atom acceptance quantities to form a repeatable cycle.',
    },
    outline: [
      { id: 'core-experiment-map', label: { zh: '工程验收闭环', en: 'Engineering acceptance loop' } },
      { id: 'experiment-pipeline-tutor', label: { zh: '装置如何改变原子状态', en: 'How apparatus changes atomic states' } },
      { id: 'experiment-cycle-timeline', label: { zh: '光场怎样构成一个周期', en: 'How optical fields form one cycle' } },
    ],
    contextTitle: { zh: '学习提示', en: 'Learning prompts' },
    contextItems: [
      { zh: '先问原子在这一步处于什么状态，再问哪个装置改变了哪个哈密顿量参数。', en: 'First identify the atomic state, then ask which apparatus changes which Hamiltonian parameter.' },
      { zh: '把控制时序、原子响应与最终测量并排理解，避免只记设备名称。', en: 'Read control timing, atomic response and final measurement together instead of memorizing component names.' },
      { zh: '装置特定参数均保留来源与适用范围；只有核对所引实验协议后，才比较不同系统的参数。', en: 'Apparatus-specific values retain their source and scope; compare parameters only after checking the cited protocol.' },
    ],
  },
  'fault-tolerance': {
    title: { zh: '容错、规模与可信结果成本', en: 'Fault tolerance, scale and trustworthy-result cost' },
    thesis: {
      zh: '逻辑错误率、纠错时空体积、吞吐和可用率共同决定有效规模与可信结果成本。',
      en: 'Logical error, correction spacetime, throughput and availability jointly determine useful scale and trustworthy-result cost.',
    },
    outline: [
      { id: 'core-fault-scale-map', label: { zh: '容错规模与成本', en: 'Fault-tolerant scale and cost' } },
      { id: 'resource-estimator', label: { zh: '资源估算', en: 'Resource estimate' } },
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
