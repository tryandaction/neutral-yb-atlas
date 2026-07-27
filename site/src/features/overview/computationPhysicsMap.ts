import type { LocalizedText } from '../../types/content'

export interface PhysicsStage {
  id: string
  number: string
  title: LocalizedText
  formulas: string[]
  meaning: LocalizedText
}

export interface GateMapping {
  id: 'single-qubit' | 'two-qubit'
  title: LocalizedText
  hamiltonian: string
  condition: string
  result: string
  meaning: LocalizedText
}

export interface CorrectionRule {
  label: LocalizedText
  formula: string
  meaning: LocalizedText
}

export interface ReliabilityBudget {
  physicalRate: string
  threshold: string
  prefactor: string
  distance: string
  logicalRate: string
  logicalLocations: string
  taskBudget: string
  scaling: string
  calculation: string
  warning: LocalizedText
}

export const dynamicsStages: PhysicsStage[] = [
  {
    id: 'encode',
    number: '01',
    title: { zh: '编码为物理态', en: 'Encode into physical states' },
    formulas: ['ρ₀=VρₗV†, V†V=Iₗ'],
    meaning: {
      zh: '等距映射 V 把逻辑希尔伯特空间嵌入原子的计算子空间；P=VV† 是码空间投影。',
      en: 'The isometry V embeds the logical Hilbert space into the atomic computational subspace; P=VV† projects onto the code space.',
    },
  },
  {
    id: 'evolve',
    number: '02',
    title: { zh: '控制哈密顿量', en: 'Control the Hamiltonian' },
    formulas: ['iℏ ∂|ψ(t)⟩/∂t=H(t)|ψ(t)⟩', 'U(T)=𝒯 exp[−(i/ℏ)∫₀ᵀH(t)dt]'],
    meaning: {
      zh: '控制波形 uₖ(t) 改变 H(t)=H₀+Σₖuₖ(t)Hₖ；门是该动力学在给定时间内产生的传播子。',
      en: 'Control waveforms uₖ(t) shape H(t)=H₀+Σₖuₖ(t)Hₖ; a gate is the propagator generated over a specified interval.',
    },
  },
  {
    id: 'gate',
    number: '03',
    title: { zh: '投影为逻辑门', en: 'Project to a logical gate' },
    formulas: ['PUP≈eⁱᵠVUₗV†, ‖QUP‖≪1'],
    meaning: {
      zh: 'PUP 检验计算子空间内的目标作用；Q=I−P，QUP 衡量从计算子空间泄漏的振幅。',
      en: 'PUP tests the target action inside the computational subspace; Q=I−P and QUP quantify leakage amplitude.',
    },
  },
  {
    id: 'channel',
    number: '04',
    title: { zh: '通道与测量', en: 'Channel and measurement' },
    formulas: [
      'ρ̇=−(i/ℏ)[H,ρ]+Σₖ(LₖρLₖ†−½{Lₖ†Lₖ,ρ})',
      'p(m)=Tr(Eₘρₜ), ΣₘEₘ=I',
    ],
    meaning: {
      zh: 'Lₖ 把衰减、退相干、泄漏和损失写入量子通道；POVM {Eₘ} 将末态映射为经典随机记录。',
      en: 'The Lₖ operators place decay, dephasing, leakage and loss into the quantum channel; the POVM {Eₘ} maps the final state to a classical random record.',
    },
  },
]

export const gateMappings: GateMapping[] = [
  {
    id: 'single-qubit',
    title: { zh: '单比特：受控二能级动力学', en: 'One qubit: controlled two-level dynamics' },
    hamiltonian: 'H₁q=(ℏ/2)[Ω cosφ X+Ω sinφ Y+ΔZ]',
    condition: "固定轴: [H₁q(t),H₁q(t′)]=0",
    result: 'θ=∫₀ᵀΩeff(t)dt ⇒ U=exp[−iθ n·σ/2]',
    meaning: {
      zh: '驱动幅度、相位和失谐确定旋转轴与角速度。只有固定轴时旋转角才是脉冲面积；一般情形仍须计算时间有序传播子。',
      en: 'Amplitude, phase and detuning set the rotation axis and angular rate. Pulse area gives the angle only for a fixed axis; otherwise the time-ordered propagator is required.',
    },
  },
  {
    id: 'two-qubit',
    title: { zh: '双比特：Rydberg 相互作用产生条件相位', en: 'Two qubits: Rydberg interaction generates conditional phase' },
    hamiltonian: 'H₂q/ℏ=Σᵢ[(Ωᵢ/2)(|rᵢ⟩⟨1ᵢ|+h.c.)−Δᵢnᵣᵢ]+Vᵣᵣnᵣ₁nᵣ₂',
    condition: 'Vᵣᵣ≫Ω: |rr⟩ 被阻塞',
    result: 'φ₁₁−φ₁₀−φ₀₁+φ₀₀=π ⇒ U=CZ',
    meaning: {
      zh: '相互作用项改变双激发支路的能量；闭合演化积累不可分解为单比特相位的 π 条件相位。',
      en: 'The interaction term shifts the doubly excited branch; a closed evolution accumulates a π conditional phase that cannot be reduced to local phases.',
    },
  },
]

export const faultToleranceStages: PhysicsStage[] = [
  {
    id: 'fault-channel',
    number: '01',
    title: { zh: '物理故障通道', en: 'Physical fault channel' },
    formulas: ['ρ↦𝒩cycle(ρ)'],
    meaning: {
      zh: '把控制误差、耗散、泄漏和损失统一为一次纠错周期的电路级量子通道。',
      en: 'Control error, dissipation, leakage and loss form one circuit-level channel for a QEC cycle.',
    },
  },
  {
    id: 'record',
    number: '02',
    title: { zh: '综合征与标记', en: 'Syndromes and flags' },
    formulas: ['sₜ={±1 稳定子结果}, fₜ={泄漏/损失位置}'],
    meaning: {
      zh: '综合征只读取错误对稳定子的反对易关系，不测量被保护的逻辑态；标记补充已知故障位置。',
      en: 'Syndromes read the error commutation pattern with stabilizers without measuring the protected logical state; flags add known fault locations.',
    },
  },
  {
    id: 'decode',
    number: '03',
    title: { zh: '时空译码', en: 'Spatiotemporal decoding' },
    formulas: ['ê=𝒟(s₁:ₜ,f₁:ₜ)'],
    meaning: {
      zh: '译码器依据多轮记录估计一个等价错误链，而不是重建每个微观噪声事件。',
      en: 'The decoder estimates an equivalent error chain from repeated records rather than reconstructing every microscopic event.',
    },
  },
  {
    id: 'recover',
    number: '04',
    title: { zh: '恢复码空间', en: 'Recover the code space' },
    formulas: ['Rê∘𝒩cycle'],
    meaning: {
      zh: '实际错误与恢复操作的乘积若属于稳定子等价类，逻辑信息保持不变；形成非平凡逻辑算符才算逻辑失败。',
      en: 'Logical information is preserved when error times recovery lies in the stabilizer class; a nontrivial logical operator constitutes failure.',
    },
  },
  {
    id: 'logical-channel',
    number: '05',
    title: { zh: '逻辑通道', en: 'Logical channel' },
    formulas: ['𝒩ₗ(ρₗ)=ΣᵣV†R[𝒟(r)]𝓜ᵣ(VρₗV†)V'],
    meaning: {
      zh: 'r=(s₁:ₜ,f₁:ₜ) 是经典记录，𝓜ᵣ 是对应的非归一化测量分支；对全部分支求和后才得到无条件逻辑通道与失败概率 pₗ。',
      en: 'Here r=(s₁:ₜ,f₁:ₜ) is the classical record and 𝓜ᵣ its trace-nonincreasing measurement branch; summing every branch gives the unconditional logical channel and failure probability pₗ.',
    },
  },
]

export const correctionRules: CorrectionRule[] = [
  {
    label: { zh: '可纠错条件', en: 'Correctability condition' },
    formula: 'PEₐ†EᵦP=cₐᵦP',
    meaning: {
      zh: '错误在码空间内不可区分，综合征可以在不读取逻辑信息的条件下区分错误类。',
      en: 'Errors are indistinguishable within the code space while syndromes distinguish their classes without revealing logical information.',
    },
  },
  {
    label: { zh: '统一容量条件', en: 'Unified capacity condition' },
    formula: '2t+s<d',
    meaning: {
      zh: 't 是位置未知的任意错误数，s 是位置已知的擦除数；未知错误还必须与其他候选位置区分，因此消耗两单位码距。',
      en: 't counts arbitrary errors at unknown locations and s counts known-location erasures; an unknown error consumes two units of distance because competing locations must be distinguished.',
    },
  },
  {
    label: { zh: '两个极限', en: 'Two limiting cases' },
    formula: '未知位置错误: ⌊(d−1)/2⌋ ｜ 已知位置擦除: d−1',
    meaning: {
      zh: '令 s=0 得到任意错误容量；令 t=0 得到擦除容量。擦除优势来自已知位置，不来自某一种检测手段。',
      en: 'Setting s=0 gives arbitrary-error capacity; setting t=0 gives erasure capacity. The advantage comes from knowing the location, not from any particular detector.',
    },
  },
]

export const reliabilityBudget: ReliabilityBudget = {
  physicalRate: 'p=10⁻³',
  threshold: 'pₜₕ=10⁻²',
  prefactor: 'A=0.1',
  distance: 'd=17',
  logicalRate: 'pₗ=10⁻¹⁰',
  logicalLocations: 'Gₗ=10⁸',
  taskBudget: 'εₜₐₛₖ=10⁻²',
  scaling: 'pₗ(d)≈A(p/pₜₕ)⁽ᵈ⁺¹⁾ᐟ²',
  calculation: '10⁻³ → d=17 → 10⁻¹⁰',
  warning: {
    zh: '量级算例：假设表面码型缩放、弱相关电路级噪声及固定译码器。平均门不保真度不能直接代入 p；真实码距必须由完整电路级噪声仿真确定。',
    en: 'Order-of-magnitude example: surface-code-like scaling, weakly correlated circuit-level noise and a fixed decoder. Average gate infidelity cannot be substituted directly for p; the required distance must come from a full circuit-level noise simulation.',
  },
}
