import type { Language, LocalizedText } from '../../types/content'
import Equation from '../article/Equation'

interface CausalAtlasProps {
  language: Language
}

interface CausalStage {
  id: string
  number: string
  title: LocalizedText
  equation: string
  physical: LocalizedText
  evidence: LocalizedText
}

const stages: CausalStage[] = [
  {
    id: 'logical-object',
    number: '01',
    title: { zh: '逻辑对象', en: 'Logical object' },
    equation: String.raw`(\rho_L,\,U_L,\,\{E_m\})`,
    physical: { zh: '输入态、目标变换、可区分输出', en: 'Input state, target transformation, distinguishable outputs' },
    evidence: { zh: '正确性判据', en: 'Correctness criterion' },
  },
  {
    id: 'encoding',
    number: '02',
    title: { zh: '编码到原子子空间', en: 'Encode into an atomic subspace' },
    equation: String.raw`\rho_0=V\rho_LV^\dagger,\qquad V^\dagger V=I_L`,
    physical: { zh: '逻辑空间嵌入选定原子能级', en: 'Logical space embedded in selected atomic levels' },
    evidence: { zh: '制备误差、泄漏', en: 'Preparation error, leakage' },
  },
  {
    id: 'dynamics',
    number: '03',
    title: { zh: '哈密顿量生成演化', en: 'Hamiltonian-generated evolution' },
    equation: String.raw`\begin{aligned}i\hbar\,\partial_t|\psi(t)\rangle&=H[u(t)]|\psi(t)\rangle\\U(T)&=\mathcal T\exp\!\left[-\frac{i}{\hbar}\int_0^T H[u(t)]\,dt\right]\end{aligned}`,
    physical: { zh: '振幅、相位和失谐确定 U(T)', en: 'Amplitude, phase and detuning determine U(T)' },
    evidence: { zh: '过程矩阵、泄漏', en: 'Process matrix, leakage' },
  },
  {
    id: 'channel',
    number: '04',
    title: { zh: '物理量子通道', en: 'Physical quantum channel' },
    equation: String.raw`\mathcal E_{\mathrm{phys}}:\rho_0\mapsto\rho_T`,
    physical: { zh: '相干控制 + 耗散 + 泄漏 + 损失', en: 'Coherent control + dissipation + leakage + loss' },
    evidence: { zh: '通道保真度、故障相关性', en: 'Channel fidelity, fault correlations' },
  },
  {
    id: 'record',
    number: '05',
    title: { zh: '量子态变成经典记录', en: 'Quantum state to classical record' },
    equation: String.raw`p(m)=\operatorname{Tr}(E_m\rho_T),\qquad \sum_mE_m=I`,
    physical: { zh: 'POVM 生成经典记录分布', en: 'POVM generates the classical record distribution' },
    evidence: { zh: '混淆矩阵、SPAM、擦除标记', en: 'Confusion matrix, SPAM, erasure flags' },
  },
  {
    id: 'logical-result',
    number: '06',
    title: { zh: '可信逻辑结果', en: 'Trustworthy logical result' },
    equation: String.raw`G_Lp_L(d)\leq\varepsilon_{\mathrm{task}}`,
    physical: { zh: '译码与恢复得到逻辑通道', en: 'Decoding and recovery produce the logical channel' },
    evidence: { zh: 'pL、成功率、结果成本', en: 'pL, success probability, result cost' },
  },
]

const feedbackEquation = String.raw`(s_{1:T},f_{1:T})\xrightarrow{\ D\ }\widehat e\xrightarrow{\ \mathcal R_{\widehat e}\ }\mathcal N_L`

export default function CausalAtlas({ language }: CausalAtlasProps) {
  return (
    <section id="causal-atlas" className="causal-map" aria-labelledby="causal-map-title">
      <header className="causal-map__intro">
        <span>{language === 'zh' ? '计算 · 物理 · 验收' : 'COMPUTATION · PHYSICS · ACCEPTANCE'}</span>
        <h2 id="causal-map-title">
          {language === 'zh' ? '从逻辑对象到可信结果' : 'From logical objects to trustworthy results'}
        </h2>
        <p>
          {language === 'zh'
            ? '数学对象经编码与哈密顿量演化，穿过实际噪声通道和测量，最终接受任务级检验。'
            : 'A mathematical object is encoded, evolved by a Hamiltonian, passed through the physical channel and accepted at task level.'}
        </p>
      </header>

      <ol className="causal-map__flow" aria-label={language === 'zh' ? '计算到可信结果的因果链' : 'Causal chain from computation to a trustworthy result'}>
        {stages.map((stage) => (
          <li key={stage.id} className={`causal-stage causal-stage--${stage.id}`} data-testid="causal-stage">
            <header>
              <span>{stage.number}</span>
              <h3>{stage.title[language]}</h3>
            </header>
            <Equation source={stage.equation} />
            <div className="causal-stage__outcomes">
              <p className="causal-stage__physical">{stage.physical[language]}</p>
              <p className="causal-stage__evidence">{stage.evidence[language]}</p>
            </div>
          </li>
        ))}
      </ol>

      <aside className="causal-map__feedback" aria-label={language === 'zh' ? '纠错反馈支路' : 'Error-correction feedback branch'}>
        <div>
          <span>{language === 'zh' ? '反馈支路' : 'FEEDBACK BRANCH'}</span>
          <strong>{language === 'zh' ? '可见记录决定恢复，而不是直接暴露逻辑态' : 'Visible records determine recovery without revealing the logical state'}</strong>
        </div>
        <Equation source={feedbackEquation} />
      </aside>
    </section>
  )
}
