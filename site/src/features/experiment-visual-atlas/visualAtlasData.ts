import sourcePlate from '../../assets/teaching-generated/01-uhv-source.png'
import laserPlate from '../../assets/teaching-generated/02-laser-infrastructure.png'
import sciencePlate from '../../assets/teaching-generated/03-science-cell.png'
import imagingPlate from '../../assets/teaching-generated/04-imaging-rearrangement.png'
import rydbergPlate from '../../assets/teaching-generated/05-uv-rydberg-review.png'
import controlPlate from '../../assets/teaching-generated/06-control-data-review.png'
import readinessPlate from '../../assets/teaching-generated/07-lab-readiness.png'
import modulePlate from '../../assets/teaching-generated/08-scalable-module.png'
import type { LocalizedText } from '../../types/content'

export interface AtlasHotspot {
  id: string
  index: string
  label: LocalizedText
  summary: LocalizedText
  action: LocalizedText
  record: LocalizedText
  boundary: LocalizedText
  x: number
  y: number
  rx: number
  ry: number
}

export interface AtlasCorrectionMask {
  id: string
  left: number
  top: number
  width: number
  height: number
  background: string
  color?: string
  text?: string
  fontSize?: string
}

export interface AtlasPlate {
  id: string
  number: string
  title: LocalizedText
  shortTitle: LocalizedText
  alt: LocalizedText
  image: string
  aspectRatio?: string
  scope: LocalizedText
  caption: LocalizedText
  accent: string
  masks?: AtlasCorrectionMask[]
  hotspots: AtlasHotspot[]
}

const text = (zh: string, en: string): LocalizedText => ({ zh, en })

export const atlasPlates: AtlasPlate[] = [
  {
    id: 'source',
    number: '01',
    title: text('镱原子源与超高真空链路', 'Ytterbium source and ultrahigh-vacuum chain'),
    shortTitle: text('原子源 / UHV', 'Source / UHV'),
    alt: text('镱原子源与超高真空教学图版', 'Ytterbium source and UHV teaching plate'),
    image: sourcePlate,
    scope: text('工程起点 + 原子固有值', 'Engineering starting points + atomic constant'),
    caption: text(
      '炉温、真空和烘烤区间是工程起点；399 nm 线宽是原子固有值。B(z) 曲线只表示需要标定的轴向场型，不指定唯一 Zeeman slower 拓扑。',
      'Oven, vacuum and bake ranges are engineering starting points; the 399 nm linewidth is atomic. The B(z) trace indicates a field profile to calibrate, not a unique slower topology.',
    ),
    accent: '#a65a28',
    hotspots: [
      {
        id: 'oven', index: '01', label: text('镱炉与原子束', 'Yb oven and atomic beam'),
        summary: text('加热建立镱蒸气压，喷口和准直结构决定可用束流。', 'Heating establishes Yb vapor pressure; the nozzle and collimation set usable flux.'),
        action: text('分段升温，逐点记录炉温与 MOT 装载率，不以加热电流代替温度。', 'Ramp temperature in steps and record MOT loading at each point; heater current is not temperature.'),
        record: text('炉温—装载率、炉开/关压力增量、关快门后的压力恢复。', 'Temperature-loading curve, pressure increment with oven on/off, and recovery after shutter closure.'),
        boundary: text('400–500 °C 是常见工程起点，不是统一工作温度。', '400–500 °C is a common starting range, not a universal operating temperature.'),
        x: 9, y: 43, rx: 7, ry: 15,
      },
      {
        id: 'vacuum', index: '02', label: text('差分抽气与 RGA', 'Differential pumping and RGA'),
        summary: text('限流孔、管长和两级泵速共同隔离原子源与科学腔。', 'Apertures, tube length and two-stage pumping isolate the source from the science chamber.'),
        action: text('比较炉开/关、快门开/关，并检查 H₂、H₂O、CO、CO₂ 组分。', 'Compare oven and shutter states; inspect H₂, H₂O, CO and CO₂ components.'),
        record: text('基压、压升率、RGA 全谱、压力恢复时间和背景寿命。', 'Base pressure, rise rate, full RGA spectrum, recovery time and background lifetime.'),
        boundary: text('10⁻¹⁰ mbar 量级是目标起点，最终以寿命和本机计量为准。', 'The 10⁻¹⁰ mbar scale is a starting target; lifetime and local metrology decide acceptance.'),
        x: 48, y: 43, rx: 12, ry: 13,
      },
      {
        id: 'slower', index: '03', label: text('399 nm 纵向减速', '399 nm longitudinal slowing'),
        summary: text('逆向 399 nm 光与轴向磁场补偿原子减速中的 Doppler 位移。', 'Counter-propagating 399 nm light and an axial field compensate the changing Doppler shift.'),
        action: text('依次扫描线圈电流、激光失谐和功率，并保持光束与原子束共线。', 'Scan coil current, laser detuning and power in order while keeping optical and atomic axes aligned.'),
        record: text('MOT 装载率关于失谐与线圈电流的二维图。', 'A two-dimensional MOT-loading map versus detuning and coil current.'),
        boundary: text('Γ/2π≈29 MHz 为固有线宽；B(z) 形状取决于具体减速器。', 'Γ/2π≈29 MHz is atomic; B(z) depends on the slower design.'),
        x: 69, y: 44, rx: 10, ry: 15,
      },
      {
        id: 'science', index: '04', label: text('科学腔验收', 'Science-chamber acceptance'),
        summary: text('科学腔把真空、MOT、光镊、成像和后续相干控制汇聚到同一空间。', 'The science chamber brings vacuum, MOT, tweezers, imaging and coherent control into one volume.'),
        action: text('在炉温工作点下重复测量装载收益、背景寿命和压力恢复。', 'At the chosen oven point, repeat loading, background-lifetime and pressure-recovery measurements.'),
        record: text('基压、寿命、MOT 装载曲线、维护与污染趋势。', 'Base pressure, lifetime, MOT loading, maintenance and contamination trends.'),
        boundary: text('炉温工作点由装载收益与污染代价共同确定。', 'The oven operating point balances loading gain against contamination cost.'),
        x: 89, y: 43, rx: 8, ry: 17,
      },
    ],
  },
  {
    id: 'laser',
    number: '02',
    title: text('多波长激光基础设施', 'Multi-wavelength laser infrastructure'),
    shortTitle: text('多波长激光', 'Laser infrastructure'),
    alt: text('171Yb 多波长激光基础设施教学图版', '171Yb multi-wavelength laser infrastructure teaching plate'),
    image: laserPlate,
    scope: text('固有线宽 + 装置示意', 'Atomic linewidths + apparatus illustration'),
    caption: text('线宽是原子固有值；平台拓扑、锁定误差、功率、光斑和消光比必须由本机测量。', 'Linewidths are atomic; table topology, lock error, power, beam profile and extinction ratio require local measurement.'),
    accent: '#2f6ca3',
    masks: [
      { id: 'extinction', left: 93.8, top: 62.2, width: 5.8, height: 8.5, background: '#fff', color: '#152a42', text: '消光比：\n本机测量' },
    ],
    hotspots: [
      {
        id: '399-path', index: '01', label: text('399 nm 强线光路', '399 nm strong-line path'),
        summary: text('¹S₀→¹P₁，Γ/2π≈29 MHz，用于减速、一级 MOT 和快速成像。', '¹S₀→¹P₁, Γ/2π≈29 MHz, for slowing, first MOT and fast imaging.'),
        action: text('先锁频，再设 AOM 失谐，随后调功率、偏振与末端指向。', 'Lock frequency, set AOM detuning, then tune power, polarization and delivered pointing.'),
        record: text('锁误差、源端/末端功率、原子谱和 MOT 装载。', 'Lock error, source/delivered power, atomic spectrum and MOT loading.'),
        boundary: text('图片光路是功能拓扑，不代表特定实验室的物理摆放。', 'The image is a functional topology, not a literal table layout.'),
        x: 55, y: 42, rx: 19, ry: 4,
      },
      {
        id: '556-path', index: '02', label: text('556 nm 窄线光路', '556 nm narrow-line path'),
        summary: text('¹S₀→³P₁，Γ/2π≈182 kHz，用于窄线 MOT、低温冷却和低损伤成像。', '¹S₀→³P₁, Γ/2π≈182 kHz, for narrow-line MOT, cooling and low-loss imaging.'),
        action: text('扫频找线后联合优化失谐、磁场梯度、强度和偏振。', 'Find resonance by scanning, then co-optimize detuning, field gradient, intensity and polarization.'),
        record: text('原子数、温度、装载时间常数和末端功率。', 'Atom number, temperature, loading constant and delivered power.'),
        boundary: text('窄线对漂移更敏感，必须用原子谱复核锁定参考。', 'The narrow line is drift-sensitive; verify the lock with atomic spectroscopy.'),
        x: 55, y: 53, rx: 19, ry: 4,
      },
      {
        id: 'clock-path', index: '03', label: text('578 nm 钟光链路', '578 nm clock path'),
        summary: text('¹S₀→³P₀ 的天然线宽为 mHz 量级，服务于钟态映射和相干控制。', 'The ¹S₀→³P₀ natural linewidth is at the mHz scale, enabling clock-state mapping and coherence.'),
        action: text('检查超稳腔锁定、相位稳定链路、AOM 波形和磁场环境。', 'Check cavity lock, phase-stabilized delivery, AOM waveform and magnetic environment.'),
        record: text('拍频、Allan 偏差、Ramsey 对比度和失谐漂移。', 'Beat note, Allan deviation, Ramsey contrast and detuning drift.'),
        boundary: text('图中的参考腔曲线是示意，不是本机 Allan 数据。', 'The cavity traces are illustrative, not local Allan data.'),
        x: 55, y: 64, rx: 19, ry: 4,
      },
      {
        id: 'uv-path', index: '04', label: text('约 302 nm UV 交付', 'Approx. 302 nm UV delivery'),
        summary: text('³P₀→nS/nD Rydberg 单光子激发，把局域控制连接到相互作用门。', 'Single-photon ³P₀→nS/nD Rydberg excitation links local control to interaction gates.'),
        action: text('在原子面检查功率、光腰、偏振、指向和脉冲相位瞬态。', 'At the atoms, check power, waist, polarization, pointing and pulse phase transients.'),
        record: text('末端光斑、偏振、原子 Rabi 和站点间均匀性。', 'Delivered beam profile, polarization, atomic Rabi and site uniformity.'),
        boundary: text('原图自动生成的消光比数值已被确定性遮罩；该量必须本机测量。', 'The generated extinction-ratio number is deterministically masked; it requires local measurement.'),
        x: 55, y: 76, rx: 19, ry: 4,
      },
    ],
  },
  {
    id: 'science-cell',
    number: '03',
    title: text('科学腔、高 NA 物镜与光镊焦平面', 'Science cell, high-NA objective and tweezer focal plane'),
    shortTitle: text('科学腔 / 光镊', 'Science cell / tweezers'),
    alt: text('科学腔、高 NA 物镜与光镊教学图版', 'Science cell, high-NA objective and tweezers teaching plate'),
    image: sciencePlate,
    scope: text('文献装置示例 + 本机复标', 'Literature apparatus example + local recalibration'),
    caption: text('NA、阱深、温度和寿命来自一套文献装置。生成图自动添加的 WD 2.0 mm 已遮罩，不能作为器件规格。', 'NA, trap depth, temperature and lifetime come from one literature apparatus. The generated WD 2.0 mm label is masked and must not be treated as a specification.'),
    accent: '#b57a10',
    masks: [
      { id: 'objective-wd', left: 42.1, top: 21.7, width: 5.7, height: 3.3, background: '#101923' },
    ],
    hotspots: [
      {
        id: 'objective', index: '01', label: text('高 NA 物镜', 'High-NA objective'),
        summary: text('同一物镜投影光镊并收集单原子荧光；文献装置示例 NA=0.6。', 'One objective projects tweezers and collects fluorescence; literature example NA=0.6.'),
        action: text('标定 PSF、放大率、畸变、焦面漂移与视场均匀性。', 'Calibrate PSF, magnification, distortion, focus drift and field uniformity.'),
        record: text('PSF 图、像素—物平面映射和焦点随时间的漂移。', 'PSF images, pixel-to-object mapping and focus drift over time.'),
        boundary: text('工作距离未被来源锁定，原图中的自动数值已遮罩。', 'Working distance was not source-locked; the generated value is masked.'),
        x: 47, y: 22, rx: 7, ry: 12,
      },
      {
        id: 'tweezers', index: '02', label: text('光镊阵列与势阱', 'Tweezer array and potential'),
        summary: text('光强和极化率决定 U(r)；文献示例 0.76 mW 对应阱深 58 μK。', 'Intensity and polarizability set U(r); a literature example uses 0.76 mW for 58 μK depth.'),
        action: text('逐站点测光移、径向/轴向阱频、装载率和生存率。', 'Measure light shift, radial/axial frequencies, loading and survival site by site.'),
        record: text('阱频谱、释放—再捕获温度和站点均匀性。', 'Trap-frequency spectra, release-recapture temperature and site uniformity.'),
        boundary: text('功率—阱深换算依赖波长、光腰与极化率，必须本机复标。', 'Power-to-depth conversion depends on wavelength, waist and polarizability and needs local calibration.'),
        x: 53, y: 48, rx: 12, ry: 9,
      },
      {
        id: 'field', index: '03', label: text('偏置磁场与温度', 'Bias field and temperature'),
        summary: text('偏置场定义量子化轴；文献示例温度 T=2.94 μK。', 'The bias field defines the quantization axis; literature example T=2.94 μK.'),
        action: text('用塞曼谱和 Ramsey 数据复核方向、幅值、梯度与噪声。', 'Use Zeeman and Ramsey data to verify direction, magnitude, gradient and noise.'),
        record: text('线圈电流、塞曼分裂、温度、Ramsey 对比度和生存率。', 'Coil current, Zeeman splitting, temperature, Ramsey contrast and survival.'),
        boundary: text('温度需与阱深和 Rydberg Doppler 相位同时解释。', 'Temperature must be interpreted with trap depth and Rydberg Doppler phase.'),
        x: 37, y: 57, rx: 8, ry: 11,
      },
      {
        id: 'imaging-plane', index: '04', label: text('成像焦平面', 'Imaging focal plane'),
        summary: text('亮点表示占据，空位可能来自未装载、损失或判别错误。', 'Bright sites indicate occupancy; holes can be loading failure, loss or classification error.'),
        action: text('建立像素坐标到原子坐标的映射，并保存背景和 PSF 模板。', 'Build pixel-to-atom mapping and retain background and PSF templates.'),
        record: text('阵列原始帧、站点编号、背景分布和成像生存率。', 'Raw array frames, site IDs, background distributions and imaging survival.'),
        boundary: text('³P₀ 寿命 2.96(12) s 与自旋翻转 23(14) s 是文献示例。', '³P₀ lifetime 2.96(12) s and spin-flip time 23(14) s are literature examples.'),
        x: 84, y: 70, rx: 11, ry: 12,
      },
    ],
  },
  {
    id: 'imaging',
    number: '04',
    title: text('单原子成像与阵列重排', 'Single-atom imaging and rearrangement'),
    shortTitle: text('成像 / 重排', 'Imaging / rearrangement'),
    alt: text('单原子成像与阵列重排教学图版', 'Single-atom imaging and rearrangement teaching plate'),
    image: imagingPlate,
    scope: text('文献装置示例 + 数据流程', 'Literature apparatus example + data pipeline'),
    caption: text('20 μs / 0.986 与 4×10⁻⁴ 是文献装置示例；阈值、混淆矩阵和搬运成功率必须用本机数据重建。', '20 μs / 0.986 and 4×10⁻⁴ are literature examples; threshold, confusion matrix and move yield require local data.'),
    accent: '#2d7a57',
    masks: [
      { id: 'objective-wd', left: 16.8, top: 11.6, width: 5.6, height: 3.1, background: '#111922' },
    ],
    hotspots: [
      {
        id: 'collection', index: '01', label: text('荧光采集与光子统计', 'Fluorescence collection and photon statistics'),
        summary: text('物镜、滤光和相机把站点荧光转换为 ROI 光子计数。', 'Objective, filtering and camera convert site fluorescence into ROI photon counts.'),
        action: text('同时采集亮态、空阱、背景和重复成像数据。', 'Acquire bright, empty, background and repeated-imaging data together.'),
        record: text('原始帧、曝光、增益、背景、PSF 和光子直方图。', 'Raw frames, exposure, gain, background, PSF and photon histograms.'),
        boundary: text('399 nm 20 μs / 0.986 与 556 nm 假阳性 4×10⁻⁴ 为文献示例。', '399 nm 20 μs / 0.986 and 556 nm false-positive 4×10⁻⁴ are literature examples.'),
        x: 17, y: 39, rx: 9, ry: 20,
      },
      {
        id: 'classification', index: '02', label: text('占据判别', 'Occupancy classification'),
        summary: text('站点计数与阈值比较得到占据位图，阈值由两类分布和代价决定。', 'Site counts compared with a threshold yield occupancy; class distributions and costs set the threshold.'),
        action: text('冻结 ROI、背景模型和阈值，再处理正式数据。', 'Freeze ROIs, background model and threshold before processing production data.'),
        record: text('TP、TN、FP、FN 与完整混淆矩阵。', 'TP, TN, FP, FN and the full confusion matrix.'),
        boundary: text('图中分布形状为示意；不得读取其轴值作为实验数据。', 'Histogram shapes are illustrative; do not read axis values as experiment data.'),
        x: 45, y: 52, rx: 6, ry: 22,
      },
      {
        id: 'rearrangement', index: '03', label: text('路径规划与搬运', 'Path planning and transport'),
        summary: text('占据位图与目标位图生成不交叉、距离短且可并行的移动集合。', 'Occupancy and target maps produce noncrossing, short and parallelizable moves.'),
        action: text('用平滑加速度波形搬运，随后立即复核成像。', 'Transport with smooth acceleration waveforms and image immediately afterward.'),
        record: text('F_init、P_move、F_final、路径长度和搬运损失分类。', 'F_init, P_move, F_final, path length and classified transport loss.'),
        boundary: text('三幅阵列必须共享坐标和守恒的原子数。', 'All array panels must share coordinates and conserve atom count.'),
        x: 59, y: 52, rx: 7, ry: 22,
      },
      {
        id: 'control', index: '04', label: text('AOD / SLM 与反馈时序', 'AOD / SLM and feedback timing'),
        summary: text('SLM 定义静态阵列，AOD 快速移动；AWG/FPGA 同步曝光、计算和波形。', 'SLM defines static arrays, AOD moves quickly, and AWG/FPGA synchronize exposure, compute and waveforms.'),
        action: text('标定 RF 频率到原子坐标，并分别测数据传输、判别、规划和执行延迟。', 'Calibrate RF frequency to atom position and time transfer, classification, planning and execution separately.'),
        record: text('映射残差、串扰、每阶段延迟和复核帧。', 'Mapping residuals, crosstalk, per-stage latency and verification frames.'),
        boundary: text('生成图中的物镜工作距离已遮罩；仅 NA=0.6 有来源锁定。', 'The generated objective working distance is masked; only NA=0.6 is source-locked.'),
        x: 87, y: 38, rx: 10, ry: 23,
      },
    ],
  },
  {
    id: 'rydberg-uv',
    number: '05',
    title: text('302 nm Rydberg 光：生成、整形、交付与测量', '302 nm Rydberg generation, shaping, delivery and measurement'),
    shortTitle: text('Rydberg UV', 'Rydberg UV'),
    alt: text('302 nm Rydberg 光生成与交付教学图版', '302 nm Rydberg generation and delivery teaching plate'),
    image: rydbergPlate,
    scope: text('文献装置示例 + 原子端复核', 'Literature apparatus example + atom-plane verification'),
    caption: text(
      '980/1565/604/302 nm 功率、光纤长度、光腰和 330 ns π 脉冲来自一套文献装置示例。射频波形不能替代 UV 端 A(t)、φ(t) 与原子 Rabi/阻塞数据。',
      'The 980/1565/604/302 nm powers, fiber length, waist and 330 ns π pulse are examples from one reported apparatus. RF waveforms cannot replace delivered-UV A(t), φ(t), or atomic Rabi/blockade data.',
    ),
    accent: '#7139a7',
    masks: [
      {
        id: 'uv-fiber-term', left: 77.5, top: 12.3, width: 11.3, height: 3.5,
        background: '#fff', color: '#101c31', text: '使用抗光致暗化 UV 光纤', fontSize: 'clamp(8px, .85vw, 12px)',
      },
    ],
    hotspots: [
      {
        id: 'nonlinear-generation', index: '01', label: text('和频与谐振倍频', 'Sum-frequency generation and resonant doubling'),
        summary: text('980 nm 与 1565 nm 在 PPLN 中和频产生 604 nm，再经谐振倍频得到 302 nm。', '980 nm and 1565 nm are sum-frequency mixed in PPLN to 604 nm, then resonantly doubled to 302 nm.'),
        action: text('稳定晶体温度、两束空间重合、偏振、腔锁与耦合模式。', 'Stabilize crystal temperature, spatial overlap, polarization, cavity lock and coupling mode.'),
        record: text('输入/604/302 nm 功率、转换效率、腔锁误差、晶体温度与 UV 输出漂移。', 'Input/604/302 nm powers, conversion efficiency, cavity error, crystal temperature and UV drift.'),
        boundary: text('图中 40 mm PPLN 与各级功率是文献装置示例，不是通用规格。', 'The 40 mm PPLN and stage powers are apparatus examples, not universal specifications.'),
        x: 16, y: 28, rx: 14, ry: 17,
      },
      {
        id: 'pulse-diagnostics', index: '02', label: text('UV 脉冲异频诊断', 'Heterodyne UV-pulse diagnostics'),
        summary: text('回传光与未调制参考拍频，解调得到幅度 A(t)、相位 φ(t) 与瞬时频率 Δf(t)。', 'Returned light beats with an unmodulated reference to recover amplitude A(t), phase φ(t) and instantaneous frequency Δf(t).'),
        action: text('先标定探测器带宽和参考支路，再迭代预失真补偿脉冲沿相位瞬态。', 'Calibrate detector bandwidth and reference arm, then iteratively pre-distort edge-induced phase transients.'),
        record: text('原始拍频、A(t)、展开相位 φ(t)、Δf(t)=(2π)⁻¹dφ/dt 与 AOM 驱动余量。', 'Raw beat, A(t), unwrapped φ(t), Δf(t)=(2π)⁻¹dφ/dt and AOM actuator margin.'),
        boundary: text('RF 包络不等于实际 UV 包络；必须保留探测链传递函数和不确定度。', 'The RF envelope is not the delivered UV envelope; retain detector-chain transfer function and uncertainty.'),
        x: 41, y: 62, rx: 12, ry: 25,
      },
      {
        id: 'uv-delivery', index: '03', label: text('功率稳定、门脉冲与 UV 交付', 'Power stabilization, gating and UV delivery'),
        summary: text('AOM1 承担慢/快功率反馈，AOM2 生成门脉冲；抗光致暗化光纤把 UV 送到科学腔。', 'AOM1 closes slow/fast power loops, AOM2 gates pulses, and solarization-resistant fiber delivers UV to the science cell.'),
        action: text('分别测 AOM1 环路带宽、AOM2 消光与相位瞬态、光纤耦合和末端光斑。', 'Measure AOM1 loop bandwidth, AOM2 extinction/phase transient, fiber coupling and delivered spot separately.'),
        record: text('设定值、PD1 误差、AOM 余量、源端/末端功率、耦合效率、偏振和指向。', 'Setpoint, PD1 error, AOM margin, source/delivered power, coupling, polarization and pointing.'),
        boundary: text('网页修正了图中的 UV 光纤术语；约 6 mW 与 <30 cm 仍是文献示例。', 'The webpage corrects the UV-fiber terminology; about 6 mW and <30 cm remain literature examples.'),
        x: 70, y: 29, rx: 20, ry: 16,
      },
      {
        id: 'atom-plane-review', index: '04', label: text('原子面聚焦与光学复核', 'Atom-plane focusing and optical review'),
        summary: text('原子面光腰、偏振、指向和脉冲相位共同决定 Rabi 频率、阻塞与门相位。', 'Atom-plane waist, polarization, pointing and pulse phase jointly set Rabi rate, blockade and gate phase.'),
        action: text('先测光斑和偏振，再用原子 Rabi、阻塞谱和门数据复核整个交付链。', 'Measure spot and polarization, then validate the delivery chain with atomic Rabi, blockade spectra and gate data.'),
        record: text('w₀、三轴电动位移、站点 Rabi、阻塞位移、门误差和每-shot 配置。', 'w₀, three-axis stage position, site-resolved Rabi, blockade shift, gate error and per-shot configuration.'),
        boundary: text('w₀=10 μm 与 330 ns π 脉冲是文献示例；最终以本机原子响应为准。', 'w₀=10 μm and a 330 ns π pulse are literature examples; local atomic response is decisive.'),
        x: 88, y: 62, rx: 10, ry: 25,
      },
    ],
  },
  {
    id: 'control-data',
    number: '06',
    title: text('时钟、波形与实时数据链', 'Clock, waveform and real-time data chain'),
    shortTitle: text('时钟 / 数据链', 'Timing / data'),
    alt: text('中性原子时钟与实时数据链教学图版', 'Neutral-atom timing and real-time data-chain teaching plate'),
    image: controlPlate,
    aspectRatio: '1254 / 1254',
    scope: text('时序架构示意 + 每-shot 数据契约', 'Timing architecture + per-shot data contract'),
    caption: text(
      '330 ns、20 μs 和 2.0 ms 是文献装置中的不同操作尺度，不构成通用固定序列。图中示波器 CH1–CH4 是独立接线示意，颜色不与左侧 01–07 层级对应。',
      '330 ns, 20 μs and 2.0 ms are distinct operation scales from reported apparatus, not a universal fixed sequence. Oscilloscope CH1–CH4 are an independent wiring example; colors do not map to layers 01–07.',
    ),
    accent: '#2b6ea6',
    hotspots: [
      {
        id: 'master-clock', index: '01', label: text('公共参考时钟与时间基准', 'Master clock and common timebase'),
        summary: text('全系统选择一个 10 MHz 或 100 MHz 主参考，使 FPGA、AWG、DDS、相机和计时器共享频率基准。', 'Choose one 10 MHz or 100 MHz master so FPGA, AWG, DDS, cameras and timers share a frequency reference.'),
        action: text('测量每台设备的锁定状态、失锁时间、参考输入与长期相位连续性。', 'Measure lock state, unlock intervals, reference inputs and long-term phase continuity for every device.'),
        record: text('参考源 ID、锁定状态、失锁位、触发时间戳、设备时钟域与同步版本。', 'Reference ID, lock state, unlock flag, trigger timestamp, device clock domain and sync version.'),
        boundary: text('10 MHz 与 100 MHz 二选一作为主参考，不应让设备自由运行后再离线对齐。', 'Use either 10 MHz or 100 MHz as master; do not free-run devices and align them only offline.'),
        x: 20, y: 13, rx: 18, ry: 9,
      },
      {
        id: 'trigger-rf', index: '02', label: text('FPGA、AWG/DDS 与 RF 执行链', 'FPGA, AWG/DDS and RF actuation chain'),
        summary: text('FPGA 扇出确定性 TTL；AWG/DDS 合成幅度、频率和相位；放大与匹配决定执行器端波形。', 'FPGA fans out deterministic TTL; AWG/DDS synthesize amplitude, frequency and phase; amplification/matching set the actuator waveform.'),
        action: text('在数字出口、RF 源、定向耦合器和执行器入口逐级测延迟与波形。', 'Measure delay and waveform at digital output, RF source, directional coupler and actuator input.'),
        record: text('Δt、RMS 抖动、最大偏差、波形版本、正/反向功率、压缩、过冲和热漂。', 'Δt, RMS jitter, max deviation, waveform version, forward/reflected power, compression, overshoot and thermal drift.'),
        boundary: text('数字指令或 RF 监测不能替代 UV、线圈、电极或原子端实际响应。', 'Digital commands or RF monitors cannot replace actual UV, coil, electrode or atomic response.'),
        x: 21, y: 38, rx: 20, ry: 19,
      },
      {
        id: 'acquisition-feedback', index: '03', label: text('采集、判别与实时反馈', 'Acquisition, classification and real-time feedback'),
        summary: text('相机帧进入 ROI 计数与占据判别，结果触发重排或 QEC 指令并返回控制端。', 'Camera frames feed ROI counting and occupancy classification, whose result triggers rearrangement or QEC commands.'),
        action: text('分别测曝光、传输、判别、决策和控制输出延迟，并保存异常路径。', 'Measure exposure, transfer, classification, decision and control-output latency separately and retain exception paths.'),
        record: text('原始帧、帧号、shot ID、时间戳、占据位图、置信度、指令和端到端延迟。', 'Raw frame, frame ID, shot ID, timestamp, occupancy map, confidence, command and end-to-end latency.'),
        boundary: text('示意监视器不是性能指标；反馈延迟必须由本机测量。', 'The illustrative monitor is not a performance metric; feedback latency requires local measurement.'),
        x: 21, y: 68, rx: 20, ry: 15,
      },
      {
        id: 'shot-contract', index: '04', label: text('每-shot 数据契约', 'Per-shot data contract'),
        summary: text('可复现实验至少绑定配置哈希、波形版本、锁定状态、相机帧号、触发时间戳和异常位。', 'A reproducible shot binds config hash, waveform version, lock state, frame ID, trigger timestamp and exception flags.'),
        action: text('采集开始前冻结 schema；运行中只追加不可变记录，不覆盖历史配置。', 'Freeze the schema before acquisition; append immutable records during runs rather than overwrite history.'),
        record: text('shot ID、frame ID、设备状态快照、标定版本、反馈输出和数据完整性校验。', 'Shot ID, frame ID, device snapshot, calibration version, feedback output and data-integrity check.'),
        boundary: text('CH1–CH4 接线是独立示意，必须随设备和线缆变更维护本机通道表。', 'CH1–CH4 are an independent example; maintain a local channel map with device and cable changes.'),
        x: 50, y: 93, rx: 47, ry: 5,
      },
    ],
  },
  {
    id: 'readiness',
    number: '07',
    title: text('中性镱实验：开机校准与数据放行', 'Neutral-Yb experiment startup calibration and data release'),
    shortTitle: text('校准 / 放行', 'Calibration / release'),
    alt: text('中性镱实验开机校准与数据放行教学图版', 'Neutral-Yb startup calibration and data release teaching plate'),
    image: readinessPlate,
    scope: text('操作框架 + 示意数据', 'Operational framework + illustrative data'),
    caption: text('图中曲线形状和轴值是示意；放行规则应从本机稳定基线建立，并绑定配置版本。', 'Curve shapes and axis values are illustrative; release rules must come from a stable local baseline and versioned configuration.'),
    accent: '#14609b',
    hotspots: [
      {
        id: 'vacuum-laser', index: '01', label: text('真空与激光末端', 'Vacuum and delivered laser checks'),
        summary: text('开机先确认压力/RGA，再检查拍频、锁误差、原子面功率、光斑和偏振。', 'Start with pressure/RGA, then beat notes, lock error, delivered power, beam profile and polarization.'),
        action: text('按“参考源→传输损耗→原子谱”顺序定位激光异常。', 'Diagnose laser issues in the order reference, delivery loss, then atomic spectrum.'),
        record: text('压力趋势、RGA、P源端/P末端、光斑图和拍频。', 'Pressure trend, RGA, source/delivered power, beam images and beat notes.'),
        boundary: text('图中 RGA 与光谱曲线是数据类型示例。', 'RGA and spectral curves illustrate data types.'),
        x: 17, y: 31, rx: 16, ry: 20,
      },
      {
        id: 'mot-imaging', index: '02', label: text('MOT、成像与重排', 'MOT, imaging and rearrangement'),
        summary: text('MOT 扫描给出装载窗口；亮/空分布和物平面映射决定成像与重排是否可用。', 'MOT scans define loading windows; class distributions and mapping determine imaging/rearrangement readiness.'),
        action: text('先扫描 399/556 参数，再冻结阈值与映射，最后运行搬运复核。', 'Scan 399/556 settings, freeze threshold and mapping, then verify transport.'),
        record: text('原子数、温度、FP/FN、成像生存率、F_init、P_move、F_final。', 'Atom number, temperature, FP/FN, imaging survival, F_init, P_move and F_final.'),
        boundary: text('控制区间来自本机历史，不从示意图读取。', 'Control ranges come from local history, not this illustration.'),
        x: 66, y: 31, rx: 17, ry: 20,
      },
      {
        id: 'atomic-reference', index: '03', label: text('原子基准', 'Atomic benchmarks'),
        summary: text('Rabi、Ramsey 和寿命把光场、磁场、相位噪声和损失投影为原子响应。', 'Rabi, Ramsey and lifetime map optical, magnetic, phase and loss errors to atomic response.'),
        action: text('门实验前先通过单原子、单比特和成像基准。', 'Pass single-atom, single-qubit and imaging benchmarks before gate runs.'),
        record: text('Rabi 频率/对比度/π 时间、Ramsey 失谐/T₂*、寿命与损失分类。', 'Rabi frequency/contrast/π time, Ramsey detuning/T₂*, lifetime and classified loss.'),
        boundary: text('图中拟合曲线仅说明应保存的分析结果。', 'The fitted curves only illustrate analyses to retain.'),
        x: 84, y: 31, rx: 9, ry: 20,
      },
      {
        id: 'release', index: '04', label: text('放行逻辑与配置绑定', 'Release logic and configuration binding'),
        summary: text('每个量与稳定基线比较，超限复测，仍超限则隔离子系统。', 'Compare each metric with a stable baseline; retest excursions and isolate persistent failures.'),
        action: text('建议以最近 7 d 的 median±3σ 为起点，再按误报/漏报代价调整。', 'Start with a recent 7-day median±3σ and tune for false-release and false-block costs.'),
        record: text('时间戳、配置哈希、标定版本、异常记录和正式数据集 ID。', 'Timestamp, config hash, calibration version, exceptions and production dataset ID.'),
        boundary: text('不得边调参边并入正式数据集。', 'Do not tune parameters while appending to the production dataset.'),
        x: 93, y: 25, rx: 6, ry: 17,
      },
    ],
  },
  {
    id: 'module',
    number: '08',
    title: text('可扩展科学模块：接口、维护与一致性验收', 'Scalable science modules: interfaces, service and consistency'),
    shortTitle: text('模块化工程', 'Modular engineering'),
    alt: text('可扩展中性镱科学模块教学图版', 'Scalable neutral-Yb science-module teaching plate'),
    image: modulePlate,
    scope: text('工程接口模板', 'Engineering interface template'),
    caption: text('底部空表是记录模板，不是缺失数据；网站中的热点笔记用于补充本项目的接口和模块 A/B 验收结果。', 'The blank table is a record template, not missing evidence; hotspot notes capture project-specific interface and module A/B results.'),
    accent: '#264f78',
    hotspots: [
      {
        id: 'science-module', index: '01', label: text('科学模块 A / B', 'Science modules A / B'),
        summary: text('每个模块集成科学腔、物镜、线圈、光束投送、相机和本地服务。', 'Each module integrates chamber, objective, coils, delivery, cameras and local services.'),
        action: text('先验收接口，再运行原子基准，最后比较模块 A/B。', 'Accept interfaces first, run atomic benchmarks second, compare A/B last.'),
        record: text('接口版本、校准版本、重新对准量、恢复时间和放行数据集。', 'Interface/calibration versions, realignment, recovery time and released dataset.'),
        boundary: text('两模块需使用同一序列、分析和时间基准。', 'Both modules need the same sequence, analysis and timebase.'),
        x: 53, y: 43, rx: 24, ry: 22,
      },
      {
        id: 'optical-vacuum', index: '02', label: text('光学与真空接口', 'Optical and vacuum interfaces'),
        summary: text('光学接口记录输入/原子面参数；真空接口提供隔离、计量和独立泵支路。', 'Optical interfaces record input/atom-plane parameters; vacuum interfaces provide isolation, metrology and pumping.'),
        action: text('更换后重测功率、光腰、偏振、Rabi、压升率和背景寿命。', 'After replacement, remeasure power, waist, polarization, Rabi, rise rate and background lifetime.'),
        record: text('P_in、P_atom、w₀、损耗、P_base、隔离压升率和恢复时间。', 'P_in, P_atom, w₀, loss, P_base, isolated rise rate and recovery time.'),
        boundary: text('参考面不能代替原子面；单模块维护不得暴露其他模块。', 'A reference plane cannot replace the atom plane; servicing one module must not expose another.'),
        x: 14, y: 48, rx: 10, ry: 27,
      },
      {
        id: 'timing-environment', index: '03', label: text('时钟、热、振动与磁环境', 'Timing, thermal, vibration and magnetic environment'),
        summary: text('共享参考统一时基；热、振动和磁环境决定慢漂移和模块差异。', 'A shared reference unifies timing; thermal, vibration and magnetic environments drive drift and module differences.'),
        action: text('在模块入口和执行器端测时序，并记录温度、振动 PSD、磁漂和线圈温升。', 'Measure timing at module input and actuator; log temperature, vibration PSD, field drift and coil heating.'),
        record: text('触发偏差、RMS 抖动、线缆延迟、温漂、振动 PSD 与磁场漂移。', 'Trigger skew, RMS jitter, cable delay, thermal drift, vibration PSD and field drift.'),
        boundary: text('10 MHz 或 100 MHz 只能选一个全系统主参考。', 'Choose one system-wide master reference: 10 MHz or 100 MHz.'),
        x: 91, y: 48, rx: 8, ry: 27,
      },
      {
        id: 'consistency', index: '04', label: text('一致性验收矩阵', 'Consistency acceptance matrix'),
        summary: text('用同一协议比较模块的装载、阱、温度、成像、相干和门误差。', 'Use one protocol to compare loading, traps, temperature, imaging, coherence and gate errors.'),
        action: text('差异超项目预算时，按光学、真空、时序、环境四类接口归因。', 'When differences exceed budget, assign them to optical, vacuum, timing or environment interfaces.'),
        record: text('MOT 装载率、阱频、温度、混淆矩阵、Rabi/Ramsey、寿命和门误差分解。', 'MOT loading, trap frequency, temperature, confusion matrix, Rabi/Ramsey, lifetime and gate-error decomposition.'),
        boundary: text('空白单元由项目数据填写；不得由生成图虚构数值。', 'Blank cells are filled with project data; generated images must not invent values.'),
        x: 52, y: 85, rx: 31, ry: 10,
      },
    ],
  },
]
