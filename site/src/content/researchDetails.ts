import type { ResearchDetail } from '../types/content'
import { foundationResearchDetails } from './researchDetailsFoundation'
import { systemResearchDetails } from './researchDetailsSystems'

export const researchDetails: Record<string, ResearchDetail> = {
  ...foundationResearchDetails,
  ...systemResearchDetails,
}
