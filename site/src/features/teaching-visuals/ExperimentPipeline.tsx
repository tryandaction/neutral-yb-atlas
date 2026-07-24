import { useRef, useState } from 'react'
import apparatusImage from '../../assets/teaching-generated/yb-reloadable-apparatus.png'
import type { Language } from '../../types/content'
import Equation from '../article/Equation'
import WikiText from '../wiki/WikiText'
import './teaching-visuals.css'

interface Stage {
  id: string
  short: Record<Language, string>
  title: Record<Language, string>
  objective: Record<Language, string>
  physics: Record<Language, string>
  equation: string
  procedure: Array<Record<Language, string>>
  milestone: Record<Language, string>
  learningLink: Record<Language, string>
  apparatus: Record<Language, string>
  acceptance: Record<Language, string>
  record: Record<Language, string>
  duration: Record<Language, string>
}

const stages: Stage[] = [
  {
    id: 'source', short: { zh: '原子源', en: 'Source' }, title: { zh: '原子炉、束流与超高真空', en: 'Oven, atomic beam and ultrahigh vacuum' },
    objective: { zh: '建立稳定、可维护且污染受控的 Yb 原子通量。', en: 'Establish a stable, serviceable and contamination-controlled Yb flux.' },
    physics: { zh: '蒸气压决定束流，差分抽气与准直限制气载负荷；背景碰撞率直接进入俘获寿命。', en: 'Vapor pressure sets flux; differential pumping and collimation limit gas load; background collision rate enters trap lifetime directly.' },
    equation: String.raw`P=Q/S_{\rm eff},\qquad \tau_{\rm trap}^{-1}=\sum_i n_i\langle\sigma_i v_i\rangle`,
    procedure: [{ zh: '完成清洁、氦检和材料放行。', en: 'Release cleaning, leak test and materials.' }, { zh: '分区烘烤并记录温度、压力和 RGA 全时序。', en: 'Bake by zone and log temperature, pressure and the full RGA timeline.' }, { zh: '逐级提高炉温，测通量、科学腔压力和恢复时间。', en: 'Step oven temperature and measure flux, science-cell pressure and recovery.' }, { zh: '用暗保持光镊寿命复核局部背景碰撞。', en: 'Verify local background collisions with dark tweezer lifetime.' }],
    milestone: { zh: '原子炉开启时仍保持可恢复的科学腔真空，并获得可重复装载通量。', en: 'Maintain recoverable science-cell vacuum with repeatable loading flux while the oven is on.' },
    learningLink: { zh: '背景气体碰撞会中断原子序列，因此真空寿命直接限制可重复的纠错周期数。', en: 'Background-gas collisions interrupt the atomic sequence, so vacuum lifetime directly limits the number of repeatable correction cycles.' },
    apparatus: { zh: 'Yb 原子炉、快门、Zeeman slower/二维减速、离子泵、NEG、真空计、RGA。', en: 'Yb oven, shutter, Zeeman slower/2D slowing, ion pump, NEG, gauges and RGA.' },
    acceptance: { zh: '烘烤后基压与 RGA 谱稳定；开启原子炉时科学腔压力、装载率和污染增长符合预算。', en: 'Stable post-bake base pressure and RGA spectrum; science-cell pressure, loading and contamination growth remain within budget when the oven is on.' },
    record: { zh: '温度—通量曲线、压力恢复曲线、RGA 谱、维护记录。', en: 'Temperature–flux curve, pressure recovery, RGA spectra and service log.' }, duration: { zh: '设计/采购/加工通常 6–12 个月，烘烤与调试 4–10 周', en: 'Design/procurement/fabrication often 6–12 months; bake and commissioning 4–10 weeks' },
  },
  {
    id: 'cooling', short: { zh: 'MOT 冷却', en: 'MOT' }, title: { zh: '两级 MOT 与温度压缩', en: 'Two-stage MOT and temperature compression' },
    objective: { zh: '把热原子束捕获并冷却到可装入微米尺度光镊的相空间密度。', en: 'Capture the thermal beam and cool it to phase-space density compatible with micron-scale tweezers.' },
    physics: { zh: '399 nm 提供大捕获速度，556 nm 窄线降低温度；失谐、梯度、偏振和强度共同决定阻尼与恢复力。', en: '399 nm supplies capture velocity and 556 nm narrows temperature; detuning, gradient, polarization and intensity jointly set damping and restoring force.' },
    equation: String.raw`T_D=\frac{\hbar\Gamma}{2k_B},\qquad F_{\rm sc}\propto\frac{s}{1+s+4(\Delta-kv)^2/\Gamma^2}`,
    procedure: [{ zh: '补偿残磁场并标定六束光功率、重合和偏振。', en: 'Compensate residual field and calibrate six-beam power, overlap and polarization.' }, { zh: '扫描 399 nm 失谐×梯度，拟合完整装载曲线。', en: 'Scan 399 nm detuning versus gradient and fit full loading curves.' }, { zh: '执行 556 nm 宽频捕获到窄频压缩斜坡。', en: 'Run the 556 nm broadband-capture to narrow-compression ramp.' }, { zh: '用 TOF/释放再捕获测温并扫描光镊转移时刻。', en: 'Measure temperature by TOF/release-recapture and scan tweezer transfer time.' }],
    milestone: { zh: '获得温度、云尺寸和转移效率均可跨天复现的窄线 MOT 末态。', en: 'Obtain a narrow-line MOT final state with reproducible temperature, cloud size and transfer.' },
    learningLink: { zh: '散射力和 Zeeman 位移共同决定捕获速度与温度，进而决定光镊装载概率。', en: 'Scattering force and Zeeman shifts jointly set capture velocity and temperature, which determine tweezer-loading probability.' },
    apparatus: { zh: '399/556 nm 激光、锁频、AOM、光纤、扩束、偏振器、三轴补偿线圈与 MOT 线圈。', en: '399/556 nm lasers, locks, AOMs, fibers, expanders, polarizers, compensation coils and MOT coils.' },
    acceptance: { zh: '记录原子数、温度、寿命和转移效率随失谐/功率/梯度的二维扫描，不能只保存最佳点。', en: 'Record atom number, temperature, lifetime and transfer efficiency across detuning/power/gradient scans, not only the optimum.' },
    record: { zh: '吸收/荧光图像、TOF 温度、线圈标定、频率漂移日志。', en: 'Absorption/fluorescence images, TOF temperature, coil calibration and frequency-drift log.' }, duration: { zh: '光源与锁频 2–5 个月；MOT 闭环 3–8 周', en: 'Laser and lock 2–5 months; MOT closure 3–8 weeks' },
  },
  {
    id: 'tweezers', short: { zh: '光镊装载', en: 'Tweezers' }, title: { zh: '光镊势阱、成像与单原子装载', en: 'Tweezer confinement, imaging and single-atom loading' },
    objective: { zh: '形成站点分辨、低加热且可重复装载的单原子阵列。', en: 'Form a site-resolved, low-heating and repeatably loaded single-atom array.' },
    physics: { zh: '动态极化率给出偶极势；散射、差分光移和光强噪声限制相干与生存。装载统计需要碰撞阻塞或增强装载机制。', en: 'Dynamic polarizability sets the dipole potential; scattering, differential shifts and intensity noise limit coherence and survival. Loading statistics require collisional blockade or enhanced loading.' },
    equation: String.raw`U(\mathbf r)=-\frac{\mathrm{Re}[\alpha(\omega)]I(\mathbf r)}{2\epsilon_0c},\qquad \omega_r\simeq\sqrt{4|U_0|/(mw_0^2)}`,
    procedure: [{ zh: '标定 SLM/AOD 坐标、原子面腰斑、偏振和功率。', en: 'Calibrate SLM/AOD coordinates, atom-plane waist, polarization and power.' }, { zh: '逐站点扫描参量加热，提取径向/轴向阱频。', en: 'Scan parametric heating site by site to extract radial/axial frequencies.' }, { zh: '建立孤立原子 PSF 和亮/空/损失混淆矩阵。', en: 'Build isolated-atom PSF and bright/empty/loss confusion matrices.' }, { zh: '扫描 MOT 末态、光镊时刻与阱深，测装载和成像生存。', en: 'Scan final MOT state, tweezer timing and depth; measure loading and imaging survival.' }],
    milestone: { zh: '每个站点均有坐标、阱频、装载、PSF 和生存率记录。', en: 'Every site has coordinate, trap frequency, loading, PSF and survival records.' },
    learningLink: { zh: '极化率把光强转成阱深与散射率；二者分别约束俘获稳定性和相干时间。', en: 'Polarizability converts intensity into trap depth and scattering rate; these constrain trapping stability and coherence time.' },
    apparatus: { zh: '光镊激光、AOD/SLM、高 NA 物镜、空间滤波、功率稳定、EMCCD/sCMOS。', en: 'Tweezer laser, AOD/SLM, high-NA objective, spatial filtering, power stabilization and EMCCD/sCMOS.' },
    acceptance: { zh: '逐站点测量阱频、深度、装载概率、成像保真度、成像生存率与邻站串扰。', en: 'Measure trap frequency, depth, loading, imaging fidelity, survival and neighbor crosstalk site by site.' },
    record: { zh: '占据图、阱频谱、PSF、像差图、光强平坦度与站点参数表。', en: 'Occupancy maps, trap spectra, PSF, aberration map, intensity flatness and site parameter table.' }, duration: { zh: '光机集成与像差优化 2–5 个月', en: 'Optomechanical integration and aberration optimization 2–5 months' },
  },
  {
    id: 'rearrange', short: { zh: '重排', en: 'Rearrange' }, title: { zh: '占据识别、路径规划与无缺陷重排', en: 'Occupancy inference, path planning and defect-free rearrangement' },
    objective: { zh: '把随机装载阵列转换为目标几何，并量化移动引入的损失和运动激发。', en: 'Convert stochastic loading into a target geometry while quantifying motion-induced loss and excitation.' },
    physics: { zh: '轨迹加速度谱与阱频重叠会加热；移动时间、并行冲突和站点交换决定重排周期。', en: 'Trajectory acceleration spectra can overlap trap frequencies and heat atoms; motion time, parallel conflicts and swaps set the rearrangement cycle.' },
    equation: String.raw`\dot E\simeq\frac{m\omega^4}{4}S_x(\omega),\qquad x(t)=F\lambda f_{\rm RF}(t)/v_a`,
    procedure: [{ zh: '由原始帧输出占据概率和分类置信度。', en: 'Infer occupancy probabilities and confidence from raw frames.' }, { zh: '在路径不交叉、速度/加速度/jerk 受限下求搬运计划。', en: 'Plan noncrossing moves with velocity, acceleration and jerk limits.' }, { zh: '生成相位连续 AOD 波形并记录实际下发哈希。', en: 'Generate phase-continuous AOD waveforms and record the delivered hash.' }, { zh: '移动后立即复核成像与温度，按路径长度分类。', en: 'Immediately verify imaging and temperature after motion, stratified by path length.' }],
    milestone: { zh: '达到目标填充率，同时移动损失、温升和端到端周期均在预算内。', en: 'Reach target filling while move loss, heating and end-to-end cycle remain within budget.' },
    learningLink: { zh: '移动轨迹若含接近阱频的频率分量就会激发运动，因此重排速度与最终温度必须同时权衡。', en: 'Motion near the trap frequency excites the atom, so rearrangement speed and final motional temperature must be balanced.' },
    apparatus: { zh: '实时图像分类、FPGA/GPU 路径规划、AOD 波形、统一时钟和移动后再成像。', en: 'Real-time image classification, FPGA/GPU path planning, AOD waveforms, unified clock and post-motion imaging.' },
    acceptance: { zh: '报告初始装载、目标填充、移动次数、周期时间、移动后生存与温度，不只报告最终填充率。', en: 'Report initial loading, target filling, move count, cycle time, post-motion survival and temperature, not only final filling.' },
    record: { zh: '逐次占据图、规划路径、波形哈希、失败类型和站点热图。', en: 'Shot-resolved occupancy, planned paths, waveform hashes, failure classes and site heatmaps.' }, duration: { zh: '算法/时序/运动标定 1–3 个月', en: 'Algorithm, timing and motion calibration 1–3 months' },
  },
  {
    id: 'qubit', short: { zh: '量子比特', en: 'Qubit' }, title: { zh: '核自旋制备、相干控制与钟态映射', en: 'Nuclear-spin preparation, coherent control and clock-state mapping' },
    objective: { zh: '建立明确的计算基、可逆映射、相位参考和泄漏判据。', en: 'Establish a defined computational basis, reversible mapping, phase reference and leakage criterion.' },
    physics: { zh: '核自旋 I=1/2 简化计算子空间；偏振纯度、磁场、差分光移和路径相噪决定选择性与相干。', en: 'Nuclear spin I=1/2 simplifies the computational subspace; polarization purity, field, differential light shift and path phase noise set selectivity and coherence.' },
    equation: String.raw`H_q/\hbar=\frac{1}{2}(\Omega_x\sigma_x+\Omega_y\sigma_y+\delta\sigma_z),\qquad \delta=\delta_B+\delta_{\rm AC}+\delta_{\rm LO}`,
    procedure: [{ zh: '光抽运制备核自旋参考态并测纯度/损失。', en: 'Optically pump a nuclear-spin reference and measure purity/loss.' }, { zh: '扫描偏置场与 RF/578 nm 频率，建立旁路谱。', en: 'Scan bias field and RF/578 nm frequencies to map spectators.' }, { zh: '完成 Rabi、Ramsey、echo 和跨站点不均匀测量。', en: 'Complete Rabi, Ramsey, echo and site-inhomogeneity measurements.' }, { zh: '执行 1S0↔3P0 往返映射并区分泄漏、损失和 SPAM。', en: 'Run 1S0-to-3P0 round trips and separate leakage, loss and SPAM.' }],
    milestone: { zh: '得到相位可追踪、往返可逆并跨站点一致的量子比特接口。', en: 'Obtain a phase-traceable, reversible and site-uniform qubit interface.' },
    learningLink: { zh: '选择定则确定可驱动通道，差分光移与噪声谱决定相位能保持多久。', en: 'Selection rules determine accessible transitions, while differential light shifts and noise spectra determine phase memory.' },
    apparatus: { zh: '光抽运、RF/微波、578 nm 钟激光、超稳腔、磁屏蔽、相位稳定链路。', en: 'Optical pumping, RF/microwave, 578 nm clock laser, ultrastable cavity, magnetic shielding and phase-stabilized delivery.' },
    acceptance: { zh: '分别测量 SPAM、Rabi、Ramsey、echo、映射往返保真度、泄漏和跨站点不均匀。', en: 'Measure SPAM, Rabi, Ramsey, echo, round-trip mapping fidelity, leakage and site inhomogeneity separately.' },
    record: { zh: '相位参考、频率记录、磁场地图、映射矩阵和长时间漂移。', en: 'Phase reference, frequency record, field map, mapping matrix and long-term drift.' }, duration: { zh: '首个相干闭环 1–3 个月；稳健化持续迭代', en: 'First coherent closure 1–3 months; robustness remains iterative' },
  },
  {
    id: 'rydberg', short: { zh: 'Rydberg 门', en: 'Rydberg gate' }, title: { zh: 'Rydberg 光谱、阻塞与纠缠门', en: 'Rydberg spectroscopy, blockade and entangling gates' },
    objective: { zh: '从单原子耦合逐层建立两原子相互作用、条件相位和可重复纠缠门。', en: 'Build from single-atom coupling to two-atom interaction, conditional phase and repeatable entangling gates.' },
    physics: { zh: '有限阻塞、Doppler、激光相噪、自发辐射、旁路耦合和空间不均匀共同形成门通道。', en: 'Finite blockade, Doppler shifts, laser phase noise, spontaneous decay, spectator coupling and spatial inhomogeneity jointly form the gate channel.' },
    equation: String.raw`V(R)=C_6/R^6,\qquad \epsilon_B\sim(\Omega/V)^2,\qquad \phi_c=\phi_{11}-\phi_{10}-\phi_{01}+\phi_{00}`,
    procedure: [{ zh: '完成单原子低功率谱学、Rabi、寿命和旁路态标定。', en: 'Complete low-power single-atom spectra, Rabi, lifetime and spectator calibration.' }, { zh: '扫描双原子距离/角度，测阻塞位移和双激发。', en: 'Scan pair distance/angle and measure blockade shift plus double excitation.' }, { zh: '用 Ramsey 恢复条件相位并检查门末泄漏。', en: 'Recover conditional phase with Ramsey and inspect end-of-gate leakage.' }, { zh: '依次完成真值表、Bell 奇偶、重复门和并行密度扫描。', en: 'Complete truth table, Bell parity, repeated gates and parallel-density scans in order.' }],
    milestone: { zh: '门末返回计算子空间，条件相位、损失、泄漏和 SPAM 均单独满足预算。', en: 'Return to the code space at gate end with conditional phase, loss, leakage and SPAM separately within budget.' },
    learningLink: { zh: '双原子哈密顿量把驱动波形、阻塞强度、条件相位、泄漏和损失连接成可检验的因果链。', en: 'The two-atom Hamiltonian connects drive waveform, blockade strength, conditional phase, leakage and loss in a testable causal chain.' },
    apparatus: { zh: '紫外激发链、相位锁、功率/指向稳定、AWG/FPGA、脉冲整形和同步探测。', en: 'UV excitation chain, phase lock, power/pointing stabilization, AWG/FPGA, pulse shaping and synchronized detection.' },
    acceptance: { zh: '依次完成单原子 Rabi、双原子阻塞、条件相位、Bell 奇偶振荡、重复门序列，并单列损失、泄漏、擦除与 SPAM。', en: 'Complete single-atom Rabi, two-atom blockade, conditional phase, Bell parity oscillation and repeated-gate sequences, with loss, leakage, erasure and SPAM reported separately.' },
    record: { zh: '原始序列、完整波形、锁定状态、环境量、真值表、相位扫描和置信区间。', en: 'Raw sequences, complete waveforms, lock state, environment, truth tables, phase scans and confidence intervals.' }, duration: { zh: '光源和谱学 3–8 个月；门优化持续迭代', en: 'Laser/spectroscopy 3–8 months; gate optimization remains iterative' },
  },
  {
    id: 'measure', short: { zh: '测量/QEC', en: 'Measure/QEC' }, title: { zh: '状态选择测量、复位、补原子与逻辑周期', en: 'Selective measurement, reset, replacement and logical cycles' },
    objective: { zh: '把门级组件组织成含经典记录、资源冲突和解码接口的完整周期。', en: 'Assemble gate-level components into a full cycle with classical records, resource conflicts and decoder interfaces.' },
    physics: { zh: '中电路测量改变条件通道；擦除优势取决于标签召回、误报、延迟和未标记故障之间的联合分布。', en: 'Mid-circuit measurement changes the conditional channel; erasure benefit depends on the joint distribution of recall, false positives, latency and unflagged faults.' },
    equation: String.raw`p(o,f|s)=\sum_e p(o,f|e,s)p(e|s),\qquad p_L=\mathcal D(\mathcal N_0,\mathcal N_f,p_f,\text{schedule})`,
    procedure: [{ zh: '标定亮/暗/泄漏/损失与标签的联合混淆矩阵。', en: 'Calibrate the joint confusion matrix for bright/dark/leakage/loss and flags.' }, { zh: '逐段测曝光、传输、判别、反馈和补原子延迟。', en: 'Measure exposure, transfer, classification, feedback and replacement latency separately.' }, { zh: '把条件通道、相关故障和资源冲突写入解码输入。', en: 'Write conditional channels, correlated faults and resource conflicts into decoder input.' }, { zh: '比较无标签、理想标签和实测标签的完整周期逻辑错误率。', en: 'Compare full-cycle logical error for no flags, ideal flags and measured flags.' }],
    milestone: { zh: '包含检测、反馈、补原子和调度后，实测条件通道仍降低逻辑错误率。', en: 'Measured conditional channels still lower logical error after detection, feedback, replacement and scheduling.' },
    learningLink: { zh: '测量标签、标签混淆、时序开销与解码规则共同决定每周期的逻辑错误率。', en: 'Measurement flags, flag confusion, timing overhead and decoding rules jointly determine logical error per cycle.' },
    apparatus: { zh: '状态选择读出、快速相机、实时分类、反馈 FPGA、补原子路径、数据湖和解码器。', en: 'State-selective readout, fast camera, real-time classification, feedback FPGA, replacement path, data store and decoder.' },
    acceptance: { zh: '端到端报告周期时间、条件通道、标签混淆矩阵、相关故障和逻辑错误率，不用组件最佳值代替。', en: 'Report end-to-end cycle time, conditional channels, label confusion matrix, correlated faults and logical error rate, rather than component best cases.' },
    record: { zh: '逐周期事件流、时间戳、占据、标签、反馈动作、解码输入与逻辑结果。', en: 'Cycle-resolved events, timestamps, occupancy, labels, feedback actions, decoder inputs and logical outcomes.' }, duration: { zh: '系统集成 6–18 个月，并与硬件迭代并行', en: 'System integration 6–18 months in parallel with hardware iteration' },
  },
]

const apparatusScrollRatio: Record<Stage['id'], number> = {
  source: 0,
  cooling: 0.28,
  tweezers: 0.7,
  rearrange: 0.86,
  qubit: 0.92,
  rydberg: 0.97,
  measure: 1,
}

export default function ExperimentPipeline({ language }: { language: Language }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState('source')
  const selected = stages.find((stage) => stage.id === selectedId) ?? stages[0]

  const selectStage = (stageId: Stage['id']) => {
    setSelectedId(stageId)

    const viewport = viewportRef.current
    if (!viewport) return

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
    const left = maxScroll * apparatusScrollRatio[stageId]
    if (typeof viewport.scrollTo === 'function') {
      viewport.scrollTo({ behavior: 'smooth', left })
    } else {
      viewport.scrollLeft = left
    }
  }

  return (
    <section className="teaching-visual experiment-pipeline" id="experiment-pipeline-tutor">
      <header className="teaching-visual__header">
        <div><span>APPARATUS / ACCEPTANCE PIPELINE</span><h2>{language === 'zh' ? '从原子炉到逻辑测量的实验全流程' : 'Full experiment path from oven to logical measurement'}</h2></div>
        <p>{language === 'zh' ? '按原子真正经历的顺序阅读：每一步说明初态怎样被装置改变、怎样检验，以及它为下一步准备了什么。' : 'Read in the order experienced by the atom: each step shows how apparatus changes the initial state, how that change is tested and what it prepares next.'}</p>
      </header>

      <figure className="pipeline-apparatus">
        <div
          ref={viewportRef}
          className="pipeline-apparatus__viewport"
          data-testid="pipeline-apparatus-viewport"
          role="region"
          aria-label={language === 'zh' ? '171Yb 实验装置全流程横向图' : 'Complete horizontal view of the 171Yb experimental apparatus'}
          tabIndex={0}
        >
          <img
            src={apparatusImage}
            alt={language === 'zh' ? '从原子源到可持续补充计算阵列的完整 171Yb 实验装置链' : 'Complete 171Yb apparatus path from atomic source to a reloadable computation array'}
            width="2172"
            height="724"
            loading="eager"
            draggable="false"
          />
        </div>
        <figcaption>
          <span>{language === 'zh' ? '选择下方阶段，主图将定位到对应装置，并同步更新状态变化、操作顺序与验收方法。' : 'Select a stage below to position the apparatus view and update the state change, operating sequence and acceptance checks.'}</span>
          <span>
            {language === 'zh' ? '装载、冷却、输运与连续补充参数来自 ' : 'Loading, cooling, transport and replacement parameters follow '}
            <a href="https://arxiv.org/abs/2506.15633" target="_blank" rel="noreferrer">Li et al. (2025)</a>
            {language === 'zh' ? '；亚稳态量子比特 Rydberg 门接口来自 ' : '; the metastable-qubit Rydberg gate interface follows '}
            <a href="https://doi.org/10.1038/s41586-023-06438-1" target="_blank" rel="noreferrer">Ma et al. (2023)</a>
            {language === 'zh' ? '。图中重排是处理器级扩展，不代表 Li 等人的装置已经演示该结果。' : '. Rearrangement is shown as a processor-level extension, not as a demonstrated result of the Li et al. apparatus.'}
          </span>
        </figcaption>
      </figure>

      <div className="pipeline-track" role="list" aria-label={language === 'zh' ? '实验流程阶段' : 'Experimental pipeline stages'}>
        {stages.map((stage, index) => (
          <button key={stage.id} type="button" aria-pressed={selected.id === stage.id} aria-controls="pipeline-stage-detail" onClick={() => selectStage(stage.id)}>
            <span>{String(index + 1).padStart(2, '0')}</span><strong>{stage.short[language]}</strong><i aria-hidden="true" />
          </button>
        ))}
      </div>

      <article className="teaching-card pipeline-card" id="pipeline-stage-detail" aria-live="polite">
        <div className="pipeline-card__summary"><span>{language === 'zh' ? '原子状态路径' : 'ATOMIC STATE PATH'}</span><h3>{selected.title[language]}</h3><p><WikiText text={selected.objective[language]} language={language} /></p></div>
        <div className="pipeline-card__execution">
          <Equation source={selected.equation} />
          <h4>{language === 'zh' ? '操作序列' : 'Operating sequence'}</h4>
          <ol>{selected.procedure.map((item, index) => <li key={item.en}><span>{String(index + 1).padStart(2, '0')}</span>{item[language]}</li>)}</ol>
        </div>
        <dl>
          <div><dt>{language === 'zh' ? '底层物理' : 'Underlying physics'}</dt><dd><WikiText text={selected.physics[language]} language={language} /></dd></div>
          <div><dt>{language === 'zh' ? '核心仪器' : 'Core apparatus'}</dt><dd><WikiText text={selected.apparatus[language]} language={language} /></dd></div>
          <div><dt>{language === 'zh' ? '阶段结论' : 'Stage conclusion'}</dt><dd><WikiText text={selected.milestone[language]} language={language} /></dd></div>
          <div><dt>{language === 'zh' ? '怎样检验' : 'How to test'}</dt><dd><WikiText text={selected.acceptance[language]} language={language} /></dd></div>
          <div><dt>{language === 'zh' ? '留下的记录' : 'Resulting record'}</dt><dd><WikiText text={selected.record[language]} language={language} /></dd></div>
          <div><dt>{language === 'zh' ? '因果联系' : 'Causal link'}</dt><dd><WikiText text={selected.learningLink[language]} language={language} /></dd></div>
        </dl>
      </article>
    </section>
  )
}
