import { buildTeachingTrajectory, type WorkbenchParameters } from './model'

interface PopulationChartProps {
  parameters: WorkbenchParameters
  language: 'zh' | 'en'
}

function makePath(values: number[], width: number, height: number) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = height - value * height
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

export default function PopulationChart({ parameters, language }: PopulationChartProps) {
  const trajectory = buildTeachingTrajectory(parameters)
  const computational = trajectory.map((point) => point.computational)
  const rydberg = trajectory.map((point) => point.rydberg)
  const doubleRydberg = trajectory.map((point) => point.doubleRydberg)
  const width = 720
  const height = 300

  return (
    <div className="population-chart">
      <div className="population-chart__topline">
        <span>{language === 'zh' ? '解析轨迹代理 / 门时长' : 'ANALYTIC TRAJECTORY PROXY / GATE TIME'}</span>
        <div><i className="is-yellow" />|1⟩ <i className="is-red" />|r⟩ <i className="is-violet" />|rr⟩</div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={language === 'zh' ? '双原子解析教学轨迹' : 'Analytical two-atom teaching trajectory'} preserveAspectRatio="none">
        <g className="population-chart__grid" aria-hidden="true">
          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => <line key={`h-${fraction}`} x1="0" x2={width} y1={height * fraction} y2={height * fraction} />)}
          {[0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1].map((fraction) => <line key={`v-${fraction}`} x1={width * fraction} x2={width * fraction} y1="0" y2={height} />)}
        </g>
        <path className="population-chart__ground" d={makePath(computational, width, height)} />
        <path className="population-chart__rydberg" d={makePath(rydberg, width, height)} />
        <path className="population-chart__double" d={makePath(doubleRydberg, width, height)} />
      </svg>
      <div className="population-chart__axis"><span>0</span><span>{parameters.gateTimeUs.toFixed(2)} μs</span></div>
      <p>{language === 'zh' ? '两能级 Rabi 响应叠加寿命与热运动包络；|rr⟩ 由有限阻塞比例给出。该曲线用于比较趋势，不是完整脉冲传播。' : 'Two-level Rabi response with lifetime and thermal envelopes; finite blockade assigns the |rr⟩ share. This compares trends, not a full pulse propagation.'}</p>
    </div>
  )
}
