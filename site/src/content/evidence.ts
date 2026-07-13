import type { EvidenceEntry } from '../types/content'

export const evidenceEntries: EvidenceEntry[] = [
  {
    id: 'yb171-nuclear-spin',
    label: { zh: '171Yb 核自旋', en: '171Yb nuclear spin' },
    domain: 'atomic', value: '1/2', status: 'confirmed',
    note: { zh: '费米同位素，形成两个核自旋投影。', en: 'Fermionic isotope with two nuclear-spin projections.' },
    source: { citation: 'Jenkins et al., Ytterbium Nuclear-Spin Qubits in an Optical Tweezer Array (2022)', url: 'https://doi.org/10.1103/PRXQuantum.3.020315' },
  },
  {
    id: 'line-399',
    label: { zh: '1S0–1P1 成像跃迁', en: '1S0–1P1 imaging transition' },
    domain: 'atomic', value: 398.9, unit: 'nm', status: 'confirmed',
    note: { zh: '强跃迁，用于一级冷却、俘获与荧光成像。', en: 'Strong transition used for first-stage cooling, capture and fluorescence imaging.' },
    source: { citation: 'NIST Atomic Spectra Database, Yb I', url: 'https://physics.nist.gov/PhysRefData/ASD/lines_form.html' },
  },
  {
    id: 'line-556',
    label: { zh: '1S0–3P1 窄线跃迁', en: '1S0–3P1 narrow transition' },
    domain: 'atomic', value: 555.8, unit: 'nm', status: 'confirmed',
    note: { zh: '用于窄线冷却、再泵浦链路与低损伤成像。', en: 'Supports narrow-line cooling, repumping pathways and low-damage imaging.' },
    source: { citation: 'Burgers et al., Narrow-Line Cooling and Imaging of Ytterbium Atoms in an Optical Tweezer Array (2018)', url: 'https://arxiv.org/abs/1806.04625' },
  },
  {
    id: 'clock-578',
    label: { zh: '1S0–3P0 钟跃迁', en: '1S0–3P0 clock transition' },
    domain: 'atomic', value: 578.4, unit: 'nm', status: 'confirmed',
    note: { zh: '连接基态与亚稳钟态，支持相干映射和钟态量子比特。', en: 'Connects ground and metastable clock states for coherent mapping and clock-state qubits.' },
    source: { citation: 'Kaufman et al., A tweezer clock with half-minute atomic coherence (2020)', url: 'https://doi.org/10.1126/science.aba6436' },
  },
  {
    id: 'rydberg-302',
    label: { zh: '3P0–Rydberg 单光子激发', en: '3P0–Rydberg single-photon excitation' },
    domain: 'gate', value: 302, unit: 'nm', status: 'confirmed',
    note: { zh: '紫外单光子通道；精确波长随目标 Rydberg 态变化。', en: 'Ultraviolet single-photon channel; exact wavelength depends on the target Rydberg state.' },
    source: { citation: 'Wilson et al., Trapped Arrays of Alkaline Earth Rydberg Atoms in Optical Tweezers (2019)', url: 'https://doi.org/10.1103/PhysRevLett.123.033201' },
  },
  {
    id: 'narrow-linewidth',
    label: { zh: '3P1 自然线宽', en: '3P1 natural linewidth' },
    domain: 'atomic', value: 182, unit: 'kHz', status: 'confirmed',
    note: { zh: '近似常用值，具体同位素与约定需随数据源核验。', en: 'Common approximate value; isotope and convention must remain tied to the source.' },
    source: { citation: 'Burgers et al. (2018), Methods and references', url: 'https://arxiv.org/abs/1806.04625' },
  },
  {
    id: 'gate-duration-ma',
    label: { zh: 'Ma 基准 CZ 时长', en: 'Ma benchmark CZ duration' },
    domain: 'gate', value: 1.2412083612, unit: 'μs', status: 'confirmed_from_official_source_data',
    note: { zh: '来自本地研究流程锁定的官方源数据；不能与 330 ns 单原子 π 脉冲混用。', en: 'Locked from official source data in the local research workflow; it is not the 330 ns single-atom pi-pulse time.' },
    source: { citation: 'Ma et al., High-Fidelity Gates with Mid-Circuit Erasure Conversion (2023)', url: 'https://doi.org/10.1103/PhysRevX.13.041034' },
  },
  {
    id: 'full-interaction-tensor',
    label: { zh: '完整 Vijkl 相互作用张量', en: 'Full Vijkl interaction tensor' },
    domain: 'gate', value: 'not source-locked', status: 'missing',
    note: { zh: '缺失时只能进行教学或灵敏度模型，不能声称 Methods 级复现。', en: 'Without source lock, only teaching or sensitivity models are defensible, not a Methods-level reproduction.' },
    source: { citation: 'Local Methods source-lock register', url: 'https://github.com/' },
  },
]
