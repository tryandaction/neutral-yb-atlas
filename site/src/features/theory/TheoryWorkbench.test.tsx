import { fireEvent, render, screen } from '@testing-library/react'
import TheoryWorkbench from './TheoryWorkbench'

it('updates the operating verdict and next laboratory measurement from model controls', () => {
  render(<TheoryWorkbench language="zh" />)

  expect(screen.getByText('可用教学工作区')).toBeInTheDocument()
  expect(screen.getByText(/优先测量 Rydberg 寿命与门内布居/)).toBeInTheDocument()

  fireEvent.change(screen.getByLabelText(/V \/ 2π/), { target: { value: '10' } })

  expect(screen.getByText('超出阻塞工作区')).toBeInTheDocument()
  expect(screen.getByText(/双原子距离与角度扫描/)).toBeInTheDocument()
})
