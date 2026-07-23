import type { Language } from '../../types/content'

export type Localized = Record<Language, string>

export type CycleStage = {
  id: string
  title: Localized
  short: Localized
  generic: Localized
  implementation: Localized
  lanes: string[]
}

export const cycleStages: CycleStage[] = [
  {
    id: 'supply', title: { zh: '储备区持续供给', en: 'Continuous reservoir supply' }, short: { zh: '供给', en: 'Supply' },
    generic: { zh: '储备区供给与计算阵列不是同一束光、同一空间或同一节拍。只有将冷却和成像光的散射、背景与空间串扰限制在储备/移动阵列，才可在静态计算阵列上并行保留相干控制。', en: 'Reservoir supply and computation must not share the same optical field, spatial region, or timing domain. Coherent control can run in parallel only when cooling and imaging scattering, background, and spatial crosstalk are confined to the reservoir or mobile array.' },
    implementation: { zh: 'Li et al. 用 1D molasses 维持邻近储备区。成像期间关闭 molasses；局域 556 nm 制备光不穿过储备区。该安排是空间隔离与时间占空的联合条件，不是单纯“持续开灯”。', en: 'Li et al. maintain a nearby reservoir with 1D molasses, switch it off during imaging, and route the localized 556 nm preparation beam away from the reservoir. This is a joint spatial-isolation and timing condition, not simply continuous illumination.' },
    lanes: ['molasses', 'mobile-tweezer'],
  },
  {
    id: 'load', title: { zh: '装载与单原子筛选', en: 'Loading and single-atom selection' }, short: { zh: '装载', en: 'Load' },
    generic: { zh: '移动光镊从储备区抓取原子；碰撞筛选、占据成像和冷却将随机填充转换为已知的单原子站点。', en: 'Mobile tweezers extract atoms from the reservoir; collision filtering, occupancy imaging, and cooling turn stochastic filling into known single-atom sites.' },
    implementation: { zh: 'Li et al. 的调度装载驻留时间为 2 ms，而从装载曲线拟合得到的时间常数为 τload = 0.84 ms；二者分别回答“序列留出多久”和“装载动力学多快”，不能混写。随后依次执行 6 ms 光辅助碰撞、4 ms 占据识别成像和 6 ms 冷却至约 10 µK。', en: 'In Li et al., the scheduled loading dwell is 2 ms, while the fitted loading time constant is 0.84 ms. These answer different questions: how long the sequence allocates and how fast loading approaches saturation. The sequence then applies 6 ms of LAC, a 4 ms occupancy image, and 6 ms of cooling to about 10 µK.' },
    lanes: ['molasses', 'mobile-tweezer', 'local-556', 'camera'],
  },
  {
    id: 'handoff', title: { zh: '运输与阵列交接', en: 'Transport and array handoff' }, short: { zh: '交接', en: 'Handoff' },
    generic: { zh: '移动光镊将原子送入计算区并与静态阵列交接。运输损失、运动激发和交接后的站点映射必须进入下一轮控制记录。', en: 'Mobile tweezers deliver atoms to the compute zone and hand them to a stationary array. Transport loss, motional excitation, and post-handoff site mapping enter the next control record.' },
    implementation: { zh: 'Li et al. 的序列把一次移动段安排为 0.5 ms，并用移动光镊完成装载区、准备区和计算区之间的转运。图中的 0.5 ms 是该装置的调度值，不是所有阵列几何的普适下限；关键结构是移动阵列补原子与静态阵列计算可以并行。', en: 'Li et al. schedule an individual transport segment as 0.5 ms and use mobile tweezers to connect loading, preparation, and compute zones. The 0.5 ms value belongs to that apparatus rather than setting a universal lower bound; the transferable structure is that mobile-array replenishment can proceed in parallel with stationary-array computation.' },
    lanes: ['mobile-tweezer', 'stationary-tweezer', 'controller'],
  },
  {
    id: 'compute', title: { zh: '制备与相干计算', en: 'Preparation and coherent computation' }, short: { zh: '计算', en: 'Compute' },
    generic: { zh: '单比特原语取决于编码流形：¹S₀ 基态核自旋可由经 ³P₁ 虚激发的 556 nm Raman 光逐位点旋转；³P₀ 亚稳态核自旋可由全局 RF 旋转，并用局域相位合成逐位点门。两比特门把选定的 ³P₀ 计算态经 302 nm 耦合到 Rydberg 态并利用阻塞产生条件相位；读出用的 649+770 nm Raman 是态选择映射，不是计算门。', en: 'The one-qubit primitive depends on the encoding manifold: ¹S₀ ground-manifold nuclear spins support site-resolved 556 nm Raman rotations through virtual ³P₁ excitation, whereas ³P₀ metastable nuclear spins support global RF rotations combined with local phases for site-resolved gates. A two-qubit gate couples a selected ³P₀ computational state to a Rydberg state at 302 nm and uses blockade for a conditional phase. The 649+770 nm readout Raman path is a state-selective mapping, not a computational gate.' },
    implementation: { zh: 'Li et al. 将制备拆成两个不同的关阱光学阶段：全局 σ+ 556 nm 光抽运先把基态核自旋极化到 ¹S₀, mF=+1/2；局域 556 nm 与 1539 nm 随后经 5d6s ³D₁ 把选中站点泵入 ³P₀。两阶段分别占用 900 ns 关阱窗口，各循环 50 次，总制备时间为 0.7 ms。RF 与 302 nm 门时间属于独立标定尺度，不用于拉伸这条替换时序。', en: 'Li et al. split preparation into two optical stages: global σ+ 556 nm optical pumping first polarizes the ground-state nuclear spin into ¹S₀, mF=+1/2; local 556 + 1539 nm Raman pumping then transfers selected sites through 5d6s ³D₁ into ³P₀. The two stages occupy distinct 900 ns trap-off windows and each repeats 50 times, giving 0.7 ms total preparation. RF and 302 nm gate times are independently calibrated scales and do not stretch this replacement timeline.' },
    lanes: ['stationary-tweezer', 'prep-light', 'coherent-control', 'rydberg-uv'],
  },
  {
    id: 'readout', title: { zh: '状态选择读出、反馈与补原子', en: 'State-selective readout and feedback' }, short: { zh: '读出', en: 'Readout' },
    generic: { zh: '读出链应被理解为“态选择映射 → 可成像态 → 结果记录”，而非一次荧光曝光。记录必须附带站点、周期与结果类别，供分类器、解码器和补原子调度共同使用。', en: 'Readout is a state-selective mapping, an imageable-state conversion, and an outcome record, not a single fluorescence exposure. The record must retain site, cycle, and outcome class for the classifier, decoder, and replacement scheduler.' },
    implementation: { zh: 'Li et al. 用同时到达的 649 nm 与 770 nm π 偏振光，经失谐约 12 GHz 的 6s7s ³S₁ 中间态，把指定的 ³P₀ 核自旋态相干映射到 ³P₂；单次 Raman 脉冲为 400 ns，并重复 8 次。497 nm 随后经 6s6d ³D₂ 将 ³P₂ 去泵回可成像的 ¹S₀。对 |0⟩、|1⟩ 各执行一次约 15 µs 的映射—去泵浦块并分别成像 4 ms；亮/暗、暗/亮和暗/暗依次判为 |0⟩、|1⟩ 和原子损失。', en: 'Li et al. use simultaneous π-polarized 649 and 770 nm fields, detuned by about 12 GHz from the 6s7s ³S₁ intermediate state, to coherently map one selected ³P₀ nuclear-spin state into ³P₂. Each simultaneous 649 and 770 nm Raman pulse lasts 400 ns and is repeated eight times; 497 nm performs the subsequent depumping through 6s6d ³D₂ into imageable ¹S₀. A roughly 15 µs map-and-depump block and a 4 ms image are applied first to |0⟩ and then to |1⟩; bright/dark, dark/bright, and dark/dark classify |0⟩, |1⟩, and atom loss.' },
    lanes: ['stationary-tweezer', 'readout-map', 'local-556', 'camera', 'controller'],
  },
]
