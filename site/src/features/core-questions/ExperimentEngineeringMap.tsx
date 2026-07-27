import type { Language } from '../../types/content'
import WikiText from '../wiki/WikiText'
import CoreQuestionFrame from './CoreQuestionFrame'
import MapEquation from './MapEquation'

export default function ExperimentEngineeringMap({ language }: { language: Language }) {
  return (
    <CoreQuestionFrame
      id="core-experiment-map"
      eyebrow={{ zh: '装置、控制与反馈', en: 'Apparatus, control, and feedback' }}
      title={{ zh: '实验系统怎样闭合为可重复周期', en: 'How an experimental system closes into a repeatable cycle' }}
      thesis={{
        zh: '装置提供哈密顿量，控制将其按时序下发，测量把原子响应变成下一周期可以使用的记录。',
        en: 'The apparatus supplies Hamiltonian terms, control delivers them in time, and measurement turns the atomic response into a record for the next cycle.',
      }}
      conclusion={{
        zh: '校准、控制、原子演化、记录和修正必须是同一条可追溯的闭环，才能稳定重复实验结果。',
        en: 'Calibration, control, atomic evolution, records, and correction must form one traceable loop before an experiment is repeatable.',
      }}
      language={language}
    >
      <div className="engineering-cycle" aria-label={language === 'zh' ? '实验装置、控制和反馈关系图' : 'Relationship among apparatus, control and feedback'}>
        <ol className="engineering-cycle__track">
          <li className="engineering-cycle__stage engineering-cycle__stage--apparatus">
            <span>{language === 'zh' ? '01 · 构建条件' : '01 · Set the conditions'}</span>
            <h3>{language === 'zh' ? '装置给出可用相互作用' : 'The apparatus defines available interactions'}</h3>
            <p>{language === 'zh' ? '真空、磁场、光束几何和光镊势决定哪些哈密顿量项真正存在。' : 'Vacuum, magnetic fields, beam geometry, and tweezer potentials determine which Hamiltonian terms exist.'}</p>
            <MapEquation source={String.raw`H_0`} />
          </li>
          <li className="engineering-cycle__stage engineering-cycle__stage--control">
            <span>{language === 'zh' ? '02 · 下发控制' : '02 · Deliver control'}</span>
            <h3>{language === 'zh' ? '波形决定何时、如何驱动' : 'A waveform decides when and how to drive'}</h3>
            <p>{language === 'zh' ? '频率、功率、相位、偏振和触发共同定义实际到达原子的控制向量。' : 'Frequency, power, phase, polarization, and triggers define the control vector that reaches the atom.'}</p>
            <MapEquation source={String.raw`u_k=\{\nu,P,\phi,\epsilon,t_{\mathrm{trig}}\}_k`} />
          </li>
          <li className="engineering-cycle__stage engineering-cycle__stage--atom">
            <span>{language === 'zh' ? '03 · 原子响应' : '03 · Atomic response'}</span>
            <h3>{language === 'zh' ? '原子态和运动共同演化' : 'Internal state and motion evolve together'}</h3>
            <MapEquation source={String.raw`\dot\rho=\mathcal L_{H[u(t)],\Gamma}\!(\rho)`} />
            <p>{language === 'zh' ? '布居、相位、运动、占据与损失都由这一步动力学决定。' : 'Population, phase, motion, occupancy, and loss are all set by this dynamics.'}</p>
          </li>
          <li className="engineering-cycle__stage engineering-cycle__stage--measurement">
            <span>{language === 'zh' ? '04 · 读取并修正' : '04 · Read and correct'}</span>
            <h3>{language === 'zh' ? '测量记录决定下一次修正' : 'The record determines the next correction'}</h3>
            <p>{language === 'zh' ? '图像、谱线、寿命和时间戳用于估计漂移、判断结果并更新下一周期。' : 'Images, spectra, lifetimes, and timestamps estimate drift, judge the result, and update the next cycle.'}</p>
            <MapEquation source={String.raw`y_k=\operatorname{Tr}(E_k\rho)+\eta_k`} />
          </li>
        </ol>
        <div className="engineering-cycle__feedback" aria-label={language === 'zh' ? '校准与反馈路径' : 'Calibration and feedback path'}>
          <span>{language === 'zh' ? '校准与漂移估计' : 'Calibrate and estimate drift'}</span>
          <i aria-hidden="true" />
          <p><WikiText text={language === 'zh' ? '记录更新下一周期的控制参数' : 'The record updates control parameters for the next cycle'} language={language} /></p>
        </div>
      </div>
    </CoreQuestionFrame>
  )
}
