import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResearchAtlas from './ResearchAtlas'

it('switches research figures and opens the selected figure for inspection', async () => {
  const user = userEvent.setup()
  render(<ResearchAtlas language="zh" />)

  expect(screen.getByAltText('从实测噪声谱到控制代价')).toBeInTheDocument()

  await user.click(screen.getByText('脉冲优化', { selector: 'button' }))
  expect(screen.getByAltText('从目标门到可下发波形')).toBeInTheDocument()

  await user.click(screen.getByLabelText('放大当前科研图'))
  expect(screen.getByLabelText('科研图放大视图')).toBeInTheDocument()

  await user.click(screen.getByLabelText('关闭放大视图'))
  expect(screen.queryByLabelText('科研图放大视图')).not.toBeInTheDocument()
})
