import type { Chapter } from '../../types/content'

const rydbergSource = { id: 'wilson-2019', citation: 'Wilson et al., Trapped Arrays of Alkaline Earth Rydberg Atoms in Optical Tweezers (2019)', url: 'https://doi.org/10.1103/PhysRevLett.123.033201' }
const gateSource = { id: 'ma-2023', citation: 'Ma et al., High-fidelity gates and mid-circuit erasure conversion in an atomic qubit (2023)', url: 'https://doi.org/10.1038/s41586-023-06438-1' }

export const gatesChapter: Chapter = {
  id: 'gates',
  number: 4,
  title: { zh: '怎样从原子结构得到可验证的纠缠门', en: 'How atomic structure becomes a measurable entangling gate' },
  shortTitle: { zh: '量子门', en: 'Gates' },
  question: { zh: '激光控制怎样从原子能级产生条件相位，并由实验区分正确门、泄漏、损失和相干误差？', en: 'How does laser control turn atomic levels into conditional phase, and how does experiment separate a correct gate from leakage, loss and coherent error?' },
  sections: [
    {
      id: 'levels-to-controls',
      title: { zh: '能级只有连接到控制和观测才构成接口', en: 'A level becomes an interface only through control and observation' },
      question: { zh: '能级图怎样转化为门设计？', en: 'How does an energy-level diagram become a gate design?' },
      answer: { zh: '先锁定计算态、辅助态与 Rydberg 态，再为每条允许跃迁指定驱动场、选择定则、失谐和可观测量；能级位置本身不能给出量子门。', en: 'Fix computational, auxiliary and Rydberg states, then assign each allowed transition a drive field, selection rule, detuning and observable; level positions alone do not define a gate.' },
      reasoning: [
        { zh: '计算基必须对应明确的两个原子态，并列出可能承载泄漏与损失的其他流形。否则门后“仍有原子”不能证明信息留在计算空间。', en: 'The computational basis must name two atomic states and list manifolds that can carry leakage or loss. Otherwise “an atom remains” does not prove that information remains in the computational space.' },
        { zh: '电偶极矩、偏振和角动量选择定则决定哪些跃迁可由给定激光驱动，也决定旁观态和非目标耦合。', en: 'Dipole matrix elements, polarization and angular-momentum selection rules determine which transitions a laser drives and which spectator states are coupled unintentionally.' },
        { zh: '激光在原子位置的振幅、相位和频率分别进入 Rabi 频率、驱动相位和失谐；实验控制量必须先在原子响应上标定。', en: 'Laser amplitude, phase and frequency at the atom enter the Rabi frequency, drive phase and detuning; laboratory controls must be calibrated through atomic response.' },
        { zh: '门协议规定何时占据辅助态、怎样积累相位以及如何返回计算空间；读出必须分别识别布居、相位、泄漏和损失。', en: 'A gate protocol specifies auxiliary-state population, phase accumulation and return to the computational space; readout must separate population, phase, leakage and loss.' },
      ],
      measurement: { zh: '依次测单原子谱、偏振选择规则、Rabi 振荡与流形分辨读出，建立控制旋钮到原子参数的映射。', en: 'Measure single-atom spectra, polarization selection rules, Rabi oscillations and manifold-resolved readout to map control settings to atomic parameters.' },
      boundary: { zh: '能级图给出允许通道，不给出实际耦合强度、光移、相噪或门保真度；这些量必须由具体状态和装置标定。', en: 'A level diagram gives allowed channels, not actual coupling, light shifts, phase noise or gate fidelity; these require state- and device-specific calibration.' },
      sources: [rydbergSource, gateSource],
      nextQuestion: { zh: '单个原子在振幅、相位和失谐控制下怎样演化？', en: 'How does one atom evolve under amplitude, phase and detuning control?' },
    },
    {
      id: 'single-atom-drive',
      title: { zh: '单原子哈密顿量连接波形与状态演化', en: 'The one-atom Hamiltonian links waveforms to state evolution' },
      question: { zh: '控制波形怎样决定计算态与 Rydberg 态之间的演化？', en: 'How does a control waveform determine evolution between a computational and Rydberg state?' },
      answer: { zh: '旋转框架下，Rabi 频率、相位和失谐分别决定耦合强度、旋转方向和相对能量；对哈密顿量积分才得到脉冲后的状态。', en: 'In a rotating frame, Rabi frequency, phase and detuning set coupling strength, rotation direction and relative energy; integrating the Hamiltonian gives the state after the pulse.' },
      reasoning: [
        { zh: '选定 |1⟩ 与 |r⟩ 后，驱动场把两态耦合；另一个计算态 |0⟩ 应保持暗态或只积累已知、可校正的相位。', en: 'After choosing |1> and |r>, the drive couples them; the other computational state |0> should remain dark or acquire only a known correctable phase.' },
        { zh: 'Ω(t) 来自原子处电场与跃迁矩阵元，φ(t) 是相位参考，Δ(t) 包含激光失谐、AC Stark 和磁场引起的有效位移。', en: 'Omega(t) comes from the atom-plane field and transition matrix element, phi(t) is the phase reference and Delta(t) includes laser detuning, AC Stark and magnetic shifts.' },
        { zh: '理想两能级模型预测 Rabi 轨迹；附近能级、反旋项、运动与衰变使实际演化偏离，需要扩大状态空间或使用主方程。', en: 'The ideal two-level model predicts a Rabi trajectory; nearby levels, counter-rotating terms, motion and decay require a larger state space or master equation.' },
      ],
      equation: {
        expression: String.raw`\frac{H_1(t)}{\hbar}=\frac{\Omega(t)}{2}\!\left(e^{i\phi(t)}|r\rangle\langle1|+\mathrm{h.c.}\right)-\Delta(t)|r\rangle\langle r|`,
        role: { zh: '把可标定的光学波形映射为单原子有效动力学。', en: 'Maps calibrated optical waveforms to effective one-atom dynamics.' },
        symbols: [
          { zh: 'Ω、Δ 以角频率表示，φ 为无量纲相位；|1⟩ 是被驱动的计算态，|r⟩ 是指定 Rydberg 态。', en: 'Omega and Delta are angular frequencies, phi is dimensionless, |1> is the driven computational state and |r> the selected Rydberg state.' },
        ],
        assumptions: [
          { zh: '采用旋转框架和旋转波近似，并截断为两能级；强驱动或邻近多能级时该模型失效。', en: 'Uses a rotating frame, rotating-wave approximation and two-level truncation; strong drive or nearby levels invalidate it.' },
        ],
      },
      measurement: { zh: '扫描脉冲时间和失谐，联合拟合布居、对比度与相位；在不同站点和日期复测以分离空间不均匀与慢漂。', en: 'Scan pulse duration and detuning and jointly fit population, contrast and phase; repeat across sites and dates to separate spatial inhomogeneity from slow drift.' },
      boundary: { zh: 'Rabi 拟合只能验证单原子有效模型，不能证明双原子条件相位或纠缠。', en: 'A Rabi fit validates a one-atom effective model; it does not establish two-atom conditional phase or entanglement.' },
      sources: [gateSource],
      nextQuestion: { zh: '两个原子的 Rydberg 相互作用怎样把局域驱动变成条件相位？', en: 'How does the Rydberg interaction turn local drive into conditional phase?' },
    },
    {
      id: 'blockade-to-controlled-phase',
      title: { zh: '阻塞改变双激发路径并留下条件相位', en: 'Blockade changes the double-excitation path and leaves conditional phase' },
      question: { zh: 'Rydberg 阻塞怎样产生两比特门？', en: 'How does Rydberg blockade produce a two-qubit gate?' },
      answer: { zh: '两原子同时受驱动时，|rr⟩ 的相互作用能移改变 |11⟩ 分支的动力学；脉冲使所有计算基态返回计算空间，并让 |11⟩ 相对其他分支多积累 π 相位，才得到 CZ。', en: 'When both atoms are driven, the interaction shift of |rr> changes the |11> branch dynamics; a CZ is obtained only if all basis states return to the computational space and |11> acquires an additional pi phase.' },
      reasoning: [
        { zh: '|00⟩、|01⟩、|10⟩ 与 |11⟩ 经过的受驱动路径不同；只有 |11⟩ 同时允许两原子接近双 Rydberg 激发。', en: '|00>, |01>, |10> and |11> follow different driven paths; only |11> permits both atoms to approach double Rydberg excitation.' },
        { zh: '相互作用 V 把 |rr⟩ 推离单原子共振。|V| 远大于脉冲带宽时双激发受抑，但有限 V 仍产生残余 Prr 和相位偏差。', en: 'Interaction V shifts |rr> from the one-atom resonance. When |V| greatly exceeds pulse bandwidth double excitation is suppressed, while finite V leaves residual Prr and phase error.' },
        { zh: '门结束时 Rydberg 布居必须返回计算子空间；仅观察到阻塞或布居恢复，不足以证明相对条件相位为 π。', en: 'Rydberg population must return to the computational subspace at the end; blockade or population return alone does not prove a relative conditional phase of pi.' },
        { zh: '相位整形、幅度整形或失谐整形可以减少 Rydberg 暴露并降低对 V、Ω、Δ 的敏感性，但验收仍由测量而非脉冲外观决定。', en: 'Phase, amplitude or detuning shaping can reduce Rydberg exposure and sensitivity to V, Omega and Delta, but acceptance remains measurement-based rather than waveform-based.' },
      ],
      equation: {
        expression: String.raw`H_2=H_1^{(a)}+H_1^{(b)}+\hbar V|rr\rangle\langle rr|,\qquad U_{\mathrm{CZ}}=\operatorname{diag}(1,1,1,-1)`,
        role: { zh: '左式指出条件动力学来自双 Rydberg 态能移；右式定义目标门在计算基中的相对相位。', en: 'The left expression locates conditional dynamics in the double-Rydberg shift; the right defines the target relative phase in the computational basis.' },
        symbols: [
          { zh: 'H₁(a,b) 是两原子单体驱动，V 是 |rr⟩ 相互作用角频率对应的能移，CZ 的基顺序为 |00⟩、|01⟩、|10⟩、|11⟩。', en: 'H1(a,b) are the one-atom drives, V is the interaction shift of |rr>, and the CZ basis order is |00>, |01>, |10>, |11>.' },
        ],
        assumptions: [
          { zh: '最小模型忽略自发辐射、Doppler、多 Rydberg 通道、旁观态和相关激光噪声。', en: 'The minimal model omits spontaneous emission, Doppler shifts, multiple Rydberg channels, spectator states and correlated laser noise.' },
          { zh: 'U 的整体相位不可观测；门验收关心局域相位校正后的条件相位和计算子空间保持。', en: 'Global phase is unobservable; gate acceptance concerns conditional phase after local-phase correction and retention in the computational subspace.' },
        ],
      },
      measurement: { zh: '联合测双原子谱、最大双激发、门后 Rydberg 残余和条件相位；改变距离、角度、Ω 与 Δ 检查模型是否同时预测这些量。', en: 'Jointly measure pair spectra, maximum double excitation, residual Rydberg population and conditional phase; vary distance, angle, Omega and Delta and require one model to predict them together.' },
      boundary: { zh: 'V/Ω 大只说明阻塞条件较强，不等于 CZ 保真度高。衰变、相位噪声、泄漏和控制不均匀可以在强阻塞下继续限制门。', en: 'Large V/Omega indicates strong blockade, not high CZ fidelity. Decay, phase noise, leakage and control inhomogeneity can remain limiting under strong blockade.' },
      sources: [rydbergSource, gateSource],
      nextQuestion: { zh: '哪些测量能分别检验布居映射、相干条件相位、泄漏和损失？', en: 'Which measurements separately test population mapping, coherent conditional phase, leakage and loss?' },
    },
    {
      id: 'gate-evidence',
      title: { zh: '门验收必须分解可区分的失败', en: 'Gate acceptance must separate distinguishable failures' },
      question: { zh: '怎样证明实现的是可用于电路的量子门，而不只是一次布居演示？', en: 'How do we establish a circuit-usable quantum gate rather than a population demonstration?' },
      answer: { zh: '真值表检验布居映射，Ramsey 或 Bell 奇偶检验条件相位与相干，重复门和基准测试检验累积通道；损失、泄漏、擦除和 SPAM 必须单列。', en: 'A truth table tests population mapping, Ramsey or Bell parity tests conditional phase and coherence, and repeated gates or benchmarking test the accumulated channel; loss, leakage, erasure and SPAM remain separate.' },
      reasoning: [
        { zh: '计算基真值表回答门后原子落在哪个结果类别，但对不同基态之间的相对相位不敏感。', en: 'A computational-basis truth table identifies final outcome classes but is insensitive to relative phase between basis states.' },
        { zh: '条件 Ramsey 或 Bell 奇偶振荡把相位转成可见干涉条纹；对比度和相位共同约束相干纠缠，而非只约束布居。', en: 'Conditional Ramsey or Bell-parity oscillations convert phase into visible interference; contrast and phase jointly constrain coherent entanglement rather than population alone.' },
        { zh: '单次门可能被 SPAM 掩盖。重复门序列、随机基准或循环基准用误差随深度增长区分门通道与固定读出偏置。', en: 'SPAM can mask one gate. Repeated-gate sequences, randomized benchmarking or cycle benchmarking separate channel accumulation from fixed readout bias.' },
        { zh: '原子缺失、离开计算子空间和被检测到的擦除对后续电路传播不同；把它们全部并入一个保真度会丢失纠错所需信息。', en: 'Atom loss, computational-subspace leakage and detected erasures propagate differently; combining them into one fidelity discards information required by QEC.' },
      ],
      measurement: { zh: '使用同一数据集联合报告真值表、条件相位、Bell 奇偶、重复门增长、SPAM、损失、泄漏和擦除混淆矩阵，并公开后选择规则。', en: 'From one dataset report truth table, conditional phase, Bell parity, repeated-gate growth, SPAM, loss, leakage and erasure confusion matrix, with postselection rules declared.' },
      boundary: { zh: '任何单一指标都不能完整确定带泄漏和损失的双比特通道。过程保真度、平均门保真度或纠缠保真度必须注明定义和条件化口径。', en: 'No single metric determines a two-qubit channel with leakage and loss. Process, average-gate or entanglement fidelity requires an explicit definition and conditioning convention.' },
      sources: [gateSource],
      nextQuestion: { zh: '这些控制和测量怎样在真实装置中排成一次完整原子周期？', en: 'How are these controls and measurements scheduled into one complete atomic cycle?' },
    },
  ],
}
