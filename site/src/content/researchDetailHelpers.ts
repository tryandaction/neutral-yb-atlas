import type { LocalizedText, ResearchInstrument } from '../types/content'

export const text = (zh: string, en: string): LocalizedText => ({ zh, en })
export const apparatus = (zhName: string, enName: string, zhRole: string, enRole: string, zhMeasures: string, enMeasures: string): ResearchInstrument => ({
  name: text(zhName, enName),
  role: text(zhRole, enRole),
  measures: text(zhMeasures, enMeasures),
})
