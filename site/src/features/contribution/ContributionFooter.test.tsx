import { render, screen } from '@testing-library/react'
import ContributionFooter from './ContributionFooter'
import { contributionIssueUrl } from './contribution'

it('links readers to the GitHub contribution workflow', () => {
  render(<ContributionFooter language="zh" />)

  const link = screen.getByRole('link', { name: '纠错与贡献' })
  expect(link).toHaveAttribute('href', contributionIssueUrl)
  expect(link).toHaveAttribute('target', '_blank')
  expect(screen.getByText(/网页本身不会直接修改原文/)).toBeInTheDocument()
})
