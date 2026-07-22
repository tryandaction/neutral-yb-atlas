import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

const svg = readFileSync('assets/yb-energy-levels-reference.svg', 'utf8')

it('preserves the original erasure-conversion diagram while adding compact computational roles', () => {
  expect(svg).toContain('Rydberg 态衰变、770 nm 再泵浦（repump）与擦除检测（Ma 2023）')
  expect(svg).toContain('阶段 A：等待 Rydberg 态衰变')
  expect(svg).toContain('阶段 B：770 nm 再泵浦 ³P₂')
  expect(svg).toContain('全局 RF 核自旋旋转 ΩRF')
  expect(svg).toContain('全阵列 X/Y；聚焦 302 nm 提供局域 Rz')
  expect(svg).toContain('556 nm 基态局域 Raman')
  expect(svg).toContain('两束聚焦光；¹S₀(mF=±1/2)')
  expect(svg).toContain('经 ³P₁(F′=1/2) 虚激发')
  expect(svg).toContain('Δ/2π≈−5 GHz；ΩR/2π≈7 kHz')
  expect(svg).toContain('逐位点相位/脉冲面积 → 并行 X/Y')
  expect(svg).toContain('Muniz et al. (2025)')
  expect(svg).toContain('亚稳态局域 Raman：649 nm 经 ³S₁（Jenkins 2022）')
  expect(svg).toContain('态选择读出：649+770 nm Raman（Li 2025）')
  expect(svg).toContain('失谐聚焦光产生差分 AC Stark 位移')
  expect(svg).toContain('计算作用：局域 Rz；与全局 RF 合成逐位点门')
  expect(svg).not.toContain('局域 649 nm Raman（方案）')
  expect(svg).not.toMatch(/[（(](?:已|未)演示[）)]/)
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
