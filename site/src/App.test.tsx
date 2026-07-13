import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

it('renders the bilingual atlas shell', () => {
  render(<App />)

  expect(
    screen.getByRole('heading', {
      name: '中性镱原子计算的理论与实验基础',
    }),
  ).toBeInTheDocument()
})

it('opens the bilingual research Wiki from the application header', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: '打开科研术语 Wiki' }))

  expect(
    await screen.findByRole('dialog', { name: '科研术语 Wiki' }, { timeout: 5000 }),
  ).toBeInTheDocument()
  expect(screen.getByRole('searchbox', { name: '搜索术语、缩写或原理' })).toBeInTheDocument()
})
