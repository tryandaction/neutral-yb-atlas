import { render, screen } from '@testing-library/react'
import Hero from './Hero'

it('opens with a layered knowledge-system entry instead of the dense reference image', () => {
  const { container } = render(<Hero language="zh" mode="guided" />)
  const hero = container.querySelector('.hero')

  expect(hero).not.toBeNull()
  expect(hero?.querySelector('img')).toBeNull()
  expect(screen.getByText('公理层')).toBeInTheDocument()
  expect(screen.getByText('物理层')).toBeInTheDocument()
  expect(screen.getByText('器件层')).toBeInTheDocument()
  expect(screen.getByText('系统层')).toBeInTheDocument()
})
