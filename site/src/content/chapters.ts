import type { Chapter } from '../types/content'
import { experimentChapter } from './learning/experiment'
import { faultToleranceChapter } from './learning/faultTolerance'
import { foundationsChapter } from './learning/foundations'
import { gatesChapter } from './learning/gates'
import { neutralAtomsChapter } from './learning/neutralAtoms'
import { ytterbiumChapter } from './learning/ytterbium'

export const chapters: Chapter[] = [
  foundationsChapter,
  neutralAtomsChapter,
  ytterbiumChapter,
  gatesChapter,
  experimentChapter,
  faultToleranceChapter,
]
