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
    title: { zh: '计算、量子计算与原子载体', en: 'Computation, quantum computation and atomic carriers' },
    thesis: {
      zh: '从输入到输出的受控状态变换出发，逐步推出量子相干、条件动力学和可开关原子相互作用。',
      en: 'Begin with controlled input-to-output state transformation, then derive coherence, conditional dynamics and switchable atomic interaction.',
    },
    outline: [
      { id: 'quantum-foundations', label: { zh: '计算的最低条件', en: 'Minimum conditions for computation' } },
      { id: 'neutral-atoms', label: { zh: '中性原子的实现', en: 'Neutral-atom realization' } },
    ],
    contextTitle: { zh: '判定框架', en: 'Decision frame' },
    contextItems: [
      { zh: '状态是否可区分、可初始化并可重复读出？', en: 'Are states distinguishable, initializable and repeatedly readable?' },
      { zh: '多比特演化是否依赖联合状态？', en: 'Does multiqubit evolution depend on the joint state?' },
      { zh: '非目标演化是否进入可测误差记录？', en: 'Does residual evolution enter a measurable error record?' },
    ],
  },
  'yb-platform': {
    title: { zh: '中性原子与 171Yb 平台', en: 'Neutral atoms and the 171Yb platform' },
    thesis: {
      zh: '171Yb 用核自旋承担稳定存储，用电子结构承担冷却、操控、读出与 Rydberg 连接；优势与复杂度来自同一职责分离。',
      en: '171Yb assigns storage to nuclear spin and cooling, control, readout and Rydberg coupling to electronic structure; its advantage and complexity share this origin.',
    },
    outline: [
      { id: 'yb-platform', label: { zh: '为什么选择 Yb', en: 'Why Yb' } },
      { id: 'yb-energy-tutor', label: { zh: '能级与实验通道', en: 'Levels and laboratory channels' } },
      { id: 'yb-complete-reference-map', label: { zh: '完整参考图', en: 'Complete reference map' } },
      { id: 'species-comparison', label: { zh: '物种比较', en: 'Species comparison' } },
    ],
    contextTitle: { zh: '平台判定', en: 'Platform test' },
    contextItems: [
      { zh: '存储自由度对光移与磁场噪声的灵敏度是多少？', en: 'How sensitive is the storage degree of freedom to light shifts and magnetic noise?' },
      { zh: '冷却、门和读出通道能否独立标定？', en: 'Can cooling, gate and readout channels be calibrated independently?' },
      { zh: '多能级泄漏能否被检测或转换为擦除？', en: 'Can multilevel leakage be detected or converted to erasure?' },
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
      { id: 'theory-experiment-loop', label: { zh: '理论交付合同', en: 'Theory delivery contract' } },
    ],
    contextTitle: { zh: '理论交付', en: 'Theory delivery' },
    contextItems: [
      { zh: '明确目标量、控制量、扰动量和可观测量。', en: 'Fix target, control, disturbance and observable quantities.' },
      { zh: '为每个主导误差给出可区分的实验扫描。', en: 'Provide a discriminating scan for every dominant error.' },
      { zh: '输出下一项测量，而不是只输出拟合参数。', en: 'Return the next measurement, not only fitted parameters.' },
    ],
  },
  experiment: {
    title: { zh: '实验装置、周期与放行验收', en: 'Apparatus, operating cycle and release acceptance' },
    thesis: {
      zh: '实验系统的交付物是可重复周期：每个阶段都有前置依赖、测量记录和进入下一阶段的放行条件。',
      en: 'The experimental deliverable is a repeatable cycle: every phase has prerequisites, measurement records and release conditions.',
    },
    outline: [
      { id: 'experiment', label: { zh: '工程基础设施', en: 'Engineering infrastructure' } },
      { id: 'experiment-pipeline-tutor', label: { zh: '装置与周期链', en: 'Apparatus and cycle chain' } },
      { id: 'experiment-visual-atlas', label: { zh: '实验教学图谱', en: 'Experimental plate atlas' } },
      { id: 'experiment-workbench', label: { zh: '阶段验收', en: 'Phase acceptance' } },
    ],
    contextTitle: { zh: '运行记录', en: 'Operating record' },
    contextItems: [
      { zh: '每个 shot 绑定配置哈希、时间戳、锁定状态与异常位。', en: 'Bind every shot to configuration hash, timestamp, lock state and exception bits.' },
      { zh: '比较设定时序与实际物理响应。', en: 'Compare commanded timing with the physical response.' },
      { zh: '维护后必须执行分层复标，不能直接放行正式数据。', en: 'Maintenance requires layered recalibration before production data.' },
    ],
  },
  'fault-tolerance': {
    title: { zh: '通用容错、规模化与成本', en: 'Universal fault tolerance, scale and cost' },
    thesis: {
      zh: '物理原子是资源，逻辑操作才是算力；规模只有在逻辑错误、吞吐、可用率和单位结果成本同时受控时成立。',
      en: 'Physical atoms are resources; logical operations are compute. Scale exists only when logical error, throughput, availability and cost per result remain controlled together.',
    },
    outline: [
      { id: 'fault-tolerance', label: { zh: '从物理到逻辑错误', en: 'Physical to logical error' } },
      { id: 'resource-estimator', label: { zh: '资源估算', en: 'Resource estimate' } },
      { id: 'scale-chain', label: { zh: '规模与吞吐', en: 'Scale and throughput' } },
      { id: 'cost-chain', label: { zh: '可信结果成本', en: 'Cost per trustworthy result' } },
    ],
    contextTitle: { zh: '容错判据', en: 'Fault-tolerance test' },
    contextItems: [
      { zh: '完整周期噪声是否低于所选码与门集的阈值？', en: 'Is full-cycle noise below the threshold of the chosen code and gate set?' },
      { zh: '增加码距后逻辑错误是否按预测下降？', en: 'Does logical error fall as predicted when distance increases?' },
      { zh: '非 Clifford 资源、译码和维护是否计入总开销？', en: 'Are non-Clifford resources, decoding and maintenance included in total overhead?' },
    ],
  },
  evidence: {
    title: { zh: '研究图谱、参数与证据来源', en: 'Research figures, parameters and evidence provenance' },
    thesis: {
      zh: '每个数值必须保留定义、状态、来源和适用边界；图像只在能够支持机制判断时进入证据链。',
      en: 'Every number retains its definition, status, source and scope; figures enter the evidence chain only when they support a mechanistic judgment.',
    },
    outline: [
      { id: 'research-atlas', label: { zh: '理论—实验图谱', en: 'Theory–experiment atlas' } },
      { id: 'research-ecosystem', label: { zh: '科研生态', en: 'Research ecosystem' } },
      { id: 'evidence', label: { zh: '证据登记', en: 'Evidence registry' } },
    ],
    contextTitle: { zh: '证据边界', en: 'Evidence boundary' },
    contextItems: [
      { zh: '确认值、派生值、候选值和缺失项分开声明。', en: 'Declare confirmed, derived, candidate and missing values separately.' },
      { zh: '文献装置参数不能无条件替代本机标定。', en: 'Literature apparatus values cannot replace local calibration unconditionally.' },
      { zh: '每个比较必须锁定同一指标定义。', en: 'Every comparison must lock a common metric definition.' },
    ],
  },
}
