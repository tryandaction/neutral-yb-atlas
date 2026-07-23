import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = resolve(root, 'site/assets/yb-energy-levels-reference.svg')

const colors = {
  ink: '#15211e', muted: '#53615d', line: '#b9c3c0', blue: '#1f5fd1', green: '#187a44',
  orange: '#e74b22', purple: '#5b33c5', wine: '#9c1743', wash: '#f5f8f7', note: '#fff9e8',
}

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

function text(x, y, value, className = 'body', options = {}) {
  const anchor = options.anchor ? ` text-anchor="${options.anchor}"` : ''
  const fill = options.fill ? ` fill="${options.fill}"` : ''
  const weight = options.weight ? ` font-weight="${options.weight}"` : ''
  return `<text x="${x}" y="${y}" class="${className}"${anchor}${fill}${weight}>${escapeXml(value)}</text>`
}

function multiline(x, y, rows, options = {}) {
  const lineHeight = options.lineHeight ?? 21
  return rows.map((row, index) => text(x, y + index * lineHeight, row, options.className ?? 'small', {
    fill: options.fill ?? colors.ink,
    weight: options.weight ?? 400,
    anchor: options.anchor,
  })).join('\n')
}

function roundedRect(x, y, width, height, stroke, fill = '#ffffff', radius = 9, strokeWidth = 2) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`
}

function arrow(x1, y1, x2, y2, color, options = {}) {
  const dashed = options.dashed ? ' stroke-dasharray="8 7"' : ''
  const start = options.double ? ` marker-start="url(#arrow-${options.marker ?? 'ink'})"` : ''
  const end = options.noEnd ? '' : ` marker-end="url(#arrow-${options.marker ?? 'ink'})"`
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${options.width ?? 3}"${dashed}${start}${end}/>`
}

function pathArrow(d, color, marker = 'ink', width = 3, dashed = false) {
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}"${dashed ? ' stroke-dasharray="8 7"' : ''} marker-end="url(#arrow-${marker})"/>`
}

function card(x, y, width, height, color, title, rows, options = {}) {
  return [
    roundedRect(x, y, width, height, color, options.fill ?? '#ffffff', 8, 2),
    text(x + 17, y + 27, title, options.titleClass ?? 'card-title', { fill: color, weight: 700 }),
    multiline(x + 17, y + 51, rows, { className: options.bodyClass ?? 'micro', lineHeight: options.lineHeight ?? 20 }),
  ].join('\n')
}

function camera(x, y, color = colors.ink) {
  return `<g transform="translate(${x} ${y})" stroke="${color}" fill="none" stroke-width="3">
    <rect x="0" y="8" width="46" height="34" rx="4"/><path d="M10 8 L16 0 H30 L36 8"/><circle cx="23" cy="25" r="10"/>
  </g>`
}

const markerDefs = Object.entries({ ink: colors.ink, blue: colors.blue, green: colors.green, orange: colors.orange, purple: colors.purple, wine: colors.wine })
  .map(([id, color]) => `<marker id="arrow-${id}" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto-start-reverse"><path d="M0,0 L9,4.5 L0,9 Z" fill="${color}"/></marker>`)
  .join('\n')

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1500" viewBox="0 0 1600 1500" role="img" aria-labelledby="title description">
  <title id="title">¹⁷¹Yb 核自旋量子比特能级、Raman 控制与擦除检测</title>
  <desc id="description">用一个通用 Raman Λ 结构汇总 ¹S₀、³P₀、³P₂ 与跨流形控制通道，并标出 ³P₀ 核自旋计算基的 Rydberg 两比特接口和能级化擦除检测流程。</desc>
  <defs>${markerDefs}<style>
    text { font-family: "Noto Sans CJK SC", "Microsoft YaHei", "PingFang SC", Arial, sans-serif; fill: ${colors.ink}; letter-spacing: 0; }
    .title { font-size: 34px; font-weight: 700; } .level { font-size: 25px; font-weight: 650; }
    .body { font-size: 20px; } .small { font-size: 18px; } .tiny { font-size: 17px; } .micro { font-size: 15px; }
    .card-title { font-size: 18px; font-weight: 700; } .section-title { font-size: 23px; font-weight: 700; }
    .energy-line { stroke: ${colors.ink}; stroke-width: 4; stroke-linecap: round; } .thin-line { stroke: ${colors.ink}; stroke-width: 2.5; }
  </style></defs>
  <rect width="1600" height="1500" fill="#ffffff"/>

  ${text(800, 44, '¹⁷¹Yb 核自旋量子比特：能级、Raman 控制与 Rydberg 接口', 'title', { anchor: 'middle' })}
  ${roundedRect(20, 62, 250, 48, colors.ink, '#ffffff', 8, 1.5)}
  ${text(38, 94, '¹⁷¹Yb：核自旋 I = 1/2', 'body', { weight: 700 })}
  ${roundedRect(20, 122, 252, 78, '#b7a26e', colors.note, 7, 1.3)}
  ${multiline(38, 147, ['示意图：纵向间距', '不按真实能量比例', '未展开超精细与 Zeeman 分裂'], { className: 'micro', lineHeight: 20 })}

  <!-- Main energy ladder -->
  <line x1="340" y1="620" x2="1120" y2="620" class="energy-line"/>
  <line x1="430" y1="520" x2="1120" y2="520" class="energy-line"/>
  <line x1="430" y1="430" x2="760" y2="430" class="energy-line"/>
  <line x1="430" y1="340" x2="760" y2="340" class="energy-line"/>
  <line x1="650" y1="200" x2="1120" y2="200" class="energy-line"/>
  <line x1="760" y1="90" x2="1110" y2="90" class="energy-line"/>
  <line x1="760" y1="138" x2="940" y2="138" class="thin-line" stroke-dasharray="8 7"/>

  <circle cx="164" cy="620" r="9" fill="#fff" stroke="${colors.blue}" stroke-width="3"/>${text(184, 628, '6s² ¹S₀', 'level')}
  <circle cx="268" cy="520" r="9" fill="#fff" stroke="${colors.orange}" stroke-width="3"/>${text(288, 528, '6s6p ³P₀', 'level')}
  <circle cx="268" cy="430" r="9" fill="#fff" stroke="${colors.green}" stroke-width="3"/>${text(288, 438, '6s6p ³P₁', 'level')}
  <circle cx="268" cy="340" r="9" fill="#fff" stroke="${colors.blue}" stroke-width="3"/>${text(288, 348, '6s6p ¹P₁', 'level')}
  <circle cx="258" cy="200" r="9" fill="#fff" stroke="${colors.purple}" stroke-width="3"/>${text(278, 208, '6s59s ³S₁', 'level')}
  ${text(820, 184, '|r⟩ = |6s59s ³S₁, F=3/2, mF=3/2⟩', 'body', { anchor: 'middle' })}
  <circle cx="738" cy="90" r="9" fill="#fff" stroke="${colors.wine}" stroke-width="3"/>${text(760, 78, '6p₁/₂ 59s 自动电离态', 'body')}
  ${text(1000, 146, 'Yb⁺ + e⁻ 连续区', 'body')}

  <!-- Main optical transitions -->
  ${arrow(250, 610, 250, 350, colors.blue, { marker: 'blue', double: true })}
  ${multiline(108, 430, ['399 nm', '快速基态成像'], { className: 'body', lineHeight: 27, fill: colors.blue, weight: 700 })}${camera(118, 510)}
  ${arrow(390, 610, 390, 440, colors.green, { marker: 'green', double: true })}
  ${multiline(292, 564, ['556 nm', '窄线冷却/成像'], { className: 'small', lineHeight: 23, fill: colors.green, weight: 700 })}
  ${arrow(510, 610, 510, 530, colors.orange, { marker: 'orange', double: true, dashed: true, width: 2.5 })}
  ${text(528, 574, '578.4 nm 钟跃迁', 'small', { fill: colors.orange, weight: 700 })}
  ${arrow(1000, 510, 1000, 210, colors.purple, { marker: 'purple', double: true })}
  ${multiline(1020, 346, ['302 nm', 'ΩRyd'], { className: 'level', lineHeight: 34, fill: colors.purple, weight: 700 })}
  ${text(990, 548, '两比特计算基：|0⟩, |1⟩ ∈ ³P₀', 'micro', { anchor: 'middle', fill: colors.purple, weight: 700 })}
  ${text(990, 570, '302 nm：³P₀ |1⟩ ↔ |r⟩', 'micro', { anchor: 'middle', fill: colors.purple, weight: 700 })}
  ${arrow(990, 190, 990, 100, colors.wine, { marker: 'wine' })}
  ${multiline(858, 126, ['约369 nm', '离子实激发'], { className: 'small', lineHeight: 25, fill: colors.wine, weight: 700 })}
  ${pathArrow('M1110 90 C1140 90 1145 138 1190 138', colors.wine, 'wine', 3)}
  ${text(1095, 116, '自动电离', 'micro', { fill: colors.wine, weight: 700 })}

  <!-- Raman Lambda control map -->
  <g id="raman-lambda-control-map">
    ${roundedRect(300, 645, 860, 245, colors.line, '#f8faf9', 9, 1.5)}
    ${text(320, 675, 'Raman Λ 控制接口', 'card-title', { fill: colors.ink, weight: 700 })}

    <line x1="455" y1="696" x2="555" y2="696" class="thin-line"/>
    ${text(560, 675, '|e⟩（真实中间态）', 'micro', { anchor: 'middle', fill: colors.muted })}
    <line x1="455" y1="718" x2="555" y2="718" class="thin-line" stroke-dasharray="7 6"/>
    ${text(570, 723, '虚能级', 'micro', { fill: colors.muted })}
    <line x1="440" y1="696" x2="440" y2="718" stroke="${colors.ink}" stroke-width="1.5"/>
    <line x1="435" y1="696" x2="445" y2="696" stroke="${colors.ink}" stroke-width="1.5"/>
    <line x1="435" y1="718" x2="445" y2="718" stroke="${colors.ink}" stroke-width="1.5"/>
    ${text(320, 712, '单光子失谐 Δ', 'micro', { weight: 700 })}
    <line x1="340" y1="765" x2="420" y2="765" class="thin-line"/>
    <line x1="510" y1="765" x2="590" y2="765" class="thin-line"/>
    ${text(380, 785, '|0⟩', 'tiny', { anchor: 'middle', weight: 700 })}
    ${text(550, 785, '|1⟩', 'tiny', { anchor: 'middle', weight: 700 })}
    ${arrow(380, 757, 488, 722, colors.green, { marker: 'green', width: 2.5 })}
    ${arrow(550, 757, 522, 722, colors.purple, { marker: 'purple', width: 2.5 })}
    ${text(360, 738, 'ωa, Ωa', 'micro', { fill: colors.green, weight: 700 })}
    ${text(525, 738, 'ωb, Ωb', 'micro', { fill: colors.purple, weight: 700 })}

    ${text(650, 706, 'δ=(ωa−ωb)−ω01', 'tiny', { weight: 700 })}
    ${text(650, 733, 'Ω₂γ≈ΩaΩb*/(2Δ)', 'tiny')}
    ${text(650, 760, '条件：|Δ|≫|Ωa,b|, Γ', 'micro', { fill: colors.muted })}
    <line x1="310" y1="790" x2="1150" y2="790" stroke="${colors.line}" stroke-width="1"/>

    ${roundedRect(312, 797, 836, 19, 'none', '#edf4f1', 3, 0)}
    ${text(320, 812, '¹S₀｜556+556 nm → ³P₁(F′=1/2)', 'micro', { fill: colors.green, weight: 700 })}
    ${text(700, 812, 'Δ/2π≈−5 GHz；Ω₂γ/2π≈7 kHz；磁 RF：ωd=ωZ', 'micro')}

    ${text(320, 835, '³P₀｜649+649 nm → 6s7s ³S₁', 'micro', { fill: colors.orange, weight: 700 })}
    ${text(700, 835, 'Jenkins 2022 提案：局域 Raman；参数依装置', 'micro')}

    ${roundedRect(312, 843, 836, 19, 'none', '#edf4f1', 3, 0)}
    ${text(320, 858, '³P₂｜770+770 nm → 6s7s ³S₁(F′=3/2,mF′=−3/2)', 'micro', { fill: colors.wine, weight: 700 })}
    ${text(760, 858, 'ΔQB/2π=+20 GHz；ΩQB/2π=2 MHz；B=10 G（理论模拟）', 'micro')}

    ${text(320, 881, '³P₀↔³P₂｜649+770 nm → 6s7s ³S₁', 'micro', { fill: colors.purple, weight: 700 })}
    ${text(700, 881, 'Δ/2π≈12 GHz；Ω₂γ/2π=1.08 MHz；B=8.5 G（Li 2025 态映射）', 'micro')}
  </g>

  <!-- Key parameter cards -->
  ${text(1395, 55, '关键信息卡片', 'section-title', { anchor: 'middle' })}
  ${card(1210, 70, 370, 132, colors.blue, '399 nm：快速基态检测', ['¹S₀ ↔ ¹P₁；Γ/2π≈29 MHz', '20 μs；识别保真度 0.986', '计算作用：基态占据判别与擦除标记'], { bodyClass: 'tiny', lineHeight: 24 })}
  ${card(1210, 214, 370, 132, colors.green, '556 nm：冷却、成像与基态 Raman', ['¹S₀ ↔ ³P₁；Γ/2π≈182 kHz', '基态单比特门：两束聚焦 Raman 光', 'Clifford 99.963(2)%（Muniz 2025）'], { bodyClass: 'tiny', lineHeight: 24 })}
  ${card(1210, 358, 370, 132, colors.orange, '578.4 nm：钟态映射', ['¹S₀ ↔ ³P₀；相干搁置与钟态控制', '连接两个电子流形；不是 Raman 旋转', 'Ma 2023 使用光泵浦初始化'], { bodyClass: 'tiny', lineHeight: 24 })}
  ${card(1210, 502, 370, 132, colors.purple, '302 nm：Rydberg 两比特门', ['302 nm：³P₀ |1⟩ ↔ |r⟩', 'ΩRyd/2π≈1.6 MHz；π 脉冲 330 ns', '计算作用：Rydberg 阻塞型 CZ 门'], { bodyClass: 'tiny', lineHeight: 24 })}
  ${card(1210, 646, 370, 132, colors.wine, '约369 nm：自动电离', ['6s59s ³S₁ → 6p₁/₂59s → Yb⁺+e⁻', '态选择性移除；用于最终核自旋读出', '计算作用：Rydberg 错误转擦除记录'], { bodyClass: 'tiny', lineHeight: 24 })}

  <!-- Decay and repump energy flow -->
  <line x1="0" y1="900" x2="1600" y2="900" stroke="${colors.ink}" stroke-width="2"/>
  ${text(800, 935, 'Rydberg 态衰变、770 nm 再泵浦（repump）与擦除检测（Ma 2023）', 'section-title', { anchor: 'middle' })}
  ${text(800, 961, '以下为制备在 |r⟩ 后等待与再泵浦得到的实验布居；不是普适分支比，也不是门错误率。', 'small', { anchor: 'middle', fill: colors.muted })}
  <g id="decay-repump-flow">
    ${roundedRect(28, 980, 522, 484, colors.purple, '#fcfbff', 10, 2)}
    ${text(48, 1012, '阶段 A：等待 Rydberg 态衰变', 'section-title', { fill: colors.purple })}
    ${multiline(48, 1041, ['|r⟩ 初态：6s59s ³S₁', '自发衰变：等待约 400 μs'], { className: 'small', lineHeight: 24 })}
    ${text(48, 1102, '等待后：25% ¹S₀ / 10% ³P₀ / 35% ³P₂ / 30% 未计入', 'micro', { weight: 700 })}
    <line x1="78" y1="1140" x2="254" y2="1140" class="thin-line"/>${text(78, 1127, '|r⟩  6s59s ³S₁', 'small')}
    <path d="M254 1140 H292 V1400" fill="none" stroke="${colors.ink}" stroke-width="2.5"/>
    <line x1="330" y1="1210" x2="505" y2="1210" class="thin-line"/>${text(340, 1198, '³P₂  约35%', 'small', { fill: colors.green, weight: 700 })}
    <line x1="330" y1="1300" x2="505" y2="1300" class="thin-line"/>${text(340, 1288, '³P₀  约10%', 'small', { fill: colors.orange, weight: 700 })}
    <line x1="330" y1="1380" x2="505" y2="1380" class="thin-line"/>${text(340, 1368, '¹S₀  约25%', 'small', { fill: colors.blue, weight: 700 })}
    ${arrow(292, 1210, 326, 1210, colors.ink, { marker: 'ink', width: 2 })}${arrow(292, 1300, 326, 1300, colors.ink, { marker: 'ink', width: 2 })}${arrow(292, 1380, 326, 1380, colors.ink, { marker: 'ink', width: 2 })}
    ${roundedRect(330, 1402, 175, 40, colors.purple, '#fff', 6, 1.5)}${text(340, 1428, '未计入  约30%', 'tiny', { fill: colors.purple, weight: 700 })}
    ${arrow(292, 1400, 326, 1420, colors.ink, { marker: 'ink', width: 2 })}

    <!-- Stage B -->
    ${roundedRect(566, 980, 510, 484, colors.green, '#fbfefc', 10, 2)}
    ${text(586, 1012, '阶段 B：770 nm 再泵浦 ³P₂', 'section-title', { fill: colors.green })}
    ${text(586, 1041, '³P₂ → 6s7s ³S₁：770 nm repump', 'small', { weight: 700 })}
    ${multiline(586, 1067, ['再泵浦后总布居：51% ¹S₀ / 19% ³P₀ / 30% 未计入', '非理想分支：约25%落入³P₀'], { className: 'micro', lineHeight: 22 })}
    <line x1="620" y1="1140" x2="770" y2="1140" class="thin-line"/>${text(620, 1127, '6s7s ³S₁', 'small')}
    <line x1="620" y1="1210" x2="770" y2="1210" class="thin-line"/>${text(620, 1198, '³P₂', 'small')}
    <line x1="620" y1="1255" x2="770" y2="1255" class="thin-line"/>${text(620, 1243, '³P₁', 'small')}
    <line x1="620" y1="1300" x2="770" y2="1300" class="thin-line"/>${text(620, 1288, '³P₀', 'small')}
    <line x1="620" y1="1380" x2="770" y2="1380" class="thin-line"/>${text(620, 1368, '¹S₀', 'small')}
    ${arrow(665, 1200, 665, 1150, colors.orange, { marker: 'orange', width: 3 })}${text(680, 1182, '770 nm', 'tiny', { fill: colors.orange, weight: 700 })}
    <path d="M770 1140 H802 V1380" fill="none" stroke="${colors.ink}" stroke-width="2.5"/>
    ${arrow(802, 1300, 774, 1300, colors.ink, { marker: 'ink', width: 2 })}${arrow(802, 1380, 774, 1380, colors.ink, { marker: 'ink', width: 2 })}
    ${roundedRect(830, 1140, 220, 240, colors.green, '#fff', 8, 1.5)}
    ${multiline(846, 1170, ['770 nm 激发 ³P₂', '至 6s7s ³S₁，', '随后自发衰变。', '', '最终 ¹S₀：51%', '最终 ³P₀：19%', '未计入：约30%', '', '替代链可经 ³D₂。'], { className: 'tiny', lineHeight: 23 })}

    <!-- Stage C -->
    ${roundedRect(1092, 980, 480, 484, colors.blue, '#fbfdff', 10, 2)}
    ${text(1112, 1012, '阶段 C：399 nm 成像与擦除记录', 'section-title', { fill: colors.blue })}
    ${text(1112, 1041, '¹S₀ → ¹P₁：399 nm fluorescence', 'small', { weight: 700 })}
    <line x1="1135" y1="1180" x2="1305" y2="1180" class="thin-line"/>${text(1135, 1168, '¹P₁', 'small')}
    <line x1="1135" y1="1300" x2="1305" y2="1300" class="thin-line"/>${text(1135, 1288, '³P₀（暗）', 'small')}
    <line x1="1135" y1="1380" x2="1305" y2="1380" class="thin-line"/>${text(1135, 1368, '¹S₀（亮）', 'small')}
    ${arrow(1190, 1370, 1190, 1190, colors.blue, { marker: 'blue', double: true, width: 3 })}${text(1208, 1262, '399 nm', 'small', { fill: colors.blue, weight: 700 })}
    ${camera(1260, 1210)}${text(1283, 1273, '20 μs', 'micro', { anchor: 'middle', fill: colors.blue, weight: 700 })}
    ${roundedRect(1330, 1085, 218, 326, colors.ink, '#fff', 8, 1.5)}
    ${text(1346, 1115, '门错误层面的记录', 'card-title', { weight: 700 })}
    ${multiline(1346, 1150, ['¹S₀ 亮：位置可见', '³P₀ 暗：仍在计算流形', '', '单比特门错误：', '约56%转为擦除', '', '双比特 CZ 错误：', '约33%转为擦除', '', '门错误比例 ≠', '51%/19%/30%布居'], { className: 'tiny', lineHeight: 23 })}
  </g>
</svg>
`

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, svg, 'utf8')
console.log(`Generated ${outputPath}`)
