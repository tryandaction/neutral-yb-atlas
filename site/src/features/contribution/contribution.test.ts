import { contributionIssueUrl } from './contribution'

it('points readers to the repository issue chooser', () => {
  expect(contributionIssueUrl).toBe('https://github.com/tryandaction/neutral-yb-atlas/issues/new/choose')
})
