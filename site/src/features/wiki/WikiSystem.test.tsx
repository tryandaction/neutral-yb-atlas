import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WikiDrawer from './WikiDrawer'
import { useWiki } from './WikiContext'
import { WikiProvider } from './WikiProvider'
import WikiText from './WikiText'

function IndexButton() {
  const { openIndex } = useWiki()
  return <button type="button" onClick={openIndex}>打开 Wiki 索引</button>
}

function TestApp({ disabled = false }: { disabled?: boolean }) {
  return (
    <WikiProvider>
      <IndexButton />
      <p><WikiText language="zh" text="AOD 与 AOD 配合高 NA 物镜完成重排。" disabled={disabled} /></p>
      <WikiDrawer language="zh" />
    </WikiProvider>
  )
}

it('links only the first occurrence in a block and suppresses links while editing', () => {
  const { rerender } = render(<TestApp />)
  expect(screen.getAllByRole('button', { name: '查看 Wiki：声光偏转器' })).toHaveLength(1)
  expect(screen.getByRole('button', { name: '查看 Wiki：高数值孔径物镜' })).toBeInTheDocument()

  rerender(<TestApp disabled />)
  expect(screen.queryByRole('button', { name: /^查看 Wiki/ })).not.toBeInTheDocument()
})

it('opens an entry, follows related concepts, returns through history and closes on Escape', async () => {
  const user = userEvent.setup()
  render(<TestApp />)

  await user.click(screen.getByRole('button', { name: '查看 Wiki：声光偏转器' }))
  expect(screen.getByRole('dialog', { name: '科研术语 Wiki' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '声光偏转器' })).toBeInTheDocument()
  expect(screen.getByText('声光布拉格衍射')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: '查看相关词条：空间光调制器' }))
  expect(screen.getByRole('heading', { name: '空间光调制器' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: '返回上一词条' }))
  expect(screen.getByRole('heading', { name: '声光偏转器' })).toBeInTheDocument()

  await user.keyboard('{Escape}')
  expect(screen.queryByRole('dialog', { name: '科研术语 Wiki' })).not.toBeInTheDocument()
})

it('searches bilingual aliases and filters the index by category', async () => {
  const user = userEvent.setup()
  render(<TestApp />)

  await user.click(screen.getByRole('button', { name: '打开 Wiki 索引' }))
  const search = screen.getByRole('searchbox', { name: '搜索术语、缩写或原理' })
  await user.type(search, 'SLM')
  expect(screen.getByRole('button', { name: '打开词条：空间光调制器' })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: '打开词条：声光偏转器' })).not.toBeInTheDocument()

  await user.clear(search)
  await user.click(screen.getByRole('button', { name: '筛选：控制与时序' }))
  expect(screen.getByRole('button', { name: '打开词条：现场可编程门阵列' })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: '打开词条：空间光调制器' })).not.toBeInTheDocument()
})
