import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const svgPath = resolve(root, 'site/assets/yb-energy-levels-reference.svg')

test('keeps source typography readable after the reference map is scaled to page width', async () => {
  const svg = await readFile(svgPath, 'utf8')

  assert.match(svg, /\.tiny \{ font-size: (?:1[7-9]|[2-9]\d)px;/)
  assert.match(svg, /\.micro \{ font-size: (?:1[5-9]|[2-9]\d)px;/)
})

test('keeps the repump inset in physical energy order', async () => {
  const svg = await readFile(svgPath, 'utf8')
  const labels = ['6s7s ³S₁', '³P₂', '³P₁', '³P₀', '¹S₀']
  const stageStart = svg.indexOf('<!-- Stage B -->')
  const stageEnd = svg.indexOf('<!-- Stage C -->')
  const stage = svg.slice(stageStart, stageEnd)
  const positions = labels.map((label) => stage.indexOf(`>${label}</text>`))

  assert.ok(positions.every((position) => position >= 0))
  assert.deepEqual([...positions].sort((a, b) => a - b), positions)
})

test('defines the meaning and limits of the spectroscopic energy labels', async () => {
  const svg = await readFile(svgPath, 'utf8')

  assert.match(svg, /E\/hc（cm⁻¹）/)
  assert.match(svg, /相对 ¹S₀/)
  assert.match(svg, /超精细分裂未画/)
})

test('separates the 369 nm ionic-core excitation from the subsequent autoionization', async () => {
  const svg = await readFile(svgPath, 'utf8')

  assert.match(svg, /\u79bb\u5b50\u5b9e\u6fc0\u53d1/)
  assert.doesNotMatch(svg, /\u79bb\u5b50\u82af/)
  assert.doesNotMatch(svg, /\u81ea\u52a8\u7535\u79bb\u6fc0\u53d1/)
})

test('distinguishes the repump intermediate from the Rydberg state', async () => {
  const svg = await readFile(svgPath, 'utf8')
  const stageStart = svg.indexOf('<!-- Stage B -->')
  const stageEnd = svg.indexOf('<!-- Stage C -->')
  const stage = svg.slice(stageStart, stageEnd)

  assert.match(stage, /6s7s ³S₁/)
  assert.doesNotMatch(stage, /6s59s ³S₁/)
  assert.match(stage, /约25%落入³P₀/)
})

test('uses standard Chinese atomic-physics terminology', async () => {
  const svg = await readFile(svgPath, 'utf8')

  assert.doesNotMatch(svg, /人口/)
  assert.match(svg, /布居/)
  assert.match(svg, /再泵浦（repump）/)
})
