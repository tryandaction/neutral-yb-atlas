import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

const svg = readFileSync('assets/yb-energy-levels-reference.svg', 'utf8')

it('preserves the erasure-conversion diagram and the computational role cards', () => {
  expect(svg).toContain('Rydberg 态衰变、770 nm 再泵浦（repump）与擦除检测（Ma 2023）')
  expect(svg).toContain('阶段 A：等待 Rydberg 态衰变')
  expect(svg).toContain('阶段 B：770 nm 再泵浦 ³P₂')
  expect(svg).not.toContain('cm⁻¹')
  expect(svg).not.toMatch(/>\d\s+\d{3}(?:\.\d)? nm/)
  expect(svg).toContain('计算作用：基态占据判别与擦除标记')
  expect(svg).toContain('计算作用：Rydberg 阻塞型 CZ 门')
  expect(svg).toContain('计算作用：Rydberg 错误转擦除记录')
})

it('uses wavelength-matched arrow colors for every optical transition', () => {
  expect(svg).toMatch(/stroke="#1f5fd1"[^>]+marker-(?:start|end)="url\(#arrow-blue\)"/)
  expect(svg).toMatch(/stroke="#187a44"[^>]+marker-(?:start|end)="url\(#arrow-green\)"/)
  expect(svg).toMatch(/stroke="#e74b22"[^>]+marker-(?:start|end)="url\(#arrow-orange\)"/)
  expect(svg).toMatch(/stroke="#5b33c5"[^>]+marker-(?:start|end)="url\(#arrow-purple\)"/)
  expect(svg).toMatch(/stroke="#9c1743"[^>]+marker-(?:start|end)="url\(#arrow-wine\)"/)
})

it('uses one Raman lambda map for four source-qualified control channels', () => {
  expect(svg).toContain('id="raman-lambda-control-map"')
  expect(svg).toContain('Raman Λ 控制接口')
  expect(svg).toContain('|0⟩')
  expect(svg).toContain('|1⟩')
  expect(svg).toContain('|e⟩（真实中间态）')
  expect(svg).toContain('虚能级')
  expect(svg).toContain('单光子失谐 Δ')
  expect(svg).toContain('δ=(ωa−ωb)−ω01')
  expect(svg).toContain('Ω₂γ≈ΩaΩb*/(2Δ)')

  expect(svg).toContain('¹S₀｜556+556 nm → ³P₁(F′=1/2)')
  expect(svg).toContain('Δ/2π≈−5 GHz；Ω₂γ/2π≈7 kHz；磁 RF：ωd=ωZ')
  expect(svg).toContain('³P₀｜649+649 nm → 6s7s ³S₁')
  expect(svg).toContain('Jenkins 2022 提案：局域 Raman；参数依装置')
  expect(svg).toContain('³P₂｜770+770 nm → 6s7s ³S₁(F′=3/2,mF′=−3/2)')
  expect(svg).toContain('ΔQB/2π=+20 GHz；ΩQB/2π=2 MHz；B=10 G（理论模拟）')
  expect(svg).toContain('³P₀↔³P₂｜649+770 nm → 6s7s ³S₁')
  expect(svg).toContain('Δ/2π≈12 GHz；Ω₂γ/2π=1.08 MHz；B=8.5 G（Li 2025 态映射）')

  expect(svg).toContain('两比特计算基：|0⟩, |1⟩ ∈ ³P₀')
  expect(svg).toContain('302 nm：³P₀ |1⟩ ↔ |r⟩')
  expect(svg).not.toContain('编码 A')
  expect(svg).not.toContain('编码 B')
  expect(svg).not.toContain('微波')
})

it('draws decay and repump as one energy-ordered physical flow', () => {
  expect(svg).toContain('id="decay-repump-flow"')
  expect(svg).toContain('|r⟩ 初态：6s59s ³S₁')
  expect(svg).toContain('自发衰变：等待约 400 μs')
  expect(svg).toContain('³P₂ → 6s7s ³S₁：770 nm repump')
  expect(svg).toContain('¹S₀ → ¹P₁：399 nm fluorescence')
  expect(svg).toContain('等待后：25% ¹S₀ / 10% ³P₀ / 35% ³P₂ / 30% 未计入')
  expect(svg).toContain('再泵浦后总布居：51% ¹S₀ / 19% ³P₀ / 30% 未计入')
})
