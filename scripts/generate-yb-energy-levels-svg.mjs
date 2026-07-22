import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = resolve(root, 'site/assets/yb-energy-levels-reference.svg')

const colors = {
  ink: '#15211e',
  muted: '#53615d',
  line: '#b9c3c0',
  blue: '#1f5fd1',
  green: '#187a44',
  orange: '#e74b22',
  purple: '#5b33c5',
  wine: '#9c1743',
  wash: '#f5f8f7',
  note: '#fff9e8',
}

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

function text(x, y, value, className = 'body', options = {}) {
  const anchor = options.anchor ? ` text-anchor="${options.anchor}"` : ''
  const fill = options.fill ? ` fill="${options.fill}"` : ''
  const weight = options.weight ? ` font-weight="${options.weight}"` : ''
  return `<text x="${x}" y="${y}" class="${className}"${anchor}${fill}${weight}>${escapeXml(value)}</text>`
}

function multiline(x, y, rows, options = {}) {
  const lineHeight = options.lineHeight ?? 21
  const className = options.className ?? 'small'
  const fill = options.fill ?? colors.ink
  const weight = options.weight ?? 400
  return rows.map((row, index) => text(x, y + index * lineHeight, row, className, { fill, weight })).join('\n')
}

function roundedRect(x, y, width, height, stroke, fill = '#ffffff', radius = 9, strokeWidth = 2) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`
}

function arrow(x1, y1, x2, y2, color, options = {}) {
  const dashed = options.dashed ? ' stroke-dasharray="8 7"' : ''
  const start = options.double ? ` marker-start="url(#arrow-${options.marker ?? 'ink'})"` : ''
  const end = options.noEnd ? '' : ` marker-end="url(#arrow-${options.marker ?? 'ink'})"`
  const width = options.width ?? 3
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"${dashed}${start}${end}/>`
}

function pathArrow(d, color, marker = 'ink', width = 3, dashed = false) {
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}"${dashed ? ' stroke-dasharray="8 7"' : ''} marker-end="url(#arrow-${marker})"/>`
}

function card(x, y, width, height, color, title, rows, options = {}) {
  const fill = options.fill ?? '#ffffff'
  const titleSize = options.titleClass ?? 'card-title'
  const bodyClass = options.bodyClass ?? 'tiny'
  return [
    roundedRect(x, y, width, height, color, fill, 8, 2),
    text(x + 18, y + 29, title, titleSize, { fill: color, weight: 700 }),
    multiline(x + 18, y + 56, rows, { className: bodyClass, lineHeight: options.lineHeight ?? 20 }),
  ].join('\n')
}

function camera(x, y, color = colors.ink) {
  return `<g transform="translate(${x} ${y})" stroke="${color}" fill="none" stroke-width="3">
    <rect x="0" y="8" width="46" height="34" rx="4"/>
    <path d="M10 8 L16 0 H30 L36 8"/>
    <circle cx="23" cy="25" r="10"/>
  </g>`
}

const markerDefs = Object.entries({
  ink: colors.ink,
  blue: colors.blue,
  green: colors.green,
  orange: colors.orange,
  purple: colors.purple,
  wine: colors.wine,
}).map(([id, color]) => `<marker id="arrow-${id}" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto-start-reverse"><path d="M0,0 L9,4.5 L0,9 Z" fill="${color}"/></marker>`).join('\n')

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1480" viewBox="0 0 1600 1480" role="img" aria-labelledby="title description">
  <title id="title">¹⁷¹Yb 核自旋量子比特能级、控制与擦除检测</title>
  <desc id="description">¹⁷¹Yb 的主能级、基态 556 纳米局域 Raman 门、亚稳态全局 RF 与局域相位控制、Rydberg 激发，以及衰变、再泵浦和擦除检测流程。</desc>
  <defs>
    ${markerDefs}
    <style>
      text { font-family: "Noto Sans CJK SC", "Microsoft YaHei", "PingFang SC", Arial, sans-serif; fill: ${colors.ink}; letter-spacing: 0; }
      .title { font-size: 36px; font-weight: 700; }
      .subtitle { font-size: 21px; font-weight: 700; }
      .level { font-size: 26px; font-weight: 600; }
      .body { font-size: 20px; }
      .small { font-size: 18px; }
      .tiny { font-size: 17px; }
      .micro { font-size: 15px; }
      .card-title { font-size: 19px; font-weight: 700; }
      .section-title { font-size: 23px; font-weight: 700; }
      .energy-line { stroke: ${colors.ink}; stroke-width: 4; stroke-linecap: round; }
      .thin-line { stroke: ${colors.ink}; stroke-width: 2.5; }
    </style>
  </defs>
  <rect width="1600" height="1480" fill="#ffffff"/>

  ${text(800, 46, '¹⁷¹Yb 核自旋量子比特：能级、Rydberg 激发、成像与读出通道', 'title', { anchor: 'middle' })}
  ${roundedRect(22, 62, 248, 48, colors.ink, '#ffffff', 8, 1.5)}
  ${text(40, 94, '¹⁷¹Yb：核自旋 I = 1/2', 'body', { weight: 700 })}
  ${roundedRect(22, 124, 250, 78, '#b7a26e', colors.note, 7, 1.3)}
  ${multiline(39, 148, ['示意图：纵向间距', '不按真实能量比例', '未展开超精细与 Zeeman 分裂'], { className: 'micro', lineHeight: 20 })}

  <line x1="350" y1="820" x2="930" y2="820" class="energy-line"/>
  <line x1="440" y1="620" x2="930" y2="620" class="energy-line"/>
  <line x1="440" y1="500" x2="710" y2="500" class="energy-line"/>
  <line x1="440" y1="380" x2="710" y2="380" class="energy-line"/>
  <line x1="440" y1="240" x2="930" y2="240" class="energy-line"/>
  <line x1="680" y1="100" x2="925" y2="100" class="energy-line"/>
  <line x1="680" y1="145" x2="850" y2="145" stroke="${colors.ink}" stroke-width="2.5" stroke-dasharray="8 7"/>

  <circle cx="164" cy="820" r="9" fill="#ffffff" stroke="${colors.blue}" stroke-width="3"/>
  ${text(184, 827, '6s² ¹S₀', 'level')}
  <circle cx="268" cy="620" r="9" fill="#ffffff" stroke="${colors.orange}" stroke-width="3"/>
  ${text(288, 627, '6s6p ³P₀', 'level')}
  <circle cx="268" cy="500" r="9" fill="#ffffff" stroke="${colors.green}" stroke-width="3"/>
  ${text(288, 507, '6s6p ³P₁', 'level')}
  <circle cx="268" cy="380" r="9" fill="#ffffff" stroke="${colors.blue}" stroke-width="3"/>
  ${text(288, 387, '6s6p ¹P₁', 'level')}
  <circle cx="258" cy="240" r="9" fill="#ffffff" stroke="${colors.purple}" stroke-width="3"/>
  ${text(278, 248, '6s 59s ³S₁', 'level')}
  ${text(628, 226, '|r⟩ = |6s 59s ³S₁, F=3/2, mF=3/2⟩', 'body', { anchor: 'middle' })}
  ${text(830, 270, 'Rydberg 态', 'small', { anchor: 'end' })}
  <circle cx="658" cy="100" r="9" fill="#ffffff" stroke="${colors.wine}" stroke-width="3"/>
  ${text(680, 88, '6p₁/₂ 59s 自动电离态', 'body')}
  ${text(1035, 151, 'Yb⁺ + e⁻ 连续区', 'body')}

  ${text(22, 850, '箭头颜色=对应光场；黑色=RF/衰变；虚线=示意', 'micro', { fill: colors.muted })}

  <!-- Main transitions -->
  ${arrow(255, 812, 255, 388, colors.blue, { marker: 'blue', double: true, width: 3 })}
  ${multiline(122, 538, ['399 nm', '快速基态成像'], { className: 'body', lineHeight: 28, fill: colors.blue, weight: 700 })}
  ${camera(128, 620, colors.ink)}
  <line x1="151" y1="611" x2="151" y2="580" stroke="${colors.blue}" stroke-width="2" stroke-dasharray="4 4"/>

  ${arrow(398, 812, 398, 508, colors.green, { marker: 'green', double: true, width: 3 })}
  ${multiline(285, 704, ['556 nm', '窄线冷却', '低损伤成像'], { className: 'body', lineHeight: 24, fill: colors.green, weight: 700 })}
  ${camera(300, 760, colors.ink)}

  ${arrow(430, 812, 430, 628, colors.orange, { marker: 'orange', double: true, dashed: true, width: 2.5 })}
  ${multiline(448, 714, ['578.4 nm', '钟跃迁'], { className: 'body', lineHeight: 28, fill: colors.orange, weight: 700 })}

  ${arrow(860, 612, 860, 248, colors.purple, { marker: 'purple', double: true, width: 3 })}
  ${multiline(880, 424, ['302 nm', 'ΩRyd'], { className: 'level', lineHeight: 38, fill: colors.purple, weight: 700 })}
  ${text(880, 505, '同波长的局域相位控制', 'micro', { fill: colors.purple, weight: 700 })}
  ${text(880, 528, '失谐聚焦光产生差分 AC Stark 位移', 'micro')}
  ${text(880, 551, '计算作用：局域 Rz；与全局 RF 合成逐位点门', 'micro')}

  ${arrow(850, 232, 850, 108, colors.wine, { marker: 'wine', width: 3 })}
  ${multiline(715, 158, ['约369 nm', '离子实激发'], { className: 'body', lineHeight: 30, fill: colors.wine, weight: 700 })}
  ${pathArrow('M925 100 C965 100 970 145 1025 145', colors.wine, 'wine', 3)}
  ${text(940, 122, '自动电离', 'small', { fill: colors.wine, weight: 700 })}

  <!-- Nuclear-spin qubit -->
  ${text(315, 664, '|0⟩ = |³P₀, F=1/2, mF=−1/2⟩', 'small')}
  ${text(735, 664, '|1⟩ = |³P₀, F=1/2, mF=+1/2⟩', 'small')}
  ${arrow(560, 650, 700, 650, colors.ink, { marker: 'ink', double: true, width: 2.5 })}
  ${text(630, 696, '全局 RF 核自旋旋转 ΩRF', 'body', { anchor: 'middle', weight: 700 })}
  ${multiline(590, 722, ['Ma 2023：B = 5.0 G，νL = 5.70 kHz', 'π 脉冲约 2.0 ms'], { className: 'small', lineHeight: 24 })}
  ${text(590, 770, '全阵列 X/Y；聚焦 302 nm 提供局域 Rz', 'tiny')}
  ${text(520, 850, '态选择读出：649+770 nm Raman（Li 2025）', 'micro', { fill: colors.muted })}

  <!-- Demonstrated local ground-state Raman gates: Muniz et al., PRX Quantum 6, 020334 (2025). -->
  ${roundedRect(940, 668, 300, 160, colors.green, '#f7fcf9', 8, 2)}
  <circle cx="962" cy="694" r="7" fill="${colors.green}"/>
  ${text(978, 701, '556 nm 基态局域 Raman', 'tiny', { fill: colors.green, weight: 700 })}
  ${text(960, 728, '两束聚焦光；¹S₀(mF=±1/2)', 'micro')}
  ${text(960, 751, '经 ³P₁(F′=1/2) 虚激发', 'micro')}
  ${text(960, 774, 'Δ/2π≈−5 GHz；ΩR/2π≈7 kHz', 'micro')}
  ${text(960, 797, '逐位点相位/脉冲面积 → 并行 X/Y', 'micro')}
  ${text(960, 820, 'Muniz et al. (2025)', 'micro', { fill: colors.muted })}
  ${text(900, 850, '亚稳态局域 Raman：649 nm 经 ³S₁（Jenkins 2022）', 'micro', { fill: colors.muted })}

  <!-- Key parameter cards -->
  ${text(1420, 78, '关键信息卡片', 'section-title', { anchor: 'middle' })}
  ${roundedRect(1260, 90, 318, 142, colors.blue, '#ffffff', 8, 2)}
  <circle cx="1279" cy="113" r="8" fill="${colors.blue}"/>
  ${text(1297, 119, '399 nm：快速基态检测', 'card-title', { fill: colors.blue, weight: 700 })}
  ${multiline(1278, 146, ['¹S₀ ↔ ¹P₁；Γ/2π ≈ 29 MHz', '20 μs；识别保真度 0.986', '检测已回到基态的原子', '计算作用：基态占据判别与擦除标记'], { className: 'tiny', lineHeight: 23 })}
  ${roundedRect(1260, 240, 318, 142, colors.green, '#ffffff', 8, 2)}
  <circle cx="1279" cy="263" r="8" fill="${colors.green}"/>
  ${text(1297, 269, '556 nm：冷却、成像与 Raman', 'card-title', { fill: colors.green, weight: 700 })}
  ${multiline(1278, 293, ['¹S₀ ↔ ³P₁；Γ/2π ≈ 182 kHz', '冷却/成像：窄线散射', '单比特门：两束聚焦 Raman 光', 'Δ/2π≈−5 GHz；ΩR/2π≈7 kHz', 'Clifford 99.963(2)%（Muniz 2025）'], { className: 'micro', lineHeight: 21 })}
  ${roundedRect(1260, 390, 318, 142, colors.orange, '#ffffff', 8, 2)}
  <circle cx="1279" cy="413" r="8" fill="${colors.orange}"/>
  ${text(1297, 419, '578.4 nm：钟态映射', 'card-title', { fill: colors.orange, weight: 700 })}
  ${multiline(1278, 446, ['¹S₀ ↔ ³P₀ 钟跃迁', '相干映射与钟态控制', 'Ma 2023 使用光泵浦初始化', '计算作用：量子比特制备与复位接口'], { className: 'tiny', lineHeight: 23 })}
  ${roundedRect(1260, 540, 318, 142, colors.purple, '#ffffff', 8, 2)}
  <circle cx="1279" cy="563" r="8" fill="${colors.purple}"/>
  ${text(1297, 569, '302 nm：Rydberg 与局域相位', 'card-title', { fill: colors.purple, weight: 700 })}
  ${multiline(1278, 596, ['共振：|1⟩ ↔ |r⟩；ΩRyd/2π ≈ 1.6 MHz', 'π脉冲330 ns；约6 mW；w₀≈10 μm', '计算作用：Rydberg 阻塞型 CZ 门', '失谐聚焦：差分 AC Stark → 局域 Rz'], { className: 'tiny', lineHeight: 23 })}
  ${roundedRect(1260, 690, 318, 142, colors.wine, '#ffffff', 8, 2)}
  <circle cx="1279" cy="713" r="8" fill="${colors.wine}"/>
  ${text(1297, 719, '约369 nm：自动电离', 'card-title', { fill: colors.wine, weight: 700 })}
  ${multiline(1278, 746, ['6s 59s ³S₁ → 6p₁/₂ 59s', '→ Yb⁺ + e⁻；态选择性移除', '用于最终核自旋态读出', '计算作用：Rydberg 错误转擦除记录'], { className: 'tiny', lineHeight: 23 })}

  <!-- Bottom process band -->
  <line x1="0" y1="870" x2="1600" y2="870" stroke="${colors.ink}" stroke-width="2"/>
  ${text(800, 905, 'Rydberg 态衰变、770 nm 再泵浦（repump）与擦除检测（Ma 2023）', 'section-title', { anchor: 'middle' })}
  ${text(800, 930, '以下为初始制备在 |r⟩ 态的原子经等待和再泵浦后的实验布居比例；不是普适分支比，也不是门错误率。', 'small', { anchor: 'middle', fill: colors.muted })}

  <!-- Stage A -->
  ${roundedRect(18, 950, 520, 505, colors.purple, '#fcfbff', 10, 2)}
  ${text(278, 980, '阶段 A：等待 Rydberg 态衰变', 'section-title', { anchor: 'middle', fill: colors.purple })}
  ${card(38, 1040, 160, 228, colors.purple, '初始 |r⟩', ['6s 59s ³S₁', 'F=3/2', 'mF=3/2', '', '等待约', '400 μs'], { bodyClass: 'small', lineHeight: 25 })}
  ${card(225, 995, 290, 94, colors.blue, '约25%：回到 ¹S₀', ['399 nm 可检测，形成擦除标记'], { lineHeight: 19 })}
  ${card(225, 1101, 290, 110, colors.orange, '约10%：回到 ³P₀', ['返回亚稳态，不等于恢复量子态', '未额外检测时可成为隐藏错误'], { lineHeight: 22 })}
  ${card(225, 1223, 290, 94, colors.green, '约35%：进入 ³P₂', ['需 770 nm 再泵浦；', '399 nm 不直接探测'], { lineHeight: 22 })}
  ${card(225, 1329, 290, 104, colors.purple, '约30%：未计入上述能级', ['其他Rydberg态、损失或泄漏通道', '不能直接计为已知位置的擦除'], { lineHeight: 22 })}
  <line x1="198" y1="1156" x2="210" y2="1156" stroke="${colors.ink}" stroke-width="2"/>
  <line x1="210" y1="1042" x2="210" y2="1381" stroke="${colors.ink}" stroke-width="2"/>
  <line x1="210" y1="1042" x2="221" y2="1042" stroke="${colors.ink}" stroke-width="2" marker-end="url(#arrow-ink)"/>
  <line x1="210" y1="1156" x2="221" y2="1156" stroke="${colors.ink}" stroke-width="2" marker-end="url(#arrow-ink)"/>
  <line x1="210" y1="1270" x2="221" y2="1270" stroke="${colors.ink}" stroke-width="2" marker-end="url(#arrow-ink)"/>
  <line x1="210" y1="1381" x2="221" y2="1381" stroke="${colors.ink}" stroke-width="2" marker-end="url(#arrow-ink)"/>

  <!-- Stage B -->
  ${roundedRect(558, 950, 360, 505, colors.green, '#fbfefc', 10, 2)}
  ${text(738, 980, '阶段 B：770 nm 再泵浦 ³P₂', 'section-title', { anchor: 'middle', fill: colors.green })}
  <line x1="600" y1="1040" x2="690" y2="1040" class="thin-line"/>
  <line x1="600" y1="1120" x2="690" y2="1120" class="thin-line"/>
  <line x1="600" y1="1210" x2="690" y2="1210" class="thin-line"/>
  <line x1="600" y1="1290" x2="690" y2="1290" class="thin-line"/>
  <line x1="600" y1="1390" x2="690" y2="1390" class="thin-line"/>
  ${text(645, 1027, '6s7s ³S₁', 'small', { anchor: 'middle' })}
  ${text(574, 1127, '³P₂', 'body')}
  ${text(574, 1217, '³P₁', 'body')}
  ${text(574, 1297, '³P₀', 'body')}
  ${text(574, 1397, '¹S₀', 'body')}
  ${arrow(620, 1112, 620, 1048, colors.orange, { marker: 'orange', width: 3 })}
  ${text(635, 1088, '770 nm', 'small', { fill: colors.orange, weight: 700 })}
  <path d="M690 1040 H716 V1290" fill="none" stroke="${colors.ink}" stroke-width="2"/>
  ${arrow(716, 1120, 692, 1120, colors.ink, { marker: 'ink', width: 2 })}
  ${arrow(716, 1210, 692, 1210, colors.ink, { marker: 'ink', width: 2 })}
  ${arrow(716, 1290, 692, 1290, colors.ink, { marker: 'ink', width: 2 })}
  ${arrow(645, 1220, 645, 1380, colors.ink, { marker: 'ink', width: 2 })}
  ${roundedRect(738, 1050, 160, 350, colors.green, '#ffffff', 8, 1.5)}
  ${multiline(752, 1080, ['770 nm：³P₂→', '6s7s ³S₁，随后', '自发衰变。', '', '非理想分支：', '约25%落入³P₀。', '', '替代再泵浦：经³D₂', '使用496.8/1983 nm。'], { className: 'tiny', lineHeight: 25 })}

  <!-- Stage C -->
  ${roundedRect(938, 950, 400, 505, colors.blue, '#fbfdff', 10, 2)}
  ${text(1138, 980, '阶段 C：再泵浦后的末态布居', 'section-title', { anchor: 'middle', fill: colors.blue })}
  ${text(1138, 1008, '布居比例：51% + 19% + 30% ≈ 100%', 'small', { anchor: 'middle', fill: colors.blue, weight: 700 })}
  ${card(962, 1030, 352, 108, colors.blue, '51%：最终位于 ¹S₀', ['399 nm快速成像可探测', '形成位置已知的擦除标记'], { lineHeight: 20 })}
  ${card(962, 1152, 352, 118, colors.orange, '19%：最终位于 ³P₀', ['回到亚稳态，不等于恢复原量子态', '原相位或核自旋信息可能丢失'], { lineHeight: 20 })}
  ${card(962, 1284, 352, 118, colors.purple, '约30%：未计入/泄漏通道', ['其他Rydberg态或未探测损失', '不能直接计为已知位置的擦除'], { lineHeight: 20 })}
  ${arrow(1315, 1084, 1352, 1084, colors.blue, { marker: 'blue', width: 3 })}
  ${multiline(1260, 1056, ['399 nm', '20 μs'], { className: 'micro', lineHeight: 16, fill: colors.blue, weight: 700 })}

  <!-- Gate-level result -->
  ${roundedRect(1355, 950, 225, 505, colors.ink, '#fafafa', 10, 2)}
  ${text(1468, 985, '门错误层面的实验结果', 'card-title', { anchor: 'middle' })}
  ${camera(1445, 1035, colors.ink)}
  ${text(1468, 1102, '荧光相机 / 擦除标记', 'small', { anchor: 'middle', weight: 700 })}
  ${multiline(1380, 1160, ['单比特门错误：', '约56%被中途探测', '并转化为擦除错误', '', '双比特CZ门错误：', '约33%被探测并', '转化为擦除错误', '', '门错误比例 ≠', '51%/19%/30%布居比例'], { className: 'small', lineHeight: 26 })}

  ${arrow(538, 1200, 552, 1200, colors.ink, { marker: 'ink', width: 3 })}
  ${arrow(918, 1200, 932, 1200, colors.ink, { marker: 'ink', width: 3 })}
</svg>
`

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, svg, 'utf8')
console.log(`Generated ${outputPath}`)
