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

it('shows the same detuning change as phase mismatch and predicted gate quality', () => {
  render(<TheoryWorkbench language="en" />)

  const before = screen.getByLabelText('Teaching quality proxy').textContent
  fireEvent.change(screen.getAllByRole('slider')[2], { target: { value: '2' } })

  expect(screen.getByLabelText('Phase-mismatch proxy')).toHaveTextContent('εφ')
  expect(screen.getByLabelText('Teaching quality proxy').textContent).not.toBe(before)
  expect(screen.getAllByText(/not measured fidelity/i).length).toBeGreaterThan(0)
})

it.each([
  ['Ωmax / 2π', '4', 'Double-excitation proxy'],
  ['V / 2π', '60', 'Double-excitation proxy'],
  ['Δ / 2π', '0.8', 'Phase-mismatch proxy'],
  ['Temperature', '10', 'Doppler proxy'],
  ['Rydberg lifetime', '60', 'Decay-exposure proxy'],
  ['Gate duration', '2.2', 'Decay-exposure proxy'],
])('makes %s visibly change %s', (control, value, observable) => {
  render(<TheoryWorkbench language="en" />)
  const output = screen.getByLabelText(observable)
  const before = output.textContent

  fireEvent.change(screen.getByLabelText(new RegExp(control.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))), {
    target: { value },
  })

  expect(output.textContent).not.toBe(before)
})
