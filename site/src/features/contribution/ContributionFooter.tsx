import { ExternalLink } from 'lucide-react'
import type { Language } from '../../types/content'
import { contributionIssueUrl } from './contribution'
import './contribution.css'

export default function ContributionFooter({ language }: { language: Language }) {
  const copy = language === 'zh'
    ? {
        heading: '帮助完善学习图谱',
        body: '发现错误、补充来源或改进解释，请提交一条可追溯的建议。网页本身不会直接修改原文。',
        action: '纠错与贡献',
      }
    : {
        heading: 'Help improve the learning atlas',
        body: 'Report an error, add a source, or improve an explanation through a traceable suggestion. The website never edits published text directly.',
        action: 'Contribute',
      }

  return (
    <footer className="contribution-footer">
      <div>
        <h2>{copy.heading}</h2>
        <p>{copy.body}</p>
      </div>
      <a href={contributionIssueUrl} target="_blank" rel="noreferrer">
        {copy.action}<ExternalLink aria-hidden="true" />
      </a>
    </footer>
  )
}
