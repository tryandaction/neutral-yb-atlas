import type { RouteId } from '../navigation/routes'
import type { LocalizedText } from '../types/content'

export interface CausalNode {
  id: string
  label: LocalizedText
  definition: LocalizedText
  necessary: LocalizedText
  expression: LocalizedText
  failure: LocalizedText
  route: RouteId
}

export const causalNodes: CausalNode[] = [
  {
    id: 'problem',
    label: { zh: '计算目标', en: 'Computation' },
    definition: {
      zh: '把表示输入的物理状态，按给定规则变成可验证的输出状态。',
      en: 'Transform a physical state representing an input into a verifiable output under a specified rule.',
    },
    necessary: {
      zh: '必须先锁定输入、输出、正确性判据和可比较的经典基线。',
      en: 'Inputs, outputs, correctness criteria and a credible classical baseline must be fixed first.',
    },
    expression: { zh: 'x → f(x)', en: 'x → f(x)' },
    failure: {
      zh: '若输出无法验证，或不存在可信基线，硬件执行再复杂也不能形成有价值的计算结论。',
      en: 'Without verifiable output or a credible baseline, hardware complexity does not establish computational value.',
    },
    route: 'foundations',
  },
  {
    id: 'algorithm',
    label: { zh: '量子算法', en: 'Quantum algorithm' },
    definition: {
      zh: '设计受控量子演化，使目标测量结果的振幅经干涉得到增强。',
      en: 'Design controlled quantum evolution so interference increases the amplitude of target outcomes.',
    },
    necessary: {
      zh: '算法必须给出状态制备、演化、测量和相对最佳经典方法的资源优势。',
      en: 'The algorithm must specify state preparation, evolution, measurement and a resource advantage over the best classical method.',
    },
    expression: { zh: 'P(y|x) = |⟨y|U|ψx⟩|²', en: 'P(y|x) = |⟨y|U|ψx⟩|²' },
    failure: {
      zh: '只有叠加而没有可利用的干涉结构，不能产生算法优势。',
      en: 'Superposition without exploitable interference does not create algorithmic advantage.',
    },
    route: 'foundations',
  },
  {
    id: 'logical-resources',
    label: { zh: '逻辑资源', en: 'Logical resources' },
    definition: {
      zh: '把算法改写为逻辑比特数、逻辑门数、逻辑深度和允许总失败概率。',
      en: 'Compile the algorithm into logical qubits, logical operations, logical depth and an allowed total failure probability.',
    },
    necessary: {
      zh: '必须同时报告 QL、GL、DL 与 ε；单独给出比特数不能描述机器需求。',
      en: 'QL, GL, DL and ε must be reported together; qubit count alone does not describe machine demand.',
    },
    expression: { zh: 'Rlogical = (QL, GL, DL, ε)', en: 'Rlogical = (QL, GL, DL, ε)' },
    failure: {
      zh: '忽略逻辑深度或失败预算，会把无法执行的线路误判为可扩展任务。',
      en: 'Ignoring logical depth or failure budget can make an unexecutable circuit appear scalable.',
    },
    route: 'fault-tolerance',
  },
  {
    id: 'fault-tolerance',
    label: { zh: '容错计算', en: 'Fault tolerance' },
    definition: {
      zh: '用冗余编码、重复综合征测量和译码，把物理故障压低为满足算法预算的逻辑错误。',
      en: 'Use redundant encoding, repeated syndrome extraction and decoding to suppress physical faults below the algorithmic error budget.',
    },
    necessary: {
      zh: '物理噪声必须低于所选量子码、门集和噪声模型对应的阈值。',
      en: 'Physical noise must remain below the threshold of the chosen code, gate set and noise model.',
    },
    expression: { zh: 'G_L × p_L ≤ ε', en: 'G_L × p_L ≤ ε' },
    failure: {
      zh: '若物理错误不低于阈值，增加编码规模不会持续压低逻辑错误。',
      en: 'If physical error is not below threshold, increasing code size will not continuously suppress logical error.',
    },
    route: 'fault-tolerance',
  },
  {
    id: 'machine',
    label: { zh: '物理机器', en: 'Physical machine' },
    definition: {
      zh: '把逻辑操作落实为可初始化、可寻址、可纠缠、可测量、可复位的原子周期。',
      en: 'Realize logical operations as an atomic cycle that can initialize, address, entangle, measure and reset.',
    },
    necessary: {
      zh: '目标哈密顿量必须在需要时开启，其余演化、损失和串扰必须进入可测误差记录。',
      en: 'The target Hamiltonian must switch on when required while residual evolution, loss and crosstalk enter measurable error records.',
    },
    expression: { zh: 'Hactual = Htarget + Herror', en: 'Hactual = Htarget + Herror' },
    failure: {
      zh: '单项门保真度不能替代完整周期的损失、泄漏、相关误差和可用率验证。',
      en: 'A component gate fidelity cannot replace validation of loss, leakage, correlations and availability over the full cycle.',
    },
    route: 'yb-platform',
  },
  {
    id: 'runtime',
    label: { zh: '运行时间', en: 'Runtime' },
    definition: {
      zh: '把逻辑深度转换为包含纠错、测量、译码、重排和维护停顿的实际墙钟时间。',
      en: 'Convert logical depth into wall-clock time including correction, measurement, decoding, rearrangement and maintenance pauses.',
    },
    necessary: {
      zh: '纠错周期时间、并行度、译码延迟和系统可用率必须联合计算。',
      en: 'Correction-cycle time, parallelism, decoding latency and system availability must be evaluated together.',
    },
    expression: { zh: 'Twall ≈ Ncycle tc / (Πparallel A)', en: 'Twall ≈ Ncycle tc / (Πparallel A)' },
    failure: {
      zh: '物理比特增加而控制与读出吞吐不增长时，机器规模增加但有效算力不增加。',
      en: 'If control and readout throughput do not grow with physical qubits, machine size rises without useful compute capacity.',
    },
    route: 'experiment',
  },
  {
    id: 'cost',
    label: { zh: '可信结果成本', en: 'Cost per result' },
    definition: {
      zh: '计算获得一次满足正确性标准的结果所消耗的设备折旧、运行、维护和失败重试成本。',
      en: 'Account for amortized equipment, operation, maintenance and failed repetitions required for one result meeting the correctness criterion.',
    },
    necessary: {
      zh: '成本必须按成功结果归一化，并与最佳经典方案在同一问题和精度下比较。',
      en: 'Cost must be normalized per successful result and compared with the best classical method at the same problem and accuracy.',
    },
    expression: { zh: 'Csuccess = (Camortized + Copex Twall) / Psuccess', en: 'Csuccess = (Camortized + Copex Twall) / Psuccess' },
    failure: {
      zh: '每个原子或物理比特的低价格，不能抵消极低可用率、长运行时间或巨大的纠错开销。',
      en: 'Low cost per atom or physical qubit cannot offset poor availability, long runtime or overwhelming correction overhead.',
    },
    route: 'fault-tolerance',
  },
]
