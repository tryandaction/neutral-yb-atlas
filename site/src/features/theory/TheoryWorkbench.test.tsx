import { fireEvent, render, screen } from '@testing-library/react'
import TheoryWorkbench from './TheoryWorkbench'

it('shows named physical outputs without a synthetic fidelity or research verdict', () => {
  render(<TheoryWorkbench language="en" />)

  expect(screen.getByLabelText('Maximum double excitation')).toBeInTheDocument()
  expect(screen.getByLabelText('Conditional phase')).toBeInTheDocument()
  expect(screen.getByLabelText('Rydberg exposure')).toBeInTheDocument()
  expect(screen.getByLabelText('Decay probability')).toBeInTheDocument()
  expect(screen.queryByText(/Qteach|operating region|next measurement|delivery contract/i)).not.toBeInTheDocument()
})

it('makes stronger blockade reduce maximum double excitation', () => {
  render(<TheoryWorkbench language="en" />)
  const output = screen.getByLabelText('Maximum double excitation')
  const before = output.textContent

  fireEvent.change(screen.getByLabelText(/V \/ 2π/), { target: { value: '90' } })

  expect(output.textContent).not.toBe(before)
})

it('shows detuning as a conditional-phase change rather than a fidelity score', () => {
  render(<TheoryWorkbench language="en" />)
  const phase = screen.getByLabelText('Conditional phase')
  const phaseError = screen.getByLabelText('Phase error magnitude')
  const beforePhase = phase.textContent
  const beforeError = phaseError.textContent

  fireEvent.change(screen.getByLabelText(/Δ \/ 2π/), { target: { value: '0.8' } })

  expect(phase.textContent).not.toBe(beforePhase)
  expect(phaseError.textContent).not.toBe(beforeError)
  expect(screen.queryByText(/fidelity proxy/i)).not.toBeInTheDocument()
})

it.each([
  ['Ωmax / 2π', '4', 'Rydberg exposure'],
  ['V / 2π', '60', 'Maximum double excitation'],
  ['Δ / 2π', '0.8', 'Phase error magnitude'],
  ['Temperature', '10', 'Doppler frequency scale'],
  ['Rydberg lifetime', '60', 'Decay probability'],
  ['Gate duration', '2.2', 'Rydberg exposure'],
])('makes %s visibly change %s', (control, value, observable) => {
  render(<TheoryWorkbench language="en" />)
  const output = screen.getByLabelText(observable)
  const before = output.textContent

  fireEvent.change(screen.getByLabelText(new RegExp(control.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))), {
    target: { value },
  })

  expect(output.textContent).not.toBe(before)
})
