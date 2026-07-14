import { useState } from 'react'
import type { Language } from '../../types/content'
import Equation from '../article/Equation'
import './teaching-visuals.css'

type LensId = 'computation' | 'carrier' | 'error' | 'experiment'

interface DeductionStep {
  id: string
  order: string
  short: Record<Language, string>
  title: Record<Language, string>
  equation: string
  inference: Record<Language, string>
  evidence: Record<Language, string>
  next: Record<Language, string>
}

interface DeductionLens {
  id: LensId
  label: Record<Language, string>
  question: Record<Language, string>
  conclusion: Record<Language, string>
  steps: DeductionStep[]
}

const lenses: DeductionLens[] = [
  {
    id: 'computation',
    label: { zh: '从计算出发', en: 'From computation' },
    question: { zh: '一个物理系统满足什么条件，才不只是演化，而是在执行可验证的计算？', en: 'When does physical evolution become verifiable computation?' },
    conclusion: { zh: '计算硬件的最终对象是可重复的条件通道，而不是孤立的门或漂亮的振荡曲线。', en: 'The final hardware object is a repeatable conditional channel, not an isolated gate or a clean oscillation trace.' },
    steps: [
      {
        id: 'distinguishable-states', order: '01', short: { zh: '可区分状态', en: 'Distinguishable states' },
        title: { zh: '信息必须由可重复区分的物理状态承载', en: 'Information requires repeatedly distinguishable physical states' },
        equation: String.raw`p(m|\rho)=\mathrm{Tr}(E_m\rho)`,
        inference: { zh: '若两个状态不能通过同一测量协议稳定区分，它们就不能定义可靠的计算符号。量子比特还必须规定计算子空间之外的泄漏态和真空态。', en: 'States that cannot be separated by one repeatable measurement protocol cannot define reliable symbols. A qubit definition must also specify leakage and vacuum outcomes.' },
        evidence: { zh: '制备已知 |0⟩、|1⟩、泄漏态和空阱样本，测完整读出混淆矩阵与损失条件化规则。', en: 'Prepare known |0>, |1>, leakage and empty-site samples; measure the full readout confusion matrix and loss-conditioning rule.' },
        next: { zh: '状态可区分，但能否按指令改变且保持相位可预测？', en: 'The states are distinguishable; can commands transform them with predictable phase?' },
      },
      {
        id: 'composable-transformations', order: '02', short: { zh: '可组合变换', en: 'Composable transforms' },
        title: { zh: '控制必须产生可组合而非一次性的状态变换', en: 'Controls must produce composable, not one-off, transformations' },
        equation: String.raw`U(T)=\mathcal T\exp\!\left[-\frac{i}{\hbar}\int_0^T H(t)\,dt\right]`,
        inference: { zh: '幅度、相位、频率和时序通过哈密顿量生成传播子；只有相位规范、参考时钟和链路响应保持一致，多个操作才能形成算法。', en: 'Amplitude, phase, frequency and timing generate a propagator through the Hamiltonian. Operations compose only when phase conventions, reference clocks and transfer functions remain consistent.' },
        evidence: { zh: '用 Rabi、Ramsey、回波和重复门测旋转角、相位闭合、漂移与相干误差，而不只看单次布居。', en: 'Use Rabi, Ramsey, echo and repeated gates to measure rotation angle, phase closure, drift and coherent error rather than one population point.' },
        next: { zh: '单体变换可控，但怎样让一个量子比特的状态改变另一个的演化？', en: 'Single-body control works; how can one qubit condition another qubit’s evolution?' },
      },
      {
        id: 'conditional-dynamics', order: '03', short: { zh: '条件动力学', en: 'Conditional dynamics' },
        title: { zh: '多比特计算需要状态依赖的联合演化', en: 'Multiqubit computation requires state-dependent joint evolution' },
        equation: String.raw`U_{AB}\ne U_A\otimes U_B`,
        inference: { zh: '不可分解的联合传播子才能产生纠缠。硬件必须提供可关闭的相互作用，否则存储期间的串扰会与执行门时的耦合同时存在。', en: 'Only a nonfactorizable joint propagator can generate entanglement. Hardware needs a switchable interaction so storage crosstalk does not accompany gate coupling.' },
        evidence: { zh: '依次验证双原子谱移、条件相位、Bell 奇偶与计算子空间返回；真值表本身不能证明相干纠缠。', en: 'Verify two-atom shifts, conditional phase, Bell parity and return to the computational subspace; a truth table alone does not prove coherent entanglement.' },
        next: { zh: '门能纠缠，但如何把结果转成可信的经典记录？', en: 'The gate entangles; how is its result converted into a trustworthy classical record?' },
      },
      {
        id: 'measurement-record', order: '04', short: { zh: '测量记录', en: 'Measurement record' },
        title: { zh: '测量把量子演化连接到可审计的数据', en: 'Measurement connects quantum evolution to auditable data' },
        equation: String.raw`\hat p_k=N_k/N,\qquad \mathrm{Cov}(\hat{\mathbf p})\ne0`,
        inference: { zh: '相机帧、阈值、状态映射和损失判据共同定义结果。任何保真度都依赖采样、条件化和 SPAM 约定。', en: 'Camera frames, thresholds, state mapping and loss rules jointly define outcomes. Every fidelity depends on sampling, conditioning and SPAM conventions.' },
        evidence: { zh: '保存原始帧、分类器版本、阈值后验、FP/FN、原子生存和 shot ID，使结论可重新分析。', en: 'Store raw frames, classifier version, threshold posterior, false-positive/negative rates, survival and shot IDs for reanalysis.' },
        next: { zh: '单次结果可信，但完整周期重复后错误怎样积累和暴露？', en: 'One result is trustworthy; how do errors accumulate and become visible over repeated cycles?' },
      },
      {
        id: 'cycle-channel', order: '05', short: { zh: '周期通道', en: 'Cycle channel' },
        title: { zh: '可扩展计算由制备、门、测量和反馈的周期决定', en: 'Scalable computation is set by the preparation-gate-measurement-feedback cycle' },
        equation: String.raw`\mathcal E_{\rm cycle}=\mathcal M\circ\mathcal R\circ\mathcal G\circ\mathcal P`,
        inference: { zh: '逻辑性能同时结算门、移动、测量、复位、补原子、经典延迟和相关故障。组件最优不保证周期最优。', en: 'Logical performance jointly costs gates, motion, measurement, reset, atom replacement, classical latency and correlated faults. Component optimum does not imply cycle optimum.' },
        evidence: { zh: '报告周期时间、吞吐率、条件通道、相关矩阵和逻辑错误率随码距或循环数的变化。', en: 'Report cycle time, throughput, conditional channels, correlation matrices and logical error versus code distance or cycle count.' },
        next: { zh: '关键问题：哪一项物理改进能最大幅度降低完整周期的逻辑代价？', en: 'Key question: which physical improvement most reduces the logical cost of the full cycle?' },
      },
    ],
  },
  {
    id: 'carrier',
    label: { zh: '从物理载体出发', en: 'From the physical carrier' },
    question: { zh: '为什么原子能够承载计算，中性原子又如何兼顾隔离与相互作用？', en: 'Why can atoms compute, and how do neutral atoms combine isolation with interaction?' },
    conclusion: { zh: '原子的价值来自天然一致的能级；中性原子的架构价值来自“平时弱耦合、门时强耦合”。', en: 'Atoms provide naturally identical spectra; neutral-atom architecture adds weak storage coupling and strong gate-time coupling.' },
    steps: [
      {
        id: 'atomic-register', order: '01', short: { zh: '天然寄存器', en: 'Natural register' },
        title: { zh: '同位素原子提供可复制的内部态谱', en: 'An isotope provides a reproducible internal-state spectrum' },
        equation: String.raw`H_0|n,F,m_F\rangle=E_{nFm_F}|n,F,m_F\rangle`,
        inference: { zh: '同一同位素的能级由相同基本参数决定，不需要逐器件制造量子比特；局部差异主要来自场、光和运动环境。', en: 'Atoms of one isotope share the same fundamental spectrum without device-by-device qubit fabrication; local differences mainly come from fields, light and motion.' },
        evidence: { zh: '跨站点测跃迁中心、Rabi 频率、寿命和偏振响应，将差异反演为局部场与光学不均匀。', en: 'Measure site-resolved line centers, Rabi rates, lifetimes and polarization response; infer local field and optical inhomogeneity.' },
        next: { zh: '能级相同，但哪两个态适合长时间存储并接受相干控制？', en: 'The spectra match; which two states store information and accept coherent control?' },
      },
      {
        id: 'storage-control', order: '02', short: { zh: '存储与控制', en: 'Storage & control' },
        title: { zh: '长寿命子空间与可寻址驱动共同定义量子比特', en: 'A long-lived subspace plus addressable drive defines a qubit' },
        equation: String.raw`H_q/\hbar=-\frac{\Delta}{2}\sigma_z+\frac{\Omega(t)}{2}(\cos\phi\,\sigma_x+\sin\phi\,\sigma_y)`,
        inference: { zh: '寿命只保证“不自发消失”，不能保证可计算；还需可控 Ω、Δ、φ，且旁路态、光移和磁场噪声受限。', en: 'Lifetime only prevents spontaneous loss; computation also needs controlled Ω, Δ and φ with bounded spectators, light shifts and magnetic noise.' },
        evidence: { zh: '光抽运、Rabi、Ramsey、回波和逐站点串扰矩阵共同验收制备、控制与保持。', en: 'Optical pumping, Rabi, Ramsey, echo and site-resolved crosstalk jointly accept preparation, control and storage.' },
        next: { zh: '单原子可控，但中性原子基态相互作用太弱，如何生成快速纠缠？', en: 'Single atoms are controllable, but ground-state neutral interactions are weak; how is fast entanglement generated?' },
      },
      {
        id: 'on-demand-interaction', order: '03', short: { zh: '按需相互作用', en: 'On-demand interaction' },
        title: { zh: '弱耦合存储，强耦合执行门', en: 'Store with weak coupling, gate with strong coupling' },
        equation: String.raw`V(R)\simeq C_6/R^6,\qquad V/\hbar\Omega\gg1`,
        inference: { zh: '基态近似独立使阵列易于隔离；短暂激发到 Rydberg 态后，强偶极相互作用移动双激发能级并产生条件动力学。', en: 'Ground states are nearly independent and easy to isolate; brief Rydberg excitation shifts the double-excitation level and creates conditional dynamics.' },
        evidence: { zh: '先测单原子 Rabi、线宽与寿命，再扫描原子间距和角度，联合测双原子谱、双激发抑制与条件相位。', en: 'First measure single-atom Rabi rate, linewidth and lifetime; then scan pair separation and angle while measuring two-atom spectra, double-excitation suppression and conditional phase.' },
        next: { zh: '相互作用可开关，但如何把许多原子变成低缺陷、可寻址的几何结构？', en: 'The interaction switches; how do many atoms become a low-defect addressable geometry?' },
      },
      {
        id: 'array-control', order: '04', short: { zh: '阵列与重排', en: 'Array & rearrange' },
        title: { zh: '光镊、成像和重排把原子集合变成寄存器', en: 'Tweezers, imaging and rearrangement turn atoms into a register' },
        equation: String.raw`U(\mathbf r)=-\frac{\mathrm{Re}[\alpha(\omega)]}{2\epsilon_0c}I(\mathbf r)`,
        inference: { zh: '偶极势定义站点，成像给出占据，AOD/SLM 把随机装载转为目标图；三者共同决定可用连接与反馈延迟。', en: 'Dipole potentials define sites, imaging reveals occupancy and AOD/SLM control maps stochastic loading to a target geometry; together they set connectivity and feedback latency.' },
        evidence: { zh: '在同一数据集中记录装载率、分类错误、重排路径、运动后温度、损失与最终填充率。', en: 'Record loading, classification error, rearrangement path, post-motion temperature, loss and final filling in one dataset.' },
        next: { zh: '阵列可构建，但它能否跨天稳定重复并进入纠错周期？', en: 'The array can be built; can it repeat across days and enter an error-correction cycle?' },
      },
      {
        id: 'yb-interface', order: '05', short: { zh: 'Yb 接口组合', en: 'Yb interface bundle' },
        title: { zh: '171Yb 用多个电子流形分担互相冲突的任务', en: '171Yb separates conflicting tasks across electronic manifolds' },
        equation: String.raw`\{|{}^1S_0,m_I\rangle,|{}^3P_0,m_I\rangle,|{}^3P_1\rangle,|{}^1P_1\rangle,|r\rangle\}`,
        inference: { zh: 'I=1/2 提供最小核自旋子空间；1S0/3P0、3P1、1P1 与 Rydberg 流形分别服务存储、冷却、成像和门。代价是更多波长、偏振与多能级标定。', en: 'I=1/2 provides a minimal nuclear-spin subspace; 1S0/3P0, 3P1, 1P1 and Rydberg manifolds divide storage, cooling, imaging and gate roles. The cost is a larger wavelength, polarization and multilevel calibration stack.' },
        evidence: { zh: '用 399/556/578/约302 nm 的源锁定光谱、寿命、分支、相干和条件通道共同验收，而不以单项保真度宣称平台优势。', en: 'Accept the platform with source-locked spectroscopy, lifetime, branching, coherence and conditional-channel data across 399/556/578/about-302 nm, not one headline fidelity.' },
        next: { zh: '关键问题：额外接口产生的可见错误，是否足以抵消它们增加的工程复杂度？', en: 'Key question: do visible-error interfaces outweigh the engineering complexity they add?' },
      },
    ],
  },
  {
    id: 'error',
    label: { zh: '从错误出发', en: 'From errors' },
    question: { zh: '一个微观噪声源如何传播为逻辑失败，实验又能知道多少？', en: 'How does microscopic noise become logical failure, and what can the experiment know?' },
    conclusion: { zh: '错误是否可见、何时可见以及记录是否可信，与错误率本身同等重要。', en: 'Whether, when and how reliably a fault becomes visible matters as much as its rate.' },
    steps: [
      { id: 'mechanism', order: '01', short: { zh: '物理机制', en: 'Mechanism' }, title: { zh: '从具体耦合写出噪声，而不是列举名词', en: 'Write noise from concrete couplings, not lists of names' }, equation: String.raw`\dot\rho=-\frac{i}{\hbar}[H,\rho]+\sum_k\mathcal D[L_k]\rho`, inference: { zh: '激光相噪、Doppler、光移、衰变、碰撞和控制串扰分别进入 H 或跳跃算符，参数来源和相关时间必须明确。', en: 'Laser phase noise, Doppler shifts, light shifts, decay, collisions and control crosstalk enter H or jump operators with explicit provenance and correlation times.' }, evidence: { zh: '同步采集频噪/强度 PSD、温度、寿命、磁场和环境记录，并与原子响应交叉验证。', en: 'Synchronously acquire frequency/intensity PSDs, temperature, lifetime, field and environmental records and cross-check them against atomic response.' }, next: { zh: '该机制在一次门中产生哪类故障？', en: 'Which gate-level fault does this mechanism produce?' } },
      { id: 'gate-fault', order: '02', short: { zh: '门级故障', en: 'Gate fault' }, title: { zh: '同一平均误差可以对应完全不同的故障结构', en: 'One mean error can hide distinct fault structures' }, equation: String.raw`1-F\ne p_{\rm loss}+p_{\rm leak}+p_{\rm Pauli}`, inference: { zh: '相干过旋、随机相位、泄漏、损失和可标记擦除对后续电路的传播不同，不能无条件相加或相减。', en: 'Coherent overrotation, stochastic phase, leakage, loss and flagged erasure propagate differently and cannot be combined or subtracted without a channel definition.' }, evidence: { zh: '联合报告计算子空间保真度、损失、泄漏、条件化规则和重复门增长。', en: 'Jointly report computational fidelity, loss, leakage, conditioning rules and repeated-gate growth.' }, next: { zh: '故障经过并行门、移动和测量后是否产生相关性？', en: 'Does the fault become correlated through parallel gates, motion and measurement?' } },
      { id: 'circuit-channel', order: '03', short: { zh: '电路通道', en: 'Circuit channel' }, title: { zh: '组件误差必须进入带时空相关的周期通道', en: 'Component errors must enter a spatiotemporal cycle channel' }, equation: String.raw`\mathcal E_{1:T}\ne\bigotimes_{t=1}^{T}\mathcal E_t`, inference: { zh: '共享激光、慢漂、AOD 多音互调和原子移动使错误跨站点与周期相关；独立同分布模型必须由数据证明。', en: 'Shared lasers, slow drift, AOD intermodulation and atom motion correlate faults across sites and cycles; iid models require evidence.' }, evidence: { zh: '改变并行密度、阵列方向和等待时间，测条件协方差、串扰矩阵和时间相关。', en: 'Vary parallel density, array orientation and wait time; measure conditional covariance, crosstalk matrices and temporal correlations.' }, next: { zh: '哪些事件能在不破坏其余量子信息时被标记？', en: 'Which events can be flagged without destroying the remaining quantum information?' } },
      { id: 'visible-record', order: '04', short: { zh: '可见记录', en: 'Visible record' }, title: { zh: '擦除优势来自可信标签，而不是额外损失', en: 'Erasure advantage comes from trustworthy labels, not extra loss' }, equation: String.raw`P(f|e),\quad P(f|\bar e),\quad \mathcal N(\rho|f)`, inference: { zh: '标签需要位置、时间、召回率和误报率；标记与未标记条件通道都必须表征。', en: 'A flag needs location, time, recall and false-positive rate; both flagged and unflagged conditional channels require characterization.' }, evidence: { zh: '用已知事件样本标定标签混淆矩阵，再分别分析标记/未标记 shot 的残余相干、Pauli、泄漏与损失。', en: 'Calibrate flag confusion with known events, then separately analyze coherent, Pauli, leakage and loss components in flagged and unflagged shots.' }, next: { zh: '解码器使用这些标签后，完整周期是否净受益？', en: 'Does the full cycle benefit after the decoder uses these labels?' } },
      { id: 'logical-cost', order: '05', short: { zh: '逻辑代价', en: 'Logical cost' }, title: { zh: '最终判据是带检测与补原子开销的逻辑缩放', en: 'The final criterion is logical scaling including detection and replacement' }, equation: String.raw`p_L=p_L(d,\mathcal E_{\rm cycle},\text{schedule},\text{decoder})`, inference: { zh: 'Yb 的可检测错误只有在漏报、误报、检测时间、补原子和相关故障一起计入后仍降低 pL，才构成架构优势。', en: 'Detectable Yb faults become an architectural advantage only if pL still falls after false negatives, false positives, detection time, replacement and correlations are included.' }, evidence: { zh: '比较有/无标签、不同码距和不同调度的逻辑错误率，并对每项物理开销做消融。', en: 'Compare logical error with and without flags across code distances and schedules, ablating each physical overhead.' }, next: { zh: '关键问题：解码灵敏度指向的首要硬件瓶颈是什么？', en: 'Key question: which hardware bottleneck dominates decoder sensitivity?' } },
    ],
  },
  {
    id: 'experiment',
    label: { zh: '从实验出发', en: 'From the experiment' },
    question: { zh: '怎样把模型变成可执行控制和可证伪测量，而不是事后拟合？', en: 'How does a model become executable control and a falsifiable measurement rather than post-hoc fitting?' },
    conclusion: { zh: '理论的交付物是下一项可区分模型的实验，不只是一个更复杂的拟合函数。', en: 'Theory must deliver the next experiment that separates models, not merely a more elaborate fit.' },
    steps: [
      { id: 'control-knob', order: '01', short: { zh: '控制旋钮', en: 'Control knob' }, title: { zh: '模型参数必须映射到真实硬件旋钮', en: 'Model parameters must map to real hardware knobs' }, equation: String.raw`u(t)\xrightarrow{\ G(\omega)\ }x(t)\xrightarrow{\ H[x(t)]\ }\rho(t)`, inference: { zh: 'AWG 设定值不是原子面波形；放大器、AOM/EOM、光路和伺服传递函数决定实际幅度、相位与频率。', en: 'An AWG setting is not the atom-plane waveform; amplifiers, AOM/EOM devices, optics and servo transfer functions set actual amplitude, phase and frequency.' }, evidence: { zh: '同时保存数字波形、示波器/拍频/光电探测器记录和端点光学标定。', en: 'Store digital waveforms together with oscilloscope, beat-note, photodiode and endpoint optical calibrations.' }, next: { zh: '真实波形已知后，原子响应对哪些参数最敏感？', en: 'Once the delivered waveform is known, which parameters dominate atomic sensitivity?' } },
      { id: 'atomic-response', order: '02', short: { zh: '原子响应', en: 'Atomic response' }, title: { zh: '用最小可证伪模型预测直接可观测量', en: 'Predict direct observables with the smallest falsifiable model' }, equation: String.raw`y_{\rm pred}(t;\theta)=\mathrm{Tr}[O\rho(t;\theta)]`, inference: { zh: '模型层级由数据分辨率决定：两能级模型解释趋势，多能级与运动模型解释可分辨偏差。', en: 'Data resolution sets model level: a two-level model explains trends, while multilevel and motional models explain resolvable residuals.' }, evidence: { zh: '预注册扫描范围和观测量，用未参与拟合的失谐、功率、温度或距离数据检验预测。', en: 'Pre-register scan range and observables; test predictions on held-out detuning, power, temperature or distance data.' }, next: { zh: '响应如何变成带不确定度的参数，而不是一条最佳拟合曲线？', en: 'How does response become uncertain parameters rather than one best-fit curve?' } },
      { id: 'raw-record', order: '03', short: { zh: '原始记录', en: 'Raw record' }, title: { zh: '实验数据必须保留生成条件和分类过程', en: 'Experimental data must retain generation conditions and classification' }, equation: String.raw`D=\{\text{frame},u(t),t_0,\text{calibration},\text{flags}\}_{\rm shot}`, inference: { zh: '没有 shot ID、配置哈希、时间戳、原始帧和异常记录，漂移、筛选与物理改进无法区分。', en: 'Without shot IDs, configuration hashes, timestamps, raw frames and anomaly logs, drift, selection and physical improvement cannot be separated.' }, evidence: { zh: '随机交错基线/候选配置，保存盲化前原始数据，并检查缺失 shot 与异常值处理。', en: 'Randomly interleave baseline and candidate configurations, preserve pre-unblinding raw data and audit missing shots plus outlier handling.' }, next: { zh: '哪些参数由数据识别，哪些仍依赖先验或独立标定？', en: 'Which parameters are identified by data and which still rely on priors or independent calibration?' } },
      { id: 'inverse-model', order: '04', short: { zh: '参数反演', en: 'Inference' }, title: { zh: '反演必须暴露参数退化与模型失配', en: 'Inference must expose degeneracy and model mismatch' }, equation: String.raw`p(\theta|D)\propto p(D|\theta)p(\theta)`, inference: { zh: '相关参数不能用逐项拟合重复计数；残差结构、后验相关和交叉验证决定模型是否可用于外推。', en: 'Correlated parameters cannot be fitted independently without double counting; residual structure, posterior correlation and cross-validation determine predictive use.' }, evidence: { zh: '报告联合后验、相关矩阵、留出集预测和替代模型比较，而不只报告最优值。', en: 'Report joint posteriors, correlation matrices, held-out predictions and alternate-model comparisons rather than only optimum values.' }, next: { zh: '当前不确定度是否足以作出硬件或放行决策？', en: 'Is current uncertainty narrow enough for a hardware or release decision?' } },
      { id: 'release-decision', order: '05', short: { zh: '放行与下一测量', en: 'Release & next test' }, title: { zh: '放行条件必须在测量前定义并能触发下一动作', en: 'Release criteria must be pre-defined and action-driving' }, equation: String.raw`\text{release}\iff P(g(\theta)\le g_{\max}|D)\ge1-\alpha`, inference: { zh: '验收不是“曲线看起来合理”，而是参数后验、失配检验和运行稳定性同时进入门槛。失败时应选择信息增益最高的下一项测量。', en: 'Acceptance is not a plausible-looking curve; posterior bounds, model checks and operating stability jointly define the threshold. Failure should trigger the highest-information next measurement.' }, evidence: { zh: '在独立日期和站点复测放行指标，记录通过率、失败类别、回滚配置和下一项判别实验。', en: 'Repeat release metrics on independent dates and sites; record pass rate, failure class, rollback configuration and next discriminating experiment.' }, next: { zh: '关键问题：下一次实验应优先缩小哪个决策相关的不确定度？', en: 'Key question: which decision-relevant uncertainty should the next experiment reduce first?' } },
    ],
  },
]

export default function FirstPrinciplesTree({ language }: { language: Language }) {
  const [lensId, setLensId] = useState<LensId>('computation')
  const [stepByLens, setStepByLens] = useState<Record<LensId, string>>({
    computation: lenses[0].steps[0].id,
    carrier: lenses[1].steps[0].id,
    error: lenses[2].steps[0].id,
    experiment: lenses[3].steps[0].id,
  })
  const lens = lenses.find((item) => item.id === lensId) ?? lenses[0]
  const selected = lens.steps.find((step) => step.id === stepByLens[lens.id]) ?? lens.steps[0]

  const selectLens = (id: LensId) => setLensId(id)
  const selectStep = (id: string) => setStepByLens((current) => ({ ...current, [lens.id]: id }))

  return (
    <section className="teaching-visual principles-tree" id="first-principles-tree">
      <header className="teaching-visual__header">
        <div><span>FIRST PRINCIPLES / FOUR LENSES</span><h2>{language === 'zh' ? '第一性原理演绎树' : 'First-principles deduction tree'}</h2></div>
        <p>{language === 'zh' ? '同一系统可从计算条件、物理载体、错误传播和实验决策四条路径推出。每一步都必须给出可测判据，才能进入下一层。' : 'The same system can be derived from computation, physical carrier, error propagation and experimental decision. Each step must expose a measurable criterion before the next follows.'}</p>
      </header>

      <div className="principles-lenses" role="tablist" aria-label={language === 'zh' ? '第一性原理视角' : 'First-principles lenses'}>
        {lenses.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={lens.id === item.id} onClick={() => selectLens(item.id)}>
            <span>{item.label[language]}</span><small>{item.question[language]}</small>
          </button>
        ))}
      </div>

      <div className="principles-tree__question"><span>{language === 'zh' ? '起始问题' : 'Starting question'}</span><p>{lens.question[language]}</p></div>

      <div className="principles-tree__map" aria-label={language === 'zh' ? `${lens.label.zh}的五步演绎` : `Five-step deduction ${lens.label.en}`}>
        <div className="principles-tree__spine" aria-hidden="true" />
        {lens.steps.map((step) => (
          <button key={step.id} type="button" className={`principle-node${selected.id === step.id ? ' is-selected' : ''}`} aria-label={`${step.order} ${step.short[language]}`} aria-pressed={selected.id === step.id} onClick={() => selectStep(step.id)}>
            <span>{step.order}</span><strong>{step.short[language]}</strong><small>{step.next[language]}</small>
          </button>
        ))}
      </div>

      <article className="teaching-card principles-card" aria-live="polite">
        <div className="teaching-card__title"><span>{selected.order}</span><div><small>{lens.label[language]}</small><h3>{selected.title[language]}</h3></div></div>
        <div className="teaching-card__equation"><Equation source={selected.equation} /></div>
        <dl>
          <div><dt>{language === 'zh' ? '为何推出下一步' : 'Why the next step follows'}</dt><dd>{selected.inference[language]}</dd></div>
          <div><dt>{language === 'zh' ? '实验如何检验' : 'Experimental test'}</dt><dd>{selected.evidence[language]}</dd></div>
          <div><dt>{language === 'zh' ? '若未通过' : 'If it fails'}</dt><dd>{selected.next[language]}</dd></div>
        </dl>
      </article>

      <div className="principles-tree__conclusion"><span>{language === 'zh' ? '该路径的结论' : 'Conclusion from this lens'}</span><strong>{lens.conclusion[language]}</strong></div>
    </section>
  )
}
