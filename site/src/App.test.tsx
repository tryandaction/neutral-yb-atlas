import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

it('renders the bilingual atlas shell', async () => {
  window.history.replaceState(null, '', '#/')
  render(<App />)

  expect(
    await screen.findByRole('heading', {
      name: '中性 Yb 原子计算',
    }, { timeout: 20000 }),
  ).toBeInTheDocument()
})

it('opens the bilingual research Wiki from the application header', async () => {
  window.history.replaceState(null, '', '#/')
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: '打开科研术语 Wiki' }))

  expect(
    await screen.findByRole('dialog', { name: '科研术语 Wiki' }, { timeout: 5000 }),
  ).toBeInTheDocument()
  expect(screen.getByRole('searchbox', { name: '搜索术语、缩写或原理' })).toBeInTheDocument()
})
