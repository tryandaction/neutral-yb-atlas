import type { Language } from '../../types/content'
import WikiText from '../wiki/WikiText'
import CoreQuestionFrame from './CoreQuestionFrame'
import MapEquation from './MapEquation'

export default function ExperimentEngineeringMap({ language }: { language: Language }) {
  return (
    <CoreQuestionFrame
      id="core-experiment-map"
      eyebrow={{ zh: '空间装置 · 时间控制 · 测量反馈', en: 'APPARATUS · TIMING · MEASUREMENT' }}
      title={{ zh: '实验系统怎样闭合为可重复周期', en: 'How an experimental system closes into a repeatable cycle' }}
      thesis={{
        zh: '装置规定原子可经历的物理过程，时序规定过程发生的顺序，测量把原子端响应反馈为下一周期的控制修正。',
        en: 'Apparatus defines the processes available to the atom, timing orders those processes, and measurement converts the atomic response into control corrections for the next cycle.',
      }}
      conclusion={{
        zh: '下方装置图负责空间路径，时序图负责时间路径；本图只给出二者通过原子状态和测量记录闭合的系统关系。',
        en: 'The apparatus figure below supplies the spatial path and the timing figure supplies the temporal path; this map only shows how both close through atomic state and measurement records.',
      }}
      language={language}
    >
      <div className="engineering-cycle" aria-label={language === 'zh' ? '实验装置、控制和反馈关系图' : 'Relationship among apparatus, control and feedback'}>
        <ol className="engineering-cycle__track">
          <li className="engineering-cycle__stage engineering-cycle__stage--apparatus">
            <span>01 · {language === 'zh' ? '空间' : 'SPACE'}</span>
            <h3>{language === 'zh' ? '装置与光路' : 'Apparatus and optical paths'}</h3>
            <p>{language === 'zh' ? '真空、磁场、光束几何和光镊势决定可实现的哈密顿量项。' : 'Vacuum, fields, beam geometry and tweezer potentials determine the available Hamiltonian terms.'}</p>
            <MapEquation source={String.raw`H_0`} />
          </li>
          <li className="engineering-cycle__stage engineering-cycle__stage--control">
            <span>02 · {language === 'zh' ? '时间' : 'TIME'}</span>
            <h3>{language === 'zh' ? '控制时序' : 'Control schedule'}</h3>
            <p>{language === 'zh' ? '频率、功率、相位、偏振和触发组成实际下发的控制向量。' : 'Frequency, power, phase, polarization and triggers form the delivered control vector.'}</p>
            <MapEquation source={String.raw`u_k=\{\nu,P,\phi,\epsilon,t_{\mathrm{trig}}\}_k`} />
          </li>
          <li className="engineering-cycle__stage engineering-cycle__stage--atom">
            <span>{language === 'zh' ? '原子端' : 'AT THE ATOM'}</span>
            <h3>{language === 'zh' ? '状态与运动' : 'Internal state and motion'}</h3>
            <MapEquation source={String.raw`\dot\rho=\mathcal L_{H[u(t)],\Gamma}\!(\rho)`} />
            <p>{language === 'zh' ? '布居、相位、运动、占据与损失在同一原子状态中演化。' : 'Population, phase, motion, occupancy and loss evolve in one atomic state.'}</p>
          </li>
          <li className="engineering-cycle__stage engineering-cycle__stage--measurement">
            <span>03 · {language === 'zh' ? '证据' : 'EVIDENCE'}</span>
            <h3>{language === 'zh' ? '记录与验收' : 'Records and acceptance'}</h3>
            <p>{language === 'zh' ? '图像、谱线、寿命和时间戳映射为预先定义的验收量。' : 'Images, spectra, lifetimes and timestamps map to predefined acceptance quantities.'}</p>
            <MapEquation source={String.raw`y_k=\operatorname{Tr}(E_k\rho)+\eta_k`} />
          </li>
        </ol>
        <div className="engineering-cycle__feedback" aria-label={language === 'zh' ? '校准与反馈路径' : 'Calibration and feedback path'}>
          <span>{language === 'zh' ? '校准与漂移估计' : 'Calibration and drift estimate'}</span>
          <i aria-hidden="true" />
          <p><WikiText text={language === 'zh' ? '反馈记录更新下一周期控制' : 'Feedback record updates next-cycle control'} language={language} /></p>
        </div>
      </div>
    </CoreQuestionFrame>
  )
}
