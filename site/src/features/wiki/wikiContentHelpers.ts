import type { LocalizedText } from '../../types/content'
import type { WikiDiagnostic, WikiSection, WikiSource, WikiSpecification, WikiStep } from './wikiTypes'

export const t = (zh: string, en: string): LocalizedText => ({ zh, en })
export const principle = (zhTitle: string, enTitle: string, zhBody: string, enBody: string): WikiSection => ({
  title: t(zhTitle, enTitle), body: t(zhBody, enBody),
})
export const step = (zhTitle: string, enTitle: string, zhAction: string, enAction: string, zhOutput: string, enOutput: string): WikiStep => ({
  title: t(zhTitle, enTitle), action: t(zhAction, enAction), output: t(zhOutput, enOutput),
})
export const spec = (zhParameter: string, enParameter: string, zhSignificance: string, enSignificance: string, zhTarget: string, enTarget: string): WikiSpecification => ({
  parameter: t(zhParameter, enParameter), significance: t(zhSignificance, enSignificance), target: t(zhTarget, enTarget),
})
export const diagnostic = (zhSymptom: string, enSymptom: string, zhCauses: string, enCauses: string, zhChecks: string, enChecks: string): WikiDiagnostic => ({
  symptom: t(zhSymptom, enSymptom), causes: t(zhCauses, enCauses), checks: t(zhChecks, enChecks),
})
export const source = (citation: string, url: string): WikiSource => ({ citation, url })
