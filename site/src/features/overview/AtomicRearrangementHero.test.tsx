import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import AtomicRearrangementHero from './AtomicRearrangementHero'

describe('AtomicRearrangementHero', () => {
  it('renders the Chinese journey and exposes every arrangement control', () => {
    render(<AtomicRearrangementHero language="zh" />)

    const heading = screen.getByRole('heading', { name: '中性 Yb 原子计算' })
    expect([...heading.querySelectorAll('.atomic-cover__title-line')].map((line) => line.textContent)).toEqual(['中性 Yb', '原子计算'])
    expect(heading).toHaveTextContent('中性 Yb 原子计算')
    expect(screen.getByRole('link', { name: /从什么是计算开始/ })).toHaveAttribute('href', '#causal-atlas')
    expect(screen.getAllByRole('button')).toHaveLength(5)
    expect(screen.getByRole('button', { name: '随机装载' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('随机装载')).toHaveAttribute('aria-live', 'polite')
    expect(screen.getByRole('img', { name: /81 个镱原子/ })).toHaveAttribute('data-arrangement', 'random')
  })

  it('renders English copy and selects the cat arrangement', async () => {
    const user = userEvent.setup()
    render(<AtomicRearrangementHero language="en" />)

    const heading = screen.getByRole('heading', { name: 'Neutral Yb Atomic Computing' })
    expect([...heading.querySelectorAll('.atomic-cover__title-line')].map((line) => line.textContent)).toEqual(['Neutral Yb', 'Atomic Computing'])
    expect(heading).toHaveTextContent('Neutral Yb Atomic Computing')
    expect(screen.getByRole('link', { name: /Begin with what computation is/ })).toHaveAttribute('href', '#causal-atlas')

    await user.click(screen.getByRole('button', { name: 'Cat' }))

    expect(screen.getByRole('button', { name: 'Cat' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Cat')).toHaveAttribute('aria-live', 'polite')
    expect(screen.getByRole('img', { name: /81 ytterbium atoms/ })).toHaveAttribute('data-arrangement', 'cat')
  })
})
