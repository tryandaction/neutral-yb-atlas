import type { LocalizedText } from '../types/content'

export const siteCopy = {
  title: {
    zh: '中性镱原子计算的理论与实验基础',
    en: 'Theoretical and Experimental Foundations of Neutral-Yb Computing',
  },
  description: {
    zh: '从量子信息、原子结构与光控出发，连接 Rydberg 门、误差模型、实验工程和容错架构。',
    en: 'A first-principles route from quantum information and atomic structure to Rydberg gates, laboratory engineering and fault tolerance.',
  },
  nav: [
    { zh: '基础', en: 'Foundations' },
    { zh: 'Yb 平台', en: 'Yb platform' },
    { zh: '理论工作台', en: 'Theory lab' },
    { zh: '实验路线', en: 'Experiment' },
  ] satisfies LocalizedText[],
}
