import type { LocalizedText } from '../../types/content'

export interface MapNode {
  id: string
  title: LocalizedText
  formula?: string
  detail: LocalizedText
  metric?: LocalizedText
}

export interface ComputationRow {
  id: string
  object: LocalizedText
  definition: string
  physical: LocalizedText
  acceptance: LocalizedText
}

export interface DecisionCriterion {
  label: LocalizedText
  neutralAtom: LocalizedText
  yb171: LocalizedText
}

export interface YbRole {
  id: string
  role: LocalizedText
  manifold: string
  function: LocalizedText
  cost: LocalizedText
  logicalValue: LocalizedText
}

export interface EngineeringBus {
  id: string
  title: LocalizedText
  setpoint: LocalizedText
  evidence: LocalizedText
  failure: LocalizedText
}

export const computationRows: ComputationRow[] = [
  {
    id: 'state',
    object: { zh: '状态', en: 'State' },
    definition: String.raw`\rho_0=V\rho_LV^\dagger,\qquad V^\dagger V=I_L`,
    physical: { zh: '原子计算子空间', en: 'Atomic computational subspace' },
    acceptance: { zh: '制备误差、泄漏', en: 'Preparation error, leakage' },
  },
  {
    id: 'gate',
    object: { zh: '逻辑门', en: 'Logical gate' },
    definition: String.raw`\begin{aligned}i\hbar\,\partial_t|\psi(t)\rangle&=H[u(t)]|\psi(t)\rangle\\ U(T)&=\mathcal T\exp\!\left[-\frac{i}{\hbar}\int_0^T H[u(t)]\,dt\right]\end{aligned}`,
    physical: { zh: '受控哈密顿量 H[u(t)]', en: 'Controlled Hamiltonian H[u(t)]' },
    acceptance: { zh: '过程矩阵、条件相位', en: 'Process matrix, conditional phase' },
  },
  {
    id: 'measurement',
    object: { zh: '测量', en: 'Measurement' },
    definition: String.raw`p(m)=\operatorname{Tr}(E_m\rho),\qquad \sum_mE_m=I`,
    physical: { zh: 'POVM 与经典记录', en: 'POVM and classical record' },
    acceptance: { zh: '混淆矩阵、SPAM', en: 'Confusion matrix, SPAM' },
  },
  {
    id: 'qec-cycle',
    object: { zh: '纠错周期', en: 'QEC cycle' },
    definition: String.raw`\mathcal N_L=\mathcal R_{D(s,f)}\circ\mathcal M_{s,f}\circ\mathcal N_{\mathrm{phys}}`,
    physical: { zh: '综合征、译码与恢复', en: 'Syndrome, decoding and recovery' },
    acceptance: { zh: '逻辑错误率 pₗ(d)', en: 'Logical error rate pₗ(d)' },
  },
]

export const divincenzoCriteria: LocalizedText[] = [
  { zh: '可扩展态空间', en: 'Scalable state space' },
  { zh: '可初始化', en: 'Initialization' },
  { zh: '相干时间 ≫ 门时间', en: 'Coherence ≫ gate time' },
  { zh: '通用门集', en: 'Universal gate set' },
  { zh: '量子比特测量', en: 'Qubit measurement' },
]

export const ybDecisionCriteria: DecisionCriterion[] = [
  {
    label: { zh: '扩展与连接', en: 'Scale and connectivity' },
    neutralAtom: { zh: '二维阵列、重排、Rydberg 可编程连接', en: '2D arrays, rearrangement, programmable Rydberg links' },
    yb171: { zh: '核自旋存储与电子流形控制分离', en: 'Nuclear-spin storage separated from electronic control' },
  },
  {
    label: { zh: '并行与串扰', en: 'Parallelism and crosstalk' },
    neutralAtom: { zh: '局域寻址与成组纠缠并存', en: 'Local addressing with parallel entanglement' },
    yb171: { zh: '不同流形承担不同控制职责', en: 'Distinct manifolds carry distinct control roles' },
  },
  {
    label: { zh: '故障可见性', en: 'Fault visibility' },
    neutralAtom: { zh: '占据、损失和位置可直接记录', en: 'Occupancy, loss and position can be recorded' },
    yb171: { zh: '流形选择读出提供擦除信息', en: 'Manifold-selective readout supplies erasure information' },
  },
  {
    label: { zh: '系统代价', en: 'System cost' },
    neutralAtom: { zh: '真空、激光、成像与移动共同定标', en: 'Vacuum, lasers, imaging and motion share the budget' },
    yb171: { zh: '多波长复杂度换取职责分离', en: 'Multi-wavelength complexity buys functional separation' },
  },
]

export const ybRoles: YbRole[] = [
  {
    id: 'storage', role: { zh: '存储', en: 'Storage' }, manifold: '¹S₀',
    function: { zh: '核自旋计算基', en: 'Nuclear-spin computational basis' },
    cost: { zh: '磁场与差分光移控制', en: 'Field and differential-shift control' },
    logicalValue: { zh: '长时间保存逻辑信息', en: 'Long-lived logical memory' },
  },
  {
    id: 'metastable', role: { zh: '亚稳态接口', en: 'Metastable interface' }, manifold: '³P₀',
    function: { zh: '相干映射与门接口', en: 'Coherent mapping and gate interface' },
    cost: { zh: '钟激光与映射误差', en: 'Clock laser and mapping error' },
    logicalValue: { zh: '隔离存储与操作职责', en: 'Separates storage from operation' },
  },
  {
    id: 'rydberg', role: { zh: 'Rydberg 纠缠', en: 'Rydberg entanglement' }, manifold: '|r⟩',
    function: { zh: '强条件相互作用', en: 'Strong conditional interaction' },
    cost: { zh: '衰减、Doppler 与激光噪声', en: 'Decay, Doppler and laser noise' },
    logicalValue: { zh: '并行双比特门', en: 'Parallel two-qubit gates' },
  },
  {
    id: 'cool-image', role: { zh: '冷却与成像', en: 'Cooling and imaging' }, manifold: '¹P₁ / ³P₁',
    function: { zh: '装载、冷却、占据判别', en: 'Loading, cooling, occupancy detection' },
    cost: { zh: '散射加热与读出回扰', en: 'Scattering heat and measurement back-action' },
    logicalValue: { zh: '可重复阵列周期', en: 'Repeatable array cycles' },
  },
  {
    id: 'erasure', role: { zh: '擦除标记', en: 'Erasure flag' }, manifold: '¹S₀ / ³P₀ / loss',
    function: { zh: '区分在码、泄漏与损失', en: 'Distinguishes code, leakage and loss' },
    cost: { zh: '误报、漏报与检测延迟', en: 'False flags, misses and latency' },
    logicalValue: { zh: '把未知错误变为已知位置', en: 'Converts hidden faults to known locations' },
  },
]

export const gateLoopNodes: MapNode[] = [
  { id: 'target', title: { zh: '目标幺正', en: 'Target unitary' }, formula: String.raw`U_{\mathrm{target}}`, detail: { zh: '规定计算子空间中的目标作用', en: 'Specifies the action in the computational subspace' } },
  { id: 'hamiltonian', title: { zh: '物理哈密顿量', en: 'Physical Hamiltonian' }, formula: String.raw`H[u(t)]`, detail: { zh: '由能级、耦合、失谐和相互作用构成', en: 'Built from levels, couplings, detunings and interactions' } },
  { id: 'waveform', title: { zh: '控制参数', en: 'Control parameters' }, formula: String.raw`u(t)=\{\Omega(t),\phi(t),\Delta(t)\}`, detail: { zh: '映射为可下发的振幅、相位和频率', en: 'Mapped to deliverable amplitude, phase and frequency' } },
  { id: 'trajectory', title: { zh: '态演化', en: 'State evolution' }, formula: String.raw`i\hbar\dot\rho=[H,\rho]+i\hbar\mathcal L(\rho)`, detail: { zh: '同时追踪计算态、辅助态和耗散', en: 'Tracks code states, auxiliary states and dissipation' } },
  { id: 'observables', title: { zh: '测量证据', en: 'Measurement evidence' }, formula: String.raw`p_m=\operatorname{Tr}(E_m\rho_T)`, detail: { zh: '分别解析布居、相位、泄漏和损失', en: 'Resolves population, phase, leakage and loss' } },
  { id: 'channel', title: { zh: '门通道', en: 'Gate channel' }, formula: String.raw`\mathcal E_{\mathrm{gate}}`, detail: { zh: '与目标幺正比较并反演模型偏差', en: 'Compared with the target to infer model mismatch' } },
]

export const engineeringBuses: EngineeringBus[] = [
  {
    id: 'vacuum', title: { zh: '真空与原子通量', en: 'Vacuum and atomic flux' },
    setpoint: { zh: '腔压、炉温、阀门状态', en: 'Pressure, oven temperature, valve state' },
    evidence: { zh: '压力、RGA、装载率与寿命', en: 'Pressure, RGA, loading rate and lifetime' },
    failure: { zh: '寿命低于窗口或装载率漂移', en: 'Lifetime below window or loading-rate drift' },
  },
  {
    id: 'laser', title: { zh: '激光频率、功率与相位', en: 'Laser frequency, power and phase' },
    setpoint: { zh: 'ν、P、φ、偏振', en: 'ν, P, φ and polarization' },
    evidence: { zh: '锁定误差、原子端功率、相位记录', en: 'Lock error, delivered power and phase record' },
    failure: { zh: '失谐、功率或相位越出标定包络', en: 'Detuning, power or phase outside calibrated envelope' },
  },
  {
    id: 'field', title: { zh: '磁场与偏振基准', en: 'Magnetic field and polarization basis' },
    setpoint: { zh: 'B、∇B、量子化轴', en: 'B, ∇B and quantization axis' },
    evidence: { zh: '线圈电流、Zeeman 谱、偏振纯度', en: 'Coil current, Zeeman spectrum and polarization purity' },
    failure: { zh: '跃迁频率或量子化轴漂移', en: 'Transition frequency or quantization-axis drift' },
  },
  {
    id: 'timing', title: { zh: '时序、触发与数据', en: 'Timing, triggers and data' },
    setpoint: { zh: '事件顺序、延迟、波形版本', en: 'Event order, delays and waveform version' },
    evidence: { zh: '统一时间戳、实际波形、原始帧', en: 'Shared timestamps, delivered waveform and raw frames' },
    failure: { zh: '竞态、延迟超限或记录缺失', en: 'Race, excess latency or missing record' },
  },
  {
    id: 'feedback', title: { zh: '标定、漂移与反馈', en: 'Calibration, drift and feedback' },
    setpoint: { zh: '验收窗口与修正规则', en: 'Acceptance window and correction rule' },
    evidence: { zh: '标定估计、漂移趋势、修正动作', en: 'Calibration estimate, drift trend and correction' },
    failure: { zh: '修正后仍不能回到验收窗口', en: 'Correction fails to restore the acceptance window' },
  },
]

export const faultChainNodes: MapNode[] = [
  { id: 'physical', title: { zh: '物理通道', en: 'Physical channel' }, formula: String.raw`\mathcal N_{\mathrm{phys}}`, detail: { zh: '门、测量、泄漏、损失及相关故障', en: 'Gate, measurement, leakage, loss and correlations' } },
  { id: 'records', title: { zh: '综合征与标记', en: 'Syndromes and flags' }, formula: String.raw`(s_{1:T},f_{1:T})`, detail: { zh: '把可见故障位置和时间交给译码器', en: 'Supplies decoder-visible fault locations and times' } },
  { id: 'decoder', title: { zh: '译码与恢复', en: 'Decode and recover' }, formula: String.raw`\widehat e=D(s,f),\quad \mathcal R_{\widehat e}`, detail: { zh: '选择与综合征等价的恢复操作', en: 'Selects a recovery consistent with the syndrome' } },
  { id: 'logical', title: { zh: '逻辑通道', en: 'Logical channel' }, formula: String.raw`\mathcal N_L=V^\dagger\mathcal R_{\widehat e}\mathcal N_{\mathrm{phys}}V`, detail: { zh: '恢复后残余作用投影回逻辑子空间', en: 'Projects the residual action back to the logical subspace' } },
  { id: 'logical-rate', title: { zh: '任务级逻辑预算', en: 'Task-level logical budget' }, formula: String.raw`G_Lp_L(d)\leq\varepsilon_{\mathrm{task}}`, detail: { zh: '用逻辑操作总数反推所需码距', en: 'Uses the logical operation count to set code distance' } },
]

export const faultConditions = [
  String.raw`PE_a^\dagger E_bP=c_{ab}P`,
  String.raw`2t+s<d`,
  String.raw`p<p_{\mathrm{th}}`,
  String.raw`p_L(d)\approx A\!\left(\frac{p}{p_{\mathrm{th}}}\right)^{(d+1)/2}`,
]

export const resourceChainNodes: MapNode[] = [
  { id: 'distance', title: { zh: '码距', en: 'Code distance' }, formula: String.raw`d`, detail: { zh: '由任务级逻辑错误预算反推', en: 'Set by the task-level logical-error budget' } },
  { id: 'ratio', title: { zh: '物理资源', en: 'Physical resources' }, formula: String.raw`N_{\mathrm{phys}}(d)`, detail: { zh: '包含数据、辅助、备用和维护原子', en: 'Includes data, ancilla, spare and maintenance atoms' } },
  { id: 'volume', title: { zh: '时空体积', en: 'Spacetime volume' }, formula: String.raw`V_L=N_LD_L`, detail: { zh: '逻辑宽度乘电路深度', en: 'Logical width times circuit depth' } },
  { id: 'runtime', title: { zh: '墙钟时间', en: 'Wall time' }, formula: String.raw`T_{\mathrm{wall}}`, detail: { zh: '包含周期、译码、复位、维护和重试', en: 'Includes cycles, decoding, reset, maintenance and retries' } },
  { id: 'cost', title: { zh: '可信结果成本', en: 'Cost per trustworthy result' }, formula: String.raw`C_{\mathrm{result}}`, detail: { zh: '按满足精度且成功的结果归一化', en: 'Normalized by successful results meeting accuracy' } },
]
