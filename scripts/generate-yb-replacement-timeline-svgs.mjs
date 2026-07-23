import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const assetDir = resolve(root, 'site/assets')

const C = {
  ink: '#14211d', muted: '#56635f', line: '#c9d1ce', wash: '#f6f8f7',
  green: '#176f4e', blue: '#2864c7', coral: '#d84c2f', purple: '#6845c6', gold: '#9c7415',
}

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const text = (x, y, value, cls = 'body', options = {}) => `<text x="${x}" y="${y}" class="${cls}"${options.anchor ? ` text-anchor="${options.anchor}"` : ''}${options.fill ? ` fill="${options.fill}"` : ''}${options.weight ? ` font-weight="${options.weight}"` : ''}>${esc(value)}</text>`
const lines = (x, y, values, cls = 'body', lineHeight = 23, options = {}) => values.map((value, index) => text(x, y + index * lineHeight, value, cls, options)).join('\n')
const rect = (x, y, width, height, fill, stroke = 'none', radius = 5) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`

const stageLabels = ['RESERVOIR / LOAD', 'QUALIFY / COOL', 'PREPARE / HANDOFF', 'COMPUTE', 'READOUT / FEEDBACK']

function stageStrip(active) {
  return stageLabels.map((label, index) => {
    const x = 20 + index * 144
    const fill = index === active ? C.ink : '#edf1ef'
    const color = index === active ? '#ffffff' : C.muted
    return `${rect(x, 82, 136, 34, fill, 'none', 3)}${text(x + 68, 104, label, 'stage', { anchor: 'middle', fill: color, weight: 700 })}`
  }).join('\n')
}

function phaseBands(phases) {
  return phases.map((phase) => `${rect(phase.x, 132, phase.width, 42, phase.fill ?? '#edf3f0', 'none', 3)}${text(phase.x + phase.width / 2, 151, phase.title, 'small', { anchor: 'middle', weight: 700 })}${text(phase.x + phase.width / 2, 168, phase.time, 'micro', { anchor: 'middle', fill: C.muted })}`).join('\n')
}

function laneRows(lanes) {
  return lanes.map((lane, index) => {
    const y = 212 + index * 58
    const baseline = `<line x1="176" y1="${y + 24}" x2="732" y2="${y + 24}" stroke="${C.line}" stroke-width="1"/>`
    const label = text(22, y + 20, lane.label, 'body', { weight: 650 })
    const pulses = lane.pulses.map((pulse) => {
      if (pulse.kind === 'gate') {
        return `<line x1="${pulse.x}" y1="${y + 6}" x2="${pulse.x}" y2="${y + 34}" stroke="${pulse.color}" stroke-width="4"/>${text(pulse.x + 7, y + 20, pulse.label, 'micro', { fill: pulse.color, weight: 700 })}`
      }
      if (pulse.kind === 'dashed') {
        return `<rect x="${pulse.x}" y="${y + 7}" width="${pulse.width}" height="26" rx="4" fill="#fff" stroke="${pulse.color}" stroke-width="2" stroke-dasharray="6 5"/>${text(pulse.x + pulse.width / 2, y + 25, pulse.label, 'micro', { anchor: 'middle', fill: pulse.color, weight: 700 })}`
      }
      return `${rect(pulse.x, y + 7, pulse.width, 26, pulse.color, 'none', 4)}${text(pulse.x + pulse.width / 2, y + 25, pulse.label, 'micro', { anchor: 'middle', fill: '#fff', weight: 700 })}`
    }).join('\n')
    return `${label}${baseline}${pulses}`
  }).join('\n')
}

function panel({ filename, active, kicker, title, subtitle, phases, lanes, notes, source }) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="760" height="760" viewBox="0 0 760 760" role="img" aria-labelledby="title description">
  <title id="title">${esc(title)}</title>
  <desc id="description">${esc(subtitle)}</desc>
  <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${C.ink}"/></marker><style>
    text { font-family: Inter, "Noto Sans", Arial, sans-serif; letter-spacing: 0; }
    .title { font-size: 27px; font-weight: 700; } .subtitle { font-size: 17px; }
    .body { font-size: 17px; } .small { font-size: 15px; } .micro { font-size: 13px; } .stage { font-size: 10px; }
  </style></defs>
  <rect width="760" height="760" fill="#ffffff"/>
  ${text(22, 28, kicker, 'stage', { fill: C.coral, weight: 700 })}
  ${text(22, 58, title, 'title')}
  ${text(738, 56, `${String(active + 1).padStart(2, '0')} / 05`, 'small', { anchor: 'end', fill: C.muted, weight: 700 })}
  ${stageStrip(active)}
  ${phaseBands(phases)}
  ${laneRows(lanes)}
  <line x1="20" y1="574" x2="740" y2="574" stroke="${C.ink}" stroke-width="1.5"/>
  ${lines(22, 608, notes, 'body', 25)}
  ${text(22, 735, source, 'micro', { fill: C.muted })}
</svg>`
  return { filename, svg }
}

const panels = [
  panel({
    filename: 'yb-cycle-01-reservoir-load.svg', active: 0, kicker: 'SUPPLY DOMAIN',
    title: 'Reservoir supply and scheduled loading',
    subtitle: 'Reservoir molasses, mobile-tweezer loading, and the separation from the compute zone.',
    phases: [
      { x: 176, width: 178, title: 'maintain reservoir', time: 'parallel background', fill: '#eaf3ef' },
      { x: 362, width: 226, title: 'capture into mobile tweezers', time: 'scheduled load 2 ms', fill: '#eef3fb' },
      { x: 596, width: 136, title: 'hold for next step', time: 'occupancy unknown', fill: '#f5f1fb' },
    ],
    lanes: [
      { label: 'reservoir molasses', pulses: [{ x: 184, width: 396, label: 'ON — reservoir only', color: C.green }] },
      { label: 'mobile tweezers', pulses: [{ x: 362, width: 226, label: 'capture / dwell', color: C.blue }, { x: 596, width: 128, label: 'hold', color: C.purple }] },
      { label: 'stationary array', pulses: [{ x: 184, width: 540, label: 'coherent compute remains spatially isolated', color: C.ink }] },
      { label: 'camera', pulses: [{ x: 184, width: 540, label: 'OFF during loading', color: '#77827f', kind: 'dashed' }] },
      { label: 'scheduler', pulses: [{ x: 356, label: 'open load slot', color: C.coral, kind: 'gate' }, { x: 590, label: 'advance', color: C.coral, kind: 'gate' }] },
    ],
    notes: [
      'τload = 0.84 ms is the fitted loading time constant; 2 ms is the allocated dwell.',
      '1D reservoir molasses does not illuminate the stationary compute array; it is disabled for imaging.',
      'Parallel supply is therefore a spatial-isolation condition, not a continuously global beam.',
    ],
    source: 'Li et al. (2025), apparatus schedule and reservoir-loading fit.',
  }),
  panel({
    filename: 'yb-cycle-02-qualify-cool.svg', active: 1, kicker: 'QUALIFICATION DOMAIN',
    title: 'Move, collision filter, image, and cool',
    subtitle: 'The stochastic load is converted into a known, cold, single-atom payload.',
    phases: [
      { x: 176, width: 102, title: 'move', time: '0.5 ms', fill: '#eef3fb' },
      { x: 286, width: 142, title: 'LAC', time: '6 ms', fill: '#fff2ed' },
      { x: 436, width: 142, title: 'identify', time: '4 ms', fill: '#edf4fc' },
      { x: 586, width: 146, title: 'cool', time: '6 ms', fill: '#eaf3ef' },
    ],
    lanes: [
      { label: 'mobile tweezers', pulses: [{ x: 184, width: 94, label: 'move 0.5 ms', color: C.blue }, { x: 286, width: 438, label: 'hold selected sites', color: C.purple }] },
      { label: 'LAC light', pulses: [{ x: 286, width: 142, label: 'LAC 6 ms', color: C.coral }] },
      { label: 'imaging light', pulses: [{ x: 436, width: 142, label: 'identification image 4 ms', color: C.blue }] },
      { label: 'camera', pulses: [{ x: 442, width: 130, label: 'expose / classify', color: C.ink }] },
      { label: 'cooling light', pulses: [{ x: 586, width: 138, label: 'cool 6 ms', color: C.green }] },
      { label: 'controller', pulses: [{ x: 430, label: 'occupancy map', color: C.coral, kind: 'gate' }, { x: 580, label: 'accept 1 atom', color: C.coral, kind: 'gate' }] },
    ],
    notes: [
      'Light-assisted collisions suppress multiple occupancy before the identification image.',
      'The image produces a site-resolved occupancy record; rejected sites do not enter handoff.',
      'The final 6 ms cooling stage prepares approximately 10 µK mobile-tweezer atoms.',
    ],
    source: 'Li et al. (2025), replacement-sequence timing.',
  }),
  panel({
    filename: 'yb-cycle-03-prepare-handoff.svg', active: 2, kicker: 'STATE PREPARATION DOMAIN',
    title: 'Prepare ³P₀, transport, and hand off',
    subtitle: 'Two trap-off optical-pumping microcycles precede transfer to the stationary array.',
    phases: [
      { x: 176, width: 250, title: 'prepare ³P₀ 0.7 ms', time: 'two distinct optical stages', fill: '#eaf3ef' },
      { x: 434, width: 142, title: 'transport', time: 'move 0.5 ms', fill: '#eef3fb' },
      { x: 584, width: 148, title: 'handoff', time: 'mobile → stationary', fill: '#f5f1fb' },
    ],
    lanes: [
      { label: 'trap intensity', pulses: [{ x: 184, width: 116, label: 'off 900 ns', color: '#77827f', kind: 'dashed' }, { x: 308, width: 116, label: 'off 900 ns', color: '#77827f', kind: 'dashed' }, { x: 434, width: 290, label: 'ON — transport / handoff', color: C.purple }] },
      { label: 'global σ+ 556 nm', pulses: [{ x: 184, width: 116, label: 'pump ¹S₀ spin', color: C.green }] },
      { label: 'local 556 + 1539 nm', pulses: [{ x: 308, width: 116, label: 'pump to ³P₀', color: C.gold }] },
      { label: 'microcycle count', pulses: [{ x: 184, width: 116, label: '×50 each stage', color: C.ink }, { x: 308, width: 116, label: '×50 each stage', color: C.ink }] },
      { label: 'mobile position', pulses: [{ x: 434, width: 142, label: 'move 0.5 ms', color: C.blue }, { x: 584, width: 140, label: 'overlap / ramp', color: C.purple }] },
      { label: 'stationary trap', pulses: [{ x: 584, width: 140, label: 'capture prepared atom', color: C.ink }] },
    ],
    notes: [
      'Stage 1 polarizes ¹S₀ nuclear spin; stage 2 transfers selected sites through ³D₁ to ³P₀.',
      'Each optical step occupies its own 900 ns trap-off window; the stages are not simultaneous.',
      'The handoff completes only after the stationary-site identity is written to the controller.',
    ],
    source: 'Li et al. (2025), preparation and transport sequence.',
  }),
  panel({
    filename: 'yb-cycle-04-compute.svg', active: 3, kicker: 'COMPUTE DOMAIN',
    title: 'Coherent gates while reload continues',
    subtitle: 'Stationary-array computation and reservoir replenishment occupy separate spatial domains.',
    phases: [
      { x: 176, width: 192, title: 'single-qubit control', time: 'RF calibration scale', fill: '#eaf3ef' },
      { x: 376, width: 192, title: 'interaction gate', time: '302 nm calibration scale', fill: '#f5f1fb' },
      { x: 576, width: 156, title: 'record', time: 'site + cycle + gate', fill: '#eef3fb' },
    ],
    lanes: [
      { label: 'stationary compute', pulses: [{ x: 184, width: 540, label: 'stationary compute', color: C.ink }] },
      { label: 'global RF control', pulses: [{ x: 214, width: 126, label: 'Rφ(θ)', color: C.green }, { x: 598, width: 82, label: 'phase ref.', color: C.green, kind: 'dashed' }] },
      { label: '302 nm Rydberg', pulses: [{ x: 402, width: 140, label: 'CZ pulse block', color: C.purple }] },
      { label: 'mobile reservoir', pulses: [{ x: 184, width: 540, label: 'reload continues in parallel', color: C.blue, kind: 'dashed' }] },
      { label: 'cooling / imaging', pulses: [{ x: 184, width: 540, label: 'confined to reservoir domain', color: C.green, kind: 'dashed' }] },
      { label: 'controller record', pulses: [{ x: 568, label: 'append gate log', color: C.coral, kind: 'gate' }] },
    ],
    notes: [
      'RF nuclear-spin control is the global metastable-manifold X/Y primitive (Ma et al. 2023).',
      '302 nm Rydberg reference denotes the independently calibrated |1m⟩ ↔ |r⟩ interface.',
      'These gate durations are not inferred from the horizontal width of the replacement schedule.',
    ],
    source: 'Li et al. (2025) parallel architecture; Ma et al. (2023) gate references.',
  }),
  panel({
    filename: 'yb-cycle-05-readout-feedback.svg', active: 4, kicker: 'MEASUREMENT DOMAIN',
    title: 'State mapping, imaging, and feedback',
    subtitle: 'Each nuclear-spin state is mapped to an imageable manifold before classification.',
    phases: [
      { x: 176, width: 178, title: 'map |0⟩', time: '~15 µs block', fill: '#f5f1fb' },
      { x: 362, width: 142, title: 'image 0', time: '4 ms', fill: '#eef3fb' },
      { x: 512, width: 112, title: 'map |1⟩', time: '~15 µs', fill: '#f5f1fb' },
      { x: 632, width: 100, title: 'image 1', time: '4 ms', fill: '#eef3fb' },
    ],
    lanes: [
      { label: '649+770 Raman map', pulses: [{ x: 184, width: 106, label: '400 ns ×8', color: C.purple }, { x: 520, width: 96, label: '400 ns ×8', color: C.purple }] },
      { label: '497 nm depump', pulses: [{ x: 298, width: 48, label: 'to ¹S₀', color: C.coral }, { x: 620, width: 8, label: '', color: C.coral }] },
      { label: '399 nm imaging', pulses: [{ x: 370, width: 126, label: 'image |0⟩ 4 ms', color: C.blue }, { x: 640, width: 84, label: 'image |1⟩', color: C.blue }] },
      { label: 'camera', pulses: [{ x: 370, width: 126, label: 'frame A', color: C.ink }, { x: 640, width: 84, label: 'frame B', color: C.ink }] },
      { label: 'classification', pulses: [{ x: 500, label: 'A', color: C.coral, kind: 'gate' }, { x: 728, label: 'A+B', color: C.coral, kind: 'gate' }] },
      { label: 'replacement queue', pulses: [{ x: 514, width: 210, label: '|0> / |1> / loss', color: C.green, kind: 'dashed' }] },
    ],
    notes: [
      '649 + 770 nm Raman mapping: simultaneous fields transfer a selected ³P₀ spin state into ³P₂.',
      '497 nm depump returns ³P₂ population to imageable ¹S₀; it is not a Raman pulse.',
      'bright/dark → |0⟩; dark/bright → |1⟩; dark/dark → loss and replacement request.',
    ],
    source: 'Li et al. (2025), state-selective detection and feedback sequence.',
  }),
]

await mkdir(assetDir, { recursive: true })
await Promise.all(panels.map(({ filename, svg }) => writeFile(resolve(assetDir, filename), `${svg}\n`, 'utf8')))
console.log(`Generated ${panels.length} timeline panels in ${assetDir}`)
