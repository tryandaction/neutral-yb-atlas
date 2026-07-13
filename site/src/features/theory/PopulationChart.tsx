import { rabiPopulation } from './model'

interface PopulationChartProps {
  omegaMHz: number
  detuningMHz: number
  gateTimeUs: number
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

export default function PopulationChart({ omegaMHz, detuningMHz, gateTimeUs }: PopulationChartProps) {
  const times = Array.from({ length: 121 }, (_, index) => (index / 120) * gateTimeUs)
  const rydberg = times.map((timeUs) => rabiPopulation({ omegaMHz, detuningMHz, timeUs }))
  const ground = rydberg.map((value) => 1 - value)
  const width = 720
  const height = 300

  return (
    <div className="population-chart">
      <div className="population-chart__topline">
        <span>POPULATION / GATE TIME</span>
        <div><i className="is-yellow" />|1⟩ <i className="is-red" />|r⟩</div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Rabi population over gate time" preserveAspectRatio="none">
        <g className="population-chart__grid" aria-hidden="true">
          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => <line key={`h-${fraction}`} x1="0" x2={width} y1={height * fraction} y2={height * fraction} />)}
          {[0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1].map((fraction) => <line key={`v-${fraction}`} x1={width * fraction} x2={width * fraction} y1="0" y2={height} />)}
        </g>
        <path className="population-chart__ground" d={makePath(ground, width, height)} />
        <path className="population-chart__rydberg" d={makePath(rydberg, width, height)} />
      </svg>
      <div className="population-chart__axis"><span>0</span><span>{gateTimeUs.toFixed(2)} μs</span></div>
    </div>
  )
}
