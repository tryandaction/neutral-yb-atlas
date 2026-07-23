import reservoirLoad from '../../../assets/yb-cycle-01-reservoir-load.svg'
import qualifyCool from '../../../assets/yb-cycle-02-qualify-cool.svg'
import prepareHandoff from '../../../assets/yb-cycle-03-prepare-handoff.svg'
import compute from '../../../assets/yb-cycle-04-compute.svg'
import readoutFeedback from '../../../assets/yb-cycle-05-readout-feedback.svg'
import type { Localized } from './cycleTimelineData'

export type CycleTimelineGraphic = {
  id: 'supply' | 'load' | 'handoff' | 'compute' | 'readout'
  src: string
  alt: Localized
}

export const cycleTimelineGraphics: CycleTimelineGraphic[] = [
  { id: 'supply', src: reservoirLoad, alt: { zh: '实验周期图 1：储备区供给、移动光镊装载与计算区空间隔离。', en: 'Experimental cycle panel 1: reservoir supply, mobile-tweezer loading, and spatial isolation from computation.' } },
  { id: 'load', src: qualifyCool, alt: { zh: '实验周期图 2：运输、光辅助碰撞、占据成像与冷却。', en: 'Experimental cycle panel 2: transport, light-assisted collisions, occupancy imaging, and cooling.' } },
  { id: 'handoff', src: prepareHandoff, alt: { zh: '实验周期图 3：基态极化、亚稳态制备、运输与静态阵列交接。', en: 'Experimental cycle panel 3: ground-state polarization, metastable preparation, transport, and stationary-array handoff.' } },
  { id: 'compute', src: compute, alt: { zh: '实验周期图 4：静态阵列相干门与储备区并行补原子。', en: 'Experimental cycle panel 4: coherent gates in the stationary array with parallel reservoir reloading.' } },
  { id: 'readout', src: readoutFeedback, alt: { zh: '实验周期图 5：态选择 Raman 映射、去泵浦、双帧成像与反馈。', en: 'Experimental cycle panel 5: state-selective Raman mapping, depumping, two-frame imaging, and feedback.' } },
]
